import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
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
  const index = articles.findIndex((item) => item.slug === article.slug);
  const previous = index > 0 ? articles[index - 1] : undefined;
  const next = index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined;
  const headings = article.blocks.filter((block) => block.type === "h2");
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
          <div className="article-hero-mark" aria-hidden="true" />
        </div>
      </header>
      <article className="sheet">
        <div className={`wrap sheet-inner${headings.length > 1 ? " article-layout" : ""}`}>
          {headings.length > 1 ? (
            <nav className="toc" aria-label="On this page">
              <p className="kicker">On this page</p>
              <ol>
                {headings.map((block) => (
                  <li key={block.text}><a href={`#${slugify(block.text)}`}>{block.text}</a></li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div>
            <div className="article-body prose">
              {article.blocks.map((block, blockIndex) => {
                if (block.type === "h2") return <h2 id={slugify(block.text)} key={block.text}>{block.text}</h2>;
                if (block.type === "ul") {
                  return (
                    <ul key={blockIndex}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={block.text}>{block.text}</p>;
              })}
            </div>
            {article.services && article.services.length > 0 ? (
              <section className="block">
                <h2>Related services</h2>
                <ul className="related-list">
                  {article.services.map((link) => (
                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="block">
              <h2>Related</h2>
              <ul className="related-list">
                {related.map((item) => (
                  <li key={item.slug}><Link href={`/insights/${item.slug}`}>{item.title}</Link></li>
                ))}
              </ul>
            </section>
            <nav className="article-pager" aria-label="More articles">
              {previous ? <Link href={`/insights/${previous.slug}`}>Previous: {previous.title}</Link> : <span />}
              {next ? <Link href={`/insights/${next.slug}`}>Next: {next.title}</Link> : <span />}
            </nav>
          </div>
        </div>
      </article>
      <CtaBand title="Bring a similar problem" body="If this describes a system you need built, start with the constraint and the first workflow." />
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
