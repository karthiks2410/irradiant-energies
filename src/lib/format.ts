/**
 * Indian rupee formatting utility.
 *
 * Uses lakh/crore grouping (the `en-IN` locale's currency format) so dynamic
 * values render consistently across the site. Hardcoded display copy
 * ("₹78,000", "₹3,500") should NOT be routed through this — those are static
 * brand stat cards and stay as-is.
 *
 * Examples:
 *   formatINR(1234)                          → "₹1,234"
 *   formatINR(420000)                        → "₹4,20,000"
 *   formatINR(10000000)                      → "₹1,00,00,000"
 *   formatINR(81.5, { compact: true })       → "₹81.5L"   (lakhs, sub-crore)
 *   formatINR(12500000, { compact: true })   → "₹1.25Cr"
 *   formatINR(815000, { compact: true })     → "₹8.15L"
 *   formatINR(undefined)                     → "—"
 *   formatINR(null)                          → "—"
 *   formatINR(50000, { showSymbol: false })  → "50,000"
 */

const RUPEE_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const PLAIN_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export type FormatINROptions = {
  /** Render as ₹X.XXCr / ₹X.XL when value is large enough. Falls back to standard for sub-lakh values. */
  compact?: boolean;
  /** Set to false to omit the ₹ glyph. Default true. */
  showSymbol?: boolean;
};

export function formatINR(
  value: number | null | undefined,
  opts: FormatINROptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }

  const { compact = false, showSymbol = true } = opts;
  const symbol = showSymbol ? "₹" : "";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  if (compact) {
    if (abs >= 10_000_000) {
      // crore
      return `${sign}${symbol}${trimZeros((abs / 10_000_000).toFixed(2))}Cr`;
    }
    if (abs >= 100_000) {
      // lakh — one decimal is plenty (₹4.2L, ₹81.5L)
      return `${sign}${symbol}${trimZeros((abs / 100_000).toFixed(1))}L`;
    }
    // sub-lakh: fall back to standard grouped format
  }

  const grouped = showSymbol
    ? RUPEE_FORMATTER.format(abs)
    : PLAIN_FORMATTER.format(abs);
  return `${sign}${grouped}`;
}

/** Trim trailing ".0" / ".00" so "4.0L" becomes "4L" and "1.25Cr" stays "1.25Cr". */
function trimZeros(s: string): string {
  if (!s.includes(".")) return s;
  return s.replace(/\.?0+$/, "");
}
