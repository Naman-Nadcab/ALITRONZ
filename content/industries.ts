export type Industry = {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  context: string[];
  systems: { title: string; text: string }[];
  engagement: string[];
  boundary: string;
  related: { href: string; label: string }[];
};

export const industries: Industry[] = [
  {
    slug: "fintech-trading",
    path: "/industries/fintech-trading",
    title: "Fintech & Trading",
    eyebrow: "Industry",
    headline: "Software for firms that already run the financial business.",
    summary:
      "Alitroz builds trading interfaces, integrations, and operational systems for fintech and trading companies. Alitroz is not a forex broker, trading venue, custodian, or investment adviser.",
    context: [
      "Fintech and trading businesses usually need software that sits between people, market data, and existing vendors. The hard part is rarely a single screen. It is permissions, data licences, order state, and a back office that can explain what happened.",
      "We work with established firms and with product teams building trading technology. The client keeps the regulated activity. We engineer the software around it.",
    ],
    systems: [
      {
        title: "Trading interfaces",
        text: "Workstations, charts, and order tickets designed around the firm's actual workflow, with a visible difference between live, delayed, and simulated data.",
      },
      {
        title: "Vendor and liquidity connectivity",
        text: "Adapters for market data, liquidity providers, and platforms such as MetaTrader 4 or 5 where the client has the required access. We do not bypass vendor controls.",
      },
      {
        title: "Broker operations software",
        text: "CRM, back-office tools, reconciliation, reporting, and risk controls that help a firm run its own operation. The software does not make Alitroz the broker.",
      },
    ],
    engagement: [
      "We start from the business process and the permissions the client already has, or is obtaining separately.",
      "Demonstration environments stay labelled as demonstrations. They are not described as live execution.",
      "Scope, vendor dependencies, and operational responsibility are written into the engagement.",
    ],
    boundary:
      "Alitroz develops and integrates software for clients. Alitroz is not a forex broker, trading venue operator, custodian, asset manager, or investment adviser, and does not provide investment advice.",
    related: [
      { href: "/services/financial-trading-technology", label: "Financial & Trading Technology" },
      { href: "/work/multi-market-trading-workstation", label: "Trading workstation concept" },
      { href: "/insights/trading-software-is-a-system", label: "Trading software is a system" },
    ],
  },
  {
    slug: "digital-assets-web3",
    path: "/industries/digital-assets-web3",
    title: "Digital Assets & Web3",
    eyebrow: "Industry",
    headline: "Blockchain products engineered as software, not as a venue.",
    summary:
      "Alitroz engineers smart contracts, decentralized applications, wallets integrations, and operational consoles for digital-asset teams. Alitroz does not operate an exchange or hold client assets.",
    context: [
      "Digital-asset products fail in ordinary ways as well as cryptographic ones: an unclear admin key, an index that lags, a wallet step nobody rehearsed, or a feature that cannot be changed after launch.",
      "We build the software a protocol, a tokenization team, or a digital-asset company needs in order to operate. The client remains responsible for issuing, custody, and any regulated activity.",
    ],
    systems: [
      {
        title: "On-chain applications",
        text: "Smart contracts and decentralized applications, developed and tested for the chain the product actually uses.",
      },
      {
        title: "Product interfaces",
        text: "Wallet connection, operational consoles, and the off-chain services that make an on-chain product usable.",
      },
      {
        title: "Data and integration",
        text: "Indexing, chain APIs, and the connections between on-chain events and the systems a business already runs.",
      },
    ],
    engagement: [
      "We separate application development from an independent security audit. Testing during the build is not a guarantee, and high-risk contracts should be reviewed by a dedicated auditor.",
      "Keys, custody, and upgrade authority stay with the client unless a written design says otherwise.",
      "We do not present Alitroz as an exchange, a broker, or an adviser.",
    ],
    boundary:
      "Alitroz builds software for digital-asset businesses. Alitroz does not operate a crypto exchange, hold client assets, or give investment advice. Development and testing do not guarantee that a smart contract is free of defects.",
    related: [
      { href: "/services/web3-blockchain", label: "Web3 & Blockchain Engineering" },
      { href: "/work/digital-asset-operations-console", label: "Operations console concept" },
      { href: "/insights/blockchain-products-that-can-change", label: "Products that can still be changed" },
    ],
  },
  {
    slug: "saas-enterprise",
    path: "/industries/saas-enterprise",
    title: "SaaS & Enterprise",
    eyebrow: "Industry",
    headline: "Product engineering for companies that depend on the software.",
    summary:
      "Alitroz designs and builds websites, web applications, mobile applications, and enterprise platforms for SaaS companies and established businesses.",
    context: [
      "A SaaS company and an enterprise team often need the same discipline: a product people can understand, a system that can be changed, and a release that can be operated. The difference is the constraint. A startup may need a first serious version. An established business may need to modernize something that already runs the operation.",
      "Websites and marketing experiences sit in this work when they are part of the product, not as a separate low-value offer. So do the internal tools that staff use every day.",
    ],
    systems: [
      {
        title: "Customer-facing products",
        text: "Web applications, mobile applications, and the corporate sites that introduce them.",
      },
      {
        title: "Platforms and internal software",
        text: "SaaS platforms, admin tools, and custom enterprise systems with APIs the rest of the business can use.",
      },
      {
        title: "Intelligence inside the product",
        text: "Assistants, document workflows, and data features where they earn a place in the operation, supported by the same engineering standards as the rest of the product.",
      },
    ],
    engagement: [
      "Discovery decides what the first release must do and what can wait.",
      "Design, application engineering, and integration stay in one scope so the interface and the system do not diverge.",
      "Modernization is planned around the behaviour that must keep working while the software changes.",
    ],
    boundary:
      "Industry experience on this page describes the kind of software we build. It is not a claim about certifications, client lists, or the size of the team.",
    related: [
      { href: "/services/digital-product-engineering", label: "Digital Product Engineering" },
      { href: "/services/ai-automation", label: "AI & Intelligent Automation" },
      { href: "/work/client-portal-and-mobile", label: "Portal and mobile concept" },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
