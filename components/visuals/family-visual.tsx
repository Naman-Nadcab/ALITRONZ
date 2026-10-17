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
      <svg viewBox="0 0 720 480" role="img" aria-label={`${copy.title} ${copy.text}`}>
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
      <rect width="720" height="480" fill="#0c111a" />
      <radialGradient id={`${id}-glow`} cx="50%" cy="42%" r="45%">
        <stop offset="0%" stopColor="#8173fa" stopOpacity="0.45" />
        <stop offset="55%" stopColor="#73e5f7" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#0c111a" stopOpacity="0" />
      </radialGradient>
      <rect width="720" height="480" fill={`url(#${id}-glow)`} />
      <path d="M120 168C190 120 250 210 360 188C470 166 490 120 590 150" stroke="#73e5f7" strokeOpacity="0.7" fill="none" />
      <path d="M150 330C230 300 280 250 360 210" stroke="#8173fa" fill="none" />
      <path d="M360 230C430 280 480 300 590 300" stroke="#73e5f7" strokeOpacity="0.8" fill="none" />
      <path d="M360 230C340 310 300 360 220 390" stroke="#c9d4e4" strokeOpacity="0.7" fill="none" />
      <path d="M590 168C610 230 600 280 560 320" stroke="#8173fa" fill="none" />
      <Node x={118} y={160} label="Sources" />
      <Node x={150} y={330} label="Retrieve" accent />
      <Node x={360} y={196} label="Orchestrate" large />
      <Node x={592} y={148} label="Tools" />
      <Node x={548} y={328} label="Review" accent />
      <Node x={214} y={392} label="Application" />
      <rect x={430} y={360} width="210" height="72" rx="8" fill="#121a28" stroke="#73e5f7" strokeOpacity="0.45" />
      <text x="448" y="388" fill="#73e5f7" fontSize="13" letterSpacing="1.5">ANSWER</text>
      <text x="448" y="412" fill="#d5deea" fontSize="15">Cited passage · or refusal</text>
    </g>
  );
}

function Node({ x, y, label, large, accent }: { x: number; y: number; label: string; large?: boolean; accent?: boolean }) {
  const r = large ? 28 : 10;
  return (
    <g>
      {large ? <circle cx={x} cy={y} r="54" fill="#73e5f7" fillOpacity="0.12" /> : null}
      <circle cx={x} cy={y} r={r} fill={accent ? "#8173fa" : large ? "#73e5f7" : "#f4f6fa"} />
      <text x={x} y={y + (large ? 48 : 28)} textAnchor="middle" fill="#f4f6fa" fontSize="15">{label}</text>
    </g>
  );
}

function ProductScene() {
  return (
    <g>
      <rect width="720" height="480" fill="#efeae3" />
      <rect x="28" y="36" width="430" height="300" rx="14" fill="#121722" />
      <rect x="28" y="36" width="430" height="42" rx="14" fill="#1b2433" />
      <rect x="28" y="64" width="430" height="14" fill="#1b2433" />
      <circle cx="52" cy="57" r="5" fill="#73e5f7" />
      <circle cx="70" cy="57" r="5" fill="#8173fa" />
      <text x="92" y="62" fill="#d5deea" fontSize="13">Client workspace</text>
      <rect x="28" y="78" width="96" height="258" fill="#101722" />
      <rect x="44" y="100" width="64" height="8" rx="4" fill="#73e5f7" />
      <rect x="44" y="122" width="52" height="8" rx="4" fill="#3a4658" />
      <rect x="44" y="144" width="58" height="8" rx="4" fill="#3a4658" />
      <rect x="44" y="166" width="46" height="8" rx="4" fill="#3a4658" />
      {[0, 1, 2, 3, 4].map((bar) => (
        <rect key={bar} x={150 + bar * 48} y={250 - bar * 18} width="26" height={70 + bar * 18} rx="4" fill={bar === 3 ? "#73e5f7" : "#2a3548"} />
      ))}
      <text x="148" y="120" fill="#9eb0c4" fontSize="13">Active work</text>
      <text x="148" y="148" fill="#f4f6fa" fontSize="28">24 open</text>
      <rect x="470" y="64" width="214" height="360" rx="28" fill="#121722" />
      <rect x="488" y="96" width="178" height="22" rx="11" fill="#1b2433" />
      <rect x="488" y="136" width="178" height="92" rx="12" fill="#1b2433" />
      <text x="504" y="176" fill="#73e5f7" fontSize="13">Mobile</text>
      <text x="504" y="202" fill="#f4f6fa" fontSize="18">Today’s queue</text>
      <rect x="488" y="246" width="178" height="48" rx="10" fill="#172033" />
      <rect x="488" y="306" width="178" height="48" rx="10" fill="#172033" />
      <rect x="250" y="300" width="250" height="132" rx="12" fill="#f7f4ef" stroke="#121722" />
      <text x="270" y="332" fill="#0c6478" fontSize="13" letterSpacing="1.2">API</text>
      <text x="270" y="362" fill="#121722" fontSize="18">GET /work/today</text>
      <text x="270" y="392" fill="#3e4858" fontSize="15">200 · scoped to the user</text>
    </g>
  );
}

