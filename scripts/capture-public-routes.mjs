import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const origin = process.env.AUDIT_ORIGIN ?? "http://localhost:3000";
const executablePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputRoot = "reports/screenshots";
const representativeRoutes = [
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
const extraViewports = [
  { name: "laptop", width: 1280, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small", width: 320, height: 640 },
];
const mobileRoutes = representativeRoutes;

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
  const measures = await page.evaluate(() => {
    const initialX = window.scrollX;
    const initialY = window.scrollY;
    window.scrollTo(Number.MAX_SAFE_INTEGER, initialY);
    const horizontalScrollRange = window.scrollX;
    window.scrollTo(initialX, initialY);
    return {
      viewportWidth: window.innerWidth,
      bodyWidth: document.body.scrollWidth,
      htmlWidth: document.documentElement.scrollWidth,
      horizontalScrollRange,
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
    };
  });
  const relativePath = `${viewportName}/${filename(pathname)}.jpg`;
  // Chromium cannot rasterise a single capture taller than 16384px; very long pages are captured in clipped segments.
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const segmentHeight = 15000;
  const extraSegments = [];
  if (documentHeight <= segmentHeight) {
    await page.screenshot({ path: `${outputRoot}/${relativePath}`, type: "jpeg", quality: 62, fullPage: true });
  } else {
    const segments = Math.ceil(documentHeight / segmentHeight);
    for (let index = 0; index < segments; index += 1) {
      const segmentPath = index === 0 ? relativePath : relativePath.replace(/\.jpg$/, `--part${index + 1}.jpg`);
      await page.screenshot({
        path: `${outputRoot}/${segmentPath}`,
        type: "jpeg",
        quality: 62,
        fullPage: true,
        clip: { x: 0, y: index * segmentHeight, width, height: Math.min(segmentHeight, documentHeight - index * segmentHeight) },
      });
      if (index > 0) extraSegments.push(segmentPath);
    }
  }
  page.off("console", onConsole);
  return {
    pathname,
    viewport: viewportName,
    status: response?.status() ?? 0,
    screenshot: relativePath,
    screenshotSegments: extraSegments,
    documentHeight,
    ...measures,
    overflow: measures.horizontalScrollRange > 1,
    consoleErrors,
  };
}

const routes = await routesFromSitemap();
await mkdir(`${outputRoot}/desktop`, { recursive: true });
for (const viewport of extraViewports) await mkdir(`${outputRoot}/${viewport.name}`, { recursive: true });

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
for (const viewport of extraViewports) {
  for (const pathname of representativeRoutes) {
    try {
      results.push(await capture(mobilePage, pathname, viewport.name, viewport.width, viewport.height));
    } catch (error) {
      results.push({
        pathname,
        viewport: viewport.name,
        status: 0,
        screenshot: "",
        overflow: false,
        consoleErrors: [error instanceof Error ? error.message : String(error)],
      });
    }
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
  representativeViewports: extraViewports.map((viewport) => `${viewport.name} ${viewport.width}x${viewport.height}`),
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
  </head><body><h1>Alitroz public-route visual review</h1><p>${routes.length} desktop routes (full page, 1440) and ${mobileRoutes.length} representative routes at ${extraViewports.map((viewport) => `${viewport.width}px`).join(", ")}.</p><main>${cards}</main></body></html>`,
);

console.log(JSON.stringify({
  desktopCaptures: results.filter((result) => result.viewport === "desktop" && result.status === 200).length,
  mobileCaptures: results.filter((result) => result.viewport === "mobile" && result.status === 200).length,
  responsiveCaptures: results.filter((result) => result.viewport !== "desktop" && result.status === 200).length,
  failures: results.filter((result) => result.status !== 200 || result.consoleErrors.length > 0).length,
  overflows: results.filter((result) => result.overflow).length,
  contactSheet: `${outputRoot}/index.html`,
}, null, 2));
