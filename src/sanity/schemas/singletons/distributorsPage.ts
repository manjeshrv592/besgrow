import { defineType, defineField } from "sanity";
import { i18nCharLimit } from "../charLimits";

export const distributorsPage = defineType({
  name: "distributorsPage",
  title: "Distributors Page",
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
      title: "Page Title",
      type: "internationalizedArrayString",
      description: 'e.g., "Our Distributors"',
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "title")),
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "internationalizedArrayText",
      description: "Intro paragraph shown below the title.",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "description")),
    }),
    defineField({
      name: "bottomNote",
      title: "Bottom Note",
      type: "internationalizedArrayText",
      description: "Small disclaimer text shown below the map.",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "bottomNote")),
    }),
    defineField({
      name: "europeTabLabel",
      title: "Europe Tab Label",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "europeTabLabel")),
    }),
    defineField({
      name: "worldTabLabel",
      title: "World Tab Label",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "worldTabLabel")),
    }),
    defineField({
      name: "europeSidebarHeading",
      title: "Europe Sidebar Heading",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "europeSidebarHeading")),
    }),
    defineField({
      name: "worldSidebarHeading",
      title: "World Sidebar Heading",
      type: "internationalizedArrayString",
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "worldSidebarHeading")),
    }),
    defineField({
      name: "sidebarSubtext",
      title: "Sidebar Subtext",
      type: "internationalizedArrayString",
      description: 'e.g., "Find our offices and get in touch with our local teams"',
      validation: (rule) => rule.custom(i18nCharLimit("distributorsPage", "sidebarSubtext")),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Distributors Page" };
    },
  },
});
