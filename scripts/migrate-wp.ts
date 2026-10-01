// Imports the WordPress blog into Sanity.
//
// - Reads /wp-json/wp/v2/posts, pages, media, categories and users with
//   per_page=100 pagination. If SiteGround's anti-bot check blocks the request,
//   it reads the copy saved by `npm run wp:export` (scripts/wp-export/).
// - Every post becomes a Sanity "post" with a stable id (wp-post-{id}) written
//   with createOrReplace, so the script is safe to rerun.
// - HTML bodies become Portable Text (@portabletext/block-tools). Images are
//   uploaded as Sanity assets and inline image URLs point at those assets.
// - Yoast title and description go into each post's seo field.
// - Pages are not imported. They were built with Elementor, so they are rebuilt
//   as structured Sanity documents (see scripts/seed-sanity.ts) and their old
//   URLs get 301 redirects (lib/redirects.ts, REDIRECTS.md).
//
// Auth: SANITY_API_WRITE_TOKEN from the environment if set, never in code.
// Usage: npm run migrate:wp
import fs from "node:fs";
import path from "node:path";
import { htmlToBlocks } from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { posts as starterPosts } from "../lib/content";
import { checkRedirects } from "./lib/redirect-report";
import { writeClient } from "./lib/sanity";

const WP = (process.env.WP_URL || "https://ttrdigitalmarketing.com").replace(/\/$/, "");
const EXPORT_DIR = path.join(process.cwd(), "scripts", "wp-export");
const client = writeClient();

type WPItem = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const failures: string[] = [];
const notes: string[] = [];
const sources: Record<string, string> = {};

/* ---------- reading WordPress ---------- */

const isBlocked = (type: string, text: string) => !type.includes("json") || /sgcaptcha/.test(text);

async function wpList(type: string): Promise<WPItem[]> {
  const all: WPItem[] = [];
  try {
    for (let page = 1; page < 100; page++) {
      const res = await fetch(`${WP}/wp-json/wp/v2/${type}?per_page=100&page=${page}`, { headers: { Accept: "application/json" } });
      const text = await res.text();
      if (res.status === 400 && page > 1) break; // past the last page
      if (res.status === 401 || res.status === 403) throw new Error(`HTTP ${res.status}`);
      if (!res.ok || isBlocked(res.headers.get("content-type") || "", text)) throw new Error(`blocked (HTTP ${res.status})`);
      const items = JSON.parse(text) as WPItem[];
      all.push(...items);
      const totalPages = Number(res.headers.get("x-wp-totalpages") || 1);
      if (!items.length || page >= totalPages) break;
    }
    sources[type] = "live API";
    return all;
  } catch (err) {
    const file = path.join(EXPORT_DIR, `${type}.json`);
    if (fs.existsSync(file)) {
      sources[type] = `export copy (live: ${(err as Error).message})`;
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }
    sources[type] = `unavailable (${(err as Error).message})`;
    if (type !== "users") failures.push(`Could not read ${type}: ${(err as Error).message}. Run "npm run wp:export" first.`);
    return [];
  }
}

const manifest: Record<string, { file: string; type: string }> = fs.existsSync(path.join(EXPORT_DIR, "media-manifest.json"))
  ? JSON.parse(fs.readFileSync(path.join(EXPORT_DIR, "media-manifest.json"), "utf8"))
  : {};

async function downloadImage(url: string): Promise<Buffer> {
  try {
    const res = await fetch(url);
    const type = res.headers.get("content-type") || "";
    if (res.ok && type.startsWith("image/")) return Buffer.from(await res.arrayBuffer());
    throw new Error(`HTTP ${res.status} ${type}`);
  } catch (err) {
    const saved = manifest[url];
    if (saved) return fs.readFileSync(path.join(EXPORT_DIR, "media", saved.file));
    throw err;
  }
}

/* ---------- images ---------- */

const uploaded = new Map<string, string>();
let imagesUploaded = 0;
let imagesReused = 0;

