import Link from "next/link";
import Nav from "@/components/v2/Nav";
import Footer from "@/components/v2/Footer";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="sec" style={{ paddingTop: 200, minHeight: "70vh" }}>
        <div className="lab">404</div>
        <h1 className="h2" style={{ marginTop: 20 }}>This page took a <span className="it">wrong turn</span>.</h1>
        <p className="lede" style={{ marginTop: 20 }}>Somewhere between Jaisalmer and Chennai. Let&rsquo;s get you back.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 32 }}><Link href="/" className="btn btn-solid">Back home</Link><Link href="/#work" className="btn btn-line">See the work</Link></div>
      </main>
      <Footer />
    </>
  );
}
