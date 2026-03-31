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
      type: "internationalizedArrayString",
      description: 'e.g., "Our Distributors"',
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "internationalizedArrayText",
      description: "Intro paragraph shown below the title.",
    }),
    defineField({
      name: "bottomNote",
      title: "Bottom Note",
      type: "internationalizedArrayText",
      description: "Small disclaimer text shown below the map.",
    }),
    defineField({
      name: "europeTabLabel",
      title: "Europe Tab Label",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "worldTabLabel",
      title: "World Tab Label",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "europeSidebarHeading",
      title: "Europe Sidebar Heading",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "worldSidebarHeading",
      title: "World Sidebar Heading",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "sidebarSubtext",
      title: "Sidebar Subtext",
      type: "internationalizedArrayString",
      description: 'e.g., "Find our offices and get in touch with our local teams"',
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Distributors Page" };
    },
  },
});
