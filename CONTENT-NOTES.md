# Content notes from the current WordPress site

Source: https://ttrdigitalmarketing.com, read on 2026-10-01 through its pages, Yoast sitemaps (`post-sitemap.xml`, `page-sitemap.xml`) and the WP REST API.
The site sits behind SiteGround's bot check, so plain requests get a captcha page. I read it with a headless browser.

## Business details

| Item | Old site says | Plan for new site |
| --- | --- | --- |
| Name | TTR Digital Marketing (TTR Digital Marketing Inc.) | Same |
| Main phone | **(703) 775-1397** (header, footer, schema) | ❓ See question 1 |
| Other phones | +1 571-370-9191 (Organization schema), **(786) 460-1311** (Miami page) | |
| Address | 10565 Fairfax Blvd 2nd floor, Fairfax, VA 22030 (schema). Miami page: 150 SE 2nd Ave, Suite 300, Miami, FL 33131 | **1000 Brickell Ave Ste 715, Miami, FL 33131** (from your brief) |
| Hours | Mon to Fri, 9:00 AM to 5:00 PM (Miami page). Schema says 10 to 5 | Mon to Fri, 9 AM to 5 PM |
| Email | ttrdigitalmarketingteam@gmail.com (schema only, not shown on pages) | Not shown unless you want it |
| Founded | 2015 | Same |
| Social | facebook.com/TTRDigitalMarketing, linkedin.com/company/ttr-digital-marketing, instagram.com/ttrdigitalmarketing, twitter.com/ttrdigital | Footer + `sameAs` in schema |
| Team | Kia Khamoushi, Chief Business Development Officer (real bio, SEO for law, dental, healthcare, real estate and more). Candace Garthee, Project Manager (her page is still placeholder text) | Kia on /about. Candace only if you send a bio |

## Brand

- **Logo:** horizontal wordmark "TTRDIGITAL" with black "TTR" and purple "DIGITAL", plus a "TT" icon.
  Files: `2019/12/ttrdigital-marketing-icon.png` (1000px wide), `2021/01/ttrdigital-marketing-logo-white.png`, `2020/12/TTRDM-Logo-Icon.png`. All are PNG. An SVG would be sharper and smaller if you have one.
- **Colors:**
  - Purple `#6D3584` (buttons, highlights, main brand color)
  - Deep plum `#521442` (hover, dark accents)
  - Light lavender `#ECD4F6` (soft backgrounds)
  - Near-black `#32373C` / `#000000` (text)
  - The hero also uses a soft lavender-to-peach gradient.
- **Fonts:** the old site loads four (Open Sans, Source Sans Pro, Roboto, Cooper Hewitt). The new site will use two at most. My plan is one clean sans for everything (Inter or Open Sans), with a second only if you want a display font for headings.

## Messaging I can reuse (reworded to sound plain and friendly)

- Headline: "Digital Marketing Solutions Reimagined." Sub: "It's your turn to shine... get the attention and revenue your business deserves."
- Main offer: **Free marketing audit**, made up of a 30-minute strategy call, an in-depth audit and a growth roadmap. The free consultation covers a website review with next steps, a look at what works for your competitors, technical issues that hurt rankings, and how well the site converts.
- Process: **Research, Strategy, Results** (custom plans instead of templates, decisions based on your goals, full transparency).
- Why TTR: 100% campaign transparency, friendly team of experts, customer-focused service, creative and complete solutions. "Coming from a small business ourselves."
- SEO process: (1) SEO audit and roadmap, (2) website structure, user experience and lead tracking, (3) brand amplification (on-page, promotion, links).
- Services on the old site: Local SEO, PPC / paid search, social media marketing, web design and development, email marketing. Industry pages exist for healthcare, automotive and insurance.
- I'm dropping claims I can't back up or that break your writing rules: "top leader", "thousands of clients", the "$2000 offer", and the certification list (ISO 9001:2008, IACRB, SOC Type II, GSA). Please confirm any of those you want to keep.
- New services in your brief (Search Everywhere Optimization, Meta Ads, GoHighLevel CRM, AI agents) and the dental and home-services niches have no copy on the old site. I'll write fresh starter copy for them.

## Proof

- **One attributed testimonial:** "We used to only get 2 cases per day, now we're getting 10-15 per day." by Chris Aaron, CEO, Displays & Holders.
- **Results for that client:** 411% increase in organic traffic year over year, 688% increase in keywords ranking in the top 10.
- **One unattributed quote:** "They are professional. They are quick. They are always on top of it and I couldn't be happier with them."
- The /reviews page is empty, and no Google reviews are embedded anywhere.
- **No client logos.** The "logos" section is partner and tool badges: Google Partner, Meta (Facebook) Marketing Partner, BBB, GSA Contract Holder, ISO 9001, and tool logos (Semrush, Ahrefs, Moz, Surfer, AccuRanker, Shopify, Magento, BigCommerce, Squarespace, Google Shopping).
- I'll build the logo strip and testimonials as Sanity lists so you can add real ones without code.

