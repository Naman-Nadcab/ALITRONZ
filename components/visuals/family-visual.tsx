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
};

export function familyOf(slug: string, figure?: string): VisualFamily {
  if (figure && (families as readonly string[]).includes(figure)) return figure as VisualFamily;
  return slugFamily[slug] ?? categoryFamily[slug] ?? "product";
}

export function familyFromCategory(category: string): VisualFamily {
  return categoryFamily[category] ?? "product";
}

export const systemFlows: Record<VisualFamily, { label: string; note: string }[]> = {
  ai: [
    { label: "Source data", note: "Approved corpus and permissions" },
    { label: "Retrieval", note: "Passages the answer may use" },
    { label: "Orchestration", note: "Model, tools, and limits" },
    { label: "Application", note: "The product people use" },
    { label: "Monitoring", note: "Quality, cost, and refusal" },
  ],
  product: [
    { label: "Current systems", note: "What already runs" },
    { label: "Integration", note: "The boundary between them" },
    { label: "New application", note: "The experience being built" },
    { label: "Migration", note: "How work moves across" },
    { label: "Operations", note: "Release, observe, roll back" },
  ],
  web3: [
    { label: "Application", note: "The product surface" },
    { label: "Wallet", note: "A user-held signature" },
    { label: "Chain services", note: "Contracts and reads" },
    { label: "Monitoring", note: "State, failure, and cost" },
  ],
  finance: [
    { label: "Interface", note: "What the desk sees" },
    { label: "Market data", note: "Source, age, and licence" },
    { label: "Order workflows", note: "Accept, reject, disconnect" },
    { label: "Reporting", note: "Back office and audit" },
  ],
  cloud: [
    { label: "Edge", note: "How requests arrive" },
    { label: "Services", note: "The running product" },
    { label: "Pipeline", note: "Build and release" },
    { label: "Observe", note: "Signals and rollback" },
  ],
  data: [
    { label: "Sources", note: "Systems of record" },
    { label: "Ingest", note: "Schedule and quality" },
    { label: "Model", note: "Definitions that hold" },
    { label: "Analytics", note: "The view people trust" },
  ],
  security: [
    { label: "Identity", note: "Who is asking" },
    { label: "Access", note: "What they may do" },
    { label: "Application", note: "Where the check lives" },
    { label: "Audit", note: "What was recorded" },
  ],
};

const captions: Record<VisualFamily, { kicker: string; title: string; text: string }> = {
  ai: {
    kicker: "AI system",
    title: "Knowledge, orchestration, and a human review.",
    text: "An illustrative path from approved sources to an answer that can be refused.",
  },
  product: {
    kicker: "Product surfaces",
    title: "Web, mobile, and the interface behind them.",
    text: "A composed view of the application, not a photograph of someone typing.",
  },
  web3: {
    kicker: "Protocol stack",
    title: "Application, wallet, and chain services.",
    text: "Layers of a digital-asset product. Not a coin, and not a client deployment.",
  },
  finance: {
    kicker: "Simulated desk",
    title: "A trading interface drawn as software.",
    text: "Prototype only. Prices, orders, and positions on this page are not live.",
  },
  cloud: {
    kicker: "Runtime map",
    title: "Request, service, pipeline, observation.",
    text: "How a product stays deployable after the first screen exists.",
  },
  data: {
    kicker: "Data path",
    title: "From source systems to a view someone can trust.",
    text: "An illustrative pipeline. Definitions stay with the business that owns them.",
  },
  security: {
    kicker: "Protection layers",
    title: "Identity, policy, and a recorded decision.",
    text: "Security drawn as structure. Not a lock icon, and not a certificate.",
  },
};

