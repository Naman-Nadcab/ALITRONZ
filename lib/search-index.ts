import type { SearchItem } from "@/components/site-search";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { capabilities, divisions, engagements, solutions, specialistServices } from "@/content/offerings";
import { projects } from "@/content/projects";

const fixedItems: SearchItem[] = [
  { title: "Explore Alitroz", href: "/#atlas", group: "Explore", note: "Interactive technology universe" },
  { title: "All services", href: "/services", group: "Directory", note: "Every engineering service" },
  { title: "All solutions", href: "/solutions", group: "Directory", note: "Connected system engagements" },
  { title: "All industries", href: "/industries", group: "Directory", note: "Sector-specific engineering" },
  { title: "Our work", href: "/work", group: "Directory", note: "Labelled concepts and demonstrations" },
  { title: "Insights", href: "/insights", group: "Directory", note: "Technical articles" },
  { title: "Company", href: "/company", group: "Company", note: "About Alitroz Technology" },
  { title: "Our approach", href: "/company/our-approach", group: "Company", note: "How delivery works" },
  { title: "Quality and security", href: "/company/quality-and-security", group: "Company", note: "Engineering controls" },
  { title: "Careers", href: "/company/careers", group: "Company", note: "Verified openings" },
  { title: "Contact", href: "/contact", group: "Company", note: "Contact paths" },
  { title: "Start a project", href: "/start-a-project", group: "Company", note: "Project discovery form" },
  { title: "Privacy policy", href: "/privacy-policy", group: "Legal", note: "Privacy information" },
  { title: "Terms of use", href: "/terms-of-use", group: "Legal", note: "Website terms" },
];

export function buildSearchIndex(): SearchItem[] {
  return [
    ...fixedItems,
    ...divisions.map((item) => ({ title: item.title, href: item.path, group: "Service division", note: item.result })),
    ...specialistServices.map((item) => ({ title: item.title, href: item.path, group: "Specialist service", note: item.result })),
    ...capabilities.map((item) => ({ title: item.title, href: item.path, group: "Capability", note: item.result })),
    ...solutions.map((item) => ({ title: item.title, href: item.path, group: "Solution", note: item.result })),
    ...engagements.map((item) => ({ title: item.title, href: item.path, group: "Engagement model", note: item.result })),
    ...industries.map((item) => ({ title: item.title, href: item.path, group: "Industry", note: item.summary })),
    ...projects.map((item) => ({ title: item.title, href: `/work/${item.slug}`, group: item.kindLabel, note: item.summary })),
    ...articles.map((item) => ({ title: item.title, href: `/insights/${item.slug}`, group: "Insight", note: item.excerpt })),
  ];
}
