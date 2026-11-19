import type { Metadata } from "next";
import Bento from "@/components/bento/Bento";

export const metadata: Metadata = {
  title: "Bento",
  description: "Yogesh Jeevan's portfolio as one Liquid Glass bento: every case study, testimony and the design system, one tap away.",
};

export default function BentoPage() {
  return (
    <div id="main">
      <Bento />
    </div>
  );
}
