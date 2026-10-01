# Redirects from the old WordPress site

Every page URL from the old site, checked against its Yoast sitemap (`page-sitemap.xml`, `post-sitemap.xml`) and the WP REST API page list.
The redirects live in `lib/redirects.ts` and are loaded by `next.config.ts`. Each one answers both with and without the trailing slash, with a 301.
Blog posts keep their slugs. Their old URLs end with a slash, and a general rule sends any URL with a trailing slash to the same address without it, also with a single 301.

- Old URLs checked: 107 (101 in the sitemap)
- Page redirects: 102
- Pattern redirects: 9
- Old URLs with no destination: 0

| Old URL | New URL | Type | In old sitemap |
| --- | --- | --- | --- |
| / | / | kept (same URL) | yes |
| /about-candace-garthee/ | /about | 301 | no |
| /about-kia/ | /about | 301 | yes |
| /about-us/ | /about | 301 | yes |
| /al/ | /services | 301 | yes |
| /al/birmingham-seo/ | /services/seo | 301 | yes |
| /audit/ | /contact | 301 | yes |
| /blog/ | /blog | kept (same URL) | yes |
| /blog/digital-marketing-trends-2021-for-local-businesses/ | /blog/digital-marketing-trends-2021-for-local-businesses | kept (same URL) | yes |
| /blog/seo-services-pricing/ | /blog/seo-services-pricing | kept (same URL) | yes |
| /blog/social-media-marketing-strategy/ | /blog/social-media-marketing-strategy | kept (same URL) | yes |
| /ca/ | /services | 301 | yes |
| /ca/san-francisco-digital-marketing/ | /services | 301 | yes |
| /ca/san-francisco-ppc/ | /services/google-ads | 301 | yes |
| /ca/san-francisco-seo/ | /services/seo | 301 | yes |
| /ca/san-francisco-social-media/ | /services/social-media | 301 | yes |
| /callrail-form-test/ | / | 301 | no |
| /contact-us/ | /contact | 301 | yes |
| /dc/ | /services | 301 | yes |
| /dc/washington-dc-digital-marketing/ | /services | 301 | yes |
| /dc/washington-ppc/ | /services/google-ads | 301 | yes |
| /dc/washington-seo/ | /services/seo | 301 | yes |
| /dc/washington-social-media/ | /services/social-media | 301 | yes |
| /digital-marketing-referral-program/ | /contact | 301 | yes |
| /digital-marketing-services/ | /services | 301 | yes |
| /digital-marketing-services/automotive/ | /services | 301 | yes |
| /digital-marketing-services/health-care/ | /dental-marketing | 301 | yes |
| /digital-marketing-services/insurance/ | /services | 301 | yes |
| /digital-marketing-services/ppc/ | /services/google-ads | 301 | yes |
| /digital-marketing-services/seo/ | /services/seo | 301 | yes |
| /digital-marketing-services/social-media/ | /services/social-media | 301 | yes |
| /fl/ | /services | 301 | yes |
| /fl/aventura-digital-marketing/ | /services | 301 | yes |
| /fl/aventura-ppc/ | /services/google-ads | 301 | yes |
| /fl/aventura-seo/ | /services/seo | 301 | yes |
| /fl/aventura-social-media/ | /services/social-media | 301 | yes |
| /fl/miami-digital-marketing/ | / | 301 | yes |
| /fl/miami-ppc/ | /services/google-ads | 301 | yes |
| /fl/miami-seo/ | /services/seo | 301 | yes |
| /fl/miami-social-media/ | /services/social-media | 301 | yes |
| /fl/orlando-digital-marketing/ | /services | 301 | yes |
| /fl/orlando-ppc/ | /services/google-ads | 301 | yes |
| /fl/orlando-seo/ | /services/seo | 301 | yes |
| /fl/orlando-social-media/ | /services/social-media | 301 | yes |
| /ga/ | /services | 301 | yes |
| /ga/atlanta-digital-marketing/ | /services | 301 | yes |
| /ga/atlanta-ppc/ | /services/google-ads | 301 | yes |
| /ga/atlanta-seo/ | /services/seo | 301 | yes |
| /ga/atlanta-social-media/ | /services/social-media | 301 | yes |
| /ghl-form-embed-test/ | / | 301 | no |
| /il/ | /services | 301 | yes |
| /il/chicago-digital-marketing/ | /services | 301 | yes |
| /il/chicago-ppc/ | /services/google-ads | 301 | yes |
| /il/chicago-seo/ | /services/seo | 301 | yes |
| /il/chicago-social-media/ | /services/social-media | 301 | yes |
| /il/schaumburg-digital-marketing/ | /services | 301 | yes |
| /il/schaumburg-ppc/ | /services/google-ads | 301 | yes |
| /il/schaumburg-seo/ | /services/seo | 301 | yes |
| /il/schaumburg-social-media/ | /services/social-media | 301 | yes |
| /ip-location-test/ | / | 301 | no |
| /ma/ | /services | 301 | yes |
| /ma/boston-ppc/ | /services/google-ads | 301 | yes |
| /ma/boston-seo/ | /services/seo | 301 | yes |
| /ma/boston-social-media/ | /services/social-media | 301 | yes |
| /md/ | /services | 301 | yes |
| /md/chevy-chase-digital-marketing/ | /services | 301 | yes |
| /md/chevy-chase-ppc/ | /services/google-ads | 301 | yes |
| /md/chevy-chase-seo/ | /services/seo | 301 | yes |
| /md/chevy-chase-social-media/ | /services/social-media | 301 | yes |
| /ny/ | /services | 301 | yes |
| /ny/new-york-ppc/ | /services/google-ads | 301 | yes |
| /ny/new-york-seo/ | /services/seo | 301 | yes |
| /ny/new-york-social-media/ | /services/social-media | 301 | yes |
| /pa/ | /services | 301 | yes |
| /pa/philadelphia-digital-marketing/ | /services | 301 | yes |
| /pa/philadelphia-ppc/ | /services/google-ads | 301 | yes |
| /pa/philadelphia-seo/ | /services/seo | 301 | yes |
| /pa/philadelphia-social-media/ | /services/social-media | 301 | yes |
| /privacy-policy/ | /privacy | 301 | yes |
| /reviews/ | /about | 301 | no |
| /sitemap/ | / | 301 | yes |
| /terms-of-service/ | /terms | 301 | yes |
| /testing-page/ | / | 301 | yes |
| /thank-you-free-audit/ | /contact | 301 | yes |
| /thank-you-new/ | /contact | 301 | no |
| /thank-you/ | /contact | 301 | yes |
| /va/ | /services | 301 | yes |
| /va/arlington-digital-marketing/ | /services | 301 | yes |
| /va/arlington-ppc/ | /services/google-ads | 301 | yes |
| /va/arlington-seo/ | /services/seo | 301 | yes |
| /va/arlington-social-media/ | /services/social-media | 301 | yes |
| /va/fairfax-digital-marketing/ | /services | 301 | yes |
| /va/fairfax-ppc/ | /services/google-ads | 301 | yes |
| /va/fairfax-seo/ | /services/seo | 301 | yes |
| /va/fairfax-social-media/ | /services/social-media | 301 | yes |
| /va/herndon-digital-marketing/ | /services | 301 | yes |
| /va/herndon-ppc/ | /services/google-ads | 301 | yes |
| /va/herndon-seo/ | /services/seo | 301 | yes |
| /va/herndon-social-media/ | /services/social-media | 301 | yes |
| /va/mclean-digital-marketing/ | /services | 301 | yes |
| /va/mclean-ppc/ | /services/google-ads | 301 | yes |
| /va/mclean-seo/ | /services/seo | 301 | yes |
| /va/mclean-social-media/ | /services/social-media | 301 | yes |
| /va/reston-digital-marketing/ | /services | 301 | yes |
| /va/reston-ppc/ | /services/google-ads | 301 | yes |
| /va/reston-seo/ | /services/seo | 301 | yes |
| /va/reston-social-media/ | /services/social-media | 301 | yes |

## Pattern redirects

| Old URL pattern | New URL |
| --- | --- |
| /category/:slug* | /blog |
| /author/:slug* | /blog |
| /tag/:slug* | /blog |
| /blog/page/:n | /blog |
| /feed | /blog |
| /page-sitemap.xml | /sitemap.xml |
| /post-sitemap.xml | /sitemap.xml |
| /sitemap_index.xml | /sitemap.xml |
| /wp-sitemap.xml | /sitemap.xml |
