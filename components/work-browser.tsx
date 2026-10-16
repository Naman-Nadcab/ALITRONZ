"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function WorkBrowser({ projects }: { projects: Project[] }) {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="filter-row" role="tablist" aria-label="Work categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            className={category === item ? "is-active" : undefined}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {visible.length === 0 ? <p>No concept work in this category yet.</p> : null}
      <div className="work-grid">
        {visible.map((project) => (
          <article key={project.slug}>
            <Link className="card-link" href={`/work/${project.slug}`}>
              <p className="kicker">{project.kindLabel} · {project.category}</p>
              <h2 className="gap-top">{project.title}</h2>
              <p className="muted gap-top">{project.summary}</p>
              <p className="gap-top-lg">View the concept</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
