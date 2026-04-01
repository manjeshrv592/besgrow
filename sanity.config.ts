"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { I18nCharLimitInput } from "@/sanity/components/I18nCharLimitInput";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import {
  blockContent,
  twoColumnGrid,
  brochureButton,
  productCategory,
  product,
  country,
  homePage,
  contactPage,
  aboutPage,
  productsListingPage,
  distributorsPage,
  preFooter,
  footer,
  singletonTypes,
} from "@/sanity/schemas";
import { languages } from "@/sanity/schemas/languages";

// Define the Studio structure with singletons and collections
const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Home Page
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      // Singleton: Contact Page
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),

      // Singleton: About Page
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

      // Singleton: Products Listing Page
      S.listItem()
        .title("Products Listing Page")
        .id("productsListingPage")
        .child(
          S.document()
            .schemaType("productsListingPage")
            .documentId("productsListingPage")
        ),

      // Singleton: Distributors Page
      S.listItem()
        .title("Distributors Page")
        .id("distributorsPage")
        .child(
          S.document()
            .schemaType("distributorsPage")
            .documentId("distributorsPage")
        ),

      S.divider(),

      // Collection: Product Categories
      S.documentTypeListItem("productCategory").title("Product Categories"),

      // Collection: Products
      S.documentTypeListItem("product").title("Products"),

      S.divider(),

      // Collection: Countries (with embedded distributors)
      S.documentTypeListItem("country").title("Countries & Distributors"),

      S.divider(),

      // Singleton: Pre-Footer
      S.listItem()
        .title("Pre-Footer")
        .id("preFooter")
        .child(
          S.document().schemaType("preFooter").documentId("preFooter")
        ),

      // Singleton: Footer
      S.listItem()
        .title("Footer")
        .id("footer")
        .child(S.document().schemaType("footer").documentId("footer")),
    ]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: [
      // Block types
      blockContent,
      twoColumnGrid,
      brochureButton,
      // Collection documents
      productCategory,
      product,
      country,
      // Singletons
      homePage,
      contactPage,
      aboutPage,
      productsListingPage,
      distributorsPage,
      preFooter,
      footer,
    ],
    // Prevent singletons from being created/deleted through the "new document" menu
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !(singletonTypes as readonly string[]).includes(schemaType)
      ),
  },
  form: {
    components: {
      input: I18nCharLimitInput,
    },
  },
  plugins: [
    structureTool({
      structure,
    }),
    internationalizedArray({
      languages,
      defaultLanguages: ["en"],
      fieldTypes: ["string", "text", "blockContent"],
      languageFilter: {
        documentTypes: [
          "homePage",
          "contactPage",
          "aboutPage",
          "productsListingPage",
          "distributorsPage",
          "preFooter",
          "footer",
          "product",
          "productCategory",
        ],
      },
    }),
  ],
  document: {
    // Prevent singletons from being duplicated or deleted
    actions: (input, context) => {
      if ((singletonTypes as readonly string[]).includes(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && ["publish", "discardChanges", "restore"].includes(action)
        );
      }
      return input;
    },
  },
});
