// Starter content. The site falls back to this whenever Sanity is empty or
// unreachable, and scripts/seed-sanity.ts copies it into Sanity so the team
// can edit it in the studio at /cms.
//
// Writing rules: plain and friendly, no em dashes, no prices, and never
// promise rankings.

import { md } from "./portable";
import { site } from "./site";
import type { Home, Logo, Niche, Page, Post, Service, Settings, Testimonial } from "./types";

export const settings: Settings = {
  phone: site.phone,
  phoneE164: site.phoneE164,
  email: site.email,
  address: { ...site.address },
  hoursText: site.hoursText,
  badges: [
    { name: "Google Partner", src: "/badges/google-partner.webp", width: 186, height: 84 },
    { name: "Meta Business Partner", src: "/badges/meta-partner.webp", width: 210, height: 86 },
    { name: "BBB Accredited Business", src: "/badges/bbb.webp", width: 227, height: 86 },
  ] satisfies Logo[],
  clientLogos: [],
};

export const home: Home = {
  heroEyebrow: "Miami digital marketing agency",
  heroHeading: "Get found on Google and AI search, then turn those clicks into calls",
  heroText:
    "We help local businesses, dental practices and home service companies show up where customers are looking. Then we make sure every lead gets a fast reply, so more of them turn into booked appointments and jobs.",
  heroPoints: ["Free 30-minute strategy call", "Clear monthly reports in plain English", "In business since 2015"],
  stats: [
    { value: "411%", label: "more organic traffic year over year" },
    { value: "688%", label: "more keywords ranking in Google's top 10" },
    { value: "10 to 15", label: "new cases a day for one client, up from 2" },
  ],
  process: [
    {
      title: "Research",
      text: "We look at your website, your Google Business Profile, your ads and your competitors. You get a clear picture of what is working, what is not and where the quickest wins are.",
    },
    {
      title: "Strategy",
      text: "We build a plan around your goals and your budget, not a template. Every task is tied to more calls, more form leads or more booked jobs.",
    },
    {
      title: "Results",
      text: "We launch, track every call and form, and keep improving. You see what we did and what it brought in, every month, with no guesswork.",
    },
  ],
  faqs: [
    {
      question: "What happens on the free marketing audit call?",
      answer:
        "We spend about 30 minutes looking at your website, your Google presence and your competitors with you. You leave with a short list of things to fix first, whether or not you hire us.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Paid ads like Google Ads and Meta Ads can bring calls within the first few weeks. SEO and AI search take longer, usually a few months before you see steady growth. We share progress every month so you always know where things stand.",
    },
    {
      question: "What is Search Everywhere Optimization?",
      answer:
        "People now search on Google, Google Maps, YouTube and AI tools like ChatGPT, Gemini and Perplexity. Search Everywhere Optimization makes your business easy to find and easy to recommend in all of those places, not just in the classic blue links.",
    },
    {
      question: "Can you promise I will be number one on Google?",
      answer:
        "No honest agency can promise a ranking, because Google and AI tools decide what to show. What we can promise is clear work, clear reporting and a plan focused on the searches that bring you real customers.",
    },
    {
      question: "Do you only work with businesses in Miami?",
      answer:
        "Our office is on Brickell Avenue in Miami and many of our clients are in South Florida, but we work with businesses across the United States.",
    },
    {
      question: "What kinds of businesses do you work with?",
      answer:
        "Mostly local service businesses. Dental practices and home service companies like HVAC, plumbing, roofing and cleaning are our main focus, along with other small and mid-sized businesses that live on calls and booked appointments.",
    },
  ],
  ctaHeading: "Ready for more calls and booked jobs?",
  ctaText: "Book a free marketing audit. We will show you where your leads are slipping away and how to fix it.",
  seo: {
    title: "Miami Digital Marketing Agency for Local Businesses | TTR Digital",
    description:
      "TTR Digital Marketing helps Miami businesses, dental practices and home service companies get found on Google and AI search and turn clicks into calls. Free audit.",
  },
};

export const testimonials: Testimonial[] = [
  {
    quote: "We used to only get 2 cases per day, now we're getting 10 to 15 per day.",
    name: "Chris Aaron",
    role: "CEO",
    company: "Displays & Holders",
    stats: [
      { value: "411%", label: "more organic traffic year over year" },
      { value: "688%", label: "more keywords in the top 10" },
    ],
  },
  {
    quote: "They are professional. They are quick. They are always on top of it and I couldn't be happier with them.",
    company: "TTR Digital client",
    stats: [],
  },
];

