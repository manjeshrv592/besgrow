import { defineType, defineField } from "sanity";

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
      type: "string",
      description: 'e.g., "Our Distributors"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 3,
      description: "Intro paragraph shown below the title.",
    }),
    defineField({
      name: "bottomNote",
      title: "Bottom Note",
      type: "text",
      rows: 2,
      description: "Small disclaimer text shown below the map.",
    }),
    defineField({
      name: "europeTabLabel",
      title: "Europe Tab Label",
      type: "string",
      initialValue: "Europe",
    }),
    defineField({
      name: "worldTabLabel",
      title: "World Tab Label",
      type: "string",
      initialValue: "Rest of the world",
    }),
    defineField({
      name: "europeSidebarHeading",
      title: "Europe Sidebar Heading",
      type: "string",
      initialValue: "European Locations",
    }),
    defineField({
      name: "worldSidebarHeading",
      title: "World Sidebar Heading",
      type: "string",
      initialValue: "Around the World Locations",
    }),
    defineField({
      name: "sidebarSubtext",
      title: "Sidebar Subtext",
      type: "string",
      description: 'e.g., "Find our offices and get in touch with our local teams"',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Distributors Page" };
    },
  },
});
