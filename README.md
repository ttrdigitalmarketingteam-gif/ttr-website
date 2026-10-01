# TTR Digital Marketing website

Next.js (App Router) + Sanity. Fast, simple pages built to rank on Google and in AI search and to turn visitors into calls and form leads.

## How it fits together

| Part | Where |
| --- | --- |
| Pages | `app/(site)/` (home, services, niches, blog, about, contact, privacy, terms) |
| Starter content (used when Sanity is empty) | `lib/content.ts` |
| Sanity reads with fallback | `lib/data.ts` |
| Sanity schema and studio | `sanity/`, `sanity.config.ts`, studio at `/cms` |
| Lead form and API | `components/LeadForm.tsx`, `app/api/lead/route.ts`, `lib/ghl.ts` |
| Instant updates from Sanity | `app/api/revalidate/route.ts` (pages also rebuild every 5 minutes) |
| SEO | `lib/seo.ts`, `lib/jsonld.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` |
| Redirects from WordPress | `lib/redirects.ts` (used by `next.config.ts`), list in `REDIRECTS.md` |

## Environment variables

See `.env.example`. Set them in Vercel under Project > Settings > Environment Variables.

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL` (defaults to https://ttrdigitalmarketing.com)
- `SANITY_REVALIDATE_SECRET` for the webhook
- `GHL_API_KEY` (a GoHighLevel Private Integration token with contacts write access) and `GHL_LOCATION_ID`. If they are missing, the form still thanks the visitor, and the lead is written to the server log with a clear warning.

## Commands

```bash
npm run dev               # local dev
npm run build             # must pass before every push
npm run lint
npm run seed              # copy starter content into Sanity (never overwrites edits; --force to replace)
npm run wp:export         # save a copy of the WordPress API with a real browser (gets past SiteGround's bot check)
npm run migrate:wp        # import WordPress posts into Sanity and print a summary
npm run redirects:check   # check every old URL has a redirect and refresh REDIRECTS.md (add -- --live http://localhost:3000)
npm run seo:check         # crawl the sitemap of a running site and check SEO rules
npm run screenshots       # Playwright screenshots at 375, 390 and 1280 wide, fails on sideways scroll
```

## Sanity setup (one time)

1. In sanity.io/manage > API > CORS origins, add `https://ttrdigitalmarketing.com`, your Vercel preview domain and `http://localhost:3000`, each with **Allow credentials** on. The studio at `/cms` needs this.
2. In sanity.io/manage > API > Webhooks, add a webhook:
   - URL: `https://ttrdigitalmarketing.com/api/revalidate`
   - Trigger on create, update and delete; filter: `_type in ["post","service","nichePage","page","homePage","siteSettings","testimonial","author","category"]`
   - Projection: `{_type, "slug": slug.current}`
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`

## Writing rules

Plain, friendly tone. No em dashes. No prices. Never promise rankings. `npm run seo:check` flags the first three automatically.
