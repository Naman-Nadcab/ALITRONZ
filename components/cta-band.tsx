export function CtaBand({
  title = "Have a complex project in mind?",
  body = "Tell us what you're building. We'll start with the business challenge, requirements, and the right engineering approach.",
  label = "Start a Project",
  href = "/start-a-project",
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p className="lede">
            {body}
          </p>
        </div>
        <a className="btn btn-primary" href={href}>
          {label} <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