async function uploadImage(url: string): Promise<string | null> {
  const clean = url.split("?")[0];
  if (uploaded.has(clean)) return uploaded.get(clean)!;
  try {
    const existing = await client.fetch<string | null>(`*[_type == "sanity.imageAsset" && source.id == $id][0]._id`, { id: clean });
    if (existing) {
      imagesReused++;
      uploaded.set(clean, existing);
      return existing;
    }
    const buffer = await downloadImage(clean);
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(new URL(clean).pathname),
      source: { id: clean, name: "wordpress", url: clean },
    });
    imagesUploaded++;
    uploaded.set(clean, asset._id);
    return asset._id;
  } catch (err) {
    failures.push(`Image ${clean}: ${(err as Error).message}`);
    return null;
  }
}

/* ---------- HTML to Portable Text ---------- */

// Mirrors the "blockContent" type in sanity/schemaTypes. altImage is declared as a
// plain object here because a bare schema has no built-in image hotspot types;
// the image blocks themselves are built by the <img> rule below.
const blockContentType = Schema.compile({
  name: "migration",
  types: [
    { name: "altImage", type: "object", fields: [{ name: "alt", type: "string" }, { name: "caption", type: "string" }] },
    {
      name: "blockContent",
      type: "array",
      of: [
        {
          type: "block",
          styles: ["normal", "h2", "h3", "h4", "blockquote"].map((value) => ({ title: value, value })),
          marks: {
            decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
            annotations: [{ name: "link", type: "object", fields: [{ name: "href", type: "string" }] }],
          },
        },
        { type: "altImage" },
      ],
    },
  ],
}).get("blockContent");

const imgSrc = (el: Element) => el.getAttribute("data-lazy-src") || el.getAttribute("data-src") || el.getAttribute("src") || "";

async function htmlToBody(html: string) {
  // Upload every image first, then map <img> tags to Sanity image blocks.
  const doc = new JSDOM(html).window.document;
  for (const img of Array.from(doc.querySelectorAll("img"))) {
    const src = imgSrc(img);
    if (src && !src.startsWith("data:")) await uploadImage(new URL(src, WP).toString());
  }
  return htmlToBlocks(html, blockContentType as never, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        deserialize(el) {
          if ((el as Element).tagName?.toLowerCase() !== "img") return undefined;
          const img = el as Element;
          const src = imgSrc(img);
          const ref = src && !src.startsWith("data:") ? uploaded.get(new URL(src, WP).toString().split("?")[0]) : undefined;
          if (!ref) return undefined;
          return { _type: "altImage", asset: { _type: "reference", _ref: ref }, alt: img.getAttribute("alt") || "" } as never;
        },
      },
    ],
  });
}

const text = (html: string) => (new JSDOM(`<body>${html}</body>`).window.document.body.textContent || "").replace(/\s+/g, " ").trim();
const isPlaceholder = (html: string) => /lorem ipsum/i.test(text(html));

/* ---------- main ---------- */

