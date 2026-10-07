"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { sound } from "@/lib/sound";
import { SITE, html } from "@/lib/site";
import { STRIP, WORK, TEASER, TOOLS } from "@/lib/home";
import { Arrow, Copy, Star } from "../Icons";
import CoverGL from "./CoverGL";

gsap.registerPlugin(ScrollTrigger, Draggable);

/* ------------------------------------------------ marquee: speed follows scroll velocity, flips with direction */
export function Marquee({ items = STRIP, id }: { items?: string[]; id?: string }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current!;
    let x = 0, dir = -1, boost = 0, lastY = window.scrollY;
    const tick = () => {
      const y = window.scrollY, dy = y - lastY; lastY = y;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? -1 : 1;
      boost += (Math.min(18, Math.abs(dy) * 0.35) - boost) * 0.1;
      x += dir * (0.6 + boost);
      const w = el.scrollWidth / 2;
      if (x <= -w) x += w; if (x > 0) x -= w;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);
  const row = [...items, ...items];
  return (
    <section id={id} className="strip" aria-label="What I do">
      <div ref={track} className="strip-track">
        {row.map((t, i) => <span key={i} aria-hidden={i >= items.length || undefined}>{t}<Star size={26} color={i % 2 ? "#E8457A" : "#F4A300"} /></span>)}
      </div>
    </section>
  );
}

