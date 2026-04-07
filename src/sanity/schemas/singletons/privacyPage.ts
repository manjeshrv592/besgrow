import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("privacyPage", "title")),
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
      return { title: "Privacy Page" };
    },
  },
});
