import { useId } from "react";

const families = ["ai", "product", "web3", "finance", "cloud", "data", "security"] as const;
export type VisualFamily = (typeof families)[number];

const slugFamily: Record<string, VisualFamily> = {
  "ai-automation": "ai",
  "digital-product-engineering": "product",
  "web3-blockchain": "web3",
  "financial-trading-technology": "finance",
  "cloud-devops": "cloud",
  "data-engineering": "data",
  cybersecurity: "security",
};

const categoryFamily: Record<string, VisualFamily> = {
  "AI and Automation": "ai",
  "Custom Software": "product",
  "Web and Mobile Applications": "product",
  "Web3 and Blockchain": "web3",
  "Financial and Trading Technology": "finance",
  "Cloud and Data Engineering": "cloud",
  "Cloud and DevOps": "cloud",
  "Data Engineering": "data",
  Cybersecurity: "security",
  "Product Strategy and Delivery": "product",
  "Software Engineering": "product",
  "Product Engineering": "product",
  "Financial Technology": "finance",
};

export function familyOf(slug: string, figure?: string): VisualFamily {
  if (figure && (families as readonly string[]).includes(figure)) return figure as VisualFamily;
  return slugFamily[slug] ?? categoryFamily[slug] ?? "product";
}

export function familyFromCategory(category: string): VisualFamily {
  return categoryFamily[category] ?? "product";
}

type Tone = "source" | "process" | "intelligence" | "human" | "output";
type Stage = { label: string; note: string; lines: [string, string?]; tone: Tone };

