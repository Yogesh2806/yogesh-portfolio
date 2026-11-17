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
  const [t, setT] = useState<"dark" | "light">("dark");
  useEffect(() => { setT(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);
  const set = (v: "dark" | "light") => { setT(v); document.documentElement.dataset.theme = v; try { localStorage.setItem("yj-theme", v); } catch {} };
  return (
    <div className="theme" role="group" aria-label="Colour theme">
      <button aria-pressed={t === "light"} onClick={() => set("light")} aria-label="Light theme" title="Light"><Sun /></button>
      <button aria-pressed={t === "dark"} onClick={() => set("dark")} aria-label="Dark theme" title="Dark"><Moon /></button>
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
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
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

  return (
    <header className={`nav-wrap${scrolled ? " scrolled" : ""}${mob ? " menu-open" : ""}`}>
      <nav className="nav" aria-label="Main">
        <Link href="/" className="brand" aria-label="Yogesh Jeevan, home"><span className="yj">yj.</span>Yogesh Jeevan</Link>
        <div className="nav-links">
          <div ref={work} className={`work${open ? " open" : ""}`} onMouseEnter={() => hoverable() && setOpen(true)} onMouseLeave={() => hoverable() && setOpen(false)}>
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
