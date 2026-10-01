import { altImage, blockContent, faqItem, logo, seo, stat, step } from "./objects";
import { author, category, homePage, nichePage, page, post, service, siteSettings, testimonial } from "./documents";

export const schemaTypes = [
  seo, faqItem, stat, step, logo, altImage, blockContent,
  siteSettings, homePage, page, service, nichePage, post, author, category, testimonial,
];

export const singletonTypes = new Set(["siteSettings", "homePage"]);
