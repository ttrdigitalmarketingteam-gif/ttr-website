import type { MetadataRoute } from "next";
import { getNiche, getPage, getPosts, getServices } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, dental, homeServices, about, contact, privacy, terms] = await Promise.all([
    getServices(), getPosts(), getNiche("dental-marketing"), getNiche("home-services-marketing"),
    getPage("about"), getPage("contact"), getPage("privacy"), getPage("terms"),
  ]);
  const now = new Date();
  const entry = (path: string, priority: number, lastModified: Date | string = now): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  });
  const indexable = <T extends { seo: { noIndex?: boolean } } | null>(x: T) => x && !x.seo.noIndex;

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...services.filter(indexable).map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...(indexable(dental) ? [entry("/dental-marketing", 0.9)] : []),
    ...(indexable(homeServices) ? [entry("/home-services-marketing", 0.9)] : []),
    ...(indexable(about) ? [entry("/about", 0.6)] : []),
    ...(indexable(contact) ? [entry("/contact", 0.7)] : []),
    entry("/blog", 0.6),
    ...posts.filter(indexable).map((p) => ({ ...entry(`/blog/${p.slug}`, 0.5, p.updatedAt || p.publishedAt), changeFrequency: "monthly" as const })),
    ...(indexable(privacy) ? [entry("/privacy", 0.2)] : []),
    ...(indexable(terms) ? [entry("/terms", 0.2)] : []),
  ];
}
