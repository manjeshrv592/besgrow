import { defineType, defineArrayMember } from "sanity";

export const brochureButton = defineType({
  name: "brochureButton",
  title: "Brochure Button",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Button Label",
      type: "string",
      initialValue: "Download Brochure",
      validation: (rule) => rule.required(),
    },
    {
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.zip",
      },
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title: title || "Download Brochure",
        subtitle: "Brochure Button",
      };
    },
  },
});
