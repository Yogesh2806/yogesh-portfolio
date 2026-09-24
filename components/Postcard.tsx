import { Star } from "./Icons";

const LETTERS = ["aerial", "sunrise", "court", "vr", "bazaar", "arch"];

/** The closing postcard that sits after the footer. */
export default function Postcard() {
  return (
    <section className="postcard-sec dots" aria-label="Thanks for visiting">
      <div className="postcard" data-reveal="up">
        <div className="pc-kank hand">KANK: iykyk</div>
        <div className="pc-name" aria-label="YOGESH">
          <div className="pc-shadow" aria-hidden="true">YOGESH</div>
          <h2 className="pc-letters" aria-hidden="true">{"YOGESH".split("").map((c, i) => <span key={i} style={{ backgroundImage: `url(/img/home/pc-${LETTERS[i]}.webp)` }}>{c}</span>)}</h2>
        </div>
        <div className="pc-rule" />
        <div className="pc-bottom">
          <div className="pc-left"><span className="pill-sticker pc-thanks" style={{ background: "var(--ink)", color: "var(--ivory)" }}><Star size={20} /> Thanks for spending some time here :)</span></div>
          <div className="pc-right">
            <div className="pc-stamp" data-reveal="scale" data-rot="4"><img src="/img/home/pc-arch.webp" alt="Stamp: a carved arch framing a temple tower" /><div><span>INDIA</span><span>₹26</span></div></div>
            <svg className="pc-mark" viewBox="0 0 190 190" aria-hidden="true"><circle cx="95" cy="95" r="78" /><circle cx="95" cy="95" r="58" /><path id="pmk" d="M95 95 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" stroke="none" /><text className="pm-ring"><textPath href="#pmk">CHENNAI · 600 001 · OPEN TO WORK · 2026 ·</textPath></text><text x="95" y="102" textAnchor="middle" className="pm-date">24 SEP</text></svg>
            <div className="pc-to hand"><div>To: the team hiring a</div><div>product designer,</div><div>wherever you are.</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