export const systemStages: Record<VisualFamily, Stage[]> = {
  ai: [
    { label: "Business data", note: "Documents, tickets, and records the company already owns", lines: ["Documents, tickets,", "records"], tone: "source" },
    { label: "Knowledge ingestion", note: "Scheduled loading with permissions attached to each passage", lines: ["Permissions travel", "with each passage"], tone: "process" },
    { label: "Retrieval / RAG", note: "Only approved passages reach the model", lines: ["Approved passages", "only"], tone: "process" },
    { label: "AI agent or model", note: "A replaceable model behind an adapter", lines: ["Replaceable model", "behind an adapter"], tone: "intelligence" },
    { label: "Tools and APIs", note: "Allow-listed actions in the systems staff already use", lines: ["Allow-listed", "actions"], tone: "process" },
    { label: "Human approval", note: "A person confirms any change that matters", lines: ["A person confirms", "material changes"], tone: "human" },
    { label: "Business outcome", note: "A cited answer, a draft, or an approved change", lines: ["Cited answer or", "approved change"], tone: "output" },
  ],
  product: [
    { label: "Users and devices", note: "Browser, mobile, and the roles each one carries", lines: ["Browser, mobile,", "and roles"], tone: "source" },
    { label: "Experience layer", note: "The screens and workflows people actually use", lines: ["Screens and", "workflows"], tone: "process" },
    { label: "Application logic", note: "Business rules, tenancy, permissions, and jobs", lines: ["Rules, tenancy,", "permissions"], tone: "intelligence" },
    { label: "API layer", note: "Contracts between the product and other systems", lines: ["Contracts with", "other systems"], tone: "process" },
    { label: "Data and services", note: "Databases, queues, and third-party services", lines: ["Databases, queues,", "third parties"], tone: "source" },
    { label: "Release and operate", note: "Pipelines, environments, monitoring, rollback", lines: ["Pipelines, monitoring,", "rollback"], tone: "output" },
  ],
  web3: [
    { label: "User wallet", note: "Keys stay with the user; the product requests a signature", lines: ["Keys stay with", "the user"], tone: "source" },
    { label: "dApp interface", note: "The web or mobile product that prepares each transaction", lines: ["Prepares each", "transaction"], tone: "process" },
    { label: "Smart contracts", note: "Reviewed, tested logic deployed to the chosen network", lines: ["Reviewed and", "tested logic"], tone: "intelligence" },
    { label: "Blockchain network", note: "The chain or chains the client selects and operates on", lines: ["The chain the", "client selects"], tone: "process" },
    { label: "Indexing and events", note: "Contract events read into a queryable store", lines: ["Events read into", "a store"], tone: "process" },
    { label: "Ops dashboard", note: "Positions, history, and operational controls", lines: ["Positions, history,", "controls"], tone: "output" },
  ],
  finance: [
    { label: "Trading terminal", note: "Blotter, ticket, and charts with state the desk can name", lines: ["Blotter, ticket,", "charts"], tone: "source" },
    { label: "Market data", note: "Source and age stay visible beside every price", lines: ["Source and age", "stay visible"], tone: "process" },
    { label: "Liquidity adapters", note: "Adapters for venues and providers the client contracts", lines: ["Venue and provider", "adapters"], tone: "process" },
    { label: "Order management", note: "Accept, reject, working, and disconnect as explicit states", lines: ["Explicit order", "states"], tone: "intelligence" },
    { label: "Risk and reporting", note: "Exposure, limits, and figures a reviewer can trace", lines: ["Exposure, limits,", "traceable figures"], tone: "human" },
    { label: "Reconciliation", note: "Back-office breaks queued for a person with both figures", lines: ["Back-office breaks", "queued for a person"], tone: "output" },
  ],
  cloud: [
    { label: "Users and edge", note: "DNS, TLS, identity, and rate limits at the front door", lines: ["DNS, TLS, identity,", "rate limits"], tone: "source" },
    { label: "Applications", note: "The product services and their environments", lines: ["Product services", "per environment"], tone: "process" },
    { label: "Containers", note: "Orchestrated workloads with health checks and limits", lines: ["Orchestrated", "workloads"], tone: "intelligence" },
    { label: "APIs", note: "Internal and partner interfaces behind a gateway", lines: ["Gateway and", "contracts"], tone: "process" },
    { label: "Databases", note: "Managed stores with backups that are actually restored", lines: ["Managed stores,", "tested restores"], tone: "source" },
    { label: "Message queues", note: "Async work that survives a failed node", lines: ["Async work that", "survives failure"], tone: "process" },
    { label: "Monitor & backup", note: "Signals, alerts, rollback, and recovery drills", lines: ["Signals, rollback,", "recovery drills"], tone: "output" },
  ],
  data: [
    { label: "Sources", note: "CRM, product, billing, and event systems of record", lines: ["CRM, product,", "billing, events"], tone: "source" },
    { label: "Ingestion", note: "Scheduled and streamed loads with quality checks", lines: ["Scheduled loads,", "quality checks"], tone: "process" },
    { label: "Stream / ETL", note: "Transport that keeps order and handles late data", lines: ["Ordered transport,", "late data"], tone: "process" },
    { label: "Transformation", note: "Definitions the business owns and can read", lines: ["Definitions the", "business owns"], tone: "intelligence" },
    { label: "Warehouse", note: "Modelled tables with lineage and history", lines: ["Modelled tables", "with lineage"], tone: "source" },
    { label: "Analytics / API", note: "Dashboards and services people can explain", lines: ["Dashboards and", "data services"], tone: "output" },
  ],
  security: [
    { label: "Identity", note: "Who is asking, from which device and tenant", lines: ["Who is asking,", "from where"], tone: "source" },
    { label: "Authentication", note: "Strong sign-in with sessions that expire", lines: ["Strong sign-in,", "expiring sessions"], tone: "process" },
    { label: "Authorization", note: "What this identity may do with this record", lines: ["What this identity", "may do"], tone: "intelligence" },
    { label: "App boundary", note: "Validation, secrets handling, and dependency review", lines: ["Validation and", "secrets handling"], tone: "process" },
    { label: "API security", note: "Scoped tokens, rate limits, and audited calls", lines: ["Scoped tokens,", "audited calls"], tone: "process" },
    { label: "Data protection", note: "Encryption, retention, and access to the stores", lines: ["Encryption and", "retention"], tone: "human" },
    { label: "Monitoring & tests", note: "Logs, alerts, reviews, and penetration tests", lines: ["Logs, reviews,", "penetration tests"], tone: "output" },
  ],
};

