import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "about",
      title: "About Section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "partners",
      title: "Partners / Distributors Preview Section",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ── Hero Section ──
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Foreground Image",
      type: "image",
      options: { hotspot: true },
      description:
        "The decorative image on the hero section (e.g., flowers wrapping tree trunk).",
      fieldset: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "internationalizedArrayString",
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "internationalizedArrayText",
      fieldset: "hero",
    }),

    // ── About Section ──
    defineField({
      name: "aboutBackgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Background texture image for the about section.",
      fieldset: "about",
    }),
    defineField({
      name: "aboutImage",
      title: "Decorative Image",
      type: "image",
      options: { hotspot: true },
      description:
        "The decorative image shown beside the text (e.g., white-blue orchid).",
      fieldset: "about",
    }),
    defineField({
      name: "aboutTitle",
      title: "Title",
      type: "internationalizedArrayString",
      description: 'e.g., "About Besgrow"',
      fieldset: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Body",
      type: "internationalizedArrayBlockContent",
      description: "Rich text body for the about section.",
      fieldset: "about",
    }),

    // ── Partners Preview Section ──
    defineField({
      name: "partnersTitle",
      title: "Title",
      type: "internationalizedArrayString",
      description: 'e.g., "Find Our Partners Around the World"',
      fieldset: "partners",
    }),
    defineField({
      name: "partnersDescription",
      title: "Description",
      type: "internationalizedArrayText",
      fieldset: "partners",
    }),
    defineField({
      name: "europeHeading",
      title: "Europe Column Heading",
      type: "internationalizedArrayString",
      description: 'e.g., "Explore Europe at a glance"',
      fieldset: "partners",
    }),
    defineField({
      name: "europeDescription",
      title: "Europe Column Description",
      type: "internationalizedArrayText",
      fieldset: "partners",
    }),
    defineField({
      name: "worldHeading",
      title: "World Column Heading",
      type: "internationalizedArrayString",
      description: 'e.g., "Beyond Europe, our reach continues"',
      fieldset: "partners",
    }),
    defineField({
      name: "worldDescription",
      title: "World Column Description",
      type: "internationalizedArrayText",
      fieldset: "partners",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Home Page" };
    },
  },
});
