export type Offering = {
  slug: string;
  path: string;
  kind: "division" | "capability";
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
  result: string;
  outcomes: string[];
  problemTitle: string;
  problem: string[];
  builds: { title: string; text: string }[];
  deliverables: { title: string; text: string }[];
  architecture: string[];
  architecturePoints: string[];
  integrations: string[];
  integrationNote: string;
  process: { title: string; text: string }[];
  assurance: string[];
  boundary?: string;
  demonstrator: { title: string; text: string; href: string };
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const offerings: Offering[] = [
  {
    slug: "ai-automation",
    path: "/services/ai-automation",
    kind: "division",
    title: "AI & Intelligent Automation",
    eyebrow: "Service division",
    headline: "AI systems that do useful work inside the business.",
    summary:
      "We design and build agents, copilots, knowledge systems, and document workflows that sit inside real operations, with evaluation, monitoring, and a person in the loop where the cost of a mistake is high.",
    result: "Software that can retrieve, draft, and act on company knowledge without pretending the model is the system of record.",
    outcomes: [
      "A defined boundary between answering a question and changing a business record.",
      "Answers and extractions that can be traced back to a source.",
      "A deployment the team can monitor, correct, and switch off.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "Teams already have the documents, tickets, and operational knowledge. What they lack is a system that can use that material under the same permissions as the people who own it.",
      "A chat window beside the business is easy to demonstrate and hard to trust. The useful version knows which source is current, when it should refuse, and which actions require a person.",
    ],
    builds: [
      {
        title: "AI agents and workflow automation",
        text: "Agents that follow an allow-list of tools, with approvals on the steps that change data or spend money.",
      },
      {
        title: "Enterprise copilots",
        text: "Assistants embedded in the applications staff already use, grounded in the tenant's own records rather than a public prompt.",
      },
      {
        title: "Retrieval and knowledge systems",
        text: "Retrieval-augmented generation over an approved corpus, with citations and a refusal when the evidence is thin.",
      },
      {
        title: "Document intelligence",
        text: "Intake, classification, extraction, and review flows for the documents a process already depends on.",
      },
      {
        title: "Business application integrations",
        text: "Connections to the systems of record so the assistant reads and, where allowed, proposes changes in the tool the team uses.",
      },
      {
        title: "Predictive analytics, where it fits",
        text: "Models that support a decision the business already makes, when the data and the cost of an error justify them. They are decision support, not a promise of accuracy, and they are not investment advice.",
      },
      {
        title: "Deployment, testing, monitoring, and governance",
        text: "Evaluation sets, access control, logging, and a way to see quality after release. Governance is part of the build, not a slide at the end.",
      },
    ],
    deliverables: [
      { title: "System boundary", text: "A written description of what the assistant may read, what it may propose, and what a person must confirm." },
      { title: "Working product", text: "The application, the retrieval pipeline, and the integrations agreed in the scope." },
      { title: "Evaluation set", text: "A collection of real examples used to judge answers and extractions before and after release." },
      { title: "Operational notes", text: "How the system is deployed, monitored, corrected, and limited." },
    ],
    architecture: [
      "A typical system has a source layer, an ingestion and permission layer, a retrieval index, a model adapter, and an application that decides what the user is allowed to do. The model is replaceable. The business rules are not hidden inside a prompt.",
      "Actions that change another system go through a tool interface with an allow-list and, where the impact is material, a human confirmation. Logs keep the question, the sources, and the decision.",
    ],
    architecturePoints: [
      "Permissions travel with the content, so retrieval does not become a back door.",
      "The model provider is an adapter chosen for the client's data constraints.",
      "Evaluation runs beside the product, using examples the business recognises.",
      "High-impact actions stay reviewable. Autonomy is a decision, not a default.",
    ],
    integrations: [
      "Document stores and knowledge bases",
      "Ticketing and service tools",
      "CRM and operational systems of record",
      "Warehouses and analytical stores",
      "Identity providers",
    ],
    integrationNote:
      "The exact tools are chosen for the engagement. This list describes the kinds of systems we connect. It is not a claim of a partnership or a certified integration.",
    process: [
      { title: "Find the decision", text: "Name the job the system should help with, the sources it may use, and the mistakes the business cannot absorb." },
      { title: "Design the boundary", text: "Decide what is retrieval, what is a draft, and what is an action. Write down the refusals." },
      { title: "Build and connect", text: "Implement the application, the index, and the integrations. Keep the model behind an adapter." },
      { title: "Evaluate", text: "Run the agreed examples. Fix the failures that matter. Record the ones that remain." },
      { title: "Deploy and watch", text: "Release with logging, access control, and a person responsible for reviewing quality." },
      { title: "Improve", text: "Use real questions to extend the corpus and the evaluation set. Do not widen autonomy by accident." },
    ],
    assurance: [
      "We test retrieval, permissions, and tool calls. We do not promise that a model will always be right.",
      "Where an error is costly, the design keeps a person in the decision.",
      "Data handling follows the hosting choice agreed with the client. We do not assume that a prompt can be sent to any public model.",
    ],
    boundary:
      "Predictive and generative features are software. They are not investment advice, a regulated decision, or a guarantee of accuracy.",
    demonstrator: {
      title: "Operations knowledge assistant",
      text: "A concept for a cited assistant with a hard line between answering and taking action.",
      href: "/work/operations-knowledge-assistant",
    },
    faqs: [
      {
        question: "Do you train foundation models?",
        answer:
          "The usual engagement integrates and adapts models for a product. Training a foundation model from scratch is a different undertaking and is not assumed.",
      },
      {
        question: "Will our data be used to train a public model?",
        answer:
          "That depends on the provider and the contract. We design the hosting and retention path for the constraint you set, and we do not treat a public chat tool as the default for private records.",
      },
      {
        question: "Can the assistant change records in our systems?",
        answer:
          "Only through tools that are explicitly allowed, and only with the approval the design requires. Reading and acting are separate decisions.",
      },
      {
        question: "How do you know it works?",
        answer:
          "With an evaluation set drawn from the real task, plus checks on permissions and refusals. A polished demo is not the measure.",
      },
    ],
    related: [
      { href: "/capabilities/data-engineering", label: "Data Engineering & Analytics" },
      { href: "/capabilities/cybersecurity", label: "Cybersecurity & Application Security" },
      { href: "/insights/scope-an-enterprise-assistant", label: "Scoping an enterprise assistant" },
    ],
  },
  {
    slug: "digital-product-engineering",
    path: "/services/digital-product-engineering",
    kind: "division",
    title: "Digital Product Engineering",
    eyebrow: "Service division",
    headline: "Websites, applications, and platforms built to be operated.",
    summary:
      "We design and engineer corporate websites, web applications, mobile applications, SaaS platforms, and custom enterprise software, including the APIs, integrations, and care that keep them usable.",
    result: "A product people can use, with a codebase and a release path the business can continue.",
    outcomes: [
      "A website or application that matches the job it was commissioned to do.",
      "Interfaces and APIs that other systems can rely on.",
      "A handover that includes how the software is tested, deployed, and changed.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "The product exists as a deck, a fragile legacy system, or a set of tools that no longer fit the operation. Customers and staff feel that gap first.",
      "Websites, web apps, and mobile apps are often split across vendors until nobody owns the whole experience. We treat them as one engineering problem when they serve one product.",
    ],
    builds: [
      {
        title: "Corporate websites and web experiences",
        text: "Marketing and corporate sites with a clear structure, fast pages, and a content model the team can actually edit.",
      },
      {
        title: "Web applications",
        text: "Authenticated products for customers and staff, including the permissions and states a brochure site never has to face.",
      },
      {
        title: "Mobile applications",
        text: "Mobile apps where the product is used away from a desk. Native or cross-platform is a constraint of the product, not a default slogan.",
      },
      {
        title: "SaaS platforms",
        text: "Multi-tenant product foundations: accounts, billing boundaries where required, admin tools, and the APIs around them.",
      },
      {
        title: "Custom enterprise software",
        text: "Internal systems shaped around a specific operation, rather than a generic tool bent until it almost fits.",
      },
      {
        title: "Backend systems and APIs",
        text: "Services, data models, and interfaces that the website, the mobile app, and other teams can share.",
      },
      {
        title: "UI and UX design, and prototyping",
        text: "Interface design and prototypes used to decide the product before the expensive parts of the build.",
      },
      {
        title: "Legacy modernization",
        text: "A path from software that is costly to change toward a system that can be tested and released with less risk.",
      },
      {
        title: "Integrations, testing, and maintenance",
        text: "Connections to the surrounding stack, tests around the behaviour that matters, and ongoing engineering after launch when that is part of the engagement.",
      },
    ],
    deliverables: [
      { title: "Product definition", text: "The users, the tasks, and the release that is actually in scope." },
      { title: "Design and prototype", text: "Interface direction that can be reviewed against the tasks, not only against a visual preference." },
      { title: "Software", text: "Web, mobile, and service code in the client's repository, with the environments required to run it." },
      { title: "Handover", text: "How to develop, test, deploy, and continue the product." },
    ],
    architecture: [
      "We separate the experience, the application services, and the integrations. The website and the mobile app should not each invent a different version of a business rule.",
      "Identity, data, and external systems sit behind interfaces. That is what makes a later change possible without rewriting the product.",
    ],
    architecturePoints: [
      "One system of record for the objects the product manages.",
      "Shared APIs for web and mobile, unless a constraint forces a difference.",
      "Environments that let the team review permissions before production.",
      "A content model for marketing sites that editors can use without a deployment for every sentence.",
    ],
    integrations: [
      "Identity providers",
      "Payments, where the client already has a provider",
      "CRM, ERP, and support tools",
      "Analytics the client has chosen",
      "Existing internal APIs",
    ],
    integrationNote:
      "Integrations are scoped to the systems the product must join. We do not imply a preferred vendor partnership.",
    process: [
      { title: "Define the release", text: "Agree the tasks the first version must complete, on the web, on mobile, or both." },
      { title: "Design the experience", text: "Prototype the core flows and test them against the people who will use them." },
      { title: "Build the system", text: "Implement clients, services, and integrations in increments that can be reviewed." },
      { title: "Verify", text: "Test the behaviour, the permissions, and the integrations the release depends on." },
      { title: "Release", text: "Deploy to the agreed environment with a rollback path." },
      { title: "Continue", text: "Maintain and extend the product when that is part of the engagement." },
    ],
    assurance: [
      "Testing covers the agreed behaviour and the permission boundaries. It is not a claim that every future defect has been prevented.",
      "Modernization keeps a record of what must continue to work while the software changes.",
      "Design and engineering stay in one conversation so the interface is not a picture of a system that was never built.",
    ],
    demonstrator: {
      title: "Client portal and mobile companion",
      text: "A concept for a web portal and a mobile app that share one API and one account model.",
      href: "/work/client-portal-and-mobile",
    },
    faqs: [
      {
        question: "Do you build websites, or only complex applications?",
        answer:
          "Both. Corporate websites and web experiences are part of this division, as are web applications, mobile applications, and larger platforms.",
      },
      {
        question: "Can you build mobile apps?",
        answer:
          "Yes. We choose a native or cross-platform approach from the product constraints: offline use, device features, and the team that will maintain it.",
      },
      {
        question: "Can you modernize a system you did not build?",
        answer:
          "Yes, after discovery. We need access to the current system and an agreement on which behaviour must survive the change.",
      },
      {
        question: "Do you stay after launch?",
        answer:
          "When the engagement includes it. Maintenance is scoped. It is not assumed, and it is not described as an unlimited retainer.",
      },
    ],
    related: [
      { href: "/industries/saas-enterprise", label: "SaaS & Enterprise" },
      { href: "/capabilities/cloud-devops", label: "Cloud, DevOps & Reliability" },
      { href: "/company/our-approach", label: "Our approach" },
    ],
  },
  {
    slug: "web3-blockchain",
    path: "/services/web3-blockchain",
    kind: "division",
    title: "Web3 & Blockchain Engineering",
    eyebrow: "Service division",
    headline: "On-chain products with an operational life after launch.",
    summary:
      "We engineer smart contracts, decentralized applications, wallet integrations, tokenization software, and the indexing and operational tools around them. We build software for clients. We do not operate an exchange or hold their assets.",
    result: "A blockchain product the team can test, explain, and operate, with signing and custody left where they belong.",
    outcomes: [
      "Contracts and applications scoped to a specific chain and a specific job.",
      "A visible approval path before a sensitive transaction is signed.",
      "Indexing and operational software that shows when chain data is behind.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "Teams are asked to ship a token, a protocol feature, or a decentralized application with the hard parts left unnamed: admin keys, upgrades, indexing, and what happens when a wallet step fails.",
      "Security is often collapsed into a single word. Development, testing, remediation, and an independent audit are different pieces of work. Treating them as one promise makes the product less safe, not more.",
    ],
    builds: [
      {
        title: "Smart contracts and decentralized applications",
        text: "Contract and application development for the chain the product uses, with tests around the behaviour and the admin paths.",
      },
      {
        title: "Wallet integrations",
        text: "Connection and signing flows that keep keys in the user's or the client's wallet. We do not take custody as part of an integration.",
      },
      {
        title: "DeFi application engineering",
        text: "Application software for decentralized-finance products the client is responsible for operating. This is engineering, not a yield product offered by Alitroz.",
      },
      {
        title: "Tokenization software",
        text: "The applications and contracts used to represent and administer an asset the client is tokenizing, within the design the client is accountable for.",
      },
      {
        title: "Blockchain APIs and indexing",
        text: "Services that read chain state and events so a product can show accurate information, including when the index lags.",
      },
      {
        title: "Cross-chain integrations",
        text: "Connections between chains where the product requires them, designed as explicit trust boundaries rather than invisible bridges.",
      },
      {
        title: "Exchange and digital-asset infrastructure",
        text: "Software for clients who operate exchange or digital-asset infrastructure: consoles, APIs, and operational tools. Alitroz does not itself operate that exchange.",
      },
      {
        title: "Testing, secure development, and remediation",
        text: "Secure development practices, test suites, and fixes for issues found in authorized reviews. This is not a substitute for an independent audit, and it is not a guarantee.",
      },
    ],
    deliverables: [
      { title: "Technical design", text: "What lives on-chain, what lives off-chain, and who holds upgrade and signing authority." },
      { title: "Application and contracts", text: "The software in scope, with tests that match the design." },
      { title: "Operational console or API", text: "The tools the team uses to prepare, review, and observe activity." },
      { title: "Limitations", text: "A written note of what was tested, what was not, and whether an independent audit is still required." },
    ],
    architecture: [
      "We split state that must be enforced by a contract from state that belongs in an ordinary application. Indexers inform the interface. They do not become the source of truth for a balance the chain already holds.",
      "Signing stays outside our servers. The application prepares a transaction, shows the human what it will do, and records the result after the client signs.",
    ],
    architecturePoints: [
      "Admin and upgrade paths are named in the design, not discovered after launch.",
      "Wallet integration handles signing. It does not store keys.",
      "Index lag is shown in the product.",
      "Cross-chain steps are isolated so a failure is visible.",
    ],
    integrations: [
      "Wallet providers chosen by the product",
      "Node and indexing APIs",
      "The client's existing identity and operations tools",
      "Off-chain databases for product state that is not a chain balance",
    ],
    integrationNote:
      "Chain, wallet, and indexing choices follow the product. Listing a category here is not an endorsement or a claim that every network is in scope.",
    process: [
      { title: "Define the asset and the action", text: "Agree what the software is allowed to do, and what remains the client's legal and operational responsibility." },
      { title: "Separate on-chain and off-chain", text: "Place enforcement, data, and user flows where they can be tested and changed appropriately." },
      { title: "Implement", text: "Build the contracts, applications, and integrations in the scope." },
      { title: "Test", text: "Exercise the expected paths, the admin paths, and the failure paths in a local or test environment." },
      { title: "Review the residual risk", text: "State what an independent audit still needs to cover. Remediate issues that are in scope and authorized." },
      { title: "Hand over operation", text: "Leave keys, runbooks, and upgrade responsibility with the client." },
    ],
    assurance: [
      "Development includes testing and secure coding practices. It does not certify a contract.",
      "An independent audit is a different engagement. We can help prepare for one and remediate findings when we are authorized to change the code.",
      "We will not describe a testnet or a local chain as a production launch.",
    ],
    boundary:
      "Alitroz builds software. Alitroz does not operate a crypto exchange, hold client assets, match trades, or give investment advice. Smart-contract development and testing are not a guarantee of security.",
    demonstrator: {
      title: "Digital asset operations console",
      text: "A concept for preparing and reviewing on-chain actions without taking custody.",
      href: "/work/digital-asset-operations-console",
    },
    faqs: [
      {
        question: "Are you an exchange or a custodian?",
        answer:
          "No. We engineer software for companies that work with digital assets. We do not operate an exchange, hold client assets, or provide investment advice.",
      },
      {
        question: "Do you audit smart contracts?",
        answer:
          "We develop, test, and remediate. An independent security audit is a separate kind of work. Where the risk calls for an audit, we say so, and we do not replace the auditor.",
      },
      {
        question: "Can you build DeFi or tokenization software?",
        answer:
          "Yes, as application and contract engineering for the client who is responsible for the product. Alitroz is not offering the financial product itself.",
      },
      {
        question: "Can you guarantee a contract is secure?",
        answer:
          "No. Testing reduces risk and finds defects. It cannot promise that no defect remains.",
      },
    ],
    related: [
      { href: "/industries/digital-assets-web3", label: "Digital Assets & Web3" },
      { href: "/capabilities/cybersecurity", label: "Cybersecurity & Application Security" },
      { href: "/insights/blockchain-products-that-can-change", label: "Products that can still be changed" },
    ],
  },
  {
    slug: "financial-trading-technology",
    path: "/services/financial-trading-technology",
    kind: "division",
    title: "Financial & Trading Technology",
    eyebrow: "Service division",
    headline: "Trading software for firms that operate the business.",
    summary:
      "We build trading terminals, market-data integrations, broker operations software, and the APIs around them. Alitroz is the technology partner. The client is the broker, venue, or trading firm.",
    result: "Interfaces and integrations a trading business can operate, with live, delayed, and simulated states kept distinct.",
    outcomes: [
      "A workstation or back-office system shaped around the firm's process.",
      "Integrations that use only the vendor access the client is permitted to use.",
      "Records that support reconciliation, reporting, and review.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "Trading businesses accumulate terminals, spreadsheets, and vendor portals that do not share a picture of an order. Risk and the back office then reconstruct the day by hand.",
      "A new interface does not create a licence, a liquidity relationship, or a market-data entitlement. Those belong to the client. The software has to respect them.",
    ],
    builds: [
      {
        title: "Trading terminals and interfaces",
        text: "Dealer and trader workstations, including the layout of orders, positions, and exceptions the desk actually uses.",
      },
      {
        title: "Charting and market-data integrations",
        text: "Charts and data paths connected to feeds the client is licensed to use, with lag and session state visible.",
      },
      {
        title: "MetaTrader 4 and 5 integrations",
        text: "Integrations where the client has the account, permissions, and vendor access required. We do not bypass platform controls.",
      },
      {
        title: "Liquidity-provider connectivity",
        text: "Adapters to liquidity providers the client already has a relationship with, using the protocol and credentials they provide.",
      },
      {
        title: "Broker CRM and back-office software",
        text: "Client records, operational workflows, and the tools a broker's own staff use. The software does not make Alitroz the broker.",
      },
      {
        title: "Order management",
        text: "Order state, routing to the client's permitted venues or providers, and a record of what was sent and what came back.",
      },
      {
        title: "Risk controls, reporting, and reconciliation",
        text: "Checks, reports, and reconciliation views that help the firm explain positions and breaks. They support the firm's controls. They do not replace them.",
      },
      {
        title: "Trading APIs and automation",
        text: "APIs and automated workflows around the firm's own infrastructure, with the same permission and audit expectations as the interface.",
      },
    ],
    deliverables: [
      { title: "Workflow map", text: "The desks, the vendors, and the records the software must join." },
      { title: "Interface and services", text: "The terminal, back-office tools, or APIs in the scope." },
      { title: "Adapter layer", text: "Isolated connections to market data, MetaTrader, liquidity providers, or other permitted systems." },
      { title: "Environment split", text: "Demonstration and production configuration that cannot be mistaken for each other." },
    ],
    architecture: [
      "The interface talks to application services. Those services talk to vendor adapters. A demonstration feed and a production route are different configurations, and the interface says which one it is using.",
      "Order and fill records are stored so the back office can reconcile. Risk checks in the application are additional to any checks the venue or provider already performs.",
    ],
    architecturePoints: [
      "Vendor access is a client responsibility and a precondition, not something the build invents.",
      "Simulated execution is labelled and is not described as a live venue.",
      "Forex, CFD, and other instruments are handled as the client's products. Alitroz supplies the software.",
      "Audit fields cover who sent an instruction and what the downstream system returned.",
    ],
    integrations: [
      "Market-data vendors the client licenses",
      "MetaTrader 4 and MetaTrader 5, where access exists",
      "Liquidity-provider APIs",
      "The client's CRM and back-office systems",
      "FIX or vendor-specific protocols where the specification and permission exist",
    ],
    integrationNote:
      "We integrate with systems the client can legally and contractually use. A technology name on this page is not a claim of a vendor partnership or of unrestricted access.",
    process: [
      { title: "Confirm the operating model", text: "Identify who is the broker or venue, which licences sit with the client, and which vendors are in play." },
      { title: "Map the desk", text: "Document the screens, the order paths, and the reconciliation the software must support." },
      { title: "Connect what is permitted", text: "Build adapters only for access the client provides." },
      { title: "Separate demo from live", text: "Implement and label demonstration behaviour so it cannot be presented as production execution." },
      { title: "Validate", text: "Test order state, rejects, reconciliation, and permission boundaries in the appropriate environment." },
      { title: "Hand over", text: "Leave credentials, vendor relationships, and operational control with the client." },
    ],
    assurance: [
      "We test the software we build. We do not test against a venue or vendor system without authorization and access.",
      "A demonstration or simulated route is never described as live production capability.",
      "Risk modules support the client's controls. They are not a promise that losses cannot occur.",
    ],
    boundary:
      "Alitroz is a software development and technology integration provider. Alitroz is not a forex broker, trading venue operator, custodian, asset manager, or investment adviser.",
    demonstrator: {
      title: "Multi-market trading workstation",
      text: "A concept for a workstation that keeps demonstration and live execution distinct.",
      href: "/work/multi-market-trading-workstation",
    },
    faqs: [
      {
        question: "Are you a forex broker or a trading venue?",
        answer:
          "No. We build and integrate software for firms that run those businesses. We do not take client deposits, hold assets, or provide investment advice.",
      },
      {
        question: "Can you integrate MetaTrader 4 or 5?",
        answer:
          "Yes, when you have the account and the vendor permissions the integration needs. We do not bypass those controls.",
      },
      {
        question: "Is a demo feed a production integration?",
        answer:
          "No. Simulated or demonstration execution stays labelled as such. We do not present it as a live trading route.",
      },
      {
        question: "Can you build the terminal if you are not the broker?",
        answer:
          "That is the normal arrangement. You operate the business and hold the vendor relationships. We engineer the software.",
      },
    ],
    related: [
      { href: "/industries/fintech-trading", label: "Fintech & Trading" },
      { href: "/capabilities/cloud-devops", label: "Cloud, DevOps & Reliability" },
      { href: "/insights/trading-software-is-a-system", label: "Trading software is a system" },
    ],
  },
  {
    slug: "cloud-devops",
    path: "/capabilities/cloud-devops",
    kind: "capability",
    title: "Cloud, DevOps & Reliability",
    eyebrow: "Supporting capability",
    headline: "The path from a build to a system people can run.",
    summary:
      "We design delivery, environments, observability, and recovery so the products we engineer can be released and looked after. This capability supports the four service divisions.",
    result: "A release process and an operating picture the team can use after the project team steps back.",
    outcomes: [
      "Environments that are reproducible enough to review a change before production.",
      "A deployment path with a rollback.",
      "Signals for latency, errors, and the integrations the product depends on.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "A product can be feature-complete and still be impossible to release safely. The build lives on one machine, the configuration is unexplained, and nobody can tell a failed dependency from a failed release.",
      "Cloud work at Alitroz is not a separate hosting business. It is how the AI systems, products, blockchain services, and trading platforms we build stay operable.",
    ],
    builds: [
      {
        title: "Infrastructure architecture",
        text: "Environment design for the product's real constraints: data location, traffic, and the systems it must reach.",
      },
      {
        title: "CI and CD",
        text: "Pipelines that build, test, and promote the software the repository actually contains.",
      },
      {
        title: "Deployment automation",
        text: "Repeatable releases, including a way to return to a known version.",
      },
      {
        title: "Observability",
        text: "Logs, metrics, and traces around the behaviour operators need, not a dashboard of everything.",
      },
      {
        title: "Reliability",
        text: "Capacity, failure handling, and the operational habits that keep a known load within agreed bounds.",
      },
      {
        title: "Backups and disaster recovery",
        text: "Backups that are restorable, and a recovery path that has been tried, not only described.",
      },
      {
        title: "Performance",
        text: "Measurement and change where the product is slower or more expensive than the operation can accept.",
      },
    ],
    deliverables: [
      { title: "Environment design", text: "What runs where, and which configuration differs between staging and production." },
      { title: "Delivery pipeline", text: "The automated path from a change to a reviewed release." },
      { title: "Operating signals", text: "The logs and metrics required to see a failed release or a failed dependency." },
      { title: "Recovery notes", text: "How to roll back, and how backups are restored." },
    ],
    architecture: [
      "We prefer the cloud and tooling the client already operates well, unless that stack cannot meet the constraint. Infrastructure is described so another engineer can change it.",
      "Secrets, environment separation, and least-privilege access are part of the design. A pipeline that can deploy should not also be an unattended path to production data.",
    ],
    architecturePoints: [
      "Staging resembles production in the ways that change behaviour, especially permissions and integrations.",
      "Releases are versioned and reversible.",
      "Observability follows user-facing failures back to a service.",
      "Backups are checked by restoring them.",
    ],
    integrations: [
      "The client's cloud accounts",
      "Existing CI systems",
      "Container or platform tooling already in use",
      "Log and metric systems",
      "Identity and access management",
    ],
    integrationNote:
      "We work inside the client's accounts. We do not resell cloud capacity, and a tool named in an engagement is a project choice, not a partnership claim.",
    process: [
      { title: "Read the current path", text: "See how a change gets to production today, including the manual steps." },
      { title: "Design the environments", text: "Separate configuration, access, and data for the stages the team needs." },
      { title: "Automate the release", text: "Put build, test, and deploy in a pipeline the team can run." },
      { title: "Add the signals", text: "Instrument the failures that would wake someone up." },
      { title: "Rehearse recovery", text: "Roll back and restore before calling the path done." },
      { title: "Leave it runnable", text: "Document the pipeline and the access required to operate it." },
    ],
    assurance: [
      "Reliability work reduces operational risk. It does not promise a particular uptime figure unless a contract states one, and this site does not state one.",
      "We do not take ownership of the client's cloud account. Access is granted for the engagement and removed when it ends.",
    ],
    demonstrator: {
      title: "Trading workstation concept",
      text: "Includes the environment split between demonstration and production configuration.",
      href: "/work/multi-market-trading-workstation",
    },
    faqs: [
      {
        question: "Do you resell hosting?",
        answer: "No. We design and automate infrastructure in the environment the client operates.",
      },
      {
        question: "Can you work with the cloud we already use?",
        answer: "Yes. Changing cloud is a separate decision. We start from the one you have unless it cannot meet the constraint.",
      },
      {
        question: "What does reliability include?",
        answer: "Release safety, observability, failure handling, backups, and performance work agreed in the scope. It is not an unnamed uptime guarantee.",
      },
      {
        question: "Can this stand alone from a product build?",
        answer: "Yes. It also supports product, AI, trading, and blockchain engagements when those systems need a credible release path.",
      },
    ],
    related: [
      { href: "/services/digital-product-engineering", label: "Digital Product Engineering" },
      { href: "/capabilities/cybersecurity", label: "Cybersecurity & Application Security" },
      { href: "/company/our-approach", label: "Our approach" },
    ],
  },
  {
    slug: "data-engineering",
    path: "/capabilities/data-engineering",
    kind: "capability",
    title: "Data Engineering & Analytics",
    eyebrow: "Supporting capability",
    headline: "Data the product and the business can both trust.",
    summary:
      "We build pipelines, event flows, warehouses, and the analytical views a product or an operation needs. The work supports the service divisions. It is not a separate promise of insight on demand.",
    result: "A path from source systems to a dataset people can query, with known freshness and known access rules.",
    outcomes: [
      "Pipelines that fail visibly instead of silently dropping records.",
      "A model of the business events the product actually produces.",
      "Analytics that match the definitions the teams agreed.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "Reports disagree because each one starts from a different export. Product features that need history, search, or an AI index then inherit the same confusion.",
      "A warehouse does not fix a missing event. We start from the decisions the data has to support, then design the pipeline that can feed them.",
    ],
    builds: [
      {
        title: "Data pipelines",
        text: "Ingestion from the systems of record, with checks on volume, schema, and freshness.",
      },
      {
        title: "Event processing",
        text: "Streams and jobs for product and operational events that other services need to consume.",
      },
      {
        title: "Warehouses",
        text: "Models organised around the questions the business repeats, not around a copy of every table.",
      },
      {
        title: "Analytics and business intelligence",
        text: "Curated datasets and the reports or product views that sit on them.",
      },
      {
        title: "Data integration",
        text: "Connections between product databases, third-party tools, and the analytical store.",
      },
    ],
    deliverables: [
      { title: "Source map", text: "Which system owns each important fact, and how fresh it needs to be." },
      { title: "Pipeline", text: "The jobs that move and check the data." },
      { title: "Model", text: "The tables or views the rest of the work is allowed to depend on." },
      { title: "Access notes", text: "Who can read what, including any dataset used by an assistant." },
    ],
    architecture: [
      "Operational databases stay the system of record for transactions. Analytical stores are downstream. An AI index is downstream again, and it inherits the permissions of the source.",
      "We would rather extend a warehouse the client already runs well than introduce a second one for appearance.",
    ],
    architecturePoints: [
      "Ownership of each dataset is named.",
      "Failed jobs are visible.",
      "Definitions of metrics are written next to the model.",
      "Personal and sensitive fields are excluded or restricted by design.",
    ],
    integrations: [
      "Product databases",
      "Event streams",
      "SaaS exports the client is allowed to use",
      "Warehouses and BI tools already in place",
      "The retrieval stores used by an AI feature",
    ],
    integrationNote:
      "Tooling follows the existing data stack where it is sound. Names here are categories, not a required vendor list.",
    process: [
      { title: "Name the decision", text: "List the questions or product features the data must support." },
      { title: "Find the source", text: "Identify the system of record and the access rules." },
      { title: "Model the facts", text: "Agree definitions before building a wide extract." },
      { title: "Build the path", text: "Implement ingestion, checks, and the downstream model." },
      { title: "Validate", text: "Compare results with a source the business already trusts." },
      { title: "Hand over", text: "Document freshness, failure, and who changes a definition." },
    ],
    assurance: [
      "We test transformations against known inputs. We do not claim a report is correct because it loaded.",
      "Access to production data is limited to what the engagement requires and the client authorizes.",
    ],
    demonstrator: {
      title: "Operations knowledge assistant",
      text: "Shows how an assistant depends on a permissioned corpus rather than an undifferentiated export.",
      href: "/work/operations-knowledge-assistant",
    },
    faqs: [
      {
        question: "Is this only dashboards?",
        answer: "No. Dashboards sit on pipelines, models, and definitions. We build the parts the question actually requires.",
      },
      {
        question: "Can you use our current warehouse?",
        answer: "Yes, when it is a sound place for the work. Replacing it is a separate decision.",
      },
      {
        question: "How do you handle access?",
        answer: "The client's authorization decides what we can read. The model then keeps those limits instead of flattening them.",
      },
      {
        question: "Do you build real-time pipelines?",
        answer: "When the decision needs that freshness. Many operational questions are better served by a reliable batch path. We choose from the requirement.",
      },
    ],
    related: [
      { href: "/services/ai-automation", label: "AI & Intelligent Automation" },
      { href: "/capabilities/cloud-devops", label: "Cloud, DevOps & Reliability" },
      { href: "/services", label: "All services" },
    ],
  },
  {
    slug: "cybersecurity",
    path: "/capabilities/cybersecurity",
    kind: "capability",
    title: "Cybersecurity & Application Security",
    eyebrow: "Supporting capability",
    headline: "Security work that stays inside an authorized scope.",
    summary:
      "We review architecture, access, and application behaviour, and we remediate issues we are authorized to fix. This capability supports the products we engineer. It is not a promise of perfect security.",
    result: "A clearer picture of how the system fails, and fixes for the issues the engagement covers.",
    outcomes: [
      "Threats and access paths written in language the product team can use.",
      "Findings tied to a system the client owns and has authorized us to examine.",
      "Remediation that lands in the codebase, not only in a report.",
    ],
    problemTitle: "The problem we usually find",
    problem: [
      "Security arrives late, as a scan detached from the way the product authenticates, stores data, and talks to other systems.",
      "Teams also meet the opposite problem: a test commissioned against a system nobody has the right to touch. We do not do that.",
    ],
    builds: [
      {
        title: "Secure architecture",
        text: "Reviews of trust boundaries, data flows, and the places a product assumes too much.",
      },
      {
        title: "Access controls",
        text: "Design and implementation of authentication, authorization, and the separation of environments.",
      },
      {
        title: "Authorized application testing",
        text: "Testing of applications the client owns or is explicitly allowed to have tested, within a written scope.",
      },
      {
        title: "Vulnerability remediation",
        text: "Fixes in the application, configuration, or dependency set for issues the engagement includes.",
      },
      {
        title: "Security reviews",
        text: "Focused reviews of a design or a change, with findings ranked by what they allow an attacker to do.",
      },
    ],
    deliverables: [
      { title: "Scope", text: "The systems, environments, and methods that are authorized, and the ones that are not." },
      { title: "Findings", text: "Issues described with impact and the evidence that supports them." },
      { title: "Fixes", text: "Remediation in the code or configuration when that is part of the engagement." },
      { title: "Residual notes", text: "What remains, and what a specialist auditor or the client's own security team still needs to cover." },
    ],
    architecture: [
      "We look at identity, data, session handling, administrative paths, and the integrations that expand the trust boundary. A scanner result without that context is not the deliverable.",
      "For trading and blockchain systems, this work still requires authorization. It does not include attacking third-party venues, wallets, or networks the client does not control.",
    ],
    architecturePoints: [
      "Production testing happens only with explicit permission and an agreed window.",
      "Test accounts and credentials are limited and removed afterwards.",
      "Fixes are verified against the original finding.",
      "We say when a dedicated audit firm is the right next step.",
    ],
    integrations: [
      "The client's identity provider",
      "Application environments they authorize",
      "Dependency and code repositories",
      "Logging that shows administrative actions",
    ],
    integrationNote:
      "Methods stay inside the authorized scope. We do not publish exploit procedures, and we do not test systems we have not been asked and allowed to test.",
    process: [
      { title: "Authorize", text: "Confirm ownership or permission, the environment, and the rules of engagement." },
      { title: "Understand", text: "Read the architecture and the access model before running tools." },
      { title: "Examine", text: "Review and test within the written scope." },
      { title: "Report", text: "Describe findings with impact, without turning the report into an attack guide for the public." },
      { title: "Remediate", text: "Fix the issues included in the engagement and recheck them." },
      { title: "Leave the rest named", text: "Record residual risk and any work that belongs with a specialist auditor." },
    ],
    assurance: [
      "We never promise that a system cannot be compromised.",
      "We do not test production, third-party, or client-adjacent systems without authorization.",
      "A review is not a certification, and this site claims none.",
    ],
    boundary:
      "Security work is performed only with authorization. It reduces risk. It does not prove the absence of vulnerabilities, and it is not a certification.",
    demonstrator: {
      title: "How we handle concept showcases",
      text: "Our published work explains security boundaries in the design. It is not a report of a client test.",
      href: "/work",
    },
    faqs: [
      {
        question: "Will you test a system we do not own?",
        answer:
          "No. We need the owner’s authorization, or your written authority to commission the test on a system you control. Scope is agreed before any testing starts.",
      },
      {
        question: "Do you promise a system cannot be breached?",
        answer: "No. Security work finds and fixes issues within a scope. It cannot prove that nothing remains.",
      },
      {
        question: "What is the difference between a review and remediation?",
        answer:
          "A review reports what is wrong and why it matters. Remediation changes the software or configuration and checks the fix. An engagement can include either or both.",
      },
      {
        question: "Do you replace a specialist audit firm?",
        answer:
          "No. For smart contracts, regulated environments, or other cases that need an independent specialist, we will say so and work alongside that review rather than impersonate it.",
      },
    ],
    related: [
      { href: "/services/web3-blockchain", label: "Web3 & Blockchain Engineering" },
      { href: "/services/ai-automation", label: "AI & Intelligent Automation" },
      { href: "/company/our-approach", label: "Our approach" },
    ],
  },
];

export function getOffering(slug: string) {
  return offerings.find((offering) => offering.slug === slug);
}

export const divisions = offerings.filter((offering) => offering.kind === "division");
export const capabilities = offerings.filter((offering) => offering.kind === "capability");
