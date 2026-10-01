import { defineArrayMember, defineField, defineType } from "sanity";

const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });
const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];
const slugField = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source, maxLength: 96 }, validation: (r) => r.required(), group: "content" });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "phone", type: "string", description: "Shown in the header and on the Call button, for example (786) 460-1311" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "street", title: "Street address", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "region", title: "State", type: "string" }),
    defineField({ name: "postalCode", type: "string" }),
    defineField({ name: "hoursText", title: "Hours", type: "string", description: "For example: Monday to Friday, 9 AM to 5 PM" }),
    defineField({ name: "badges", title: "Partner badges", type: "array", of: [defineArrayMember({ type: "logo" })] }),
    defineField({ name: "clientLogos", title: "Client logos", type: "array", of: [defineArrayMember({ type: "logo" })] }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups,
  fields: [
    defineField({ name: "heroEyebrow", title: "Small line above the headline", type: "string", group: "content" }),
    defineField({ name: "heroHeading", title: "Headline (H1)", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({ name: "heroText", title: "Text under the headline", type: "text", rows: 3, group: "content" }),
    defineField({ name: "heroPoints", title: "Short proof points", type: "array", of: [{ type: "string" }], group: "content" }),
    defineField({ name: "stats", title: "Results", type: "array", of: [defineArrayMember({ type: "stat" })], group: "content" }),
    defineField({ name: "process", title: "Process steps", type: "array", of: [defineArrayMember({ type: "step" })], group: "content" }),
    defineField({ name: "faqs", title: "FAQ", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content" }),
    defineField({ name: "ctaHeading", title: "Bottom call to action heading", type: "string", group: "content" }),
    defineField({ name: "ctaText", title: "Bottom call to action text", type: "text", rows: 2, group: "content" }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  description: "Simple pages like About, Contact, Privacy and Terms.",
  groups,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "content" }),
    slugField(),
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "content" }),
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({ name: "body", type: "blockContent", group: "content" }),
    seoField,
  ],
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups,
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "content" }),
    slugField(),
    defineField({ name: "order", type: "number", group: "content" }),
    defineField({ name: "summary", title: "Short summary (cards)", type: "text", rows: 2, validation: (r) => r.required().max(180), group: "content" }),
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "content" }),
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({ name: "benefits", title: "What you get", type: "array", of: [{ type: "string" }], group: "content" }),
    defineField({ name: "process", title: "How it works", type: "array", of: [defineArrayMember({ type: "step" })], group: "content" }),
    defineField({ name: "body", type: "blockContent", group: "content" }),
    defineField({ name: "faqs", title: "FAQ", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content" }),
    defineField({ name: "related", title: "Related services", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const nichePage = defineType({
  name: "nichePage",
  title: "Industry page",
  type: "document",
  description: "Pages like Dental Marketing and Home Services Marketing.",
  groups,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "content" }),
    slugField(),
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "content" }),
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({ name: "problems", title: "Problems we solve", type: "array", of: [defineArrayMember({ type: "step" })], group: "content" }),
    defineField({ name: "services", title: "Services to feature", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], group: "content" }),
    defineField({ name: "process", title: "How it works", type: "array", of: [defineArrayMember({ type: "step" })], group: "content" }),
    defineField({ name: "body", type: "blockContent", group: "content" }),
    defineField({ name: "faqs", title: "FAQ", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content" }),
    seoField,
  ],
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups,
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "content" }),
    slugField(),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required(), group: "content" }),
    defineField({ name: "updatedAt", title: "Last updated", type: "datetime", group: "content" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], group: "content" }),
    defineField({ name: "categories", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })], group: "content" }),
    defineField({ name: "excerpt", type: "text", rows: 3, group: "content" }),
    defineField({ name: "mainImage", title: "Featured image", type: "altImage", group: "content" }),
    defineField({ name: "body", type: "blockContent", group: "content" }),
    defineField({ name: "relatedServices", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })], group: "content" }),
    defineField({ name: "wpId", title: "WordPress ID", type: "number", readOnly: true, group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "image", type: "altImage" }),
  ],
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "stats", type: "array", of: [defineArrayMember({ type: "stat" })] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});
