"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS, type VImg } from "@/lib/v2visuals";
import { useSite } from "./Providers";

const COLS = { full: "minmax(0, 1fr)", "2": "repeat(2, minmax(0, 1fr))", "3": "repeat(3, minmax(0, 1fr))", "75": "minmax(0, 7fr) minmax(0, 5fr)" };
const F = [["all", "All work"], ["mobile", "Mobile"], ["web", "Web"], ["brand", "Brand"]] as const;

export default function Visuals() {
  const [f, setF] = useState<(typeof F)[number][0]>("all");
  const { openShots } = useSite();
  const shown = PROJECTS.filter((p) => f === "all" || p.kind.includes(f));
  const count = PROJECTS.reduce((n, p) => n + p.rows.reduce((m, r) => m + r[2].length, 0), 0);
  return (
    <>
      <section className="sec vz-top">
        <div className="vz-hero">
          <div><div className="lab">Visuals</div><h1>Screens, not <span className="it">essays</span>.</h1></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingBottom: 8 }}>
            <span className="muted" style={{ fontSize: 18, lineHeight: 1.55 }}>Interfaces from apps, products and side projects. Mostly pictures, very few words.</span>
            <span className="hand" style={{ fontSize: 22, transform: "rotate(-2deg)" }}>scroll slowly, it&rsquo;s nicer ;)</span>
          </div>
        </div>
        <div className="vz-bar">
          <div className="filters" role="group" aria-label="Filter projects">{F.map(([k, l]) => <button key={k} aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}</div>
          <span className="lab">{String(shown.length).padStart(2, "0")} projects · {count} screens</span>
        </div>
        <div className="vz-idx">{shown.map((p, i) => <a key={p.id} href={`#${p.id}`}><span style={{ color: p.c }}>{String(i + 1).padStart(2, "0")}</span>{p.name}</a>)}</div>
      </section>
      {shown.map((p, i) => {
        const all: VImg[] = p.rows.flatMap((r) => r[2]);
        let k = 0;
        return (
          <section key={p.id} id={p.id} className="sec vp">
            <div className="vp-h" data-rv>
              <div><span className="lab" style={{ color: p.c }}>{String(i + 1).padStart(2, "0")}</span><b>{p.name}</b><p>{p.line}</p></div>
              <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </div>
            <div style={{ marginTop: 8 }}>
              {p.rows.map(([lay, h, imgs], ri) => (
                <div key={ri} className="vp-row" style={{ gridTemplateColumns: COLS[lay] }} data-rv>
                  {imgs.map((im) => { const idx = k++; return (
                    <button key={im.src} className="vimg" style={{ height: h, background: im.bg }} onClick={() => openShots(all.map(({ src, alt }) => ({ src, alt })), idx)} aria-label={`Open ${im.alt}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={im.src} alt={im.alt} loading="lazy" style={{ objectFit: im.fit || "cover", objectPosition: im.pos || "center" }} />
                    </button>
                  ); })}
                </div>
              ))}
            </div>
          </section>
        );
      })}
      <section className="sec">
        <div className="card outro" data-rv>
          <div><span className="lab">Case studies</span><span className="h3">Want the thinking behind <span className="it">the pixels</span>?</span><span className="muted" style={{ fontSize: 17 }}>Four deep dives: Doctiq, Speak+, Swimingo and the Aa NAD design system.</span></div>
          <Link href="/#work" className="btn btn-solid">Read the case studies →</Link>
        </div>
      </section>
    </>
  );
}
