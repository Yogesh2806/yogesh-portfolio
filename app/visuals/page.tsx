import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import VisualsPage from "@/components/visuals/VisualsPage";

export const metadata: Metadata = {
  title: "Visuals",
  description: "UI, brand and the odd poster: Bizflyte, Doctiq, The Architectural Archive, Modent Media and more.",
};

export default function Page() {
  return (<><Nav mode="float" tone="light" /><VisualsPage /><Footer /></>);
}
