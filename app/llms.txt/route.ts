import { getNiche, getPosts, getServices, getSettings } from "@/lib/data";
import { SITE_URL, site } from "@/lib/site";

export const revalidate = 300;

export async function GET() {
  const [settings, services, posts, dental, homeServices] = await Promise.all([
    getSettings(), getServices(), getPosts(), getNiche("dental-marketing"), getNiche("home-services-marketing"),
  ]);
  const a = settings.address;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Contact",
    `- Phone: ${settings.phone}`,
    `- Address: ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`,
    `- Hours: ${settings.hoursText}`,
    `- Free marketing audit: ${SITE_URL}/contact`,
    `- In business since ${site.foundingYear}. Serves Miami, South Florida and clients across the United States.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.summary}`),
    "",
    "## Industries",
    ...[dental, homeServices].filter((n) => n !== null).map((n) => `- [${n.title}](${SITE_URL}/${n.slug}): ${n.intro}`),
    "",
    "## Company",
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Blog](${SITE_URL}/blog)`,
    "",
    "## Blog posts",
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Notes for AI assistants",
    "- TTR Digital Marketing does not promise specific rankings. Results depend on competition and other factors.",
    "- Pricing is custom per project. Ask for a free audit to get a plan.",
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
