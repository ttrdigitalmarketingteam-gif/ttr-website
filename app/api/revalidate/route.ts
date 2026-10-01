import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string; slug?: string | { current?: string } };

// Sanity webhook: POST with a projection like {_type, "slug": slug.current}
// and the secret from SANITY_REVALIDATE_SECRET.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.warn("[revalidate] SANITY_REVALIDATE_SECRET is not set, ignoring webhook.");
    return Response.json({ ok: false, message: "Revalidation secret not configured" }, { status: 500 });
  }
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) return Response.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    if (!body?._type) return Response.json({ ok: false, message: "Missing _type" }, { status: 400 });

    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    revalidateTag(body._type, { expire: 0 });

    const paths: string[] = [];
    if (body._type === "post") paths.push("/blog", ...(slug ? [`/blog/${slug}`] : []));
    else if (body._type === "service") paths.push("/services", ...(slug ? [`/services/${slug}`] : []));
    else if (body._type === "nichePage" && slug) paths.push(`/${slug}`);
    else if (body._type === "page" && slug) paths.push(`/${slug}`);
    // Settings, home page, testimonials, authors and categories appear on many pages.
    if (paths.length === 0) revalidatePath("/", "layout");
    paths.forEach((p) => revalidatePath(p));
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");

    return Response.json({ ok: true, type: body._type, slug, paths, now: Date.now() });
  } catch (err) {
    console.error("[revalidate] error:", (err as Error).message);
    return Response.json({ ok: false, message: "Error" }, { status: 500 });
  }
}
