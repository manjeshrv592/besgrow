import type { LanguageId } from "./languages";

/**
 * Per-language character limits for each field.
 * Every language gets its own limit so you can fine-tune per locale.
 */
type LanguageLimits = Record<LanguageId, number>;

/**
 * Character limits configuration.
 *
 * Structure:
 *   schemaName -> fieldName -> { en: N, nl: N, fr: N, de: N, pl: N, es: N }
 *
 * For non-internationalized (plain string/text) fields the key is just the
 * language code "en" by convention but the helper `getPlainLimit` reads it.
 *
 * To adjust a specific field, find it below and change the number.
 */
export const charLimits: Record<string, Record<string, LanguageLimits>> = {
  // ──────────────────────────────────────────────
  // Home Page
  // ──────────────────────────────────────────────
  homePage: {
    heroTitle: { en: 1000, nl: 1000, fr: 100, de: 1000, pl: 1000, es: 1000 },
    heroDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    aboutTitle: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    partnersTitle: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    partnersDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    europeHeading: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    europeDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    worldHeading: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    worldDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // About Page
  // ──────────────────────────────────────────────
  aboutPage: {
    title: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    leadText: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    contentText: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    sidebarTitle: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    sidebarDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // Contact Page
  // ──────────────────────────────────────────────
  contactPage: {
    title: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    leadText: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    contentText: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    sidebarTitle: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    sidebarDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // Distributors Page
  // ──────────────────────────────────────────────
  distributorsPage: {
    title: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    description: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    bottomNote: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    europeTabLabel: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    worldTabLabel: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    europeSidebarHeading: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    worldSidebarHeading: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    sidebarSubtext: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // Products Listing Page
  // ──────────────────────────────────────────────
  productsListingPage: {
    sidebarTitle: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    sidebarDescription: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // Pre-Footer
  // ──────────────────────────────────────────────
  preFooter: {
    text: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
  },

  // ──────────────────────────────────────────────
  // Footer (plain string/text fields — not internationalized)
  // ──────────────────────────────────────────────
  footer: {
    addressTitle: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    address: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    email: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    phone: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    copyrightText: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
  },

  // ──────────────────────────────────────────────
  // Product
  // ──────────────────────────────────────────────
  product: {
    title: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
  },

  // ──────────────────────────────────────────────
  // Product Category
  // ──────────────────────────────────────────────
  productCategory: {
    title: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    summary: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
  },

  // ──────────────────────────────────────────────
  // Country — distributor embedded fields (plain strings)
  // ──────────────────────────────────────────────
  country: {
    distributorName: {
      en: 1000,
      nl: 1000,
      fr: 1000,
      de: 1000,
      pl: 1000,
      es: 1000,
    },
    city: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    address: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    phone: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
    email: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
  },

  // ──────────────────────────────────────────────
  // Brochure Button (plain string — embedded in blockContent)
  // ──────────────────────────────────────────────
  brochureButton: {
    label: { en: 1000, nl: 1000, fr: 1000, de: 1000, pl: 1000, es: 1000 },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Validation helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Language name lookup for human-friendly error messages.
 */
const languageNames: Record<string, string> = {
  en: "English",
  nl: "Dutch",
  fr: "French",
  de: "German",
  pl: "Polish",
  es: "Spanish",
};

/**
 * Creates a Sanity `Rule.custom()` validator for **internationalized array**
 * fields (internationalizedArrayString / internationalizedArrayText).
 *
 * Usage inside a schema:
 * ```ts
 * validation: (rule) => rule.custom(i18nCharLimit("homePage", "heroTitle")),
 * ```
 */
export function i18nCharLimit(schemaName: string, fieldName: string) {
  const limits = charLimits[schemaName]?.[fieldName];

  return (
    items:
      | Array<{ _key: string; language?: string; value?: string }>
      | undefined,
  ) => {
    if (!items || !limits) return true;

    for (const item of items) {
      // v5 uses `language` field; v4 used `_key` as the language id
      const langKey = (item.language ?? item._key) as LanguageId;
      const maxLen = limits[langKey];

      if (maxLen && item.value && item.value.length > maxLen) {
        const langName = languageNames[langKey] || langKey;
        return `${langName} text cannot exceed ${maxLen} characters (currently ${item.value.length})`;
      }
    }

    return true;
  };
}

/**
 * Returns the character limit for a **plain (non-internationalized)** field.
 * Reads the "en" value by convention since plain fields aren't per-language.
 *
 * Usage:
 * ```ts
 * validation: (rule) => rule.max(getPlainLimit("footer", "email")),
 * ```
 */
export function getPlainLimit(schemaName: string, fieldName: string): number {
  return charLimits[schemaName]?.[fieldName]?.en ?? 1000;
}
