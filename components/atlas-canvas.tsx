"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const territories = [
  {
    id: "ai",
    label: "AI",
    title: "AI & Intelligent Automation",
    text: "Agents, retrieval, and workflows that stay inside a permission boundary.",
    href: "/services/ai-automation",
    x: 180,
    y: 150,
    w: 210,
    h: 150,
  },
  {
    id: "product",
    label: "Products",
    title: "Digital Product Engineering",
    text: "Websites, applications, and SaaS the client can keep running.",
    href: "/services/digital-product-engineering",
    x: 120,
    y: 360,
    w: 250,
    h: 170,
  },
  {
    id: "web3",
    label: "Web3",
    title: "Web3 & Blockchain Engineering",
    text: "Contracts and applications. Alitroz does not hold keys or run an exchange.",
    href: "/services/web3-blockchain",
    x: 620,
    y: 120,
    w: 230,
    h: 140,
  },
  {
    id: "finance",
    label: "Markets",
    title: "Financial & Trading Technology",
    text: "Terminals and integrations. Alitroz is not a broker or adviser.",
    href: "/services/financial-trading-technology",
    x: 680,
    y: 390,
    w: 240,
    h: 150,
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Cloud, DevOps & Reliability",
    text: "Release paths and an operating picture after the build.",
    href: "/capabilities/cloud-devops",
    x: 430,
    y: 70,
    w: 150,
    h: 90,
  },
  {
    id: "data",
    label: "Data",
    title: "Data Engineering & Analytics",
    text: "Pipelines and figures a team can explain.",
    href: "/capabilities/data-engineering",
    x: 460,
    y: 250,
    w: 160,
    h: 100,
  },
  {
    id: "security",
    label: "Security",
    title: "Cybersecurity & Application Security",
    text: "Access, review, and the failures the engagement covers.",
    href: "/capabilities/cybersecurity",
    x: 400,
    y: 430,
    w: 170,
    h: 100,
  },
] as const;

const links: [string, string][] = [
  ["ai", "data"],
  ["data", "product"],
  ["data", "cloud"],
  ["cloud", "web3"],
  ["data", "security"],
  ["security", "finance"],
  ["product", "finance"],
  ["web3", "finance"],
];

function Territory({
  territory,
  selected,
}: {
  territory: (typeof territories)[number];
  selected: boolean;
}) {
  const { id, x, y, w, h, label } = territory;
  const stroke = selected ? "#73dfd0" : "rgba(226,220,255,0.4)";
  const fill = selected ? "rgba(169,154,255,0.22)" : "rgba(73,71,98,0.55)";
  return (
    <g>
      {id === "ai" ? (
        <>
          <path d={`M ${x + 16} ${y + h - 24} C ${x + 50} ${y + 20}, ${x + w * 0.55} ${y + h}, ${x + w - 16} ${y + 28}`} fill="none" stroke="#a99aff" strokeWidth="2" />
          <path d={`M ${x + 24} ${y + h - 40} C ${x + 80} ${y + 36}, ${x + w * 0.6} ${y + h - 10}, ${x + w - 20} ${y + 48}`} fill="none" stroke="#73dfd0" strokeWidth="1.4" />
          <circle cx={x + w * 0.35} cy={y + h * 0.45} r="7" fill="#c6bcff" />
          <circle cx={x + w * 0.72} cy={y + h * 0.38} r="4" fill="#ff987e" />
        </>
      ) : null}
      {id === "product" ? (
        <>
          <rect x={x + 18} y={y + 48} width={w * 0.72} height={h * 0.28} rx="8" fill={fill} stroke={stroke} />
          <rect x={x + 36} y={y + 70} width={w * 0.62} height={h * 0.28} rx="8" fill="rgba(115,223,208,0.12)" stroke="#73dfd0" />
          <rect x={x + 54} y={y + 92} width={w * 0.5} height={h * 0.22} rx="6" fill="rgba(255,152,126,0.16)" stroke="#ff987e" />
        </>
      ) : null}
      {id === "web3" ? (
        <>
          <polygon points={`${x + 30},${y + h - 20} ${x + w / 2},${y + 36} ${x + w - 24},${y + h - 16}`} fill="none" stroke="#c6bcff" />
          <polygon points={`${x + 58},${y + h - 28} ${x + w / 2},${y + 58} ${x + w - 48},${y + h - 26}`} fill="rgba(169,154,255,0.15)" stroke="#73dfd0" />
          <circle cx={x + w / 2} cy={y + h * 0.55} r="5" fill="#ff987e" />
        </>
      ) : null}
      {id === "finance" ? (
        <>
          {[0.35, 0.5, 0.28, 0.62, 0.44].map((height, index) => (
            <rect key={height} x={x + 22 + index * 36} y={y + h - 28 - height * 70} width="16" height={height * 70} rx="3" fill={index === 3 ? "#ff987e" : "#73dfd0"} opacity="0.85" />
          ))}
          <path d={`M ${x + 16} ${y + 70} H ${x + w - 16}`} stroke="rgba(244,240,255,0.35)" />
        </>
      ) : null}
      {id === "cloud" ? (
        <>
          <circle cx={x + 36} cy={y + 48} r="8" fill="none" stroke="#73dfd0" />
          <circle cx={x + w - 28} cy={y + 36} r="6" fill="none" stroke="#c6bcff" />
          <circle cx={x + w / 2} cy={y + h - 18} r="6" fill="none" stroke="#ff987e" />
          <path d={`M ${x + 44} ${y + 48} L ${x + w - 34} ${y + 36} L ${x + w / 2} ${y + h - 24}`} fill="none" stroke={stroke} />
        </>
      ) : null}
      {id === "data" ? (
        <>
          <path d={`M ${x + 12} ${y + 28} C ${x + w * 0.3} ${y + h}, ${x + w * 0.6} ${y + 10}, ${x + w - 10} ${y + h - 16}`} fill="none" stroke="#a99aff" />
          <path d={`M ${x + 16} ${y + 48} C ${x + w * 0.4} ${y + 8}, ${x + w * 0.55} ${y + h}, ${x + w - 12} ${y + 36}`} fill="none" stroke="#73dfd0" />
        </>
      ) : null}
      {id === "security" ? (
        <>
          <rect x={x + 14} y={y + 28} width={w - 28} height={h - 40} rx="4" fill="none" stroke={stroke} />
          <rect x={x + 28} y={y + 40} width={w - 56} height={h - 64} rx="4" fill="none" stroke="#c6bcff" />
          <rect x={x + 42} y={y + 52} width={w - 84} height={h - 88} fill="rgba(255,152,126,0.16)" />
        </>
      ) : null}
      <text x={x + 16} y={y + 22} fill="#f4f0ff" fontSize="16">
        {label}
      </text>
    </g>
  );
}

