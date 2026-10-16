import type { Metadata } from "next";
import { publishedOn } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { getPublicIdentity } from "@/lib/public-identity";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Alitroz Technology handles personal information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  const identity = getPublicIdentity();
  const published = formatDate(publishedOn);
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1>Privacy policy</h1>
          <p className="lede">This policy describes the website enquiry form. It is not a substitute for legal advice, and it should be reviewed before production use.</p>
          <p className="meta-row">Published {published}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap wrap-narrow sheet-inner prose">
          <section className="block">
            <h2>Who this refers to</h2>
            <p>This website is published under the name Alitroz Technology. {identity.legalName ? `The published legal name is ${identity.legalName}.` : "A registered legal name has not been published on this website. The contracting party for any services agreement will be named in that agreement."}</p>
            {identity.address ? <p>Published address: {identity.address}.</p> : <p>No postal address is published on this website.</p>}
            {identity.registration ? <p>Published registration: {identity.registration}.</p> : null}
            {identity.jurisdiction ? <p>Published jurisdiction note: {identity.jurisdiction}.</p> : <p>A governing jurisdiction is not stated here. It belongs in a services agreement once the contracting party is confirmed.</p>}
          </section>
          <section className="block">
            <h2>What the form collects</h2>
            <p>If you submit a project enquiry, we collect your name, email address, company, role if you provide one, the service you select, your description of the project, an optional investment range, an expected timeframe, and your consent. A hidden field exists to catch automated submissions. Do not fill it.</p>
            <p>The site does not ask you to create an account. This build does not set advertising or analytics cookies. If analytics are added later, this policy has to change.</p>
          </section>
          <section className="block">
            <h2>Why it is collected</h2>
            <p>The details are used to read the enquiry and reply. They are not sold. They are not used to make an automated decision that produces a legal effect. Submitting the form does not start a project and does not add you to a marketing list.</p>
          </section>
          <section className="block">
            <h2>How it is delivered</h2>
            <p>When delivery is configured, the enquiry is sent to the operator’s email provider or webhook. Until that configuration exists, the form reports that the message was not sent. Provider names and regions are not listed here because they depend on that configuration. Add them to this policy if a jurisdiction requires the disclosure.</p>
            {identity.email ? <p>A published contact email is <a href={`mailto:${identity.email}`}>{identity.email}</a>.</p> : <p>No public email address is published yet. Use the enquiry form once delivery is configured, or the contact method named in a contract.</p>}
          </section>
          <section className="block">
            <h2>Retention and requests</h2>
            <p>Enquiry details are kept long enough to evaluate the request and keep a record of the conversation, then deleted or archived under the operator’s practice. A fixed retention period is not published. Depending on where you live, you may have rights to access, correct, or delete personal information you submitted. Use the same contact method and we will respond to requests we are required to honour.</p>
          </section>
          <section className="block">
            <h2>Children</h2>
            <p>This website is a business site. It is not directed at children, and the form is not intended for them.</p>
          </section>
        </div>
      </div>
    </>
  );
}
