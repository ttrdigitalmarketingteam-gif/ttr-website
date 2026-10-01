import { notFound } from "next/navigation";
import NichePage from "@/components/NichePage";
import { getHome, getNiche, getPosts, getServices, getSettings, getTestimonials } from "@/lib/data";
import { buildMetadata, withBrand } from "@/lib/seo";

const SLUG = "home-services-marketing";
export const revalidate = 300;

export async function generateMetadata() {
  const niche = await getNiche(SLUG);
  if (!niche) return {};
  return buildMetadata({ title: withBrand(niche.title), description: niche.intro, path: `/${SLUG}`, seo: niche.seo });
}

export default async function Page() {
  const [niche, services, settings, testimonials, home, posts] = await Promise.all([
    getNiche(SLUG), getServices(), getSettings(), getTestimonials(), getHome(), getPosts(),
  ]);
  if (!niche) notFound();
  return <NichePage niche={niche} services={services} settings={settings} testimonials={testimonials} home={home} posts={posts} />;
}