/* ------------------------------------------------ selected work cards (WebGL cover that bends on hover) */
export function WorkCards() {
  return (
    <div className="work-list">
      {WORK.map((w, i) => (
        <article key={w.slug} className="work-card" style={{ background: w.bg, color: w.fg }} data-reveal="up" data-cursor="View case">
          <Link href={"href" in w && w.href ? w.href : `/work/${w.slug}/`} className="work-hit" aria-label={`Read the ${w.title} case study`} data-sound="whoosh" />
          <div className="work-text">
            <span className="work-kick">{w.kicker}</span>
            <h3>{w.title}</h3>
            <p>{w.desc}</p>
            <div className="work-chips">{w.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
            <div className="work-foot">
              <div><div className="work-big" data-count>{w.big}</div><div className="work-small">{w.small}</div></div>
              <span className="work-btn" style={{ background: w.fg === "#FBF5EA" ? "#FBF5EA" : "#1A1426", color: w.bg }}>Read case study <Arrow size={18} /></span>
            </div>
          </div>
          <div className="work-art">
            <div className="work-cover"><CoverGL src={w.cover} alt={`${w.title} cover`} /></div>
            <span className="work-sticker pill-sticker" style={{ background: w.sbg, color: w.sfg }}>{w.sticker}</span>
          </div>
          {i === 0 && <span className="sr-only">Case study {i + 1}</span>}
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------ visuals teaser: a hand of cards dealt on scroll */
export function Fan() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cards = root.current!.querySelectorAll<HTMLElement>(".fan-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { rotate: 0, x: (i) => (2 - i) * 120, y: 80, opacity: 0 }, {
        rotate: (i) => parseFloat(cards[i].dataset.rot!), x: 0, y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true, onEnter: () => sound.play("swish") },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="fan" aria-hidden="true">
      {TEASER.map((t, i) => (
        <figure key={t.name} className="fan-card" data-rot={(i - 2) * 7} style={{ ["--i" as string]: i }}>
          <img src={t.src} alt="" loading="lazy" />
          <figcaption className="hand">{t.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ------------------------------------------------ toolkit: brand-coloured pill stickers that fall in, then you can throw them around */
const TOOL_LOOK: Record<string, [bg: string, fg: string, outline?: boolean]> = {
  Figma: ["#A259FF", "#1A1426"], Claude: ["#D97757", "#1A1426"], ChatGPT: ["#10A37F", "#1A1426"], Notion: ["#FBF5EA", "#1A1426", true],
  Dovetail: ["#6B4EFF", "#FBF5EA"], Framer: ["#1A1426", "#FBF5EA"], Jitter: ["#F4A300", "#1A1426"], Miro: ["#FFD02F", "#1A1426"],
  Maze: ["#E8457A", "#1A1426"], Hotjar: ["#FBF5EA", "#1A1426", true], Jira: ["#2B3A8C", "#FBF5EA"], "Claude Code": ["#D97757", "#1A1426"],
  Gemini: ["#3A63C4", "#FBF5EA"], "Adobe CC": ["#1A1426", "#FBF5EA"],
};
const TOOL_ROT = [-4, 3, -2, 5, -6, 2, -3, 6, -5, 3, -2, 4, -4, 5];
const rotOf = (i: number) => TOOL_ROT[i % TOOL_ROT.length];

export function Toolkit() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = root.current!.querySelectorAll<HTMLElement>(".tool");
    const ctx = gsap.context(() => {
      gsap.fromTo(els, { y: -220, opacity: 0, rotate: (i) => (i % 2 ? 25 : -25) }, {
        y: 0, opacity: 1, rotate: (i) => rotOf(i), duration: 0.9, ease: "bounce.out", stagger: { each: 0.035, from: "random" },
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        onStart: () => sound.play("paper"),
      });
      // throwing stickers around is a desktop toy: gsap.matchMedia removes the draggables and
      // snaps every sticker back to its slot as soon as the screen becomes small or touch-only
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (min-width: 981px)", () => {
        const d = Draggable.create(els, {
          bounds: root.current, type: "x,y", zIndexBoost: true,
          onPress() { sound.play("pop"); gsap.to(this.target, { scale: 1.08, rotate: 0, duration: 0.2 }); },
          onRelease() { gsap.to(this.target, { scale: 1, rotate: gsap.utils.random(-7, 7), duration: 0.5, ease: "back.out(3)" }); },
        });
        return () => { d.forEach((x) => x.kill()); gsap.to(els, { x: 0, y: 0, scale: 1, rotate: (i) => rotOf(i), duration: 0.4, overwrite: true }); };
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="tools">
      {TOOLS.map(([n, d]) => {
        const [bg, fg, outline] = TOOL_LOOK[n] || ["#FBF5EA", "#1A1426", true];
        return (
          <div key={n} className={`tool${outline ? " tool-outline" : ""}`} style={{ background: bg, color: fg }} data-cursor="Drag">
            <span className="tool-ic" style={{ background: fg, color: bg }}>{n[0]}</span>
            <span className="tool-t"><span className="tool-n">{n}</span><span className="tool-d">{d}</span></span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------ contact: copy email + magnetic buttons */
export function ContactActions() {
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const btns = root.current!.querySelectorAll<HTMLElement>(".magnet");
    const cleanups: (() => void)[] = [];
    btns.forEach((b) => {
      const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3.out" }); };
      const leave = () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, .4)" });
      b.addEventListener("pointermove", move); b.addEventListener("pointerleave", leave);
      cleanups.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
    });
    return () => cleanups.forEach((c) => c());
  }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.email); } catch {}
    setCopied(true); sound.play("pop");
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div ref={root} className="contact-actions">
      <button type="button" className="contact-mail" onClick={copy} data-sound="none" data-cursor="Copy">
        <span>{SITE.email}</span><Copy size={22} />
        <span className={`copied hand${copied ? " on" : ""}`} aria-live="polite">{copied ? "copied! see you in the inbox ;)" : ""}</span>
      </button>
      <div className="contact-btns">
        <a className="btn btn-ink magnet" href={SITE.resume} download>Download resume <Arrow size={16} /></a>
        <a className="btn btn-outline magnet" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow size={16} /></a>
      </div>
    </div>
  );
}

export function Html({ s, as: Tag = "span", className }: { s: string; as?: "span" | "p" | "div" | "h3"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={html(s)} />;
}
