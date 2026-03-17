import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sidebarBackgroundImage",
      title: "Sidebar Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "sidebarTitle",
      title: "Sidebar Title",
      type: "string",
      description: 'Sidebar heading (e.g., "Our Locations").',
    }),
    defineField({
      name: "sidebarDescription",
      title: "Sidebar Description",
      type: "string",
      description: 'Sidebar subtext (e.g., "Find our Offices").',
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Full embed URL from Google Maps.",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
