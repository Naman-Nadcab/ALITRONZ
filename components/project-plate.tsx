type PlateKind = "assistant" | "copilot" | "portal" | "console" | "architecture" | "terminal" | "workstation" | "admin" | "analytics" | "observability";

type Theme = { bgA: string; bgB: string; accent: string; second: string; third: string; warm: string };

const themes: Record<string, Theme> = {
  ai: { bgA: "#2a1f5a", bgB: "#1a2244", accent: "#866cff", second: "#61ded5", third: "#b5a4ff", warm: "#ff8b75" },
  product: { bgA: "#1b2a56", bgB: "#262443", accent: "#72a4ff", second: "#ff8b75", third: "#b5a4ff", warm: "#f4c879" },
  web3: { bgA: "#113a44", bgB: "#1f2a52", accent: "#3cb9a8", second: "#866cff", third: "#61ded5", warm: "#ff8b75" },
  finance: { bgA: "#13264d", bgB: "#242744", accent: "#4f7dff", second: "#ff8b75", third: "#72a4ff", warm: "#f4c879" },
  cloud: { bgA: "#122f48", bgB: "#1b2a52", accent: "#61ded5", second: "#72a4ff", third: "#bfe98c", warm: "#ff8b75" },
  data: { bgA: "#291f56", bgB: "#1f3147", accent: "#866cff", second: "#bfe98c", third: "#72a4ff", warm: "#ff8b75" },
};

const plates: Record<string, { kind: PlateKind; theme: Theme; title: string; label: string }> = {
  "operations-knowledge-assistant": { kind: "assistant", theme: themes.ai, title: "Operations assistant", label: "Concept · simulated data" },
  "enterprise-ai-knowledge-copilot": { kind: "copilot", theme: themes.ai, title: "Knowledge copilot", label: "Concept · simulated data" },
  "client-portal-and-mobile": { kind: "portal", theme: themes.product, title: "Client portal", label: "Concept · simulated data" },
  "saas-administration-platform": { kind: "admin", theme: themes.product, title: "Tenant administration", label: "Concept · simulated data" },
  "digital-asset-operations-console": { kind: "console", theme: themes.web3, title: "Asset operations console", label: "Concept · simulated data" },
  "digital-asset-platform-architecture": { kind: "architecture", theme: themes.web3, title: "Platform architecture", label: "Concept · architecture sketch" },
  "forex-trading-terminal-prototype": { kind: "terminal", theme: themes.finance, title: "Dealing terminal", label: "Prototype · simulated feed" },
  "multi-market-trading-workstation": { kind: "workstation", theme: themes.finance, title: "Multi-market workstation", label: "Concept · simulated feed" },
  "realtime-data-dashboard": { kind: "analytics", theme: themes.data, title: "Operations intelligence", label: "Concept · simulated data" },
  "deployment-observability-demonstrator": { kind: "observability", theme: themes.cloud, title: "Release and observability", label: "Demonstration · sample signals" },
};

export function ProjectPlate({ slug, title }: { slug: string; title?: string }) {
  const plate = plates[slug] ?? { kind: "admin" as PlateKind, theme: themes.product, title: "Concept interface", label: "Concept · simulated data" };
  const theme = plate.theme;
  const gradientId = `plate-${slug.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg className="project-plate" viewBox="0 0 640 400" role="img" aria-label={`${title ?? plate.title} interface mock-up. ${plate.label}.`}>
      <title>{`${title ?? plate.title} — ${plate.label}`}</title>
      <defs>
        <linearGradient id={`${gradientId}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bgA} />
          <stop offset="100%" stopColor={theme.bgB} />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx="85%" cy="10%" r="60%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={theme.bgB} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" rx="22" fill={`url(#${gradientId}-bg)`} />
      <rect width="640" height="400" rx="22" fill={`url(#${gradientId}-glow)`} />
      <g transform="translate(28 30)">
        <Window width="584" height="340" title={plate.title} theme={theme} />
        <g transform="translate(0 34)">
          {plate.kind === "assistant" ? <Assistant theme={theme} /> : null}
          {plate.kind === "copilot" ? <Copilot theme={theme} /> : null}
          {plate.kind === "workstation" ? <Workstation theme={theme} areaId={`${gradientId}-area`} /> : null}
          {plate.kind === "portal" ? <Portal theme={theme} /> : null}
          {plate.kind === "console" ? <Console theme={theme} /> : null}
          {plate.kind === "architecture" ? <Architecture theme={theme} /> : null}
          {plate.kind === "terminal" ? <Terminal theme={theme} areaId={`${gradientId}-area`} /> : null}
          {plate.kind === "admin" ? <Admin theme={theme} /> : null}
          {plate.kind === "analytics" ? <Analytics theme={theme} areaId={`${gradientId}-area`} /> : null}
          {plate.kind === "observability" ? <Observability theme={theme} /> : null}
        </g>
      </g>
      <g transform="translate(28 378)">
        <rect width="150" height="16" rx="8" fill="#0b0e1e" fillOpacity="0.72" />
        <text x="75" y="11" fill="#d7d8ea" fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="1.3">{plate.label.toUpperCase()}</text>
      </g>
    </svg>
  );
}

function Window({ width, height, title, theme }: { width: string; height: string; title: string; theme: Theme }) {
  return (
    <g>
      <rect width={width} height={height} rx="14" fill="#0f1327" fillOpacity="0.92" stroke="#f7f6ff" strokeOpacity="0.14" />
      <path d={`M0 34 H${width}`} stroke="#f7f6ff" strokeOpacity="0.1" />
      <circle cx="20" cy="17" r="4" fill={theme.warm} />
      <circle cx="34" cy="17" r="4" fill={theme.third} />
      <circle cx="48" cy="17" r="4" fill={theme.second} />
      <rect x="70" y="9" width="190" height="16" rx="8" fill="#f7f6ff" fillOpacity="0.06" />
      <text x="80" y="20" fill="#c6c8dc" fontSize="9.5">{title.toLowerCase().replace(/\s+/g, "-")}.alitroz.app</text>
      <text x={Number(width) - 16} y="21" fill="#8d90aa" fontSize="9" textAnchor="end">{title}</text>
    </g>
  );
}

