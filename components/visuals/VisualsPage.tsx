"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "../Providers";
import { sound } from "@/lib/sound";
import { Arrow } from "../Icons";

gsap.registerPlugin(ScrollTrigger);
const V = (f: string) => `/img/visuals/${f}.webp`;

type Piece = { f: string; alt: string; cap: string; note?: string };
const CH: Record<string, { name: string; kicker: string; pieces: Piece[] }> = {
  bz: { name: "Bizflyte", kicker: "Chapter 01", pieces: [
    { f: "temlate", alt: "Bizflyte brand board: logo, app icon, web and mobile screens", cap: "The brand, on one board" },
    { f: "frame-1000006527", alt: "Bizflyte and Swimingo app icons in light and dark", cap: "Same icon system, two brands" },
    { f: "macbook-pro-16-2", alt: "Bizflyte web dashboard and mobile trip screens in perspective", cap: "Web + mobile, in one breath", note: "desk to pocket, same trip" },
    { f: "slide-16-9-14", alt: "Bizflyte main mobile screens: home, booking in light and dark, explore map", cap: "Main screens", note: "light mode, dark mode, maps" },
    { f: "slide-16-9-8", alt: "Bizflyte web app: one stop for your travel and stay", cap: "Web app" },
    { f: "slide-16-9-9", alt: "Bizflyte mobile app: trips and approvals", cap: "Mobile app" },
    { f: "slide-16-9-10", alt: "Bizflyte style guideline: typography and colours", cap: "Style guideline" },
  ] },
  dq: { name: "Doctiq", kicker: "Chapter 02", pieces: [
    { f: "doctiq", alt: "Doctiq landing page: the ultimate workspace for modern clinics", cap: "Landing page" },
    { f: "login", alt: "Doctiq login: enter phone number and send OTP", cap: "Step 1 · Send OTP" },
    { f: "verified", alt: "Doctiq login: OTP verified, login successful", cap: "Step 2 · Verified" },
    { f: "frame-1321316311", alt: "Doctiq patient app: home with categories and nearby doctors, and the all doctors list", cap: "Patient app" },
  ] },
  ar: { name: "The Architectural Archive", kicker: "Chapter 03", pieces: [
    { f: "archive-2", alt: "The Architectural Archive home: nothing off the rack was drawn to your dimensions", cap: "Home" },
    { f: "archive-1", alt: "The Architectural Archive men: filtered to 6 foot 5, sorted by longest inseam", cap: "Men, filtered to 6′5″" },
  ] },
  md: { name: "Modent Media", kicker: "Chapter 04", pieces: [
    { f: "accent-4", alt: "Modent Media guidelines: the logo in action on signage, billboards and merchandise", cap: "In action" },
    { f: "color-styles", alt: "Modent Media guidelines: colour styles", cap: "Colour styles" },
    { f: "in-practice-5", alt: "Modent Media guidelines: photography in practice", cap: "In practice" },
  ] },
  pb: { name: "The pinboard", kicker: "Chapter 05", pieces: [
    { f: "food1", alt: "Good Food: a health food delivery app", cap: "Good Food · health food delivery app" },
    { f: "wireframe-1", alt: "Platypuzz AI: from idea to MVP in minutes", cap: "Platypuzz AI · idea to MVP in minutes" },
    { f: "wireframe-2", alt: "Swimingo: learning how to swim, made easy", cap: "Swimingo · swim lessons, made easy" },
  ] },
  ah: { name: "After hours", kicker: "Chapter 06", pieces: [{ f: "g-3", alt: "Creativity: a poster experiment with type and texture", cap: "Creativity" }] },
};

function useZoom(chapter: keyof typeof CH) {
  const { openLightbox } = useSite();
  const c = CH[chapter];
  return (f: string) => {
    const items = c.pieces.map((p) => ({ src: V(p.f), alt: p.alt, caption: p.cap, note: p.note }));
    openLightbox(items, Math.max(0, c.pieces.findIndex((p) => p.f === f)), c.name, c.kicker);
  };
}

