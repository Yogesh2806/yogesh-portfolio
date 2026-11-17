import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePage from "@/components/v2/CasePage";
import { CASES } from "@/lib/v2cases";

export function generateStaticParams() { return CASES.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#8217;/g, "’").replace(/&amp;/g, "&");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASES.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.name} case study`, description: strip(cs.sub), openGraph: { title: `${cs.name} · ${strip(cs.title)}`, description: strip(cs.sub), images: [{ url: cs.cover.src }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASES.find((c) => c.slug === slug);
  if (!cs) notFound();
  return <CasePage cs={cs} />;
}
