import { articles } from "@/content/insights";
import { industries } from "@/content/industries";
import { offerings } from "@/content/offerings";
import { projects } from "@/content/projects";

export const routes = [
  "/",
  "/services",
  "/industries",
  "/work",
  "/insights",
  "/company",
  "/company/our-approach",
  "/company/quality-and-security",
  "/company/careers",
  "/solutions",
  "/engagement-models",
  "/contact",
  "/start-a-project",
  "/privacy-policy",
  "/terms-of-use",
  ...offerings.map((item) => item.path),
  ...industries.map((item) => item.path),
  ...projects.map((item) => `/work/${item.slug}`),
  ...articles.map((item) => `/insights/${item.slug}`),
];