export const systemFlows: Record<VisualFamily, { label: string; note: string }[]> = Object.fromEntries(
  families.map((family) => [family, systemStages[family].map(({ label, note }) => ({ label, note }))]),
) as Record<VisualFamily, { label: string; note: string }[]>;

const focusBySlug: Record<string, number> = {
  "ai-consulting": 6,
  "ai-agent-development": 3,
  "generative-ai-development": 3,
  "enterprise-ai-copilots": 5,
  "rag-knowledge-systems": 2,
  "ai-chatbot-development": 3,
  "machine-learning-solutions": 3,
  "document-intelligence": 1,
  "ai-model-integration": 3,
  "ai-workflow-automation": 4,
  "enterprise-ai-automation": 4,
  "custom-software-development": 2,
  "website-development": 1,
  "web-application-development": 1,
  "mobile-app-development": 0,
  "saas-development": 2,
  "enterprise-software-development": 2,
  "ui-ux-product-design": 1,
  "api-integration": 3,
  "legacy-modernization": 4,
  "ecommerce-development": 1,
  "digital-product-modernization": 4,
  "enterprise-system-integration": 3,
  "product-discovery": 1,
  "end-to-end-product": 2,
  "dedicated-teams": 2,
  "system-integration": 3,
  "ongoing-support": 5,
  "blockchain-development": 3,
  "smart-contract-development": 2,
  "dapp-development": 1,
  "defi-development": 2,
  "crypto-exchange-development": 5,
  "crypto-wallet-development": 0,
  "tokenization-platforms": 2,
  "blockchain-integration": 4,
  "cross-chain-integration": 3,
  "smart-contract-testing": 2,
  "digital-asset-infrastructure": 4,
  "forex-platform-development": 0,
  "mt4-mt5-integration": 2,
  "trading-terminal-development": 0,
  "forex-crm-development": 5,
  "liquidity-provider-integration": 2,
  "order-management-systems": 3,
  "trading-risk-reporting": 4,
  "financial-reconciliation": 5,
  "financial-api-integration": 1,
  "trading-infrastructure": 3,
  "financial-platform-technology": 3,
  "cloud-architecture": 1,
  "cloud-migration": 4,
  "devops-ci-cd": 2,
  "kubernetes-platforms": 2,
  "observability-reliability": 6,
  "disaster-recovery": 6,
  "data-pipelines": 2,
  "data-warehouse-bi": 4,
  "real-time-data": 2,
  "analytics-dashboards": 5,
  "data-intelligence-platforms": 4,
  "application-security": 3,
  "secure-code-review": 3,
  "penetration-testing": 6,
  "cloud-security": 5,
  "identity-access-management": 0,
  fintech: 0,
  "digital-assets-web3": 2,
  saas: 2,
  ecommerce: 1,
  healthcare: 2,
  logistics: 5,
  enterprise: 3,
};

export function focusStageFor(variant: string): number | undefined {
  return focusBySlug[variant];
}

const palette: Record<
  VisualFamily,
  { bgA: string; bgB: string; bgC: string; accent: string; second: string; third: string; warm: string; grid: string }
> = {
  ai: { bgA: "#2b1f5e", bgB: "#1c2246", bgC: "#143a44", accent: "#866cff", second: "#61ded5", third: "#b5a4ff", warm: "#ff8b75", grid: "#b5a4ff" },
  product: { bgA: "#1c2b5a", bgB: "#262443", bgC: "#3a2a4c", accent: "#72a4ff", second: "#ff8b75", third: "#b5a4ff", warm: "#f4c879", grid: "#72a4ff" },
  web3: { bgA: "#113c45", bgB: "#1f2a52", bgC: "#2d2658", accent: "#3cb9a8", second: "#866cff", third: "#61ded5", warm: "#ff8b75", grid: "#61ded5" },
  finance: { bgA: "#13264f", bgB: "#242744", bgC: "#1a3550", accent: "#4f7dff", second: "#ff8b75", third: "#72a4ff", warm: "#f4c879", grid: "#72a4ff" },
  cloud: { bgA: "#122f48", bgB: "#1b2a52", bgC: "#143f46", accent: "#61ded5", second: "#72a4ff", third: "#bfe98c", warm: "#ff8b75", grid: "#61ded5" },
  data: { bgA: "#291f56", bgB: "#1f3147", bgC: "#1f2a52", accent: "#866cff", second: "#bfe98c", third: "#72a4ff", warm: "#ff8b75", grid: "#bfe98c" },
  security: { bgA: "#1c2452", bgB: "#17323f", bgC: "#2a2548", accent: "#b5a4ff", second: "#61ded5", third: "#866cff", warm: "#ff8b75", grid: "#b5a4ff" },
};

