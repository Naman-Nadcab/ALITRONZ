export type Project = {
  slug: string;
  title: string;
  kind: "concept";
  kindLabel: string;
  industry: string;
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
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