export const services: Service[] = [
  {
    slug: "seo",
    title: "SEO",
    summary: "Show up in Google search and Google Maps when local customers look for what you do.",
    heading: "SEO that brings local customers to your door",
    intro:
      "Most people pick a business from the first few results on Google or the map pack. Our SEO work helps you earn those spots for the searches that matter, then turns that traffic into calls and form leads.",
    benefits: [
      "A full SEO audit and a clear roadmap",
      "Google Business Profile setup and ongoing updates",
      "Service and location pages written for real customers",
      "Technical fixes for speed, mobile and indexing",
      "Review growth and local citations",
      "Monthly reports that show calls and leads, not just rankings",
    ],
    process: [
      { title: "Audit and roadmap", text: "We check your site, your profile and your competitors, then rank the fixes by impact." },
      { title: "Fix the foundation", text: "Site structure, speed, tracking and on-page basics come first, so every later step works harder." },
      { title: "Grow authority", text: "Helpful content, local links and reviews show Google that you are the trusted choice in your area." },
      { title: "Measure and improve", text: "We track calls, forms and rankings and adjust the plan every month." },
    ],
    body: md(`
## Local SEO for businesses that live on calls
If your customers search for things like "dentist near me" or "AC repair Miami", local SEO is often the best long-term source of leads. Unlike ads, you do not pay for each click, and the results keep working after the work is done.

## SEO that also works for AI search
Google AI Overviews, ChatGPT and other AI tools pull from the same signals we build for SEO: clear pages, strong reviews and consistent business info. That is why every SEO plan we run is part of our [Search Everywhere Optimization](/services/search-everywhere-optimization) approach.

## Pair it with ads for faster results
SEO takes a few months to build. Many clients run [Google Ads](/services/google-ads) at the same time so the phone rings while organic rankings grow.
`),
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer: "Most businesses start to see movement within the first few months, with steadier growth after that. It depends on your competition, your site and how much work is needed up front.",
      },
      {
        question: "Do you write the content?",
        answer: "Yes. Our team writes service pages, location pages and blog posts, and we run everything by you before it goes live.",
      },
      {
        question: "Will you work on my existing website?",
        answer: "Usually, yes. We work with WordPress, Wix, Squarespace, Shopify and most other platforms. If your site holds you back, we will tell you and show you the options.",
      },
    ],
    related: ["search-everywhere-optimization", "websites", "google-ads"],
    seo: {
      title: "Local SEO Services in Miami | TTR Digital Marketing",
      description: "Local SEO that gets your business into Google search and the map pack, then turns that traffic into calls and leads. Free SEO audit from our Miami team.",
    },
  },
  {
    slug: "search-everywhere-optimization",
    title: "Search Everywhere Optimization",
    summary: "Be the business that Google, Google Maps and AI tools like ChatGPT and Gemini recommend.",
    heading: "Search Everywhere Optimization for Google and AI answers",
    intro:
      "Your customers no longer search in just one place. They ask Google, scroll the map, watch YouTube and ask ChatGPT for a recommendation. We make your business easy to find and easy to recommend in all of them.",
    benefits: [
      "Visibility checks across Google, AI Overviews, ChatGPT, Gemini and Perplexity",
      "Clear, well-structured pages that AI tools can quote",
      "Structured data so search engines understand your business",
      "Consistent business info across directories and maps",
      "Review and reputation growth",
      "Reporting on where you show up and where you do not yet",
    ],
    process: [
      { title: "Find the gaps", text: "We test the questions your customers ask and see who gets recommended today." },
      { title: "Make your site easy to quote", text: "We rewrite key pages with direct answers, FAQs and structured data." },
      { title: "Build trust signals", text: "Reviews, citations, mentions and consistent details tell every platform you are legit." },
      { title: "Track and expand", text: "We re-check visibility every month and add new questions and topics." },
    ],
    body: md(`
## Why classic SEO is not enough anymore
More searches now end with an AI summary instead of a click. If your business is not part of that answer, you can lose leads even when you rank well. Search Everywhere Optimization builds on strong [SEO](/services/seo) and adds the work that helps AI tools understand and mention you.

## What AI tools look for
AI answers favor businesses with clear, factual pages, plenty of good reviews, consistent name, address and phone details, and mentions on trusted sites. We work on all of those at once.

## Great for local service businesses
This is especially useful for [dental practices](/dental-marketing) and [home service companies](/home-services-marketing), where people often ask an AI tool "who is the best near me".
`),
    faqs: [
      {
        question: "Is this the same as SEO?",
        answer: "It starts with SEO, then goes further. We also optimize for AI answers, maps, reviews and other places people search, and we track visibility in AI tools directly.",
      },
      {
        question: "Can you get my business mentioned in ChatGPT?",
        answer: "Nobody controls what an AI tool says. We improve the signals these tools rely on, like clear pages, reviews and mentions, which makes it more likely they recommend you.",
      },
      {
        question: "How do you measure AI search visibility?",
        answer: "We regularly test the questions your customers ask in the major AI tools and track how often your business appears, alongside normal Google rankings and leads.",
      },
    ],
    related: ["seo", "websites", "ai-agents"],
    seo: {
      title: "Search Everywhere Optimization: Google and AI Search | TTR Digital",
      description: "Get your business found and recommended in Google, AI Overviews, ChatGPT, Gemini and Perplexity. Search Everywhere Optimization from TTR Digital in Miami.",
    },
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    summary: "Reach people the moment they search for your service, and pay for real leads, not wasted clicks.",
    heading: "Google Ads management that brings calls, not just clicks",
    intro:
      "Google Ads put you at the top of the page when someone is ready to buy. We build and manage campaigns that focus on calls and booked appointments, and we cut the spend that does not bring them.",
    benefits: [
      "Search, Local Services Ads and Performance Max campaigns",
      "Keyword research and negative keyword lists to cut waste",
      "Ad copy and landing pages built to convert",
      "Call tracking and form tracking set up right",
      "Weekly tuning of bids, keywords and ads",
      "Monthly reports on cost per lead and booked jobs",
    ],
    process: [
      { title: "Account review", text: "We look at what you have now, or plan a clean new setup." },
      { title: "Build the campaigns", text: "Tight ad groups, strong ads and a landing page that matches each search." },
      { title: "Track every lead", text: "Calls and forms are tracked so we optimize for leads, not clicks." },
      { title: "Tune every week", text: "We trim waste and move budget to what works." },
    ],
    body: md(`
## Ads that match what people search
A person searching "emergency plumber" needs a different ad and page than someone searching "water heater installation". We group keywords tightly and send each search to a page that answers it.

## Landing pages matter as much as ads
Good ads sent to a slow or confusing page waste money. We can build fast landing pages as part of our [website service](/services/websites), and connect them to your [GoHighLevel CRM](/services/gohighlevel-crm) so leads get a quick follow up.

## Ads and SEO work better together
Ads bring leads now. [SEO](/services/seo) lowers your cost per lead over time. Many clients run both.
`),
    faqs: [
      {
        question: "How soon will I get leads from Google Ads?",
        answer: "Often within the first few weeks after launch. The first month or two is also a learning period where we tune keywords and ads to lower the cost per lead.",
      },
      {
        question: "Do I keep my ad account?",
        answer: "Yes. The account and all of its data belong to you.",
      },
      {
        question: "Do you manage Local Services Ads?",
        answer: "Yes. For many home service businesses and some dental practices, Local Services Ads are a great fit, and we manage them along with regular search campaigns.",
      },
    ],
    related: ["meta-ads", "websites", "gohighlevel-crm"],
    seo: {
      title: "Google Ads Management in Miami | TTR Digital Marketing",
      description: "Google Ads campaigns built for calls and booked appointments. Search, Local Services Ads and Performance Max management from TTR Digital in Miami.",
    },
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    summary: "Facebook and Instagram ads that reach the right local people and bring in new leads.",
    heading: "Meta Ads on Facebook and Instagram that bring in real leads",
    intro:
      "Facebook and Instagram let you reach people before they even start searching. We create ads, offers and lead forms that turn scrolling into booked calls, and we follow up fast so leads do not go cold.",
    benefits: [
      "Campaign strategy built around a clear offer",
      "Ad creative: images, short videos and copy",
      "Instant lead forms or landing pages",
      "Retargeting for people who visited your site",
      "Leads sent straight into your CRM",
      "Reporting on cost per lead and booked appointments",
    ],
    process: [
      { title: "Pick the offer", text: "We help you choose an offer your audience will act on." },
      { title: "Create and launch", text: "We make the ads, set the audience and launch with clear tracking." },
      { title: "Fast follow up", text: "Leads go into your CRM with instant text and email replies." },
      { title: "Test and scale", text: "We test new ads and audiences and put budget behind the winners." },
    ],
    body: md(`
## Why Meta Ads work for local businesses
Most people in your area scroll Facebook or Instagram every day. With the right offer, you can reach homeowners or patients near you long before they search on Google.

## Speed to lead is everything
Social leads go cold fast. We connect your ads to [GoHighLevel](/services/gohighlevel-crm) and can add an [AI agent](/services/ai-agents) that replies within seconds, day or night.

## Build trust with good content
Ads work better when your page looks active. Our [social media](/services/social-media) team can keep your profiles fresh.
`),
    faqs: [
      {
        question: "Are Facebook leads good quality?",
        answer: "They can be, with the right offer, targeting and a quick follow up. We add simple questions to forms and reply fast to filter out people who are not serious.",
      },
      {
        question: "Do you make the ad creative?",
        answer: "Yes. We write the copy and create images and short videos. If you have photos or videos of your work, those usually perform best.",
      },
    ],
    related: ["google-ads", "social-media", "gohighlevel-crm"],
    seo: {
      title: "Meta Ads Management: Facebook and Instagram Ads | TTR Digital",
      description: "Facebook and Instagram ads that reach local customers and bring in leads, with fast follow up through your CRM. Meta Ads management from TTR Digital in Miami.",
    },
  },
  {
    slug: "websites",
    title: "Website Design",
    summary: "Fast, mobile-friendly websites that look great, rank well and turn visitors into calls.",
    heading: "Websites built to rank and turn visitors into customers",
    intro:
      "Your website is where most people decide whether to call you. We build fast, clean, mobile-first sites with clear calls to action, so more visitors pick up the phone or fill out a form.",
    benefits: [
      "Mobile-first design that loads fast",
      "Clear calls to action and click-to-call on every page",
      "SEO and AI search basics built in from day one",
      "Lead forms connected to your CRM",
      "Easy editing so your team can update content",
      "Landing pages for ads and special offers",
    ],
    process: [
      { title: "Plan", text: "We map out pages, content and goals with you." },
      { title: "Design and write", text: "We design the look and write clear copy for each page." },
      { title: "Build and connect", text: "We build the site, connect forms and tracking, and test on every device." },
      { title: "Launch and grow", text: "We launch with redirects in place so you keep your rankings, then keep improving." },
    ],
    body: md(`
## Speed and clarity win
Most local searches happen on a phone. A slow or confusing site sends people back to Google. We keep pages light, fast and easy to scan, with your phone number one tap away.

## Built for search from the start
Every site we build has clean structure, page titles, schema markup and internal links, so it is ready for [SEO](/services/seo) and [AI search](/services/search-everywhere-optimization).

## Connected to your follow up
Forms feed straight into [GoHighLevel](/services/gohighlevel-crm), so no lead gets lost in an inbox.
`),
    faqs: [
      {
        question: "Can you redesign my current site without losing rankings?",
        answer: "Yes. We map every old page to its new home and set up redirects, so search engines and visitors land in the right place.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer: "Yes. We set up an easy editor so your team can change text, add blog posts and update pages without code.",
      },
    ],
    related: ["seo", "google-ads", "gohighlevel-crm"],
    seo: {
      title: "Website Design for Local Businesses in Miami | TTR Digital",
      description: "Fast, mobile-first websites built to rank on Google and turn visitors into calls and form leads. Website design from TTR Digital Marketing in Miami.",
    },
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    summary: "Consistent, helpful posts that build trust and keep your business top of mind.",
    heading: "Social media marketing that builds trust in your community",
    intro:
      "People check your social pages before they call. We keep your profiles active with useful posts, real photos of your work and quick replies, so new customers feel confident choosing you.",
    benefits: [
      "A monthly content plan for your business",
      "Posts for Facebook, Instagram, LinkedIn and Google Business Profile",
      "Short videos and graphics",
      "Comment and message monitoring",
      "Review sharing and reputation support",
      "Simple monthly reports",
    ],
    process: [
      { title: "Learn your voice", text: "We learn your business, your customers and what makes you different." },
      { title: "Plan the month", text: "You get a content calendar to approve before anything posts." },
      { title: "Create and post", text: "We create the posts and publish them on schedule." },
      { title: "Engage and report", text: "We watch comments and messages and report on what worked." },
    ],
    body: md(`
## Social proof that helps every other channel
An active page with real photos and happy customers makes your [Google Ads](/services/google-ads) and [Meta Ads](/services/meta-ads) work better, because people trust what they see.

## Content that answers real questions
The same helpful content can show up in search and AI answers. We plan social posts alongside your [SEO](/services/seo) topics so each piece works twice.
`),
    faqs: [
      {
        question: "Which platforms should my business be on?",
        answer: "Most local businesses do well with Facebook, Instagram and Google Business Profile. We will recommend what fits your customers instead of trying to be everywhere.",
      },
      {
        question: "Do I need to approve posts?",
        answer: "Yes. You see the monthly plan before anything goes live.",
      },
    ],
    related: ["meta-ads", "seo", "search-everywhere-optimization"],
    seo: {
      title: "Social Media Marketing for Local Businesses | TTR Digital",
      description: "Social media management that keeps your profiles active, builds trust and supports your ads and SEO. Social media marketing from TTR Digital in Miami.",
    },
  },
  {
    slug: "gohighlevel-crm",
    title: "GoHighLevel CRM",
    summary: "One place for every lead, with automatic follow up by text and email so nothing slips.",
    heading: "GoHighLevel CRM setup so no lead slips through the cracks",
    intro:
      "Leads come in from your website, ads, calls and social media. GoHighLevel puts them all in one place and follows up automatically, so your team can focus on booking the job.",
    benefits: [
      "Full GoHighLevel setup and pipeline design",
      "Website, ad and call leads in one inbox",
      "Instant text and email follow up",
      "Appointment booking and reminders",
      "Review requests after every job",
      "Training for your team",
    ],
    process: [
      { title: "Map your process", text: "We learn how leads come in and how your team books them today." },
      { title: "Build it", text: "We set up pipelines, forms, calendars and automations." },
      { title: "Connect everything", text: "Website forms, ads, phone numbers and social inboxes all flow in." },
      { title: "Train and tune", text: "We train your team and keep improving the automations." },
    ],
    body: md(`
## Why follow up speed matters
The business that answers first often wins the job. With GoHighLevel, every new lead gets an instant reply and lands in a pipeline where nothing is forgotten.

## Works with your marketing
Leads from your [website](/services/websites), [Google Ads](/services/google-ads) and [Meta Ads](/services/meta-ads) flow straight in. Add an [AI agent](/services/ai-agents) to answer questions and book appointments around the clock.
`),
    faqs: [
      {
        question: "I already have a GoHighLevel account. Can you help?",
        answer: "Yes. We can audit and clean up your existing setup, or rebuild the parts that are not working.",
      },
      {
        question: "Can it send review requests?",
        answer: "Yes. We set up automatic review requests after appointments or completed jobs, which also helps your Google rankings.",
      },
    ],
    related: ["ai-agents", "websites", "google-ads"],
    seo: {
      title: "GoHighLevel CRM Setup and Automation | TTR Digital Marketing",
      description: "GoHighLevel setup, pipelines and automatic text and email follow up so no lead slips through. CRM and automation services from TTR Digital in Miami.",
    },
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    summary: "AI assistants that answer calls and chats, qualify leads and book appointments 24/7.",
    heading: "AI agents that answer, qualify and book around the clock",
    intro:
      "Missed calls and slow replies cost you jobs. Our AI agents answer website chats, texts and calls, ask the right questions and book appointments straight into your calendar, any time of day.",
    benefits: [
      "AI chat for your website and social inboxes",
      "AI voice agents for missed or after-hours calls",
      "Lead questions tailored to your business",
      "Booking straight into your calendar",
      "Hand off to your team when a human is needed",
      "Every conversation logged in your CRM",
    ],
    process: [
      { title: "Plan the conversations", text: "We write down the questions, answers and rules your agent should follow." },
      { title: "Build and connect", text: "We build the agent and connect it to your CRM and calendar." },
      { title: "Test with you", text: "We test real scenarios with your team before going live." },
      { title: "Review and improve", text: "We review conversations and keep making the agent better." },
    ],
    body: md(`
## Never miss a lead after hours
Many calls come in at night and on weekends. An AI agent can answer, collect details and book the appointment, then your team picks it up in the morning.

## Built on your CRM
Our agents run inside [GoHighLevel](/services/gohighlevel-crm), so every conversation and booking is saved with the lead.

## Great for busy offices
[Dental practices](/dental-marketing) and [home service companies](/home-services-marketing) use AI agents to answer common questions and free up the front desk.
`),
    faqs: [
      {
        question: "Will customers know they are talking to AI?",
        answer: "We recommend being upfront. Most people are happy to get a fast, helpful answer, and the agent can hand off to a person any time.",
      },
      {
        question: "Can the AI agent book appointments?",
        answer: "Yes. It can check your calendar and book, reschedule or confirm appointments based on rules you set.",
      },
    ],
    related: ["gohighlevel-crm", "search-everywhere-optimization", "meta-ads"],
    seo: {
      title: "AI Agents for Calls, Chat and Booking | TTR Digital Marketing",
      description: "AI agents that answer calls and chats, qualify leads and book appointments 24/7, connected to your CRM. AI automation from TTR Digital in Miami.",
    },
  },
];

