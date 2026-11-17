import Link from "next/link";
import Nav from "@/components/v2/Nav";
import Footer from "@/components/v2/Footer";
import LivingHero from "@/components/v2/LivingHero";
import { ResumeButton } from "@/components/v2/Buttons";
import { WORK, EXP, HOW, TOOLS, ROT, PHOTOS } from "@/lib/v2";
import { RECS } from "@/lib/home";
import { LOGOS } from "@/lib/logos";
import { SITE, html } from "@/lib/site";

export default function Home() {
  const half = Math.ceil(RECS.length / 2);
  const rows = [RECS.slice(0, half), RECS.slice(half)];
  return (
    <>
      <Nav />
      <main id="main">
        <LivingHero>
          <div className="hero-copy">
            <div>
              <div className="lab">Product designer · Chennai, India</div>
              <h1>Calm products for a <span className="it">complex</span> world.</h1>
              <p>3+ years designing B2B and B2C SaaS end to end.</p>
            </div>
            <div className="hero-side">
              <span className="hand">psst... the good stuff<br />is just below ;)</span>
              <a href="#work" className="btn btn-light">View case studies ↓</a>
            </div>
          </div>
        </LivingHero>

        {/* ---------------- work */}
        <section className="sec work-sec" id="work">
          <div className="sec-head" data-rv>
            <div><div className="lab">Case studies</div><h2 className="h2">Selected <span className="it">work</span></h2></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <span className="hand" style={{ fontSize: 26 }}>start with this one ↙</span>
              <span className="muted" style={{ fontSize: 14 }}>04 case studies · hover to peek, click to read</span>
            </div>
          </div>
          <div className="grid-2">
            {WORK.map((w, i) => (
              <Link key={w.href} href={w.href} className="wc" style={{ ["--c" as string]: w.c }} data-rv={(i % 2) * 120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="wc-img"><div><img src={w.cover} alt={`${w.title}, cover`} loading="lazy" /></div></div>
                <div className="wc-body">
                  <div className="wc-k lab"><span style={{ color: w.c }}>{w.n}</span><span className="dot" style={{ background: w.c }} />{w.kicker}</div>
                  <h3>{w.title}</h3>
                  <div className="wc-more"><div><p>{w.desc}</p><div className="chips">{w.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div></div></div>
                  <div className="wc-foot"><span className="wc-metric"><b>{w.big}</b> · {w.small}</span><span className="wc-go" aria-hidden="true">↗</span></div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/visuals/" className="card vt" data-rv>
            <div className="vt-l">
              <div className="vt-stack" aria-hidden="true">
                {/* eslint-disable @next/next/no-img-element */}
                <div style={{ left: 0, top: 28, transform: "rotate(-8deg)" }}><img src="/img/visuals/minimo-hero.webp" alt="" /></div>
                <div style={{ left: 96, top: 10, transform: "rotate(4deg)" }}><img src="/img/visuals/macbook-pro-16-2.webp" alt="" /></div>
                <div style={{ left: 190, top: 34, transform: "rotate(-3deg)" }}><img src="/img/visuals/learnprep-hero.webp" alt="" /></div>
                {/* eslint-enable @next/next/no-img-element */}
              </div>
              <div className="vt-t"><div className="lab">Visuals</div><h3>More screens, less reading.</h3><p>Mobile apps, web dashboards and side projects like Learn Prep, Go Calories and MiniMo, all in one place.</p></div>
            </div>
            <div className="vt-r"><span className="hand" style={{ fontSize: 22 }}>eye candy this way ↓</span><span className="btn btn-line">See visuals ↗</span></div>
          </Link>
        </section>

        {/* ---------------- little story */}
        <section className="sec story" id="story">
          <div className="story-grid">
            <div className="card story-card" data-rv>
              <div className="lab">Little story</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <h2>Curious <span className="it">first</span>.<br />Designer <span className="it teal">second</span>.</h2>
                <p className="lede" style={{ fontSize: 19 }}>Started in code, stayed for design. I turn messy problems into screens people don&rsquo;t have to think about.</p>
              </div>
            </div>
            <div className="card craft" data-rv="120">
              <div className="lab">In the craft</div>
              <div><b>3+<span> yrs</span></b><div className="muted" style={{ marginTop: 16, fontSize: 14 }}>shipping B2B, B2C and SaaS products end to end</div></div>
            </div>
          </div>
          <div className="polas">
            {PHOTOS.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <figure key={p.src} className="pola" style={{ ["--r" as string]: `${p.r}deg` }} data-rv={i * 120}><img src={p.src} alt={p.alt} loading="lazy" /></figure>
            ))}
          </div>
        </section>

        {/* ---------------- experience */}
        <section className="sec exp" id="experience">
          <div className="sec-head" data-rv>
            <div><div className="lab">Experience</div><h2 className="h2">Where I&rsquo;ve <span className="it">shipped</span></h2></div>
            <ResumeButton className="btn btn-line" />
          </div>
          <div className="card tl" data-rv>
            <div className="tl-row">
              {EXP.map((e) => (
                <div key={e.co} className={`stop${e.now ? " now" : ""}`}>
                  <div className="pin"><i /></div>
                  <div className="when">{e.when}</div>
                  <div className="co">{e.co}</div>
                  <div className="role" dangerouslySetInnerHTML={html(e.role)} />
                  {e.now && <span className="hand">you are here ↑</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- how I work + toolkit */}
        <section className="sec skills" id="skills">
          <div className="sk-grid">
            <div className="card how" data-rv>
              <div className="lab">How I work</div>
              {HOW.map(([t, d], i) => (
                <div key={t} className="how-step"><div><span>0{i + 1}</span><b>{t}</b></div><p>{d}</p></div>
              ))}
            </div>
            <div className="card kit" data-rv="120">
              <div className="kit-head"><div className="lab">Toolkit</div><span className="hand" style={{ fontSize: 22, transform: "rotate(-2deg)" }}>AI speeds me up. taste decides.</span></div>
              <div className="pills">
                {TOOLS.map(([n, d, bg, fg, out], i) => (
                  <span key={n} className={`tp${out ? " out" : ""}`} style={{ background: bg, color: fg, ["--r" as string]: `${ROT[i]}deg` }}>
                    <span className="tp-ic" dangerouslySetInnerHTML={{ __html: LOGOS[n] || `<b>${n[0]}</b>` }} />
                    <span className="tp-t"><span className="tp-n">{n}</span><span className="tp-d">{d}</span></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- testimonials */}
        <section className="sec words" id="testimonials">
          <div className="sec-head" data-rv>
            <div><div className="lab">Testimonies</div><h2 className="h2">What people <span className="it">say</span></h2></div>
            <a className="btn btn-line" href={`${SITE.linkedin}details/recommendations/`} target="_blank" rel="noreferrer">All {RECS.length} on LinkedIn ↗</a>
          </div>
          <div className="marq">
            {rows.map((row, ri) => (
              <div key={ri} className={`mrow${ri ? " rev" : ""}`}>
                {[...row, ...row].map((r, i) => (
                  <figure key={i} className="card q" style={{ margin: 0 }} aria-hidden={i >= row.length || undefined}>
                    <p>&ldquo;{r.q}&rdquo;</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <figcaption className="q-who"><img src={`/img/home/av-${r.img}.webp`} alt="" loading="lazy" /><div><b>{r.name}</b><span dangerouslySetInnerHTML={html(r.role)} /></div></figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- contact */}
        <section className="sec contact" id="contact">
          <div className="card ct" data-rv>
            <svg className="stamp" viewBox="0 0 190 190" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="95" cy="95" r="78" /><circle cx="95" cy="95" r="58" />
              <path id="pm" d="M95 95 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" stroke="none" />
              <text fill="currentColor" stroke="none" style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: 3 }}><textPath href="#pm">CHENNAI · OPEN TO WORK · 2026 ·</textPath></text>
              <text x="95" y="103" textAnchor="middle" fill="currentColor" stroke="none" style={{ fontSize: 24, fontWeight: 600 }}>yj.</text>
            </svg>
            <div className="lab">Contact</div>
            <h2>Let&rsquo;s build<br />something <span className="it">good.</span></h2>
            <div className="ct-foot">
              <a className="ct-mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <div style={{ display: "flex", gap: 10 }}>
                <a className="btn btn-line" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <ResumeButton className="btn btn-solid" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
