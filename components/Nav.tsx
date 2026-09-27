"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NAV, SITE } from "@/lib/site";
import { sound } from "@/lib/sound";
import { Close, Download, Menu } from "./Icons";

type Props = {
  /** "reveal": hidden until the home film has ended; "float": visible from load */
  mode?: "reveal" | "float";
  /** kept for older call sites; the pill nav looks the same on every background */
  tone?: "light" | "dark";
};

export default function Nav({ mode = "float" }: Props) {
  const path = usePathname() || "/";
  const [visible, setVisible] = useState(mode === "float");
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // home: the film tells the nav when to appear
  useEffect(() => {
    if (mode !== "reveal") return;
    const on = (e: Event) => setVisible((e as CustomEvent<boolean>).detail);
    window.addEventListener("yj:nav", on);
    return () => window.removeEventListener("yj:nav", on);
  }, [mode]);

  useEffect(() => { if (mode === "reveal" && visible) sound.play("swish"); }, [visible, mode]);

  // active link
  useEffect(() => {
    if (path.startsWith("/visuals")) return setActive("visuals");
    if (path.startsWith("/experience")) return setActive("experience");
    if (path.startsWith("/work")) return setActive("work");
    const ids = ["work", "visuals", "story", "experience", "words", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  // mobile menu open/close
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      lenis?.stop();
      gsap.fromTo(menuRef.current, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.7, ease: "power4.inOut" });
      gsap.fromTo(menuRef.current!.querySelectorAll(".mm-link"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "expo.out", delay: 0.2 });
      sound.play("whoosh");
    } else lenis?.start();
  }, [open]);

  const cls = ["nav", visible ? "show" : ""].join(" ");

  return (
    <>
      <header className={cls} inert={!visible || undefined}>
        <Link href="/" className="nav-brand nav-pill" aria-label="Yogesh Jeevan, home">
          <span className="yj">yj.</span><span className="nm">{SITE.name}</span>
        </Link>
        <nav className="nav-links nav-pill" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.id} href={n.href} className={active === n.id ? "on" : ""} aria-current={active === n.id ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="nav-end nav-pill">
          <SoundToggle />
          <a className="nav-cv" href={SITE.resume} download><span>Resume</span><Download size={16} /></a>
          <button type="button" className="nav-menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)} data-sound="none"><Menu size={18} />Menu</button>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="mm" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mm-top">
            <span className="nav-brand"><span className="yj">yj.</span><span className="nm">{SITE.name}</span></span>
            <button type="button" className="mm-close" onClick={() => setOpen(false)} autoFocus data-sound="none"><Close size={18} />Close</button>
          </div>
          <nav className="mm-links" aria-label="Main">
            {NAV.map((n, i) => (
              <Link key={n.id} href={n.href} className={`mm-link${active === n.id ? " on" : ""}`} onClick={() => setOpen(false)}>
                <span>{n.label}</span><span className="mm-num">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mm-foot">
            <a className="btn btn-turmeric" href={SITE.resume} download>Download resume <Download size={16} /></a>
            <div className="mm-social"><a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={SITE.behance} target="_blank" rel="noreferrer">Behance ↗</a><a href={`mailto:${SITE.email}`}>Email ↗</a></div>
            <SoundToggle wide />
          </div>
        </div>
      )}
    </>
  );
}

export function SoundToggle({ wide = false }: { wide?: boolean }) {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(sound.enabled); return sound.onChange(setOn); }, []);
  return (
    <button type="button" className={`snd${on ? " on" : ""}${wide ? " wide" : ""}`} aria-pressed={on} aria-label={on ? "Turn sound off" : "Turn sound on"} onClick={() => sound.toggle()} data-sound="none">
      <span className="bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="snd-l">{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
