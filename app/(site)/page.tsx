import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import LeadSection from "@/components/LeadSection";
import { LogoStrip, StatsRow, Testimonials } from "@/components/Proof";
import ServiceCards from "@/components/ServiceCards";
import Steps from "@/components/Steps";
import { getHome, getPosts, getServices, getSettings, getTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata() {
  const home = await getHome();
  return buildMetadata({ title: home.seo.title || home.heroHeading, description: home.seo.description || home.heroText, path: "/", seo: home.seo });
}

export default async function HomePage() {
  const [home, services, settings, testimonials, posts] = await Promise.all([getHome(), getServices(), getSettings(), getTestimonials(), getPosts()]);
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{home.heroEyebrow}</p>
          <h1>{home.heroHeading}</h1>
          <p className="lead">{home.heroText}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-primary">Get your free audit</Link>
            <a href={telHref(settings.phoneE164)} className="btn btn-outline">
              <PhoneIcon /> Call {settings.phone}
            </a>
          </div>
          <ul className="hero-points">
            {home.heroPoints.map((p) => (
              <li key={p}><CheckIcon /> {p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2 id="services-title">Everything you need to get found and get booked</h2>
            <p className="lead">
              Pick one service or let us run the whole system. Every piece is built to bring in calls, form leads and booked appointments.
            </p>
          </div>
          <ServiceCards services={services} />
          <p style={{ marginTop: 24 }}>
            Focused on your industry? See our <Link href="/dental-marketing">dental marketing</Link> and{" "}
            <Link href="/home-services-marketing">home services marketing</Link> programs.
          </p>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="proof-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Results</p>
            <h2 id="proof-title">Real results for real businesses</h2>
          </div>
          <StatsRow stats={home.stats} />
          <Testimonials items={testimonials} />
          <LogoStrip logos={settings.clientLogos} label="Businesses that trust us" />
          <LogoStrip logos={settings.badges} label="Certified partners" />
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2 id="process-title">A simple process with no guesswork</h2>
            <p className="lead">
              Every decision is tied to one goal: more leads that turn into paying customers. <Link href="/about">Meet the team behind TTR Digital</Link>.
            </p>
          </div>
          <Steps steps={home.process} />
        </div>
      </section>

      <FaqList faqs={home.faqs} />

      {posts.length > 0 && (
        <section className="section section-tint" aria-labelledby="blog-title">
          <div className="container">
            <div className="section-head">
              <h2 id="blog-title">From the blog</h2>
            </div>
            <ul className="post-list">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug} className="card card-link post-card">
                  <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand settings={settings} heading={home.ctaHeading} text={home.ctaText} />
      <LeadSection settings={settings} />
    </>
  );
}