const captions: Record<VisualFamily, { kicker: string; title: string; text: string }> = {
  ai: {
    kicker: "AI system architecture",
    title: "From company data to an approved outcome.",
    text: "Business data is ingested with permissions, retrieved for the model, acted on through allow-listed tools, and confirmed by a person before a record changes.",
  },
  product: {
    kicker: "Product architecture",
    title: "Experience, application, API, data, and release.",
    text: "The layers of a web or mobile product Alitroz engineers, from the screens people use to the pipeline that releases and rolls them back.",
  },
  web3: {
    kicker: "Web3 architecture",
    title: "Wallet, dApp, contracts, chain, indexing, dashboard.",
    text: "Where a digital-asset product's components meet. Keys stay with the user; Alitroz builds the software, not an exchange or custody service.",
  },
  finance: {
    kicker: "Trading technology stack",
    title: "Terminal, pricing, liquidity, orders, risk, back office.",
    text: "Software integrations for a client that holds the regulated activity. Prices and orders shown anywhere on this page are simulated.",
  },
  cloud: {
    kicker: "Cloud topology",
    title: "Edge, applications, containers, APIs, data, queues, observability.",
    text: "A realistic distributed system with the parts that keep a product deployable, recoverable, and observable after launch.",
  },
  data: {
    kicker: "Data pipeline",
    title: "Sources, ingestion, streaming, transformation, warehouse, analytics.",
    text: "A pipeline with definitions the business owns, so the figure on a dashboard can be traced back to the record that produced it.",
  },
  security: {
    kicker: "Security layers",
    title: "Identity, authentication, authorization, boundary, API, data, monitoring.",
    text: "Protection drawn as structure: each layer makes one decision and records it, so a review can see where a control lives.",
  },
};

export type PanelCopy = { title: string; readout: string; support: string; pill: string };

