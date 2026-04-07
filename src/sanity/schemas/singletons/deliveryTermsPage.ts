import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const deliveryTermsPage = defineType({
  name: "deliveryTermsPage",
  title: "Terms of Delivery Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("deliveryTermsPage", "title")),
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
      return { title: "Terms of Delivery Page" };
    },
  },
});
