"use client";

import { useState } from "react";
import Link from "next/link";
import type { buildPaths } from "@/content/home";

type Path = (typeof buildPaths)[number];

export function CapabilityExplorer({ paths }: { paths: readonly Path[] }) {
  const [selected, setSelected] = useState(paths[0]?.id ?? "");
  const current = paths.find((path) => path.id === selected) ?? paths[0];
  if (!current) return null;
  const enquiry = `/start-a-project?service=${encodeURIComponent(current.service)}`;

  return (
    <div className="lab">
      <div className="lab-choices" role="radiogroup" aria-label="What are you looking to build?">
        {paths.map((path, index) => {
          const pressed = path.id === current.id;
          return (
            <button
              key={path.id}
              type="button"
              role="radio"
              aria-checked={pressed}
              className="lab-choice"
              onClick={() => setSelected(path.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {path.label}
            </button>
          );
        })}
      </div>
      <article className="lab-panel" key={current.id}>
        <p className="kicker">{current.service}</p>
        <h3>{current.label}</h3>
        <p>{current.role}</p>
        <p className="lab-project">
          <span>{current.projectKind}</span>
          <strong>{current.projectTitle}</strong>
          {current.projectNote}
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" href={current.href}>
            Open the service <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href={current.projectHref}>View the concept</Link>
        </div>
        {current.also.length > 0 ? (
          <p className="lab-also">
            Also:{" "}
            {current.also.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </p>
        ) : null}
        <p className="lab-also">
          <Link href={enquiry}>Discuss this with the form</Link>
        </p>
      </article>
    </div>
  );
}
