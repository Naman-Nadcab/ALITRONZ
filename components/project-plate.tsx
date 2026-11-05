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
      <rect width="640" height="280" rx="20" fill="#20243a" />
      <path d="M0 174 C 112 118, 218 226, 344 146 S 526 72, 640 132 V280 H0 Z" fill={plate.tone} fillOpacity="0.13" />
      {Array.from({ length: 8 }, (_, index) => (
        <path key={index} d={`M${28 + index * 78} 0 V280`} stroke="#f6f4fc" strokeOpacity=".025" />
      ))}
      <rect x="24" y="22" width="592" height="236" rx="16" fill="none" stroke="#f6f4fc" strokeOpacity=".11" />
      <circle cx="42" cy="42" r="3.5" fill="#ff825e" />
      <circle cx="54" cy="42" r="3.5" fill="#d0f28c" />
      <circle cx="66" cy="42" r="3.5" fill="#58dcd1" />
      <path d="M84 42 H278" stroke="#f6f4fc" strokeOpacity="0.2" />
      <text x="38" y="72" fill={plate.tone} fontSize="12" letterSpacing="1.7">{plate.kicker.toUpperCase()}</text>
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
      <rect x="390" y="72" width="202" height="164" rx="15" fill="#181b2d" fillOpacity="0.9" stroke="#f6f4fc" strokeOpacity=".1" />
      <text x="408" y="98" fill={plate.tone} fontSize="10" letterSpacing="1.2">SYSTEM STATUS</text>
      <text x="408" y="124" fill="#f6f4fc" fontSize="16">Concept environment</text>
      {["Interface", "Workflow", "Controls"].map((label, index) => (
        <g key={label} transform={`translate(408 ${144 + index * 25})`}>
          <circle cx="4" cy="4" r="4" fill={index === 1 ? "#ff825e" : plate.tone} />
          <text x="16" y="8" fill="#c7c7d9" fontSize="11">{label}</text>
          <rect x="96" width={72 - index * 12} height="7" rx="3.5" fill={index === 1 ? "#ff825e" : plate.tone} fillOpacity=".65" />
        </g>
      ))}
      <text x="408" y="224" fill="#8f91a8" fontSize="10">SIMULATED / NOT A CLIENT RESULT</text>
    </svg>
  );
}