async function main() {
  console.log(`Reading WordPress at ${WP} ...`);
  const [posts, pages, media, categories, users] = [
    await wpList("posts"),
    await wpList("pages"),
    await wpList("media"),
    await wpList("categories"),
    await wpList("users"),
  ];

  const tx = client.transaction();

  // Categories
  for (const c of categories) {
    tx.createOrReplace({ _id: `wp-category-${c.id}`, _type: "category", title: text(c.name), slug: { _type: "slug", current: c.slug }, description: c.description || undefined });
  }

  // Authors (the users endpoint needs a login on most sites, so fall back to Yoast's author name)
  const authorIds = new Set<number>(posts.map((p) => p.author));
  for (const id of authorIds) {
    const user = users.find((u) => u.id === id);
    const name = user?.name || posts.find((p) => p.author === id)?.yoast_head_json?.author || "TTR Digital";
    tx.createOrReplace({ _id: `wp-user-${id}`, _type: "author", name, slug: { _type: "slug", current: user?.slug || name.toLowerCase().replace(/\W+/g, "-") }, role: "TTR Digital Marketing team" });
  }

  const existingServices = new Set(await client.fetch<string[]>(`*[_type == "service"]._id`));

  let postsImported = 0;
  for (const p of posts) {
    try {
      const title = text(p.title.rendered);
      const starter = starterPosts.find((s) => s.slug === p.slug);
      const placeholder = isPlaceholder(p.content.rendered);
      let body;
      if (placeholder && starter) {
        body = starter.body;
        notes.push(`${p.slug}: WordPress body was placeholder text, used the starter article from lib/content.ts`);
      } else {
        body = await htmlToBody(p.content.rendered);
      }

      const yoast = p.yoast_head_json || {};
      // Some featured images are missing from /media (unattached or hidden), so fall back to Yoast's og:image.
      const featured = media.find((m) => m.id === p.featured_media);
      const featuredUrl: string | undefined = featured?.source_url || yoast.og_image?.[0]?.url;
      let mainImage;
      if (featuredUrl) {
        const ref = await uploadImage(featuredUrl);
        if (ref) mainImage = { _type: "altImage", asset: { _type: "reference", _ref: ref }, alt: featured?.alt_text || title };
      }
      const related = (starter?.relatedServices || []).map((s) => `service-${s}`).filter((id) => existingServices.has(id));

      tx.createOrReplace({
        _id: `wp-post-${p.id}`,
        _type: "post",
        wpId: p.id,
        title,
        slug: { _type: "slug", current: p.slug },
        publishedAt: `${p.date_gmt}Z`,
        updatedAt: placeholder && starter?.updatedAt ? starter.updatedAt : `${p.modified_gmt}Z`,
        author: { _type: "reference", _ref: `wp-user-${p.author}` },
        categories: (p.categories || []).map((id: number) => ({ _key: `c${id}`, _type: "reference", _ref: `wp-category-${id}` })),
        excerpt: placeholder && starter ? starter.excerpt : text(p.excerpt.rendered),
        mainImage,
        body,
        relatedServices: related.map((id) => ({ _key: id, _type: "reference", _ref: id })),
        seo: { _type: "seo", title: yoast.title ? text(yoast.title) : undefined, description: yoast.description || undefined },
      });
      postsImported++;
    } catch (err) {
      failures.push(`Post ${p.id} (${p.slug}): ${(err as Error).message}`);
    }
  }

  await tx.commit({ visibility: "sync" });

  // Pages: not imported, only reported.
  const builder = pages.filter((p) => String(p.template || "").startsWith("elementor") || /elementor/.test(p.content?.rendered || ""));
  const redirects = checkRedirects();
  if (redirects.missing.length) failures.push(...redirects.missing.map((u) => `No redirect for old URL ${u}`));

  console.log("\n=========== WordPress import summary ===========");
  console.log(`Sources:        ${Object.entries(sources).map(([k, v]) => `${k}: ${v}`).join("; ")}`);
  console.log(`Posts:          ${postsImported} of ${posts.length} imported (ids wp-post-{id}, slugs unchanged)`);
  console.log(`Categories:     ${categories.length}   Authors: ${authorIds.size}`);
  console.log(`Images:         ${imagesUploaded} uploaded, ${imagesReused} already in Sanity`);
  console.log(`Pages:          0 imported, ${pages.length} skipped (${builder.length} built with Elementor, ${pages.length - builder.length} test, thank-you or bio pages)`);
  console.log(`Redirects:      ${redirects.pageRedirects} page redirects + ${redirects.patternRedirects} pattern redirects, ${redirects.checked} old URLs checked (${redirects.sitemap} in sitemap), ${redirects.missing.length} without a destination`);
  if (notes.length) console.log(`Notes:\n  - ${notes.join("\n  - ")}`);
  console.log(failures.length ? `Failed (${failures.length}):\n  - ${failures.join("\n  - ")}` : "Failed:         nothing");
  console.log("================================================\n");
  if (failures.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
