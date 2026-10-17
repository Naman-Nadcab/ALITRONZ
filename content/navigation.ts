import { capabilities, capabilityDetails, divisions, engagements, solutions, specialistServices } from "@/content/offerings";
import { industries } from "@/content/industries";

export type NavLink = { label: string; href: string; note?: string };

export const serviceLinks: NavLink[] = divisions.map((item) => ({
  label: item.title,
  href: item.path,
  note: item.result,
}));

export const capabilityLinks: NavLink[] = capabilities.map((item) => ({
  label: item.title,
  href: item.path,
  note: item.result,
}));

export const industryLinks: NavLink[] = industries.map((item) => ({
  label: item.title,
  href: item.path,
}));

export const solutionLinks: NavLink[] = solutions.map((item) => ({
  label: item.title,
  href: item.path,
}));

export const engagementLinks: NavLink[] = engagements.map((item) => ({
  label: item.title,
  href: item.path,
}));

export const serviceGroups = divisions.map((division) => ({
  title: division.title,
  href: division.path,
  result: division.result,
  links: specialistServices
    .filter((item) => item.parent === division.slug)
    .map((item) => ({ label: item.title, href: item.path })),
}));

export const capabilityGroups = capabilities.map((hub) => ({
  title: hub.title,
  href: hub.path,
  result: hub.result,
  links: capabilityDetails
    .filter((item) => item.parent === hub.slug)
    .map((item) => ({ label: item.title, href: item.path })),
}));

export const companyLinks: NavLink[] = [
  { label: "About", href: "/company", note: "Positioning and collaboration." },
  { label: "Our approach", href: "/company/our-approach", note: "How an engagement runs." },
  { label: "Quality and security", href: "/company/quality-and-security", note: "Controls, without a borrowed certificate." },
  { label: "Careers", href: "/company/careers", note: "How to talk to us about work." },
  { label: "Contact", href: "/contact", note: "How to reach the team." },
];

export const primaryNav = [
  { label: "What We Do", href: "/services", menu: "services" as const },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/company", menu: "company" as const },
];
