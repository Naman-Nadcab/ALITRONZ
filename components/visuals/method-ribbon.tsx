const tones = ["#61ded5", "#72a4ff", "#b5a4ff", "#866cff", "#ff8b75", "#bfe98c"];

export function MethodRibbon({ stages }: { stages: readonly string[] }) {
  const count = stages.length;
  const left = 70;
  const right = 1130;
  const step = (right - left) / Math.max(1, count - 1);
  const points = stages.map((_, index) => ({ x: left + index * step, y: 122 + Math.sin(index * 1.1) * 24 }));
  const path = points
    .map((point, index) => {
      if (index === 0) return `M${point.x} ${point.y}`;
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `C${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(" ");
  return (
    <figure className="method-ribbon">
      <svg viewBox="0 0 1200 236" role="img" aria-label={`Engineering method: ${stages.join(", then ")}.`}>
        <defs>
          <linearGradient id="method-ribbon-stroke" x1="0" y1="0" x2="1" y2="0">
            {tones.map((tone, index) => (
              <stop key={tone} offset={`${(index / (tones.length - 1)) * 100}%`} stopColor={tone} />
            ))}
          </linearGradient>
          <filter id="method-ribbon-glow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d={path} fill="none" stroke="url(#method-ribbon-stroke)" strokeWidth="18" strokeOpacity="0.35" filter="url(#method-ribbon-glow)" />
        <path d={path} fill="none" stroke="url(#method-ribbon-stroke)" strokeWidth="3" />
        {points.map((point, index) => (
          <g key={stages[index]} transform={`translate(${point.x} ${point.y})`}>
            <circle r="22" fill="#111633" stroke={tones[index % tones.length]} strokeWidth="2" />
            <circle r="8" fill={tones[index % tones.length]} />
            <text y={index % 2 === 0 ? -38 : 54} fill="#f7f6ff" fontSize="17" fontWeight="700" textAnchor={index === 0 ? "start" : index === count - 1 ? "end" : "middle"} x={index === 0 ? -30 : index === count - 1 ? 30 : 0} letterSpacing="-0.2">
              {stages[index]}
            </text>
            <text y={index % 2 === 0 ? -58 : 74} fill={tones[index % tones.length]} fontSize="12" fontWeight="800" textAnchor={index === 0 ? "start" : index === count - 1 ? "end" : "middle"} x={index === 0 ? -30 : index === count - 1 ? 30 : 0} letterSpacing="2">
              {String(index + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
