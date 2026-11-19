"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

function BentoIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="7" height="6" rx="1.6" /><rect x="10" y="1.5" width="4.5" height="6" rx="1.6" />
      <rect x="1.5" y="9" width="4.5" height="5.5" rx="1.6" /><rect x="7.5" y="9" width="7" height="5.5" rx="1.6" />
    </svg>
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

  // coming back from the bento: the classic page settles back in
  useEffect(() => {
    let from = false;
    try { from = sessionStorage.getItem("yj-from-bento") === "1"; sessionStorage.removeItem("yj-from-bento"); } catch {}
    if (!from) return;
    const root = document.documentElement;
    root.classList.add("from-bento");
    const t = window.setTimeout(() => root.classList.remove("from-bento"), 900);
    return () => window.clearTimeout(t);
  }, []);

  // "Make it bento": the classic page recedes, then the bento assembles
  const router = useRouter();
  const toBento = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("to-bento");
    window.setTimeout(() => router.push("/bento/"), reduce ? 0 : 420);
  };
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
              <Link href="/design-system/" className="mi" role="menuitem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="mi-th"><img src="/img/ds/ds-figma-thumbnail.webp" alt="" /></span>
                <span className="mi-t"><span className="mi-n"><span className="dot" style={{ background: "var(--ac)" }} />Aa NAD Design System</span><span className="mi-d">Open source · 249 tokens, 45 components</span></span>
              </Link>
              <hr />
              <Link href="/visuals/" className="mi" role="menuitem">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="mi-th mi-grid">{VIS.map((s) => <img key={s} src={s} alt="" />)}</span>
                <span className="mi-t"><span className="mi-n">Visuals ↗</span><span className="mi-d">Mobile, web and side projects</span></span>
              </Link>
            </div>
          </div>
          <a className="long" href={SITE.linkedin} target="_blank" rel="noreferrer">Connect with me on LinkedIn</a>
          <Link href="/#contact">Contact me ;)</Link>
          <Link href="/bento/" className="bento-link" onClick={toBento}><BentoIcon />Make it bento</Link>
          <div className="nav-m-theme"><span>Theme</span><Theme /></div>
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
