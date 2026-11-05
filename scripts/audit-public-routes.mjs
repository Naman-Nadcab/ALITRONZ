import { mkdir, writeFile } from "node:fs/promises";

const origin = process.env.AUDIT_ORIGIN ?? "http://localhost:3000";
const productionOrigin = "https://alitronz.com";

function text(html, pattern) {
  return html.match(pattern)?.[1]?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

function documentText(html) {
  return html
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function links(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)[^"']*["'][^>]*>/gi)].map((match) => match[1]);
}

function assets(html) {
  const direct = [...html.matchAll(/<(?:img|script|video|audio|source)\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );
  const srcsets = [...html.matchAll(/\bsrcset=["']([^"']+)["']/gi)].flatMap((match) =>
    match[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]),
  );
  const stylesheets = [...html.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );
  return [...direct, ...srcsets, ...stylesheets].filter(Boolean);
}

function category(pathname) {
  if (pathname === "/") return "home";
  return pathname.split("/").filter(Boolean)[0] ?? "other";
}

function groupBy(items, keyOf) {
  return items.reduce((groups, item) => {
    const key = keyOf(item);
    (groups[key] ??= []).push(item);
    return groups;
  }, {});
}

async function inspect(url) {
  const response = await fetch(url, { redirect: "manual" });
  const html = await response.text();
  const pathname = new URL(url).pathname;
  const title = text(html, /<title>([\s\S]*?)<\/title>/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    match[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const description =
    html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] ??
    "";
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1] ?? "";
  const internalLinks = links(html)
    .filter((href) => href.startsWith("/") || href.startsWith(productionOrigin))
    .map((href) => new URL(href, productionOrigin).pathname);
  const words = documentText(html).split(/\s+/).filter(Boolean).length;
  const visualSignals = (html.match(/<(svg|canvas|figure)\b/gi) ?? []).length;
  const structuredDataSignals = (html.match(/application\/ld\+json/gi) ?? []).length;
  const breadcrumbSignals = (html.match(/aria-label=["']Breadcrumb["']/gi) ?? []).length;
  const assetUrls = assets(html);
  const noindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const expectedCanonical = new URL(pathname, productionOrigin);
  const actualCanonical = canonical ? new URL(canonical) : null;
  const canonicalMatches =
    actualCanonical !== null &&
    actualCanonical.origin === expectedCanonical.origin &&
    actualCanonical.pathname.replace(/\/+$/, "") === expectedCanonical.pathname.replace(/\/+$/, "") &&
    actualCanonical.search === "";

  return {
    url: new URL(pathname, productionOrigin).toString(),
    pathname,
    category: category(pathname),
    status: response.status,
    title,
    h1: h1s[0] ?? "",
    h1Count: h1s.length,
    description,
    canonical,
    internalLinks: [...new Set(internalLinks)].sort(),
    internalLinkConnections: new Set(internalLinks).size,
    searchIntent: `${category(pathname)} — ${h1s[0] ?? title}`,
    wordCount: words,
    visualSignals,
    structuredDataSignals,
    breadcrumbSignals,
    assetUrls: [...new Set(assetUrls)].sort(),
    contentCompleteness: words >= 120 ? "substantial" : "review",
    visualCompleteness: visualSignals > 0 ? "visual-present" : "text-only",
    checks: {
      ok: response.status === 200,
      uniqueH1: h1s.length === 1,
      hasTitle: title.length > 8,
      hasDescription: description.length >= 50,
      canonicalMatches,
      substantial: words >= 120,
      visualComplete: visualSignals > 0,
      indexable: !noindex,
      noExternalAssetHotlinks: assetUrls.every(
        (asset) => !/^https?:\/\//i.test(asset) || asset.startsWith(productionOrigin),
      ),
    },
  };
}

const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const robotsResponse = await fetch(`${origin}/robots.txt`);
const robots = await robotsResponse.text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const results = [];
for (let index = 0; index < paths.length; index += 8) {
  const batch = paths.slice(index, index + 8);
  results.push(...(await Promise.all(batch.map((pathname) => inspect(new URL(pathname, origin).toString())))));
}

const titleGroups = groupBy(results, (result) => result.title);
const duplicateTitles = Object.entries(titleGroups)
  .filter(([title, pages]) => title && pages.length > 1)
  .map(([title, pages]) => ({ title, routes: pages.map((page) => page.pathname) }));
const duplicateH1s = Object.entries(groupBy(results, (result) => result.h1))
  .filter(([h1, pages]) => h1 && pages.length > 1)
  .map(([h1, pages]) => ({ h1, routes: pages.map((page) => page.pathname) }));

const knownRoutes = new Set(paths);
const brokenInternalTargets = [...new Set(results.flatMap((result) => result.internalLinks))]
  .filter((pathname) => !knownRoutes.has(pathname) && !["/api/enquiry"].includes(pathname));

const categories = Object.fromEntries(
  Object.entries(groupBy(results, (result) => result.category)).map(([name, pages]) => [name, pages.length]),
);
const assetTargets = [...new Set(results.flatMap((result) => result.assetUrls))]
  .filter((asset) => asset.startsWith("/") || asset.startsWith(origin) || asset.startsWith(productionOrigin));
const brokenAssets = [];
for (let index = 0; index < assetTargets.length; index += 12) {
  const batch = assetTargets.slice(index, index + 12);
  const checks = await Promise.all(
    batch.map(async (asset) => {
      const target = asset.startsWith(productionOrigin)
        ? asset.replace(productionOrigin, origin)
        : new URL(asset, origin).toString();
      const response = await fetch(target, { redirect: "manual" });
      return response.ok ? null : { asset, status: response.status };
    }),
  );
  brokenAssets.push(...checks.filter(Boolean));
}
const failures = results.flatMap((result) =>
  Object.entries(result.checks)
    .filter(([, passed]) => !passed)
    .map(([check]) => ({ route: result.pathname, check })),
);
const report = {
  generatedAt: new Date().toISOString(),
  auditedOrigin: origin,
  productionOrigin,
  totalRoutes: results.length,
  uniqueRoutes: new Set(paths).size,
  categories,
  duplicateTitles,
  duplicateH1s,
  brokenInternalTargets,
  brokenAssets,
  sitemapValid:
    sitemapResponse.ok &&
    paths.length === new Set(paths).size &&
    paths.every((pathname) => sitemap.includes(new URL(pathname, productionOrigin).toString())),
  robotsValid:
    robotsResponse.ok &&
    /User-agent:\s*\*/i.test(robots) &&
    robots.includes(`${productionOrigin}/sitemap.xml`),
  failureCount: failures.length,
  failures,
  routes: results.map((result) => ({
    ...result,
    finalStatus: Object.values(result.checks).every(Boolean) ? "complete" : "review",
  })),
};

await mkdir("reports", { recursive: true });
await writeFile("reports/public-route-audit.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  totalRoutes: report.totalRoutes,
  uniqueRoutes: report.uniqueRoutes,
  categories,
  duplicateTitles: duplicateTitles.length,
  duplicateH1s: duplicateH1s.length,
  brokenInternalTargets: brokenInternalTargets.length,
  brokenAssets: brokenAssets.length,
  sitemapValid: report.sitemapValid,
  robotsValid: report.robotsValid,
  failureCount: failures.length,
}, null, 2));
