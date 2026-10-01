import type { NextConfig } from "next";
import { redirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  // We handle trailing slashes ourselves (last rule below) so old WordPress
  // URLs like /about-us/ reach their new page in a single 301.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      ...redirects.flatMap((r) => [
        { source: r.source, destination: r.destination, statusCode: 301 as const },
        // Old WordPress URLs end with a slash. Match that too so it is one hop, not two.
        ...(r.source.endsWith("*") || r.source.endsWith(".xml") ? [] : [{ source: `${r.source}/`, destination: r.destination, statusCode: 301 as const }]),
      ]),
      // Any other URL with a trailing slash (for example old blog post URLs) goes to the same URL without it.
      { source: "/:path+/", destination: "/:path+", statusCode: 301 as const },
    ];
  },
};

export default nextConfig;