export function FamilyVisual({
  family,
  compact = false,
}: {
  family: string;
  compact?: boolean;
}) {
  const key: VisualFamily = (families as readonly string[]).includes(family) ? (family as VisualFamily) : "product";
  const copy = captions[key];
  const uid = useId().replace(/:/g, "");
  return (
    <figure className={`visual-stage family-${key}${compact ? " is-compact" : ""}`}>
      <svg viewBox="0 0 720 480" preserveAspectRatio={compact ? "xMidYMid slice" : "xMidYMid meet"} role="img" aria-label={`${copy.title} ${copy.text}`}>
        <title>{copy.title}</title>
        {key === "ai" ? <AiScene id={uid} /> : null}
        {key === "product" ? <ProductScene /> : null}
        {key === "web3" ? <Web3Scene id={uid} /> : null}
        {key === "finance" ? <FinanceScene /> : null}
        {key === "cloud" ? <CloudScene /> : null}
        {key === "data" ? <DataScene /> : null}
        {key === "security" ? <SecurityScene /> : null}
      </svg>
      {compact ? null : (
        <figcaption>
          <span>{copy.kicker}</span>
          {copy.text}
        </figcaption>
      )}
    </figure>
  );
}

export function SystemFlow({ family }: { family: string }) {
  const key: VisualFamily = (families as readonly string[]).includes(family) ? (family as VisualFamily) : "product";
  const steps = systemFlows[key];
  return (
    <figure className={`system-flow family-${key}`}>
      <ol>
        {steps.map((step, index) => (
          <li key={step.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <em>{step.note}</em>
          </li>
        ))}
      </ol>
      <figcaption>Illustrative system. Not a completed client architecture.</figcaption>
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

function AiScene({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3c3658" />
          <stop offset="100%" stopColor="#24283c" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="62%" cy="38%" r="48%">
          <stop offset="0%" stopColor="#a99aff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#73dfd0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#24283c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="720" height="480" fill={`url(#${id}-bg)`} />
      <rect width="720" height="480" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 7 }, (_, index) => (
        <path key={index} d={`M40 ${90 + index * 52} C 180 ${40 + index * 36}, 360 ${160 + index * 28}, 680 ${70 + index * 48}`} fill="none" stroke={index % 2 ? "#73dfd0" : "#c6bcff"} strokeOpacity={0.28 + (index % 3) * 0.12} strokeWidth={index === 3 ? 2.4 : 1.2} />
      ))}
      <circle cx="250" cy="168" r="46" fill="#73dfd0" fillOpacity="0.16" stroke="#73dfd0" />
      <circle cx="430" cy="210" r="72" fill="#a99aff" fillOpacity="0.2" stroke="#f4f0ff" strokeOpacity="0.45" />
      <circle cx="560" cy="150" r="18" fill="#ff987e" />
      <text x="214" y="173" fill="#f4f0ff" fontSize="14">Sources</text>
      <text x="386" y="206" fill="#f4f0ff" fontSize="16">Review</text>
      <text x="538" y="155" fill="#201f32" fontSize="12">Act</text>
      <rect x="78" y="300" width="250" height="120" rx="18" fill="#201f32" fillOpacity="0.72" stroke="#c6bcff" strokeOpacity="0.4" />
      <text x="100" y="340" fill="#73dfd0" fontSize="13" letterSpacing="1.6">CITED ANSWER</text>
      <text x="100" y="372" fill="#f4f0ff" fontSize="20">Passage, or a refusal</text>
      <text x="100" y="398" fill="#c0bed0" fontSize="14">A person confirms the change</text>
    </g>
  );
}

