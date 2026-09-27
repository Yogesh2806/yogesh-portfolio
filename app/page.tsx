import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Postcard from "@/components/Postcard";
import { Marquee, WorkCards, Fan, Toolkit, ContactActions } from "@/components/home/Interactive";
import { Arrow, Star } from "@/components/Icons";
import { STATS, STORY_PHOTOS, EXP, RECS, NOTES, DOMAINS } from "@/lib/home";
import { html } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav mode="reveal" />
      <main id="main">
        <Hero />
        <Marquee id="strip" />

        {/* (01) Hello */}
        <section className="sec hello">
          <div className="label">(01) Hello</div>
          <p className="hello-big" data-split="">
            I geek out over <span className="pic" data-nosplit="" style={{ ["--r" as string]: "-3deg" }}><img src="/img/home/desk.webp" alt="" /></span>{" "}
            <span className="ital" style={{ color: "var(--pink)" }}>why</span> people do what they do. Then I design around it,{" "}
            <span className="pic" data-nosplit="" style={{ ["--r" as string]: "4deg" }}><img src="/img/home/rooftop.webp" alt="" /></span> using AI to move faster while the strategy stays mine.
          </p>
          <div className="stats">
            <div className="stat stat-hero" data-reveal="up">
              <div className="stat-a"><span data-count>3</span> <span className="ital">yrs</span></div>
              <div className="stat-b">shipping products end to end, across</div>
              <div className="stat-chips">{DOMAINS.map(([t, c]) => <span key={t} style={{ background: c }}>{t}</span>)}</div>
            </div>
            {STATS.slice(1).map(([a, b]) => (
              <div key={a} className="stat" data-reveal="up"><div className="stat-a" data-count>{a}</div><div className="stat-b">{b}</div></div>
            ))}
          </div>
        </section>

        {/* (02) Selected work */}
        <section id="work" className="sec work">
          <div className="work-head">
            <div><div className="label">(02) Selected work</div><h2 className="h-sec work-h" data-split="">Selected <span className="ital" style={{ color: "var(--mari)" }}>work</span></h2></div>
            <span className="work-count">03 case studies</span>
          </div>
          <WorkCards />
        </section>

        {/* Side quest: Visuals */}
        <section id="visuals" className="sec teaser dots">
          <div className="teaser-text">
            <div className="label">Side quest · Visuals</div>
            <h2 className="h-sec" data-split="">Pixels I&#8217;m <span className="ital" style={{ color: "var(--pink)" }}>proud</span> of.</h2>
            <p className="lede" data-reveal="up">UI, brand and the odd poster, from Bizflyte to Modent Media. Less case study, more show and tell.</p>
            <Link href="/visuals/" className="btn btn-ink" data-reveal="up" data-sound="whoosh">See all visuals <Arrow size={17} /></Link>
            <span className="hand teaser-note">6 chapters · 20 pieces</span>
          </div>
          <Fan />
        </section>

        {/* (03) Story */}
        <section id="story" className="sec story">
          <div className="story-top">
            <div><div className="label">(03) Where I come from</div>
              <h2 className="h-sec story-h" data-split="">NoRtH&nbsp;<span className="ital" style={{ color: "var(--pink)" }}>roots.</span><br />SoUtH&nbsp;<span className="ital" style={{ color: "var(--indigo)" }}>raised.</span></h2></div>
            <div className="story-copy" data-reveal="up">
              <p>I&#8217;m a person who geeks out over why people do what they do, which is probably why I ended up in design.</p>
              <p>When I&#8217;m not designing products, I&#8217;m out shooting photos, videos, social content, you name it. I have a thing for moments that tell a story without words.</p>
              <p>Oh, and the gym is non-negotiable. It&#8217;s where I reset, refocus, and show up better for everything else.</p>
              <p className="hand story-hand">Chennai-based. Visually obsessed. Always improving something. iykyk ;)</p>
            </div>
          </div>
          <div className="board" data-lenis-prevent-touch="">
            {STORY_PHOTOS.map((p, i) => (
              <figure key={p.src} className={`polaroid ph ph-${i}`} data-reveal="drop" data-rot={p.rot} data-reveal-sound="paper" data-delay={(i * 0.06).toFixed(2)}>
                <span className="tape" /><img src={p.src} alt={p.alt} loading="lazy" /><figcaption dangerouslySetInnerHTML={html(p.cap)} />
              </figure>
            ))}
            <div className="hi-card" data-reveal="scale"><img src="/img/home/desk.webp" alt="Yogesh waving at his desk" loading="lazy" /><span>hi, I&#8217;m Yogesh <Star size={18} /></span></div>
            <span className="pill-sticker place p1" style={{ background: "var(--mari)", color: "var(--ink)" }} data-reveal="scale" data-rot="-4">Jaisalmer, RJ</span>
            <span className="pill-sticker place p2" style={{ background: "var(--indigo)", color: "var(--ivory)" }} data-reveal="scale" data-rot="5">Chennai, TN</span>
          </div>
        </section>

        {/* (04) Experience */}
        <section id="experience" className="sec exp">
          <div className="label" style={{ color: "var(--ivory)" }}>(04) Experience</div>
          <h2 className="h-sec" data-split="">Where I&#8217;ve <span className="ital" style={{ color: "var(--mari)" }}>shipped</span></h2>
          <div className="exp-rows">
            {EXP.map((e) => (
              <Link key={e.co} href="/experience/" className="exp-row" data-reveal="up" data-sound-hover="tick">
                <span className="exp-when">{e.when}{e.now && <em>now</em>}</span>
                <span className="exp-co">{e.co}</span>
                <span className="exp-role" dangerouslySetInnerHTML={html(e.role)} />
                <span className="exp-desc">{e.desc}</span>
                <span className="exp-go" aria-hidden="true"><Arrow size={22} /></span>
              </Link>
            ))}
          </div>
          <Link href="/experience/" className="btn btn-outline exp-all" style={{ color: "var(--ivory)" }} data-sound="whoosh">Full experience <Arrow size={16} /></Link>
        </section>

        {/* (05) Toolkit */}
        <section className="sec toolkit">
          <div className="toolkit-head">
            <div><div className="label">(05) Toolkit</div><h2 className="h-sec" data-split="">Tools I <span className="ital" style={{ color: "var(--indigo)" }}>think</span> with</h2></div>
            <p className="lede toolkit-lede" data-reveal="up">AI speeds me up. Taste and critique decide. <span className="hand" style={{ color: "var(--pink)", fontSize: "1.37em" }}>speed without direction is just divergence.</span></p>
          </div>
          <Toolkit />
          <span className="hand toolkit-hint">psst, you can throw these around</span>
        </section>

        {/* (06) Kind words */}
        <section id="words" className="sec words">
          <div className="words-head">
            <div><div className="label">(06) Kind words</div><h2 className="h-sec" data-split="">From people I&#8217;ve <span className="ital" style={{ color: "var(--pink)" }}>shipped</span> with</h2></div>
            <a className="words-li" href="https://www.linkedin.com/in/yogesh-jeevan-1a0002185/details/recommendations/" target="_blank" rel="noreferrer">8 on LinkedIn <Arrow size={14} /></a>
          </div>
          <div className="notes">
            {RECS.map((r, i) => (
              <figure key={r.name} className="rec" style={{ background: NOTES[i % 6], ["--r" as string]: `${[-1.5, 1.2, -0.8, 1.6, -1.2, 0.9, -1.6, 1.1][i]}deg` }} data-reveal="up" data-reveal-sound="paper">
                <span className="rec-tape" aria-hidden="true" />
                <blockquote>&ldquo;{r.q}&rdquo;</blockquote>
                <figcaption><img src={`/img/home/av-${r.img}.webp`} alt="" loading="lazy" /><span><b>{r.name}</b><em dangerouslySetInnerHTML={html(r.role)} /></span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* (07) Contact */}
        <section id="contact" className="sec contact dots">
          <div className="contact-grid">
            <div>
              <div className="label">(07) Contact</div>
              <h2 className="contact-h" data-split="">Let&#8217;s build something people <span className="ital" style={{ color: "var(--indigo)" }}>actually</span> use.</h2>
              <ContactActions />
            </div>
            <div className="contact-art">
              <figure className="polaroid contact-photo" data-reveal="drop" data-rot="4"><span className="tape" /><img src="/img/home/stand.webp" alt="Yogesh standing on a rooftop under monsoon clouds" loading="lazy" /></figure>
              <figure className="contact-video" data-reveal="drop" data-rot="-4">
                <video src="/video/desk-intro.mp4" poster="/video/desk-intro.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Yogesh waving hello at his desk" />
                <figcaption><span className="rec-dot" aria-hidden="true" />hi, I&#8217;m Yogesh</figcaption>
              </figure>
              <div className="note tape contact-note" data-reveal="scale" data-rot="-5">replies within a day. usually faster ;)</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Postcard />
    </>
  );
}