export function FamilyVisual({
  family,
  compact = false,
  variant = "",
  panel,
  caption = true,
}: {
  family: string;
  compact?: boolean;
  variant?: string;
  /** Page-specific copy for the simulated-UI panel, so each page's graphic differs. */
  panel?: PanelCopy;
  /** Set false where the surrounding copy already explains the diagram. */
  caption?: boolean;
}) {
  const key: VisualFamily = (families as readonly string[]).includes(family) ? (family as VisualFamily) : "product";
  const copy = captions[key];
  const uid = useId().replace(/:/g, "");
  const focus = focusStageFor(variant);
  const stages = systemStages[key];
  const focusLabel = focus !== undefined ? stages[focus]?.label : undefined;
  const description = focusLabel ? `${copy.title} This page focuses on the ${focusLabel} stage.` : copy.title;
  return (
    <figure className={`visual-stage family-${key}${compact ? " is-compact" : ""}`}>
      <svg className={compact ? "visual-compact" : "visual-full"} viewBox={compact ? `0 0 400 ${compactHeight(stages.length)}` : "0 0 800 540"} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${description} ${copy.text}`}>
        <title>{description}</title>
        {compact ? <CompactDiagram family={key} id={uid} focus={focus} /> : <Diagram family={key} id={uid} focus={focus} panel={panel} />}
      </svg>
      {compact ? null : (
        <svg className="visual-compact visual-narrow-only" viewBox={`0 0 400 ${compactHeight(stages.length)}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${description} ${copy.text}`}>
          <title>{description}</title>
          <CompactDiagram family={key} id={`${uid}n`} focus={focus} />
        </svg>
      )}
      {compact || !caption ? null : (
        <figcaption>
          <span>{copy.kicker}{focusLabel ? ` · focus: ${focusLabel}` : ""}</span>
          {copy.text}
        </figcaption>
      )}
    </figure>
  );
}

const NODE_W = 186;
const NODE_H = 96;
const ROW_ONE = 108;
const ROW_TWO = 332;
const COLUMNS = [26, 214, 402, 590];

function toneFill(tone: Tone, family: VisualFamily) {
  const colors = palette[family];
  if (tone === "intelligence") return colors.accent;
  if (tone === "human") return colors.warm;
  if (tone === "output") return colors.third;
  if (tone === "process") return colors.second;
  return "#f7f6ff";
}

function layout(count: number) {
  const topCount = 4;
  const bottomCount = count - topCount;
  const top = Array.from({ length: Math.min(count, topCount) }, (_, index) => ({ x: COLUMNS[index], y: ROW_ONE }));
  const bottom = Array.from({ length: Math.max(0, bottomCount) }, (_, index) => ({ x: COLUMNS[index], y: ROW_TWO }));
  return [...top, ...bottom];
}

const C_W = 176;
const C_H = 46;
const C_COLS = [16, 208];
const C_TOP = 58;
const C_STEP = 58;
const compactHeight = (count: number) => C_TOP + Math.ceil(count / 2) * C_STEP + 40;

function CompactDiagram({ family, id, focus }: { family: VisualFamily; id: string; focus?: number }) {
  const colors = palette[family];
  const stages = systemStages[family];
  const positions = stages.map((_, index) => ({ x: C_COLS[index % 2], y: C_TOP + Math.floor(index / 2) * C_STEP }));
  const connectors = positions.slice(1).map((position, index) => {
    const previous = positions[index];
    if (previous.y === position.y) {
      return `M${previous.x + C_W} ${previous.y + C_H / 2} H${position.x}`;
    }
    return `M${previous.x + C_W / 2} ${previous.y + C_H} V${previous.y + C_H + 5} H${position.x + C_W / 2} V${position.y}`;
  });
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-cbg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.bgA} />
          <stop offset="55%" stopColor={colors.bgB} />
          <stop offset="100%" stopColor={colors.bgC} />
        </linearGradient>
        <radialGradient id={`${id}-cglow`} cx="82%" cy="10%" r="60%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.bgB} stopOpacity="0" />
        </radialGradient>
        <marker id={`${id}-carrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#f7f6ff" fillOpacity="0.75" />
        </marker>
      </defs>
      <rect width="400" height={compactHeight(stages.length)} rx="20" fill={`url(#${id}-cbg)`} />
      <rect width="400" height={compactHeight(stages.length)} rx="20" fill={`url(#${id}-cglow)`} />
      <text x="16" y="30" fill={colors.third} fontSize="10.5" fontWeight="700" letterSpacing="2">
        {captions[family].kicker.toUpperCase()}
      </text>
      <text x="384" y="30" fill="#f7f6ff" fillOpacity="0.6" fontSize="10" textAnchor="end">
        Illustrative · not a client deployment
      </text>
      {connectors.map((d, index) => (
        <path key={d} d={d} fill="none" stroke="#f7f6ff" strokeOpacity={index % 2 === 0 ? 0.55 : 0.4} strokeWidth="1.4" markerEnd={`url(#${id}-carrow)`} />
      ))}
      {stages.map((stage, index) => {
        const position = positions[index];
        const fill = toneFill(stage.tone, family);
        const focused = focus === index;
        const dimmed = focus !== undefined && !focused;
        return (
          <g key={stage.label} transform={`translate(${position.x} ${position.y})`} opacity={dimmed ? 0.66 : 1}>
            <rect width={C_W} height={C_H} rx="12" fill="#141830" fillOpacity="0.78" stroke={fill} strokeOpacity={focused ? 1 : 0.55} strokeWidth={focused ? 2 : 1.1} />
            <rect x="1" y="1" width={C_W - 2} height={C_H - 2} rx="11" fill={fill} fillOpacity={focused ? 0.24 : 0.1} />
            <rect x="12" y="11" width="18" height="3" rx="1.5" fill={fill} />
            <text x="36" y="19" fill="#e4e5f3" fontSize="9" fontWeight="700" letterSpacing="1.4">
              {String(index + 1).padStart(2, "0")}
            </text>
            <text x="12" y="36" fill="#f7f6ff" fontSize="13.5" fontWeight="700" letterSpacing="-0.3">
              {stage.label}
            </text>
            {focused ? <circle cx={C_W - 14} cy="13" r="4" fill={fill} /> : null}
          </g>
        );
      })}
      <text x="16" y={compactHeight(stages.length) - 18} fill="#c6c8dc" fontSize="10.5">
        {focus !== undefined ? `Focus on this page: ${stages[focus].label}` : `${stages.length} stages · each is explained on the full page`}
      </text>
    </g>
  );
}

