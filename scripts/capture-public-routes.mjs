import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.env.AUDIT_ORIGIN ?? "http://localhost:3000";
const executablePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputRoot = "reports/screenshots";
const mobileRoutes = [
  "/",
  "/services/ai-agent-development",
  "/services/web-application-development",
  "/services/smart-contract-development",
  "/services/trading-terminal-development",
  "/capabilities/cloud-architecture",
  "/capabilities/data-pipelines",
  "/capabilities/application-security",
  "/solutions/enterprise-ai-automation",
  "/industries/fintech",
  "/work/forex-trading-terminal-prototype",
  "/insights/scope-an-enterprise-assistant",
  "/start-a-project",
];

function filename(pathname) {
  return pathname === "/" ? "home" : pathname.slice(1).replaceAll("/", "--").replaceAll(/[^a-z0-9-]/gi, "-");
}

async function routesFromSitemap() {
  const response = await fetch(`${origin}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap returned ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
}

async function capture(page, pathname, viewportName, width, height) {
  const consoleErrors = [];
  const onConsole = (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  };
  page.on("console", onConsole);
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto(new URL(pathname, origin).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 15_000 });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}",
  });
  await page.waitForTimeout(200);
  const measures = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    bodyWidth: document.body.scrollWidth,
    htmlWidth: document.documentElement.scrollWidth,
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim() ?? "",
  }));
  const relativePath = `${viewportName}/${filename(pathname)}.jpg`;
  await page.screenshot({
    path: `${outputRoot}/${relativePath}`,
    type: "jpeg",
    quality: 62,
    fullPage: false,
  });
  page.off("console", onConsole);
  return {
    pathname,
    viewport: viewportName,
    status: response?.status() ?? 0,
    screenshot: relativePath,
    ...measures,
    overflow: measures.bodyWidth > measures.viewportWidth + 1,
    consoleErrors,
  };
}

const routes = await routesFromSitemap();
await mkdir(`${outputRoot}/desktop`, { recursive: true });
await mkdir(`${outputRoot}/mobile`, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--disable-dev-shm-usage"],
});
const context = await browser.newContext({ colorScheme: "dark" });
const results = [];
const queue = [...routes];
const workers = Array.from({ length: 4 }, async () => {
  const page = await context.newPage();
  while (queue.length > 0) {
    const pathname = queue.shift();
    if (!pathname) break;
    try {
      results.push(await capture(page, pathname, "desktop", 1440, 1000));
    } catch (error) {
      results.push({
        pathname,
        viewport: "desktop",
        status: 0,
        screenshot: "",
        overflow: false,
        consoleErrors: [error instanceof Error ? error.message : String(error)],
      });
    }
  }
  await page.close();
});
await Promise.all(workers);

const mobilePage = await context.newPage();
for (const pathname of mobileRoutes) {
  try {
    results.push(await capture(mobilePage, pathname, "mobile", 390, 844));
  } catch (error) {
    results.push({
      pathname,
      viewport: "mobile",
      status: 0,
      screenshot: "",
      overflow: false,
      consoleErrors: [error instanceof Error ? error.message : String(error)],
    });
  }
}
await mobilePage.close();
await context.close();
await browser.close();

results.sort((a, b) => a.viewport.localeCompare(b.viewport) || a.pathname.localeCompare(b.pathname));
await writeFile(`${outputRoot}/manifest.json`, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  origin,
  desktopRoutes: routes.length,
  mobileRoutes: mobileRoutes.length,
  failures: results.filter((result) => result.status !== 200 || result.consoleErrors.length > 0),
  overflows: results.filter((result) => result.overflow),
  captures: results,
}, null, 2)}\n`);

const cards = results
  .filter((result) => result.screenshot)
  .map(
    (result) => `<figure>
      <a href="${result.screenshot}"><img src="${result.screenshot}" loading="lazy" alt=""></a>
      <figcaption><strong>${result.pathname}</strong><span>${result.viewport} · ${result.status}</span></figcaption>
    </figure>`,
  )
  .join("\n");
await writeFile(
  `${outputRoot}/index.html`,
  `<!doctype html><html><head><meta charset="utf-8"><title>Alitroz route review</title>
  <style>body{margin:0;padding:24px;background:#181827;color:#f8f5ff;font:14px system-ui}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px}figure{margin:0;padding:8px;background:#302c48;border:1px solid #58516f;border-radius:12px}img{display:block;width:100%;aspect-ratio:1.44;object-fit:cover;object-position:top;border-radius:8px;background:#242438}figcaption{display:grid;gap:4px;padding:10px 4px 2px;overflow-wrap:anywhere}span{color:#c5c0d4;font-size:12px}</style>
  </head><body><h1>Alitroz public-route visual review</h1><p>${routes.length} desktop routes and ${mobileRoutes.length} mobile representatives.</p><main>${cards}</main></body></html>`,
);

console.log(JSON.stringify({
  desktopCaptures: results.filter((result) => result.viewport === "desktop" && result.status === 200).length,
  mobileCaptures: results.filter((result) => result.viewport === "mobile" && result.status === 200).length,
  failures: results.filter((result) => result.status !== 200 || result.consoleErrors.length > 0).length,
  overflows: results.filter((result) => result.overflow).length,
  contactSheet: `${outputRoot}/index.html`,
}, null, 2));
