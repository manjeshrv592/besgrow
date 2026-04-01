"use client";

import React from "react";
import { useFormValue } from "sanity";
import { charLimits } from "../schemas/charLimits";
import { languages } from "../schemas/languages";

const langLabels: Record<string, string> = Object.fromEntries(
  languages.map((l) => [l.id, l.title.slice(0, 2).toUpperCase()])
);

/**
 * Global form input middleware for Sanity.
 * Used in sanity.config.ts via form.components.input.
 *
 * Detects individual string/text inputs INSIDE internationalized array items
 * and adds a character counter badge on the same row as the language label.
 */
export function I18nCharLimitInput(props: any) {
  const { schemaType, value, renderDefault, path } = props;

  // Detect: is this a "value" field inside an internationalized array item?
  // Path looks like: ["heroTitle", {_key: "abc123"}, "value"]
  const isI18nValueInput =
    path &&
    path.length >= 3 &&
    path[path.length - 1] === "value" &&
    typeof path[path.length - 2] === "object" &&
    "_key" in path[path.length - 2] &&
    (schemaType?.name === "string" || schemaType?.name === "text");

  if (!isI18nValueInput) {
    return renderDefault(props);
  }

  // Get the document type to look up limits
  const docType = useFormValue(["_type"]) as string | undefined;

  // Get the field name (first path segment, e.g. "heroTitle")
  const fieldName = String(path[0]);

  // Get the language of this specific array item
  const languagePath = [...path.slice(0, -1), "language"];
  const language = useFormValue(languagePath) as string | undefined;

  // Fall back to _key for v4 compat
  const langId = language || (path[path.length - 2] as any)?._key || "";

  // Look up limits
  const limits = docType ? charLimits[docType]?.[fieldName] : undefined;
  const maxLen = limits?.[langId as keyof typeof limits] ?? 1000;
  const currentLen = typeof value === "string" ? value.length : 0;
  const exceeded = currentLen > maxLen;
  const nearLimit = currentLen > maxLen * 0.9;

  // If no limits configured for this field, just render normally
  if (!limits) {
    return renderDefault(props);
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Counter badge — positioned on the language label line */}
      <div
        style={{
          position: "absolute",
          top: "-28px",
          right: "0",
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "1px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
            backgroundColor: exceeded
              ? "#fee2e2"
              : nearLimit
                ? "#fef3c7"
                : "rgba(240,253,244,0.8)",
            color: exceeded
              ? "#dc2626"
              : nearLimit
                ? "#d97706"
                : "#16a34a",
            border: `1px solid ${
              exceeded
                ? "#fca5a5"
                : nearLimit
                  ? "#fde68a"
                  : "#bbf7d0"
            }`,
          }}
        >
          {currentLen}/{maxLen}
        </span>
      </div>
      {renderDefault(props)}
    </div>
  );
}
