import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/insights";
import { formatDate, readingMinutes } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Notes on AI scope, software delivery, Web3 engineering, trading systems, cloud pipelines, data definitions, and authorized security testing.",
  path: "/insights",
});

export default function InsightsPage() {
  const categories = [...new Set(articles.map((article) => article.category))];
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Insights</p>
          <h1>Notes from the engineering work.</h1>
          <p className="lede">Practical writing on scope, systems, and the limits of what software should claim. No invented authors or research citations.</p>
          <nav className="filter-row" aria-label="Insight categories">
            {categories.map((category) => (
              <a key={category} href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{category}</a>
            ))}
          </nav>
        </div>
      </header>
      {categories.map((category) => (
        <section className="section section-follow" id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={category}>
          <div className="wrap">
            <h2>{category}</h2>
            <div className="hairline-grid insight-list">
              {articles.filter((article) => article.category === category).map((article) => {
                const minutes = readingMinutes(article.blocks.flatMap((block) => (block.type === "ul" ? block.items : [block.text])));
                return (
                  <article key={article.slug}>
                    <Link className="card-link" href={`/insights/${article.slug}`}>
                      <h3 className="gap-top">{article.title}</h3>
                      <p className="muted gap-top">{article.excerpt}</p>
                      <p className="meta-row">{formatDate(article.date)} · {minutes} min read</p>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
