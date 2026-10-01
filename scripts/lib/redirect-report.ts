import fs from "node:fs";
import path from "node:path";
import { patternRedirects, pageRedirects } from "../../lib/redirects";

const KEPT = (p: string) => p === "/" || p === "/blog" || p.startsWith("/blog/");

// Checks every old URL against the redirect list and writes REDIRECTS.md.
export function checkRedirects(root = process.cwd()) {
  const read = (f: string) =>
    fs.existsSync(path.join(root, f)) ? fs.readFileSync(path.join(root, f), "utf8").split("\n").map((l) => l.trim()).filter(Boolean) : [];
  const sitemap = read("scripts/data/old-sitemap-urls.txt");
  const allPages = read("scripts/data/old-page-urls.txt");
  const toPath = (u: string) => new URL(u).pathname.replace(/\/$/, "") || "/";
  const map = new Map(pageRedirects.map((r) => [r.source, r.destination]));

  const missing: string[] = [];
  const rows: string[] = [];
  for (const url of Array.from(new Set([...sitemap, ...allPages])).sort()) {
    const p = toPath(url);
    const inSitemap = sitemap.includes(url) ? "yes" : "no";
    if (map.has(p)) rows.push(`| ${p}/ | ${map.get(p)} | 301 | ${inSitemap} |`);
    else if (KEPT(p)) rows.push(`| ${p === "/" ? "/" : `${p}/`} | ${p} | kept (same URL) | ${inSitemap} |`);
    else missing.push(url);
  }

  const md = [
    "# Redirects from the old WordPress site",
    "",
    "Every page URL from the old site, checked against its Yoast sitemap (`page-sitemap.xml`, `post-sitemap.xml`) and the WP REST API page list.",
    "The redirects live in `lib/redirects.ts` and are loaded by `next.config.ts`. Each one answers both with and without the trailing slash, with a 301.",
    "Blog posts keep their slugs. Their old URLs end with a slash, and a general rule sends any URL with a trailing slash to the same address without it, also with a single 301.",
    "",
    `- Old URLs checked: ${rows.length + missing.length} (${sitemap.length} in the sitemap)`,
    `- Page redirects: ${pageRedirects.length}`,
    `- Pattern redirects: ${patternRedirects.length}`,
    `- Old URLs with no destination: ${missing.length}`,
    "",
    "| Old URL | New URL | Type | In old sitemap |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
    "## Pattern redirects",
    "",
    "| Old URL pattern | New URL |",
    "| --- | --- |",
    ...patternRedirects.map((r) => `| ${r.source} | ${r.destination} |`),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(root, "REDIRECTS.md"), md);
  return { rows: Array.from(new Set([...sitemap, ...allPages])).sort().filter((u) => !missing.includes(u)).map((u) => ({ url: u, path: toPath(u), to: map.get(toPath(u)) ?? toPath(u) })), checked: rows.length + missing.length, sitemap: sitemap.length, pageRedirects: pageRedirects.length, patternRedirects: patternRedirects.length, missing };
}
