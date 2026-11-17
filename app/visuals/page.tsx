import type { Metadata } from "next";
import Nav from "@/components/v2/Nav";
import Footer from "@/components/v2/Footer";
import Visuals from "@/components/v2/Visuals";

export const metadata: Metadata = {
  title: "Visuals",
  description: "Interfaces from apps, products and side projects: MiniMo, Go Calories, Learn Prep, Bizflyte, Doctiq, The Architectural Archive and Modent Media.",
};

export default function Page() {
  return (<><Nav /><main id="main"><Visuals /></main><Footer /></>);
}