## Blog (3 posts, all in "Uncategorized", author "TTR Digital")

| Slug | Date | Yoast title |
| --- | --- | --- |
| /blog/social-media-marketing-strategy/ | 2021-09-09 | Effective Social Media Marketing Strategies for 2021 |
| /blog/seo-services-pricing/ | 2021-09-02 | SEO Services Pricing in 2021: How much does SEO services cost? |
| /blog/digital-marketing-trends-2021-for-local-businesses/ | 2020-12-17 | Learn Digital Marketing Trends 2021 for Local Businesses |

⚠️ **The posts have no real article.** All three have the same intro paragraph about 2020 as their excerpt. Their body is an Elementor template with "Lorem Ipsum Dolor" testimonial blocks and a "$2000 offer" banner. The live post pages show only the title and author. The migration script will still import all three (title, slug, date, author, category, excerpt, featured image, Yoast SEO), but there is nothing real to show. See question 3.

## Pages (104 published, 97 in the sitemap)

- **Core pages:** Home, About Us, Services (SEO, PPC, Social Media, plus industry pages for Healthcare, Automotive and Insurance), Contact Us, Free Audit, Referral Program, Privacy Policy, Terms of Service, Sitemap, Blog.
- **City pages:** about 85 Elementor pages across 11 states and DC (VA, DC, MD, FL, GA, IL, MA, NY, PA, CA, AL). Each city has `-digital-marketing`, `-seo`, `-ppc` and `-social-media` versions. All are page-builder pages, so per your brief none get imported.
- **Test and leftover pages:** callrail-form-test, ghl-form-embed-test, ip-location-test, testing-page, thank-you, thank-you-new, thank-you-free-audit, reviews, about-candace-garthee. Most are noindex.

### Redirect plan (full list goes in REDIRECTS.md, checked against the sitemap)

| Old | New |
| --- | --- |
| /about-us/, /about-kia/ | /about |
| /contact-us/, /audit/, /thank-you*/ | /contact |
| /digital-marketing-services/ | /services |
| /digital-marketing-services/seo/ | /services/seo |
| /digital-marketing-services/ppc/ | /services/google-ads |
| /digital-marketing-services/social-media/ | /services/social-media |
| /digital-marketing-services/health-care/ | /dental-marketing |
| /digital-marketing-services/automotive/, /insurance/ | /services |
| /terms-of-service/, /privacy-policy/ | /terms, /privacy |
| /{state}/{city}-seo/ | /services/seo |
| /{state}/{city}-ppc/ | /services/google-ads |
| /{state}/{city}-social-media/ | /services/social-media |
| /{state}/{city}-digital-marketing/ and /{state}/ hubs | /services |
| Test pages, /sitemap/, /digital-marketing-referral-program/ | / |
| /blog/{slug}/ | unchanged |

## Technical notes

- **Sanity write test passed.** A createOrReplace and a delete against the production dataset both returned 200 with no token in code, so the API credential works.
- **SiteGround bot protection blocks plain scripts** (they get a 202 captcha page). `scripts/migrate-wp.ts` will try the REST API directly first. If it gets the captcha, it reads a JSON copy I save with the headless browser into `scripts/wp-export/`. Turning off SiteGround's anti-bot for `/wp-json/` would let it read the live API directly.
- Old SEO targeted "small businesses in DMV". The new site will target Miami, dental practices and home-services companies.

## Questions before I build

1. **Phone number:** use the Miami number **(786) 460-1311**, or keep **(703) 775-1397**? I suggest the Miami number, since the new address is Brickell.
2. **Hours:** is Mon to Fri, 9 AM to 5 PM right?
3. **Blog posts:** the 3 old posts have no real body. Should I (a) import them as-is, (b) import them and hide them from the site and sitemap until someone writes them, or (c) import them and I write a short real starter article for each? I suggest (c).
4. **Healthcare redirect:** should /digital-marketing-services/health-care/ go to /dental-marketing or to /services?
5. **Badges:** are Google Partner, Meta Partner and BBB still current? I'll leave out GSA and ISO unless you confirm them.

## Decisions (you said "go with all you have")

1. Phone: **(786) 460-1311** everywhere (header, sticky Call button, footer, schema).
2. Hours: Monday to Friday, 9 AM to 5 PM.
3. Blog: all 3 posts imported with their original slugs, dates and Yoast SEO fields. Their placeholder bodies were replaced with short new starter articles (no prices, nothing promised).
4. /digital-marketing-services/health-care/ redirects to /dental-marketing.
5. Badges shown: Google Partner, Meta Business Partner, BBB. GSA and ISO left out. All badges and client logos are editable in Sanity under Site settings.
