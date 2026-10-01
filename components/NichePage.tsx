import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { PhoneIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import LeadSection from "@/components/LeadSection";
import PortableBody from "@/components/PortableBody";
import { StatsRow, Testimonials } from "@/components/Proof";
import ServiceCards from "@/components/ServiceCards";
import Steps from "@/components/Steps";
import { servicesBySlug } from "@/lib/data";
import { serviceLd } from "@/lib/jsonld";
import { telHref } from "@/lib/site";
import type { Home, Niche, Post, Service, Settings, Testimonial } from "@/lib/types";

type Props = { niche: Niche; services: Service[]; settings: Settings; testimonials: Testimonial[]; home: Home; posts: Post[] };

export default function NichePage({ niche, services, settings, testimonials, home, posts }: Props) {
  const path = `/${niche.slug}`;
  const featured = servicesBySlug(services, niche.services);
  return (
    <>
      <section className="hero">
        <div className="container">
          <Breadcrumbs items={[{ name: niche.title, path }]} />
          <p className="eyebrow">{niche.title}</p>
          <h1>{niche.heading}</h1>
          <p className="lead">{niche.intro}</p>
          <div className="btn-row">
            <Link href="#get-audit" className="btn btn-primary">Get your free audit</Link>
            <a href={telHref(settings.phoneE164)} className="btn btn-outline"><PhoneIcon /> Call {settings.phone}</a>
          </div>
        </div>
      </section>

      {niche.problems.length > 0 && (
        <section className="section" aria-labelledby="problems-title">
          <div className="container">
            <div className="section-head">
              <h2 id="problems-title">Sound familiar?</h2>
            </div>
            <Steps steps={niche.problems} numbered={false} />
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="section section-tint" aria-labelledby="niche-services-title">
          <div className="container">
            <div className="section-head">
              <h2 id="niche-services-title">How we help</h2>
            </div>
            <ServiceCards services={featured} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container narrow">
          <PortableBody value={niche.body} />
        </div>
      </section>

      {niche.process.length > 0 && (
        <section className="section section-tint" aria-labelledby="niche-process-title">
          <div className="container">
            <h2 id="niche-process-title" className="section-title">Our process</h2>
            <Steps steps={niche.process} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="niche-proof-title">
        <div className="container">
          <h2 id="niche-proof-title" className="section-title">Results our clients see</h2>
          <StatsRow stats={home.stats} />
          <Testimonials items={testimonials} />
        </div>
      </section>

      <FaqList faqs={niche.faqs} />

      {posts.length > 0 && (
        <section className="section section-tint" aria-labelledby="niche-blog-title">
          <div className="container narrow">
            <h2 id="niche-blog-title">Helpful reading</h2>
            <ul className="link-list">
              {posts.slice(0, 3).map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}
            </ul>
          </div>
        </section>
      )}

      <CtaBand settings={settings} heading="Let's fill your calendar" text="Book a free audit. We will show you where new customers are slipping away and how to win them back." />
      <LeadSection settings={settings} />
      <JsonLd data={serviceLd({ title: niche.title, summary: niche.intro, path, serviceType: niche.title })} />
    </>
  );
}
