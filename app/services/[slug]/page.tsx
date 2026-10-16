import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingView } from "@/components/offering-view";
import { divisions, getOffering } from "@/content/offerings";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return divisions.map((offering) => ({ slug: offering.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering || offering.kind !== "division") return {};
  return pageMetadata({ title: offering.title, description: offering.summary, path: offering.path });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering || offering.kind !== "division") notFound();
  return <OfferingView offering={offering} />;
}
