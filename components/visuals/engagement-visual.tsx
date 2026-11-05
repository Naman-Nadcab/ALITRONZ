type Shape = {
  title: string;
  alitroz: string[];
  client: string[];
  cadence: { label: string; note: string; repeat?: boolean }[];
  summary: string;
};

const shapes: Record<string, Shape> = {
  "product-discovery": {
    title: "Discovery team",
    alitroz: ["Lead engineer", "Product designer", "Architect"],
    client: ["Product owner", "Domain experts"],
    cadence: [
      { label: "Interviews", note: "Constraints and workflows" },
      { label: "Options", note: "Architecture and prototype" },
      { label: "Scope", note: "Written plan and estimate" },
    ],
    summary: "A short, fixed-scope engagement that ends with a written scope and architecture.",
  },
  "end-to-end-product": {
    title: "Product delivery team",
    alitroz: ["Delivery lead", "Engineers", "Designer", "QA"],
    client: ["Product owner", "Stakeholders"],
    cadence: [
      { label: "Discovery", note: "Scope and architecture" },
      { label: "Build", note: "Working increments", repeat: true },
      { label: "Release", note: "Staged deployment" },
      { label: "Handover", note: "Docs and support plan" },
    ],
    summary: "One accountable team from discovery to release, reviewing working software every increment.",
  },
  "dedicated-teams": {
    title: "Embedded team",
    alitroz: ["Tech lead", "Engineers"],
    client: ["Product owner", "Your engineers"],
    cadence: [
      { label: "Onboard", note: "Access, standards, backlog" },
      { label: "Cycle", note: "Plan, build, demo", repeat: true },
      { label: "Review", note: "Capacity and priorities" },
    ],
    summary: "Engineers who work inside your process and tooling, with the roadmap staying yours.",
  },
  "system-integration": {
    title: "Integration team",
    alitroz: ["Integration engineer", "Architect", "QA"],
    client: ["System owners", "IT and security"],
    cadence: [
      { label: "Map", note: "Systems, data, ownership" },
      { label: "Adapters", note: "Contracts and retries" },
      { label: "Staging", note: "End-to-end tests" },
      { label: "Cutover", note: "Monitored switch-over" },
    ],
    summary: "Connecting the systems you already run, with contracts and tests at every boundary.",
  },
  "ongoing-support": {
    title: "Support rota",
    alitroz: ["Maintainer", "On-call engineer"],
    client: ["Operations contact"],
    cadence: [
      { label: "Monitor", note: "Alerts and health checks", repeat: true },
      { label: "Triage", note: "Severity and owner" },
      { label: "Fix", note: "Tested release" },
      { label: "Review", note: "Trends and backlog" },
    ],
    summary: "Monitoring, triage, fixes, and periodic review for software already in production.",
  },
};

const fallback: Shape = shapes["end-to-end-product"];

export function engagementShape(slug: string) {
  return shapes[slug] ?? fallback;
}

const tones = ["#866cff", "#61ded5", "#72a4ff", "#ff8b75", "#f4c879", "#bfe98c"];

