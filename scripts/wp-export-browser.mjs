// Saves a copy of the WordPress REST API data and post images into
// scripts/wp-export/ using a real (headless) browser.
//
// Why: the old site sits behind SiteGround's anti-bot check, which answers
// plain scripts with a captcha page. A browser solves the check on its own.
// scripts/migrate-wp.ts reads the live API first and falls back to this copy.
//
// Usage: node scripts/wp-export-browser.mjs [https://ttrdigitalmarketing.com]
import { chromium } from "playwright";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE = (process.argv[2] || process.env.WP_URL || "https://ttrdigitalmarketing.com").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "scripts", "wp-export");
fs.mkdirSync(path.join(OUT, "media"), { recursive: true });

// Inside Claude Code cloud sessions HTTPS goes through an agent proxy with its
// own CA. Trust exactly that CA (by public key pin) when it is present.
const args = [];
const launch = {};
const ca = "/root/.ccr/agent-proxy-ca.crt";
if (process.env.HTTPS_PROXY && fs.existsSync(ca)) {
  const spki = execSync(`openssl x509 -in ${ca} -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64`).toString().trim();
  args.push(`--ignore-certificate-errors-spki-list=${spki}`);
  launch.proxy = { server: process.env.HTTPS_PROXY };
}

const browser = await chromium.launch({ args, ...launch });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
});
const page = await ctx.newPage();
const challenged = (t) => /sgcaptcha|Checking the site connection|requires cookies/.test(t);

async function open(url) {
  for (let attempt = 0; attempt < 8; attempt++) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => null);
    let html = "";
    for (let i = 0; i < 30; i++) {
      await page.waitForTimeout(1000);
      html = await page.evaluate(() => document.documentElement.outerHTML).catch(() => "");
      if (html && !challenged(html) && !page.url().includes("sgcaptcha")) return true;
    }
  }
  return false;
}

// Fetch from inside the page so the anti-bot cookie is sent along.
async function get(url, binary = false) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const r = await page
      .evaluate(
        async ({ url, binary }) => {
          const res = await fetch(url, { credentials: "include" });
          const type = res.headers.get("content-type") || "";
          const pages = res.headers.get("x-wp-totalpages");
          if (binary) {
            const bytes = new Uint8Array(await res.arrayBuffer());
            let s = "";
            for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
            return { status: res.status, type, pages, body: btoa(s) };
          }
          return { status: res.status, type, pages, body: await res.text() };
        },
        { url, binary },
      )
      .catch(() => null);
    if (r && !(r.type.includes("text/html") && challenged(binary ? atob(r.body.slice(0, 4000)) : r.body))) return r;
    await open(url);
  }
  throw new Error(`Could not get past the anti-bot check for ${url}`);
}

await open(`${BASE}/`);
const summary = {};
for (const type of ["posts", "pages", "media", "categories", "users"]) {
  const all = [];
  for (let n = 1; n < 100; n++) {
    const r = await get(`${BASE}/wp-json/wp/v2/${type}?per_page=100&page=${n}`);
    if (r.status !== 200) {
      if (n === 1) console.warn(`  ${type}: HTTP ${r.status} (skipped)`);
      break;
    }
    const items = JSON.parse(r.body);
    all.push(...items);
    if (!items.length || n >= Number(r.pages || 1)) break;
  }
  fs.writeFileSync(path.join(OUT, `${type}.json`), JSON.stringify(all, null, 1));
  summary[type] = all.length;
}

for (const name of ["sitemap_index.xml", "page-sitemap.xml", "post-sitemap.xml"]) {
  const r = await get(`${BASE}/${name}`);
  if (r.status === 200) fs.writeFileSync(path.join(OUT, name), r.body);
}

// Images used by posts: featured images and inline <img> tags.
const posts = JSON.parse(fs.readFileSync(path.join(OUT, "posts.json"), "utf8"));
const media = JSON.parse(fs.readFileSync(path.join(OUT, "media.json"), "utf8"));
const urls = new Set();
for (const p of posts) {
  const featured = media.find((m) => m.id === p.featured_media);
  if (featured) urls.add(featured.source_url);
  for (const m of p.content.rendered.matchAll(/<img[^>]+(?:data-lazy-src|src)="([^"]+)"/g)) if (!m[1].startsWith("data:")) urls.add(m[1]);
}
const manifest = {};
for (const url of urls) {
  try {
    const r = await get(url, true);
    if (r.status !== 200 || !r.type.startsWith("image/")) throw new Error(`HTTP ${r.status} ${r.type}`);
    const file = `${Object.keys(manifest).length}-${path.basename(new URL(url).pathname)}`;
    fs.writeFileSync(path.join(OUT, "media", file), Buffer.from(r.body, "base64"));
    manifest[url] = { file, type: r.type };
  } catch (err) {
    console.warn(`  image failed: ${url} (${err.message})`);
  }
}
fs.writeFileSync(path.join(OUT, "media-manifest.json"), JSON.stringify(manifest, null, 1));
summary.images = Object.keys(manifest).length;

await browser.close();
console.log("Saved WordPress export to scripts/wp-export:", summary);
