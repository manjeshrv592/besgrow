import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const productsListingPage = defineType({
  name: "productsListingPage",
  title: "Products Listing Page",
  type: "document",
  fields: [
    defineField({
      name: "sidebarBackgroundImage",
      title: "Sidebar Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sidebarTitle",
      title: "Sidebar Title",
      type: "internationalizedArrayString",
      description: 'Sidebar heading (e.g., "Product Catalog").',
      validation: (rule) => rule.custom(i18nCharLimit("productsListingPage", "sidebarTitle")),
    }),
    defineField({
      name: "sidebarDescription",
      title: "Sidebar Description",
      type: "internationalizedArrayString",
      description: "Sidebar subtext below the title.",
      validation: (rule) => rule.custom(i18nCharLimit("productsListingPage", "sidebarDescription")),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Products Listing Page" };
    },
  },
});