export const niches: Niche[] = [
  {
    slug: "dental-marketing",
    title: "Dental Marketing",
    heading: "Dental marketing that fills your schedule with new patients",
    intro:
      "We help dental practices attract the patients they want, from new families to implant and cosmetic cases. Then we make sure every call and form gets a fast reply, so more of those leads end up in the chair.",
    problems: [
      { title: "Not enough new patients", text: "Your schedule has gaps, and most new patients find a competitor first on Google or Maps." },
      { title: "Ads that cost too much", text: "Clicks are expensive, and many leads never book. We focus spend on high-value treatments and track every booked visit." },
      { title: "Missed calls and slow follow up", text: "The front desk is busy. Leads wait hours for a reply and book somewhere else." },
    ],
    services: ["seo", "search-everywhere-optimization", "google-ads", "meta-ads", "gohighlevel-crm", "ai-agents"],
    process: [
      { title: "Practice audit", text: "We review your website, Google Business Profile, reviews and ads against nearby practices." },
      { title: "Treatment focus", text: "We build campaigns and pages around the services you want more of, like implants, Invisalign or new patient exams." },
      { title: "Fast follow up", text: "Calls and forms go into GoHighLevel with instant replies, and an AI agent can answer after hours." },
      { title: "Track booked patients", text: "We report on calls, booked appointments and where they came from." },
    ],
    body: md(`
## Show up when patients search
Most patients start with a search like "dentist near me" or "dental implants Miami". Strong [local SEO](/services/seo) and a well-kept Google Business Profile put you in the map pack, while [Search Everywhere Optimization](/services/search-everywhere-optimization) helps AI tools recommend your practice.

## Ads for the treatments you want
[Google Ads](/services/google-ads) and [Meta Ads](/services/meta-ads) can bring in high-value cases quickly. We build treatment-specific landing pages, so a patient searching for implants sees an implant page, not your home page.

## Turn more calls into booked visits
With [GoHighLevel](/services/gohighlevel-crm) and an [AI agent](/services/ai-agents), every lead gets an answer in seconds, plus reminders that cut no-shows.
`),
    faqs: [
      {
        question: "Do you work with single-location and multi-location practices?",
        answer: "Yes. We work with solo practices and groups. Each location gets its own Google Business Profile work and local pages.",
      },
      {
        question: "Can you help with patient reviews?",
        answer: "Yes. We set up automatic review requests after visits, which builds trust and helps your local rankings.",
      },
      {
        question: "Which treatments do you market?",
        answer: "Whatever your practice wants more of. Common ones are new patient exams, implants, Invisalign, veneers, emergency visits and cosmetic dentistry.",
      },
      {
        question: "Do you build treatment landing pages?",
        answer: "Yes. Each key treatment gets its own fast page with clear details, reviews and an easy way to call or book, which helps both ads and SEO.",
      },
    ],
    seo: {
      title: "Dental Marketing Agency in Miami | More New Patients | TTR Digital",
      description: "Dental marketing that brings new patients: local SEO, AI search, Google Ads, Meta Ads and fast follow up with GoHighLevel. Free practice audit.",
    },
  },
  {
    slug: "home-services-marketing",
    title: "Home Services Marketing",
    heading: "Home services marketing that keeps your crews busy",
    intro:
      "We help HVAC, plumbing, roofing, electrical, cleaning, pest control and other home service companies get more calls from homeowners nearby, and book more of them into real jobs.",
    problems: [
      { title: "Slow seasons and empty days", text: "Work comes in waves. We build steady lead flow so your schedule stays full." },
      { title: "Paying for bad leads", text: "Shared leads and wasted clicks cost money. We focus on leads that come only to you." },
      { title: "Calls missed in the field", text: "Your team is on a job. Calls go to voicemail and the homeowner calls the next company." },
    ],
    services: ["seo", "google-ads", "meta-ads", "search-everywhere-optimization", "gohighlevel-crm", "ai-agents"],
    process: [
      { title: "Market check", text: "We look at your service area, competitors, reviews and current lead sources." },
      { title: "Lead engine", text: "We set up local SEO, Local Services Ads, Google Ads and Meta Ads around your best services." },
      { title: "Never miss a call", text: "Missed calls get an instant text back, and an AI agent can book jobs after hours." },
      { title: "Track booked jobs", text: "We report on calls, booked jobs and cost per lead, by channel." },
    ],
    body: md(`
## Win the map pack in your service area
When a pipe bursts, homeowners call one of the top three businesses on Google Maps. [Local SEO](/services/seo), reviews and a strong Google Business Profile help you earn that spot.

## Ads that ring the phone
[Google Ads](/services/google-ads), including Local Services Ads, put you in front of people who need help right now. [Meta Ads](/services/meta-ads) are great for seasonal offers like AC tune-ups or roof inspections.

## Book more of the calls you already get
[GoHighLevel](/services/gohighlevel-crm) texts back missed calls and keeps every lead in one place, and an [AI agent](/services/ai-agents) can answer and book while your team is on a job.
`),
    faqs: [
      {
        question: "Which home service businesses do you work with?",
        answer: "HVAC, plumbing, roofing, electrical, landscaping, cleaning, pest control, pool service, remodeling and similar local service companies.",
      },
      {
        question: "Do you manage Google Local Services Ads?",
        answer: "Yes. For many home service businesses they are one of the best lead sources, and we manage them with your other campaigns.",
      },
      {
        question: "Can you help us get more reviews?",
        answer: "Yes. We set up automatic review requests after each job, which builds trust and helps you rank in Google Maps.",
      },
    ],
    seo: {
      title: "Home Services Marketing for HVAC, Plumbing and Roofing | TTR Digital",
      description: "Marketing for home service companies: local SEO, Local Services Ads, Google Ads, Meta Ads and missed-call text back. More calls and booked jobs.",
    },
  },
];

