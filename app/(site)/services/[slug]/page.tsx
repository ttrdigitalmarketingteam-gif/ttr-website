import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import LeadSection from "@/components/LeadSection";
import PortableBody from "@/components/PortableBody";
import ServiceCards from "@/components/ServiceCards";
import Steps from "@/components/Steps";
import { getPosts, getService, getServices, getSettings, servicesBySlug } from "@/lib/data";
import { serviceLd } from "@/lib/jsonld";
import { buildMetadata, withBrand } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const svc = await getService(slug);
  if (!svc) return {};
  return buildMetadata({ title: withBrand(svc.title), description: svc.summary, path: `/services/${slug}`, seo: svc.seo });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [svc, all, settings, posts] = await Promise.all([getService(slug), getServices(), getSettings(), getPosts()]);
  if (!svc) notFound();
  const related = servicesBySlug(all, svc.related.length ? svc.related : all.filter((s) => s.slug !== slug).slice(0, 3).map((s) => s.slug));
  const relatedPosts = posts.filter((p) => p.relatedServices.includes(slug)).slice(0, 3);
  const path = `/services/${slug}`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: svc.title, path }]} />
          <p className="eyebrow">{svc.title}</p>
          <h1>{svc.heading}</h1>
          <p className="lead">{svc.intro}</p>
          <div className="btn-row">
            <Link href="#get-audit" className="btn btn-primary">Get your free audit</Link>
            <a href={telHref(settings.phoneE164)} className="btn btn-outline"><PhoneIcon /> {settings.phone}</a>
          </div>
        </div>
      </section>

      {svc.benefits.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="benefits-title">
          <div className="container">
            <h2 id="benefits-title">What you get</h2>
            <ul className="checklist two-col">
              {svc.benefits.map((b) => <li key={b}><CheckIcon /> {b}</li>)}
            </ul>
          </div>
        </section>
      )}

      {svc.process.length > 0 && (
        <section className="section section-tint" aria-labelledby="process-title">
          <div className="container">
            <h2 id="process-title" className="section-title">How it works</h2>
            <Steps steps={svc.process} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container split">
          <PortableBody value={svc.body} />
          <aside className="aside-card" aria-labelledby="industries-title">
            <h2 id="industries-title">Built for your industry</h2>
            <ul className="link-list">
              <li><Link href="/dental-marketing">Dental marketing</Link></li>
              <li><Link href="/home-services-marketing">Home services marketing</Link></li>
            </ul>
            {relatedPosts.length > 0 && (
              <>
                <h2 style={{ marginTop: 24 }}>Helpful reading</h2>
                <ul className="link-list">
                  {relatedPosts.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}
                </ul>
              </>
            )}
          </aside>
        </div>
      </section>

      <FaqList faqs={svc.faqs} heading={`${svc.title} questions`} />

      {related.length > 0 && (
        <section className="section section-tint" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="section-title">Works well with</h2>
            <ServiceCards services={related} />
          </div>
        </section>
      )}

      <CtaBand settings={settings} heading={`Ready to grow with ${svc.title}?`} text="Book a free audit and we will show you exactly where the opportunities are." />
      <LeadSection settings={settings} />
      <JsonLd data={serviceLd({ title: svc.title, summary: svc.summary, path })} />
    </>
  );
}
