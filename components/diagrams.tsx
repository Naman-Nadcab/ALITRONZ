import { FamilyVisual, familyOf } from "@/components/visuals/family-visual";

export function DivisionFigure({ slug, figure }: { slug: string; figure?: string }) {
  return <FamilyVisual family={familyOf(slug, figure)} compact />;
}
