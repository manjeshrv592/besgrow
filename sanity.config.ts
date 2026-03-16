"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add your schema types here (we'll set these up later)
  schema: {
    types: [],
  },
  plugins: [structureTool()],
});
