import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { enquiryServices } from "@/lib/enquiry-schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Start a project",
  description: "Tell Alitroz Technology about a product, platform, or integration. We start from the business challenge and the engineering approach.",
  path: "/start-a-project",
});

export default async function StartPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const initialService = service && (enquiryServices as readonly string[]).includes(service) ? service : "";
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Start a project</p>
          <h1>Have a complex project in mind?</h1>
          <p className="lede">{"Tell us what you're building. We'll start with the business challenge, requirements, and the right engineering approach."}</p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap enquiry-layout">
          <div>
            <h2>What happens next</h2>
            <div className="model-list">
              <article>
                <h3>We read the brief</h3>
                <p>The enquiry is a conversation, not an acceptance of work.</p>
              </article>
              <article>
                <h3>We reply if there is a fit</h3>
                <p>That reply may be a question, a suggested approach, or a clear no.</p>
              </article>
              <article>
                <h3>Scope is written down</h3>
                <p>Delivery starts under an agreement that names the work and the contracting party. Prices and dates are not implied by this form.</p>
              </article>
            </div>
          </div>
          <EnquiryForm initialService={initialService} />
        </div>
      </section>
    </>
  );
}