function Diagram({ family, id, focus, panel }: { family: VisualFamily; id: string; focus?: number; panel?: PanelCopy }) {
  const colors = palette[family];
  const stages = systemStages[family];
  const positions = layout(stages.length);
  const freeSlots = COLUMNS.length - (stages.length - 4);
  const insetWidth = freeSlots * 188 - 24;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.bgA} />
          <stop offset="55%" stopColor={colors.bgB} />
          <stop offset="100%" stopColor={colors.bgC} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="78%" cy="18%" r="52%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.42" />
          <stop offset="60%" stopColor={colors.second} stopOpacity="0.08" />
          <stop offset="100%" stopColor={colors.bgB} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow2`} cx="8%" cy="92%" r="46%">
          <stop offset="0%" stopColor={colors.second} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colors.bgB} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={colors.grid} strokeOpacity="0.09" />
        </pattern>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#f7f6ff" fillOpacity="0.78" />
        </marker>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width="800" height="540" rx="26" fill={`url(#${id}-bg)`} />
      <rect width="800" height="540" rx="26" fill={`url(#${id}-glow)`} />
      <rect width="800" height="540" rx="26" fill={`url(#${id}-glow2)`} />
      <rect width="800" height="540" rx="26" fill={`url(#${id}-grid)`} />
      <text x="26" y="56" fill={colors.third} fontSize="13" fontWeight="700" letterSpacing="2.4">
        {captions[family].kicker.toUpperCase()}
      </text>
      <text x="774" y="56" fill="#f7f6ff" fillOpacity="0.62" fontSize="13" textAnchor="end">
        Illustrative system · not a client deployment
      </text>
      <Connectors positions={positions} id={id} colors={colors} />
      {stages.map((stage, index) => (
        <Node key={stage.label} stage={stage} index={index} position={positions[index]} family={family} focused={focus === index} dimmed={focus !== undefined && focus !== index} id={id} />
      ))}
      <g transform={`translate(${COLUMNS[stages.length - 4]} ${ROW_TWO - 6})`}>
        <Inset family={family} width={insetWidth} id={id} panel={panel} />
      </g>
    </g>
  );
}

function Connectors({ positions, id, colors }: { positions: { x: number; y: number }[]; id: string; colors: (typeof palette)[VisualFamily] }) {
  const paths: string[] = [];
  positions.forEach((position, index) => {
    const next = positions[index + 1];
    if (!next) return;
    if (next.y === position.y) {
      const fromX = next.x > position.x ? position.x + NODE_W : position.x;
      const toX = next.x > position.x ? next.x : next.x + NODE_W;
      paths.push(`M${fromX} ${position.y + NODE_H / 2} H${toX}`);
    } else {
      const startX = position.x + NODE_W / 2;
      const endX = next.x + NODE_W / 2;
      const midY = position.y + NODE_H + (next.y - position.y - NODE_H) / 2;
      paths.push(`M${startX} ${position.y + NODE_H} V${midY} H${endX} V${next.y}`);
    }
  });
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((path) => (
        <g key={path}>
          <path d={path} stroke={colors.accent} strokeOpacity="0.5" strokeWidth="8" filter={`url(#${id}-soft)`} />
          <path d={path} stroke="#f7f6ff" strokeOpacity="0.55" strokeWidth="1.8" markerEnd={`url(#${id}-arrow)`} />
        </g>
      ))}
    </g>
  );
}

