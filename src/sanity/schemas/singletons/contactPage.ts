import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
      description: "Background image for the sidebar panel.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("contactPage", "title")),
    }),
    defineField({
      name: "leadText",
      title: "Lead Text",
      type: "internationalizedArrayText",
      description: "Short introductory text displayed prominently.",
      validation: (rule) => rule.custom(i18nCharLimit("contactPage", "leadText")),
    }),
    defineField({
      name: "contentText",
      title: "Content Text",
      type: "internationalizedArrayText",
      description: "Main content text.",
      validation: (rule) => rule.custom(i18nCharLimit("contactPage", "contentText")),
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
      description: "Title displayed in the sidebar panel.",
      validation: (rule) => rule.custom(i18nCharLimit("contactPage", "sidebarTitle")),
    }),
    defineField({
      name: "sidebarDescription",
      title: "Sidebar Description",
      type: "internationalizedArrayString",
      description: "Description displayed below the sidebar title.",
      validation: (rule) => rule.custom(i18nCharLimit("contactPage", "sidebarDescription")),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
