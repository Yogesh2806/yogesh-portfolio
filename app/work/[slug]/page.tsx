import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ScreenRows, Figure, type Row } from "@/components/case/Zoom";
import { Arrow, Star } from "@/components/Icons";
import CASES from "@/lib/cases.json";
import { html } from "@/lib/site";

type Img = { src: string; w: number; h: number };
type Case = {
  key: string; slug: string; name: string; color: string; fg: string; cover: Img; cap: string; note: string; kicker: string; title: string; sub: string;
  meta: [string, string][]; snapshot: string; link?: string; metrics: [string, string][]; problem_intro: string; problems: [string, string][]; problem_close: string;
  goals_b: string[]; goals_u: string[]; goals_img?: Img; goals_img_alt?: string; users_intro: string; methods: [string, string][]; personas_label: string; personas: [string, string][];
  insight: string; users_img?: Img; users_img_alt?: string; principles: [string, string][]; principles_img?: Img; principles_img_alt?: string; solution_intro: string;
  features: [string, string][]; solution_img?: Img; solution_img_alt?: string; screens_note: string; screen_rows: Row[]; trade_note: string; tradeoffs: [string, string, string, string][];
  trade_img?: Img; trade_img_alt?: string; impact: [string, string][]; impact_note?: string; impact_img?: Img; impact_img_alt?: string; reflection: [string, string]; setup: [string, string][];
  gallery_rows: Row[]; gallery_label?: string; gallery_note?: string;
};
const ALL = CASES as unknown as Case[];
const NOTE = ["#FFE45C", "#FFB3C7", "#B8D4FF", "#C5F0A4", "#FFC98A", "#D9C8FF"];

