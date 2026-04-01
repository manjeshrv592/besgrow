"use client";

import React from "react";
import { type StringInputProps, type TextInputProps, set, PatchEvent } from "sanity";
import { getPlainLimit } from "../schemas/charLimits";

/**
 * Factory function: creates a custom input component for a plain string or text
 * field that shows a character counter and enforces the limit by truncating.
 *
 * Usage in a schema:
 * ```ts
 * components: { input: createPlainCharLimitInput("footer", "addressTitle") },
 * ```
 */
export function createPlainCharLimitInput(
  schemaName: string,
  fieldName: string
) {
  const maxLen = getPlainLimit(schemaName, fieldName);

  return function PlainCharLimitInput(
    props: StringInputProps | TextInputProps
  ) {
    const { value, onChange, renderDefault } = props;
    const currentLen = (value as string)?.length ?? 0;
    const exceeded = currentLen > maxLen;

    // Auto-truncate if value exceeds the limit
    React.useEffect(() => {
      if (value && (value as string).length > maxLen) {
        onChange(PatchEvent.from(set((value as string).slice(0, maxLen))));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, maxLen]);

    return (
      <div>
        {/* Character counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
              backgroundColor: exceeded
                ? "#fee2e2"
                : currentLen > maxLen * 0.9
                  ? "#fef3c7"
                  : "#f0fdf4",
              color: exceeded
                ? "#dc2626"
                : currentLen > maxLen * 0.9
                  ? "#d97706"
                  : "#16a34a",
              border: `1px solid ${
                exceeded
                  ? "#fca5a5"
                  : currentLen > maxLen * 0.9
                    ? "#fde68a"
                    : "#bbf7d0"
              }`,
            }}
          >
            {currentLen}/{maxLen}
          </span>
        </div>

        {/* Render the default input */}
        {renderDefault(props)}
      </div>
    );
  };
}
