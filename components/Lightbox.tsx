"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Close, Left, Right } from "./Icons";
import { sound } from "@/lib/sound";

export type LightboxItem = { src: string; alt: string; caption?: string; note?: string; w?: number; h?: number };

export default function Lightbox({ items, index, title, kicker, onClose }: { items: LightboxItem[]; index: number; title?: string; kicker?: string; onClose: () => void }) {
  const [i, setI] = useState(index);
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const item = items[i];

  const go = useCallback((d: number) => {
    setI((v) => (v + d + items.length) % items.length);
    sound.play("swish");
  }, [items.length]);

  const close = useCallback(() => {
    if (!root.current) return onClose();
    gsap.to(root.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    root.current?.querySelector<HTMLButtonElement>(".lb-close")?.focus();
    return () => { window.removeEventListener("keydown", key); lenis?.start(); document.body.style.overflow = ""; };
  }, [close, go]);

  useEffect(() => {
    if (img.current) gsap.fromTo(img.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" });
  }, [i]);

  return (
    <div ref={root} className="lb" role="dialog" aria-modal="true" aria-label={`${title || "Image"} viewer`}
      onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("lb-stage")) close(); }}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x, dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90) close();
        touch.current = null;
      }}>
      <div className="lb-top">
        <div className="lb-title">{kicker && <span className="lb-kicker">{kicker}</span>}<span dangerouslySetInnerHTML={{ __html: title || "" }} /></div>
        <div className="lb-right"><span className="lb-count">{i + 1} / {items.length}</span>
          <button type="button" className="lb-close" aria-label="Close viewer" onClick={close} data-sound="none"><Close size={20} /></button></div>
      </div>
      <div className="lb-stage">
        <img ref={img} key={item.src} src={item.src} alt={item.alt} className="lb-img" />
      </div>
      {items.length > 1 && <>
        <button type="button" className="lb-arrow prev" aria-label="Previous image" onClick={() => go(-1)} data-sound="none"><Left size={22} /></button>
        <button type="button" className="lb-arrow next" aria-label="Next image" onClick={() => go(1)} data-sound="none"><Right size={22} /></button>
      </>}
      <div className="lb-cap"><span className="lb-cap-main">{item.caption || item.alt}</span>{item.note && <span className="hand lb-note">{item.note}</span>}</div>
      {items.length > 1 && <div className="lb-thumbs">{items.map((t, k) => (
        <button key={t.src + k} type="button" className={k === i ? "on" : ""} aria-label={`Show image ${k + 1}`} onClick={() => { setI(k); sound.play("tick"); }} data-sound="none"><img src={t.src} alt="" /></button>
      ))}</div>}
    </div>
  );
}