/** A clickable piece: straightens on hover, shows the "View" cursor, opens the lightbox. */
function Z({ ch, f, className = "", rot = 0, frame = "print", cap, children }: { ch: keyof typeof CH; f: string; className?: string; rot?: number; frame?: "print" | "browser" | "bare" | "dark"; cap?: string; children?: React.ReactNode }) {
  const open = useZoom(ch);
  const p = CH[ch].pieces.find((x) => x.f === f)!;
  return (
    <button type="button" className={`vz vz-${frame} ${className}`} style={{ ["--r" as string]: `${rot}deg` }} data-rot={rot} data-reveal="clip" data-cursor="View" data-sound="none" onClick={() => open(f)} aria-label={`Open: ${p.alt}`}>
      {frame === "print" && <span className="vz-tape" aria-hidden="true" />}
      {frame === "browser" && <span className="bar" aria-hidden="true"><i /><i /><i /></span>}
      <img src={V(f)} alt={p.alt} loading="lazy" />
      {cap && <span className="vz-cap hand">{cap}</span>}
      {children}
    </button>
  );
}

function Head({ num, name, line, tags, color, accent, chipBg, chipFg }: { num: string; name: string; line: string; tags: string[]; color: string; accent: string; chipBg: string; chipFg: string }) {
  return (
    <div className="vh" style={{ color }}>
      <span className="vh-num" style={{ WebkitTextStroke: `2px ${color}` }} aria-hidden="true">{num}</span>
      <div className="vh-main"><div className="label">Chapter {num}</div><h2 data-split="">{name}</h2><p className="vh-line" style={{ color: accent }}>{line}</p></div>
      <div className="vh-tags">{tags.map((t) => <span key={t} className="chip" style={{ background: chipBg, color: chipFg, borderColor: color }}>{t}</span>)}</div>
    </div>
  );
}

