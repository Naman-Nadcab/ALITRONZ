const families = ["ai", "product", "web3", "finance", "cloud", "data", "security"] as const;
type Family = (typeof families)[number];

const slugFamily: Record<string, Family> = {
  "ai-automation": "ai",
  "digital-product-engineering": "product",
  "web3-blockchain": "web3",
  "financial-trading-technology": "finance",
  "cloud-devops": "cloud",
  "data-engineering": "data",
  cybersecurity: "security",
};

function familyOf(slug: string, figure?: string): Family {
  if (figure && (families as readonly string[]).includes(figure)) return figure as Family;
  return slugFamily[slug] ?? "product";
}

function variant(slug: string) {
  return [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3;
}

export function DivisionFigure({ slug, figure }: { slug: string; figure?: string }) {
  const family = familyOf(slug, figure);
  const mode = variant(slug);
  return (
    <svg viewBox="0 0 320 160" fill="none" role="img" aria-label={`${family} system diagram`}>
      <title>{family} diagram</title>
      {family === "ai" ? <Ai mode={mode} /> : null}
      {family === "product" ? <Product mode={mode} /> : null}
      {family === "web3" ? <Web3 mode={mode} /> : null}
      {family === "finance" ? <Finance mode={mode} /> : null}
      {family === "cloud" ? <Cloud mode={mode} /> : null}
      {family === "data" ? <Data mode={mode} /> : null}
      {family === "security" ? <Security mode={mode} /> : null}
    </svg>
  );
}

function Ai({ mode }: { mode: number }) {
  const shift = mode * 18;
  return (
    <g>
      <circle cx={160} cy={80} r={16 + mode * 2} stroke="#73e5f7" />
      <circle cx={70 + shift} cy={42} r={7} stroke="#aeb8c8" />
      <circle cx={250 - shift} cy={38} r={7} stroke="#aeb8c8" />
      <circle cx={64} cy={122} r={7} stroke="#8173fa" />
      <circle cx={250} cy={118} r={7} stroke="#aeb8c8" />
      <path d={`M${86 + shift} 50 146 74M${232 - shift} 46 174 70M80 114 146 92M232 112 176 92`} stroke="#73e5f7" />
      {mode === 2 ? <path d="M146 74h28" stroke="#8173fa" /> : null}
    </g>
  );
}

function Product({ mode }: { mode: number }) {
  return (
    <g>
      <rect x={36} y={24} width={mode === 1 ? 168 : 148} height={112} stroke="#d5dde8" />
      <path d="M36 48h148" stroke="#aeb8c8" />
      <rect x={mode === 0 ? 196 : 176} y={40} width={92} height={mode === 2 ? 80 : 72} stroke="#73e5f7" />
      <path d="M52 72h72M52 90h48M52 108h60" stroke="#aeb8c8" />
      <path d="M208 68h52M208 86h36" stroke="#73e5f7" />
    </g>
  );
}

function Web3({ mode }: { mode: number }) {
  const y = 78 + mode * 4;
  return (
    <g>
      <path d={`M48 ${y} 92 52 136 ${y} 92 ${y + 26}Z`} stroke="#8173fa" />
      <path d={`M136 ${y} 180 52 224 ${y} 180 ${y + 26}Z`} stroke="#d5dde8" />
      <path d={`M224 ${y} 260 58 292 ${y} 260 ${y + 22}Z`} stroke="#73e5f7" />
      <path d={`M92 ${y + 26} 136 ${y + 48} 180 ${y + 26}`} stroke="#73e5f7" />
      <circle cx={92} cy={y} r={3} fill="#73e5f7" />
      <circle cx={180} cy={y} r={3} fill="#f4f6fa" />
    </g>
  );
}

function Finance({ mode }: { mode: number }) {
  return (
    <g>
      <path d="M36 28v108M36 136h248" stroke="#aeb8c8" />
      <path d={mode === 1 ? "M52 112 90 70 128 96 170 48 214 78 268 36" : "M52 100 96 84 132 108 176 56 220 72 262 44"} stroke="#73e5f7" />
      <rect x={48} y={36} width={mode === 2 ? 70 : 54} height={18} stroke="#d5dde8" />
      <path d="M48 64h36" stroke="#8173fa" />
    </g>
  );
}

function Cloud({ mode }: { mode: number }) {
  const w = 48 + mode * 6;
  return (
    <g>
      <rect x={28} y={62} width={w} height={34} stroke="#d5dde8" />
      <rect x={124} y={62} width={w} height={34} stroke="#73e5f7" />
      <rect x={220} y={62} width={w} height={34} stroke="#d5dde8" />
      <path d={`M${28 + w} 79h${124 - 28 - w}M${124 + w} 79h${220 - 124 - w}`} stroke="#aeb8c8" />
      <path d="M48 40h40M148 40h40M244 40h40" stroke="#8173fa" />
    </g>
  );
}

function Data({ mode }: { mode: number }) {
  return (
    <g>
      <path d="M28 36h64M28 80h64M28 124h64" stroke="#aeb8c8" />
      <path d={mode === 0 ? "M92 36 150 80 92 124M150 80h48" : "M92 36 160 60 92 124M160 60 210 80"} stroke="#73e5f7" />
      <rect x={214} y={mode === 2 ? 40 : 52} width={70} height={56} stroke="#d5dde8" />
      <path d="M226 78h46M226 92h30" stroke="#8173fa" />
    </g>
  );
}

function Security({ mode }: { mode: number }) {
  return (
    <g>
      <rect x={70} y={28} width={180} height={104} stroke="#d5dde8" />
      <rect x={96} y={48} width={128} height={64} stroke="#73e5f7" />
      <path d={mode === 1 ? "M70 28 160 80 250 28" : "M70 132 160 80 250 132"} stroke="#8173fa" />
      <circle cx={160} cy={80} r={mode === 2 ? 8 : 5} fill="#73e5f7" />
    </g>
  );
}
