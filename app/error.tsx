"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="not-found">
      <div className="wrap">
        <p className="eyebrow">Error</p>
        <h1>This page failed to load.</h1>
        <p className="lede">You can try again. If it keeps failing, use the project form once the rest of the site is available.</p>
        <div className="cta-row">
          <button className="btn btn-primary" type="button" onClick={() => reset()}>Try again</button>
          <Link className="btn btn-secondary" href="/">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
