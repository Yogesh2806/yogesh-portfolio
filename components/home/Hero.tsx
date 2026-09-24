"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sound } from "@/lib/sound";
import { Down } from "../Icons";

const N = 240;
/** share of frames (loaded coarse-to-fine) needed before the film is scrubbable end to end */
const GATE = 0.15;
const src = (i: number) => `/film/f${String(i + 1).padStart(3, "0")}.webp`;

/**
 * The home hero: a 10 s drone film that plays forward as you scroll down and backward as you scroll up.
 * 240 frames are drawn on a canvas; the fractional frame is cross-faded so the motion never steps.
 * While it loads, a preloader shows progress. When the film ends and the strip below is fully on screen,
 * the hero tells the nav to slide in.
 */
export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const film = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------ film engine */
  useEffect(() => {
    const canvas = cv.current!, ctx = canvas.getContext("2d", { alpha: false })!;
    const frames: HTMLImageElement[] = new Array(N), ready: boolean[] = new Array(N).fill(false);
    let loaded = 0, cur = 0, last = -1, dirty = true, lastP = 0, navOn = false, windLevel = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * d); canvas.height = Math.round(canvas.clientHeight * d);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"; dirty = true;
    };
    const near = (i: number) => {
      i = Math.max(0, Math.min(N - 1, i));
      if (ready[i]) return frames[i];
      for (let k = 1; k < N; k++) { if (ready[i - k]) return frames[i - k]; if (ready[i + k]) return frames[i + k]; }
      return null;
    };
    const blit = (img: HTMLImageElement, a: number) => {
      const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
      const mobile = cw < ch; const s = Math.max(cw / iw, ch / ih), w = iw * s, h = ih * s;
      ctx.globalAlpha = a; ctx.drawImage(img, (cw - w) * (mobile ? 0.38 : 0.5), (ch - h) / 2, w, h);
    };
    const draw = (f: number) => {
      const i = Math.floor(f), t = f - i, A = near(i);
      if (!A) return;
      blit(A, 1);
      if (t > 0.02 && i + 1 < N && ready[i + 1]) blit(frames[i + 1], t);
      ctx.globalAlpha = 1;
    };
    const load = (i: number) => {
      if (frames[i]) return;
      const im = new Image(); im.decoding = "async"; frames[i] = im; im.src = src(i);
      const done = () => { ready[i] = true; loaded++; setProgress(loaded / N); dirty = true; };
      (im.decode ? im.decode() : new Promise((r) => (im.onload = r))).then(done, () => { im.onload = done; });
    };
    // coarse-to-fine order: every 16th frame first so the whole film is scrubbable early
    load(0); for (let k = 16; k < N; k += 16) load(k); for (let k = 8; k < N; k += 16) load(k); for (let k = 0; k < N; k++) load(k);

    const strip = document.getElementById("strip");
    const progressOf = () => {
      const el = film.current; if (!el) return 0; const total = el.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / total));
    };
    let lastT = performance.now();
    const tick = () => {
      if (!film.current) return;
      const now = performance.now(), dt = Math.min(64, now - lastT); lastT = now;
      const p = progressOf(), target = p * (N - 1);
      const k = reduce ? 1 : 1 - Math.pow(0.001, (dt / 1000) * 2.4);
      cur += (target - cur) * k; if (Math.abs(target - cur) < 0.001) cur = target;
      if (dirty || Math.abs(cur - last) > 0.0005) { draw(cur); last = cur; dirty = false; }
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const sec = Math.min(10, Math.floor(p * 10 + 0.0001));
      if (time.current) time.current.textContent = `00:${sec < 10 ? "0" + sec : sec} / 00:10`;
      if (hint.current) hint.current.textContent = p >= 0.995 ? "Keep scrolling" : p > 0.01 ? "Scroll up to rewind" : "Scroll to play";
      if (!reduce) {
        const q = cur / (N - 1);
        film.current!.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => el.style.setProperty("--dy", `${(-q * 120 * parseFloat(el.dataset.depth!)).toFixed(2)}px`));
      }
      // wind: follows how fast the film is moving
      const v = Math.abs(p - lastP) * 1000 / Math.max(dt, 1); lastP = p;
      windLevel += ((p > 0 && p < 1 ? Math.min(1, v * 1.6) : 0) - windLevel) * 0.08;
      sound.wind(windLevel);
      // nav appears only once the film is over and the strip is fully in view
      const r = strip?.getBoundingClientRect();
      const want = p >= 0.999 && !!r && r.bottom <= window.innerHeight + 1;
      if (want !== navOn) { navOn = want; window.dispatchEvent(new CustomEvent("yj:nav", { detail: want })); }
    };
    size();
    gsap.ticker.add(tick);
    window.addEventListener("resize", size);
    return () => { gsap.ticker.remove(tick); window.removeEventListener("resize", size); sound.wind(0); };
  }, []);

  /* ------------------------------------------------ preloader */
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (!loaderDone) { lenis?.stop(); document.documentElement.style.overflow = "hidden"; }
  }, [loaderDone]);

  useEffect(() => {
    if (loaderDone) return;
    const started = (window as unknown as { __yjT0?: number }).__yjT0 ??= performance.now();
    // leave once the whole film is scrubbable (every 8th frame) and the loader has been seen for a beat
    if (progress < GATE || performance.now() - started < 1200) {
      if (progress >= GATE) { const id = setTimeout(() => setProgress((p) => p + 1e-9), 1250 - (performance.now() - started)); return () => clearTimeout(id); }
      return;
    }
    const el = loader.current!;
    const tl = gsap.timeline({ onComplete: () => {
      setLoaderDone(true); document.documentElement.style.overflow = "";
      (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
    } });
    tl.to(el.querySelectorAll(".pl-in"), { y: -30, opacity: 0, duration: 0.45, stagger: 0.05, ease: "power2.in" })
      .to(el, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.1")
      .add(() => intro(), "-=0.55");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, loaderDone]);

  const intro = () => {
    const root = film.current; if (!root) return;
    gsap.fromTo(root.querySelectorAll(".hero-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.09 });
    gsap.fromTo(root.querySelectorAll(".hero-pop"), { scale: 0, rotate: 0 }, { scale: 1, rotate: (i, t) => parseFloat((t as HTMLElement).dataset.rot || "0"), duration: 1, ease: "back.out(2)", stagger: 0.12, delay: 0.35 });
    gsap.fromTo(root.querySelectorAll(".hero-fade"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.5 });
  };

  const pct = Math.min(100, Math.round(progress * 100));
  const R = 64, C = 2 * Math.PI * R;
  const meet = Math.max(0, 1 - Math.min(1, progress / GATE)); // pills travel toward each other

  return (
    <>
      {!loaderDone && (
        <div ref={loader} className="pl" role="status" aria-live="polite">
          <img src="/film/f001.webp" alt="" className="pl-bg" />
          <div className="pl-center">
            <div className="pl-ring pl-in">
              <svg width={R * 2 + 16} height={R * 2 + 16} viewBox={`0 0 ${R * 2 + 16} ${R * 2 + 16}`} aria-hidden="true">
                <circle cx={R + 8} cy={R + 8} r={R} className="pl-track" />
                <circle cx={R + 8} cy={R + 8} r={R} className="pl-fill" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - Math.min(1, progress / GATE)) }} />
              </svg>
              <span className="yj">yj.</span>
            </div>
            <div className="pl-pills pl-in">
              <span className="pill-sticker" style={{ background: "var(--turmeric)", color: "var(--ink)", transform: `translateX(${-meet * 90}px) rotate(-7deg)` }}>North se</span>
              <span className="pill-sticker" style={{ background: "var(--jasmine)", color: "var(--ink)", transform: `translateX(${meet * 90}px) rotate(5deg)` }}>South la</span>
            </div>
            <div className="pl-title pl-in">Two cities, <span className="ital">loading.</span></div>
            <div className="pl-meta pl-in">FILM · {Math.round(progress * N)} / {N} FRAMES</div>
          </div>
          <div className="pl-bar" aria-hidden="true"><i style={{ width: `${Math.min(100, (progress / GATE) * 100)}%` }} /></div>
        </div>
      )}

      <section ref={film} className="film" id="top" aria-label="Intro film">
        <div className="stage">
          <canvas ref={cv} role="img" aria-label="AI drone film flying over a sandstone fort, a temple tower and the sea. It plays forward as you scroll down and backward as you scroll up." />
          <div className="shade" aria-hidden="true" />
          <a className="brand hero-fade" href="#top" aria-label="Yogesh Jeevan"><span className="yj">yj.</span><span className="nm">Yogesh Jeevan</span></a>
          <span ref={time} className="time hero-fade" aria-hidden="true">00:00 / 00:10</span>
          <div className="hero-pill n" data-depth="1.2"><span className="pill-sticker hero-pop" data-rot="-7">North se</span></div>
          <div className="hero-pill s" data-depth="0.8"><span className="pill-sticker hero-pop" data-rot="5">South la</span></div>
          <div className="hero-note" data-depth="0.5"><div className="note tape hero-pop" data-rot="-5">psst... scroll slowly. things move around here ;)</div></div>
          <h1 ref={head} className="head">
            <span className="k hero-fade">Yogesh Jeevan · Product designer</span>
            <span className="hero-line a"><span>Two cities.</span></span>
            <span className="hero-line b"><span className="ital">Many ways of seeing.</span></span>
          </h1>
          <div className="hint hero-fade"><span ref={hint} className="lbl">Scroll to play</span><span className="ring"><Down size={20} /></span></div>
          <div className="bar" aria-hidden="true"><i ref={bar} /></div>
        </div>
      </section>
    </>
  );
}
