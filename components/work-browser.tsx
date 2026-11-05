"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectPlate } from "@/components/project-plate";
import type { Project } from "@/content/projects";

export function WorkBrowser({ projects }: { projects: Project[] }) {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter work by category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={category === item ? "is-active" : undefined}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} projects shown.</p>
      {visible.length === 0 ? <p>No concept work in this category yet.</p> : null}
      <div className="showcase-list">
        {visible.map((project, index) => (
          <article key={project.slug} className={index === 0 ? "showcase-feature" : "showcase-card"}>
            <ProjectPlate slug={project.slug} />
            <div>
              <p className="kicker">{project.kindLabel} · {project.category}</p>
              <h2 className="gap-top">{project.title}</h2>
              <p className="muted gap-top">{project.summary}</p>
              <p className="gap-top-lg">
                <Link className="text-link" href={`/work/${project.slug}`}>View the concept</Link>
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
