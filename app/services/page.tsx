import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, familyOf } from "@/components/visuals/family-visual";
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
          {serviceGroups.map((group, index) => (
            <article className={`division-stage${index % 2 ? " is-flip" : ""}`} key={group.href}>
              <div>
                <p className="index-no">{String(index + 1).padStart(2, "0")}</p>
                <h2><Link href={group.href}>{group.title}</Link></h2>
                <p className="muted gap-top">{group.result}</p>
                <ul className="service-directory">
                  {group.links.map((link) => (
                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <FamilyVisual family={familyOf(group.href.split("/").pop() ?? "")} compact />
            </article>
          ))}
        </div>
      </section>
      <section className="section section-lavender">
        <div className="wrap">
          <div className="section-head">
            <h2>Capabilities</h2>
            <p>Practices that support the four divisions. Each one has its own scope.</p>
          </div>
          <div className="cap-stage">
            {capabilityGroups.map((group) => (
              <article key={group.href}>
                <FamilyVisual family={familyOf(group.href.split("/").pop() ?? "")} compact />
                <div>
                  <h3><Link href={group.href}>{group.title}</Link></h3>
                  <p className="gap-top">{group.result}</p>
                  <ul className="service-directory">
                    {group.links.map((link) => (
                      <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
