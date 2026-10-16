import type { Offering } from "@/content/offerings";

export type Entry = {
  slug: string;
  path: string;
  kind: Offering["kind"];
  parent?: string;
  figure: string;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  result: string;
  outcomes: string[];
  problem: string[];
  useCases: { title: string; text: string }[];
  builds: { title: string; text: string }[];
  deliverables: { title: string; text: string }[];
  architecture: string[];
  points: string[];
  integrations: string[];
  integrationNote: string;
  process: { title: string; text: string }[];
  assurance: string[];
  boundary?: string;
  tradeoffs: string[];
  demonstrator: Offering["demonstrator"];
  faqs: Offering["faqs"];
  related: Offering["related"];
  enquiryService: string;
};

export function entry(input: Entry): Offering {
  return {
    slug: input.slug,
    path: input.path,
    kind: input.kind,
    parent: input.parent,
    figure: input.figure,
    title: input.title,
    eyebrow: input.eyebrow,
    headline: input.headline,
    summary: input.summary,
    result: input.result,
    outcomes: input.outcomes,
    problemTitle: "The problem clients bring",
    problem: input.problem,
    useCases: input.useCases,
    builds: input.builds,
    deliverables: input.deliverables,
    architecture: input.architecture,
    architecturePoints: input.points,
    integrations: input.integrations,
    integrationNote: input.integrationNote,
    process: input.process,
    assurance: input.assurance,
    boundary: input.boundary,
    tradeoffs: input.tradeoffs,
    demonstrator: input.demonstrator,
    faqs: input.faqs,
    related: input.related,
    enquiryService: input.enquiryService,
  };
}
