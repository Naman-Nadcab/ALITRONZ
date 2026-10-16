import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingView } from "@/components/offering-view";
import { engagements, getOffering } from "@/content/offerings";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return engagements.map((offering) => ({ slug: offering.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering || offering.kind !== "engagement") return {};
  return pageMetadata({ title: offering.title, description: offering.summary, path: offering.path });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering || offering.kind !== "engagement") notFound();
  return <OfferingView offering={offering} />;
}
