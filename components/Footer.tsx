import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import type { Service, Settings } from "@/lib/types";

export default function Footer({ settings, services }: { settings: Settings; services: Service[] }) {
  const a = settings.address;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`)}`;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/ttr-logo-white.webp" alt="TTR Digital Marketing" width={1000} height={126} sizes="180px" className="footer-logo" />
          <p>Digital marketing for local businesses, dental practices and home service companies.</p>
          <address>
            <a href={mapUrl} rel="noopener" target="_blank">
              {a.street}
              <br />
              {a.city}, {a.region} {a.postalCode}
            </a>
            <br />
            <a href={telHref(settings.phoneE164)}>{settings.phone}</a>
            <br />
            {settings.hoursText}
          </address>
        </div>
        <div>
          <h2 className="footer-title">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Industries</h2>
          <ul>
            <li><Link href="/dental-marketing">Dental marketing</Link></li>
            <li><Link href="/home-services-marketing">Home services marketing</Link></li>
          </ul>
          <h2 className="footer-title">Company</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Follow us</h2>
          <ul>
            {site.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" target="_blank">{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <p>
          <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
