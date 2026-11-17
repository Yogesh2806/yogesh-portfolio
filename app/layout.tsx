import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/v2/Providers";
import { SITE } from "@/lib/site";
import "@/styles/v2.css";

const bricolage = localFont({ src: "./fonts/BricolageGrotesque.woff2", weight: "400 800", variable: "--font-bricolage", display: "swap" });
const instrument = localFont({ src: [{ path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" }, { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" }], variable: "--font-instrument", display: "swap" });
const caveat = localFont({ src: "./fonts/Caveat.woff2", weight: "500 700", variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Yogesh Jeevan · Product designer", template: "%s · Yogesh Jeevan" },
  description: "Product designer in Chennai. Calm products for a complex world: Doctiq, Speak+, Swimingo and the Aa NAD design system.",
  openGraph: {
    title: "Yogesh Jeevan · Product designer",
    description: "Calm products for a complex world. Case studies, visuals and the story behind them.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Yogesh Jeevan, product designer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#0D0D0C", width: "device-width", initialScale: 1 };

// Theme is set before first paint: saved choice, otherwise dark.
const THEME = `try{var t=localStorage.getItem('yj-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable} ${instrument.variable} ${caveat.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: THEME }} /></head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