function Web3Scene({ id }: { id: string }) {
  const layers = [
    { y: 46, label: "Application", tone: "#d7deea" },
    { y: 128, label: "Wallet", tone: "#73e5f7" },
    { y: 210, label: "Contracts", tone: "#c9bfff" },
    { y: 292, label: "Chain read", tone: "#d7deea" },
    { y: 374, label: "Monitor", tone: "#73e5f7" },
  ];
  return (
    <g>
      <rect width="720" height="480" fill="#0e1018" />
      <radialGradient id={`${id}-glow`} cx="70%" cy="40%" r="40%">
        <stop offset="0%" stopColor="#8173fa" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0e1018" stopOpacity="0" />
      </radialGradient>
      <rect width="720" height="480" fill={`url(#${id}-glow)`} />
      {layers.map((layer) => (
        <g key={layer.label}>
          <path d={`M150 ${layer.y + 28} L340 ${layer.y} L620 ${layer.y + 18} L560 ${layer.y + 72} L188 ${layer.y + 78} Z`} fill="#161b28" stroke={layer.tone} strokeOpacity="0.85" />
          <text x="210" y={layer.y + 48} fill="#f4f6fa" fontSize="16">{layer.label}</text>
        </g>
      ))}
      <path d="M470 78 L520 108 L500 168 L430 158 L424 108 Z" fill="#73e5f7" fillOpacity="0.16" stroke="#73e5f7" />
      <path d="M470 78 L424 108 L430 158" stroke="#f4f6fa" strokeOpacity="0.5" fill="none" />
      <text x="150" y="36" fill="#9eb0c4" fontSize="13" letterSpacing="1.4">PROTOCOL LAYERS</text>
    </g>
  );
}

function FinanceScene() {
  const candles = [40, 70, 48, 90, 60, 110, 76, 96, 64, 120, 88, 70];
  return (
    <g>
      <rect width="720" height="480" fill="#0b0f16" />
      <text x="36" y="42" fill="#73e5f7" fontSize="13" letterSpacing="1.6">SIMULATED INTERFACE</text>
      <text x="520" y="42" fill="#9eb0c4" fontSize="13">Not live market data</text>
      <rect x="28" y="64" width="450" height="300" rx="10" fill="#121826" />
      <text x="48" y="96" fill="#f4f6fa" fontSize="16">Instrument · prototype</text>
      <path d="M48 300 C 90 280, 120 240, 160 250 S 230 180, 270 190 S 340 120, 430 140" stroke="#73e5f7" fill="none" strokeWidth="2" />
      {candles.map((height, index) => (
        <rect key={height + index} x={56 + index * 32} y={300 - height} width="10" height={height} fill={index % 3 === 0 ? "#8173fa" : "#73e5f7"} fillOpacity="0.85" />
      ))}
      <rect x="496" y="64" width="196" height="300" rx="10" fill="#121826" />
      <text x="514" y="96" fill="#9eb0c4" fontSize="13">ORDER STATES</text>
      {["Accepted", "Working", "Rejected", "Disconnected"].map((state, index) => (
        <g key={state}>
          <text x="514" y={140 + index * 52} fill="#f4f6fa" fontSize="16">{state}</text>
          <rect x="514" y={150 + index * 52} width={120 - index * 18} height="6" fill={index === 2 ? "#e7a3a8" : "#73e5f7"} />
        </g>
      ))}
      <rect x="28" y="380" width="664" height="68" rx="10" fill="#121826" />
      <text x="48" y="420" fill="#d5deea" fontSize="16">Price age, source, and a reject stay visible. Nothing here is a live book.</text>
    </g>
  );
}

