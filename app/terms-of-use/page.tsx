import type { Metadata } from "next";
import { publishedOn } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { getPublicIdentity } from "@/lib/public-identity";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description: "Terms for using the Alitroz Technology website. Project work begins only under a separate written agreement.",
  path: "/terms-of-use",
});

export default function TermsPage() {
  const identity = getPublicIdentity();
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1>Terms of use</h1>
          <p className="lede">These terms cover use of this website. They are not a services agreement, and they should be reviewed with counsel before production use.</p>
          <p className="meta-row">Published {formatDate(publishedOn)}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap wrap-narrow sheet-inner prose">
          <section className="block">
            <h2>The site</h2>
            <p>This website describes software development and consulting offered under the name Alitroz Technology. {identity.legalName ? `The published legal name is ${identity.legalName}.` : "The registered legal entity is not published here and will be identified in any contract."}</p>
            <p>Content is for information. It is not an offer of regulated financial services, brokerage, custody, exchange operation, or investment advice. Concept showcases are not customer delivery claims.</p>
          </section>
          <section className="block">
            <h2>Projects</h2>
            <p>An enquiry does not create a contract. Work starts only under a written agreement that names the scope, the fees, and the contracting party. Nothing on this site is a quote, a delivery date, or a warranty of a particular outcome.</p>
          </section>
          <section className="block">
            <h2>Acceptable use</h2>
            <p>Do not misuse the site, attempt to break the enquiry form, or submit information you do not have the right to share. Do not rely on the site as professional, legal, or investment advice.</p>
          </section>
          <section className="block">
            <h2>Intellectual property</h2>
            <p>The text, design, and code of this website belong to their owner. You may share links. You may not copy the site into another product or present concept showcases as your customer work.</p>
          </section>
          <section className="block">
            <h2>Liability and law</h2>
            <p>The site is provided as available. We do not warrant that it will be uninterrupted or free of errors. To the extent the law allows, liability for use of the website itself is limited to direct damages that were reasonably foreseeable. A services agreement, not this page, governs paid work.</p>
            {identity.jurisdiction ? <p>Published jurisdiction note: {identity.jurisdiction}.</p> : <p>Governing law and venue are not stated on this website. They will be set in a customer agreement once the contracting party and jurisdiction are confirmed.</p>}
          </section>
        </div>
      </div>
    </>
  );
}