export const pages: Page[] = [
  {
    slug: "about",
    title: "About",
    heading: "Meet your new growth partner",
    intro:
      "TTR Digital Marketing is a digital marketing agency on Brickell Avenue in Miami. Since 2015 we have helped small businesses grow with SEO, ads, websites and smart follow up.",
    body: md(`
## Who we are
We are not your average agency. We come from a small business background ourselves, so we know what it takes to compete and how much every lead matters. Our mission is simple: help local businesses grow their profit with marketing that brings measurable results.

## How we work
- **100% campaign transparency.** You always know what we are doing and why.
- **A friendly team of experts.** You talk to people who know your account.
- **Customer-first service.** Plans are built around your goals, not a template.
- **Creative, complete solutions.** SEO, ads, websites, CRM and AI working together.

## Leadership
**Kia Khamoushi, Chief Business Development Officer.** After more than a decade as owner and CEO of a successful IT company, Kia now uses deep search engine know-how to help other business owners grow. Kia has built SEO strategies for law firms, dental and healthcare practices, real estate, technology companies and many more. As a business owner, Kia knows how little time owners have for marketing, and how much it matters to get it right.

## What we do
We offer [SEO](/services/seo), [Search Everywhere Optimization](/services/search-everywhere-optimization), [Google Ads](/services/google-ads), [Meta Ads](/services/meta-ads), [website design](/services/websites), [social media](/services/social-media), [GoHighLevel CRM](/services/gohighlevel-crm) and [AI agents](/services/ai-agents). Our main focus is [dental practices](/dental-marketing) and [home service companies](/home-services-marketing).
`),
    seo: {
      title: "About TTR Digital Marketing | Miami Digital Marketing Agency",
      description: "Meet TTR Digital Marketing, a Miami digital marketing agency helping small businesses grow since 2015 with SEO, ads, websites, CRM and AI.",
    },
  },
  {
    slug: "contact",
    title: "Contact",
    heading: "Let's talk about growing your business",
    intro:
      "Call us, stop by our Brickell office or send a quick message. We will get back to you within one business day to set up your free marketing audit.",
    body: md(`
## What you get on your free audit call
- A review of your website, with clear next steps
- A look at what your top competitors do well and how to beat them
- A check for technical issues that hold back your rankings
- Ideas to turn more visitors into calls and booked appointments
`),
    seo: {
      title: "Contact TTR Digital Marketing | Free Marketing Audit in Miami",
      description: "Call (786) 460-1311 or send a message to book your free marketing audit. TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL.",
    },
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    heading: "Privacy Policy",
    intro: "This policy explains what information TTR Digital Marketing collects on this website and how we use it. Last updated October 1, 2026.",
    body: md(`
## Information we collect
When you fill out a form on this site, we collect the details you give us, such as your name, phone number, email address, business name and message. Like most websites, we also collect basic technical data such as your browser type, pages visited and general location, through cookies and analytics tools.

## How we use it
We use your information to reply to your request, provide our services, send you information you asked for and improve our website. With your consent, we may contact you by phone, text message or email. You can opt out of texts at any time by replying STOP, and out of emails by using the unsubscribe link.

## How we store and share it
Form submissions are stored in our customer relationship management system (GoHighLevel). We share information only with service providers that help us run our business, such as hosting, analytics and CRM providers, and only as needed. We do not sell your personal information. Mobile numbers and text message consent are never shared with third parties for their marketing.

## Cookies
We use cookies to understand how people use the site and to measure our advertising. You can turn off cookies in your browser settings.

## Your choices
You can ask us to see, correct or delete the personal information we hold about you by contacting us at the phone number or address below.

## Children
This website is not meant for children under 13, and we do not knowingly collect their information.

## Contact
TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL 33131. Phone: (786) 460-1311.
`),
    seo: {
      title: "Privacy Policy | TTR Digital Marketing",
      description: "How TTR Digital Marketing collects, uses and protects the information you share on our website.",
    },
  },
  {
    slug: "terms",
    title: "Terms of Service",
    heading: "Terms of Service",
    intro: "These terms apply to your use of the TTR Digital Marketing website. Last updated October 1, 2026.",
    body: md(`
## Using this website
By using this website you agree to these terms. If you do not agree, please do not use the site.

## Information on this site
The content on this site is for general information only. It is not legal, financial or professional advice for your specific situation. Marketing results depend on many factors outside our control, and past results do not promise future results.

## Our services
Any services we provide are covered by a separate written agreement between you and TTR Digital Marketing. If that agreement conflicts with these terms, the agreement wins.

## Text messages and calls
If you give us your phone number, you agree that we may contact you about your request by call or text. Message and data rates may apply. Reply STOP to opt out or HELP for help.

## Intellectual property
The text, graphics, logos and other content on this site belong to TTR Digital Marketing or its licensors. Please do not copy them without permission.

## Links to other sites
We may link to other websites. We are not responsible for their content or privacy practices.

## Limitation of liability
This site is provided as is. To the extent allowed by law, TTR Digital Marketing is not liable for any damages that come from using this site.

## Changes
We may update these terms from time to time. The date at the top shows when they last changed.

## Contact
TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL 33131. Phone: (786) 460-1311.
`),
    seo: {
      title: "Terms of Service | TTR Digital Marketing",
      description: "The terms that apply when you use the TTR Digital Marketing website.",
    },
  },
];

