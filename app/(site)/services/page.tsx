import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LeadSection from "@/components/LeadSection";
import ServiceCards from "@/components/ServiceCards";
import { getServices, getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Digital Marketing Services in Miami | TTR Digital Marketing",
  description: "SEO, AI search, Google Ads, Meta Ads, websites, social media, GoHighLevel CRM and AI agents. Digital marketing services from TTR Digital in Miami.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
          <h1>Digital marketing services that bring in leads</h1>
          <p className="lead">
            From showing up on Google and in AI answers to following up with every lead, here is how we help local businesses grow.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ServiceCards services={services} headingLevel={2} />
          <p style={{ marginTop: 28 }}>
            Not sure where to start? Most clients begin with <Link href="/services/seo">SEO</Link> or{" "}
            <Link href="/services/google-ads">Google Ads</Link>, then add follow up with{" "}
            <Link href="/services/gohighlevel-crm">GoHighLevel</Link>. We also run full programs for{" "}
            <Link href="/dental-marketing">dental practices</Link> and <Link href="/home-services-marketing">home service companies</Link>.
          </p>
        </div>
      </section>
      <LeadSection settings={settings} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${SITE_URL}/services/${s.slug}` })),
        }}
      />
    </>
  );
}
