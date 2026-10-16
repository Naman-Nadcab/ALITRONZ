export type Project = {
  slug: string;
  title: string;
  kind: "concept";
  kindLabel: string;
  category: string;
  industry: string;
  workflows?: string[];
  limitations?: string;
  security?: string;
  serviceLinks?: { href: string; label: string }[];
  services: string[];
  summary: string;
  context: string;
  constraints: string;
  role: string;
  approach: string;
  implementation: string;
  outcomes: string;
  technologies: string[];
};

export const projectDisclaimer =
  "Concept showcase. This is not a completed customer delivery, and no customer outcomes are claimed.";

export const projects: Project[] = [
  {
    slug: "operations-knowledge-assistant",
    title: "Operations knowledge assistant",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "AI and Automation",
    industry: "SaaS & enterprise",
    services: ["AI & Intelligent Automation", "Data Engineering & Analytics"],
    summary:
      "A proposed system for letting an operations team ask questions of its own procedures, tickets, and documents, with a clear line between answering and taking action.",
    context:
      "Operations teams often keep the real instructions in shared drives, ticket threads, and the memory of a few senior people. A general-purpose chat tool can draft an answer, but it does not know which document is current, who is allowed to see it, or when a person must approve a change.",
    constraints:
      "The concept assumes the source material stays in the client's existing systems, answers must cite the passage they came from, and any action that changes a record needs an explicit approval. It also assumes the model host is chosen for the client's data constraints, not for novelty.",
    role:
      "This is an engineering concept, not a customer delivery. The role described is the one Alitroz would take: frame the decisions the assistant may support, design the retrieval and permission boundary, and implement the application around those rules.",
    approach:
      "Separate reading from acting. The first release answers questions from an approved corpus and shows its sources. A later release can propose actions in tools the business already uses, but only through a permission check and a person who confirms the change. Evaluation uses a set of real questions with known good answers, kept beside the product rather than invented after launch.",
    implementation:
      "Documents and ticket exports are ingested on a schedule, split, and indexed with the access rules attached to each chunk. The application retrieves a small set of passages, asks the model to answer only from those passages, and refuses when the evidence is thin. Tool calls sit behind an allow-list. Logs record the question, the sources, and whether a person accepted a proposed action. The model provider is an adapter, so it can be changed without rewriting the product.",
    outcomes:
      "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: [
      "TypeScript",
      "PostgreSQL",
      "A retrieval index chosen for the corpus",
      "A model API chosen for the client's data constraints",
      "Queue-based ingestion",
      "OpenTelemetry",
    ],
  },
  {
    slug: "client-portal-and-mobile",
    title: "Client portal and mobile companion",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Web and Mobile Applications",
    industry: "SaaS & enterprise",
    services: ["Digital Product Engineering"],
    summary:
      "A concept for a customer portal and a companion mobile app that share one account model, one API, and a deliberately small first release.",
    context:
      "A business that serves other businesses often outgrows email and spreadsheets before it is ready for a large platform. Customers need a place to see status, submit requests, and read documents. Staff need the same records, without a second copy of the truth.",
    constraints:
      "The concept keeps the first release to the tasks people already do every week. It assumes one identity system, one system of record, and a mobile app that covers the same core tasks rather than a separate feature set. Offline use is limited to reading recently opened records.",
    role:
      "This is an engineering concept, not a customer delivery. Alitroz's role in a project of this kind would be product definition, interface design, the web and mobile clients, the API, and the path to a first production release.",
    approach:
      "Design the account, the request, and the document as the only primary objects. Map every screen to one of those objects. Put business rules in the API so the website and the mobile app cannot drift. Ship the staff and customer views together, because a portal that customers can see and staff cannot operate will fail quietly.",
    implementation:
      "A web application for staff and customers, and a mobile client for the same API. Authentication uses the client's identity provider where one exists. The API is versioned, documented, and covered by tests around permissions: a customer cannot read another customer's record, and a staff role cannot perform an action the role was not given. File storage is referenced, not duplicated into the app database. The deployment includes a staging environment that mirrors the permission model.",
    outcomes:
      "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: [
      "TypeScript",
      "Next.js",
      "A mobile client chosen for the product constraints",
      "PostgreSQL",
      "Object storage",
      "The client's identity provider",
    ],
  },
  {
    slug: "digital-asset-operations-console",
    title: "Digital asset operations console",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Web3 and Blockchain",
    industry: "Digital assets & Web3",
    services: ["Web3 & Blockchain Engineering"],
    summary:
      "A concept for software that helps a digital-asset team prepare, review, and monitor on-chain operations without treating the interface as custody or an exchange.",
    context:
      "Teams working with tokens and smart contracts often split the work across a wallet, a block explorer, a spreadsheet, and a chat thread. The risk is not only a faulty contract. It is also an unclear approval, an untracked admin action, or an index that falls behind the chain.",
    constraints:
      "The concept does not hold customer assets and does not match or execute trades. Signing stays in the client's own wallet or approval system. Contract upgrade rights, if they exist, remain with the client. The console reads chain data through an indexer and prepares transactions for a person to review.",
    role:
      "This is an engineering concept, not a customer delivery. The role Alitroz would take is application engineering: the console, the indexing integration, the transaction preparation flow, and the tests around it. An independent security audit, where the risk requires one, is a separate engagement and is not replaced by this build.",
    approach:
      "Make every sensitive action visible before it is signed. Show the contract, the function, the parameters, and the wallet that would sign. Keep a record of who prepared the action and who approved it. Treat chain data as something that can lag, and show that lag instead of hiding it.",
    implementation:
      "A web console talks to an indexing service for balances, events, and contract state. Write actions build an unsigned transaction and hand it to the client's wallet. The application stores the preparation record and the eventual transaction hash. It does not store private keys. Admin functions are listed explicitly. Tests cover decoding, permission checks, and the failure case where the index is behind the chain. Contract code, if in scope, is developed and tested in a local environment. That testing is not presented as a guarantee.",
    outcomes:
      "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: [
      "TypeScript",
      "A contract language selected for the target chain",
      "Wallet connection for signing only",
      "An indexing or node API",
      "PostgreSQL",
      "Local chain test environments",
    ],
  },
  {
    slug: "multi-market-trading-workstation",
    title: "Multi-market trading workstation",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Financial and Trading Technology",
    industry: "Fintech & trading",
    services: ["Financial & Trading Technology", "Cloud, DevOps & Reliability"],
    summary:
      "A concept for a trading workstation that combines charting, market data, and order entry for a firm that already operates the trading business.",
    context:
      "Trading teams often work across a vendor terminal, a spreadsheet of risk, and a chat channel for exceptions. A custom workstation only helps if it respects the firm's permissions, the data vendor's licence, and the difference between a demonstration feed and a live order route.",
    constraints:
      "Alitroz would build the software. The client remains the broker, venue, or trading firm, and remains responsible for its licences and for the relationships with liquidity providers and platform vendors. A simulated or delayed feed is labelled as such and is not treated as production execution. MetaTrader connectivity is included only where the client has the account and vendor access the integration requires.",
    role:
      "This is an engineering concept, not a customer delivery. The role is interface engineering, market-data integration, and the application services around orders, positions, and reconciliation. It is not operation of a trading venue and it is not investment advice.",
    approach:
      "Design the screen around the decision a trader or dealer actually makes, then connect only the data and order paths the client is allowed to use. Keep risk checks and audit records in the application even when the venue performs its own checks. Make the state of each connection visible: live, delayed, simulated, or down.",
    implementation:
      "A desktop-style web workstation renders charts and a blotter from a normalised market-data stream. Order tickets call the client's permitted trading API. The application records the request, the response, and the later fill so the back office can reconcile. Vendor adapters isolate MetaTrader, a liquidity provider, or another API behind one interface. Deployment includes separate demonstration and production configuration, and the interface refuses to present demonstration execution as live. Observability covers feed lag and rejected orders.",
    outcomes:
      "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: [
      "TypeScript",
      "A charting library suited to the workstation",
      "Market-data adapters",
      "The client's permitted trading APIs",
      "PostgreSQL",
      "Separate demonstration and production configuration",
    ],
  },
  {
    slug: "enterprise-ai-knowledge-copilot",
    title: "Enterprise AI knowledge copilot",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "AI and Automation",
    industry: "Enterprise operations",
    services: ["AI & Intelligent Automation"],
    summary: "A concept for a staff copilot that answers from tenant-scoped company records, cites the passage, and proposes changes instead of making them.",
    context: "Staff already have a system of record. A separate chat tool with a copied document dump creates a second, less governed store and can answer from another team's files.",
    constraints: "The concept uses the signed-in user's permissions. It does not train a public model on the client's records. Write-back is a proposal. Accuracy is not guaranteed.",
    role: "This is an engineering concept, not a customer delivery. The role would be product and platform engineering: retrieval, permissions, the embedded interface, and evaluation.",
    approach: "Index only an owned corpus. Filter retrieval before the model sees text. Show citations. Keep actions as drafts that the host application's API must accept.",
    implementation: "A panel inside the host application calls a retrieval service with the user's identity. Chunks carry tenant and access labels. The model adapter is replaceable. Logs record the question and the source ids, not a full dump of the corpus. An evaluation set includes questions the corpus cannot answer.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["TypeScript", "The host application's API", "A permission-aware index", "A model host chosen for the data constraint"],
    workflows: ["Ask a procedure question and open the cited passage.", "Draft a ticket note and leave it unsaved.", "Disable a source without taking the copilot offline."],
    limitations: "The concept does not cover every company repository, and it does not claim a measured accuracy.",
    security: "Cross-tenant context is a defect. Secrets are not placed in prompts. The model host is selected for retention, not convenience.",
    serviceLinks: [
      { href: "/services/enterprise-ai-copilots", label: "Enterprise AI copilots" },
      { href: "/solutions/enterprise-ai-automation", label: "Enterprise AI automation" },
    ],
  },
  {
    slug: "digital-asset-platform-architecture",
    title: "Digital asset platform architecture",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Web3 and Blockchain",
    industry: "Digital assets & Web3",
    services: ["Web3 & Blockchain Engineering"],
    summary: "A concept architecture for contracts, indexing, signing, and staff tools. The client would operate it. Alitroz would not hold keys or run an exchange.",
    context: "Digital-asset products stall when the diagram is a chain logo and the indexer, the admin key, and the on-call are unnamed.",
    constraints: "No custody, no exchange operation, no investment advice. Test networks are labelled. Upgrade rights stay with the client.",
    role: "This is an engineering concept, not a customer delivery. The role would be architecture and implementation of the software boundary, not operation of a venue.",
    approach: "Put shared state on-chain only where it must be shared. Serve reads from an index. Prepare transactions for the client's signer. Record environment as demo or production in the interface.",
    implementation: "The sketch separates contract modules, an indexer, an application database, and a signing handoff. Reorg handling and wrong-network states are part of the read path. Admin actions emit events. A review of the contracts, if required, is a separate scoped activity and is not a certificate.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["A contract language for the chosen chain", "Indexer", "TypeScript application", "Client-held signing"],
    workflows: ["Prepare a transaction and show the payload before signing.", "See index lag instead of a silent stale balance.", "Pause a privileged function with a client-held role."],
    limitations: "The concept does not select a chain for the reader and does not claim mainnet safety.",
    security: "Production keys are not part of the concept's operating model. Tests are not an audit badge.",
    serviceLinks: [
      { href: "/solutions/digital-asset-infrastructure", label: "Digital asset infrastructure" },
      { href: "/services/blockchain-development", label: "Blockchain development" },
    ],
  },
  {
    slug: "forex-trading-terminal-prototype",
    title: "Forex trading terminal prototype",
    kind: "concept",
    kindLabel: "Internal demonstration",
    category: "Financial and Trading Technology",
    industry: "Fintech & trading",
    services: ["Financial & Trading Technology"],
    summary: "A labelled prototype of a dealing interface. It is not a live brokerage, not a customer deployment, and not evidence of production execution.",
    context: "Desks ask for a terminal before vendor access exists. A prototype can test layout and state handling. It cannot be described as a live price or a live fill.",
    constraints: "Alitroz is not a forex broker. The prototype uses simulated or delayed data and says so on the ticket. No client funds, no liquidity relationship, and no claim of execution quality.",
    role: "This is an internal demonstration, not a customer delivery. It shows how a workstation would separate data state from order state.",
    approach: "Design the blotter and the ticket around reject, disconnect, and stale. Do not blend sources into an unnamed price. Keep any simulator in a configuration that cannot be relabelled as production without a deliberate change.",
    implementation: "A web workstation renders a blotter from a fixture feed marked simulated. Order tickets record a local state machine and never call a live venue. The banner stays visible. Charts, if shown, use the same labelled feed.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["TypeScript", "A charting approach suited to a workstation", "Fixture market data", "Explicit simulated-order state"],
    workflows: ["See a stale price called stale.", "Submit an order and receive a labelled simulated reject.", "Confirm the banner still says the route is not live."],
    limitations: "There is no live venue, no licence, and no production order path in this prototype.",
    security: "The prototype stores no client trading credentials because it has no live route.",
    serviceLinks: [
      { href: "/services/trading-terminal-development", label: "Trading terminal development" },
      { href: "/solutions/financial-platform-technology", label: "Financial platform technology" },
    ],
  },
  {
    slug: "saas-administration-platform",
    title: "Multi-tenant SaaS administration platform",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Custom Software",
    industry: "SaaS & technology",
    services: ["Digital Product Engineering"],
    summary: "A concept for tenant administration, roles, entitlements, and an audited support view in a product that serves many organisations.",
    context: "SaaS products leak when tenant id is optional, and support becomes a shared password. The administration platform is the part customers never praise and will notice when it is wrong.",
    constraints: "The concept is not a client deployment. It does not claim a compliance certification. Billing, if shown, is a stub entitlement rather than a live merchant account.",
    role: "This is an engineering concept, not a customer delivery. The role would be product engineering of the tenant boundary and the operator console.",
    approach: "Every customer row carries a tenant. Support actions are audited. Entitlements are checks in the API, not flags painted on a screen.",
    implementation: "The model stores organisations, memberships, and an entitlement. Queries without a tenant fail. The operator console records who viewed a tenant and why. Isolation tests are the release gate. A billing vendor is represented only as an interface, not as Alitroz taking payment.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["TypeScript", "PostgreSQL", "Identity provider", "Audit log"],
    workflows: ["Invite a customer admin.", "Prove another tenant's record is unreachable.", "Record a support view."],
    limitations: "No live billing integration and no claim of a particular certification.",
    security: "Isolation is tested. Support access is audited. There is no shared admin password in the design.",
    serviceLinks: [
      { href: "/services/saas-development", label: "SaaS product development" },
      { href: "/industries/saas", label: "SaaS and technology" },
    ],
  },
  {
    slug: "realtime-data-dashboard",
    title: "Real-time data intelligence dashboard",
    kind: "concept",
    kindLabel: "Concept showcase",
    category: "Cloud and Data Engineering",
    industry: "Enterprise operations",
    services: ["Data Engineering & Analytics"],
    summary: "A concept dashboard that shows a partial operational figure, its lag, and the difference between a metric and an automated action.",
    context: "Operations meetings argue from screenshots. The underlying job failed overnight and the chart still looks confident.",
    constraints: "Sample figures in the concept are illustrative fixtures, not client performance. The concept does not claim real-time in the marketing sense. It shows lag.",
    role: "This is an engineering concept, not a customer delivery. The role would be the pipeline, the definition, and the view.",
    approach: "Bind each tile to a definition. If the consumer is late, say so. Do not let the dashboard send an order or a payment.",
    implementation: "A fixture stream feeds an aggregate marked partial until the window closes. The screen shows the lag. A stale threshold hides the number rather than presenting it as current. Alerts are described as messages to a person.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["TypeScript", "A stream or micro-batch job", "A curated metric view", "Fixture data"],
    workflows: ["Read a figure and its as-of time.", "See a tile withheld because the job is late.", "Follow a definition back to its inputs."],
    limitations: "Fixtures are not a production warehouse. No customer volumes are shown or implied.",
    security: "The concept does not include production credentials or a shared public link to private data.",
    serviceLinks: [
      { href: "/solutions/data-intelligence-platforms", label: "Data intelligence platforms" },
      { href: "/capabilities/analytics-dashboards", label: "Analytics dashboards" },
    ],
  },
  {
    slug: "deployment-observability-demonstrator",
    title: "Cloud-native deployment and observability demonstrator",
    kind: "concept",
    kindLabel: "Internal demonstration",
    category: "Cloud and Data Engineering",
    industry: "Enterprise operations",
    services: ["Cloud, DevOps & Reliability"],
    summary: "An internal demonstration of environment separation, a promotable artifact, and a small set of health signals. It is not a client's production estate.",
    context: "Teams ask for a platform diagram before they can say which environment may touch production, or which alert a person should answer.",
    constraints: "The demonstrator uses local or throwaway infrastructure. It does not claim an uptime target, a certification, or a recovered production incident.",
    role: "This is an internal demonstration, not a customer delivery. It shows the shape of a pipeline and a health view we would implement in a client's account.",
    approach: "Build once, promote by configuration, and alert only on a failed health check that has an action. Keep demo configuration from carrying anything that looks like a production secret.",
    implementation: "A sample service exposes a health endpoint. A pipeline builds an artifact and deploys it to a non-production target. A dashboard shows the health check and the deploy version. Rollback is a previous artifact, rehearsed against that target.",
    outcomes: "No customer outcomes are claimed. This showcase describes a proposed engineering approach, not a measured deployment.",
    technologies: ["CI pipeline", "Container or process deploy", "Health checks", "A minimal dashboard"],
    workflows: ["Promote one artifact.", "See a failed health check.", "Roll back to the previous artifact."],
    limitations: "Nothing here is a client region, a disaster-recovery proof, or a staffed on-call.",
    security: "No production credentials are used. The demonstrator is disposable.",
    serviceLinks: [
      { href: "/capabilities/devops-ci-cd", label: "DevOps and CI/CD" },
      { href: "/capabilities/observability-reliability", label: "Observability and reliability" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
