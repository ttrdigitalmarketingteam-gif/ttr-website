import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadSection from "@/components/LeadSection";
import { getPosts, getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Digital Marketing Blog for Local Businesses | TTR Digital",
  description: "Plain-English tips on SEO, AI search, Google Ads, social media and lead follow up for local businesses, dental practices and home service companies.",
  path: "/blog",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
          <h1>Marketing tips for local businesses</h1>
          <p className="lead">
            Simple, practical advice on getting found and getting more calls. For hands-on help, see our <Link href="/services">services</Link>.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {posts.length ? (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug} className="card card-link post-card">
                  <time dateTime={p.publishedAt}>{fmt(p.publishedAt)}</time>
                  <h2 style={{ fontSize: "1.25rem", marginTop: 6 }}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p>{p.excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>New posts are coming soon.</p>
          )}
        </div>
      </section>
      <LeadSection settings={settings} />
    </>
  );
}
