// Checks that every old WordPress URL has a destination and rewrites REDIRECTS.md.
// With --live <baseUrl> it also requests every old URL (with its trailing slash)
// from a running site and checks for a single 301 to the right page.
//   npm run redirects:check
//   npm run redirects:check -- --live http://localhost:3000
import { checkRedirects } from "./lib/redirect-report";

async function main() {
  const r = checkRedirects();
  console.log(`Checked ${r.checked} old URLs (${r.sitemap} in sitemap). ${r.pageRedirects} page redirects, ${r.patternRedirects} pattern redirects.`);
  if (r.missing.length) {
    console.error("Old URLs with no redirect:\n" + r.missing.join("\n"));
    process.exit(1);
  }
  console.log("Every old URL has a destination. REDIRECTS.md updated.");

  const i = process.argv.indexOf("--live");
  if (i === -1) return;
  const base = (process.argv[i + 1] || "http://localhost:3000").replace(/\/$/, "");
  const bad: string[] = [];
  for (const row of r.rows) {
    const oldPath = row.path === "/" ? "/" : `${row.path}/`;
    const res = await fetch(base + oldPath, { redirect: "manual" });
    const loc = res.headers.get("location") ? new URL(res.headers.get("location")!, base).pathname : null;
    if (row.path === "/") {
      if (res.status !== 200) bad.push(`${oldPath}: expected 200, got ${res.status}`);
    } else if (res.status !== 301 || loc !== row.to) {
      bad.push(`${oldPath}: expected 301 to ${row.to}, got ${res.status} ${loc ?? ""}`);
    } else {
      const final = await fetch(base + loc);
      if (final.status !== 200) bad.push(`${oldPath}: destination ${loc} returned ${final.status}`);
    }
  }
  console.log(bad.length ? `Live check problems:\n${bad.join("\n")}` : `Live check OK: ${r.rows.length} old URLs, each a single 301 to a page that returns 200.`);
  if (bad.length) process.exit(1);
}

main();
