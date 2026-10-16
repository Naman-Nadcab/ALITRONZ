export type Industry = {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  context: string[];
  systems: { title: string; text: string }[];
  workflows: string[];
  architecture: string[];
  engagement: string[];
  boundary: string;
  related: { href: string; label: string }[];
  concept: { href: string; label: string; text: string };
};

export const industries: Industry[] = [
  {
    slug: "fintech",
    path: "/industries/fintech",
    title: "Fintech & Financial Technology",
    eyebrow: "Industry",
    headline: "Software for firms that already run the financial business.",
    summary:
      "Alitroz builds trading interfaces, operational systems, and integrations for fintech and trading companies. The client keeps the regulated activity. Alitroz is not a broker, venue, custodian, or adviser.",
    context: [
      "A fintech product usually sits between people, a vendor, and a record that must stay explainable. The slow part is rarely the first chart. It is permissions, a data licence, an order that can be rejected, and a back office that can say what happened.",
      "Established firms and product teams both bring constraints. One has a live process that cannot stop. The other has a demonstration that must not be described as live execution. We engineer the software around the constraint the client actually has.",
    ],
    systems: [
      { title: "Dealing and operations interfaces", text: "Workstations, tickets, and staff tools that separate live, delayed, and simulated data, and that record a reject instead of hiding it." },
      { title: "Connectivity", text: "Adapters for market data, liquidity providers, and platforms such as MetaTrader 4 or 5 where the client already has the access, the licence, and the vendor’s permission." },
      { title: "Back office", text: "CRM, reconciliation, reporting, and risk views that help a firm run its own operation. The software does not make Alitroz the firm." },
    ],
    workflows: [
      "A price arrives, is labelled with its source and age, and is shown only while it is still usable.",
      "An order moves through states the desk can name, including reject and disconnect.",
      "A break between two books is queued for a person, with the two figures and the time they were taken.",
    ],
    architecture: [
      "Market data, order state, and customer records stay in separate paths. A screen does not invent a price by blending them.",
      "Vendor adapters sit behind an interface the rest of the product can test with a fixture. Production credentials are not the fixture.",
      "Logging covers the decision and the source, not a dump of every credential used to reach the vendor.",
    ],
    engagement: [
      "Discovery starts from the process and the permissions the client has, or is obtaining separately.",
      "A first release can be one workflow, such as a ticket and its reject path, rather than a full dealing room.",
      "Demonstration environments stay labelled. Prices and dates are agreed in the contract, not on this page.",
    ],
    boundary:
      "Alitroz develops and integrates software for clients. Alitroz is not a forex broker, trading venue operator, custodian, asset manager, or investment adviser, and does not provide investment advice.",
    related: [
      { href: "/solutions/financial-platform-technology", label: "Financial platform technology" },
      { href: "/services/trading-terminal-development", label: "Trading terminal development" },
      { href: "/services/mt4-mt5-integration", label: "MT4 and MT5 integration" },
      { href: "/engagement-models/system-integration", label: "System integration" },
    ],
    concept: {
      href: "/work/forex-trading-terminal-prototype",
      label: "Forex trading terminal prototype",
      text: "An internal demonstration with simulated data and no live route. It is labelled as a prototype, not as production execution.",
    },
  },
  {
    slug: "digital-assets-web3",
    path: "/industries/digital-assets-web3",
    title: "Digital Assets & Web3",
    eyebrow: "Industry",
    headline: "Blockchain products engineered as software, not as a venue.",
    summary:
      "Alitroz engineers contracts, applications, wallet integrations, and operational consoles for digital-asset teams. Alitroz does not operate an exchange, hold assets, or give investment advice.",
    context: [
      "Digital-asset products fail in ordinary ways as well as cryptographic ones: an unnamed admin key, an index that lags, a signing step nobody rehearsed, or a feature that cannot change after launch.",
      "The client remains responsible for issuing, custody, and any regulated activity. Our work is the software boundary around that responsibility.",
    ],
    systems: [
      { title: "On-chain modules", text: "Contracts and application logic for the chain the product uses, with tests that name the commit they cover." },
      { title: "Product interfaces", text: "Wallet connection, staff consoles, and the off-chain services that make an on-chain product usable." },
      { title: "Indexing and integration", text: "Reads from an index, writes prepared for the client’s signer, and events that other business systems can consume." },
    ],
    workflows: [
      "A user prepares a transaction, sees the payload, and signs with a key Alitroz does not hold.",
      "Staff see index lag instead of a silent stale balance.",
      "A privileged function can be paused by a role the client holds.",
    ],
    architecture: [
      "Shared state goes on-chain only where it must be shared. Application data stays in an application database.",
      "The indexer is a read model. It is allowed to be behind, and the interface says so.",
      "Environments are labelled. A test network is not described as production.",
    ],
    engagement: [
      "We separate build-time testing from an independent review. Testing during the build is not a certificate, and it does not prove a contract is free of defects.",
      "Keys, custody, and upgrade authority stay with the client unless a written design says otherwise. Our default is that they stay with the client.",
      "A first slice can be one contract module plus the console that operates it.",
    ],
    boundary:
      "Alitroz builds software for digital-asset businesses. Alitroz does not operate a crypto exchange, hold client assets, or give investment advice. Development and testing do not guarantee that a smart contract is free of defects.",
    related: [
      { href: "/solutions/digital-asset-infrastructure", label: "Digital asset infrastructure" },
      { href: "/services/smart-contract-development", label: "Smart contract development" },
      { href: "/services/crypto-wallet-development", label: "Wallet software" },
      { href: "/insights/operator-not-the-protocol", label: "The firm is not the operator" },
    ],
    concept: {
      href: "/work/digital-asset-platform-architecture",
      label: "Digital asset platform architecture",
      text: "A concept architecture for contracts, indexing, and signing. It does not operate a venue.",
    },
  },
  {
    slug: "saas",
    path: "/industries/saas",
    title: "SaaS & Technology Companies",
    eyebrow: "Industry",
    headline: "Product engineering for companies that sell the software.",
    summary:
      "Alitroz designs and builds multi-tenant products, customer applications, and the administration tools a technology company needs in order to operate what it sells.",
    context: [
      "A SaaS company feels the tenant boundary late: a support login that can see every customer, an entitlement painted on a screen but not checked in the API, or a first release that tried to be the whole platform.",
      "The useful first version is one job a real customer can finish, including denied and failed. The administration console is part of that version, not a later apology.",
    ],
    systems: [
      { title: "Customer product", text: "Web and mobile applications that share one API and one definition of the customer." },
      { title: "Tenant administration", text: "Organisations, roles, entitlements, and an audited support view." },
      { title: "Product intelligence", text: "Assistants or analytics inside the product when they read the tenant’s own data and can be switched off." },
    ],
    workflows: [
      "A customer admin invites a colleague. The invitation cannot cross into another organisation.",
      "Support opens a tenant and the action is recorded.",
      "An entitlement changes in the API. The interface cannot grant it by itself.",
    ],
    architecture: [
      "Every customer row carries a tenant. A query without one fails.",
      "Billing, if it exists, is a vendor behind an interface. Alitroz does not become the merchant.",
      "Releases promote one artifact. The tenant model does not change in the same step as a rewrite of the product.",
    ],
    engagement: [
      "Discovery writes the job and the refusals. The refusals keep the first release small enough to operate.",
      "A dedicated team fits when the product is already in market and needs a steady engineering capacity.",
      "We do not publish a price or a launch date for this kind of work. Scope is written per engagement.",
    ],
    boundary:
      "This page describes the kind of software we build for technology companies. It is not a claim about certifications, client lists, or the size of the team.",
    related: [
      { href: "/services/saas-development", label: "SaaS product development" },
      { href: "/solutions/digital-product-modernization", label: "Digital product modernization" },
      { href: "/engagement-models/end-to-end-product", label: "End-to-end product development" },
      { href: "/insights/cut-a-first-release", label: "How to cut a first release" },
    ],
    concept: {
      href: "/work/saas-administration-platform",
      label: "Multi-tenant administration concept",
      text: "A concept for tenant administration and audited support. Billing is a stub, not a live merchant account.",
    },
  },
  {
    slug: "healthcare",
    path: "/industries/healthcare",
    title: "Healthcare Technology",
    eyebrow: "Industry",
    headline: "Software around clinical and operational workflows, without borrowed credentials.",
    summary:
      "Alitroz builds healthcare technology products and integrations for organisations that already own the clinical relationship. We do not claim a clinical approval, a medical-device clearance, or a privacy certification.",
    context: [
      "Healthcare software is constrained by who may see a record, how long it must be kept, and which system is allowed to be the source. A useful product respects that before it adds an assistant.",
      "Teams often need an intake workflow, a staff console, or a connection to a system they already run. They do not need a vendor that implies a regulator has endorsed the vendor.",
    ],
    systems: [
      { title: "Staff and patient applications", text: "Portals and internal tools with roles that match the organisation’s own access policy." },
      { title: "Document and intake workflows", text: "Classification and extraction that send a low-confidence result to a person, and that keep the source document." },
      { title: "System integration", text: "APIs and scheduled exchanges with the record the organisation already trusts, rather than a second unofficial store." },
    ],
    workflows: [
      "A document arrives, is classified, and waits for review when the extraction is uncertain.",
      "A staff member sees only the records their role allows.",
      "An integration failure is visible. The product does not invent a complete record.",
    ],
    architecture: [
      "The organisation’s system of record stays the system of record. Our application stores what it must and links back.",
      "Access is checked in the API. An assistant, if one is in scope, uses the same permissions as the signed-in person.",
      "Retention and deletion follow the client’s policy. We do not publish a retention period as if it were universal.",
    ],
    engagement: [
      "Discovery includes the access policy and the systems we are allowed to touch. We do not test or connect to a clinical system without written authorization.",
      "A first release can be one workflow, such as intake review, with the clinical decision left to the client’s staff.",
      "Any regulatory filing, clinical validation, or privacy programme remains the client’s. We can engineer to a written requirement. We do not certify it.",
    ],
    boundary:
      "Alitroz builds software. Alitroz does not provide medical advice, does not claim a healthcare certification, and does not claim that a product is approved, cleared, or compliant because we built it.",
    related: [
      { href: "/services/document-intelligence", label: "Document intelligence" },
      { href: "/capabilities/identity-access-management", label: "Identity and access" },
      { href: "/services/api-integration", label: "API integration" },
      { href: "/company/quality-and-security", label: "Quality and security" },
    ],
    concept: {
      href: "/work/operations-knowledge-assistant",
      label: "Operations knowledge assistant",
      text: "A concept for permission-aware retrieval. It is not a clinical product and not a customer deployment.",
    },
  },
  {
    slug: "ecommerce",
    path: "/industries/ecommerce",
    title: "E-commerce & Retail",
    eyebrow: "Industry",
    headline: "Commerce software that matches the operation behind the storefront.",
    summary:
      "Alitroz builds commerce applications, catalogues, and the operational tools around them. The client remains the merchant. We do not operate the store or take payment on the client’s behalf.",
    context: [
      "A storefront that cannot explain stock, tax, or a failed payment creates support work the catalogue never shows. The engineering problem is the join between the shop, the warehouse, and the payment vendor.",
      "Retail teams also need internal tools: pricing exceptions, returns, and a view of what the customer was actually promised.",
    ],
    systems: [
      { title: "Commerce applications", text: "Catalogues, carts, and account areas on a stack the team can change, with the payment step left to a provider the client contracts." },
      { title: "Operational tools", text: "Order exceptions, inventory signals, and staff workflows that the storefront does not replace." },
      { title: "Integrations", text: "Connections to the systems that already know stock, fulfilment, and the customer, with a visible failure when they disagree." },
    ],
    workflows: [
      "A shopper completes a cart. Payment state comes from the provider, not from a local guess.",
      "A fulfilment update arrives late and the order says so.",
      "A return creates a record a person can reconcile, rather than a silent stock change.",
    ],
    architecture: [
      "Catalogue, order, and payment references are separate. The order stores the provider’s reference, not the card.",
      "Inventory is read from the system that owns it. A cache is allowed to be stale and must say when.",
      "Promotions are rules the business can read. They are not buried in a theme.",
    ],
    engagement: [
      "We start from the order lifecycle the client already runs, including the exceptions.",
      "A replatform is sequenced. The catalogue and the checkout do not have to move on the same day.",
      "Peak periods are a constraint we plan for. We do not publish an uptime promise on this page.",
    ],
    boundary:
      "Alitroz engineers commerce software for the merchant. Alitroz is not the merchant, the payment institution, or the operator of the client’s store.",
    related: [
      { href: "/services/ecommerce-development", label: "E-commerce development" },
      { href: "/services/api-integration", label: "API integration" },
      { href: "/industries/logistics", label: "Logistics and supply chain" },
      { href: "/engagement-models/system-integration", label: "System integration" },
    ],
    concept: {
      href: "/work/client-portal-and-mobile",
      label: "Portal and mobile concept",
      text: "A concept for a customer application and a staff view sharing one API. It is not a live shop.",
    },
  },
  {
    slug: "logistics",
    path: "/industries/logistics",
    title: "Logistics & Supply Chain",
    eyebrow: "Industry",
    headline: "Systems that show the shipment, the exception, and the lag.",
    summary:
      "Alitroz builds operational software for teams that move goods or coordinate partners. The value is a shared picture of status, not a claim that the physical network is ours.",
    context: [
      "Logistics software disappoints when status is a free-text field and the exception lives in a spreadsheet. Partners send events late. The product has to tolerate that without presenting yesterday as now.",
      "The client owns the carriers, the warehouses, and the customer promise. We build the system that records and routes the work.",
    ],
    systems: [
      { title: "Operational consoles", text: "Views of orders, shipments, and exceptions, with the time of the last event on the record." },
      { title: "Partner integrations", text: "APIs and file exchanges with carriers and warehouses, including a queue for messages that do not parse." },
      { title: "Planning support", text: "Data pipelines and dashboards that show partial figures honestly, for people who already make the planning decision." },
    ],
    workflows: [
      "An event arrives, is stored with its source time, and updates a status the operator can name.",
      "A message that fails validation waits. It does not vanish.",
      "A late update is visible as late. The console does not backfill a confident history.",
    ],
    architecture: [
      "Events are append-only. Current status is a projection.",
      "Each partner has an adapter. The domain model does not leak one carrier’s field names into every screen.",
      "A dashboard reads the projection and shows lag. It does not send the truck.",
    ],
    engagement: [
      "We pick one lane or one exception type for the first release, and we integrate the partner that lane actually uses.",
      "Access for testing a partner API is the client’s to grant. We do not probe a carrier we have not been authorized to use.",
      "Ongoing support fits when the adapters will keep changing. That is a separate engagement from the first build.",
    ],
    boundary:
      "Alitroz builds the software. Alitroz does not operate warehouses, fleets, or carrier networks, and does not claim a logistics certification.",
    related: [
      { href: "/capabilities/data-pipelines", label: "Data pipelines" },
      { href: "/services/api-integration", label: "API integration" },
      { href: "/solutions/enterprise-system-integration", label: "Enterprise system integration" },
      { href: "/capabilities/analytics-dashboards", label: "Analytics dashboards" },
    ],
    concept: {
      href: "/work/realtime-data-dashboard",
      label: "Real-time data dashboard",
      text: "A concept that shows a partial figure and its lag. The figures are fixtures, not a client’s volumes.",
    },
  },
  {
    slug: "enterprise",
    path: "/industries/enterprise",
    title: "Enterprise & Business Operations",
    eyebrow: "Industry",
    headline: "Internal systems for organisations that already have a way of working.",
    summary:
      "Alitroz modernizes and integrates the software an established business runs on: portals, workflow tools, data, and the controls around them.",
    context: [
      "Enterprise work fails when a new interface is placed on a process nobody wrote down, or when a rewrite is announced before anyone has sat with the person who runs the exception queue.",
      "The client has policies, vendors, and a change process. The engineering has to fit them. We do not replace that governance with a faster deploy.",
    ],
    systems: [
      { title: "Internal products", text: "Portals, workflow tools, and administration systems staff use to do a named job." },
      { title: "Integration and modernization", text: "A seam around one workflow so the old path and the new path can be compared." },
      { title: "Knowledge and reporting", text: "Assistants and dashboards that read an approved corpus or a defined metric, and that refuse when the evidence is thin." },
    ],
    workflows: [
      "A request moves through the states the business already uses, including the ones that send it back.",
      "A change to a record is proposed, reviewed, and then written by the system of record.",
      "A report shows its definition and its as-of time.",
    ],
    architecture: [
      "Identity comes from the client’s directory. Our application does not invent a second population of users.",
      "Integrations are explicit. A nightly file is allowed if that is the interface the vendor offers, and the lag is shown.",
      "Environments are separate. A demonstration does not point at production data.",
    ],
    engagement: [
      "Discovery and technical planning are often the right first engagement, before a build is sized.",
      "A dedicated team fits when several systems must move and the client wants a stable group.",
      "We write assumptions and exclusions. We do not publish a standard enterprise timeline.",
    ],
    boundary:
      "Industry context on this page is a description of software we can engineer. It is not a client list, a certification, or a claim about company size.",
    related: [
      { href: "/solutions/enterprise-system-integration", label: "Enterprise system integration" },
      { href: "/services/enterprise-software-development", label: "Enterprise software" },
      { href: "/engagement-models/product-discovery", label: "Product discovery" },
      { href: "/insights/modernize-without-a-rewrite", label: "Modernize without a rewrite" },
    ],
    concept: {
      href: "/work/enterprise-ai-knowledge-copilot",
      label: "Enterprise AI knowledge copilot",
      text: "A concept for a staff copilot that cites a passage and proposes a change. It does not write the record by itself.",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
