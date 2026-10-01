import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended...) are all welcome.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cms", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
