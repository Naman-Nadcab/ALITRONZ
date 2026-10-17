import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { articles } from "@/content/insights";
import { industries } from "@/content/industries";
import { offerings } from "@/content/offerings";
import { projectDisclaimer, projects } from "@/content/projects";
import { routes } from "@/content/routes";
import { buildPaths, hero } from "@/content/home";
import { primaryNav, capabilityLinks, companyLinks, industryLinks, serviceLinks } from "@/content/navigation";
import { searchTopics } from "@/content/search-topics";

const routeSet = new Set(routes);

function collect(value: unknown, strings: string[], hrefs: string[]) {
  if (typeof value === "string") {
    strings.push(value);
    if (value.startsWith("/") && !value.startsWith("//")) hrefs.push(value.split("#")[0].split("?")[0]);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collect(item, strings, hrefs));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collect(item, strings, hrefs));
  }
}

describe("public content", () => {
  it("keeps navigation and content links on real routes", () => {
    const hrefs: string[] = [];
    const strings: string[] = [];
    collect({ offerings, industries, projects, articles, primaryNav, serviceLinks, capabilityLinks, industryLinks, companyLinks, searchTopics, buildPaths }, strings, hrefs);
    for (const href of hrefs) expect(routeSet.has(href), href).toBe(true);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("does not invent credibility", () => {
    const strings: string[] = [];
    collect({ offerings, industries, projects, articles, hero }, strings, []);
    const blob = strings.join("\n");
    expect(blob).not.toMatch(/award-winning|our clients include|trusted by|years of experience|ISO\s*27001|SOC\s*2|testimonial|founded in|offices in/i);
    expect(blob).not.toMatch(/lorem ipsum|TODO|placeholder/i);
  });

  it("keeps financial and web3 work positioned as software", () => {
    const financial = offerings.find((item) => item.slug === "financial-trading-technology");
    const web3 = offerings.find((item) => item.slug === "web3-blockchain");
    const product = offerings.find((item) => item.slug === "digital-product-engineering");
    expect(financial?.boundary).toMatch(/not a forex broker/i);
    expect(web3?.boundary).toMatch(/does not operate a crypto exchange/i);
    expect(product?.builds.some((item) => /website/i.test(item.title))).toBe(true);
    expect(product?.builds.some((item) => /mobile/i.test(item.title))).toBe(true);
  });

  it("labels every published project as a concept", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.kind).toBe("concept");
      expect(project.outcomes).toMatch(/no customer outcomes are claimed/i);
    }
    const view = readFileSync("components/project-view.tsx", "utf8");
    expect(view).toContain("projectDisclaimer");
    expect(projectDisclaimer).toMatch(/not a completed customer delivery/i);
    const offeringView = readFileSync("components/offering-view.tsx", "utf8");
    expect(offeringView).toContain("offering.boundary");
  });
});
