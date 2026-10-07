"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "../Providers";
import { sound } from "@/lib/sound";
import { Arrow } from "../Icons";
import AaMark from "../case/AaMark";

gsap.registerPlugin(ScrollTrigger);
const V = (f: string) => `/img/visuals/${f}.webp`;

type Piece = { f: string; alt: string; cap: string; note?: string };
const CH: Record<string, { name: string; kicker: string; pieces: Piece[] }> = {
  mm: { name: "MiniMo", kicker: "App concept", pieces: [
    { f: "minimo-hero", alt: "MiniMo: two iPhones showing the home screen and the random boost toggle", cap: "The pitch, on one board" },
    { f: "minimo-random", alt: "MiniMo: the random mode and the schedule screen", cap: "Random, not routine" },
    { f: "minimo-widgets", alt: "MiniMo: home and lock screen widgets in four tints", cap: "Widgets that breathe" },
    { f: "minimo-playback", alt: "MiniMo: lock screen boost, mini player and Dynamic Island", cap: "Plays, then gets out of the way" },
  ] },
  gc: { name: "Go Calories", kicker: "iOS app, built with Claude Code", pieces: [
    { f: "gocal-cover", alt: "Go Calories: profile, today's consumption and describe-a-meal screens", cap: "Go Calories" },
    { f: "gocal-onboarding", alt: "Go Calories onboarding: sign in, about you, your goal and your plan", cap: "A calm first run" },
    { f: "gocal-log", alt: "Go Calories logging: quick add, barcode scan, manual entry and saved presets", cap: "Four ways to log a meal" },
    { f: "gocal-history", alt: "Go Calories history: calendar, macros and micros, and editing a logged item", cap: "Every gram, every day" },
    { f: "gocal-personalize", alt: "Go Calories settings: AI food parsing, presets, units and notifications", cap: "Every setting, dialed in" },
  ] },
  lp: { name: "Learn Prep", kicker: "PWA, built with Claude Code", pieces: [
    { f: "learnprep-hero", alt: "Learn Prep on desktop and phone: flashcards, a quiz and the English word of the day", cap: "Learn Prep" },
    { f: "learnprep-modes", alt: "Learn Prep study modes: flashcards in light and dark, and the English word of the day", cap: "Three ways to study" },
    { f: "learnprep-ai", alt: "Learn Prep settings: choose your AI engine, your own Gemini key, Chrome built-in AI or an in-browser model", cap: "Choose your AI" },
  ] },
  bz: { name: "Bizflyte", kicker: "Travel web + app", pieces: [
    { f: "temlate", alt: "Bizflyte brand board: logo, app icon, web and mobile screens", cap: "The brand, on one board" },
    { f: "frame-1000006527", alt: "Bizflyte and Swimingo app icons in light and dark", cap: "Same icon system, two brands" },
    { f: "macbook-pro-16-2", alt: "Bizflyte web dashboard and mobile trip screens in perspective", cap: "Web + mobile, in one breath", note: "desk to pocket, same trip" },
    { f: "slide-16-9-14", alt: "Bizflyte main mobile screens: home, booking in light and dark, explore map", cap: "Main screens", note: "light mode, dark mode, maps" },
    { f: "slide-16-9-8", alt: "Bizflyte web app: one stop for your travel and stay", cap: "Web app" },
    { f: "slide-16-9-9", alt: "Bizflyte mobile app: trips and approvals", cap: "Mobile app" },
    { f: "slide-16-9-10", alt: "Bizflyte style guideline: typography and colours", cap: "Style guideline" },
  ] },
  dq: { name: "Doctiq", kicker: "Clinic SaaS", pieces: [
    { f: "doctiq", alt: "Doctiq landing page: the ultimate workspace for modern clinics", cap: "Landing page" },
    { f: "login", alt: "Doctiq login: enter phone number and send OTP", cap: "Step 1 · Send OTP" },
    { f: "verified", alt: "Doctiq login: OTP verified, login successful", cap: "Step 2 · Verified" },
    { f: "frame-1321316311", alt: "Doctiq patient app: home with categories and nearby doctors, and the all doctors list", cap: "Patient app" },
  ] },
  ar: { name: "The Architectural Archive", kicker: "E-commerce", pieces: [
    { f: "archive-2", alt: "The Architectural Archive home: nothing off the rack was drawn to your dimensions", cap: "Home" },
    { f: "archive-1", alt: "The Architectural Archive men: filtered to 6 foot 5, sorted by longest inseam", cap: "Men, filtered to 6′5″" },
  ] },
  md: { name: "Modent Media", kicker: "Brand guidelines", pieces: [
    { f: "accent-4", alt: "Modent Media guidelines: the logo in action on signage, billboards and merchandise", cap: "In action" },
    { f: "color-styles", alt: "Modent Media guidelines: colour styles", cap: "Colour styles" },
    { f: "in-practice-5", alt: "Modent Media guidelines: photography in practice", cap: "In practice" },
  ] },
  pb: { name: "The pinboard", kicker: "Smaller projects", pieces: [
    { f: "food1", alt: "Good Food: a health food delivery app", cap: "Good Food · health food delivery app" },
    { f: "wireframe-1", alt: "Platypuzz AI: from idea to MVP in minutes", cap: "Platypuzz AI · idea to MVP in minutes" },
    { f: "wireframe-2", alt: "Swimingo: learning how to swim, made easy", cap: "Swimingo · swim lessons, made easy" },
  ] },
  ah: { name: "After hours", kicker: "Posters", pieces: [{ f: "g-3", alt: "Creativity: a poster experiment with type and texture", cap: "Creativity" }] },
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

function Head({ name, line, tags, color, accent, chipBg, chipFg }: { name: string; line: string; tags: string[]; color: string; accent: string; chipBg: string; chipFg: string }) {
  return (
    <div className="vh" style={{ color }}>
      <div className="vh-main"><h2 data-split="">{name}</h2><p className="vh-line" style={{ color: accent }}>{line}</p></div>
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

  const FAN: [string, string, string][] = [["minimo-hero", "minimo", "MiniMo"], ["temlate", "bizflyte", "Bizflyte"], ["gocal-cover", "go-calories", "Go Calories"], ["archive-2", "archive", "The Architectural Archive"], ["accent-4", "modent", "Modent Media"]];

  return (
    <main id="main" className="vis">
      <section className="v-hero dots-light" id="top">
        <div className="v-hero-grid">
          <div className="v-hero-text">
            <div className="label">Visuals · the show and tell</div>
            <h1 data-split="now">Pixels I&#8217;m <span className="ital" style={{ color: "var(--mari)" }}>proud</span> of.</h1>
            <p className="lede" data-reveal="up" data-delay="0.5">Case studies explain the thinking. This page is the sketchbook: ideas I couldn&#8217;t stop designing, UI, brand and the odd poster.</p>
          </div>
          <div ref={fan} className="vfan">
            {FAN.map(([f, id, n], i) => <a key={f} href={`#${id}`} className="vfan-card" style={{ left: `${i * 13}%` }} aria-label={`Jump to ${n}`} data-sound="paper"><img src={V(f)} alt="" /></a>)}
            <div className="note vfan-note">pick a card,<br />any card ;)</div>
          </div>
        </div>
      </section>

      {/* MiniMo */}
      <section className="v-ch vmm" id="minimo">
        <span className="vmm-glow a" aria-hidden="true" /><span className="vmm-glow b" aria-hidden="true" />
        <Head name="MiniMo" line="A little push, right on time." tags={["App concept", "iOS", "Widgets", "Liquid glass"]} color="var(--ink)" accent="#B85C38" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <figure className="vmm-film" data-reveal="up">
          <video src="/video/minimo-film.mp4" poster="/video/minimo-film.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="MiniMo app film: the concept in 21 seconds" />
          <figcaption><span className="vmm-rec"><i aria-hidden="true" />The film · 21 s</span><span className="hand">sound off, vibes on</span></figcaption>
        </figure>
        <div className="vmm-top">
          <Z ch="mm" f="minimo-hero" rot={-1.2} cap="the pitch, on one board" />
          <div className="vmm-about"><div className="label">What it is</div><p className="v-quote">A calm motivational audio player. Short clips from films, podcasts and interviews arrive at random moments, or on your own rhythm, and never while you sleep.</p><div className="note" style={{ background: "#FFE45C", transform: "rotate(3deg)", fontSize: 26, maxWidth: 300 }}>an idea I couldn&#8217;t stop designing ;)</div></div>
        </div>
        <div className="v-sub"><span className="label">Three screens, three moods</span><span className="hand" style={{ color: "#B85C38" }}>random, not routine · widgets that breathe · quiet playback</span></div>
        <div className="vmm-three">
          <Z ch="mm" f="minimo-random" rot={-1.5} cap="random, not routine" />
          <Z ch="mm" f="minimo-widgets" rot={1.2} cap="widgets that breathe" />
          <Z ch="mm" f="minimo-playback" rot={-1} cap="plays, then gets out of the way" />
        </div>
      </section>

      {/* Go Calories */}
      <section className="v-ch gc" id="go-calories">
        <Head name="Go Calories" line="Track what you eat, calmly." tags={["iOS app, built with Claude Code", "On-device AI", "Barcode scan"]} color="var(--ink)" accent="var(--ink)" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="v-block"><Z ch="gc" f="gocal-cover" frame="bare" className="gc-shot" /></div>
        <div className="v-sub"><span className="label">A flow, not a screen</span><span className="hand" style={{ color: "#3A63C4" }}>set up in a minute, then log however you like</span></div>
        <div className="dq-flow">
          <div><span className="chip" style={{ background: "#B8D4FF" }}>Step 1 · A calm first run</span><Z ch="gc" f="gocal-onboarding" frame="bare" className="gc-shot" /></div>
          <svg className="dq-arrow" viewBox="0 0 120 60" aria-hidden="true"><path d="M6 40 C 40 5, 80 5, 110 30" /><path d="M96 20 L110 30 L94 38" /></svg>
          <div><span className="chip" style={{ background: "#C5F0A4" }}>Step 2 · Four ways to log a meal</span><Z ch="gc" f="gocal-log" frame="bare" className="gc-shot" /></div>
        </div>
        <div className="gc-bottom">
          <div><div className="v-sub gc-sub"><span className="label">Every gram, every day</span><span className="hand" style={{ color: "#3A63C4" }}>calendar, macros, edits after the fact</span></div><Z ch="gc" f="gocal-history" frame="bare" className="gc-shot" /></div>
          <div className="gc-side"><Z ch="gc" f="gocal-personalize" frame="bare" className="gc-shot" /><p className="v-quote">Barcode scans, plain-English descriptions and an on-device AI model that never sends a meal to a server.</p><div className="note" style={{ background: "#FFB3C7", transform: "rotate(-2deg)", fontSize: 26, maxWidth: 280 }}>no account wall. no nagging.</div></div>
        </div>
      </section>

      {/* Learn Prep */}
      <section className="v-ch lp" id="learn-prep">
        <Head name="Learn Prep" line="Study anywhere, with the AI you choose." tags={["PWA, built with Claude Code", "Offline-first", "Bring your own AI"]} color="var(--ink)" accent="#4C6B2F" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="v-block"><Z ch="lp" f="learnprep-hero" frame="bare" className="gc-shot" /></div>
        <div className="gc-bottom lp-two">
          <div><div className="v-sub gc-sub"><span className="label">Three ways to study</span><span className="hand" style={{ color: "#4C6B2F" }}>flashcards, quiz and recall, light or dark</span></div><Z ch="lp" f="learnprep-modes" frame="bare" className="gc-shot" /></div>
          <div><div className="v-sub gc-sub"><span className="label">Choose your AI</span><span className="hand" style={{ color: "#4C6B2F" }}>your key, Gemini Nano, or in-browser</span></div><Z ch="lp" f="learnprep-ai" frame="bare" className="gc-shot" /></div>
        </div>
        <div className="lp-foot">
          <p className="v-quote">Offline-first learning app (English and design) where users choose their AI: their own API key, Gemini Nano, or an in-browser model.</p>
          <a className="btn btn-ink" href="https://learn-prep-pro.vercel.app/" target="_blank" rel="noreferrer">Open Learn Prep <Arrow size={16} /></a>
        </div>
      </section>

      {/* Design system entry */}
      <section className="v-ds" id="design-system" aria-label="Aa NAD Design System">
        <Link href="/design-system/" className="v-ds-in" data-cursor="View" data-sound="whoosh">
          <div className="v-ds-text">
            <div className="v-ds-kick"><AaMark size={30} /><span className="label">Also on the shelf · Design system</span></div>
            <h2>Aa NAD <span className="ital">Design System</span></h2>
            <p>Monochrome, accessibility-first and open source. Bring your own brand in 11 tokens. Built with Claude as my build partner.</p>
            <div className="v-ds-tags"><span>Design system</span><span>Open source</span><span>Built with Claude</span></div>
            <span className="v-ds-go">See the design system <Arrow size={16} /></span>
          </div>
          <figure className="polaroid v-ds-cover"><img src="/img/ds/ds-figma-thumbnail.webp" alt="Aa NAD Design System Figma library cover" loading="lazy" /><figcaption>the system behind the sketches</figcaption></figure>
          <span className="note v-ds-new">new ;)</span>
        </Link>
      </section>

      {/* Bizflyte */}
      <section className="v-ch dots" id="bizflyte" style={{ background: "var(--sand)" }}>
        <Head name="Bizflyte" line="One stop for your travel &amp; stay." tags={["Travel", "Web app", "Mobile app", "Ticket booking"]} color="var(--ink)" accent="#1F4FB8" chipBg="var(--ivory)" chipFg="var(--ink)" />
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

      {/* Doctiq */}
      <section className="v-ch" id="doctiq" style={{ background: "var(--ivory)" }}>
        <Head name="Doctiq" line="Less paperwork, more patient care." tags={["HealthTech", "Web app", "Patient app", "Landing page"]} color="var(--ink)" accent="var(--indigo)" chipBg="var(--ivory)" chipFg="var(--ink)" />
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

      {/* Archive */}
      <section className="v-ch ar dots" id="archive">
        <div className="ar-rail" aria-hidden="true"><div ref={tape}>{Array.from({ length: 70 }, (_, i) => <div key={i} className="ar-tick"><i style={{ width: i % 2 ? 22 : 40 }} />{i % 2 === 0 && <span>{6 + Math.floor(i / 12)}&#8242;{i % 12}&#8243;</span>}</div>)}</div></div>
        <div className="ar-in">
          <Head name="The Architectural Archive" line="The tape, not the size letter." tags={["E-commerce", "Menswear", "Website"]} color="var(--ink)" accent="var(--ivory)" chipBg="#F2EBDD" chipFg="var(--ink)" />
          <div className="ar-prints">
            <Z ch="ar" f="archive-2" rot={-2.5} className="ar-a" />
            <Z ch="ar" f="archive-1" rot={2} className="ar-b" />
            <p className="v-quote ar-q" data-reveal="up">Built for tall bodies: every garment filed by the number that actually matters.</p>
            <div className="note ar-note">filtered to 6&#8242;5&#8243;.<br />finally.</div>
          </div>
        </div>
      </section>

      {/* Modent */}
      <section className="v-ch md" id="modent">
        <Head name="Modent Media" line="A red that means business." tags={["Brand identity", "Guidelines", "2025"]} color="var(--ivory)" accent="#E53935" chipBg="#111" chipFg="var(--ivory)" />
        <div className="md-grid">
          <Z ch="md" f="accent-4" frame="dark" className="md-big" />
          <div className="md-side"><Z ch="md" f="color-styles" frame="dark" className="md-fan" /><Z ch="md" f="in-practice-5" frame="dark" className="md-fan" /></div>
        </div>
        <div className="md-caps">{[["In action", "Signage, billboards, merch."], ["Colour styles", "Deep red, balanced by off-white."], ["In practice", "Photography with the same restraint."]].map(([t, d]) => <div key={t} data-reveal="up"><b>{t}</b><span>{d}</span></div>)}</div>
      </section>

      {/* Pinboard */}
      <section className="v-ch pb" id="pinboard">
        <Head name="The pinboard" line="Smaller projects, same care." tags={["Mobile app", "AI product", "Landing page"]} color="var(--ink)" accent="var(--pink)" chipBg="var(--ivory)" chipFg="var(--ink)" />
        <div className="pb-grid">
          <Z ch="pb" f="food1" rot={-2} cap="Good Food · health food delivery app" className="pb-a" />
          <Z ch="pb" f="wireframe-1" rot={2} cap="Platypuzz AI · idea to MVP in minutes" className="pb-b" />
          <Z ch="pb" f="wireframe-2" rot={-1} cap="Swimingo · swim lessons, made easy" className="pb-c" />
        </div>
      </section>

      {/* After hours */}
      <section className="v-ch ah" id="after-hours">
        <Z ch="ah" f="g-3" rot={-1.5} className="ah-poster" />
        <div className="ah-text"><div className="label">After hours</div><h2 data-split="">When nobody&#8217;s <span className="ital" style={{ color: "var(--mari)" }}>briefing</span> me.</h2><p className="lede" data-reveal="up">Type, texture and posters. The playground where the next product idea usually starts.</p></div>
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
