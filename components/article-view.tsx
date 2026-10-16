import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { articles, type Article } from "@/content/insights";
import { formatDate, readingMinutes } from "@/lib/format";
import { absoluteUrl } from "@/lib/site-url";

function textOf(article: Article) {
  return article.blocks.flatMap((block) => (block.type === "ul" ? block.items : [block.text]));
}

export function ArticleView({ article }: { article: Article }) {
  const minutes = readingMinutes(textOf(article));
  const related = articles.filter((item) => article.related.includes(item.slug));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
          publisher: { "@type": "Organization", name: "Alitroz Technology" },
        }}
      />
      <header className="page-hero">
        <div className="wrap wrap-narrow">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: article.title }]} />
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="lede">{article.excerpt}</p>
          <p className="meta-row">
            <span>{formatDate(article.date)}</span>
            <span>{minutes} min read</span>
            <span>Alitroz Technology</span>
          </p>
        </div>
      </header>
      <article className="sheet">
        <div className="wrap wrap-narrow sheet-inner">
          <div className="article-body prose">
            {article.blocks.map((block, index) => {
              if (block.type === "h2") return <h2 key={block.text}>{block.text}</h2>;
              if (block.type === "ul") {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={block.text}>{block.text}</p>;
            })}
          </div>
          <section className="block">
            <h2>Related</h2>
            <ul className="related-list">
              {related.map((item) => (
                <li key={item.slug}><a href={`/insights/${item.slug}`}>{item.title}</a></li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
