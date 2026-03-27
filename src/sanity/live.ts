import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Content is available on the `published` perspective
    apiVersion: "v2022-03-07", // Ensure a modern API version for live content
  }),
});
