import { notFound } from "next/navigation";
import SimplePage from "@/components/SimplePage";
import { getPage, getSettings } from "@/lib/data";
import { buildMetadata, withBrand } from "@/lib/seo";

const SLUG = "privacy";
export const revalidate = 300;

export async function generateMetadata() {
  const page = await getPage(SLUG);
  if (!page) return {};
  return buildMetadata({ title: withBrand(page.title), description: page.intro, path: `/${SLUG}`, seo: page.seo });
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage(SLUG), getSettings()]);
  if (!page) notFound();
  return <SimplePage page={page} settings={settings} path={`/${SLUG}`} />;
}
