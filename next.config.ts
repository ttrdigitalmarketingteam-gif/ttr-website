import type { NextConfig } from "next";
import { redirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return redirects.flatMap((r) => [
      { source: r.source, destination: r.destination, statusCode: 301 },
      // Old WordPress URLs end with a slash. Match that too so it is one hop, not two.
      ...(r.source.endsWith("*") || r.source.endsWith(".xml") ? [] : [{ source: `${r.source}/`, destination: r.destination, statusCode: 301 }]),
    ]);
  },
};

export default nextConfig;
