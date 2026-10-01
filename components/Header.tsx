import Image from "next/image";
import Link from "next/link";
import { telHref } from "@/lib/site";
import type { Settings } from "@/lib/types";
import { PhoneIcon } from "./Icons";
import { mainNav } from "./nav";

export default function Header({ settings }: { settings: Settings }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="TTR Digital Marketing home">
          <Image src="/images/ttr-logo.webp" alt="TTR Digital Marketing" width={1000} height={126} loading="eager" fetchPriority="high" sizes="168px" />
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={telHref(settings.phoneE164)}>
            <PhoneIcon />
            <span>{settings.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-primary btn-sm header-cta">
            Free audit
          </Link>
          <details className="nav-mobile">
            <summary aria-label="Open menu">
              <span className="burger" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <a href={telHref(settings.phoneE164)} className="btn btn-primary">
                Call {settings.phone}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
