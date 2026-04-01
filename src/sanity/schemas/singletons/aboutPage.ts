import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

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
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("aboutPage", "title")),
    }),
    defineField({
      name: "leadText",
      title: "Lead Text",
      type: "internationalizedArrayText",
      description: "Short introductory text displayed prominently.",
      validation: (rule) => rule.custom(i18nCharLimit("aboutPage", "leadText")),
    }),
    defineField({
      name: "contentText",
      title: "Content Text",
      type: "internationalizedArrayText",
      description: "Main content text.",
      validation: (rule) => rule.custom(i18nCharLimit("aboutPage", "contentText")),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sidebarTitle",
      title: "Sidebar Title",
      type: "internationalizedArrayString",
      description: 'Sidebar heading (e.g., "Our Locations").',
      validation: (rule) => rule.custom(i18nCharLimit("aboutPage", "sidebarTitle")),
    }),
    defineField({
      name: "sidebarDescription",
      title: "Sidebar Description",
      type: "internationalizedArrayString",
      description: 'Sidebar subtext (e.g., "Find our Offices").',
      validation: (rule) => rule.custom(i18nCharLimit("aboutPage", "sidebarDescription")),
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
    select: { title: "title" },
    prepare() {
      return { title: "About Page" };
    },
  },
});
