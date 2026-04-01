import { defineType, defineField } from "sanity";
import { getPlainLimit } from "../charLimits";
import { createPlainCharLimitInput } from "../../components/PlainCharLimitInput";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "addressTitle",
      title: "Address Title",
      type: "string",
      description: 'e.g., "The Netherlands"',
      validation: (rule) => rule.max(getPlainLimit("footer", "addressTitle")),
      components: { input: createPlainCharLimitInput("footer", "addressTitle") },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(getPlainLimit("footer", "address")),
      components: { input: createPlainCharLimitInput("footer", "address") },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.max(getPlainLimit("footer", "email")),
      components: { input: createPlainCharLimitInput("footer", "email") },
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.max(getPlainLimit("footer", "phone")),
      components: { input: createPlainCharLimitInput("footer", "phone") },
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      validation: (rule) => rule.max(getPlainLimit("footer", "copyrightText")),
      components: { input: createPlainCharLimitInput("footer", "copyrightText") },
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare() {
      return { title: "Footer" };
    },
  },
});
