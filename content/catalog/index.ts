import { aiServices } from "@/content/catalog/ai";
import { capabilityPages } from "@/content/catalog/capabilities";
import { engagementPages } from "@/content/catalog/engagements";
import { financeServices } from "@/content/catalog/finance";
import { productServices } from "@/content/catalog/product";
import { solutionPages } from "@/content/catalog/solutions";
import { web3Services } from "@/content/catalog/web3";

export const catalogOfferings = [
  ...aiServices,
  ...productServices,
  ...web3Services,
  ...financeServices,
  ...capabilityPages,
  ...solutionPages,
  ...engagementPages,
];
