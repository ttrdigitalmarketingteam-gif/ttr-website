// Crawls every URL in the sitemap of a running site and checks the SEO rules:
// one h1, unique title and description, canonical, Open Graph tags, JSON-LD
// types, image alt text, internal links, plus the writing rules (no em dashes,
// no prices, no "guaranteed" rankings).
//   npm run build && npm start, then: npm run seo:check [-- http://localhost:3000]
import { JSDOM } from "jsdom";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const problems = [];
const fail = (url, msg) => problems.push(`${url}: ${msg}`);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const titles = new Map();
const descriptions = new Map();
const incoming = new Map(urls.map((u) => [new URL(u).pathname, 0]));

for (const url of urls) {
  const path = new URL(url).pathname;
  const res = await fetch(base + path);
  if (res.status !== 200) {
    fail(path, `HTTP ${res.status}`);
    continue;
  }
  const doc = new JSDOM(await res.text()).window.document;
  const meta = (sel) => doc.querySelector(sel)?.getAttribute("content") || "";

  const h1 = doc.querySelectorAll("h1").length;
  if (h1 !== 1) fail(path, `${h1} h1 tags`);

  const title = doc.title.trim();
  const desc = meta('meta[name="description"]');
  if (!title) fail(path, "missing title");
  if (title.length > 70) fail(path, `title is ${title.length} characters`);
  if (!desc) fail(path, "missing meta description");
  if (desc.length > 170) fail(path, `description is ${desc.length} characters`);
  if (titles.has(title)) fail(path, `duplicate title with ${titles.get(title)}`);
  if (descriptions.has(desc)) fail(path, `duplicate description with ${descriptions.get(desc)}`);
  titles.set(title, path);
  descriptions.set(desc, path);

  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href");
  if (!canonical) fail(path, "missing canonical");
  else if (new URL(canonical).pathname !== path) fail(path, `canonical points to ${canonical}`);

  for (const p of ["og:title", "og:description", "og:url", "og:image", "og:type"]) if (!meta(`meta[property="${p}"]`)) fail(path, `missing ${p}`);
  if (!meta('meta[name="twitter:card"]')) fail(path, "missing twitter:card");

  const types = new Set();
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(s.textContent);
      for (const node of data["@graph"] || [data]) [node["@type"]].flat().forEach((t) => types.add(t));
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }
  const need = ["Organization", "LocalBusiness"];
  if (path !== "/") need.push("BreadcrumbList");
  if (path.startsWith("/services/") || path.endsWith("-marketing")) need.push("Service");
  if (path.startsWith("/blog/")) need.push("BlogPosting");
  if (doc.querySelector(".faq")) need.push("FAQPage");
  for (const t of need) if (!types.has(t)) fail(path, `missing JSON-LD ${t}`);

  for (const img of doc.querySelectorAll("img")) if (!img.hasAttribute("alt")) fail(path, `image without alt: ${img.getAttribute("src")}`);
  if (!doc.querySelector('a[href^="tel:"]')) fail(path, "no click-to-call link");
  if (!doc.querySelector("form.lead-form")) fail(path, "no lead form");

  for (const a of doc.querySelectorAll("main a[href^='/']")) {
    const target = a.getAttribute("href").split("#")[0];
    if (incoming.has(target) && target !== path) incoming.set(target, incoming.get(target) + 1);
  }

  const text = doc.querySelector("main")?.textContent || "";
  if (/—/.test(text)) fail(path, "contains an em dash");
  if (/guarantee/i.test(text)) fail(path, 'contains the word "guarantee"');
  if (/\$\s?\d/.test(text)) fail(path, "contains a price");
}

for (const [path, count] of incoming) if (count === 0 && path !== "/") fail(path, "no internal links from page content");

for (const [path, check] of [
  ["/robots.txt", (t) => t.includes("Sitemap:") && t.includes("Disallow: /cms")],
  ["/llms.txt", (t) => t.startsWith("# TTR Digital Marketing")],
]) {
  const res = await fetch(base + path);
  if (res.status !== 200 || !check(await res.text())) fail(path, "missing or wrong");
}

console.log(`Checked ${urls.length} pages from the sitemap.`);
console.log(problems.length ? `Problems (${problems.length}):\n${problems.join("\n")}` : "All SEO checks passed.");
process.exit(problems.length ? 1 : 0);
