import { defineType, defineField } from "sanity";

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
      type: "string",
      description: 'Sidebar heading (e.g., "Product Catalog").',
    }),
    defineField({
      name: "sidebarDescription",
      title: "Sidebar Description",
      type: "string",
      description: "Sidebar subtext below the title.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Products Listing Page" };
    },
  },
});
