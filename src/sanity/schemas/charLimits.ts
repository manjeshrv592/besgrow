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
    heroTitle: { en: 10, nl: 10, fr: 100, de: 10, pl: 10, es: 10 },
    heroDescription: {
      en: 650,
      nl: 650,
      fr: 650,
      de: 650,
      pl: 650,
      es: 650,
    },
    aboutTitle: { en: 30, nl: 30, fr: 30, de: 30, pl: 30, es: 30 },
    partnersTitle: {
      en: 50,
      nl: 50,
      fr: 50,
      de: 50,
      pl: 50,
      es: 50,
    },
    partnersDescription: {
      en: 350,
      nl: 350,
      fr: 350,
      de: 350,
      pl: 350,
      es: 350,
    },
    europeHeading: {
      en: 26,
      nl: 26,
      fr: 26,
      de: 26,
      pl: 26,
      es: 26,
    },
    europeDescription: {
      en: 250,
      nl: 250,
      fr: 250,
      de: 250,
      pl: 250,
      es: 250,
    },
    worldHeading: {
      en: 26,
      nl: 26,
      fr: 26,
      de: 26,
      pl: 26,
      es: 26,
    },
    worldDescription: {
      en: 250,
      nl: 250,
      fr: 250,
      de: 250,
      pl: 250,
      es: 250,
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
    title: { en: 30, nl: 30, fr: 30, de: 30, pl: 30, es: 30 },
    description: { en: 200, nl: 200, fr: 200, de: 200, pl: 200, es: 200 },
    bottomNote: { en: 180, nl: 180, fr: 180, de: 180, pl: 180, es: 180 },
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
      en: 32,
      nl: 32,
      fr: 32,
      de: 32,
      pl: 32,
      es: 32,
    },
    worldSidebarHeading: {
      en: 32,
      nl: 32,
      fr: 32,
      de: 32,
      pl: 32,
      es: 32,
    },
    sidebarSubtext: {
      en: 70,
      nl: 70,
      fr: 70,
      de: 70,
      pl: 70,
      es: 70,
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
    text: { en: 180, nl: 180, fr: 180, de: 180, pl: 180, es: 180 },
  },

  // ──────────────────────────────────────────────
  // Footer (plain string/text fields — not internationalized)
  // ──────────────────────────────────────────────
  footer: {
    addressTitle: {
      en: 45,
      nl: 45,
      fr: 45,
      de: 45,
      pl: 45,
      es: 45,
    },
    address: { en: 150, nl: 150, fr: 150, de: 150, pl: 150, es: 150 },
    email: { en: 40, nl: 40, fr: 40, de: 40, pl: 40, es: 40 },
    phone: { en: 20, nl: 20, fr: 20, de: 20, pl: 20, es: 20 },
    copyrightText: {
      en: 50,
      nl: 50,
      fr: 50,
      de: 50,
      pl: 50,
      es: 50,
    },
  },

  // ──────────────────────────────────────────────
  // Legal Pages
  // ──────────────────────────────────────────────
  privacyPage: {
    title: { en: 100, nl: 100, fr: 100, de: 100, pl: 100, es: 100 },
  },
  cookiePage: {
    title: { en: 100, nl: 100, fr: 100, de: 100, pl: 100, es: 100 },
  },
  termsPage: {
    title: { en: 100, nl: 100, fr: 100, de: 100, pl: 100, es: 100 },
  },
  deliveryTermsPage: {
    title: { en: 100, nl: 100, fr: 100, de: 100, pl: 100, es: 100 },
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