function Node({
  stage,
  index,
  position,
  family,
  focused,
  dimmed,
  id,
}: {
  stage: Stage;
  index: number;
  position: { x: number; y: number };
  family: VisualFamily;
  focused: boolean;
  dimmed: boolean;
  id: string;
}) {
  const fill = toneFill(stage.tone, family);
  const isLight = stage.tone === "source";
  return (
    <g transform={`translate(${position.x} ${position.y})`} opacity={dimmed ? 0.72 : 1}>
      {focused ? <rect x="-10" y="-10" width={NODE_W + 20} height={NODE_H + 20} rx="24" fill={fill} fillOpacity="0.5" filter={`url(#${id}-soft)`} /> : null}
      <rect width={NODE_W} height={NODE_H} rx="18" fill="#141830" fillOpacity={isLight ? 0.6 : 0.78} stroke={fill} strokeOpacity={focused ? 1 : 0.55} strokeWidth={focused ? 2.2 : 1.2} />
      <rect x="1" y="1" width={NODE_W - 2} height={NODE_H - 2} rx="17" fill={fill} fillOpacity={focused ? 0.22 : 0.1} />
      <rect x="14" y="16" width="26" height="4" rx="2" fill={fill} />
      <text x="48" y="22" fill="#e4e5f3" fontSize="11" fontWeight="700" letterSpacing="1.8">
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x="14" y="48" fill="#f7f6ff" fontSize="15" fontWeight="700" letterSpacing="-0.35">
        {stage.label}
      </text>
      <text x="14" y="68" fill="#d7d8ea" fontSize="13">{stage.lines[0]}</text>
      {stage.lines[1] ? <text x="14" y="84" fill="#d7d8ea" fontSize="13">{stage.lines[1]}</text> : null}
      {focused ? (
        <g transform={`translate(${NODE_W - 60} 10)`}>
          <rect width="48" height="16" rx="8" fill={fill} />
          <text x="24" y="11.5" fill="#141830" fontSize="9.5" fontWeight="800" textAnchor="middle" letterSpacing="1">FOCUS</text>
        </g>
      ) : null}
    </g>
  );
}

type InsetCopy = { title: string; short: string; readout: string; readoutShort: string; support: string; pill: string };

const insetCopy: Record<VisualFamily, InsetCopy> = {
  ai: { title: "Assistant answer", short: "Assistant", readout: "Answer with 3 citations", readoutShort: "3 citations", support: "Grounded in the policy index · hand-off offered", pill: "Cited" },
  product: { title: "Product interface", short: "Interface", readout: "Release 2.4 shipped", readoutShort: "Release 2.4", support: "Design system · 48 components · 0 open P1s", pill: "Live" },
  web3: { title: "Signature request", short: "Signature", readout: "Sign transfer", readoutShort: "Sign", support: "Verified contract · gas and recipient shown", pill: "Awaiting user" },
  finance: { title: "Order ticket", short: "Ticket", readout: "Buy 1.00 lot EURUSD", readoutShort: "Buy 1.00", support: "Price age 120 ms · pre-trade risk check passed", pill: "Simulated" },
  cloud: { title: "Service health", short: "Health", readout: "All checks passing", readoutShort: "Passing", support: "p95 212 ms · error rate 0.1% · 3 regions", pill: "Healthy" },
  data: { title: "Pipeline run", short: "Pipeline", readout: "Nightly load complete", readoutShort: "Load done", support: "14 tables · 3 quality checks · lineage recorded", pill: "Passed" },
  security: { title: "Access decision", short: "Access", readout: "Allow · finance-ops role", readoutShort: "Allow", support: "MFA verified · token scoped · decision logged", pill: "Logged" },
};