export default function VisualsPage() {
  const fan = useRef<HTMLDivElement>(null);
  const tape = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = fan.current!.querySelectorAll<HTMLElement>(".vfan-card");
      gsap.fromTo(cards, { rotate: 0, x: (i) => (2 - i) * 90, y: 140, opacity: 0 }, { rotate: (i) => (i - 2) * 8, x: 0, y: (i) => Math.abs(i - 2) * 22, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.09, delay: 0.4, onStart: () => sound.play("swish") });
      if (tape.current) gsap.fromTo(tape.current, { y: 0 }, { y: -500, ease: "none", scrollTrigger: { trigger: tape.current.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".md-fan").forEach((el, i) => gsap.fromTo(el, { x: -120, rotate: 0, opacity: 0 }, { x: 0, rotate: i ? -2 : 2, opacity: 1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%", once: true } }));
    });
    return () => ctx.revert();
  }, []);

  const INDEX = [["01", "Bizflyte", "Travel web + app"], ["02", "Doctiq", "Clinic SaaS"], ["03", "The Architectural Archive", "E-commerce"], ["04", "Modent Media", "Brand guidelines"], ["05", "The pinboard", "Good Food · Platypuzz AI · Swimingo"], ["06", "After hours", "Posters"]];
  const FAN = ["temlate", "archive-2", "doctiq", "accent-4", "food1"];

  return (
    <main id="main" className="vis">
      <section className="v-hero dots-light" id="top">
        <div className="v-hero-grid">
          <div className="v-hero-text">
            <div className="label">Visuals · the show and tell</div>
            <h1 data-split="now">Pixels I&#8217;m <span className="ital" style={{ color: "var(--mari)" }}>proud</span> of.</h1>
            <p className="lede" data-reveal="up" data-delay="0.5">Case studies explain the thinking. This page is for the craft: UI, brand and the odd poster, each shown the way it deserves to be seen.</p>
          </div>
          <div ref={fan} className="vfan">
            {FAN.map((f, i) => <a key={f} href={`#c0${[1, 3, 2, 4, 5][i]}`} className="vfan-card" style={{ left: `${i * 13}%` }} aria-label={`Jump to ${["Bizflyte", "The Architectural Archive", "Doctiq", "Modent Media", "Good Food"][i]}`} data-sound="paper"><img src={V(f)} alt="" /></a>)}
            <div className="note vfan-note">pick a card,<br />any card ;)</div>
          </div>
        </div>
        <div className="v-index">
          <div><div className="label">In this room</div><span className="hand">six chapters, no filler.</span></div>
          <nav aria-label="Chapters">{INDEX.map(([n, t, s]) => <a key={n} href={`#c${n}`} data-sound-hover="tick"><span className="vi-n">{n}</span><span className="vi-t">{t}</span><span className="vi-s">{s}</span></a>)}</nav>
        </div>
      </section>

      {/* 01 Bizflyte */}
      <section className="v-ch dots" id="c01" style={{ background: "var(--sand)" }}>
        <Head num="01" name="Bizflyte" line="One stop for your travel &amp; stay." tags={["Travel", "Web app", "Mobile app", "Ticket booking"]} color="var(--ink)" accent="#1F4FB8" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="bz-top">
          <Z ch="bz" f="temlate" rot={-1.2} cap="the brand, on one board" className="bz-board" />
          <div className="bz-side"><Z ch="bz" f="frame-1000006527" frame="bare" /><div className="note" style={{ background: "#B8D4FF", transform: "rotate(3deg)", fontSize: 25 }}>same icon system, two brands. spot the Swimingo one?</div></div>
        </div>
        <div className="bz-band"><div className="bz-band-h"><span className="label" style={{ color: "var(--ivory)" }}>Web + mobile, in one breath</span><span className="hand">desk to pocket, same trip</span></div><Z ch="bz" f="macbook-pro-16-2" frame="bare" rot={-0.6} className="bz-mac" /></div>
        <div className="v-sub"><span className="label">The screens</span><span className="hand" style={{ color: "#1F4FB8" }}>light mode, dark mode, maps</span></div>
        <Z ch="bz" f="slide-16-9-14" frame="browser" rot={-0.4} />
        <div className="v-two"><Z ch="bz" f="slide-16-9-8" frame="browser" rot={-1} /><Z ch="bz" f="slide-16-9-9" frame="browser" rot={1} /></div>
        <div className="bz-style"><Z ch="bz" f="slide-16-9-10" frame="browser" rot={-0.6} /><div><div className="label">Style guideline</div><p className="v-quote">Vibrant colour, legible type, and a single blue that means “go”.</p></div></div>
      </section>

      {/* 02 Doctiq */}
      <section className="v-ch" id="c02" style={{ background: "var(--ivory)" }}>
        <Head num="02" name="Doctiq" line="Less paperwork, more patient care." tags={["HealthTech", "Web app", "Patient app", "Landing page"]} color="var(--ink)" accent="var(--indigo)" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="v-block"><Z ch="dq" f="doctiq" frame="browser" /></div>
        <div className="v-sub"><span className="label">A flow, not a screen</span><span className="hand" style={{ color: "var(--indigo)" }}>phone number in, clinic open</span></div>
        <div className="dq-flow">
          <div><span className="chip" style={{ background: "#B8D4FF" }}>Step 1 · Send OTP</span><Z ch="dq" f="login" frame="browser" rot={-1} /></div>
          <svg className="dq-arrow" viewBox="0 0 120 60" aria-hidden="true"><path d="M6 40 C 40 5, 80 5, 110 30" /><path d="M96 20 L110 30 L94 38" /></svg>
          <div><span className="chip" style={{ background: "#C5F0A4" }}>Step 2 · Verified</span><Z ch="dq" f="verified" frame="browser" rot={1} /></div>
        </div>
        <div className="dq-patient">
          <div><div className="label">And for patients</div><p className="v-quote">Find a specialist nearby, see reviews and distance, book in a tap.</p><div className="dq-chips"><span className="chip">Search</span><span className="chip">Categories</span><span className="chip">Nearby doctors</span></div></div>
          <div className="dq-phones dots"><Z ch="dq" f="frame-1321316311" frame="bare" /></div>
        </div>
      </section>

      {/* 03 Archive */}
      <section className="v-ch ar dots" id="c03">
        <div className="ar-rail" aria-hidden="true"><div ref={tape}>{Array.from({ length: 70 }, (_, i) => <div key={i} className="ar-tick"><i style={{ width: i % 2 ? 22 : 40 }} />{i % 2 === 0 && <span>{6 + Math.floor(i / 12)}&#8242;{i % 12}&#8243;</span>}</div>)}</div></div>
        <div className="ar-in">
          <Head num="03" name="The Architectural Archive" line="The tape, not the size letter." tags={["E-commerce", "Menswear", "Website"]} color="var(--ink)" accent="var(--ivory)" chipBg="#F2EBDD" chipFg="var(--ink)" />
          <div className="ar-prints">
            <Z ch="ar" f="archive-2" rot={-2.5} className="ar-a" />
            <Z ch="ar" f="archive-1" rot={2} className="ar-b" />
            <p className="v-quote ar-q" data-reveal="up">Built for tall bodies: every garment filed by the number that actually matters.</p>
            <div className="note ar-note">filtered to 6&#8242;5&#8243;.<br />finally.</div>
          </div>
        </div>
      </section>

      {/* 04 Modent */}
      <section className="v-ch md" id="c04">
        <Head num="04" name="Modent Media" line="A red that means business." tags={["Brand identity", "Guidelines", "2025"]} color="var(--ivory)" accent="#E53935" chipBg="#111" chipFg="var(--ivory)" />
        <div className="md-grid">
          <Z ch="md" f="accent-4" frame="dark" className="md-big" />
          <div className="md-side"><Z ch="md" f="color-styles" frame="dark" className="md-fan" /><Z ch="md" f="in-practice-5" frame="dark" className="md-fan" /></div>
        </div>
        <div className="md-caps">{[["In action", "Signage, billboards, merch."], ["Colour styles", "Deep red, balanced by off-white."], ["In practice", "Photography with the same restraint."]].map(([t, d]) => <div key={t} data-reveal="up"><b>{t}</b><span>{d}</span></div>)}</div>
      </section>

      {/* 05 Pinboard */}
      <section className="v-ch pb" id="c05">
        <Head num="05" name="The pinboard" line="Smaller projects, same care." tags={["Mobile app", "AI product", "Landing page"]} color="var(--ink)" accent="var(--pink)" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="pb-grid">
          <Z ch="pb" f="food1" rot={-2} cap="Good Food · health food delivery app" className="pb-a" />
          <Z ch="pb" f="wireframe-1" rot={2} cap="Platypuzz AI · idea to MVP in minutes" className="pb-b" />
          <Z ch="pb" f="wireframe-2" rot={-1} cap="Swimingo · swim lessons, made easy" className="pb-c" />
        </div>
      </section>

      {/* 06 After hours */}
      <section className="v-ch ah" id="c06">
        <Z ch="ah" f="g-3" rot={-1.5} className="ah-poster" />
        <div className="ah-text"><div className="label">Chapter 06 · After hours</div><h2 data-split="">When nobody&#8217;s <span className="ital" style={{ color: "var(--mari)" }}>briefing</span> me.</h2><p className="lede" data-reveal="up">Type, texture and posters. The playground where the next product idea usually starts.</p></div>
      </section>

      <section className="v-outro dots">
        <Link href="/#work" className="v-outro-link" data-sound="whoosh"><div className="label">Liked the pixels?</div><span>Read the thinking behind them →</span></Link>
        <div className="v-outro-covers">{[["doctiq", "Doctiq", "/img/cases/doctiq-doctiq-cover.webp", -4], ["speak-plus", "Speak+", "/img/cases/speakp-speak-cover.webp", 2], ["swimingo", "Swimingo", "/img/cases/swimingo-swimingo-cover.webp", -2]].map(([s, n, src, r]) => (
          <Link key={s as string} href={`/work/${s}/`} className="polaroid v-oc" style={{ transform: `rotate(${r}deg)` }} data-cursor="View case" data-sound="whoosh"><img src={src as string} alt={`${n} cover`} loading="lazy" /><figcaption>{n as string}</figcaption></Link>
        ))}</div>
        <Link href="/#contact" className="btn btn-ink v-outro-btn">Say hello <Arrow size={16} /></Link>
      </section>
    </main>
  );
}
