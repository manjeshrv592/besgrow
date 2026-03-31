import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      description: "Hero image for this product.",
    }),
    defineField({
      name: "initialBody",
      title: "Initial Body (Top Section)",
      description:
        "The introductory rich text content displayed next to the product image, before the main body sections.",
      type: "internationalizedArrayBlockContent",
    }),
    defineField({
      name: "body",
      title: "Main Body",
      type: "internationalizedArrayBlockContent",
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
      category: "category.title",
      media: "productImage",
    },
    prepare({ title, category, media }) {
      const enTitle = Array.isArray(title)
        ? title.find((t: any) => t._key === "en" || t.language === "en")?.value || title[0]?.value || "Untitled"
        : title || "Untitled";

      const enCategory = Array.isArray(category)
        ? category.find((t: any) => t._key === "en" || t.language === "en")?.value || category[0]?.value
        : category;

      return {
        title: enTitle,
        subtitle: enCategory ? `Category: ${enCategory}` : "No category",
        media,
      };
    },
  },
});
