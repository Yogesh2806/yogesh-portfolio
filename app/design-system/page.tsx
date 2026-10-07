import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AaMark from "@/components/case/AaMark";
import { ScreenRows, type Row } from "@/components/case/Zoom";
import { Arrow, Star } from "@/components/Icons";
import { DS } from "@/lib/ds";

export const metadata: Metadata = {
  title: "Aa NAD Design System",
  description: "An open-source, monochrome, accessibility-first design system for web and mobile, designed and shipped end to end with Claude as my build partner.",
  openGraph: { title: "Aa NAD Design System · Yogesh Jeevan", description: "Bring your own brand: 249 tokens, 45 React components, 3 themes and a Figma library generated from code.", images: [{ url: "/img/ds/ds-figma-thumbnail.webp" }] },
};

const NOTE = ["#FFE45C", "#FFB3C7", "#B8D4FF", "#C5F0A4", "#FFC98A", "#D9C8FF"];
const img = (f: string, alt: string, w = 1600, h = 900) => ({ src: `/img/ds/ds-${f}.webp`, alt, w, h });

function Head({ n, label, children, color }: { n: number; label: string; children: React.ReactNode; color?: string }) {
  return (
    <div className="cs-head" style={color ? { color } : undefined}>
      <div className="label">({String(n).padStart(2, "0")}) {label}</div>
      <h2 className="h-sec sm" data-split="">{children}</h2>
    </div>
  );
}

function Out({ href, children, cls = "btn-outline" }: { href: string; children: React.ReactNode; cls?: string }) {
  return <a className={`btn ${cls} ds-btn`} href={href} target="_blank" rel="noreferrer">{children} <Arrow size={15} /></a>;
}

