import { defineType, defineArrayMember } from "sanity";
import { getPlainLimit } from "../charLimits";
import { createPlainCharLimitInput } from "../../components/PlainCharLimitInput";

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
      validation: (rule) => rule.required().max(getPlainLimit("brochureButton", "label")),
      components: { input: createPlainCharLimitInput("brochureButton", "label") },
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
