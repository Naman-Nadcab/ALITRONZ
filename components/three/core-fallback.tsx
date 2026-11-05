const stack = [
  { label: "Experience layer", fill: "#e9e6ff", stroke: "#b5a4ff", opacity: 0.3 },
  { label: "Application and AI", fill: "#866cff", stroke: "#b5a4ff", opacity: 0.42 },
  { label: "Integration and APIs", fill: "#3cb9a8", stroke: "#61ded5", opacity: 0.4 },
  { label: "Data and infrastructure", fill: "#27335c", stroke: "#72a4ff", opacity: 0.95 },
];

function slab(cx: number, cy: number, w: number, d: number) {
  const hx = w / 2;
  const hy = d / 2;
  return `M${cx - hx} ${cy} L${cx} ${cy - hy} L${cx + hx} ${cy} L${cx} ${cy + hy} Z`;
}

export function CoreFallback() {
  return (
    <div
      className="core-fallback"
      role="img"
      aria-label="The Product Stack, an original Alitroz installation: four layers of an engineered digital product, from the interface panels at the top through application services and integration conduits to the data and infrastructure base."
    >
      <svg viewBox="0 0 760 680" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="stack-metal" x1="200" y1="0" x2="560" y2="0">
            <stop stopColor="#8d94ab" />
            <stop offset=".3" stopColor="#f6f4fc" />
            <stop offset=".6" stopColor="#8c93aa" />
            <stop offset="1" stopColor="#d9e0f2" />
          </linearGradient>
          <radialGradient id="stack-core" cx="0" cy="0" r="1" gradientTransform="translate(420 318) scale(60)">
            <stop stopColor="#f6f4fc" />
            <stop offset=".3" stopColor="#bfe98c" />
            <stop offset=".65" stopColor="#61ded5" />
            <stop offset="1" stopColor="#866cff" stopOpacity="0" />
          </radialGradient>
          <filter id="stack-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="stack-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <ellipse cx="380" cy="622" rx="250" ry="40" fill="#0c1022" opacity=".42" filter="url(#stack-soft)" />
        <circle cx="420" cy="318" r="56" fill="url(#stack-core)" opacity=".7" filter="url(#stack-glow)" />

        {stack.map((layer, index) => {
          const cy = 250 + index * 104;
          return (
            <g key={layer.label}>
              <path d={slab(380, cy + 14, 420, 230)} fill="url(#stack-metal)" opacity=".55" />
              <path d={slab(380, cy, 400, 218)} fill={layer.fill} fillOpacity={layer.opacity} stroke={layer.stroke} strokeOpacity=".8" strokeWidth="1.5" />
            </g>
          );
        })}

        <g stroke="#61ded5" strokeWidth="3" strokeLinecap="round">
          <path d="M268 578 V246" />
          <path d="M268 246 V236" stroke="#ff8b75" />
        </g>
        <path d="M486 474 V332" stroke="#ff8b75" strokeWidth="3" strokeLinecap="round" />
        <path d="M402 586 V352" stroke="#bfe98c" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M330 492 V204" stroke="#b5a4ff" strokeWidth="2.5" strokeLinecap="round" />

        <g fill="#f0eeff" stroke="#b5a4ff" strokeOpacity=".8">
          {[
            [318, 338],
            [364, 318],
            [410, 300],
            [334, 378],
            [430, 350],
            [472, 330],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x} ${y} l20 -10 l20 10 v14 l-20 10 l-20 -10 Z`} />
          ))}
        </g>
        <g fill="none" stroke="#e6e9f7" strokeWidth="5">
          <ellipse cx="312" cy="470" rx="26" ry="12" />
          <ellipse cx="404" cy="436" rx="26" ry="12" />
          <ellipse cx="480" cy="474" rx="26" ry="12" />
        </g>
        <g fill="none" strokeWidth="3">
          <ellipse cx="312" cy="470" rx="14" ry="6.5" stroke="#61ded5" />
          <ellipse cx="404" cy="436" rx="14" ry="6.5" stroke="#ff8b75" />
          <ellipse cx="480" cy="474" rx="14" ry="6.5" stroke="#72a4ff" />
        </g>
        <g fill="#72a4ff" stroke="#bfe98c" strokeWidth="1.5">
          {[
            [320, 560],
            [392, 542],
            [458, 572],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x - 18} y={y - 30} width="36" height="30" fill="#72a4ff" />
              <ellipse cx={x} cy={y - 30} rx="18" ry="7" fill="#9dbdff" />
              <ellipse cx={x} cy={y} rx="18" ry="7" />
            </g>
          ))}
        </g>

        <g className="stack-panel" transform="translate(150 60) rotate(-8 100 60)">
          <rect width="214" height="134" rx="14" fill="#101428" stroke="#f7f6ff" strokeOpacity=".4" />
          <rect width="214" height="22" rx="14" fill="#f7f6ff" fillOpacity=".08" />
          <text x="12" y="15" fill="#c6c8dc" fontSize="9" fontFamily="Manrope, sans-serif">Orders · live</text>
          <text x="12" y="52" fill="#f7f6ff" fontSize="18" fontWeight="700" fontFamily="Manrope, sans-serif">1,284 / min</text>
          <text x="12" y="66" fill="#61ded5" fontSize="8.5" fontFamily="Manrope, sans-serif">+6.2% vs last hour</text>
          {[26, 38, 32, 48, 42, 54, 50, 62, 58, 66].map((bar, index) => (
            <rect key={`${bar}-${index}`} x={12 + index * 19} y={124 - bar} width="12" height={bar} rx="3" fill={index === 9 ? "#61ded5" : "#866cff"} fillOpacity={index === 9 ? 1 : .85} />
          ))}
        </g>
        <g className="stack-panel" transform="translate(430 40) rotate(6 100 60)">
          <rect width="206" height="128" rx="14" fill="#101428" stroke="#f7f6ff" strokeOpacity=".4" />
          <rect width="206" height="22" rx="14" fill="#f7f6ff" fillOpacity=".08" />
          <text x="12" y="15" fill="#c6c8dc" fontSize="9" fontFamily="Manrope, sans-serif">Operations assistant</text>
          <rect x="70" y="32" width="124" height="24" rx="10" fill="#f7f6ff" fillOpacity=".1" />
          <text x="80" y="47" fill="#f7f6ff" fontSize="8" fontFamily="Manrope, sans-serif">Which refund policy applies?</text>
          <rect x="12" y="64" width="160" height="52" rx="10" fill="#866cff" fillOpacity=".28" />
          <text x="22" y="78" fill="#61ded5" fontSize="7" fontWeight="700" fontFamily="Manrope, sans-serif">CITED · 2 SOURCES</text>
          <text x="22" y="92" fill="#f7f6ff" fontSize="8" fontFamily="Manrope, sans-serif">Policy 4.2: pro-rata refund within 30 days.</text>
          <text x="22" y="106" fill="#f7f6ff" fontSize="8" fontFamily="Manrope, sans-serif">A person approves any change.</text>
        </g>
        <g className="stack-panel" transform="translate(596 196) rotate(10 40 80)">
          <rect width="78" height="150" rx="16" fill="#101428" stroke="#f7f6ff" strokeOpacity=".4" />
          <rect x="26" y="8" width="26" height="4" rx="2" fill="#2b3052" />
          <text x="10" y="40" fill="#8d90aa" fontSize="7" fontFamily="Manrope, sans-serif">TODAY</text>
          <text x="10" y="56" fill="#f7f6ff" fontSize="12" fontWeight="700" fontFamily="Manrope, sans-serif">14 tasks</text>
          <rect x="10" y="66" width="58" height="30" rx="8" fill="#61ded5" fillOpacity=".22" />
          <text x="16" y="84" fill="#f7f6ff" fontSize="7.5" fontFamily="Manrope, sans-serif">Approve order</text>
          <rect x="10" y="104" width="58" height="14" rx="6" fill="#f7f6ff" fillOpacity=".1" />
          <rect x="10" y="124" width="58" height="14" rx="6" fill="#f7f6ff" fillOpacity=".1" />
        </g>
      </svg>
    </div>
  );
}
