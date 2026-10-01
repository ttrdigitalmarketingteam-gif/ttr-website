import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StickyCall from "@/components/StickyCall";
import { getServices, getSettings } from "@/lib/data";
import { telHref } from "@/lib/site";

export default async function NotFound() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <>
      <Header settings={settings} />
      <main id="main" className="container not-found">
        <h1>Sorry, we could not find that page</h1>
        <p className="lead">The page may have moved. Try one of these instead, or give us a call.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary">Go to the home page</Link>
          <Link href="/services" className="btn btn-outline">See our services</Link>
          <a href={telHref(settings.phoneE164)} className="btn btn-outline">Call {settings.phone}</a>
        </div>
      </main>
      <Footer settings={settings} services={services} />
      <StickyCall settings={settings} />
    </>
  );
}
