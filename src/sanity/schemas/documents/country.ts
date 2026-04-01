import { defineType, defineField } from "sanity";
import { DistributorEntryInput } from "@/sanity/components/GoogleMapsLinkInput";
import { getPlainLimit } from "../charLimits";
import { createPlainCharLimitInput } from "../../components/PlainCharLimitInput";

/**
 * Helper function to extract lat/lng from a Google Maps URL.
 * Supports formats like:
 * - https://www.google.com/maps?q=52.3676,4.9041
 * - https://www.google.com/maps/@52.3676,4.9041,15z
 * - https://www.google.com/maps/place/.../@52.3676,4.9041,15z
 * - https://maps.google.com/?ll=52.3676,4.9041
 */
function extractCoordsFromGoogleMapsUrl(url: string): { lat: number; lng: number } | null {
  if (!url) return null;
  
  // Pattern 1: @lat,lng,zoom or @lat,lng
  const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const atMatch = url.match(atPattern);
  if (atMatch) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }
  
  // Pattern 2: ?q=lat,lng
  const qPattern = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const qMatch = url.match(qPattern);
  if (qMatch) {
    return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
  }
  
  // Pattern 3: ?ll=lat,lng
  const llPattern = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const llMatch = url.match(llPattern);
  if (llMatch) {
    return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]) };
  }
  
  // Pattern 4: /place/lat,lng or place coordinates in data parameter
  const placePattern = /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/;
  const placeMatch = url.match(placePattern);
  if (placeMatch) {
    return { lat: parseFloat(placeMatch[1]), lng: parseFloat(placeMatch[2]) };
  }
  
  return null;
}

export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "settings", title: "Settings" },
    { name: "distributors", title: "Distributors" },
  ],
  fields: [
    // ─── Basic Info ───
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
      description: 'Full country name, e.g., "Netherlands".',
      readOnly: true,
    }),
    defineField({
      name: "code",
      title: "Country Code (ISO alpha-2)",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required().length(2).uppercase(),
      description:
        'Two-letter country code, e.g., "NL". Used to display the flag automatically.',
      readOnly: true,
    }),
    defineField({
      name: "isoNumeric",
      title: "ISO Numeric Code",
      type: "string",
      group: "basic",
      description:
        'Three-digit ISO numeric code, e.g., "528". Used to highlight countries on the map.',
      readOnly: true,
    }),

    // ─── Settings (Toggles) ───
    defineField({
      name: "serviceAvailable",
      title: "Service Available",
      type: "boolean",
      group: "settings",
      description: "Toggle ON if service/distribution is available in this country.",
      initialValue: false,
    }),
    defineField({
      name: "isEurope",
      title: "European Country",
      type: "boolean",
      group: "settings",
      description: "Toggle ON if this country belongs to Europe.",
      initialValue: false,
    }),

    // ─── Distributors Array ───
    defineField({
      name: "distributors",
      title: "Distributors",
      type: "array",
      group: "distributors",
      description: "Add distributors for this country using the + button.",
      of: [
        {
          type: "object",
          name: "distributorEntry",
          title: "Distributor",
          components: {
            input: DistributorEntryInput,
          },
          fields: [
            defineField({
              name: "distributorName",
              title: "Distributor Name",
              type: "string",
              validation: (rule) => rule.required().max(getPlainLimit("country", "distributorName")),
              components: { input: createPlainCharLimitInput("country", "distributorName") },
            }),
            defineField({
              name: "city",
              title: "City",
              type: "string",
              validation: (rule) => rule.required().max(getPlainLimit("country", "city")),
              components: { input: createPlainCharLimitInput("country", "city") },
            }),
            defineField({
              name: "googleMapsLink",
              title: "Google Maps Link",
              type: "url",
              description:
                "Paste a Google Maps link and coordinates will be extracted automatically. Example: https://www.google.com/maps/@52.3676,4.9041,15z",
              validation: (rule) =>
                rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
            }),
            defineField({
              name: "coordinates",
              title: "Coordinates (Auto-extracted)",
              type: "object",
              description:
                "These are automatically extracted from the Google Maps link. You can also enter manually.",
              fields: [
                defineField({
                  name: "lat",
                  title: "Latitude",
                  type: "number",
                }),
                defineField({
                  name: "lng",
                  title: "Longitude",
                  type: "number",
                }),
              ],
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "string",
              validation: (rule) => rule.max(getPlainLimit("country", "address")),
              components: { input: createPlainCharLimitInput("country", "address") },
            }),
            defineField({
              name: "phone",
              title: "Phone",
              type: "string",
              validation: (rule) => rule.max(getPlainLimit("country", "phone")),
              components: { input: createPlainCharLimitInput("country", "phone") },
            }),
            defineField({
              name: "email",
              title: "Email",
              type: "string",
              validation: (rule) => rule.max(getPlainLimit("country", "email")),
              components: { input: createPlainCharLimitInput("country", "email") },
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
              city: "city",
            },
            prepare({ title, city }) {
              return {
                title: title || "Untitled Distributor",
                subtitle: city || "",
              };
            },
          },
        },
      ],
    }),

  ],
  preview: {
    select: {
      title: "name",
      code: "code",
      serviceAvailable: "serviceAvailable",
      distributors: "distributors",
    },
    prepare({ title, code, serviceAvailable, distributors }) {
      const distributorCount = distributors?.length || 0;
      const status = serviceAvailable ? "✓ Active" : "○ Inactive";
      return {
        title: title || "Untitled Country",
        subtitle: `${code?.toUpperCase() || ""} | ${status} | ${distributorCount} distributor${distributorCount !== 1 ? "s" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Name A→Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Service Available First",
      name: "serviceFirst",
      by: [
        { field: "serviceAvailable", direction: "desc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});

// Export the helper for use in custom input components if needed
export { extractCoordsFromGoogleMapsUrl };
