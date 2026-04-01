import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("productCategory", "title")),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        maxLength: 96,
        source: (doc: any) => {
          if (Array.isArray(doc.title)) {
            const enTitle = doc.title.find((t: any) => t._key === "en" || t.language === "en");
            return enTitle?.value || doc.title[0]?.value || "";
          }
          return typeof doc.title === "string" ? doc.title : "";
        },
      },
      validation: (rule) => rule.required(),
      description: "URL-friendly identifier (not translated)",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "internationalizedArrayText",
      description: "Short description shown in the home page product carousel.",
      validation: (rule) => rule.custom(i18nCharLimit("productCategory", "summary")),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image for the carousel slide on the home page.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Product category image (e.g., circular product shot).",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      const enTitle = Array.isArray(title)
        ? title.find((t: any) => t._key === "en" || t.language === "en")?.value || title[0]?.value || "Untitled"
        : title || "Untitled";
      return {
        title: enTitle,
        media,
      };
    },
  },
});
