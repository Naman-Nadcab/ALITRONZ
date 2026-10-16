import type { Metadata } from "next";
import { articles } from "@/content/insights";
import { formatDate, readingMinutes } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Notes on scoping AI systems, trading software, and blockchain products that can still be operated.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Insights</p>
          <h1>Notes from the engineering work.</h1>
          <p className="lede">Practical writing on scope, systems, and the limits of what software should claim. No invented authors.</p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap hairline-grid insight-list">
          {articles.map((article) => {
            const minutes = readingMinutes(article.blocks.flatMap((block) => (block.type === "ul" ? block.items : [block.text])));
            return (
              <article key={article.slug}>
                <a className="card-link" href={`/insights/${article.slug}`}>
                  <p className="kicker">{article.category}</p>
                  <h2 className="gap-top">{article.title}</h2>
                  <p className="muted gap-top">{article.excerpt}</p>
                  <p className="meta-row">{formatDate(article.date)} · {minutes} min read</p>
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