export function generateStaticParams() { return ALL.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = ALL.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.name} case study`, description: cs.sub, openGraph: { title: `${cs.name} · ${cs.title}`, description: cs.sub, images: [{ url: cs.cover.src }] } };
}

const H = ({ s, as: T = "span", className, style }: { s: string; as?: "span" | "p" | "h3" | "div"; className?: string; style?: React.CSSProperties }) => <T className={className} style={style} dangerouslySetInnerHTML={html(s)} />;

function Head({ n, label, children, color }: { n: number; label: string; children: React.ReactNode; color?: string }) {
  return (
    <div className="cs-head" style={color ? { color } : undefined}>
      <div className="label">({String(n).padStart(2, "0")}) {label}</div>
      <h2 className="h-sec sm" data-split="">{children}</h2>
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = ALL.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const cs = ALL[i], nxt = ALL[(i + 1) % ALL.length];
  const hasExtra = true;
  const n = (k: number) => (hasExtra ? k : k - 1);
  const light = cs.fg === "#FBF5EA";
  const figTitle = cs.name;

  return (
    <>
      <Nav mode="float" tone={light ? "light" : "dark"} />
      <main id="main" className={`cs cs-${cs.key}`}>
        {/* hero */}
        <section className="cs-hero dots" style={{ background: cs.color, color: cs.fg }} id="top">
          <div className="cs-hero-grid">
            <div className="cs-hero-text">
              <div className="label" style={{ opacity: .85 }}>{cs.kicker}</div>
              <h1 data-split="now">{cs.title}</h1>
              <p className="lede" data-reveal="up" data-delay="0.3">{cs.sub}</p>
            </div>
            <div className="cs-hero-art">
              <figure className="polaroid cs-cover" data-reveal="drop" data-rot="3" data-delay="0.2"><img src={cs.cover.src} alt={`${cs.name} cover`} /><figcaption>{cs.cap}</figcaption></figure>
              <div className="note cs-note" data-reveal="scale" data-rot="-6" data-delay="0.6">{cs.note}</div>
            </div>
          </div>
          <div className="cs-meta">
            {cs.meta.map(([k, v], j) => <div key={k} className="cs-meta-i" data-reveal="up" data-rot={[-1.5, 1, -1, 1.5, -0.5][j % 5]} data-delay={(0.4 + j * 0.05).toFixed(2)}><span>{k}</span><b dangerouslySetInnerHTML={html(v)} /></div>)}
          </div>
        </section>

        {/* 01 snapshot */}
        <section className="sec cs-snap">
          <div className="cs-split">
            <Head n={1} label="Snapshot">Snap<span className="ital">shot</span></Head>
            <div className="cs-split-r" data-reveal="up"><H s={cs.snapshot} as="p" className="lede" />
              {cs.link && <a className="btn btn-outline cs-visit" href={cs.link} target="_blank" rel="noreferrer">Visit {cs.link.replace("https://", "").replace(/\/$/, "")} <Arrow size={15} /></a>}</div>
          </div>
          <div className="cs-metrics">
            {cs.metrics.map(([a, b], j) => <div key={a} className="cs-metric" style={{ background: NOTE[j % 6], ["--r" as string]: `${[-2, 1.5, -1, 2][j % 4]}deg` }} data-reveal="drop" data-rot={[-2, 1.5, -1, 2][j % 4]} data-reveal-sound="paper"><span data-count="">{a}</span><H s={b} /></div>)}
          </div>
        </section>

        {/* 02 problem */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <Head n={2} label="The problem">The <span className="ital" style={{ color: "var(--pink)" }}>problem</span></Head>
          <H s={cs.problem_intro} as="p" className="lede cs-intro" />
          <div className={`cs-problems c${cs.problems.length === 4 ? 2 : Math.min(cs.problems.length, 4)}`}>
            {cs.problems.map(([t, d], j) => <div key={t} className="cs-card" data-reveal="up"><span className="cs-card-k">PROBLEM 0{j + 1}</span><H s={t} className="cs-card-t" /><H s={d} as="p" /></div>)}
          </div>
          <H s={cs.problem_close} as="p" className="hand cs-close" />
        </section>

        {/* 03 goals */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <Head n={3} label="Goals">What <span className="ital">success</span> meant</Head>
          <div className="cs-goals">
            {[["Business", cs.goals_b, "#B8D4FF", -1.2], ["Users", cs.goals_u, "#C5F0A4", 1.2]].map(([t, items, bg, r]) => (
              <div key={t as string} className="cs-goal" style={{ background: bg as string, ["--r" as string]: `${r}deg` }} data-reveal="up" data-rot={String(r)}>
                <span className="cs-goal-t">{t as string}</span>
                <ul>{(items as string[]).map((x) => <li key={x}><Star size={16} color="#1A1426" /><H s={x} /></li>)}</ul>
              </div>
            ))}
          </div>
          {cs.goals_img && <div className="cs-fig"><Figure img={cs.goals_img} alt={cs.goals_img_alt!} title={figTitle} kicker="Goals" /></div>}
        </section>

        {/* 04 users */}
        <section className="sec cs-users">
          <Head n={4} label="Understanding the users">Understanding the <span className="ital" style={{ color: "var(--indigo)" }}>users</span></Head>
          <H s={cs.users_intro} as="p" className="lede cs-intro" />
          <div className="cs-methods" style={{ ["--n" as string]: cs.methods.length }}>
            {cs.methods.map(([t, d]) => <div key={t} className="cs-method" data-reveal="up"><H s={t} className="cs-method-t" /><H s={d} /></div>)}
          </div>
          <div className="label cs-plabel">{cs.personas_label}</div>
          <div className="cs-personas">
            {cs.personas.map(([p, d], j) => <div key={p} className="cs-persona" style={{ ["--r" as string]: `${[-1, 1, -0.5][j % 3]}deg` }} data-reveal="up" data-rot={[-1, 1, -0.5][j % 3]}><div><span className="cs-av" style={{ background: NOTE[j + 1] }}>{p[0]}</span><H s={p} className="cs-persona-n" /></div><H s={d} as="p" /></div>)}
          </div>
          <div className="cs-insight" data-reveal="up" data-rot="-0.6"><span className="cs-insight-tag"><Star size={14} color="#1A1426" /> The key insight</span><H s={cs.insight} as="p" /></div>
          {cs.users_img && <div className="cs-fig"><Figure img={cs.users_img} alt={cs.users_img_alt!} title={figTitle} kicker="Users" /></div>}
        </section>

        {/* 05 extra */}
        <Extra cs={cs} />

        {/* 06 principles */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <Head n={n(6)} label="Design principles">Design <span className="ital">principles</span></Head>
          <div className="cs-principles">
            {cs.principles.map(([t, d], j) => <div key={t} className="cs-principle" data-reveal="up"><span className="cs-pn" style={{ color: cs.color === "#F4A300" ? "var(--pink)" : cs.color }}>0{j + 1}</span><H s={t} className="cs-pt" /><H s={d} className="cs-pd" /></div>)}
          </div>
          {cs.principles_img && <div className="cs-fig"><Figure img={cs.principles_img} alt={cs.principles_img_alt!} title={figTitle} kicker="Principles" /></div>}
        </section>

        {/* 07 solution */}
        <section className="sec cs-solution">
          <Head n={n(7)} label="The solution" color="var(--ivory)">The <span className="ital" style={{ color: "var(--mari)" }}>solution</span></Head>
          <H s={cs.solution_intro} as="p" className="lede cs-intro" />
          <div className={`cs-features c${cs.features.length % 3 === 0 ? 3 : 2}`}>
            {cs.features.map(([t, d], j) => <div key={t} className="cs-feature" data-reveal="up"><span className="cs-fi" style={{ background: NOTE[j % 6] }}>{String.fromCharCode(65 + j)}</span><H s={t} className="cs-ft" /><H s={d} className="cs-fd" /></div>)}
          </div>
          {cs.solution_img && <div className="cs-fig"><Figure img={cs.solution_img} alt={cs.solution_img_alt!} title={figTitle} kicker="Solution" /></div>}
          <div className="cs-screens-head"><div className="label">In the product</div><H s={cs.screens_note} className="hand" /></div>
          <ScreenRows rows={cs.screen_rows} title={cs.name} kicker="In the product" note={cs.screens_note} dark />
        </section>

        {/* 08 trade-offs */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <Head n={n(8)} label="Trade-offs">Trade-offs &amp; <span className="ital" style={{ color: "var(--pink)" }}>decisions</span></Head>
          <H s={cs.trade_note} as="p" className="hand cs-tnote" />
          <div className={`cs-trades c${cs.tradeoffs.length === 3 ? 3 : 2}`}>
            {cs.tradeoffs.map(([a, b, d, r]) => <div key={a} className="cs-trade" data-reveal="up"><div className="cs-vs"><H s={a} className="cs-chip p" /><span className="hand">vs</span><H s={b} className="cs-chip b" /></div><H s={d} as="p" /><H s={"→ " + r} className="hand cs-res" /></div>)}
          </div>
          {cs.trade_img && <div className="cs-fig"><Figure img={cs.trade_img} alt={cs.trade_img_alt!} title={figTitle} kicker="Trade-offs" /></div>}
        </section>

        {/* 09 impact */}
        <section className="sec cs-impact dots">
          <Head n={n(9)} label="Impact">The <span className="ital">impact</span></Head>
          <div className="cs-impacts">{cs.impact.map(([a, b]) => <div key={a} className="cs-imp" data-reveal="up"><span data-count="">{a}</span><H s={b} /></div>)}</div>
          {cs.impact_note && <p className="cs-impact-note" data-reveal="up">{cs.impact_note}</p>}
          {cs.impact_img && <div className="cs-fig"><Figure img={cs.impact_img} alt={cs.impact_img_alt!} title={figTitle} kicker="Impact" /></div>}
        </section>

        {/* 10 reflection */}
        <section className="sec" style={{ background: "var(--ivory)" }}>
          <div className="cs-split">
            <Head n={n(10)} label="Reflection">Looking <span className="ital">back</span></Head>
            <div className="cs-split-r"><p className="cs-quote" data-split="">&ldquo;{cs.reflection[0]}&rdquo;</p><H s={cs.reflection[1]} as="p" className="cs-refl" /></div>
          </div>
        </section>

        {/* 11 setup + gallery */}
        <section className="sec" style={{ background: "var(--sand)" }}>
          <div className="cs-split">
            <Head n={n(11)} label="The setup">The <span className="ital">setup</span></Head>
            <div className="cs-setup" data-reveal="up" data-rot="-0.8">{cs.setup.map(([k, v]) => <div key={k}><span>{k}</span><H s={v} /></div>)}</div>
          </div>
          {cs.gallery_rows.length > 0 && <>
            <div className="cs-screens-head light"><H s={cs.gallery_label || ""} className="label" /><H s={cs.gallery_note || ""} className="hand" style={{ color: "var(--pink)" }} /></div>
            <ScreenRows rows={cs.gallery_rows} title={cs.name} kicker={(cs.gallery_label || "").replace("&amp;", "&")} note={cs.gallery_note} />
          </>}
        </section>

        {/* next case */}
        <section className="cs-next dots" style={{ background: cs.key === "swim" ? "rgba(251,245,234,.82)" : nxt.color }}>
          <Link href={`/work/${nxt.slug}/`} className="cs-next-link" data-cursor="Next" data-sound="whoosh">
            <div><div className="label">Next case study</div><span className="cs-next-t">{nxt.title} →</span></div>
            <figure className="polaroid cs-next-cover"><img src={nxt.cover.src} alt={`${nxt.name} cover`} loading="lazy" /><figcaption>{nxt.name}</figcaption></figure>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Extra({ cs }: { cs: Case }) {
  if (cs.key === "doctiq") {
    const steps = ["Vision &amp; UX discovery", "Gemini: logic, edge cases, prompts", "Claude Design: rapid prototyping", "JSON tokens + Figma foundation", "Engineering implementation", "Live expo validation"];
    const pts = [["System ingestion", "Fed Gemini my Figma tokens, screen recordings, component mood boards and layout constraints."], ["Logic &amp; prompt generation", "Pressure-tested edge cases and clinical interaction logic, then generated structured prompts for rapid compilation in Claude Design."], ["Token synchronization", "Exported clean JSON design tokens (colour, spacing, type) straight into the engineering stack."]];
    return (
      <section className="sec" style={{ background: "var(--ivory)" }}>
        <Head n={5} label="The approach">An <span className="ital" style={{ color: "var(--indigo)" }}>AI-augmented</span> workflow</Head>
        <p className="lede cs-intro">Shipping an enterprise-grade healthcare SaaS as a solo designer in two weeks meant rethinking the process, not just the product. I built an AI-augmented pipeline that kept strategy and design decisions mine while accelerating execution.</p>
        <div className="cs-steps">{steps.map((s, j) => <div key={s} className="cs-step" data-reveal="drop" data-rot={[-2, 1.5, -1, 2, -1.5, 1][j]} style={{ background: NOTE[j] }} data-reveal-sound="paper"><span className="cs-step-n">0{j + 1}</span><H s={s} /></div>)}</div>
        <div className="cs-methods" style={{ ["--n" as string]: 3 }}>{pts.map(([t, d]) => <div key={t} className="cs-method" data-reveal="up"><H s={t} className="cs-method-t" /><H s={d} /></div>)}</div>
        <p className="hand cs-close" style={{ color: "var(--pink)" }}>the pace of a team, without handing off a single strategic decision.</p>
      </section>
    );
  }
  if (cs.key === "speak") {
    const qs = ["Why weren’t existing Core students upgrading to Speak+?", "What actually motivates advanced learners to keep practicing?", "What barriers stopped users from paying for speaking practice?", "How do trust and structured learning shape a subscription decision?"];
    return (
      <section className="sec" style={{ background: "var(--ivory)" }}>
        <Head n={5} label="The question">Asking the <span className="ital" style={{ color: "var(--pink)" }}>right</span> question</Head>
        <p className="lede cs-intro">Before designing anything I ran qualitative and quantitative research (satisfaction surveys and in-app behaviour analysis) around four questions:</p>
        <div className="cs-qs">{qs.map((q, j) => <div key={q} className="cs-q hand" style={{ background: NOTE[j] }} data-reveal="drop" data-rot={[-2, 1.5, -1, 2][j]} data-reveal-sound="paper">{q}</div>)}</div>
        <div className="cs-fig"><Figure img={{ src: "/img/cases/speakp-how-to-increase-speak.webp", w: 1704, h: 1440 }} alt="How to increase Speak+ adoption among Core Course students: enhance the journey, adjust pricing, integrate into Core" title={cs.name} kicker="The question" /></div>
      </section>
    );
  }
  const cj = [["Landing", "Curious"], ["Instructor search", "Evaluating"], ["Booking", "Hopeful"], ["First lesson", "Anxious"], ["After progress", "Confident &amp; loyal"]];
  const ij = [["Joining the platform", "Skeptical"], ["First booking", "Excited"], ["Managing schedule", "Organised"], ["Receiving reviews", "Motivated"]];
  const lane = (t: string, rows: string[][], col: string) => (
    <div className="cs-lane" data-reveal="up"><span className="cs-lane-t">{t}</span><div className="cs-lane-row">{rows.map(([s, e]) => <div key={s}><span>{s}</span><H s={e} className="cs-emo" style={{ background: col }} /></div>)}</div></div>
  );
  return (
    <section className="sec" style={{ background: "var(--ivory)" }}>
      <Head n={5} label="Emotional arc">From <span className="ital" style={{ color: "var(--teal)" }}>uncertainty</span> to trust</Head>
      <p className="lede cs-intro">The emotional arc I designed against, mapped across both journeys. The job was to move each side from uncertainty, to trust, to long-term engagement.</p>
      <div className="cs-lanes">{lane("Customer journey", cj, "#B8D4FF")}{lane("Instructor journey", ij, "#C5F0A4")}</div>
      <div className="cs-fig"><Figure img={{ src: "/img/cases/swimingo-build-marketplace.webp", w: 1680, h: 1056 }} alt="Building marketplace trust between instructors and customers" title={cs.name} kicker="Emotional arc" /></div>
    </section>
  );
}
