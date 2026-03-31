import { defineRouting } from "next-intl/routing";

export const locales = ["en", "nl", "fr", "de", "pl", "es"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
