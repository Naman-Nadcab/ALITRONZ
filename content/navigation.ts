import { capabilities, divisions } from "@/content/offerings";
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

export const companyLinks: NavLink[] = [
  { label: "Company", href: "/company", note: "Positioning, collaboration, and quality." },
  { label: "Our approach", href: "/company/our-approach", note: "How an engagement actually runs." },
  { label: "Contact", href: "/contact", note: "How to reach the team." },
];

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" as const },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company", menu: "company" as const },
];
