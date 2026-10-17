export const processStages = [
  {
    title: "Discovery",
    summary: "Frame the business outcome, the constraints, and what should stay out of scope.",
    purpose:
      "Agree what the software is for, who will use it, which systems it must join, and which risks the business cannot accept.",
    deliverables:
      "A written problem framing, constraints, assumptions, and a proposed shape for the engagement.",
  },
  {
    title: "Architecture",
    summary: "Decide the structure of the system before the expensive parts of the build.",
    purpose:
      "Turn the problem into boundaries other engineers can extend: interfaces, data, identity, and the places where the product must stay under human control.",
    deliverables:
      "Architecture notes, key interfaces, integration boundaries, and an honest list of risks that remain.",
  },
  {
    title: "Build",
    summary: "Implement the product in increments that can be reviewed against the scope.",
    purpose:
      "Produce working software in the client's repository, with decisions recorded as the work proceeds rather than reconstructed at the end.",
    deliverables:
      "Working software, source in the agreed repository, and a record of the implementation choices that matter.",
  },
  {
    title: "Validate",
    summary: "Check the software against the agreed behaviour, including the unpleasant cases.",
    purpose:
      "Find what does not hold before it is called done. Validation covers the main paths, the failure paths, and the integrations the product depends on.",
    deliverables:
      "Test results, the fixes those results require, and a list of known limitations.",
  },
  {
    title: "Deploy",
    summary: "Put the software where it can be operated, with a way back if a release fails.",
    purpose:
      "Move from a working build to an environment the client can run, observe, and roll back.",
    deliverables:
      "Deployment setup, environment notes, and a release that can be operated by the client's team.",
  },
  {
    title: "Support",
    summary: "Keep the product healthy after release and improve it from evidence of use.",
    purpose:
      "A launch is not the end of the system. Support covers the maintenance, fixes, and improvements the engagement actually includes.",
    deliverables:
      "The maintenance work agreed in the engagement, operational notes, and a backlog based on real use.",
  },
] as const;

export const engagementModels = [
  {
    title: "Product discovery and technical planning",
    text: "For teams that need a clear scope, architecture, and delivery plan before committing to a build.",
  },
  {
    title: "End-to-end product development",
    text: "For a defined product, from the experience and the engineering through to deployment.",
  },
  {
    title: "Dedicated engineering engagements",
    text: "For organisations that need senior engineering capacity inside an existing product team.",
  },
  {
    title: "Integrations and modernization",
    text: "For systems that must connect, or for software that has become costly and risky to change.",
  },
  {
    title: "Ongoing platform engineering and maintenance",
    text: "For products that are already live and need continued improvement, fixes, and operational care.",
  },
] as const;

export const principles = [
  {
    title: "Confidentiality",
    text: "Client information is shared only with the people working on the engagement.",
  },
  {
    title: "Secure engineering",
    text: "Access, environments, and changes are handled deliberately. That reduces risk. It does not remove it.",
  },
  {
    title: "Transparent scope",
    text: "What is included, what is excluded, and what is assumed are written down before the build depends on them.",
  },
  {
    title: "Documented delivery",
    text: "Interfaces, important decisions, and handover notes are part of the work, not an optional extra.",
  },
  {
    title: "Testing",
    text: "Changes are checked against the agreed behaviour before they are treated as done.",
  },
  {
    title: "Responsible technology",
    text: "We will say when an approach is a poor fit, including when automation or a financial integration should not proceed without the client's own permissions and controls.",
  },
] as const;

export const homepageJourney = [
  {
    title: "Discovery",
    text: "Agree the outcome, the people who will use the product, and what should stay out of scope.",
  },
  {
    title: "Architecture",
    text: "Set the boundaries for interfaces, data, identity, and the places a person must stay in control.",
  },
  {
    title: "Experience design",
    text: "Shape the product people actually use, against the constraints discovery already found.",
  },
  {
    title: "Engineering",
    text: "Build the software in increments that can be reviewed in the client’s repository.",
  },
  {
    title: "Validation",
    text: "Check the main paths, the failure paths, and the integrations the product depends on.",
  },
  {
    title: "Deployment and support",
    text: "Release somewhere the team can operate and roll back, then keep the agreed maintenance going.",
  },
] as const;

export const buildPaths = [
  {
    id: "ai",
    label: "An AI-powered product",
    service: "AI & Intelligent Automation",
    href: "/services/ai-automation",
    role: "Agents, copilots, and knowledge systems that sit inside a real workflow. A person stays on the steps that change a record.",
    projectTitle: "Enterprise AI knowledge copilot",
    projectHref: "/work/enterprise-ai-knowledge-copilot",
    projectKind: "Concept showcase",
    projectNote: "A staff copilot that cites a source and proposes a change instead of making it.",
    also: [] as { href: string; label: string }[],
  },
  {
    id: "product",
    label: "A website, application, or SaaS platform",
    service: "Digital Product Engineering",
    href: "/services/digital-product-engineering",
    role: "Websites, applications, mobile products, and multi-tenant software, with a repository and a release path the client keeps.",
    projectTitle: "Multi-tenant SaaS administration platform",
    projectHref: "/work/saas-administration-platform",
    projectKind: "Concept showcase",
    projectNote: "Tenant administration, roles, and an audited support view. Not a completed customer delivery.",
    also: [{ href: "/services/legacy-modernization", label: "Legacy modernization" }],
  },
  {
    id: "web3",
    label: "A Web3 or blockchain system",
    service: "Web3 & Blockchain Engineering",
    href: "/services/web3-blockchain",
    role: "Contracts, applications, and operational tools. Alitroz does not operate an exchange, hold keys, or give investment advice.",
    projectTitle: "Digital asset platform architecture",
    projectHref: "/work/digital-asset-platform-architecture",
    projectKind: "Concept showcase",
    projectNote: "A sketch of contracts, indexing, and client-held signing. The client would operate it.",
    also: [],
  },
  {
    id: "finance",
    label: "A financial or trading technology platform",
    service: "Financial & Trading Technology",
    href: "/services/financial-trading-technology",
    role: "Terminals, integrations, and operational software for a client that keeps the regulated activity. Alitroz is not a broker or adviser.",
    projectTitle: "Forex trading terminal prototype",
    projectHref: "/work/forex-trading-terminal-prototype",
    projectKind: "Internal demonstration",
    projectNote: "A labelled dealing interface. It is not a live brokerage and not evidence of production execution.",
    also: [],
  },
  {
    id: "platform",
    label: "Cloud, data, or application security",
    service: "Cloud, DevOps & Reliability",
    href: "/capabilities/cloud-devops",
    role: "Release paths, data that can be trusted, and a clearer picture of how an application fails. These support the product. They are not a separate promise of uptime or a certificate.",
    projectTitle: "Cloud-native deployment and observability demonstrator",
    projectHref: "/work/deployment-observability-demonstrator",
    projectKind: "Internal demonstration",
    projectNote: "Environment separation and a small set of health signals. Not a client's production estate.",
    also: [
      { href: "/capabilities/data-engineering", label: "Data Engineering & Analytics" },
      { href: "/capabilities/cybersecurity", label: "Cybersecurity & Application Security" },
    ],
  },
] as const;

export const hero = {
  eyebrow: "AI · Software · Digital infrastructure",
  title: "We engineer intelligent products for ambitious businesses.",
  lede: "From AI-powered applications to enterprise software, blockchain systems, and financial technology, we transform complex requirements into engineered digital products.",
  primary: "Discuss a Project",
  secondary: "Explore Our Work",
};
