import Link from "next/link";
import { Arrow } from "@/components/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="nf dots">
      <Link href="/" className="nf-brand"><span className="yj" style={{ background: "var(--ink)", color: "var(--mari)" }}>yj.</span><span>Yogesh Jeevan</span></Link>
      <div className="nf-card">
        <div className="hand nf-kicker">return to sender</div>
        <h1 className="nf-404">4<span className="ital">0</span>4</h1>
        <div className="nf-rule" />
        <p>This page took a wrong turn somewhere between Jaisalmer and Chennai.</p>
        <div className="nf-btns"><Link href="/" className="btn btn-ink">Back home <Arrow size={15} /></Link><Link href="/#work" className="btn btn-outline">See the work <Arrow size={15} /></Link></div>
        <svg className="nf-mark" viewBox="0 0 190 190" aria-hidden="true"><circle cx="95" cy="95" r="78" /><circle cx="95" cy="95" r="58" /><path id="p404" d="M95 95 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" stroke="none" /><text className="pm-ring"><textPath href="#p404">ADDRESS UNKNOWN · ADDRESS UNKNOWN ·</textPath></text><text x="95" y="103" textAnchor="middle" className="pm-date">404</text></svg>
      </div>
    </main>
  );
}
