"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Stage = { title: string; text: string };

export function ProcessStory({ stages }: { stages: readonly Stage[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = items.current.filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stages]);

  return (
    <div className="process-story">
      <ol className="process-map" aria-hidden="true">
        {stages.map((stage, index) => (
          <li key={stage.title} className={index === active ? "is-active" : index < active ? "is-done" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {stage.title}
          </li>
        ))}
      </ol>
      <div>
        {stages.map((stage, index) => (
          <article
            key={stage.title}
            ref={(node) => {
              items.current[index] = node;
            }}
            className={index === active ? "is-active" : undefined}
          >
            <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </article>
        ))}
        <p className="gap-top-lg">
          <Link className="text-link" href="/company/our-approach">Read the engineering approach</Link>
        </p>
      </div>
    </div>
  );
}
