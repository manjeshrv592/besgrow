import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
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
      type: "blockContent",
    }),
    defineField({
      name: "body",
      title: "Main Body",
      type: "blockContent",
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
      return {
        title,
        subtitle: category ? `Category: ${category}` : "No category",
        media,
      };
    },
  },
});
