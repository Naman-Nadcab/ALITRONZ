import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This page is not on the site.</h1>
        <p className="lede">The address may be mistyped, or the page may have moved.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/">Back to home</Link>
          <Link className="btn btn-secondary" href="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
