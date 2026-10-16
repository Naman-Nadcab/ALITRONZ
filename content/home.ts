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

export const hero = {
  eyebrow: "AI · Software · Digital infrastructure",
  title: "We engineer intelligent products for ambitious businesses.",
  lede: "From AI-powered applications to enterprise platforms, blockchain systems, and financial technology, we turn complex requirements into engineered digital products.",
  primary: "Discuss a Project",
  secondary: "Explore Our Work",
};
