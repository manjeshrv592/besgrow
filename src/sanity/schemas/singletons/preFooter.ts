import { defineType, defineField } from "sanity";

export const preFooter = defineType({
  name: "preFooter",
  title: "Pre-Footer",
  type: "document",
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pre-Footer" };
    },
  },
});
