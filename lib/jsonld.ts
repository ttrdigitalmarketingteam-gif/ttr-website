import { SITE_URL, site } from "./site";
import type { Faq, Post, Service, Settings } from "./types";

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`);

export function siteGraph(s: Settings) {
  const address = {
    "@type": "PostalAddress",
    streetAddress: s.address.street,
    addressLocality: s.address.city,
    addressRegion: s.address.region,
    postalCode: s.address.postalCode,
    addressCountry: s.address.country,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/ttr-logo.webp`, width: 1000, height: 126 },
        description: site.description,
        foundingDate: site.foundingYear,
        telephone: s.phoneE164,
        email: s.email,
        address,
        sameAs: site.social.map((x) => x.url),
        contactPoint: { "@type": "ContactPoint", telephone: s.phoneE164, contactType: "sales", areaServed: "US", availableLanguage: ["English"] },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BUSINESS_ID,
        name: site.name,
        url: SITE_URL,
        image: `${SITE_URL}/og-default.png`,
        logo: `${SITE_URL}/images/ttr-logo.webp`,
        telephone: s.phoneE164,
        email: s.email,
        address,
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        openingHoursSpecification: site.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
        parentOrganization: { "@id": ORG_ID },
        sameAs: site.social.map((x) => x.url),
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { "@id": ORG_ID }, inLanguage: "en-US" },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function serviceLd(svc: Pick<Service, "title" | "summary"> & { path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(svc.path)}#service`,
    name: svc.title,
    serviceType: svc.serviceType || svc.title,
    description: svc.summary,
    url: abs(svc.path),
    provider: { "@id": BUSINESS_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function articleLd(post: Post) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seo.description || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author.name === "TTR Digital" ? { "@type": "Organization", name: site.name, url: SITE_URL } : { "@type": "Person", name: post.author.name },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    image: post.image?.url || `${SITE_URL}/og-default.png`,
    inLanguage: "en-US",
  };
}
