import type { PortableTextBlock } from "@portabletext/react";

export type Body = PortableTextBlock[];
export type Faq = { question: string; answer: string };
export type Step = { title: string; text?: string };
export type Stat = { value: string; label: string };
export type Seo = { title?: string; description?: string; ogImage?: string; noIndex?: boolean };
export type Img = { url: string; alt: string; width: number; height: number };
export type Logo = { name: string; src: string; width: number; height: number; url?: string };

export type Service = {
  slug: string;
  title: string;
  summary: string;
  heading: string;
  intro: string;
  benefits: string[];
  process: Step[];
  body: Body;
  faqs: Faq[];
  related: string[];
  seo: Seo;
};

export type Niche = {
  slug: string;
  title: string;
  heading: string;
  intro: string;
  problems: Step[];
  services: string[];
  process: Step[];
  body: Body;
  faqs: Faq[];
  seo: Seo;
};

export type Page = { slug: string; title: string; heading: string; intro: string; body: Body; seo: Seo };

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role?: string };
  categories: { title: string; slug: string }[];
  excerpt: string;
  image?: Img;
  body: Body;
  relatedServices: string[];
  seo: Seo;
};

export type Testimonial = { quote: string; name?: string; role?: string; company?: string; stats: Stat[] };

export type Home = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  heroPoints: string[];
  stats: Stat[];
  process: Step[];
  faqs: Faq[];
  ctaHeading: string;
  ctaText: string;
  seo: Seo;
};

export type Settings = {
  phone: string;
  phoneE164: string;
  email: string;
  address: { street: string; city: string; region: string; postalCode: string; country: string };
  hoursText: string;
  badges: Logo[];
  clientLogos: Logo[];
};
