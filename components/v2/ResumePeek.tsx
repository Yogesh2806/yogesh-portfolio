"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { Close, Download, External } from "./Icons";

// An Arc-style "peek" window. The resume shows as one image that fits the window;
// a click zooms it to full width for reading, another click fits it again.
export default function ResumePeek({ onClose }: { onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    close.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);
  return (
    <div className="peek" role="dialog" aria-modal="true" aria-label="Resume">
      <div className="peek-scrim" onClick={onClose} />
      <div className="peek-win">
        <div className="peek-bar">
          <div><span className="yj">yj.</span><b style={{ fontWeight: 600 }}>Resume</b><span className="muted">Yogesh Jeevan · PDF</span></div>
          <div>
            <a className="peek-dl" href={SITE.resume} download="Yogesh_Jeevan_Product_Designer.pdf"><Download />Download</a>
            <a className="peek-ic" href={SITE.resume} target="_blank" rel="noreferrer" aria-label="Open the PDF in a new tab"><External /></a>
            <button ref={close} className="peek-ic" onClick={onClose} aria-label="Close"><Close /></button>
          </div>
        </div>
        <div className={`peek-body${zoom ? " zoom" : ""}`} data-lenis-prevent>
          <button type="button" onClick={() => setZoom((z) => !z)} aria-label={zoom ? "Fit the resume to the window" : "Zoom in to read"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.resumeImg} alt="Yogesh Jeevan, Product Designer: one-page resume" />
          </button>
        </div>
        <span className="peek-hint">{zoom ? "click to fit" : "click to zoom"}</span>
      </div>
    </div>
  );
}
