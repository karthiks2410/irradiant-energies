/**
 * Solar quote constants — Karnataka / BESCOM context, Feb 2026.
 *
 * Single source of truth for tariff slabs, generation rates, subsidies, and
 * install benchmarks. Update annually as policy / tariff revisions land.
 */

export type TariffSlab = {
  /** Inclusive lower bound, kWh/month. */
  fromKwh: number;
  /** Inclusive upper bound, kWh/month. `null` = no upper bound. */
  toKwh: number | null;
  /** Per-unit rate in INR. */
  ratePerKwh: number;
};

/**
 * BESCOM domestic LT-2(a) tariff slabs, FY 2025-26 (effective Apr 2025).
 * Source: KERC Tariff Order 2025. Excludes fixed charges, taxes, FAC.
 */
export const BESCOM_DOMESTIC_SLABS: TariffSlab[] = [
  { fromKwh: 0, toKwh: 50, ratePerKwh: 4.15 },
  { fromKwh: 50, toKwh: 100, ratePerKwh: 5.6 },
  { fromKwh: 100, toKwh: 200, ratePerKwh: 7.15 },
  { fromKwh: 200, toKwh: 400, ratePerKwh: 8.2 },
  { fromKwh: 400, toKwh: null, ratePerKwh: 9.5 },
];

/** BESCOM fixed monthly charge per sanctioned kW for domestic LT-2(a). */
export const BESCOM_FIXED_CHARGE_PER_KW = 110;

/**
 * Net metering export rate (BESCOM gross metering rate for residential rooftop solar).
 * Used to estimate earnings from surplus units exported to the grid.
 */
export const NET_METERING_EXPORT_RATE_INR_PER_KWH = 3.05;

/**
 * Average solar generation per installed kWp, by region.
 * Karnataka receives ~5.0–5.5 peak sun hours/day; after derating for soiling,
 * temperature, and inverter losses, ~4.5 kWh/kWp/day is a reliable planning figure.
 */
export const AVG_GENERATION_KWH_PER_KWP_PER_DAY = {
  KA: 4.5,
  // Future: TN, MH, etc.
} as const;

export type Region = keyof typeof AVG_GENERATION_KWH_PER_KWP_PER_DAY;

/** PM Surya Ghar Muft Bijli Yojana subsidy (Feb 2026), residential rooftop only. */
export const PM_SURYA_GHAR_SUBSIDY_INR = {
  oneKw: 30000,
  twoKw: 60000,
  threeKwPlus: 78000, // capped at 3 kW for the central subsidy
} as const;

/** Standard residential install benchmark (post-subsidy reference for v1). */
export const INSTALL_COST_PER_KWP_INR = 60000;

/** Rooftop area required per kWp using mainstream Indian rooftop modules at standard tilt. */
export const ROOF_SQFT_PER_KWP = 70;

/**
 * Wattage per panel for panel-count math, by property type.
 *
 * Reflects what Indian installers actually quote in 2026:
 *   - Residential (home / society): 555 W mono PERC / N-type — Waaree, Vikram,
 *     Adani, Goldi, Loom SHARK 550 are all in this range.
 *   - Commercial / industrial: 620 W TOPCon — these installs use higher-density
 *     modules (Waaree Ostara, Vikram Hypersol, Loom SHARK 600/625) for fewer
 *     mounting points and lower BOS cost per kWp.
 *
 * Single source of truth — change here and panel counts update everywhere.
 */
export const PANEL_WATTAGE_BY_PROPERTY = {
  home: 555,
  society: 555,
  commercial: 620,
  industrial: 620,
} as const;

/** Annual panel degradation rate (linear approximation). */
export const ANNUAL_DEGRADATION = 0.005;

/** Assumed annual grid tariff inflation, used for cumulative savings projection. */
export const ANNUAL_TARIFF_INFLATION = 0.04;

/**
 * Projection horizon, years.
 *
 * 15 years is the meaningful planning horizon: it covers the full payback
 * window plus a decade of compound benefit, without leaning on far-future
 * tariff assumptions that get speculative past year 15.
 */
export const PROJECTION_HORIZON_YEARS = 15;

/**
 * Rough kWh-per-month inference from Karnataka residential pincodes.
 * Default region resolver — every Karnataka pincode (5xxxxx) maps to KA.
 * Future: real DISCOM database keyed by pincode.
 */
export function regionForPincode(pincode: string): Region {
  // Pincode validation is shallow here; zod handles full format checking upstream.
  // Karnataka pincodes are in the 56xxxx–59xxxx band primarily.
  if (/^5\d{5}$/.test(pincode)) return "KA";
  return "KA"; // safe default for v1 — site is Bangalore-centric
}
