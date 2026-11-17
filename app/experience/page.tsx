import type { Metadata } from "next";

// The experience page moved onto the home page; old links land there.
export const metadata: Metadata = { title: "Experience", robots: { index: false } };

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/#experience" />
      <main id="main" className="sec" style={{ paddingTop: 160 }}><p className="lede">My experience now lives on the home page. <a href="/#experience" style={{ textDecoration: "underline" }}>Take me there</a>.</p></main>
    </>
  );
}
