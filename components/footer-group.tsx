"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Footer navigation column. Always expanded on wide screens; collapsible
 * below 800px so the footer does not run to several screens on a phone.
 */
export function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 799px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  if (!narrow) {
    return (
      <nav aria-label={title} className="footer-group">
        <h2>{title}</h2>
        {children}
      </nav>
    );
  }
  return (
    <nav aria-label={title} className="footer-group">
      <details>
        <summary><h2>{title}</h2></summary>
        {children}
      </details>
    </nav>
  );
}
