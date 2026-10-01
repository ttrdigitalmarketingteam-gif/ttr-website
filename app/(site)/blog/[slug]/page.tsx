import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LeadSection from "@/components/LeadSection";
import PortableBody from "@/components/PortableBody";
import ServiceCards from "@/components/ServiceCards";
import { getPost, getPosts, getServices, getSettings, servicesBySlug } from "@/lib/data";
import { articleLd } from "@/lib/jsonld";
import { buildMetadata, withBrand } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: withBrand(post.title),
    description: post.excerpt,
    path: `/blog/${slug}`,
    seo: post.seo,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    image: post.image ? { url: post.image.url, width: post.image.width, height: post.image.height, alt: post.image.alt } : undefined,
  });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts, services, settings] = await Promise.all([getPost(slug), getPosts(), getServices(), getSettings()]);
  if (!post) notFound();
  const related = servicesBySlug(services, post.relatedServices.length ? post.relatedServices : ["seo", "search-everywhere-optimization", "google-ads"]);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const path = `/blog/${slug}`;

  return (
    <>
      <article>
        <header className="page-hero">
          <div className="container narrow">
            <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path }]} />
            <h1>{post.title}</h1>
            <p className="post-meta">
              By {post.author.name} · <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
              {post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) && (
                <> · Updated <time dateTime={post.updatedAt}>{fmt(post.updatedAt)}</time></>
              )}
            </p>
            {post.image && (
              <Image
                className="post-hero-img"
                src={post.image.url}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                sizes="(max-width: 840px) 100vw, 760px"
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
        </header>
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="container narrow">
            <PortableBody value={post.body} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section-tint" aria-labelledby="post-services-title">
          <div className="container">
            <h2 id="post-services-title" className="section-title">Services related to this post</h2>
            <ServiceCards services={related} />
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="section" aria-labelledby="more-posts-title">
          <div className="container narrow">
            <h2 id="more-posts-title">More from the blog</h2>
            <ul className="link-list">
              {more.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>)}
            </ul>
          </div>
        </section>
      )}

      <LeadSection settings={settings} />
      <JsonLd data={articleLd(post)} />
    </>
  );
}