function splitLabel(label: string) {
  if (label.length <= 11) return [label];
  const words = label.split(" ");
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function initials(label: string) {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function EngagementVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const shape = engagementShape(slug);
  const id = `engage-${slug}`;
  if (compact) {
    const width = 400;
    const stepW = (width - 32) / shape.cadence.length;
    return (
      <figure className="visual-stage engagement-stage is-compact family-product">
        <svg className="visual-compact" viewBox={`0 0 ${width} 110`} role="img" aria-label={`${shape.title}: ${shape.cadence.map((step) => step.label).join(", then ")}.`}>
          <rect width={width} height="110" rx="18" fill="#1b2040" />
          <text x="16" y="26" fill="#b5a4ff" fontSize="11.5" fontWeight="700" letterSpacing="2">CADENCE</text>
          {shape.cadence.map((step, index) => {
            const x = 16 + index * stepW;
            return (
              <g key={step.label} transform={`translate(${x} 40)`}>
                <rect width={stepW - 8} height="50" rx="12" fill={tones[index % tones.length]} fillOpacity="0.16" stroke={tones[index % tones.length]} strokeOpacity="0.6" />
                <text x="10" y="21" fill="#f7f6ff" fontSize="13" fontWeight="700">{step.label}</text>
                <text x="10" y="38" fill="#c6c8dc" fontSize="10.5">{step.repeat ? "repeats" : `step ${index + 1}`}</text>
              </g>
            );
          })}
        </svg>
      </figure>
    );
  }

  const width = 800;
  const height = 460;
  const cadenceTop = 312;
  const stepW = (width - 52) / shape.cadence.length;
  const avatar = (label: string, index: number, x: number, y: number) => (
    <g key={label} transform={`translate(${x} ${y})`}>
      <circle r="22" fill={tones[index % tones.length]} fillOpacity="0.22" stroke={tones[index % tones.length]} strokeWidth="1.6" />
      <text y="5" fill="#f7f6ff" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="0.5">{initials(label)}</text>
      {splitLabel(label).map((line, lineIndex) => (
        <text key={line} y={44 + lineIndex * 15} fill="#e4e5f3" fontSize="12.5" textAnchor="middle">{line}</text>
      ))}
    </g>
  );
  return (
    <figure className="visual-stage engagement-stage family-product">
      <svg className="visual-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${shape.title}. Alitroz side: ${shape.alitroz.join(", ")}. Your side: ${shape.client.join(", ")}. Cadence: ${shape.cadence.map((step) => step.label).join(", then ")}.`}>
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#242b48" />
            <stop offset="100%" stopColor="#39324f" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} rx="26" fill={`url(#${id}-bg)`} />
        <text x="26" y="48" fill="#b5a4ff" fontSize="13" fontWeight="700" letterSpacing="2.4">TEAM SHAPE · {shape.title.toUpperCase()}</text>
        <text x={width - 26} y="48" fill="#f7f6ff" fillOpacity="0.62" fontSize="13" textAnchor="end">Illustrative shape · scoped per agreement</text>

        <rect x="26" y="70" width={width / 2 - 36} height="170" rx="18" fill="#141830" fillOpacity="0.6" stroke="#f7f6ff" strokeOpacity="0.12" />
        <text x="46" y="98" fill="#c6c8dc" fontSize="12.5" fontWeight="700" letterSpacing="1.6">ALITROZ SIDE</text>
        {shape.alitroz.map((label, index) => avatar(label, index, 46 + 34 + index * ((width / 2 - 36 - 60) / Math.max(shape.alitroz.length, 1)), 160))}

        <rect x={width / 2 + 10} y="70" width={width / 2 - 36} height="170" rx="18" fill="#141830" fillOpacity="0.6" stroke="#f7f6ff" strokeOpacity="0.12" />
        <text x={width / 2 + 30} y="98" fill="#c6c8dc" fontSize="12.5" fontWeight="700" letterSpacing="1.6">YOUR SIDE</text>
        {shape.client.map((label, index) => avatar(label, index + 3, width / 2 + 30 + 34 + index * ((width / 2 - 36 - 60) / Math.max(shape.client.length, 1)), 160))}

        <path d={`M${width / 2 - 10} 155 H${width / 2 + 10}`} stroke="#61ded5" strokeWidth="3" strokeLinecap="round" />
        <text x={width / 2} y="266" fill="#c6c8dc" fontSize="12.5" textAnchor="middle">Shared backlog · shared reviews · one written scope</text>

        <text x="26" y={cadenceTop - 12} fill="#c6c8dc" fontSize="12.5" fontWeight="700" letterSpacing="1.6">CADENCE</text>
        {shape.cadence.map((step, index) => {
          const x = 26 + index * stepW;
          const tone = tones[index % tones.length];
          return (
            <g key={step.label} transform={`translate(${x} ${cadenceTop})`}>
              <rect width={stepW - 10} height="92" rx="16" fill={tone} fillOpacity="0.16" stroke={tone} strokeOpacity="0.65" strokeWidth="1.4" />
              <text x="16" y="28" fill={tone} fontSize="11.5" fontWeight="800" letterSpacing="1.6">{step.repeat ? "REPEATS" : `STEP ${String(index + 1).padStart(2, "0")}`}</text>
              <text x="16" y="54" fill="#f7f6ff" fontSize="17" fontWeight="700" letterSpacing="-0.3">{step.label}</text>
              <text x="16" y="76" fill="#d7d8ea" fontSize="13">{step.note}</text>
              {index < shape.cadence.length - 1 ? <path d={`M${stepW - 10} 46 h10`} stroke="#f7f6ff" strokeOpacity="0.6" strokeWidth="1.8" /> : null}
            </g>
          );
        })}
        <text x="26" y={height - 24} fill="#c6c8dc" fontSize="13">{shape.summary}</text>
      </svg>
      <figcaption>
        <span>Engagement shape</span>
        {shape.title}. Team size, roles, and cadence are agreed in writing before work starts.
      </figcaption>
    </figure>
  );
}
