import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PhoneIcon } from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import PortableBody from "@/components/PortableBody";
import { getPage, getSettings } from "@/lib/data";
import { buildMetadata, withBrand } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage("contact");
  if (!page) return {};
  return buildMetadata({ title: withBrand(page.title), description: page.intro, path: "/contact", seo: page.seo });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPage("contact"), getSettings()]);
  if (!page) notFound();
  const a = settings.address;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`)}`;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: page.title, path: "/contact" }]} />
          <h1>{page.heading}</h1>
          <p className="lead">{page.intro}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} id="get-audit">
        <div className="container lead-grid">
          <div>
            <ul className="contact-list">
              <li>
                <strong>Call us</strong>
                <a href={telHref(settings.phoneE164)} className="lead-call"><PhoneIcon /> {settings.phone}</a>
              </li>
              <li>
                <strong>Visit us</strong>
                <a href={mapUrl} rel="noopener" target="_blank">{a.street}<br />{a.city}, {a.region} {a.postalCode}</a>
              </li>
              <li>
                <strong>Hours</strong>
                {settings.hoursText}
              </li>
            </ul>
            <PortableBody value={page.body} />
          </div>
          <div className="card form-card">
            <h2 style={{ fontSize: "1.4rem" }}>Request your free audit</h2>
            <LeadForm idPrefix="contact" phone={settings.phone} phoneHref={telHref(settings.phoneE164)} />
          </div>
        </div>
      </section>
    </>
  );
}
