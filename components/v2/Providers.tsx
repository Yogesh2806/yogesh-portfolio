"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import ResumePeek from "./ResumePeek";
import Lightbox, { type Shot } from "./Lightbox";

type Ctx = { openResume: () => void; openShots: (items: Shot[], index: number) => void };
const SiteCtx = createContext<Ctx>({ openResume: () => {}, openShots: () => {} });
export const useSite = () => useContext(SiteCtx);

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Providers({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [resume, setResume] = useState(false);
  const [shots, setShots] = useState<{ items: Shot[]; index: number } | null>(null);
  const pathname = usePathname();

  // smooth scroll
  useEffect(() => {
    if (reduced()) return;
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    let id = 0;
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    setLenis(l);
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, []);

  // pause smooth scroll while an overlay is open
  useEffect(() => {
    const open = resume || !!shots;
    if (open) lenis?.stop(); else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [resume, shots, lenis]);

  // in-page anchors glide through Lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!a || !a.hash || a.target) return;
      const url = new URL(a.href);
      if (url.pathname !== window.location.pathname) return;
      const el = document.querySelector(a.hash);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -24, duration: 1.3 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", a.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  // reveal on scroll: one observer for the whole app, and a MutationObserver so content that
  // appears later (route changes, the Visuals filters) is picked up too. Without JS it stays visible.
  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) {
      const all = () => document.querySelectorAll<HTMLElement>("[data-rv]").forEach((e) => e.classList.add("in"));
      all(); const mo = new MutationObserver(all); mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { const el = en.target as HTMLElement; el.style.transitionDelay = `${el.dataset.rv || 0}ms`; el.classList.add("in"); io.unobserve(el); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    const scan = () => document.querySelectorAll<HTMLElement>("[data-rv]:not(.in):not([data-rv-on])").forEach((e) => { e.dataset.rvOn = ""; io.observe(e); });
    scan();
    let raf = 0;
    const mo = new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; scan(); }); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  // new route starts at the top, unless it points at an anchor
  useEffect(() => {
    if (window.location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  const openResume = useCallback(() => setResume(true), []);
  const openShots = useCallback((items: Shot[], index: number) => setShots({ items, index }), []);

  return (
    <SiteCtx.Provider value={{ openResume, openShots }}>
      {children}
      {resume && <ResumePeek onClose={() => setResume(false)} />}
      {shots && <Lightbox items={shots.items} start={shots.index} onClose={() => setShots(null)} />}
    </SiteCtx.Provider>
  );
}
