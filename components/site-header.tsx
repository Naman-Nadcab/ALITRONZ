"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { capabilityLinks, companyLinks, primaryNav, serviceGroups } from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<"services" | "company" | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerSection, setDrawerSection] = useState<"services" | "company" | null>(null);
  const [path, setPath] = useState(pathname);
  const closeTimer = useRef<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  if (path !== pathname) {
    setPath(pathname);
    setDrawer(false);
    setMenu(null);
    setDrawerSection(null);
  }

  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = drawerRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawer(false);
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab" || !root) return;
      const nodes = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    root?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  function clearTimer() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }

  function openMenu(next: "services" | "company") {
    clearTimer();
    setMenu(next);
  }

  function scheduleClose() {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <Logo />
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {primaryNav.map((item) => {
            if (item.menu === "services") {
              return (
                <div key={item.href} className="nav-item" onMouseEnter={() => openMenu("services")} onMouseLeave={scheduleClose}>
                  <button
                    className="menu-button"
                    aria-expanded={menu === "services"}
                    aria-controls="services-menu"
                    aria-current={pathname.startsWith("/services") || pathname.startsWith("/capabilities") ? "page" : undefined}
                    onClick={() => setMenu(menu === "services" ? null : "services")}
                  >
                    {item.label}
                  </button>
                  {menu === "services" ? (
                    <div id="services-menu" className="mega mega-wide" role="region" aria-label="What we do">
                      {serviceGroups.map((group) => (
                        <div key={group.href}>
                          <p className="mega-label">Division</p>
                          <Link href={group.href}>
                            <strong>{group.title}</strong>
                            <span>{group.result}</span>
                          </Link>
                        </div>
                      ))}
                      <div className="mega-span">
                        <p className="mega-label">Also</p>
                        <Link href="/services">All services</Link>
                        <Link href="/solutions">Solutions</Link>
                        {capabilityLinks.map((link) => (
                          <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }
            if (item.menu === "company") {
              return (
                <div key={item.href} className="nav-item" onMouseEnter={() => openMenu("company")} onMouseLeave={scheduleClose}>
                  <button
                    className="menu-button"
                    aria-expanded={menu === "company"}
                    aria-controls="company-menu"
                    aria-current={pathname.startsWith("/company") || pathname === "/contact" ? "page" : undefined}
                    onClick={() => setMenu(menu === "company" ? null : "company")}
                  >
                    {item.label}
                  </button>
                  {menu === "company" ? (
                    <div id="company-menu" className="company-menu" role="region" aria-label="Company">
                      {companyLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                          <strong>{link.label}</strong>
                          <span>{link.note}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} className="nav-link" href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="btn btn-primary header-cta" href="/start-a-project">
          Start a Project
        </Link>
        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={drawer}
          aria-controls="mobile-nav"
          onClick={() => setDrawer((value) => !value)}
        >
          <span className="sr-only">{drawer ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
            {drawer ? (
              <path d="M1 1l16 10M17 1L1 11" stroke="currentColor" strokeWidth="1.4" />
            ) : (
              <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.4" />
            )}
          </svg>
        </button>
      </div>
      {drawer ? (
        <div id="mobile-nav" ref={drawerRef} className="nav-drawer">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
          <button className="drawer-sub" aria-expanded={drawerSection === "services"} onClick={() => setDrawerSection(drawerSection === "services" ? null : "services")}>
            What We Do
          </button>
          {drawerSection === "services" ? (
            <div className="drawer-group">
              <Link href="/services">All services</Link>
              {serviceGroups.map((group) => (
                <div key={group.href}>
                  <Link href={group.href}>{group.title}</Link>
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href}>{link.label}</Link>
                  ))}
                </div>
              ))}
              {capabilityLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ) : null}
          <Link href="/solutions" aria-current={pathname === "/solutions" ? "page" : undefined}>Solutions</Link>
          <Link href="/industries" aria-current={pathname === "/industries" ? "page" : undefined}>Industries</Link>
          <Link href="/work" aria-current={pathname === "/work" ? "page" : undefined}>Our Work</Link>
          <Link href="/insights" aria-current={pathname === "/insights" ? "page" : undefined}>Insights</Link>
          <button className="drawer-sub" aria-expanded={drawerSection === "company"} onClick={() => setDrawerSection(drawerSection === "company" ? null : "company")}>
            About
          </button>
          {drawerSection === "company" ? (
            <div className="drawer-group">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ) : null}
          <Link href="/start-a-project">Start a Project</Link>
        </div>
      ) : null}
    </header>
  );
}
