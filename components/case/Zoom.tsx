"use client";

import { useSite } from "../Providers";
import type { LightboxItem } from "../Lightbox";

export type Img = { src: string; alt: string; w: number; h: number };
export type Row = { fr: number; imgs: Img[] }[];

/** Rows of browser-framed screens; any screen opens the lightbox for the whole group. */
export function ScreenRows({ rows, title, kicker, note, dark = false }: { rows: Row[]; title: string; kicker: string; note?: string; dark?: boolean }) {
  const { openLightbox } = useSite();
  const flat: LightboxItem[] = rows.flatMap((r) => r.flatMap((c) => c.imgs.map((i) => ({ src: i.src, alt: i.alt, caption: i.alt, note }))));
  let k = -1;
  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} className="screens-row" style={{ gridTemplateColumns: row.map((c) => `minmax(0, ${c.fr}fr)`).join(" ") }}>
          {row.map((col, ci) => (
            <div key={ci} className="screens-col">
              {col.imgs.map((img) => {
                k += 1; const idx = k;
                return (
                  <button key={img.src} type="button" className={`browser zoomable${dark ? " dark" : ""}`} style={{ ["--r" as string]: `${[-0.8, 0.8, -0.5][(ri + ci + idx) % 3]}deg` }} data-rot={[-0.8, 0.8, -0.5][(ri + ci + idx) % 3]}
                    onClick={() => openLightbox(flat, idx, title, kicker)} data-cursor="View" data-reveal="up" data-sound="none" aria-label={`Open: ${img.alt}`}>
                    <span className="bar"><i /><i /><i /></span>
                    <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

/** A single illustration that opens large on click. */
export function Figure({ img, alt, title, kicker }: { img: { src: string; w: number; h: number }; alt: string; title: string; kicker: string }) {
  const { openLightbox } = useSite();
  return (
    <button type="button" className="illo zoomable" onClick={() => openLightbox([{ src: img.src, alt, caption: alt }], 0, title, kicker)} data-cursor="View" data-reveal="up" data-sound="none" aria-label={`Open: ${alt}`}>
      <img src={img.src} alt={alt} width={img.w} height={img.h} loading="lazy" />
    </button>
  );
}
