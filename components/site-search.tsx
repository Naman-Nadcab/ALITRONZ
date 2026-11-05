"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SearchItem = { title: string; href: string; group: string; note: string };

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const closeSearch = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) closeSearch();
        else setOpen(true);
      } else if (event.key === "Escape" && open) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeSearch, open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const controls = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button, input")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", trapFocus);
    };
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return items.slice(0, 9);
    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.group} ${item.note}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 12);
  }, [items, query]);

  return (
    <>
      <button ref={triggerRef} className="search-trigger" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Search site">
        <span>Search</span><kbd>⌘K</kbd>
      </button>
      {open ? (
        <div className="command-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) closeSearch();
        }}>
          <section ref={panelRef} className="command-panel" role="dialog" aria-modal="true" aria-label="Search Alitroz pages">
            <div className="command-input">
              <span aria-hidden="true">⌕</span>
              <label className="sr-only" htmlFor="site-command-search">Search pages and services</label>
              <input
                id="site-command-search"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" || !results[0]) return;
                  closeSearch(false);
                  router.push(results[0].href);
                }}
                placeholder="Search services, systems, industries…"
              />
              <button type="button" onClick={() => closeSearch()} aria-label="Close search">Esc</button>
            </div>
            <div className="command-results" aria-live="polite">
              {results.length > 0 ? results.map((item) => (
                <Link key={`${item.href}-${item.title}`} href={item.href} onClick={() => closeSearch(false)}>
                  <span><small>{item.group}</small><strong>{item.title}</strong><em>{item.note}</em></span>
                  <b aria-hidden="true">↗</b>
                </Link>
              )) : <p>No matching page. Try a technology, industry, or outcome.</p>}
            </div>
            <footer><span>{items.length} live destinations</span><span>Enter to open · Esc to close</span></footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
