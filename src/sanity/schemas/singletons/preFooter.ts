import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

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
      type: "internationalizedArrayText",
      validation: (rule) => rule.custom(i18nCharLimit("preFooter", "text")),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Pre-Footer" };
    },
  },
});
