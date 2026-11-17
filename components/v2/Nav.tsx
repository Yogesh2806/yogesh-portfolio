"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { useSite } from "./Providers";
import { Burger, Chevron, Close, Moon, Sun } from "./Icons";

const CASES = [
  { href: "/work/doctiq/", img: "/img/home/cover-doctiq.webp", dot: "var(--ind)", name: "Doctiq", line: "AI clinic SaaS, shipped in two weeks" },
  { href: "/work/speak-plus/", img: "/img/home/cover-speak.webp", dot: "var(--pink)", name: "Speak+ · Wall Street English", line: "From 5 to 2,000+ paid subscriptions" },
  { href: "/work/swimingo/", img: "/img/home/cover-swimingo.webp", dot: "var(--teal)", name: "Swimingo", line: "Trust in a two-sided marketplace" },
];
const VIS = ["/img/visuals/learnprep-hero.webp", "/img/visuals/minimo-hero.webp", "/img/visuals/macbook-pro-16-2.webp", "/img/ds/ds-figma-thumbnail.webp"];

function Theme() {
  // Which button looks pressed comes from CSS ([data-theme] on <html>), so it is right on the first paint.
  const set = (v: "dark" | "light") => {
    const root = document.documentElement;
    if (root.dataset.theme === v) return;
    root.classList.add("theme-swap");
    root.dataset.theme = v;
    try { localStorage.setItem("yj-theme", v); } catch {}
    window.setTimeout(() => root.classList.remove("theme-swap"), 450);
  };
  return (
    <div className="theme" role="group" aria-label="Colour theme">
      <button className="t-light" onClick={() => set("light")} aria-label="Light theme" title="Light"><Sun /></button>
      <button className="t-dark" onClick={() => set("dark")} aria-label="Dark theme" title="Dark"><Moon /></button>
    </div>
  );
}

export default function Nav() {
  const { openResume } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mob, setMob] = useState(false);
  const work = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    let raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; setScrolled(window.scrollY > 40); }); };
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => { setOpen(false); setMob(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const out = (e: PointerEvent) => { if (!work.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", out); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", key); };
  }, [open]);

  const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  const timer = useRef(0);
  const enter = () => { if (!hoverable()) return; window.clearTimeout(timer.current); setOpen(true); };
  const leave = () => { if (!hoverable()) return; window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 220); };

  return (
    <header className={`nav-wrap${scrolled ? " scrolled" : ""}${mob ? " menu-open" : ""}`}>
      <nav className="nav" aria-label="Main">
        <Link href="/" className="brand" aria-label="Yogesh Jeevan, home"><span className="yj">yj.</span>Yogesh Jeevan</Link>
        <div className="nav-links">
          <div ref={work} className={`work${open ? " open" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
            <button aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((v) => !v)}>Work<Chevron /></button>
            <div className="menu" role="menu">
              <div className="lab">Case studies</div>
              {CASES.map((c) => (
                <Link key={c.href} href={c.href} className="mi" role="menuitem">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span className="mi-th"><img src={c.img} alt="" /></span>
                  <span className="mi-t"><span className="mi-n"><span className="dot" style={{ background: c.dot }} />{c.name}</span><span className="mi-d">{c.line}</span></span>
                </Link>
              ))}
              <hr />
              <Link href="/visuals/" className="mi" role="menuitem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="mi-th mi-grid">{VIS.map((s) => <img key={s} src={s} alt="" />)}</span>
                <span className="mi-t"><span className="mi-n">Visuals ↗</span><span className="mi-d">Mobile, web and side projects</span></span>
              </Link>
              <hr />
              <Link href="/design-system/" className="mi" role="menuitem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="mi-th"><img src="/img/ds/ds-figma-thumbnail.webp" alt="" /></span>
                <span className="mi-t"><span className="mi-n"><span className="dot" style={{ background: "var(--ac)" }} />Aa NAD Design System</span><span className="mi-d">Open source · 249 tokens, 45 components</span></span>
              </Link>
            </div>
          </div>
          <a className="long" href={SITE.linkedin} target="_blank" rel="noreferrer">Connect with me on LinkedIn</a>
          <Link href="/#contact">Contact me ;)</Link>
        </div>
        <div className="nav-right">
          <Theme />
          <button className="btn btn-solid" onClick={openResume}>Resume ↗</button>
          <button className="btn btn-line nav-burger" onClick={() => setMob((v) => !v)} aria-expanded={mob} aria-label="Menu" style={{ padding: 10 }}>{mob ? <Close /> : <Burger />}</button>
        </div>
      </nav>
    </header>
  );
}
