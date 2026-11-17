"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { Close, Download, External } from "./Icons";

// An Arc-style "peek" window: the resume floats over the page, one bar of controls on top.
export default function ResumePeek({ onClose }: { onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);
  return (
    <div className="peek" role="dialog" aria-modal="true" aria-label="Resume">
      <div className="peek-scrim" onClick={onClose} />
      <div className="peek-win" data-lenis-prevent>
        <div className="peek-bar">
          <div><span className="yj">yj.</span><b style={{ fontWeight: 600 }}>Resume</b><span className="muted">Yogesh Jeevan · PDF</span></div>
          <div>
            <a className="peek-dl" href={SITE.resume} download="Yogesh_Jeevan_Product_Designer.pdf"><Download />Download</a>
            <a className="peek-ic" href={SITE.resume} target="_blank" rel="noreferrer" aria-label="Open in a new tab"><External /></a>
            <button ref={close} className="peek-ic" onClick={onClose} aria-label="Close"><Close /></button>
          </div>
        </div>
        <div className="peek-body"><iframe src={`${SITE.resume}#view=FitH&toolbar=0`} title="Yogesh Jeevan resume" /></div>
      </div>
    </div>
  );
}
