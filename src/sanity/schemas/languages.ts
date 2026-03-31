export const languages = [
  { id: "en", title: "English" },
  { id: "nl", title: "Dutch" },
  { id: "fr", title: "French" },
  { id: "de", title: "German" },
  { id: "pl", title: "Polish" },
  { id: "es", title: "Spanish" },
];

export type LanguageId = "en" | "nl" | "fr" | "de" | "pl" | "es";

export const baseLanguage = languages.find((l) => l.id === "en")!;
