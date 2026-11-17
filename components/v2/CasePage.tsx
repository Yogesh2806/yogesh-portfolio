import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import Toc from "./Toc";
import { Zoom } from "./Buttons";
import type { Case, Block } from "@/lib/v2cases";
import { DS_LINKS } from "@/lib/v2cases";

const H = ({ s, as: T = "span", className }: { s: string; as?: "span" | "h2" | "h3" | "p" | "q" | "b"; className?: string }) => <T className={className} dangerouslySetInnerHTML={{ __html: s }} />;
type Img = { src: string; alt: string; cap?: string; note?: string; h?: number; pos?: string };

function Shot({ img, all, i }: { img: Img; all: Img[]; i: number }) {
  return (
    <Zoom items={all.map(({ src, alt }) => ({ src, alt }))} index={i} className="shot" style={{ display: "block", width: "100%", textAlign: "left" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} loading="lazy" style={img.h ? { height: img.h, objectFit: "cover", objectPosition: img.pos || "top" } : undefined} />
      {img.cap && <figcaption><span>{img.cap}</span>{img.note && <span className="hand">{img.note}</span>}</figcaption>}
    </Zoom>
  );
}

const NAMES: Record<string, string> = { research: "Research", insight: "The insight", features: "What I designed", tradeoffs: "Trade-offs", impact: "Impact", reflection: "Reflection", foundations: "Foundations", tokens: "Token architecture", workflow: "How I worked", gallery: "In the system", links: "Use it" };
const nameOf = (b: Block) => ("name" in b ? b.name : NAMES[b.k]);
const idOf = (b: Block) => nameOf(b).toLowerCase().replace(/&amp;/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Head({ n, b, title }: { n: number; b: Block; title: string }) {
  return <div className="blk-h"><div className="lab" dangerouslySetInnerHTML={{ __html: `${String(n).padStart(2, "0")} · ${nameOf(b)}` }} /><H as="h2" className="h3" s={title} /></div>;
}

function render(b: Block, n: number) {
  switch (b.k) {
    case "cards": {
      const items = b.items;
      return (<>
        <Head n={n} b={b} title={b.title} />
        {b.intro && <H as="p" className="lede" s={b.intro} />}
        <div className={`cards${b.small ? " sm" : ""}`} style={{ gridTemplateColumns: `repeat(${b.cols || 3}, minmax(0, 1fr))` }}>
          {items.map(([t, d], i) => (
            <div key={i} className="card"><span className="n">{b.numbered === "abc" ? String.fromCharCode(65 + i) : `0${i + 1}`}</span><H as="b" s={t} /><H s={d} /></div>
          ))}
        </div>
        {b.img && <div style={{ marginTop: 40 }}><Shot img={b.img} all={[b.img]} i={0} /></div>}
      </>);
    }
    case "research":
      return (<>
        <Head n={n} b={b} title={b.title} />
        {b.intro && <H as="p" className="lede" s={b.intro} />}
        <div className="cards" style={{ gridTemplateColumns: `repeat(${b.methods.length}, minmax(0, 1fr))` }}>
          {b.methods.map(([t, d]) => <div key={t} className="card" style={{ padding: 24 }}><H as="b" s={t} /><H s={d} /></div>)}
        </div>
        {b.personas && <div className="ppl"><span className="lab">{b.plabel || "Personas"}</span>{b.personas.map(([t, d]) => <span key={t}><b dangerouslySetInnerHTML={{ __html: t }} /><i dangerouslySetInnerHTML={{ __html: d }} /></span>)}</div>}
      </>);
    case "insight":
      return <div className="ins"><div className="lab">{String(n).padStart(2, "0")} · The insight</div><H as="q" s={b.quote} /><H as="p" className="lede" s={b.sub} /></div>;
    case "features": {
      const all = b.feats.map((f) => f[3]);
      return (<>
        <Head n={n} b={b} title={b.title} />
        <H as="p" className="lede" s={b.intro} />
        {b.feats.map(([tag, t, d, img], i) => (
          <div key={tag} className={`feat${i % 2 ? " flip" : ""}`} data-rv>
            <div className="feat-t"><div className="lab">{tag}</div><H as="h3" s={t} /><H as="p" s={d} /></div>
            <Shot img={img} all={all} i={i} />
          </div>
        ))}
      </>);
    }
    case "image":
      return (<><Head n={n} b={b} title={b.title} /><Shot img={b.img} all={[b.img]} i={0} /></>);
    case "pair":
      return (<><Head n={n} b={b} title={b.title} /><div className="pair" style={b.cols ? { gridTemplateColumns: b.cols } : undefined}><Shot img={b.a} all={[b.a, b.b]} i={0} /><Shot img={b.b} all={[b.a, b.b]} i={1} /></div></>);
    case "tradeoffs":
      return (<><Head n={n} b={b} title={b.title} /><div>{b.rows.map(([a, x, c, d]) => (
        <div key={a} className="trd"><b><span dangerouslySetInnerHTML={{ __html: a }} /> <i>vs</i> <span dangerouslySetInnerHTML={{ __html: x }} /></b><H s={c} /><em dangerouslySetInnerHTML={{ __html: d }} /></div>
      ))}</div></>);
    case "impact":
      return (<><Head n={n} b={b} title={b.title} />
        <div className="cards imp" style={{ gridTemplateColumns: `repeat(${b.cols || 3}, minmax(0, 1fr))`, marginTop: 0 }}>{b.items.map(([v, d]) => <div key={v} className="card"><b>{v}</b><H s={d} /></div>)}</div>
        <H as="p" className="note" s={b.note} /></>);
    case "reflection":
      return (<><Head n={n} b={b} title={b.title} /><div className="refl"><H as="p" s={b.a} /><H as="p" s={b.b} /></div><div style={{ marginTop: 24 }}><span className="hand" style={{ color: "var(--pink)", transform: "rotate(-2deg)" }} dangerouslySetInnerHTML={{ __html: b.note }} /></div></>);
    case "foundations": {
      const ramp = ["#F5F0FB", "#EBE1F7", "#D7C3EF", "#C1A3E5", "#A984D8", "#8653C9", "#7442B4", "#5F3696", "#4B2B77", "#372058", "#24153A"];
      const lbl = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      return (<>
        <Head n={n} b={b} title='Monochrome base, <span class="it">your brand</span> on top.' />
        <p className="lede">Swap the 11-step primary ramp and every component recolours. Everything else stays neutral.</p>
        <div className="cards" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <div className="card" style={{ gridColumn: "1 / -1", gap: 18 }}><span className="lab">Colour · 11-step primary ramp</span>
            <div className="ramp">{ramp.map((c, i) => <div key={c}><i style={{ background: c, outline: i === 5 ? "2px solid var(--tx)" : undefined, outlineOffset: 2 }} /><span>{lbl[i]}</span></div>)}</div>
            <span>The only brand colour. 12 hues and semantic colours sit behind it.</span></div>
          <div className="card" style={{ gap: 18 }}><span className="lab">Type</span><div className="aa"><b>Aa</b><div style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 6 }}><b style={{ fontSize: 18 }}>Atkinson Hyperlegible Next</b><span>Il1 O0 rn m: letters you can&rsquo;t confuse</span></div></div></div>
          <div className="card" style={{ gap: 18 }}><span className="lab">Space · 8px grid, 4px half-step</span>
            <div className="grid8">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ opacity: 0.12 + (i % 8) * 0.06 }} />)}</div>
            <span className="lab">Themes</span>
            <div className="themes">{[["Light", "#FFFFFF", "#111", "1px solid #ddd", "#8653C9"], ["Dark", "#151515", "#EEE", "1px solid #333", "#A984D8"], ["High contrast", "#000", "#FFF", "2px solid #FFF", "#FFFFFF"]].map(([t, bg, fg, bd, bar]) => <span key={t} style={{ background: bg, color: fg, border: bd }}>{t}<i style={{ background: bar }} /></span>)}</div></div>
        </div>
      </>);
    }
    case "tokens": {
      const tiers: [string, string, string[]][] = [["Primitive", "raw values", ["purple-500 · #8653C9", "space-2 · 16px", "radius-1 · 4px"]], ["Semantic", "what it means", ["color.primary", "color.text.muted", "space.inset.md"]], ["Component", "where it’s used", ["button.bg", "input.border.focus", "card.padding"]]];
      return (<>
        <Head n={n} b={b} title='<span class="it">249 tokens</span>, three layers.' />
        <p className="lede">Change a primitive and it flows through meaning to every component. Figma variables and CSS read the same names.</p>
        <div className="tiers">{tiers.flatMap(([t, d, ex], i) => {
          const c = <div key={t} className="card cards" style={{ marginTop: 0, padding: 24, gap: 14 }}><span className="n" style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--c)" }}>0{i + 1}</span><b style={{ fontSize: 20, fontWeight: 500 }}>{t}</b><span className="muted" style={{ fontSize: 14 }}>{d}</span>{ex.map((e) => <code key={e}>{e}</code>)}</div>;
          return i < 2 ? [c, <span key={t + "a"} aria-hidden="true">→</span>] : [c];
        })}</div>
      </>);
    }
    case "workflow": {
      const owned = ["The brief, scope and benchmark", "Every design decision: colour, type, grid, motion, logo", "Component behaviour, states and content rules", "Reviewing every build and calling what ships"];
      const claude = ["Building the tokens and React components", "Contrast testing every colour pair in code", "Interaction and keyboard tests", "The Figma plugin that generates the library"];
      const steps = ["Brief and benchmark", "Foundations as tokens", "Components, every state", "Contrast and interaction tests", "Figma library, generated", "Docs, release, weekly updates"];
      return (<>
        <Head n={n} b={b} title='Me on the decisions, <span class="it">Claude</span> on the build.' />
        <div className="pair owned"><div className="card" style={{ padding: 28 }}><span className="lab" style={{ color: "var(--c)" }}>I owned</span><ul>{owned.map((x) => <li key={x}>{x}</li>)}</ul></div><div className="card" style={{ padding: 28 }}><span className="lab">Claude built and tested</span><ul>{claude.map((x) => <li key={x}>{x}</li>)}</ul></div></div>
        <div className="steps">{steps.map((s, i) => <div key={s}><span>0{i + 1}</span>{s}</div>)}</div>
        <div style={{ marginTop: 14 }}><span className="hand" style={{ fontSize: 22 }}>one loop, repeated every week</span></div>
      </>);
    }
    case "gallery": {
      const all = [...b.items, ...b.wide];
      return (<>
        <Head n={n} b={b} title={b.title} />
        <div className="pair">{b.items.map((im, i) => <Shot key={im.src} img={im} all={all} i={i} />)}</div>
        <div className="pair" style={{ gridTemplateColumns: "minmax(0, 7fr) minmax(0, 3fr)", marginTop: 12 }}>{b.wide.map((im, i) => <Shot key={im.src} img={im} all={all} i={b.items.length + i} />)}</div>
      </>);
    }
    case "links": {
      const links: [string, string, string, string][] = [["Live docs", "Guides, tokens and every component", "Open docs ↗", DS_LINKS.docs], ["GitHub", "MIT licensed. Fork it, star it", "View repo ↗", DS_LINKS.github], ["Figma Community", "Duplicate the library", "Duplicate file ↗", DS_LINKS.figma]];
      return (<>
        <Head n={n} b={b} title='Live, free and <span class="it">yours to fork</span>.' />
        <div className="cards" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: 0 }}>{links.map(([t, d, l, href], i) => (
          <a key={t} href={href} target="_blank" rel="noreferrer" className="card"><b style={{ fontSize: 20 }}>{t}</b><span>{d}</span><span className={`btn ${i ? "btn-line" : "btn-solid"}`} style={{ marginTop: 14, alignSelf: "flex-start", fontSize: 14, padding: "10px 16px", color: i ? "var(--tx)" : "var(--bg)" }}>{l}</span></a>
        ))}</div>
        <div style={{ marginTop: 16 }}><span className="hand" style={{ color: "var(--pink)", fontSize: 22, transform: "rotate(-2deg)" }}>this grows every week, like the system</span></div>
      </>);
    }
  }
}

