// Copies the starter content from lib/content.ts into Sanity so the team can
// edit it in the studio at /cms.
//
// Safe to rerun: documents that already exist are left alone, so edits made in
// the studio are never overwritten. Pass --force to replace them.
//
// Usage: npm run seed
import fs from "node:fs";
import path from "node:path";
import * as starter from "../lib/content";
import type { Faq, Stat, Step } from "../lib/types";
import { writeClient } from "./lib/sanity";

const force = process.argv.includes("--force");
const client = writeClient();
let n = 0;
const k = () => `s${(n++).toString(36)}`;
const keyed = <T extends object>(items: T[], type?: string) => items.map((i) => ({ _key: k(), ...(type ? { _type: type } : {}), ...i }));
const faqs = (f: Faq[]) => keyed(f, "faqItem");
const steps = (s: Step[]) => keyed(s, "step");
const stats = (s: Stat[]) => keyed(s, "stat");
const ref = (id: string) => ({ _key: k(), _type: "reference", _ref: id });
const slug = (s: string) => ({ _type: "slug", current: s });

async function uploadLocalImage(file: string) {
  const id = `local:${file}`;
  const existing = await client.fetch<string | null>(`*[_type == "sanity.imageAsset" && source.id == $id][0]._id`, { id });
  if (existing) return existing;
  const asset = await client.assets.upload("image", fs.createReadStream(path.join(process.cwd(), "public", file)), {
    filename: path.basename(file),
    source: { id, name: "starter-content" },
  });
  return asset._id;
}

async function main() {
  const docs: Record<string, unknown>[] = [];
  const s = starter.settings;

  const badges = [];
  for (const b of s.badges) {
    badges.push({ _key: k(), _type: "logo", name: b.name, image: { _type: "image", asset: { _type: "reference", _ref: await uploadLocalImage(b.src.replace(/^\//, "")) } } });
  }
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    phone: s.phone,
    email: s.email,
    street: s.address.street,
    city: s.address.city,
    region: s.address.region,
    postalCode: s.address.postalCode,
    hoursText: s.hoursText,
    badges,
    clientLogos: [],
  });

  const h = starter.home;
  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: h.heroEyebrow,
    heroHeading: h.heroHeading,
    heroText: h.heroText,
    heroPoints: h.heroPoints,
    stats: stats(h.stats),
    process: steps(h.process),
    faqs: faqs(h.faqs),
    ctaHeading: h.ctaHeading,
    ctaText: h.ctaText,
    seo: { _type: "seo", ...h.seo },
  });

  starter.services.forEach((svc, i) =>
    docs.push({
      _id: `service-${svc.slug}`,
      _type: "service",
      title: svc.title,
      slug: slug(svc.slug),
      order: (i + 1) * 10,
      summary: svc.summary,
      heading: svc.heading,
      intro: svc.intro,
      benefits: svc.benefits,
      process: steps(svc.process),
      body: svc.body,
      faqs: faqs(svc.faqs),
      related: svc.related.map((r) => ref(`service-${r}`)),
      seo: { _type: "seo", ...svc.seo },
    }),
  );

  for (const niche of starter.niches) {
    docs.push({
      _id: `niche-${niche.slug}`,
      _type: "nichePage",
      title: niche.title,
      slug: slug(niche.slug),
      heading: niche.heading,
      intro: niche.intro,
      problems: steps(niche.problems),
      services: niche.services.map((r) => ref(`service-${r}`)),
      process: steps(niche.process),
      body: niche.body,
      faqs: faqs(niche.faqs),
      seo: { _type: "seo", ...niche.seo },
    });
  }

  for (const page of starter.pages) {
    docs.push({
      _id: `page-${page.slug}`,
      _type: "page",
      title: page.title,
      slug: slug(page.slug),
      heading: page.heading,
      intro: page.intro,
      body: page.body,
      seo: { _type: "seo", ...page.seo },
    });
  }

  starter.testimonials.forEach((t, i) =>
    docs.push({ _id: `testimonial-${i + 1}`, _type: "testimonial", order: i + 1, quote: t.quote, name: t.name, role: t.role, company: t.company, stats: stats(t.stats) }),
  );

  const existing = new Set(await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: docs.map((d) => d._id) }));
  const tx = client.transaction();
  let created = 0;
  let skipped = 0;
  for (const doc of docs) {
    if (existing.has(doc._id as string) && !force) {
      skipped++;
      continue;
    }
    tx.createOrReplace(doc as { _id: string; _type: string });
    created++;
  }
  if (created) await tx.commit({ visibility: "async" });
  console.log(`Seed done: ${created} written, ${skipped} already existed and were left alone${force ? "" : " (use --force to replace)"}.`);
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
