import type { Metadata } from "next";
import CasePage from "@/components/v2/CasePage";
import { DS_CASE } from "@/lib/v2cases";

export const metadata: Metadata = {
  title: "Aa NAD Design System case study",
  description: "An open-source, monochrome, accessibility-first design system for web and mobile, designed and shipped end to end with Claude as my build partner.",
  openGraph: { images: [{ url: "/img/ds/ds-figma-thumbnail.webp" }] },
};

export default function Page() { return <CasePage cs={DS_CASE} />; }
