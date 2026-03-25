import { defineType, defineField } from "sanity";

export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: (rule) => rule.required(),
      description: 'Full country name, e.g., "Netherlands".',
    }),
    defineField({
      name: "code",
      title: "Country Code (ISO alpha-2)",
      type: "string",
      validation: (rule) => rule.required().length(2).uppercase(),
      description:
        'Two-letter country code, e.g., "NL". Used to display the flag automatically.',
    }),
    defineField({
      name: "isoNumeric",
      title: "ISO Numeric Code",
      type: "string",
      description:
        'Three-digit ISO numeric code, e.g., "528". Used to highlight countries on the map.',
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Europe", value: "europe" },
          { title: "Rest of the World", value: "restOfWorld" },
        ],
        layout: "radio",
      },
      initialValue: "restOfWorld",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mapCoordinates",
      title: "Map Center Coordinates",
      type: "object",
      description: "Latitude and longitude used to center the map on this country.",
      fields: [
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
        }),
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "mapZoom",
      title: "Map Zoom Level",
      type: "number",
      description: "Zoom level when this country is focused on the map (e.g., 3-12).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "code",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Country",
        subtitle: subtitle ? `${subtitle.toUpperCase()}` : "",
      };
    },
  },
  orderings: [
    {
      title: "Name A→Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
