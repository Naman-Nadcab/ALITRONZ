import Link from "next/link";
import { FooterGroup } from "@/components/footer-group";
import { Logo } from "@/components/logo";
import { capabilityLinks, engagementLinks, industryLinks, serviceLinks } from "@/content/navigation";
import { getPublicIdentity } from "@/lib/public-identity";

export function SiteFooter() {
  const identity = getPublicIdentity();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/"><Logo /></Link>
          <p className="muted">We engineer intelligent products for ambitious businesses. Software development and consulting. Not a broker, exchange, or adviser.</p>
          {identity.email ? <p className="footer-contact"><a href={`mailto:${identity.email}`}>{identity.email}</a></p> : <p className="footer-contact"><Link href="/start-a-project">Project enquiries</Link></p>}
          {identity.address ? <p className="muted">{identity.address}</p> : null}
        </div>
        <FooterGroup title="Services">
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </FooterGroup>
        <FooterGroup title="Capabilities">
          <ul>
            {capabilityLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </FooterGroup>
        <FooterGroup title="Industries">
          <ul>
            {industryLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </FooterGroup>
        <FooterGroup title="Working with us">
          <ul>
            <li><Link href="/solutions">Solutions</Link></li>
            <li><Link href="/engagement-models">Engagement models</Link></li>
            {engagementLinks.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
            <li><Link href="/start-a-project">Start a project</Link></li>
          </ul>
        </FooterGroup>
        <FooterGroup title="Company">
          <ul>
            <li><Link href="/company">About Alitroz</Link></li>
            <li><Link href="/company/our-approach">Our approach</Link></li>
            <li><Link href="/company/quality-and-security">Quality and security</Link></li>
            <li><Link href="/company/careers">Careers</Link></li>
            <li><Link href="/work">Our work</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </FooterGroup>
      </div>
      <div className="wrap footer-base">
        <p>© {year} Alitroz Technology</p>
        <p className="footer-legal"><Link href="/privacy-policy">Privacy policy</Link> · <Link href="/terms-of-use">Terms of use</Link></p>
      </div>
    </footer>
  );
}
