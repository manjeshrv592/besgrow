import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const termsPage = defineType({
  name: "termsPage",
  title: "Terms and Conditions Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("termsPage", "title")),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "internationalizedArrayBlockContent",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Terms and Conditions Page" };
    },
  },
});
