// Data access. Every function asks Sanity first and falls back to the starter
// content in lib/content.ts, so pages still render when Sanity is empty,
// unreachable or not configured yet.
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import * as starter from "./content";
import type { Body, Home, Logo, Niche, Page, Post, Service, Settings, Testimonial } from "./types";

export const REVALIDATE = 300;

async function sanity<T>(query: string, params: Record<string, unknown>, tags: string[]): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE, tags } });
  } catch (err) {
    console.warn(`[sanity] query failed, using starter content (${tags.join(",")}):`, (err as Error).message);
    return null;
  }
}

// Drop null, undefined, "" and [] so missing Sanity fields fall back to starter values.
function clean<T extends object>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)),
  ) as Partial<T>;
}

function merge<T extends object>(base: T, override: Partial<T> | null | undefined): T {
  const o = clean(override ?? undefined) as Partial<T> & { seo?: object };
  const b = base as T & { seo?: object };
  return { ...base, ...o, ...(b.seo || o.seo ? { seo: { ...b.seo, ...clean(o.seo) } } : {}) } as T;
}

const seoProjection = `seo{title, description, noIndex, "ogImage": ogImage.asset->url}`;
const bodyProjection = `body[]{..., _type == "altImage" => {..., "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}}`;

/* Settings */
const settingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  phone, email, street, city, region, postalCode, hoursText,
  "badges": badges[]{name, url, "src": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height},
  "clientLogos": clientLogos[]{name, url, "src": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height}
}`);

type SettingsDoc = {
  phone?: string; email?: string; street?: string; city?: string; region?: string; postalCode?: string; hoursText?: string;
  badges?: Logo[]; clientLogos?: Logo[];
};

export async function getSettings(): Promise<Settings> {
  const doc = await sanity<SettingsDoc>(settingsQuery, {}, ["siteSettings"]);
  const s = starter.settings;
  if (!doc) return s;
  const phone = doc.phone || s.phone;
  const digits = phone.replace(/\D/g, "");
  return {
    phone,
    phoneE164: digits.length === 10 ? `+1${digits}` : digits.length === 11 ? `+${digits}` : s.phoneE164,
    email: doc.email || s.email,
    address: {
      street: doc.street || s.address.street,
      city: doc.city || s.address.city,
      region: doc.region || s.address.region,
      postalCode: doc.postalCode || s.address.postalCode,
      country: s.address.country,
    },
    hoursText: doc.hoursText || s.hoursText,
    badges: doc.badges?.filter((b) => b.src)?.length ? doc.badges.filter((b) => b.src) : s.badges,
    clientLogos: doc.clientLogos?.filter((b) => b.src) ?? [],
  };
}

/* Home */
const homeQuery = defineQuery(`*[_id == "homePage"][0]{
  heroEyebrow, heroHeading, heroText, heroPoints, stats[]{value, label}, process[]{title, text},
  faqs[]{question, answer}, ctaHeading, ctaText, ${seoProjection}
}`);

export async function getHome(): Promise<Home> {
  return merge(starter.home, await sanity<Partial<Home>>(homeQuery, {}, ["homePage"]));
}

/* Testimonials */
const testimonialsQuery = defineQuery(`*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt asc){
  quote, name, role, company, "stats": coalesce(stats[]{value, label}, [])
}`);

export async function getTestimonials(): Promise<Testimonial[]> {
  const docs = await sanity<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]);
  return docs?.length ? docs : starter.testimonials;
}

/* Services */
const serviceFields = `title, "slug": slug.current, summary, heading, intro, benefits, process[]{title, text},
  ${bodyProjection}, faqs[]{question, answer}, "related": related[]->slug.current, ${seoProjection}`;
const servicesQuery = defineQuery(`*[_type == "service" && defined(slug.current)] | order(coalesce(order, 999) asc, title asc){ ${serviceFields} }`);

function fillService(doc: Partial<Service>): Service {
  const base = starter.services.find((s) => s.slug === doc.slug);
  const empty: Service = {
    slug: doc.slug || "", title: "", summary: "", heading: "", intro: "", benefits: [], process: [], body: [], faqs: [], related: [], seo: {},
  };
  const svc = merge(base ?? empty, doc);
  return { ...svc, heading: svc.heading || svc.title };
}

export async function getServices(): Promise<Service[]> {
  const docs = await sanity<Partial<Service>[]>(servicesQuery, {}, ["service"]);
  return docs?.length ? docs.map(fillService) : starter.services;
}

export async function getService(slug: string): Promise<Service | null> {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

/* Industry (niche) pages */
const nicheQuery = defineQuery(`*[_type == "nichePage" && slug.current == $slug][0]{
  title, "slug": slug.current, heading, intro, problems[]{title, text}, "services": services[]->slug.current,
  process[]{title, text}, ${bodyProjection}, faqs[]{question, answer}, ${seoProjection}
}`);

export async function getNiche(slug: string): Promise<Niche | null> {
  const base = starter.niches.find((n) => n.slug === slug);
  const doc = await sanity<Partial<Niche>>(nicheQuery, { slug }, ["nichePage"]);
  if (!base && !doc) return null;
  const empty: Niche = { slug, title: "", heading: "", intro: "", problems: [], services: [], process: [], body: [], faqs: [], seo: {} };
  return merge(base ?? empty, doc);
}

/* Simple pages */
const pageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title, "slug": slug.current, heading, intro, ${bodyProjection}, ${seoProjection}
}`);

export async function getPage(slug: string): Promise<Page | null> {
  const base = starter.pages.find((p) => p.slug === slug);
  const doc = await sanity<Partial<Page>>(pageQuery, { slug }, ["page"]);
  if (!base && !doc) return null;
  return merge(base ?? { slug, title: "", heading: "", intro: "", body: [], seo: {} }, doc);
}

/* Blog */
const postFields = `title, "slug": slug.current, publishedAt, updatedAt, excerpt,
  "author": coalesce(author->{name, role}, {"name": "TTR Digital"}),
  "categories": coalesce(categories[]->{title, "slug": slug.current}, []),
  "image": mainImage{alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height},
  "relatedServices": coalesce(relatedServices[]->slug.current, []), ${seoProjection}`;
const postsQuery = defineQuery(`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){ ${postFields} }`);
const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0]{ ${postFields}, ${bodyProjection} }`);

function fillPost(doc: Partial<Post>): Post {
  const base = starter.posts.find((p) => p.slug === doc.slug);
  const empty: Post = {
    slug: doc.slug || "", title: "", publishedAt: new Date(0).toISOString(), author: { name: "TTR Digital" }, categories: [],
    excerpt: "", body: [], relatedServices: [], seo: {},
  };
  const post = merge(base ?? empty, doc);
  if (post.image && !post.image.url) delete post.image;
  if (post.image && !post.image.alt) post.image = { ...post.image, alt: post.title };
  return post;
}

export async function getPosts(): Promise<Post[]> {
  const docs = await sanity<Partial<Post>[]>(postsQuery, {}, ["post"]);
  const list = docs?.length ? docs.map(fillPost) : starter.posts;
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<Post | null> {
  const hasSanityPosts = (await sanity<Partial<Post>[]>(postsQuery, {}, ["post"]))?.length;
  if (hasSanityPosts) {
    const doc = await sanity<Partial<Post>>(postQuery, { slug }, ["post"]);
    return doc ? fillPost(doc) : null;
  }
  return starter.posts.find((p) => p.slug === slug) ?? null;
}

export function servicesBySlug(all: Service[], slugs: string[]): Service[] {
  return slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is Service => Boolean(x));
}

export type { Body };