function Inset({ family, width, panel }: { family: VisualFamily; width: number; id: string; panel?: PanelCopy }) {
  const colors = palette[family];
  const base = insetCopy[family];
  const titleLimit = Math.max(16, Math.floor((width - 170) / 7.6));
  const fit = (value: string) => (value.length > titleLimit ? `${value.slice(0, titleLimit - 1).trimEnd()}…` : value);
  const copy: InsetCopy = panel
    ? { title: fit(panel.title), short: base.short, readout: panel.readout, readoutShort: base.readoutShort, support: panel.support, pill: panel.pill }
    : base;
  const narrow = width < 300;
  const height = 150;
  const pillWidth = narrow ? 0 : copy.pill.length * 7.4 + 22;
  return (
    <g>
      <rect width={width} height={height} rx="16" fill="#0f1327" fillOpacity="0.86" stroke="#f7f6ff" strokeOpacity="0.14" />
      <rect width={width} height="32" rx="16" fill="#1b2040" />
      <rect y="16" width={width} height="16" fill="#1b2040" />
      <circle cx="18" cy="16" r="3.4" fill={colors.warm} />
      <circle cx="31" cy="16" r="3.4" fill={colors.third} />
      <circle cx="44" cy="16" r="3.4" fill={colors.second} />
      <text x="58" y="20.5" fill="#d7d8ea" fontSize="12.5" fontWeight="700" letterSpacing="0.4">{narrow ? copy.short : copy.title}</text>
      {!narrow ? <text x={width - 14} y="20.5" fill="#9ea1bb" fontSize="11" textAnchor="end" letterSpacing="1.2">SIMULATED UI</text> : null}
      <text x="16" y={narrow ? 72 : 78} fill="#f7f6ff" fontSize={narrow ? 19 : copy.readout.length > 20 ? 20 : 26} fontWeight="800" letterSpacing="-0.6">
        {narrow ? copy.readoutShort : copy.readout}
      </text>
      {narrow ? (
        <>
          <text x="16" y="96" fill="#c6c8dc" fontSize="12.5">{copy.title}</text>
          <rect x="16" y="110" width={copy.pill.length * 7.4 + 22} height="22" rx="11" fill={colors.accent} fillOpacity="0.22" stroke={colors.accent} strokeOpacity="0.7" />
          <text x={16 + (copy.pill.length * 7.4 + 22) / 2} y="125" fill="#f7f6ff" fontSize="11.5" fontWeight="700" textAnchor="middle">{copy.pill}</text>
        </>
      ) : (
        <>
          <text x="16" y="104" fill="#c6c8dc" fontSize="13">{copy.support.length > 50 ? `${copy.support.slice(0, 48).trimEnd()}…` : copy.support}</text>
          <rect x="16" y="126" width={width - 44 - pillWidth} height="4" rx="2" fill="#f7f6ff" fillOpacity="0.12" />
          <rect x="16" y="126" width={(width - 44 - pillWidth) * 0.72} height="4" rx="2" fill={colors.accent} />
          <rect x={width - 16 - pillWidth} y="116" width={pillWidth} height="24" rx="12" fill={colors.accent} fillOpacity="0.22" stroke={colors.accent} strokeOpacity="0.7" />
          <text x={width - 16 - pillWidth / 2} y="132" fill="#f7f6ff" fontSize="12" fontWeight="700" textAnchor="middle">{copy.pill}</text>
        </>
      )}
    </g>
  );
}

export function SystemFlow({ family, variant = "", noun = "service" }: { family: string; variant?: string; noun?: string }) {
  const key: VisualFamily = (families as readonly string[]).includes(family) ? (family as VisualFamily) : "product";
  const steps = systemStages[key];
  const focus = focusStageFor(variant);
  return (
    <figure className={`system-flow family-${key}`}>
      <ol>
        {steps.map((step, index) => (
          <li key={step.label} className={focus === index ? "is-focus" : undefined} aria-current={focus === index ? "step" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <em>{step.note}</em>
          </li>
        ))}
      </ol>
      <figcaption>
        Illustrative system. Not a completed client architecture.
        {focus !== undefined ? ` This ${noun} concentrates on stage ${String(focus + 1).padStart(2, "0")}, ${steps[focus].label}.` : ""}
      </figcaption>
    </figure>
  );
}

export function WorkflowSpine({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="spine">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}
