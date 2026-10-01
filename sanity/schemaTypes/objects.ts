import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", description: "Shown in Google and the browser tab. Aim for 50 to 60 characters.", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, description: "Aim for 140 to 160 characters.", validation: (r) => r.max(200) }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", description: "1200 x 630 works best." }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", description: "For example 411%", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const step = defineType({
  name: "step",
  title: "Step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
  ],
});

export const logo = defineType({
  name: "logo",
  title: "Logo",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url" }),
  ],
  preview: { select: { title: "name", media: "image" } },
});

export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text", type: "string", description: "Describe the image for screen readers and Google." }),
    defineField({ name: "caption", type: "string" }),
  ],
});

export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [defineField({ name: "href", type: "string", title: "URL or path", validation: (r) => r.required() })],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "altImage" }),
  ],
});
