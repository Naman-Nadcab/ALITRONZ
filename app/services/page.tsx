import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { capabilityGroups, serviceGroups } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: "Specialist engineering for AI, digital products, Web3, financial technology, cloud, data, and application security.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Specialist engineering, grouped by division.</h1>
          <p className="lede">
            Four divisions cover the products Alitroz builds. Cloud, data, and security are the capabilities that make those products deployable and operable.
          </p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap">
          {serviceGroups.map((group) => (
            <article className="division division-copy" key={group.href}>
              <div>
                <h2><Link href={group.href}>{group.title}</Link></h2>
              </div>
              <ul className="related-list">
                {group.links.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-elevated">
        <div className="wrap">
          <div className="section-head">
            <h2>Capabilities</h2>
            <p className="muted">Practices that support the four divisions. Each one has its own scope.</p>
          </div>
          {capabilityGroups.map((group) => (
            <article className="division division-copy" key={group.href}>
              <div>
                <h3><Link href={group.href}>{group.title}</Link></h3>
              </div>
              <ul className="related-list">
                {group.links.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