export default function DesignSystemPage() {
  const solution: Row[] = [
    [{ fr: 1, imgs: [img("carousel-01", "Every component, every state: 45 React components and 15 Figma component sets")] }],
    [{ fr: 1, imgs: [img("carousel-02", "Light, Dark and High contrast themes, every colour pair checked in code")] }, { fr: 1, imgs: [img("carousel-04", "Ionicons, 15 line illustrations and 8 illustrated avatars")] }],
    [{ fr: 1, imgs: [img("components", "React components in the docs: buttons, fields, comboboxes, alerts, cards and badges", 1600, 797)] }],
  ];
  const gallery: Row[] = [
    [{ fr: 7, imgs: [img("docs-hero", "The Aa NAD docs site on GitHub Pages", 1440, 900), img("figma-thumbnail", "The Aa NAD Figma Community file cover")] }, { fr: 3, imgs: [img("docs-mobile", "The Aa NAD docs on a phone", 780, 1688)] }],
  ];
  const foundations: Row[] = [[{ fr: 1, imgs: [img("carousel-03", "Foundations: the 12-hue palette, Atkinson Hyperlegible Next type scale, 8px spacing and radius")] }]];

  return (
    <>
      <Nav mode="float" tone="light" />
      <main id="main" className="cs cs-ds">
        {/* hero */}
        <section className="cs-hero ds-hero" id="top">
          <div className="cs-hero-grid">
            <div className="cs-hero-text">
              <div className="ds-kick"><AaMark size={34} /><span className="label" style={{ opacity: .85 }}>{DS.kicker}</span></div>
              <h1 data-split="now">Designing an open-source design system, with <span className="ital ds-claude">Claude</span> as my build partner</h1>
              <p className="lede" data-reveal="up" data-delay="0.3">{DS.sub}</p>
              <div className="ds-btns" data-reveal="up" data-delay="0.4">
                <Out href={DS.links.docs} cls="btn-mari">Open the live docs</Out>
                <Out href={DS.links.github}>GitHub</Out>
                <Out href={DS.links.figma}>Figma Community</Out>
              </div>
            </div>
            <div className="cs-hero-art">
              <figure className="polaroid cs-cover" data-reveal="drop" data-rot="3" data-delay="0.2"><img src="/img/ds/ds-figma-thumbnail.webp" alt="Aa NAD Design System Figma library cover" style={{ objectPosition: "left" }} /><figcaption>{DS.cap}</figcaption></figure>
              <div className="note cs-note" data-reveal="scale" data-rot="-6" data-delay="0.6">{DS.note}</div>
              <span className="ds-tag" data-reveal="scale" data-rot="10" data-delay="0.7">OPEN SOURCE · MIT</span>
            </div>
          </div>
          <div className="cs-meta">
            {DS.meta.map(([k, v], j) => <div key={k} className="cs-meta-i" data-reveal="up" data-rot={[-1.5, 1, -1, 1.5, -0.5][j % 5]} data-delay={(0.4 + j * 0.05).toFixed(2)}><span>{k}</span><b>{v}</b></div>)}
          </div>
        </section>

        {/* 01 snapshot */}
        <section className="sec cs-snap">
          <div className="cs-split">
            <Head n={1} label="Snapshot">Snap<span className="ital">shot</span></Head>
            <div className="cs-split-r" data-reveal="up">
              <p className="lede">{DS.snapshot}</p>
              <div className="ds-btns"><Out href={DS.links.docs}>Live docs</Out><Out href={DS.links.github}>GitHub</Out><Out href={DS.links.figma}>Figma Community</Out></div>
            </div>
          </div>
          <div className="cs-metrics">
            {DS.metrics.map(([a, b], j) => <div key={a} className="cs-metric" style={{ background: NOTE[j % 6], ["--r" as string]: `${[-2, 1.5, -1, 2][j % 4]}deg` }} data-reveal="drop" data-rot={[-2, 1.5, -1, 2][j % 4]} data-reveal-sound="paper"><span data-count="">{a}</span><span>{b}</span></div>)}
          </div>
          <p className="cs-impact-note">{DS.metrics_src}</p>
        </section>

        {/* 02 problem */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <Head n={2} label="The problem">The <span className="ital" style={{ color: "var(--pink)" }}>problem</span></Head>
          <p className="lede cs-intro">{DS.problem_intro}</p>
          <div className="cs-problems c2">
            {DS.problems.map(([t, d], j) => <div key={t} className="cs-card" data-reveal="up"><span className="cs-card-k">PROBLEM 0{j + 1}</span><span className="cs-card-t">{t}</span><p>{d}</p></div>)}
          </div>
          <p className="hand cs-close">{DS.problem_close}</p>
        </section>

        {/* 03 goals */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <Head n={3} label="Goals">What <span className="ital">success</span> looked like</Head>
          <div className="cs-goals">
            {([["For the system", DS.goals_b, "#B8D4FF", -1.2], ["For the people using it", DS.goals_u, "#C5F0A4", 1.2]] as const).map(([t, items, bg, r]) => (
              <div key={t} className="cs-goal" style={{ background: bg, ["--r" as string]: `${r}deg` }} data-reveal="up" data-rot={String(r)}>
                <span className="cs-goal-t">{t}</span>
                <ul>{items.map(([a, b]) => <li key={a}><Star size={16} color="#1A1426" /><span><b>{a}.</b> {b}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* 04 users */}
        <section className="sec cs-users">
          <Head n={4} label="Understanding the users">Who it&rsquo;s <span className="ital" style={{ color: "var(--indigo)" }}>for</span></Head>
          <p className="lede cs-intro">{DS.users_intro}</p>
          <div className="label cs-plabel">Three readers</div>
          <div className="cs-personas">
            {DS.personas.map(([p, t, d], j) => <div key={p} className="cs-persona" style={{ ["--r" as string]: `${[-1, 1, -0.5][j % 3]}deg` }} data-reveal="up" data-rot={[-1, 1, -0.5][j % 3]}><div><span className="cs-av" style={{ background: NOTE[j + 1] }}>{p[0]}</span><span className="cs-persona-n">{p}</span></div><b className="ds-pt">{t}</b><p>{d}</p></div>)}
          </div>
          <div className="label cs-plabel">Methods</div>
          <div className="ds-chips">{DS.methods.map((m) => <span key={m} className="ds-chip" data-reveal="up">{m}</span>)}</div>
          <div className="cs-insight ds-insight" data-reveal="up" data-rot="-0.6"><AaMark size={80} className="ds-insight-mark" /><div><span className="cs-insight-tag"><Star size={14} color="#1A1426" /> The key insight</span><p>{DS.insight}</p></div></div>
        </section>

        {/* 05 approach */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <Head n={5} label="The approach">Me on <span className="ital" style={{ color: "var(--indigo)" }}>direction</span>, Claude on the build</Head>
          <p className="lede cs-intro">{DS.approach_intro}</p>
          <div className="ds-two">
            {([["I owned", DS.owned, "#FFE45C"], ["Claude handled", DS.claude, "#B8D4FF"]] as const).map(([t, items, bg]) => (
              <div key={t} className="cs-card ds-list" data-reveal="up"><span className="ds-pill" style={{ background: bg }}>{t}</span><ol>{items.map((x, j) => <li key={x}><span>0{j + 1}</span>{x}</li>)}</ol></div>
            ))}
          </div>
          <div className="cs-screens-head light"><div className="label">The workflow</div><span className="hand" style={{ color: "var(--pink)" }}>one loop, repeated every week</span></div>
          <div className="cs-steps">{DS.steps.map((s, j) => <div key={s} className="cs-step" data-reveal="drop" data-rot={[-2, 1.5, -1, 2, -1.5, 1][j]} style={{ background: NOTE[j] }} data-reveal-sound="paper"><span className="cs-step-n">0{j + 1}</span>{s}</div>)}</div>
          <div className="label cs-plabel">Real bugs I fixed in Figma</div>
          <div className="ds-notes">{DS.bugs.map(([t, d], j) => <div key={t} className="ds-sticky" style={{ background: NOTE[j], ["--r" as string]: `${[-1.5, 1.2, -0.8][j]}deg` }} data-reveal="drop" data-rot={[-1.5, 1.2, -0.8][j]}><span className="hand">{t}</span><p>{d}</p></div>)}</div>
        </section>

        {/* 06 principles */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <Head n={6} label="Design principles">Three <span className="ital">rules</span>, six decisions</Head>
          <div className="cs-principles">
            {DS.principles.map(([t, d], j) => <div key={t} className="cs-principle" data-reveal="up"><span className="cs-pn" style={{ color: "var(--pink)" }}>0{j + 1}</span><span className="cs-pt">{t}</span><span className="cs-pd">{d}</span></div>)}
          </div>
          <div className="cs-screens-head light"><div className="label">The decisions</div><span className="hand" style={{ color: "var(--pink)" }}>every one written down, so nobody has to guess</span></div>
          <div className="ds-decisions">{DS.decisions.map(([k, t, d]) => <div key={k} className="ds-dec" data-reveal="up"><span className="ds-dec-k">{k}</span><span className="ds-dec-t">{t}</span><p>{d}</p></div>)}</div>
          <ScreenRows rows={foundations} title="Aa NAD" kicker="Foundations" />
        </section>

        {/* 07 solution */}
        <section className="sec cs-solution">
          <Head n={7} label="The solution" color="var(--ivory)">What <span className="ital" style={{ color: "var(--mari)" }}>shipped</span></Head>
          <p className="lede cs-intro">{DS.solution_intro}</p>
          <div className="cs-features c3">
            {DS.features.map(([t, d], j) => <div key={t} className="cs-feature" data-reveal="up"><span className="cs-fi" style={{ background: NOTE[j % 6] }}>{String.fromCharCode(65 + j)}</span><span className="cs-ft">{t}</span><span className="cs-fd">{d}</span></div>)}
          </div>
          <div className="cs-screens-head"><div className="label">In the system</div><span className="hand">click any shot to open it</span></div>
          <ScreenRows rows={solution} title="Aa NAD" kicker="In the system" dark />
        </section>

        {/* 08 trade-offs */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <Head n={8} label="Trade-offs">Trade-offs &amp; <span className="ital" style={{ color: "var(--pink)" }}>decisions</span></Head>
          <p className="hand cs-tnote">the safe choice was always there. I mostly didn&rsquo;t take it.</p>
          <div className="cs-trades c2">
            {DS.tradeoffs.map(([a, b, d, r]) => <div key={a} className="cs-trade" data-reveal="up"><div className="cs-vs"><span className="cs-chip p">{a}</span><span className="hand">vs</span><span className="cs-chip b">{b}</span></div><p>{d}</p><span className="hand cs-res">→ {r}</span></div>)}
          </div>
        </section>

        {/* 09 impact */}
        <section className="sec cs-impact dots">
          <Head n={9} label="Impact">The <span className="ital">impact</span></Head>
          <div className="cs-impacts">{DS.impact.map(([a, b]) => <div key={a} className="cs-imp" data-reveal="up"><span data-count="">{a}</span><span>{b}</span></div>)}</div>
          <p className="cs-impact-note" data-reveal="up">{DS.impact_note}</p>
        </section>

        {/* 10 reflection */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <div className="cs-split">
            <Head n={10} label="Reflection">Looking <span className="ital">back</span></Head>
            <div className="cs-split-r"><p className="cs-quote" data-split="">&ldquo;{DS.quote}&rdquo;</p><p className="cs-refl">{DS.reflection}</p></div>
          </div>
        </section>

        {/* 11 setup + gallery */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <div className="cs-split">
            <Head n={11} label="The setup">The <span className="ital">setup</span></Head>
            <div className="cs-setup" data-reveal="up" data-rot="-0.8">{DS.setup.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}</div>
          </div>
          <div className="cs-screens-head light"><div className="label">The docs and the file</div><span className="hand" style={{ color: "var(--pink)" }}>live, free, and yours to fork</span></div>
          <ScreenRows rows={gallery} title="Aa NAD" kicker="The docs and the file" />
          <div className="ds-btns ds-btns-end"><Out href={DS.links.docs} cls="btn-ink">Open the live docs</Out><Out href={DS.links.github}>Star it on GitHub</Out><Out href={DS.links.figma}>Duplicate the Figma file</Out></div>
        </section>

        {/* 12 living log */}
        <section className="sec" style={{ background: "var(--ivory)" }} id="log">
          <Head n={12} label="Living log">Still <span className="ital" style={{ color: "var(--pink)" }}>shipping</span></Head>
          <p className="hand cs-tnote">this section grows every week, as the system does.</p>
          <div className="ds-log">
            <div>
              <div className="label">Changelog</div>
              <ol className="ds-versions">
                {DS.log.map(([v, t], j) => <li key={v} data-reveal="up" className={j === 0 ? "on" : ""}><div><b>v{v}</b>{j === 0 && <span className="ds-latest">LATEST</span>}</div><p>{t}</p></li>)}
              </ol>
              <a className="btn btn-outline ds-btn" href={`${DS.links.github}/blob/main/CHANGELOG.md`} target="_blank" rel="noreferrer">Full changelog on GitHub <Arrow size={15} /></a>
            </div>
            <div className="ds-learn">
              <div className="label">What I&rsquo;m learning</div>
              {DS.learn.map((t, j) => <div key={t} className="ds-sticky hand" style={{ background: NOTE[j], ["--r" as string]: `${[-2, 1.5, -1][j % 3]}deg` }} data-reveal="drop" data-rot={[-2, 1.5, -1][j % 3]}>{t}</div>)}
            </div>
          </div>
        </section>

        {/* next case */}
        <section className="cs-next dots" style={{ background: "var(--indigo)" }}>
          <Link href="/work/doctiq/" className="cs-next-link" data-cursor="Next" data-sound="whoosh" style={{ color: "var(--ivory)" }}>
            <div><div className="label">Next case study</div><span className="cs-next-t">Designing an AI-powered clinic SaaS app, shipped in two weeks →</span></div>
            <figure className="polaroid cs-next-cover"><img src="/img/home/cover-doctiq.webp" alt="Doctiq cover" loading="lazy" /><figcaption>Doctiq</figcaption></figure>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
