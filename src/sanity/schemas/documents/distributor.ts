import { defineType, defineField } from "sanity";

export const distributor = defineType({
  name: "distributor",
  title: "Distributor",
  type: "document",
  fields: [
    defineField({
      name: "distributorName",
      title: "Distributor Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cityCoordinates",
      title: "City Coordinates",
      type: "object",
      description: "Latitude and longitude for positioning the city marker on the map.",
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
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "distributorName",
      countryName: "country.name",
      city: "city",
    },
    prepare({ title, countryName, city }) {
      return {
        title: title || "Untitled Distributor",
        subtitle: [city, countryName].filter(Boolean).join(", "),
      };
    },
  },
  orderings: [
    {
      title: "Name A→Z",
      name: "nameAsc",
      by: [{ field: "distributorName", direction: "asc" }],
    },
  ],
});
