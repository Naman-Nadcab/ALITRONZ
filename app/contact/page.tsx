import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { getPublicIdentity } from "@/lib/public-identity";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Alitroz Technology about a software project. Enquiries go through the form on this site.",
  path: "/contact",
});

export default function ContactPage() {
  const identity = getPublicIdentity();
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p className="eyebrow">Contact</p>
          <h1>Tell us about the project.</h1>
          <p className="lede">
            Use the form and we will reply if there is a fit. A response time depends on the detail you share. We do not publish a fixed reply window.
          </p>
          {identity.email ? <p className="gap-top">Email: <a className="text-link" href={`mailto:${identity.email}`}>{identity.email}</a></p> : null}
          {identity.address ? <p className="muted gap-top">{identity.address}</p> : null}
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap enquiry-layout">
          <div>
            <h2>What helps us respond</h2>
            <ul className="plain-list">
              <li>The business problem, not only a technology name.</li>
              <li>The systems the product must join.</li>
              <li>Any permission, vendor access, or data constraint that is already known.</li>
            </ul>
            <p className="muted gap-top">We reply by email to the address you give in the form.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