function ProductScene() {
  return (
    <g>
      <rect width="720" height="480" fill="#312e48" />
      <rect x="36" y="48" width="460" height="300" rx="22" fill="#201f32" transform="skewY(-4)" />
      <rect x="70" y="78" width="400" height="250" rx="16" fill="#3d3958" />
      <rect x="70" y="78" width="400" height="36" fill="#494762" />
      <circle cx="92" cy="96" r="5" fill="#ff987e" />
      <circle cx="110" cy="96" r="5" fill="#73dfd0" />
      <text x="128" y="101" fill="#f4f0ff" fontSize="13">Workspace</text>
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} x={110 + bar * 62} y={250 - bar * 16} width="28" height={70 + bar * 16} rx="6" fill={bar === 3 ? "#73dfd0" : "#a99aff"} fillOpacity={bar === 3 ? 1 : 0.45} />
      ))}
      <g transform="translate(470 70)">
        <rect width="210" height="360" rx="32" fill="#201f32" stroke="#c6bcff" strokeOpacity="0.35" />
        <rect x="22" y="36" width="166" height="28" rx="14" fill="#494762" />
        <rect x="22" y="84" width="166" height="110" rx="16" fill="#73dfd0" fillOpacity="0.16" />
        <text x="38" y="132" fill="#f4f0ff" fontSize="18">Today</text>
        <text x="38" y="156" fill="#c6bcff" fontSize="13">Queue · scoped</text>
        <rect x="22" y="214" width="166" height="52" rx="12" fill="#39364f" />
        <rect x="22" y="278" width="166" height="52" rx="12" fill="#39364f" />
      </g>
      <text x="48" y="40" fill="#c6bcff" fontSize="13" letterSpacing="1.8">PRODUCT SURFACES</text>
    </g>
  );
}

function Web3Scene({ id }: { id: string }) {
  const layers = [
    { y: 70, label: "Application", fill: "#55516f" },
    { y: 150, label: "Wallet", fill: "#3f4d5c" },
    { y: 230, label: "Contracts", fill: "#4a3d62" },
    { y: 310, label: "Chain read", fill: "#34324c" },
    { y: 390, label: "Monitor", fill: "#2c3c44" },
  ];
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-glow`} cx="72%" cy="30%" r="42%">
          <stop offset="0%" stopColor="#ff987e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#292a3d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="720" height="480" fill="#2a2740" />
      <rect width="720" height="480" fill={`url(#${id}-glow)`} />
      {layers.map((layer) => (
        <g key={layer.label}>
          <path d={`M90 ${layer.y + 34} L300 ${layer.y} L640 ${layer.y + 22} L560 ${layer.y + 78} L140 ${layer.y + 86} Z`} fill={layer.fill} stroke="#c6bcff" strokeOpacity="0.45" />
          <text x="160" y={layer.y + 52} fill="#f4f0ff" fontSize="18">{layer.label}</text>
        </g>
      ))}
      <polygon points="470,96 540,132 516,210 430,198 422,128" fill="#73dfd0" fillOpacity="0.25" stroke="#73dfd0" />
      <text x="48" y="42" fill="#ff987e" fontSize="13" letterSpacing="1.8">PROTOCOL</text>
    </g>
  );
}

function FinanceScene() {
  const candles = [40, 70, 48, 90, 60, 110, 76, 96, 64, 120, 88, 70];
  return (
    <g>
      <rect width="720" height="480" fill="#243044" />
      <rect x="24" y="56" width="470" height="320" rx="18" fill="#201f32" />
      <text x="48" y="40" fill="#73dfd0" fontSize="13" letterSpacing="1.8">SIMULATED DESK</text>
      <text x="470" y="40" fill="#c0bed0" fontSize="13">Not live market data</text>
      <path d="M56 300 C 110 250, 160 270, 210 210 S 300 120, 450 150" stroke="#ff987e" fill="none" strokeWidth="3" />
      {candles.map((height, index) => (
        <rect key={`${height}-${index}`} x={64 + index * 32} y={310 - height} width="12" height={height} rx="3" fill={index % 3 === 0 ? "#ff987e" : "#73dfd0"} />
      ))}
      <rect x="510" y="56" width="186" height="320" rx="18" fill="#39364f" />
      {["Accepted", "Working", "Rejected", "Disconnected"].map((state, index) => (
        <g key={state}>
          <text x="530" y={110 + index * 70} fill="#f4f0ff" fontSize="16">{state}</text>
          <rect x="530" y={122 + index * 70} width={140 - index * 22} height="8" rx="4" fill={index === 2 ? "#ff987e" : "#a99aff"} />
        </g>
      ))}
      <text x="48" y="430" fill="#c0bed0" fontSize="15">Price age and a reject stay visible. This is software, not a brokerage.</text>
    </g>
  );
}

