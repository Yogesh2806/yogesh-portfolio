import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Caveat, Hanken_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/site";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/home.css";
import "@/styles/case.css";
import "@/styles/visuals.css";
import "@/styles/experience.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-bricolage", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-jetbrains", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Yogesh Jeevan · Product designer", template: "%s · Yogesh Jeevan" },
  description: "Product designer in Chennai. Rajasthani roots, Tamil Nadu raised. Calm products for complex, human problems: Doctiq, Speak+, Swimingo and more.",
  openGraph: {
    title: "Yogesh Jeevan · Product designer",
    description: "Two cities. Many ways of seeing. Case studies, visuals and the story behind them.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Yogesh Jeevan, product designer. Two cities. Many ways of seeing." }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#1A1426", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable} ${hanken.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
