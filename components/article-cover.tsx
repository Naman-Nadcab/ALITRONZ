import { FamilyVisual, familyFromCategory } from "@/components/visuals/family-visual";

const coverNote: Record<string, string> = {
  ai: "The AI system this article is about: data, retrieval, model, tools, and the person who approves a change.",
  product: "The product layers this article is about: experience, application logic, API, data, and release.",
  web3: "The on-chain system this article is about: wallet, dApp, contracts, network, indexing, and dashboard.",
  finance: "The trading stack this article is about: terminal, market data, liquidity, orders, risk, and reconciliation.",
  cloud: "The cloud topology this article is about: edge, applications, containers, APIs, data, queues, and monitoring.",
  data: "The data pipeline this article is about: sources, ingestion, streaming, transformation, warehouse, and analytics.",
  security: "The security layers this article is about: identity, authentication, authorization, boundary, API, data, and monitoring.",
};

export function ArticleCover({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const family = familyFromCategory(category);
  return (
    <div className={`article-cover family-${family}`}>
      <FamilyVisual family={family} compact variant={slug} />
      <p className="article-cover-note">
        <span>{category} · system map</span>
        {coverNote[family] ?? coverNote.product}
      </p>
    </div>
  );
}
