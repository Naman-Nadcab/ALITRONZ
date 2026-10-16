import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryView } from "@/components/industry-view";
import { getIndustry, industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({ title: industry.title, description: industry.summary, path: industry.path });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return <IndustryView industry={industry} />;
}
