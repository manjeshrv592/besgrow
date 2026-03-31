import type { LanguageId } from "./schemas/languages";

type InternationalizedArrayItem = {
  _key?: string;
  language?: string;
  value: any;
};

type InternationalizedArray = InternationalizedArrayItem[] | null | undefined;

/**
 * Extract localized value from an internationalized array field.
 * Falls back to English if the requested language is not available.
 */
export function getLocalizedValue<T = string>(
  field: InternationalizedArray,
  locale: LanguageId,
  fallback?: T
): T | undefined {
  if (!field || !Array.isArray(field)) {
    return fallback;
  }

  // Try to find the value for the requested locale
  const localizedItem = field.find(
    (item) => item._key === locale || item.language === locale
  );
  if (localizedItem?.value !== undefined && localizedItem?.value !== null) {
    return localizedItem.value as T;
  }

  // Fall back to English
  const englishItem = field.find(
    (item) => item._key === "en" || item.language === "en"
  );
  if (englishItem?.value !== undefined && englishItem?.value !== null) {
    return englishItem.value as T;
  }

  return fallback;
}

/**
 * Helper to get localized string value
 */
export function getLocalizedString(
  field: InternationalizedArray,
  locale: LanguageId,
  fallback: string = ""
): string {
  return getLocalizedValue<string>(field, locale, fallback) || fallback;
}

/**
 * Helper to get localized text value (same as string but semantically different)
 */
export function getLocalizedText(
  field: InternationalizedArray,
  locale: LanguageId,
  fallback: string = ""
): string {
  return getLocalizedValue<string>(field, locale, fallback) || fallback;
}

/**
 * Helper to get localized block content (rich text)
 */
export function getLocalizedBlockContent(
  field: InternationalizedArray,
  locale: LanguageId
): any[] | null {
  const value = getLocalizedValue<any[]>(field, locale);
  return value && Array.isArray(value) ? value : null;
}