// The three original WordPress posts only had placeholder bodies. These
// starter articles replace those bodies (see scripts/migrate-wp.ts) while the
// slugs, dates and SEO fields come from WordPress.
const author = { name: "TTR Digital", role: "TTR Digital Marketing team" };
const uncategorized = [{ title: "Marketing tips", slug: "marketing-tips" }];

export const posts: Post[] = [
  {
    slug: "social-media-marketing-strategy",
    title: "Social Media Marketing Strategy",
    publishedAt: "2021-09-09T03:37:20Z",
    updatedAt: "2026-10-01T00:00:00Z",
    author,
    categories: uncategorized,
    excerpt: "A simple social media plan for local businesses: pick the right platforms, post what customers care about and turn followers into calls.",
    relatedServices: ["social-media", "meta-ads"],
    body: md(`
Social media works best for local businesses when it is simple and steady. You do not need to be everywhere or go viral. You need a clear plan that builds trust and gives people an easy way to reach you.

## 1. Pick two or three platforms
Most local businesses do well with Facebook, Instagram and their Google Business Profile. Go where your customers already spend time, and do those few well.

## 2. Know what you want people to do
Every post should help someone take a next step: call, book, send a message or visit your site. Make that step clear and easy.

## 3. Post what customers care about
- Before and after photos of your work
- Quick tips that answer common questions
- Reviews and stories from happy customers
- Your team, your office and your community
- Seasonal offers and reminders

## 4. Stay consistent
A few good posts every week beat a burst of posts followed by silence. Plan a month ahead so you are never stuck.

## 5. Reply fast
Comments and messages are leads. Answer them quickly, or connect your inboxes to a CRM like [GoHighLevel](/services/gohighlevel-crm) so nothing gets missed.

## 6. Boost what works with ads
When a post does well, put a small budget behind it. [Meta Ads](/services/meta-ads) let you reach people near you who match your best customers.

## Want help?
Our [social media team](/services/social-media) can plan, create and post for you. [Contact us](/contact) for a free marketing audit.
`),
    seo: {},
  },
  {
    slug: "seo-services-pricing",
    title: "SEO Services Pricing",
    publishedAt: "2021-09-02T01:27:49Z",
    updatedAt: "2026-10-01T00:00:00Z",
    author,
    categories: uncategorized,
    excerpt: "What goes into the cost of SEO services, what you should get for your investment and the questions to ask before you hire an SEO agency.",
    relatedServices: ["seo", "search-everywhere-optimization"],
    body: md(`
"How much does SEO cost?" is one of the first questions business owners ask. The honest answer is that it depends on what you need. Here is what drives the cost, so you can compare offers with confidence.

## What affects the cost of SEO
- **Your competition.** Ranking for "dentist Miami" takes more work than ranking in a small town.
- **Your starting point.** A new site with no reviews needs more work than an established one.
- **How many services and locations you cover.** Each one needs its own pages and attention.
- **Content needs.** Service pages, location pages and blog posts take time to write well.
- **Technical health.** Slow, broken or poorly built sites need fixing first.

## What good SEO work includes
- An audit and a clear plan
- Google Business Profile optimization
- On-page work and helpful content
- Technical fixes and tracking
- Reviews, citations and quality links
- Monthly reports tied to calls and leads

## Red flags to watch for
Be careful with anyone who promises the number one spot, will not explain what they do, or reports only on rankings without showing leads. Nobody controls Google, and good agencies say so.

## How to judge the value
The best way to look at SEO is as an investment in leads you do not pay for per click. Ask how the agency will track calls and forms, and how they will show progress each month.

## Get a clear plan for your business
We offer a free audit that shows where you stand and what it would take to grow. Learn more about our [SEO services](/services/seo) and [Search Everywhere Optimization](/services/search-everywhere-optimization), or [contact us](/contact).
`),
    seo: {},
  },
  {
    slug: "digital-marketing-trends-2021-for-local-businesses",
    title: "Digital Marketing Trends 2021 for Local Businesses",
    publishedAt: "2020-12-17T12:50:46Z",
    updatedAt: "2026-10-01T00:00:00Z",
    author,
    categories: uncategorized,
    excerpt: "We first wrote about local marketing trends at the end of 2020. Here is what held up, what changed and what local businesses should focus on now.",
    relatedServices: ["search-everywhere-optimization", "gohighlevel-crm"],
    body: md(`
We first wrote this post at the end of 2020, when stores were closed and people turned to the internet for almost everything. A lot has changed since then. Here is a look at the trends that held up and what local businesses should focus on today.

## Local search is still where customers start
Back then, "near me" searches were booming. They still are. A complete Google Business Profile, steady reviews and clear service pages are still the base of local marketing. Learn more about [local SEO](/services/seo).

## Search moved beyond Google's blue links
The biggest change is AI. Many people now ask Google AI Overviews, ChatGPT or Gemini for a recommendation. Businesses with clear pages, strong reviews and consistent details are the ones these tools mention. We call this [Search Everywhere Optimization](/services/search-everywhere-optimization).

## Video and social proof matter more
Short videos, real photos and reviews build trust faster than polished ads. Keep your [social media](/services/social-media) active and show your real work.

## Speed to lead wins jobs
Customers contact several businesses at once. The first to reply often wins. Tools like [GoHighLevel](/services/gohighlevel-crm) and [AI agents](/services/ai-agents) make instant follow up possible, even after hours.

## Track calls, not just clicks
Clicks and impressions are nice, but calls and booked jobs pay the bills. Make sure every channel is tracked to real leads.

## Where to start
If you are not sure which of these to tackle first, [book a free marketing audit](/contact) and we will help you pick.
`),
    seo: {},
  },
];