function CloudScene() {
  const layers = [
    { label: "Edge", note: "Ingress and identity" },
    { label: "Services", note: "The running product" },
    { label: "Pipeline", note: "Build, test, release" },
    { label: "Observe", note: "Logs, metrics, rollback" },
  ];
  return (
    <g>
      <rect width="720" height="480" fill="#f3f1ec" />
      <text x="40" y="48" fill="#0c6478" fontSize="13" letterSpacing="1.5">INFRASTRUCTURE</text>
      {layers.map((layer, index) => (
        <g key={layer.label} transform={`translate(${48 + index * 18} ${78 + index * 88})`}>
          <rect width={520 - index * 10} height="72" rx="8" fill={index % 2 ? "#e7e3ff" : "#ffffff"} stroke="#121722" strokeOpacity="0.18" />
          <circle cx="36" cy="36" r="8" fill={index === 2 ? "#8173fa" : "#0c6478"} />
          <text x="60" y="32" fill="#121722" fontSize="20">{layer.label}</text>
          <text x="60" y="54" fill="#3e4858" fontSize="14">{layer.note}</text>
        </g>
      ))}
      <path d="M600 120 V390" stroke="#8173fa" strokeDasharray="4 6" />
      <text x="560" y="430" fill="#3e4858" fontSize="14">Deploy path</text>
    </g>
  );
}

function DataScene() {
  const sources = ["CRM", "Product", "Billing", "Events"];
  return (
    <g>
      <rect width="720" height="480" fill="#f4f1fb" />
      <text x="36" y="46" fill="#4c3fd4" fontSize="13" letterSpacing="1.4">PIPELINE</text>
      {sources.map((source, index) => (
        <g key={source}>
          <rect x="36" y={80 + index * 88} width="160" height="64" rx="8" fill="#ffffff" stroke="#121722" strokeOpacity="0.15" />
          <text x="56" y={118 + index * 88} fill="#121722" fontSize="18">{source}</text>
          <path d={`M196 ${112 + index * 88} C 280 ${112 + index * 88}, 300 230, 360 230`} stroke="#8173fa" fill="none" />
        </g>
      ))}
      <rect x="360" y="150" width="120" height="160" rx="12" fill="#121722" />
      <text x="384" y="220" fill="#73e5f7" fontSize="14">MODEL</text>
      <text x="384" y="248" fill="#f4f6fa" fontSize="16">Defined</text>
      <rect x="520" y="80" width="168" height="300" rx="12" fill="#121722" />
      <text x="540" y="116" fill="#73e5f7" fontSize="13">ANALYTICS</text>
      {[80, 120, 64, 150, 96].map((height, index) => (
        <rect key={height} x={544 + index * 26} y={330 - height} width="16" height={height} fill={index === 3 ? "#73e5f7" : "#8173fa"} />
      ))}
    </g>
  );
}

function SecurityScene() {
  return (
    <g>
      <rect width="720" height="480" fill="#0d121b" />
      <rect x="70" y="70" width="360" height="340" rx="18" fill="none" stroke="#d5deea" strokeOpacity="0.35" />
      <rect x="110" y="110" width="280" height="260" rx="16" fill="none" stroke="#8173fa" />
      <rect x="150" y="150" width="200" height="180" rx="14" fill="none" stroke="#73e5f7" />
      <rect x="190" y="196" width="120" height="88" rx="10" fill="#73e5f7" fillOpacity="0.15" stroke="#73e5f7" />
      <text x="214" y="236" fill="#f4f6fa" fontSize="14">Decision</text>
      <text x="214" y="258" fill="#73e5f7" fontSize="13">Allow / deny</text>
      <text x="86" y="58" fill="#9eb0c4" fontSize="14">Perimeter</text>
      <text x="118" y="100" fill="#c9bfff" fontSize="14">Identity</text>
      <text x="158" y="140" fill="#73e5f7" fontSize="14">Application</text>
      <g>
        {["Request", "Policy", "Record"].map((step, index) => (
          <g key={step} transform={`translate(470 ${90 + index * 110})`}>
            <rect width="200" height="78" rx="10" fill="#151c2a" stroke="#73e5f7" strokeOpacity="0.4" />
            <text x="20" y="34" fill="#9eb0c4" fontSize="13">{String(index + 1).padStart(2, "0")}</text>
            <text x="20" y="58" fill="#f4f6fa" fontSize="18">{step}</text>
          </g>
        ))}
      </g>
    </g>
  );
}
