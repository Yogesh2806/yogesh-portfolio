"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { sound } from "@/lib/sound";

// every route enters behind a marigold curtain that lifts away
export default function Template({ children }: { children: React.ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const first = !(window as unknown as { __yjNav?: boolean }).__yjNav;
    (window as unknown as { __yjNav?: boolean }).__yjNav = true;
    const el = curtain.current;
    if (!el) return;
    if (first || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.display = "grid";
    sound.play("whoosh");
    gsap.fromTo(el, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.05, onComplete: () => { el.style.display = "none"; } });
  }, []);
  return (
    <>
      <div ref={curtain} className="curtain" aria-hidden="true"><span className="yj">yj.</span></div>
      {children}
    </>
  );
}
