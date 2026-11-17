"use client";

import { useSite } from "./Providers";
import type { Shot } from "./Lightbox";

export function ResumeButton({ className, label = "Resume ↗" }: { className?: string; label?: string }) {
  const { openResume } = useSite();
  return <button className={className} onClick={openResume}>{label}</button>;
}

// An image that opens the lightbox with its siblings.
export function Zoom({ items, index, className, style, children }: { items: Shot[]; index: number; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const { openShots } = useSite();
  return <button type="button" className={className} style={style} onClick={() => openShots(items, index)} aria-label={`Open ${items[index].alt}`}>{children}</button>;
}