function CloudScene() {
  const layers = [
    { label: "Edge", note: "Ingress and identity", fill: "#3f4f62" },
    { label: "Services", note: "The running product", fill: "#494762" },
    { label: "Pipeline", note: "Build, test, release", fill: "#3d3558" },
    { label: "Observe", note: "Logs, metrics, rollback", fill: "#2e3c48" },
  ];
  return (
    <g>
      <rect width="720" height="480" fill="#2c3348" />
      <text x="40" y="46" fill="#73dfd0" fontSize="13" letterSpacing="1.8">INFRASTRUCTURE</text>
      {layers.map((layer, index) => (
        <g key={layer.label} transform={`translate(${70 + index * 28} ${80 + index * 86})`}>
          <path d={`M0 24 L40 0 H${500 - index * 24} L${540 - index * 24} 24 V78 H0 Z`} fill={layer.fill} stroke="#c6bcff" strokeOpacity="0.4" />
          <text x="56" y="40" fill="#f4f0ff" fontSize="22">{layer.label}</text>
          <text x="56" y="64" fill="#c0bed0" fontSize="14">{layer.note}</text>
        </g>
      ))}
    </g>
  );
}

function DataScene() {
  const sources = ["CRM", "Product", "Billing", "Events"];
  return (
    <g>
      <rect width="720" height="480" fill="#322c4a" />
      <text x="36" y="46" fill="#c6bcff" fontSize="13" letterSpacing="1.8">PIPELINE</text>
      {sources.map((source, index) => (
        <g key={source}>
          <rect x="36" y={78 + index * 92} width="170" height="68" rx="16" fill="#494762" />
          <text x="56" y={118 + index * 92} fill="#f4f0ff" fontSize="18">{source}</text>
          <path d={`M206 ${112 + index * 92} C 300 ${112 + index * 92}, 320 240, 380 240`} stroke="#73dfd0" fill="none" strokeWidth="1.6" />
        </g>
      ))}
      <rect x="368" y="150" width="130" height="170" rx="20" fill="#201f32" />
      <text x="392" y="230" fill="#73dfd0" fontSize="14">MODEL</text>
      <text x="392" y="258" fill="#f4f0ff" fontSize="18">Defined</text>
      <rect x="520" y="78" width="168" height="320" rx="20" fill="#201f32" />
      <text x="540" y="114" fill="#ff987e" fontSize="13">ANALYTICS</text>
      {[80, 120, 64, 150, 96].map((height, index) => (
        <rect key={`${height}-${index}`} x={544 + index * 26} y={340 - height} width="16" rx="4" height={height} fill={index === 3 ? "#ff987e" : "#a99aff"} />
      ))}
    </g>
  );
}

function SecurityScene() {
  return (
    <g>
      <rect width="720" height="480" fill="#2a2438" />
      <rect x="48" y="48" width="390" height="384" rx="28" fill="#39364f" fillOpacity="0.35" stroke="#c6bcff" strokeOpacity="0.35" />
      <rect x="96" y="96" width="294" height="288" rx="24" fill="none" stroke="#a99aff" />
      <rect x="144" y="144" width="198" height="192" rx="20" fill="#73dfd0" fillOpacity="0.12" stroke="#73dfd0" />
      <text x="176" y="230" fill="#f4f0ff" fontSize="18">Decision</text>
      <text x="176" y="254" fill="#73dfd0" fontSize="14">Allow or deny</text>
      <text x="64" y="40" fill="#c0bed0" fontSize="14">Perimeter</text>
      {["Request", "Policy", "Record"].map((step, index) => (
        <g key={step} transform={`translate(470 ${78 + index * 120})`}>
          <rect width="210" height="92" rx="18" fill="#201f32" stroke={index === 1 ? "#ff987e" : "#73dfd0"} strokeOpacity="0.7" />
          <text x="22" y="38" fill="#c6bcff" fontSize="13">{String(index + 1).padStart(2, "0")}</text>
          <text x="22" y="66" fill="#f4f0ff" fontSize="22">{step}</text>
        </g>
      ))}
    </g>
  );
}
