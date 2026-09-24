"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { sound } from "@/lib/sound";
import Lightbox, { type LightboxItem } from "./Lightbox";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { lenis: Lenis | null; openLightbox: (items: LightboxItem[], index: number, title?: string, kicker?: string) => void };
const SiteCtx = createContext<Ctx>({ lenis: null, openLightbox: () => {} });
export const useSite = () => useContext(SiteCtx);

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Providers({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [lb, setLb] = useState<{ items: LightboxItem[]; index: number; title?: string; kicker?: string } | null>(null);
  const pathname = usePathname();

  /* ---------------- smooth scroll (Lenis driven by the GSAP ticker so ScrollTrigger stays in sync) */
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    if (reduced()) { document.documentElement.classList.add("reduce"); return; }
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    (window as unknown as { __lenis?: Lenis }).__lenis = l;
    return () => { gsap.ticker.remove(tick); l.destroy(); };
  }, []);

  /* ---------------- in-page anchors go through Lenis */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!a || !a.hash || a.target) return;
      const url = new URL(a.href);
      if (url.pathname !== window.location.pathname) return;
      const el = document.querySelector(a.hash);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", a.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  /* ---------------- sound: unlock on first gesture, delegated hover + click sounds */
  useEffect(() => {
    const unlock = () => sound.unlock();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    const fine = window.matchMedia("(pointer: fine)").matches;
    let lastEl: Element | null = null;
    const over = (e: PointerEvent) => {
      if (!fine) return;
      const el = (e.target as HTMLElement).closest("a, button, [data-sound]");
      if (el && el !== lastEl) sound.play((el.getAttribute("data-sound-hover") as "hover") || "hover");
      lastEl = el;
    };
    const click = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-sound]");
      if (!el) return;
      const s = el.getAttribute("data-sound");
      if (s === "none") return;
      sound.play((s as "click") || "click");
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click, true);
    return () => { document.removeEventListener("pointerover", over); document.removeEventListener("click", click, true); };
  }, []);

  /* ---------------- scroll reveals, split headings, count-ups: re-run on every route */
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      // headings split into masked words
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.dataset.splitDone) return;
        el.dataset.splitDone = "1";
        splitWords(el);
        const words = el.querySelectorAll(".w > span");
        gsap.fromTo(words, { yPercent: 110 }, {
          yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.045, delay: parseFloat(el.dataset.delay || "0"),
          onComplete: () => el.querySelectorAll<HTMLElement>(".w").forEach((w) => { w.style.overflow = "visible"; }),
          scrollTrigger: el.dataset.split === "now" ? undefined : { trigger: el, start: "top 88%" },
        });
      });
      // generic reveals
      const vars: Record<string, gsap.TweenVars> = {
        up: { y: 40, opacity: 0 },
        fade: { opacity: 0 },
        drop: { y: -160, rotate: -12, opacity: 0 },
        scale: { scale: 0.86, opacity: 0 },
        left: { x: -60, opacity: 0 },
        right: { x: 60, opacity: 0 },
        clip: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
      };
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) => {
          els.forEach((el, i) => {
            const h = el as HTMLElement;
            const kind = h.dataset.reveal || "up";
            const from = vars[kind] || vars.up;
            const ease = kind === "drop" ? "bounce.out" : kind === "clip" ? "power4.inOut" : "expo.out";
            gsap.fromTo(h, { ...from }, {
              x: 0, y: 0, rotate: h.dataset.rot ? parseFloat(h.dataset.rot) : 0, scale: 1, opacity: 1, clipPath: "inset(0 0 0% 0)",
              duration: kind === "drop" ? 1.2 : 1.1, ease, delay: i * 0.08 + parseFloat(h.dataset.delay || "0"),
              onStart: () => { if (h.dataset.revealSound) sound.play(h.dataset.revealSound as "paper"); },
              // hand control back to CSS so hover transforms keep working
              onComplete: () => { if (h.dataset.rot) h.style.setProperty("--r", `${h.dataset.rot}deg`); h.classList.add("is-in"); gsap.set(h, { clearProps: "transform,opacity,clipPath,x,y,rotate,scale" }); },
            });
          });
        },
      });
      // number count-ups: animates the first number inside the element, keeps the rest of the text
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const text = el.textContent || "";
        const m = text.match(/(\d[\d,]*\.?\d*)/);
        if (!m) return;
        const target = parseFloat(m[1].replace(/,/g, ""));
        const hasComma = m[1].includes(",");
        const dec = (m[1].split(".")[1] || "").length;
        const o = { v: 0 };
        el.textContent = text.replace(m[1], "0");
        gsap.to(o, {
          v: target, duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            let s = o.v.toFixed(dec);
            if (hasComma) s = Number(s).toLocaleString("en-IN");
            el.textContent = text.replace(m[1], s);
          },
        });
      });
      // parallax
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "60");
        gsap.fromTo(el, { y: amt }, { y: -amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { window.clearTimeout(id); ctx.revert(); };
  }, [pathname]);

  /* ---------------- scroll to top on route change */
  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  const openLightbox: Ctx["openLightbox"] = (items, index, title, kicker) => { setLb({ items, index, title, kicker }); sound.play("pop"); };

  return (
    <SiteCtx.Provider value={{ lenis, openLightbox }}>
      {children}
      <Cursor />
      {lb && <Lightbox {...lb} onClose={() => { setLb(null); sound.play("click"); }} />}
    </SiteCtx.Provider>
  );
}

function splitWords(el: HTMLElement) {
  const mk = (inner: Node, align = "top") => {
    const w = document.createElement("span"); w.className = "w";
    // generous padding (cancelled by negative margin) so italic overhangs and descenders are never clipped
    Object.assign(w.style, { display: "inline-block", overflow: "hidden", verticalAlign: align, padding: ".08em .2em .18em .06em", margin: "-.08em -.2em -.18em -.06em" });
    const i = document.createElement("span"); i.style.display = "inline-block"; i.appendChild(inner); w.appendChild(i); return w;
  };
  // inline images and other "no split" bits travel as one word
  el.querySelectorAll<HTMLElement>("[data-nosplit]").forEach((n) => { const ph = document.createComment(""); n.replaceWith(ph); ph.replaceWith(mk(n, "middle")); });
  const texts: Text[] = [];
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) { const t = tw.currentNode as Text; if (!t.parentElement?.closest(".w")) texts.push(t); }
  texts.forEach((t) => {
    const frag = document.createDocumentFragment();
    (t.textContent || "").split(/(\s+)/).forEach((part) => { if (!part) return; frag.appendChild(part.trim() ? mk(document.createTextNode(part)) : document.createTextNode(part)); });
    t.replaceWith(frag);
  });
}

/* ---------------- custom cursor: dot + trailing ring, grows into a label over [data-cursor] */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [labelText, setLabelText] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reduced()) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 }, r = { x: -100, y: -100 };
    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const t = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      setLabelText(t ? t.dataset.cursor || "" : "");
      ring.current?.classList.toggle("hot", !!(e.target as HTMLElement).closest("a, button"));
    };
    const tick = () => {
      r.x += (pos.x - r.x) * 0.18; r.y += (pos.y - r.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
    };
    window.addEventListener("pointermove", move);
    gsap.ticker.add(tick);
    const leave = () => { pos.x = -100; pos.y = -100; };
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); gsap.ticker.remove(tick); document.removeEventListener("pointerleave", leave); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <>
      <div ref={ring} className={`cursor-ring${labelText ? " label" : ""}`} aria-hidden="true"><span>{labelText}</span></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
