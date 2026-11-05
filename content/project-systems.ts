/**
 * System detail for each concept project: what the concept would consist of,
 * which parts are only simulated in the showcase, and which parts the client
 * would own. Nothing here claims a deployed customer system.
 */
export type ComponentStatus = "proposed" | "simulated" | "client-owned";

export type SystemComponent = { name: string; status: ComponentStatus; note: string };

export type SystemLayer = { name: string; items: string[] };

export type ProjectSystem = {
  layers: SystemLayer[];
  components: SystemComponent[];
  workflows: string[];
  limitations: string;
  security: string;
  serviceLinks: { href: string; label: string }[];
};

export const componentStatusLabel: Record<ComponentStatus, string> = {
  proposed: "Proposed design",
  simulated: "Simulated in this showcase",
  "client-owned": "Client-owned system",
};

export const projectSystems: Record<string, ProjectSystem> = {
  "operations-knowledge-assistant": {
    layers: [
      { name: "Sources", items: ["Procedure documents", "Ticket exports", "Shared-drive folders"] },
      { name: "Ingestion", items: ["Scheduled sync", "Chunking with access labels", "Retrieval index"] },
      { name: "Application", items: ["Question service", "Permission filter", "Model adapter", "Tool allow-list"] },
      { name: "People and records", items: ["Cited answer", "Proposed action", "Approval by a person", "Audit log"] },
    ],
    components: [
      { name: "Assistant interface with citations", status: "simulated", note: "Shown with fixture questions and answers in the concept interface." },
      { name: "Ingestion and index with access labels", status: "proposed", note: "Scheduled sync from the client's sources; each chunk carries who may read it." },
      { name: "Permission-filtered retrieval", status: "proposed", note: "Filter before the model sees text, using the signed-in user's identity." },
      { name: "Tool allow-list and approval step", status: "proposed", note: "Actions are drafted, never executed without a named approver." },
      { name: "Ticketing, document stores, identity provider", status: "client-owned", note: "Stay where they are; the assistant reads through their APIs." },
      { name: "Model host", status: "client-owned", note: "Chosen for the client's data-retention constraints, behind an adapter." },
    ],
    workflows: [
      "Ask a procedure question and open the cited passage.",
      "See a refusal when the corpus has no evidence for the question.",
      "Propose a ticket update and watch it wait for a person's approval.",
    ],
    limitations:
      "The showcase uses fixture documents and questions. No accuracy figure is claimed, and the concept does not cover every repository a business holds.",
    security:
      "Access rules travel with each indexed chunk. Secrets are never placed in prompts. Logs record question, sources and the approval decision rather than a copy of the corpus.",
    serviceLinks: [
      { href: "/services/rag-knowledge-systems", label: "RAG knowledge systems" },
      { href: "/services/ai-agent-development", label: "AI agent development" },
      { href: "/solutions/enterprise-ai-automation", label: "Enterprise AI automation" },
    ],
  },
  "client-portal-and-mobile": {
    layers: [
      { name: "Clients", items: ["Customer web portal", "Staff web console", "Mobile companion app"] },
      { name: "API", items: ["Versioned REST API", "Permission checks per role", "Documented contracts"] },
      { name: "Services", items: ["Accounts and roles", "Cases and documents", "Notifications"] },
      { name: "Data and identity", items: ["PostgreSQL", "Object storage (referenced files)", "Client's identity provider"] },
    ],
    components: [
      { name: "Customer portal screens", status: "simulated", note: "Account, case list and document views drawn with sample records." },
      { name: "Mobile companion", status: "simulated", note: "The same API surface shown in a phone layout; no store release is implied." },
      { name: "Versioned API with permission tests", status: "proposed", note: "Tests prove one customer cannot read another and roles cannot exceed their grants." },
      { name: "Account and role model", status: "proposed", note: "One model shared by web and mobile so behaviour does not diverge." },
      { name: "Identity provider and file storage", status: "client-owned", note: "Single sign-on where one exists; files referenced, not copied." },
    ],
    workflows: [
      "Sign in with the organisation's identity provider and see only your own records.",
      "Upload a document from the phone and find it in the web portal immediately.",
      "A staff role attempts an action outside its grant and is refused with an audit entry.",
    ],
    limitations:
      "The concept shows a first release with a small feature set. It does not include a live app-store build, payment handling or a specific design system for a named client.",
    security:
      "Authorization is enforced in the API, not the interface. Sessions follow the identity provider's policy. File access is signed and time-limited.",
    serviceLinks: [
      { href: "/services/web-application-development", label: "Web application development" },
      { href: "/services/mobile-app-development", label: "Mobile app development" },
      { href: "/services/api-integration", label: "API integration" },
    ],
  },
  "digital-asset-operations-console": {
    layers: [
      { name: "People", items: ["Operations staff", "Approvers", "Client-held wallets"] },
      { name: "Console", items: ["Balances and events", "Transaction preparation", "Admin function list", "Review queue"] },
      { name: "Services", items: ["Indexing service", "Transaction builder", "Permission checks", "Audit records"] },
      { name: "Chain and storage", items: ["Node or indexer API", "Smart contracts", "PostgreSQL", "Test networks labelled"] },
    ],
    components: [
      { name: "Operations console", status: "simulated", note: "Balances, pending operations and a prepared transaction shown with fixture data on a labelled test network." },
      { name: "Indexing service with lag display", status: "proposed", note: "Reads come from an index; the screen shows how far behind the chain it is." },
      { name: "Unsigned transaction builder", status: "proposed", note: "Builds and decodes the payload; signing happens in the client's wallet." },
      { name: "Permissioned admin functions", status: "proposed", note: "Every privileged function is listed, role-gated and logged." },
      { name: "Wallets, keys, custody arrangements", status: "client-owned", note: "The console never stores a private key and is not a custodian." },
    ],
    workflows: [
      "Prepare a transfer, review the decoded payload and hand it to a wallet to sign.",
      "See a balance marked stale because the index is behind the chain.",
      "Pause a contract function using a role the client holds, with the event recorded.",
    ],
    limitations:
      "The showcase runs on fixture data for a labelled test network. It does not choose a chain, audit a contract or operate a trading venue.",
    security:
      "No private keys in the application. Wrong-network and reorg states are explicit interface states. Admin actions emit events that the audit view reads back.",
    serviceLinks: [
      { href: "/services/dapp-development", label: "dApp development" },
      { href: "/services/blockchain-integration", label: "Blockchain integration" },
      { href: "/solutions/digital-asset-infrastructure", label: "Digital asset infrastructure" },
    ],
  },
  "multi-market-trading-workstation": {
    layers: [
      { name: "Desk", items: ["Charts", "Watchlist and depth", "Order ticket", "Blotter and positions"] },
      { name: "Workstation services", items: ["Normalised market-data stream", "Order state machine", "Reconciliation records"] },
      { name: "Adapters", items: ["MetaTrader bridge", "Liquidity-provider API", "Other licensed trading APIs"] },
      { name: "Client's venues and records", items: ["Permitted execution routes", "Back-office system", "Demonstration vs production configuration"] },
    ],
    components: [
      { name: "Workstation interface", status: "simulated", note: "Charts, ticket and blotter rendered from a fixture feed labelled simulated." },
      { name: "Market-data normalisation", status: "proposed", note: "One internal stream regardless of vendor, with price age shown on screen." },
      { name: "Order state machine and audit trail", status: "proposed", note: "Request, response and later fill recorded so the back office can reconcile." },
      { name: "Vendor adapters", status: "proposed", note: "MetaTrader, liquidity-provider or other APIs isolated behind one interface." },
      { name: "Trading licences, venues, liquidity", status: "client-owned", note: "The firm holds the regulated activity; the software connects to what it is permitted to use." },
    ],
    workflows: [
      "Watch a price age past its threshold and see the ticket disable itself.",
      "Submit an order, receive a labelled simulated reject and see it in the blotter.",
      "Switch between demonstration and production configuration with the banner changing accordingly.",
    ],
    limitations:
      "No live venue, liquidity or execution is part of the showcase. Prices and fills are fixtures. The concept is not evidence of production trading.",
    security:
      "Credentials for a client's venues are not stored in the concept. Production and demonstration configuration are separate and visibly labelled.",
    serviceLinks: [
      { href: "/services/trading-terminal-development", label: "Trading terminal development" },
      { href: "/services/mt4-mt5-integration", label: "MT4 / MT5 integration" },
      { href: "/services/order-management-systems", label: "Order management systems" },
    ],
  },
  "enterprise-ai-knowledge-copilot": {
    layers: [
      { name: "Host application", items: ["Embedded copilot panel", "Signed-in user identity"] },
      { name: "Retrieval", items: ["Tenant-scoped index", "Access-label filter", "Citation builder"] },
      { name: "Model and actions", items: ["Replaceable model adapter", "Draft proposals", "Host API write-back"] },
      { name: "Governance", items: ["Evaluation set", "Question and source logs", "Source enable/disable"] },
    ],
    components: [
      { name: "Copilot panel with citations", status: "simulated", note: "Shown inside a sample host screen with fixture records." },
      { name: "Tenant-scoped retrieval", status: "proposed", note: "Chunks carry tenant and access labels; filtering happens before the model call." },
      { name: "Draft-only write-back", status: "proposed", note: "Changes are proposals the host application's API must accept." },
      { name: "Evaluation set with unanswerable questions", status: "proposed", note: "Measures refusals as well as answers." },
      { name: "System of record and model host", status: "client-owned", note: "Records stay in the host; the model host is chosen for retention terms." },
    ],
    workflows: [
      "Ask a procedure question and open the cited passage.",
      "Draft a ticket note and leave it unsaved.",
      "Disable a source without taking the copilot offline.",
    ],
    limitations: "The concept does not cover every company repository, and it does not claim a measured accuracy.",
    security: "Cross-tenant context is a defect. Secrets are not placed in prompts. The model host is selected for retention, not convenience.",
    serviceLinks: [
      { href: "/services/enterprise-ai-copilots", label: "Enterprise AI copilots" },
      { href: "/solutions/enterprise-ai-automation", label: "Enterprise AI automation" },
    ],
  },
  "digital-asset-platform-architecture": {
    layers: [
      { name: "Interfaces", items: ["Staff tools", "Customer application", "Environment banner (demo / production)"] },
      { name: "Application", items: ["Read model from index", "Transaction preparation", "Admin events"] },
      { name: "Chain services", items: ["Contract modules", "Indexer with reorg handling", "Signing hand-off"] },
      { name: "Ownership", items: ["Client-held keys", "Upgrade rights with the client", "Separate contract review"] },
    ],
    components: [
      { name: "Architecture sketch", status: "simulated", note: "Diagram and sample screens only; no deployed contracts." },
      { name: "Contract modules", status: "proposed", note: "Shared state on-chain only where it must be shared." },
      { name: "Indexer and read path", status: "proposed", note: "Reorg and wrong-network states are part of the design." },
      { name: "Signing and key management", status: "client-owned", note: "Alitroz does not hold keys or operate a venue." },
    ],
    workflows: [
      "Prepare a transaction and show the payload before signing.",
      "See index lag instead of a silent stale balance.",
      "Pause a privileged function with a client-held role.",
    ],
    limitations: "The concept does not select a chain for the reader and does not claim mainnet safety.",
    security: "Production keys are not part of the concept's operating model. Tests are not an audit badge.",
    serviceLinks: [
      { href: "/solutions/digital-asset-infrastructure", label: "Digital asset infrastructure" },
      { href: "/services/blockchain-development", label: "Blockchain development" },
      { href: "/services/smart-contract-development", label: "Smart contract development" },
    ],
  },
  "forex-trading-terminal-prototype": {
    layers: [
      { name: "Dealing screen", items: ["Watchlist", "Chart", "Order ticket", "Blotter and positions"] },
      { name: "Prototype services", items: ["Fixture price feed", "Local order state machine", "Simulated-reject rules"] },
      { name: "Labels", items: ["Persistent simulated banner", "Price-age indicator", "No live route"] },
      { name: "What is absent", items: ["Venue connection", "Liquidity", "Client credentials"] },
    ],
    components: [
      { name: "Dealing interface", status: "simulated", note: "Every price, fill and reject comes from fixtures and says so." },
      { name: "Order state machine", status: "simulated", note: "Working, rejected and filled states handled locally." },
      { name: "Live execution path", status: "proposed", note: "Would be built against a venue the client is licensed to use." },
      { name: "Licences, venue and liquidity", status: "client-owned", note: "Alitroz is not a broker and operates no venue." },
    ],
    workflows: [
      "See a stale price called stale.",
      "Submit an order and receive a labelled simulated reject.",
      "Confirm the banner still says the route is not live.",
    ],
    limitations: "There is no live venue, no licence, and no production order path in this prototype.",
    security: "The prototype stores no client trading credentials because it has no live route.",
    serviceLinks: [
      { href: "/services/forex-platform-development", label: "Forex platform development" },
      { href: "/services/trading-terminal-development", label: "Trading terminal development" },
      { href: "/services/liquidity-provider-integration", label: "Liquidity provider integration" },
    ],
  },
  "saas-administration-platform": {
    layers: [
      { name: "Consoles", items: ["Customer admin", "Operator support view", "Member invitations"] },
      { name: "Tenancy", items: ["Organisations", "Memberships and roles", "Entitlements"] },
      { name: "Controls", items: ["Tenant-required queries", "Isolation tests as release gate", "Support access audit"] },
      { name: "Integrations", items: ["Identity provider", "Billing vendor (interface only)", "Audit log store"] },
    ],
    components: [
      { name: "Admin and support consoles", status: "simulated", note: "Shown with sample organisations and an audited support view." },
      { name: "Tenancy model", status: "proposed", note: "Queries without a tenant fail by construction." },
      { name: "Isolation test suite", status: "proposed", note: "Proves another tenant's record is unreachable before each release." },
      { name: "Identity provider and billing", status: "client-owned", note: "Billing is represented as an interface; Alitroz does not take payment." },
    ],
    workflows: ["Invite a customer admin.", "Prove another tenant's record is unreachable.", "Record a support view."],
    limitations: "No live billing integration and no claim of a particular certification.",
    security: "Isolation is tested. Support access is audited. There is no shared admin password in the design.",
    serviceLinks: [
      { href: "/services/saas-development", label: "SaaS development" },
      { href: "/capabilities/identity-access-management", label: "Identity and access management" },
    ],
  },
  "realtime-data-dashboard": {
    layers: [
      { name: "Sources", items: ["Event stream", "Operational database", "Reference data"] },
      { name: "Processing", items: ["Stream or micro-batch job", "Windowed aggregates", "Lateness tracking"] },
      { name: "Serving", items: ["Curated metric view", "As-of timestamps", "Stale threshold"] },
      { name: "Consumers", items: ["Dashboard tiles", "Alerts to a person", "Definition lineage"] },
    ],
    components: [
      { name: "Dashboard", status: "simulated", note: "Tiles, lag indicator and a withheld figure drawn from fixture data." },
      { name: "Windowed aggregation with partial flag", status: "proposed", note: "A figure is marked partial until its window closes." },
      { name: "Stale-threshold rule", status: "proposed", note: "Hides a number rather than presenting it as current." },
      { name: "Source systems and alert channels", status: "client-owned", note: "Alerts are messages to a person, not automated actions." },
    ],
    workflows: ["Read a figure and its as-of time.", "See a tile withheld because the job is late.", "Follow a definition back to its inputs."],
    limitations: "Fixtures are not a production warehouse. No customer volumes are shown or implied.",
    security: "The concept does not include production credentials or a shared public link to private data.",
    serviceLinks: [
      { href: "/capabilities/real-time-data", label: "Real-time data processing" },
      { href: "/capabilities/analytics-dashboards", label: "Analytics dashboards" },
      { href: "/solutions/data-intelligence-platforms", label: "Data intelligence platforms" },
    ],
  },
  "deployment-observability-demonstrator": {
    layers: [
      { name: "Source", items: ["Sample service", "Health endpoint", "Version stamp"] },
      { name: "Pipeline", items: ["Build once", "Promotable artifact", "Deploy to non-production target"] },
      { name: "Runtime", items: ["Container or process", "Health checks", "Rehearsed rollback"] },
      { name: "Signals", items: ["Deploy version", "Health status", "Minimal dashboard"] },
    ],
    components: [
      { name: "Pipeline and deploy target", status: "simulated", note: "An internal demonstration target, not a client estate." },
      { name: "Health dashboard", status: "simulated", note: "Shows the health check and the deployed version." },
      { name: "Rollback rehearsal", status: "proposed", note: "Rollback is a previous artifact, exercised against the same target." },
      { name: "Production environment and on-call", status: "client-owned", note: "The demonstrator stops before any production estate." },
    ],
    workflows: ["Promote an artifact from build to the demonstration target.", "Watch the health signal change after a deliberate failure.", "Roll back to the previous artifact and confirm the version stamp."],
    limitations: "The demonstrator is internal. It shows a pattern, not a client's production reliability.",
    security: "No production credentials are present. Deploy permissions are scoped to the demonstration target.",
    serviceLinks: [
      { href: "/capabilities/devops-ci-cd", label: "DevOps and CI/CD" },
      { href: "/capabilities/observability-reliability", label: "Observability and reliability" },
      { href: "/capabilities/kubernetes-platforms", label: "Kubernetes platforms" },
    ],
  },
};
