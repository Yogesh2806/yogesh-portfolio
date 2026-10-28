import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Arrow, Download, Star } from "@/components/Icons";
import TICKETS from "@/lib/experience.json";
import { SITE, html } from "@/lib/site";

export const metadata: Metadata = { title: "Experience", description: "Nearly three years across HealthTech, EdTech, marketplaces and fin-ops: Doctiq, Wall Street English, Swimingo, Modent Me and more." };

type T = { frm: string; to: string; cls: string; loc: string; co: string; role: string; col: string; fg: string; pts: string[]; met: string[]; cv?: string; cvcap?: string; cta?: string };
const COVERS: Record<string, [string, string]> = { doctiq: ["/img/home/cover-doctiq.webp", "/work/doctiq/"], wse: ["/img/home/cover-speak.webp", "/work/speak-plus/"], swim: ["/img/home/cover-swimingo.webp", "/work/swimingo/"] };
const NOTE = ["#FFE45C", "#FFB3C7", "#B8D4FF", "#C5F0A4", "#FFC98A", "#D9C8FF"];
const STOPS = [["2022", "CES"], ["2023", "Ducima (Freelance)"], ["2024", "Swimingo (Freelance)"], ["2024", "Wall Street English"], ["2025", "Modent Me"], ["2025", "Doctiq"]];
const SKILLS = [
  ["Design", "UX research · journey mapping · information architecture · interaction design · wireframing &amp; prototyping · high-fidelity UI · design systems (Atomic Design) · usability testing · accessibility (WCAG)"],
  ["Product", "Product discovery · JTBD · A/B testing · funnel &amp; retention optimisation · MVP definition · roadmap input · stakeholder alignment"],
  ["AI-augmented", "Claude · ChatGPT · generative image &amp; video tools · AI-assisted research, ideation &amp; production"],
  ["Collaboration", "Cross-functional delivery · documentation &amp; handoff (Figma Dev Mode) · Agile · client &amp; stakeholder management"],
];

export default function Experience() {
  const list = TICKETS as T[];
  return (
    <>
      <Nav mode="float" tone="dark" />
      <main id="main" className="xp">
        <section className="xp-hero dots" id="top">
          <div className="xp-hero-grid">
            <div>
              <div className="label">(04) Experience</div>
              <h1 data-split="now">Where I&#8217;ve <span className="ital" style={{ color: "var(--indigo)" }}>shipped</span></h1>
            </div>
            <div className="xp-hero-r" data-reveal="up" data-delay="0.3">
              <p className="lede">Nearly three years across HealthTech, EdTech, marketplaces and fin-ops. From writing frontends to owning products end to end, with a creative studio on the side.</p>
              <span className="hand xp-hand">started in code. stayed for the people who use it ;)</span>
              <div className="xp-chips"><span className="chip" style={{ background: "var(--ink)", color: "var(--ivory)", borderColor: "var(--ink)" }}>6 stops</span><span className="chip" style={{ background: "#C5F0A4" }}>Open to full-time</span></div>
            </div>
          </div>
          <div className="xp-route" aria-label="The route, oldest to newest">
            <svg className="xp-route-line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 H1000" /></svg>
            {STOPS.map(([y, n], i) => (
              <div key={n} className={`xp-stop${i >= 4 ? " now" : ""}`} data-reveal="up" data-delay={(0.5 + i * 0.08).toFixed(2)}><span className="xp-dot" /><span className="xp-y">{y}</span><span className="xp-n">{n}</span>{i === 5 && <span className="hand xp-here">you are here ↑</span>}</div>
            ))}
          </div>
        </section>

        <section className="sec xp-tickets">
          <div className="xp-th"><div><div className="label">Tickets, newest first</div><h2 className="h-sec sm" data-split="">Every stop, <span className="ital" style={{ color: "var(--pink)" }}>stamped</span></h2></div><span className="hand">every stop taught me something new</span></div>
          <div className="xp-list">
            {list.map((t, i) => (
              <article key={t.co} className="ticket" style={{ ["--r" as string]: `${[-0.6, 0.6][i % 2]}deg` }} data-reveal="up" data-rot={[-0.6, 0.6][i % 2]} data-reveal-sound="paper">
                <div className="ticket-stub" style={{ background: t.col, color: t.fg }}>
                  <div className="ticket-top"><span>TICKET 0{6 - i} / 06</span>{t.to === "Now" && <em>NOW</em>}</div>
                  <div className="ticket-co">{t.co}</div>
                  <div className="ticket-role" dangerouslySetInnerHTML={html(t.role)} />
                  <div className="ticket-meta">{[["FROM", t.frm], ["TO", t.to], ["CLASS", t.cls], ["WHERE", t.loc]].map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
                </div>
                <div className="ticket-perf" aria-hidden="true" />
                <div className="ticket-body">
                  <ul>{t.pts.map((p) => <li key={p}><Star size={14} color="#1A1426" /><span dangerouslySetInnerHTML={html(p)} /></li>)}</ul>
                  <div className="ticket-mets">{t.met.map((m, j) => <span key={m} className="chip" style={{ background: NOTE[j % 6], borderColor: "var(--ink)" }}>{m}</span>)}</div>
                  {t.cv && <Link href={COVERS[t.cv][1]} className="ticket-case" data-cursor="View case" data-sound="whoosh">
                    <figure className="polaroid"><img src={COVERS[t.cv][0]} alt={t.cvcap} loading="lazy" /><figcaption>{t.cvcap}</figcaption></figure>
                    <span className="btn btn-ink">{t.cta} <Arrow size={15} /></span>
                  </Link>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sec xp-skills">
          <div className="label">What I bring</div>
          <h2 className="h-sec sm" data-split="">Skills, <span className="ital" style={{ color: "var(--pink)" }}>sorted</span></h2>
          <div className="xp-sk">{SKILLS.map(([t, d], i) => <div key={t} className="xp-note" style={{ background: NOTE[i] }} data-reveal="drop" data-rot={[-1.5, 1.2, -1, 1.5][i]} data-reveal-sound="paper"><b>{t}</b><span dangerouslySetInnerHTML={html(d)} /></div>)}</div>
        </section>

        <section className="sec xp-edu">
          <div className="xp-edu-grid">
            <div><div className="label">Education</div><h2 className="h-sec sm" data-split="">Engineer by degree, <span className="ital" style={{ color: "var(--indigo)" }}>designer by choice</span></h2></div>
            <div className="report" data-reveal="up" data-rot="-1">
              <div className="report-top"><span>REPORT CARD</span><span>2018 → 2022</span></div>
              <b>B.E. Computer Science and Engineering</b><span>R.M.K. College of Engineering and Technology, Chennai</span>
              <div className="report-grade"><span data-count="">8.21</span><em>/ 10 CGPA</em><span className="hand">not bad ;)</span></div>
            </div>
          </div>
        </section>

        <section className="sec xp-cta dots">
          <h2 className="h-sec sm" data-split="">Want the one-page <span className="ital" style={{ color: "var(--indigo)" }}>version?</span></h2>
          <div className="xp-cta-btns">
            <a className="btn btn-ink" href={SITE.resume} download>Download resume <Download size={16} /></a>
            <Link className="btn btn-outline" href="/#work">See the case studies <Arrow size={16} /></Link>
            <Link className="btn btn-outline" href="/#contact">Say hello <Arrow size={16} /></Link>
          </div>
          <span className="hand xp-pdf">PDF, 1 page. no fluff, promise.</span>
        </section>
      </main>
      <Footer />
    </>
  );
}
