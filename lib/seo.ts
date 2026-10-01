import type { Metadata } from "next";
import { SITE_URL, site } from "./site";
import type { Seo } from "./types";

export const DEFAULT_OG_IMAGE = { url: "/og-default.png", width: 1200, height: 630, alt: site.name };

type MetaInput = {
  title: string;
  description: string;
  path: string;
  seo?: Seo;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({ title, description, path, seo, image, type = "website", publishedTime, modifiedTime }: MetaInput): Metadata {
  const finalTitle = seo?.title || title;
  const finalDescription = seo?.description || description;
  const url = `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
  const ogImage = seo?.ogImage ? { url: seo.ogImage, alt: finalTitle } : image ?? DEFAULT_OG_IMAGE;
  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      images: [ogImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: finalTitle, description: finalDescription, images: [ogImage.url] },
  };
}

// "Title | TTR Digital Marketing", trimmed so it stays readable in Google.
export const withBrand = (t: string) => (`${t} | ${site.name}`.length <= 65 ? `${t} | ${site.name}` : `${t} | TTR Digital`);
