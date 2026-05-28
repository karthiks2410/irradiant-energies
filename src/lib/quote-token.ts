import type { QuoteInputs } from "./solar-calc";

/**
 * URL-safe base64 token encoding the user's calculator inputs.
 * Result page decodes and recomputes — keeps the share link stateless.
 */

export function encodeQuoteToken(inputs: QuoteInputs): string {
  const json = JSON.stringify(inputs);
  // Buffer is available in Node and in modern browsers via the polyfill chain;
  // we restrict ourselves to btoa-equivalent to stay edge-compatible.
  const b64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(json, "utf-8").toString("base64")
      : btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeQuoteToken(token: string): QuoteInputs | null {
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof Buffer !== "undefined"
        ? Buffer.from(padded, "base64").toString("utf-8")
        : decodeURIComponent(escape(atob(padded)));
    const parsed = JSON.parse(json) as QuoteInputs;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.pincode !== "string" ||
      typeof parsed.propertyType !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
