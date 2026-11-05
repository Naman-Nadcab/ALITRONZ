const plates: Record<string, { kicker: string; tone: string }> = {
  "operations-knowledge-assistant": { kicker: "Operations memory", tone: "#d0f28c" },
  "client-portal-and-mobile": { kicker: "Connected surfaces", tone: "#82a7ff" },
  "digital-asset-operations-console": { kicker: "Asset operations", tone: "#ff927e" },
  "multi-market-trading-workstation": { kicker: "Multi-market states", tone: "#82a7ff" },
  "enterprise-ai-knowledge-copilot": { kicker: "Knowledge field", tone: "#a99aff" },
  "saas-administration-platform": { kicker: "Tenant layers", tone: "#73dfd0" },
  "digital-asset-platform-architecture": { kicker: "Protocol stack", tone: "#ff987e" },
  "forex-trading-terminal-prototype": { kicker: "Simulated desk", tone: "#73dfd0" },
  "realtime-data-dashboard": { kicker: "Realtime signals", tone: "#d0f28c" },
  "deployment-observability-demonstrator": { kicker: "Release telemetry", tone: "#71e6e4" },
};

export function ProjectPlate({ slug }: { slug: string }) {
  const plate = plates[slug] ?? { kicker: "Concept", tone: "#c6bcff" };
  return (
    <svg className="project-plate" viewBox="0 0 640 280" aria-hidden="true">
      <rect width="640" height="280" rx="20" fill="#2c2942" />
      <path d="M0 180 C 120 120, 220 220, 340 150 S 520 80, 640 140 V280 H0 Z" fill={plate.tone} fillOpacity="0.16" />
      <path d="M40 70 H280" stroke="#c6bcff" strokeOpacity="0.45" />
      <text x="40" y="52" fill={plate.tone} fontSize="13" letterSpacing="1.8">{plate.kicker.toUpperCase()}</text>
      {slug.includes("ai") || slug.includes("knowledge") ? (
        <>
          <circle cx="180" cy="150" r="46" fill="#a99aff" fillOpacity="0.35" />
          <circle cx="280" cy="120" r="18" fill="#73dfd0" />
          <circle cx="120" cy="190" r="10" fill="#ff987e" />
          <path d="M120 190 C 160 160, 200 170, 280 120" fill="none" stroke="#f4f0ff" strokeOpacity="0.6" />
        </>
      ) : null}
      {slug.includes("saas") || slug.includes("portal") ? (
        <>
          <rect x="70" y="90" width="220" height="46" rx="10" fill="#494762" />
          <rect x="96" y="118" width="220" height="46" rx="10" fill="#73dfd0" fillOpacity="0.35" />
          <rect x="122" y="146" width="220" height="46" rx="10" fill="#201f32" stroke="#c6bcff" />
        </>
      ) : null}
      {slug.includes("asset") ? (
        <>
          <polygon points="120,200 220,110 340,150 300,220" fill="#ff987e" fillOpacity="0.28" stroke="#ff987e" />
          <polygon points="180,190 250,130 340,160" fill="none" stroke="#f4f0ff" />
        </>
      ) : null}
      {slug.includes("forex") || slug.includes("market") || slug.includes("trading") ? (
        <>
          {[40, 70, 48, 96, 60, 110].map((height, index) => (
            <rect key={`${height}-${index}`} x={80 + index * 36} y={200 - height} width="16" height={height} rx="4" fill={index === 4 ? "#ff987e" : "#73dfd0"} />
          ))}
        </>
      ) : null}
      {slug.includes("data") ? (
        <>
          {[0, 1, 2, 3].map((stream) => (
            <path key={stream} d={`M60 ${96 + stream * 34} C170 ${60 + stream * 42}, 250 ${170 + stream * 12}, 350 ${92 + stream * 38}`} fill="none" stroke={stream % 2 ? "#d0f28c" : "#82a7ff"} strokeWidth={stream === 2 ? 3 : 1.5} />
          ))}
          <circle cx="350" cy="168" r="26" fill="#d0f28c" fillOpacity="0.32" stroke="#d0f28c" />
        </>
      ) : null}
      {slug.includes("deployment") ? (
        <>
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(${62 + row * 92} ${100 + row * 34})`}>
              <rect width="74" height="42" rx="8" fill={row === 1 ? "#71e6e4" : "#494762"} fillOpacity={row === 1 ? 0.38 : 1} stroke="#c8baff" strokeOpacity="0.48" />
              <path d="M74 21 H92" stroke="#71e6e4" />
            </g>
          ))}
          <path d="M56 226 C130 194, 208 236, 338 180" fill="none" stroke="#ff927e" strokeWidth="3" />
        </>
      ) : null}
      <rect x="400" y="70" width="190" height="150" rx="16" fill="#201f32" fillOpacity="0.8" />
      <text x="422" y="110" fill="#f4f0ff" fontSize="16">Concept</text>
      <text x="422" y="140" fill="#c0bed0" fontSize="13">Drawn as software.</text>
      <text x="422" y="164" fill="#c0bed0" fontSize="13">Not a client result.</text>
    </svg>
  );
}