export default function CasePage({ cs }: { cs: Case }) {
  const toc = cs.blocks.map((b) => ({ id: idOf(b), name: nameOf(b) }));
  const metCols = `minmax(0, ${cs.mets[0][0].length > 8 ? 1.55 : 1}fr) ${cs.mets.slice(1).map(() => "minmax(0, 1fr)").join(" ")}`;
  return (
    <>
      <Nav />
      <main id="main" style={{ ["--c" as string]: cs.c }}>
        <section className="sec cs-top">
          <div className="crumb"><Link href="/#work">← All work</Link><span>/</span><span>{cs.name}</span></div>
          <div className="cs-hero">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="kick"><span style={{ color: cs.c }}>{cs.idx}</span><span className="dot" style={{ background: cs.c }} />{cs.kicker}</div>
              <h1 dangerouslySetInnerHTML={{ __html: cs.title }} />
              <H as="p" className="lede" s={cs.sub} />
            </div>
            <div className="meta">{cs.meta.map(([k, v]) => <div key={k}><span className="lab">{k}</span><span>{v}</span></div>)}</div>
          </div>
          <div className="cover" data-rv>
            <span className="hand">{cs.coverNote}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div style={{ height: `min(${cs.cover.h}px, 62vw)`, background: cs.cover.bg }}><img src={cs.cover.src} alt={cs.cover.alt} fetchPriority="high" /></div>
          </div>
          <div className="card tldr">
            <div className="tldr-g">
              <div className="tldr-l"><span className="lab">TL;DR</span><H s={cs.tldr} /><span className="hand" style={{ fontSize: 22, transform: "rotate(-2deg)" }}>the 30-second version</span></div>
              <div className="mets" style={{ gridTemplateColumns: metCols }}>{cs.mets.map(([v, d], i) => <div key={v} className="met"><b style={i === 0 ? { color: cs.c } : undefined}>{v}</b><span>{d}</span></div>)}</div>
            </div>
            <div className="tldr-src">{cs.metsSrc}</div>
          </div>
        </section>
        <section className="sec">
          <div className="cs-body">
            <Toc items={toc} live={cs.live} />
            <div>{cs.blocks.map((b, i) => <div key={i} id={idOf(b)} className="blk" data-rv>{render(b, i + 1)}</div>)}</div>
          </div>
          <Link href={cs.next.href} className="card next" data-rv>
            <div><span className="lab">Next case study</span><span className="kick"><span className="dot" style={{ background: cs.next.dot }} />{cs.next.kicker}</span><b>{cs.next.title}</b><span className="btn btn-solid">Read next →</span></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div><img src={cs.next.cover} alt="" loading="lazy" /></div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
