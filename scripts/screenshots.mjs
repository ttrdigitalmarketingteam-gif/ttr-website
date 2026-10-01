// Takes screenshots of every page at 375, 390 and 1280 wide and fails if any
// page scrolls sideways. Usage: npm run build && npm start, then
//   node scripts/screenshots.mjs [baseUrl]
import { chromium } from "playwright";
import fs from "node:fs";

const base = process.argv[2] || "http://localhost:3000";
const paths = [
  "/", "/services", "/services/seo", "/services/search-everywhere-optimization", "/services/google-ads", "/services/meta-ads",
  "/services/websites", "/services/social-media", "/services/gohighlevel-crm", "/services/ai-agents",
  "/dental-marketing", "/home-services-marketing", "/blog", "/blog/seo-services-pricing", "/about", "/contact", "/privacy", "/terms", "/does-not-exist",
];
const widths = [375, 390, 1280];
fs.mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const problems = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Scroll through the page so lazy images load before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    const { scrollWidth, h1s } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      h1s: document.querySelectorAll("h1").length,
    }));
    if (scrollWidth > width) problems.push(`${path} @${width}: page is ${scrollWidth}px wide (sideways scroll)`);
    if (h1s !== 1) problems.push(`${path} @${width}: ${h1s} h1 tags`);
    const name = (path === "/" ? "home" : path.slice(1).replace(/\//g, "_")) + `-${width}.png`;
    await page.screenshot({ path: `screenshots/${name}`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : `OK: ${paths.length} pages x ${widths.length} widths, no sideways scroll, one h1 each`);
process.exit(problems.length ? 1 : 0);