function Sidebar({ items, active, theme, width = 126, height = 306 }: { items: string[]; active: number; theme: Theme; width?: number; height?: number }) {
  return (
    <g>
      <rect width={width} height={height} fill="#f7f6ff" fillOpacity="0.035" />
      {items.map((item, index) => (
        <g key={item} transform={`translate(12 ${16 + index * 28})`}>
          <rect width={width - 24} height="22" rx="7" fill={index === active ? theme.accent : "transparent"} fillOpacity="0.28" />
          <circle cx="12" cy="11" r="3" fill={index === active ? theme.second : "#6d7290"} />
          <text x="24" y="14.5" fill={index === active ? "#f7f6ff" : "#a4a7bf"} fontSize="10">{item}</text>
        </g>
      ))}
    </g>
  );
}

function Assistant({ theme }: { theme: Theme }) {
  return (
    <g>
      <Sidebar theme={theme} active={0} items={["Ask", "Sources", "Approvals", "Evaluation", "Audit log"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Operations assistant</text>
        <text y="24" fill="#8d90aa" fontSize="9">Answers only from approved sources · model behind adapter</text>
        <g transform="translate(140 42)">
          <rect width="282" height="36" rx="12" fill="#f7f6ff" fillOpacity="0.08" />
          <text x="14" y="15" fill="#8d90aa" fontSize="8.5" letterSpacing="1">M. OKAFOR · 09:41</text>
          <text x="14" y="28" fill="#f7f6ff" fontSize="10.5">How do we handle a chargeback after a partial refund?</text>
        </g>
        <g transform="translate(0 92)">
          <rect width="330" height="98" rx="12" fill={theme.accent} fillOpacity="0.16" stroke={theme.accent} strokeOpacity="0.5" />
          <text x="14" y="16" fill={theme.second} fontSize="8.5" letterSpacing="1">ASSISTANT · CITED FROM 2 SOURCES</text>
          <text x="14" y="34" fill="#f7f6ff" fontSize="10.5">Apply Procedure 7.3: reverse the remaining balance,</text>
          <text x="14" y="48" fill="#f7f6ff" fontSize="10.5">attach the dispute reference, and queue for finance review.</text>
          <rect x="14" y="60" width="118" height="14" rx="7" fill="#f7f6ff" fillOpacity="0.12" />
          <text x="22" y="70" fill="#d7d8ea" fontSize="8.5">payments-procedures.pdf §7.3</text>
          <rect x="138" y="60" width="92" height="14" rx="7" fill="#f7f6ff" fillOpacity="0.12" />
          <text x="146" y="70" fill="#d7d8ea" fontSize="8.5">ticket #20931</text>
          <text x="14" y="90" fill="#8d90aa" fontSize="8.5">Confidence shown as source coverage, not a probability.</text>
        </g>
        <g transform="translate(0 200)">
          <rect width="422" height="72" rx="12" fill="#0b0e1e" stroke={theme.warm} strokeOpacity="0.55" />
          <text x="14" y="18" fill={theme.warm} fontSize="8.5" letterSpacing="1">PROPOSED ACTION · NEEDS APPROVAL</text>
          <text x="14" y="36" fill="#f7f6ff" fontSize="10.5">Update ticket #20931 → status “Finance review”, assignee: Payments desk</text>
          <rect x="14" y="46" width="74" height="18" rx="9" fill={theme.second} />
          <text x="51" y="58" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">Approve</text>
          <rect x="94" y="46" width="60" height="18" rx="9" fill="none" stroke="#f7f6ff" strokeOpacity="0.3" />
          <text x="124" y="58" fill="#d7d8ea" fontSize="9" textAnchor="middle">Reject</text>
          <text x="408" y="58" fill="#8d90aa" fontSize="8.5" textAnchor="end">Logged with sources</text>
        </g>
      </g>
    </g>
  );
}

function Portal({ theme }: { theme: Theme }) {
  const bars = [30, 44, 38, 56, 50, 68, 62, 76];
  return (
    <g>
      <Sidebar theme={theme} active={1} items={["Overview", "Statements", "Documents", "Requests", "Support"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Statements</text>
        <text y="24" fill="#8d90aa" fontSize="9">Same account, same permissions, on web and mobile</text>
        {[
          ["Balance", "€ 48,210.40", theme.accent],
          ["Open requests", "3", theme.second],
          ["Documents", "128", theme.third],
        ].map(([label, value, color], index) => (
          <g key={label} transform={`translate(${index * 96} 38)`}>
            <rect width="88" height="52" rx="10" fill="#f7f6ff" fillOpacity="0.06" />
            <text x="10" y="18" fill="#9ea1ba" fontSize="8.5">{label}</text>
            <text x="10" y="40" fill={color} fontSize="15" fontWeight="700">{value}</text>
          </g>
        ))}
        <rect y="102" width="280" height="150" rx="12" fill="#f7f6ff" fillOpacity="0.05" />
        <text x="14" y="122" fill="#f7f6ff" fontSize="10.5" fontWeight="700">Monthly activity</text>
        {bars.map((bar, index) => (
          <rect key={`${bar}-${index}`} x={14 + index * 32} y={236 - bar} width="20" height={bar} rx="5" fill={index === 7 ? theme.second : theme.accent} fillOpacity={index === 7 ? 1 : 0.7} />
        ))}
      </g>
      <g transform="translate(452 10)">
        <rect width="122" height="280" rx="20" fill="#0b0e1e" stroke={theme.third} strokeOpacity="0.55" />
        <rect x="40" y="10" width="42" height="5" rx="2.5" fill="#2b3052" />
        <text x="14" y="42" fill="#9ea1ba" fontSize="8">GOOD MORNING</text>
        <text x="14" y="60" fill="#f7f6ff" fontSize="13" fontWeight="700">Alex</text>
        <rect x="14" y="72" width="94" height="52" rx="10" fill={theme.accent} fillOpacity="0.28" />
        <text x="24" y="90" fill="#d7d8ea" fontSize="8">Balance</text>
        <text x="24" y="110" fill="#f7f6ff" fontSize="13" fontWeight="700">€ 48,210</text>
        {["Upload document", "Request statement", "Message adviser"].map((item, index) => (
          <g key={item} transform={`translate(14 ${136 + index * 40})`}>
            <rect width="94" height="30" rx="9" fill="#f7f6ff" fillOpacity="0.07" />
            <circle cx="14" cy="15" r="5" fill={index === 0 ? theme.second : theme.third} fillOpacity="0.8" />
            <text x="26" y="18.5" fill="#d7d8ea" fontSize="8">{item}</text>
          </g>
        ))}
        <rect x="42" y="266" width="38" height="4" rx="2" fill="#2b3052" />
      </g>
    </g>
  );
}

function Console({ theme }: { theme: Theme }) {
  const rows = [
    ["Treasury · ops", "0x8a2f…c41e", "1,250,000.00", "2 of 3 signed"],
    ["Settlement v2", "0x19b0…77d2", "480,200.00", "Awaiting signer"],
    ["Fee collector", "0xe4c1…0a98", "12,480.55", "Confirmed"],
    ["Bridge escrow", "0x5d7e…b310", "96,000.00", "Confirmed"],
  ];
  return (
    <g>
      <Sidebar theme={theme} active={2} items={["Overview", "Wallets", "Signatures", "Contracts", "Events", "Alerts"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Pending signatures</text>
        <text y="24" fill="#8d90aa" fontSize="9">Client-held keys · Alitroz never custodies funds</text>
        <g transform="translate(0 36)">
          {["Account", "Address", "Amount", "State"].map((header, index) => (
            <text key={header} x={[0, 108, 196, 290][index]} y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">{header.toUpperCase()}</text>
          ))}
          {rows.map((row, index) => (
            <g key={row[1]} transform={`translate(0 ${22 + index * 30})`}>
              <rect x="-10" width="316" height="26" rx="7" fill={index === 0 ? theme.accent : "#f7f6ff"} fillOpacity={index === 0 ? 0.16 : 0.035} />
              <text y="17" fill="#f7f6ff" fontSize="9.5">{row[0]}</text>
              <text x="108" y="17" fill="#c6c8dc" fontSize="9.5">{row[1]}</text>
              <text x="196" y="17" fill="#f7f6ff" fontSize="9.5">{row[2]}</text>
              <text x="290" y="17" fill={index < 2 ? theme.warm : theme.third} fontSize="9.5" textAnchor="end" transform="translate(16 0)">{row[3]}</text>
            </g>
          ))}
        </g>
        <g transform="translate(0 180)">
          <rect width="306" height="80" rx="12" fill="#f7f6ff" fillOpacity="0.05" />
          <text x="12" y="18" fill="#8d90aa" fontSize="8.5" letterSpacing="1">NETWORK</text>
          {[
            ["Mainnet", "block 18,204,311", theme.third],
            ["Indexer lag", "2 blocks", theme.second],
            ["RPC", "primary · healthy", theme.third],
          ].map(([label, value, color], index) => (
            <g key={label} transform={`translate(12 ${30 + index * 15})`}>
              <circle cx="4" cy="4" r="3" fill={color} />
              <text x="14" y="7.5" fill="#d7d8ea" fontSize="9">{label}</text>
              <text x="150" y="7.5" fill="#f7f6ff" fontSize="9">{value}</text>
            </g>
          ))}
        </g>
      </g>
      <g transform="translate(470 18)">
        <rect width="104" height="250" rx="12" fill="#0b0e1e" stroke={theme.accent} strokeOpacity="0.5" />
        <text x="12" y="20" fill={theme.second} fontSize="8.5" letterSpacing="1">SIGN REQUEST</text>
        <text x="12" y="40" fill="#f7f6ff" fontSize="10" fontWeight="700">Treasury · ops</text>
        <text x="12" y="54" fill="#9ea1ba" fontSize="8.5">transfer(to, amount)</text>
        {[
          ["To", "0x41a…9f0"],
          ["Amount", "1,250,000"],
          ["Policy", "2 of 3"],
          ["Expires", "14:00 UTC"],
        ].map(([label, value], index) => (
          <g key={label} transform={`translate(12 ${70 + index * 24})`}>
            <text y="8" fill="#9ea1ba" fontSize="8.5">{label}</text>
            <text y="19" fill="#f7f6ff" fontSize="9">{value}</text>
          </g>
        ))}
        <rect x="12" y="176" width="80" height="20" rx="10" fill={theme.accent} />
        <text x="52" y="189.5" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">Sign (2/3)</text>
        <rect x="12" y="204" width="80" height="20" rx="10" fill="none" stroke="#f7f6ff" strokeOpacity="0.3" />
        <text x="52" y="217.5" fill="#d7d8ea" fontSize="9" textAnchor="middle">Reject</text>
        <text x="12" y="240" fill="#8d90aa" fontSize="7.5">Hardware key required</text>
      </g>
    </g>
  );
}

function Architecture({ theme }: { theme: Theme }) {
  const layers = [
    { y: 14, label: "dApp interface", note: "Web and mobile · prepares transactions", color: theme.third },
    { y: 78, label: "Signing boundary", note: "Client-held keys · hardware policy", color: theme.warm },
    { y: 142, label: "Smart contracts", note: "Settlement · registry · fee module", color: theme.accent },
    { y: 206, label: "Indexer and events", note: "Chain events into a queryable store", color: theme.second },
  ];
  return (
    <g transform="translate(24 10)">
      <text y="2" fill="#8d90aa" fontSize="8.5" letterSpacing="1" transform="translate(0 -2)">
        ARCHITECTURE · CLIENT OPERATES THE SYSTEM
      </text>
      {layers.map((layer, index) => (
        <g key={layer.label} transform={`translate(${index * 18} ${layer.y + 10})`}>
          <path d="M0 22 L44 0 H330 L374 22 V54 H0 Z" fill={layer.color} fillOpacity="0.16" stroke={layer.color} strokeOpacity="0.75" />
          <text x="56" y="28" fill="#f7f6ff" fontSize="12" fontWeight="700">{layer.label}</text>
          <text x="56" y="44" fill="#d7d8ea" fontSize="9.5">{layer.note}</text>
        </g>
      ))}
      <path d="M200 58 V88 M218 122 V152 M236 186 V216" stroke="#f7f6ff" strokeOpacity="0.5" strokeDasharray="3 4" />
      <g transform="translate(410 20)">
        <rect width="126" height="236" rx="12" fill="#0b0e1e" stroke="#f7f6ff" strokeOpacity="0.14" />
        <text x="12" y="20" fill={theme.second} fontSize="8.5" letterSpacing="1">CHAIN NETWORK</text>
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={index} transform={`translate(${22 + (index % 2) * 48} ${40 + index * 34})`}>
            <polygon points="18,0 36,10 36,30 18,40 0,30 0,10" fill={theme.accent} fillOpacity={index === 2 ? 0.6 : 0.22} stroke={theme.third} strokeOpacity="0.7" />
            {index < 4 ? <path d={`M18 40 L${index % 2 ? -30 : 66} 54`} stroke="#f7f6ff" strokeOpacity="0.35" /> : null}
          </g>
        ))}
        <text x="12" y="226" fill="#8d90aa" fontSize="8">Network chosen by the client</text>
      </g>
      <g transform="translate(24 272)">
        <rect width="378" height="24" rx="8" fill={theme.second} fillOpacity="0.14" stroke={theme.second} strokeOpacity="0.5" />
        <text x="12" y="16" fill="#f7f6ff" fontSize="9.5">Operations dashboard · positions, history, alerts · reads from the indexer</text>
      </g>
    </g>
  );
}

function Terminal({ theme, areaId }: { theme: Theme; areaId: string }) {
  const watch = [
    ["EUR/USD", "1.08421", "1.08429", "+0.12%", true],
    ["GBP/USD", "1.26704", "1.26715", "-0.08%", false],
    ["USD/JPY", "151.218", "151.231", "+0.31%", true],
    ["XAU/USD", "2,318.40", "2,318.95", "-0.22%", false],
    ["US500", "5,204.6", "5,205.1", "+0.44%", true],
  ];
  const candles = [60, 66, 58, 72, 64, 80, 70, 86, 78, 92, 84, 90, 96, 88, 102, 94];
  const blotter = [
    ["#4812", "EUR/USD", "Buy 250k", "Working", theme.third],
    ["#4811", "GBP/USD", "Sell 100k", "Rejected · stale price", theme.warm],
    ["#4810", "XAU/USD", "Buy 20", "Filled (simulated)", theme.second],
  ];
  return (
    <g>
      <rect x="0" y="0" width="584" height="18" fill={theme.warm} fillOpacity="0.16" />
      <text x="292" y="12.5" fill={theme.warm} fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="1.4">SIMULATED FEED · NO LIVE VENUE · NOT A BROKERAGE</text>
      <g transform="translate(12 30)">
        <text y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">WATCHLIST</text>
        {watch.map((row, index) => (
          <g key={String(row[0])} transform={`translate(0 ${20 + index * 24})`}>
            <rect x="-4" width="150" height="20" rx="5" fill={index === 0 ? theme.accent : "#f7f6ff"} fillOpacity={index === 0 ? 0.2 : 0.035} />
            <text y="14" fill="#f7f6ff" fontSize="9.5" fontWeight="700">{row[0]}</text>
            <text x="58" y="14" fill="#d7d8ea" fontSize="9">{row[1]}</text>
            <text x="142" y="14" fill={row[4] ? theme.second : theme.warm} fontSize="8.5" textAnchor="end">{row[3]}</text>
          </g>
        ))}
        <text y="152" fill="#8d90aa" fontSize="8.5" letterSpacing="1">POSITIONS</text>
        {[
          ["EUR/USD", "+250k", "+1,240.50"],
          ["USD/JPY", "-100k", "-312.20"],
        ].map((row, index) => (
          <g key={row[0]} transform={`translate(0 ${162 + index * 20})`}>
            <text y="12" fill="#f7f6ff" fontSize="9">{row[0]}</text>
            <text x="64" y="12" fill="#d7d8ea" fontSize="9">{row[1]}</text>
            <text x="142" y="12" fill={row[2].startsWith("+") ? theme.second : theme.warm} fontSize="9" textAnchor="end">{row[2]}</text>
          </g>
        ))}
        <text y="214" fill="#8d90aa" fontSize="7.5">Simulated P&amp;L for layout only</text>
      </g>
      <g transform="translate(176 30)">
        <rect width="262" height="150" rx="10" fill="#f7f6ff" fillOpacity="0.04" />
        <text x="12" y="18" fill="#f7f6ff" fontSize="11" fontWeight="700">EUR/USD · M15</text>
        <text x="250" y="18" fill={theme.second} fontSize="8.5" textAnchor="end">price age 0.4s · source: fixture</text>
        <path d={`M12 140 ${candles.map((candle, index) => `L${12 + index * 15.5} ${146 - candle}`).join(" ")} L${12 + 15 * 15.5} 140 Z`} fill={`url(#${areaId})`} />
        {candles.map((candle, index) => {
          const up = index % 3 !== 1;
          const height = 10 + (index % 4) * 4;
          return (
            <g key={`${candle}-${index}`}>
              <path d={`M${12 + index * 15.5} ${146 - candle - 8} V${146 - candle + height + 6}`} stroke={up ? theme.second : theme.warm} strokeWidth="1" />
              <rect x={12 + index * 15.5 - 3.5} y={146 - candle} width="7" height={height} rx="1.5" fill={up ? theme.second : theme.warm} />
            </g>
          );
        })}
        <g transform="translate(0 162)">
          <text y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ORDER BLOTTER</text>
          {blotter.map((row, index) => (
            <g key={String(row[0])} transform={`translate(0 ${18 + index * 20})`}>
              <text y="12" fill="#c6c8dc" fontSize="9">{row[0]}</text>
              <text x="40" y="12" fill="#f7f6ff" fontSize="9">{row[1]}</text>
              <text x="104" y="12" fill="#d7d8ea" fontSize="9">{row[2]}</text>
              <text x="262" y="12" fill={String(row[4])} fontSize="9" textAnchor="end">{row[3]}</text>
            </g>
          ))}
        </g>
      </g>
      <g transform="translate(452 30)">
        <rect width="120" height="246" rx="12" fill="#0b0e1e" stroke={theme.accent} strokeOpacity="0.5" />
        <text x="12" y="20" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ORDER TICKET</text>
        <text x="12" y="40" fill="#f7f6ff" fontSize="11" fontWeight="700">EUR/USD</text>
        <rect x="12" y="50" width="46" height="20" rx="6" fill={theme.second} fillOpacity="0.9" />
        <text x="35" y="64" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">BUY</text>
        <rect x="62" y="50" width="46" height="20" rx="6" fill="none" stroke="#f7f6ff" strokeOpacity="0.3" />
        <text x="85" y="64" fill="#d7d8ea" fontSize="9" textAnchor="middle">SELL</text>
        {[
          ["Size", "250,000"],
          ["Type", "Limit"],
          ["Price", "1.08400"],
          ["TIF", "Day"],
        ].map(([label, value], index) => (
          <g key={label} transform={`translate(12 ${84 + index * 28})`}>
            <text y="8" fill="#9ea1ba" fontSize="8.5">{label}</text>
            <rect y="12" width="96" height="14" rx="4" fill="#f7f6ff" fillOpacity="0.07" />
            <text x="6" y="22.5" fill="#f7f6ff" fontSize="9">{value}</text>
          </g>
        ))}
        <rect x="12" y="200" width="96" height="22" rx="11" fill={theme.accent} />
        <text x="60" y="214.5" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">Submit (simulated)</text>
        <text x="12" y="238" fill="#8d90aa" fontSize="7.5">Reject path always visible</text>
      </g>
    </g>
  );
}

function Admin({ theme }: { theme: Theme }) {
  const tenants = [
    ["Tenant A · logistics", "Enterprise", "412 users", "Active"],
    ["Tenant B · healthcare", "Business", "96 users", "Active"],
    ["Tenant C · retail", "Business", "58 users", "Trial · 9 days"],
    ["Tenant D · sandbox", "Starter", "12 users", "Suspended"],
  ];
  return (
    <g>
      <Sidebar theme={theme} active={1} items={["Overview", "Tenants", "Roles", "Billing", "Audit log", "Support"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Tenants</text>
        <text y="24" fill="#8d90aa" fontSize="9">Every row is scoped to its tenant · support view is audited</text>
        <rect x="330" y="-2" width="104" height="22" rx="11" fill={theme.accent} />
        <text x="382" y="12.5" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">+ Invite tenant</text>
        <g transform="translate(0 40)">
          {["Tenant", "Plan", "Seats", "State"].map((header, index) => (
            <text key={header} x={[0, 160, 250, 340][index]} y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">{header.toUpperCase()}</text>
          ))}
          {tenants.map((row, index) => (
            <g key={row[0]} transform={`translate(0 ${22 + index * 30})`}>
              <rect x="-10" width="444" height="26" rx="7" fill="#f7f6ff" fillOpacity={index % 2 ? 0.02 : 0.05} />
              <text y="17" fill="#f7f6ff" fontSize="9.5" fontWeight="700">{row[0]}</text>
              <text x="160" y="17" fill="#c6c8dc" fontSize="9.5">{row[1]}</text>
              <text x="250" y="17" fill="#c6c8dc" fontSize="9.5">{row[2]}</text>
              <rect x="336" y="6" width={row[3].length * 5.4 + 12} height="14" rx="7" fill={row[3] === "Active" ? theme.second : row[3].startsWith("Trial") ? theme.third : theme.warm} fillOpacity="0.2" />
              <text x="342" y="16" fill={row[3] === "Active" ? theme.second : row[3].startsWith("Trial") ? theme.third : theme.warm} fontSize="8.5">{row[3]}</text>
            </g>
          ))}
        </g>
        <g transform="translate(0 186)">
          <rect width="212" height="80" rx="12" fill="#f7f6ff" fillOpacity="0.05" />
          <text x="12" y="18" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ROLE · SUPPORT AGENT</text>
          {["Read tenant records", "Impersonate (audited, 30 min)", "Change billing"].map((permission, index) => (
            <g key={permission} transform={`translate(12 ${30 + index * 15})`}>
              <rect width="10" height="10" rx="3" fill={index < 2 ? theme.second : "transparent"} stroke={theme.second} strokeOpacity="0.7" />
              <text x="16" y="8.5" fill="#d7d8ea" fontSize="9">{permission}</text>
            </g>
          ))}
        </g>
        <g transform="translate(224 186)">
          <rect width="210" height="80" rx="12" fill="#0b0e1e" stroke="#f7f6ff" strokeOpacity="0.14" />
          <text x="12" y="18" fill="#8d90aa" fontSize="8.5" letterSpacing="1">AUDIT LOG</text>
          {["09:41 r.mehta viewed Helix Health", "09:38 role changed · Arbor Retail", "09:20 export denied · policy"].map((entry, index) => (
            <text key={entry} x="12" y={36 + index * 15} fill={index === 2 ? theme.warm : "#d7d8ea"} fontSize="8.5">{entry}</text>
          ))}
        </g>
      </g>
    </g>
  );
}

function Analytics({ theme, areaId }: { theme: Theme; areaId: string }) {
  const line = [40, 52, 48, 66, 60, 74, 70, 86, 80, 92, 88, 104, 98, 110];
  return (
    <g>
      <Sidebar theme={theme} active={0} items={["Live view", "Pipelines", "Definitions", "Alerts", "Exports"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Operations intelligence</text>
        <text y="24" fill="#8d90aa" fontSize="9">Each figure links to its definition and the run that produced it</text>
        {[
          ["Orders / min", "1,284", "+6.2%", theme.accent],
          ["Late events", "0.4%", "stable", theme.second],
          ["Freshness", "38 s", "within SLA", theme.third],
          ["Failed checks", "0", "42 passed", theme.second],
        ].map(([label, value, delta, color], index) => (
          <g key={label} transform={`translate(${index * 108} 38)`}>
            <rect width="100" height="56" rx="10" fill="#f7f6ff" fillOpacity="0.06" />
            <text x="10" y="16" fill="#9ea1ba" fontSize="8.5">{label}</text>
            <text x="10" y="38" fill="#f7f6ff" fontSize="16" fontWeight="700">{value}</text>
            <text x="10" y="50" fill={color} fontSize="8">{delta}</text>
          </g>
        ))}
        <rect y="106" width="276" height="150" rx="12" fill="#f7f6ff" fillOpacity="0.05" />
        <text x="12" y="124" fill="#f7f6ff" fontSize="10.5" fontWeight="700">Throughput · last 60 minutes</text>
        <path d={`M12 246 ${line.map((value, index) => `L${12 + index * 19} ${246 - value * 0.95}`).join(" ")} L${12 + 13 * 19} 246 Z`} fill={`url(#${areaId})`} />
        <path d={line.map((value, index) => `${index === 0 ? "M" : "L"}${12 + index * 19} ${246 - value * 0.95}`).join(" ")} fill="none" stroke={theme.second} strokeWidth="2" />
        <g transform="translate(288 106)">
          <rect width="146" height="150" rx="12" fill="#0b0e1e" stroke="#f7f6ff" strokeOpacity="0.14" />
          <text x="12" y="18" fill="#8d90aa" fontSize="8.5" letterSpacing="1">EVENT STREAM</text>
          {["order.created · 2ms", "order.paid · 4ms", "shipment.booked · 3ms", "order.created · 2ms", "refund.requested · 5ms", "order.paid · 4ms"].map((event, index) => (
            <g key={`${event}-${index}`} transform={`translate(12 ${32 + index * 18})`}>
              <circle cx="3" cy="4" r="3" fill={index === 4 ? theme.warm : theme.second} />
              <text x="12" y="7.5" fill="#d7d8ea" fontSize="8.5">{event}</text>
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}

function Observability({ theme }: { theme: Theme }) {
  const latency = [22, 24, 21, 26, 25, 23, 40, 27, 24, 22, 23, 21];
  return (
    <g>
      <Sidebar theme={theme} active={1} items={["Services", "Releases", "Environments", "Alerts", "Runbooks"]} />
      <g transform="translate(146 18)">
        <text y="10" fill="#f7f6ff" fontSize="12" fontWeight="700">Release 2.14.0 · progressive rollout</text>
        <text y="24" fill="#8d90aa" fontSize="9">Sample signals · demonstration environment, not a client estate</text>
        <g transform="translate(0 38)">
          {[
            ["Dev", "passed", theme.third],
            ["Staging", "passed", theme.third],
            ["Prod · 25%", "watching", theme.second],
            ["Prod · 100%", "pending", "#6d7290"],
          ].map(([stage, state, color], index) => (
            <g key={stage} transform={`translate(${index * 110} 0)`}>
              <rect width="100" height="44" rx="10" fill={color} fillOpacity={index === 2 ? 0.22 : 0.1} stroke={color} strokeOpacity="0.6" />
              <text x="10" y="18" fill="#f7f6ff" fontSize="10" fontWeight="700">{stage}</text>
              <text x="10" y="33" fill={color} fontSize="8.5">{state}</text>
              {index < 3 ? <path d="M100 22 H110" stroke="#f7f6ff" strokeOpacity="0.45" /> : null}
            </g>
          ))}
        </g>
        <g transform="translate(0 96)">
          {[
            ["api-gateway", "p95 212 ms", "ok"],
            ["orders-svc", "p95 180 ms", "ok"],
            ["worker-pool", "queue 1,204", "warn"],
            ["postgres", "replica lag 0.2 s", "ok"],
          ].map(([name, value, state], index) => (
            <g key={name} transform={`translate(${(index % 2) * 142} ${Math.floor(index / 2) * 38})`}>
              <rect width="132" height="32" rx="9" fill="#f7f6ff" fillOpacity="0.05" />
              <circle cx="12" cy="16" r="4" fill={state === "ok" ? theme.third : theme.warm} />
              <text x="24" y="14" fill="#f7f6ff" fontSize="9" fontWeight="700">{name}</text>
              <text x="24" y="26" fill="#c6c8dc" fontSize="8.5">{value}</text>
            </g>
          ))}
        </g>
        <g transform="translate(292 96)">
          <rect width="142" height="70" rx="10" fill="#f7f6ff" fillOpacity="0.05" />
          <text x="10" y="16" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ERROR RATE</text>
          <path d={latency.map((value, index) => `${index === 0 ? "M" : "L"}${10 + index * 11} ${60 - value * 0.9}`).join(" ")} fill="none" stroke={theme.second} strokeWidth="1.8" />
          <circle cx={10 + 6 * 11} cy={60 - 40 * 0.9} r="3" fill={theme.warm} />
          <text x="132" y="28" fill={theme.warm} fontSize="8" textAnchor="end">spike · auto-paused</text>
        </g>
        <g transform="translate(0 182)">
          <rect width="434" height="76" rx="12" fill="#0b0e1e" stroke={theme.warm} strokeOpacity="0.45" />
          <text x="12" y="18" fill={theme.warm} fontSize="8.5" letterSpacing="1">ROLLBACK READY</text>
          <text x="12" y="36" fill="#f7f6ff" fontSize="10">Previous release 2.13.2 retained · database migration is reversible</text>
          <rect x="12" y="46" width="92" height="20" rx="10" fill={theme.warm} />
          <text x="58" y="59.5" fill="#0b0e1e" fontSize="9" fontWeight="800" textAnchor="middle">Roll back now</text>
          <rect x="112" y="46" width="92" height="20" rx="10" fill="none" stroke="#f7f6ff" strokeOpacity="0.3" />
          <text x="158" y="59.5" fill="#d7d8ea" fontSize="9" textAnchor="middle">Continue to 50%</text>
          <text x="422" y="59.5" fill="#8d90aa" fontSize="8.5" textAnchor="end">Decision logged with on-call</text>
        </g>
      </g>
    </g>
  );
}

function Copilot({ theme }: { theme: Theme }) {
  return (
    <g>
      <g transform="translate(0 0)">
        <rect width="356" height="306" fill="#f7f6ff" fillOpacity="0.03" />
        <text x="16" y="22" fill="#8d90aa" fontSize="8.5" letterSpacing="1">HOST APPLICATION · TICKET #20931</text>
        <text x="16" y="44" fill="#f7f6ff" fontSize="13" fontWeight="700">Chargeback after partial refund</text>
        <text x="16" y="60" fill="#a4a7bf" fontSize="9.5">Customer: sample account · Opened 09:12 · Owner: Payments desk</text>
        {[
          ["Status", "Open"],
          ["Amount", "£1,240.50"],
          ["Refund issued", "£600.00 on 3 Nov"],
          ["Dispute ref", "CB-77213"],
        ].map((row, index) => (
          <g key={row[0]} transform={`translate(16 ${78 + index * 24})`}>
            <text y="12" fill="#8d90aa" fontSize="9">{row[0]}</text>
            <text x="110" y="12" fill="#f7f6ff" fontSize="9.5">{row[1]}</text>
          </g>
        ))}
        <rect x="16" y="182" width="324" height="92" rx="10" fill="#f7f6ff" fillOpacity="0.04" stroke="#f7f6ff" strokeOpacity="0.08" />
        <text x="28" y="200" fill="#8d90aa" fontSize="8.5" letterSpacing="1">INTERNAL NOTES</text>
        <text x="28" y="218" fill="#d7d8ea" fontSize="9.5">09:14 — Customer disputes the remaining balance.</text>
        <text x="28" y="234" fill="#d7d8ea" fontSize="9.5">09:31 — Awaiting finance guidance on partial reversals.</text>
        <rect x="28" y="246" width="296" height="18" rx="6" fill={theme.accent} fillOpacity="0.14" stroke={theme.accent} strokeOpacity="0.5" strokeDasharray="3 3" />
        <text x="36" y="258" fill={theme.third} fontSize="9">Draft from copilot (unsaved): apply Procedure 7.3 and queue for finance review</text>
      </g>
      <g transform="translate(368 0)">
        <rect width="216" height="306" fill="#0b0e1e" fillOpacity="0.55" />
        <path d="M0 0 V306" stroke={theme.accent} strokeOpacity="0.6" strokeWidth="2" />
        <text x="14" y="22" fill={theme.second} fontSize="8.5" fontWeight="700" letterSpacing="1.2">COPILOT · YOUR PERMISSIONS</text>
        <rect x="14" y="34" width="188" height="30" rx="10" fill="#f7f6ff" fillOpacity="0.08" />
        <text x="24" y="53" fill="#f7f6ff" fontSize="9.5">Which policy applies to this refund?</text>
        <rect x="14" y="74" width="188" height="120" rx="10" fill={theme.accent} fillOpacity="0.16" stroke={theme.accent} strokeOpacity="0.5" />
        <text x="24" y="92" fill={theme.second} fontSize="8" letterSpacing="1">ANSWER · 2 CITATIONS</text>
        <text x="24" y="108" fill="#f7f6ff" fontSize="9.5">Procedure 7.3 covers partial</text>
        <text x="24" y="121" fill="#f7f6ff" fontSize="9.5">reversals within 30 days. Reverse</text>
        <text x="24" y="134" fill="#f7f6ff" fontSize="9.5">the remaining balance and queue</text>
        <text x="24" y="147" fill="#f7f6ff" fontSize="9.5">the case for finance review.</text>
        <rect x="24" y="156" width="108" height="13" rx="6" fill="#f7f6ff" fillOpacity="0.12" />
        <text x="30" y="165.5" fill="#d7d8ea" fontSize="8">payments-procedures §7.3</text>
        <rect x="136" y="156" width="58" height="13" rx="6" fill="#f7f6ff" fillOpacity="0.12" />
        <text x="142" y="165.5" fill="#d7d8ea" fontSize="8">finance-faq</text>
        <text x="24" y="185" fill="#8d90aa" fontSize="8">Sources limited to Payments and Finance spaces.</text>
        <rect x="14" y="204" width="188" height="48" rx="10" fill="#0b0e1e" stroke={theme.warm} strokeOpacity="0.55" />
        <text x="24" y="220" fill={theme.warm} fontSize="8" letterSpacing="1">DRAFT · NOT SAVED</text>
        <text x="24" y="236" fill="#f7f6ff" fontSize="9">Insert note into ticket</text>
        <rect x="128" y="226" width="64" height="16" rx="8" fill={theme.second} />
        <text x="160" y="237" fill="#0b0e1e" fontSize="8.5" fontWeight="800" textAnchor="middle">Review</text>
        <text x="14" y="276" fill="#8d90aa" fontSize="8">Unanswerable questions are refused and logged.</text>
        <text x="14" y="290" fill="#8d90aa" fontSize="8">Model host behind an adapter.</text>
      </g>
    </g>
  );
}

function Workstation({ theme, areaId }: { theme: Theme; areaId: string }) {
  const markets = [
    ["FX", "EUR/USD", "1.08421", "MT5 bridge", true],
    ["FX", "GBP/JPY", "191.204", "MT5 bridge", true],
    ["Index", "US500", "5,204.6", "LP API", true],
    ["Metal", "XAU/USD", "2,318.40", "LP API", false],
    ["Crypto CFD", "BTC/USD", "64,120", "Vendor API", true],
  ];
  const line = [40, 48, 44, 58, 52, 66, 60, 72, 68, 80, 74, 86, 82, 90];
  const adapters = [
    ["MT5 bridge", "connected · 38 ms", theme.second],
    ["LP API", "connected · 120 ms", theme.second],
    ["Vendor API", "stale 4.2 s · ticket disabled", theme.warm],
  ];
  return (
    <g>
      <rect x="0" y="0" width="584" height="18" fill={theme.warm} fillOpacity="0.16" />
      <text x="292" y="12.5" fill={theme.warm} fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="1.4">SIMULATED FEED · CLIENT-LICENSED ROUTES ONLY · NOT A BROKERAGE</text>
      <g transform="translate(12 30)">
        <text y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">MARKETS · BY SOURCE</text>
        {markets.map((row, index) => (
          <g key={String(row[1])} transform={`translate(0 ${20 + index * 24})`}>
            <rect x="-4" width="196" height="20" rx="5" fill={index === 0 ? theme.accent : "#f7f6ff"} fillOpacity={index === 0 ? 0.2 : 0.035} />
            <text y="14" fill="#8d90aa" fontSize="8">{row[0]}</text>
            <text x="48" y="14" fill="#f7f6ff" fontSize="9.5" fontWeight="700">{row[1]}</text>
            <text x="112" y="14" fill="#d7d8ea" fontSize="9">{row[2]}</text>
            <text x="188" y="14" fill={row[4] ? theme.second : theme.warm} fontSize="7.5" textAnchor="end">{row[3]}</text>
          </g>
        ))}
        <text y="152" fill="#8d90aa" fontSize="8.5" letterSpacing="1">POSITIONS · ALL MARKETS</text>
        {[
          ["EUR/USD", "+250k", "+1,240.50"],
          ["US500", "-5", "-612.00"],
          ["XAU/USD", "+20", "+96.40"],
        ].map((row, index) => (
          <g key={row[0]} transform={`translate(0 ${162 + index * 18})`}>
            <text y="12" fill="#f7f6ff" fontSize="9">{row[0]}</text>
            <text x="80" y="12" fill="#d7d8ea" fontSize="9">{row[1]}</text>
            <text x="188" y="12" fill={row[2].startsWith("+") ? theme.second : theme.warm} fontSize="9" textAnchor="end">{row[2]}</text>
          </g>
        ))}
        <text y="228" fill="#8d90aa" fontSize="7.5">Simulated P&amp;L for layout only</text>
      </g>
      <g transform="translate(222 30)">
        <rect width="350" height="120" rx="10" fill="#f7f6ff" fillOpacity="0.04" />
        <text x="12" y="18" fill="#f7f6ff" fontSize="11" fontWeight="700">EUR/USD · H1 · source MT5 bridge</text>
        <text x="338" y="18" fill={theme.second} fontSize="8.5" textAnchor="end">price age 0.3 s</text>
        <path d={`M12 110 ${line.map((value, index) => `L${12 + index * 24} ${116 - value}`).join(" ")} L${12 + 13 * 24} 110 Z`} fill={`url(#${areaId})`} />
        <path d={line.map((value, index) => `${index === 0 ? "M" : "L"}${12 + index * 24} ${116 - value}`).join(" ")} fill="none" stroke={theme.third} strokeWidth="2" />
        <g transform="translate(0 132)">
          <text y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ADAPTERS</text>
          {adapters.map((row, index) => (
            <g key={row[0]} transform={`translate(${index * 118} 16)`}>
              <rect width="110" height="40" rx="8" fill="#0b0e1e" stroke={row[2]} strokeOpacity="0.55" />
              <circle cx="12" cy="14" r="3.5" fill={row[2]} />
              <text x="22" y="17" fill="#f7f6ff" fontSize="9" fontWeight="700">{row[0]}</text>
              <text x="10" y="31" fill="#c6c8dc" fontSize="7.5">{row[1]}</text>
            </g>
          ))}
        </g>
        <g transform="translate(0 200)">
          <text y="10" fill="#8d90aa" fontSize="8.5" letterSpacing="1">ORDER LOG · RECORDED FOR RECONCILIATION</text>
          {[
            ["#5120", "EUR/USD", "Buy 250k", "MT5 bridge", "Working", theme.third],
            ["#5119", "US500", "Sell 5", "LP API", "Filled (simulated)", theme.second],
            ["#5118", "BTC/USD", "Buy 0.5", "Vendor API", "Blocked · stale price", theme.warm],
          ].map((row, index) => (
            <g key={row[0]} transform={`translate(0 ${18 + index * 18})`}>
              <text y="12" fill="#c6c8dc" fontSize="9">{row[0]}</text>
              <text x="40" y="12" fill="#f7f6ff" fontSize="9">{row[1]}</text>
              <text x="104" y="12" fill="#d7d8ea" fontSize="9">{row[2]}</text>
              <text x="170" y="12" fill="#a4a7bf" fontSize="8.5">{row[3]}</text>
              <text x="350" y="12" fill={row[5]} fontSize="9" textAnchor="end">{row[4]}</text>
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
