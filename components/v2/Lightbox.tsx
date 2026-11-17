"use client";

import { useEffect, useState } from "react";
import { ArrowL, ArrowR, Close } from "./Icons";

export type Shot = { src: string; alt: string };

export default function Lightbox({ items, start, onClose }: { items: Shot[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });
  const s = items[i];
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={s.alt} onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.src} alt={s.alt} onClick={(e) => e.stopPropagation()} />
      <button className="lb-x" onClick={onClose} aria-label="Close"><Close /></button>
      {items.length > 1 && <>
        <button className="lb-nav" style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous"><ArrowL /></button>
        <button className="lb-nav" style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next"><ArrowR /></button>
      </>}
      <div className="lb-cap">{s.alt} · {i + 1} / {items.length}</div>
    </div>
  );
}