function center(id: string) {
  const item = territories.find((territory) => territory.id === id);
  if (!item) return { x: 0, y: 0 };
  return { x: item.x + item.w / 2, y: item.y + item.h / 2 };
}

export function AtlasCanvas() {
  const [active, setActive] = useState<(typeof territories)[number]["id"]>("ai");
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [motionOk, setMotionOk] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotionOk(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  const current = territories.find((territory) => territory.id === active) ?? territories[0];

  return (
    <div className="atlas-board" id="atlas">
      <div
        className="atlas-stage"
        onPointerMove={(event) => {
          if (!motionOk) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          setShift({ x, y });
        }}
        onPointerLeave={() => setShift({ x: 0, y: 0 })}
      >
        <svg viewBox="0 0 1000 620" role="img" aria-label="Alitroz Atlas, a map of engineering territories">
          <g style={{ transform: `translate(${shift.x * 10}px, ${shift.y * 8}px)` }}>
            {links.map(([from, to]) => {
              const a = center(from);
              const b = center(to);
              const midX = (a.x + b.x) / 2 + (a.y - b.y) * 0.08;
              const midY = (a.y + b.y) / 2 + 30;
              const lit = active === from || active === to;
              return (
                <path
                  key={`${from}-${to}`}
                  d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                  fill="none"
                  stroke={lit ? "#73dfd0" : "rgba(198,188,255,0.35)"}
                  strokeWidth={lit ? 2.2 : 1.2}
                />
              );
            })}
            <g stroke="rgba(226,220,255,0.08)" fill="none">
              {Array.from({ length: 8 }, (_, index) => (
                <path key={index} d={`M 40 ${70 + index * 70} C 280 ${40 + index * 60}, 640 ${120 + index * 50}, 960 ${50 + index * 68}`} />
              ))}
            </g>
            {territories.map((territory) => (
              <Territory key={territory.id} territory={territory} selected={territory.id === active} />
            ))}
          </g>
        </svg>
        <div className="atlas-hits">
          {territories.map((territory) => (
            <button
              key={territory.id}
              type="button"
              className={territory.id === active ? "is-on" : undefined}
              style={{
                left: `${(territory.x / 1000) * 100}%`,
                top: `${(territory.y / 620) * 100}%`,
                width: `${(territory.w / 1000) * 100}%`,
                height: `${(territory.h / 620) * 100}%`,
              }}
              aria-pressed={territory.id === active}
              onClick={() => setActive(territory.id)}
            >
              <span className="sr-only">{territory.title}</span>
            </button>
          ))}
        </div>
      </div>
      <aside className="atlas-panel">
        <p className="kicker">Alitroz Atlas</p>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
        <Link className="btn btn-primary" href={current.href}>
          Open this territory <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <div className="atlas-list">
          {territories.map((territory) => (
            <button key={territory.id} type="button" aria-pressed={territory.id === active} onClick={() => setActive(territory.id)}>
              {territory.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
