/**
 * Solar quote calculator — pure functions, no I/O, no React.
 *
 * The recommendation engine. Used by:
 *   - the multi-step form to live-update the calculator preview
 *   - the result page to render the three-act story
 *   - the /api/quote route to recompute server-side and guard against tampering
 *
 * Single source of truth: every UI surface that displays a recommended kWp,
 * monthly savings, or 15-year curve calls into this module.
 */

import {
  ANNUAL_DEGRADATION,
  ANNUAL_TARIFF_INFLATION,
  AVG_GENERATION_KWH_PER_KWP_PER_DAY,
  BESCOM_DOMESTIC_SLABS,
  INSTALL_COST_PER_KWP_INR,
  NET_METERING_EXPORT_RATE_INR_PER_KWH,
  PANEL_WATTAGE_BY_PROPERTY,
  PM_SURYA_GHAR_SUBSIDY_INR,
  PROJECTION_HORIZON_YEARS,
  type Region,
  ROOF_SQFT_PER_KWP,
  type TariffSlab,
  regionForPincode,
} from "./solar-constants";

export type PropertyType = "home" | "society" | "commercial" | "industrial";

export type QuoteInputs = {
  propertyType: PropertyType;
  pincode: string;
  /** Provide one of the two — kWh wins if both are present. */
  monthlyKwh?: number;
  monthlyBillRupees?: number;
};

export type QuoteRecommendation = {
  monthlyKwh: number;
  systemSizeKw: number;
  panelCount: number;
  panelWattage: number;
  roofAreaSqftRequired: number;
  monthlyGenerationKwh: number;
  monthlySavingsRupees: number;
  monthlyExportKwh: number;
  monthlyExportEarningsRupees: number;
  breakevenYears: number;
  cumulativeSavingsRupees: number;
  pmSuryaGharSubsidyRupees: number;
  estimatedInstallCostRupees: number;
  region: Region;
};

/**
 * Cost of a given monthly consumption under the supplied tariff slabs (variable charges only).
 */
export function billRupeesFromKwh(kwh: number, slabs: TariffSlab[] = BESCOM_DOMESTIC_SLABS): number {
  if (kwh <= 0) return 0;
  let remaining = kwh;
  let total = 0;
  for (const slab of slabs) {
    const slabSize = slab.toKwh === null ? Infinity : slab.toKwh - slab.fromKwh;
    const inSlab = Math.min(remaining, slabSize);
    total += inSlab * slab.ratePerKwh;
    remaining -= inSlab;
    if (remaining <= 0) break;
  }
  return total;
}

/**
 * Inverse of billRupeesFromKwh — given a monthly bill amount in INR,
 * find the kWh consumption that would produce it under the slab schedule.
 */
export function kwhFromBillRupees(rupees: number, slabs: TariffSlab[] = BESCOM_DOMESTIC_SLABS): number {
  if (rupees <= 0) return 0;
  let remaining = rupees;
  let kwh = 0;
  for (const slab of slabs) {
    const slabSize = slab.toKwh === null ? Infinity : slab.toKwh - slab.fromKwh;
    const slabCost = slabSize * slab.ratePerKwh;
    if (remaining <= slabCost) {
      kwh += remaining / slab.ratePerKwh;
      return kwh;
    }
    kwh += slabSize;
    remaining -= slabCost;
  }
  return kwh;
}

/**
 * Recommended system size in kWp for a given monthly consumption in the given region.
 * Rounds up to the nearest 0.5 kWp for cleaner installer-friendly sizing.
 */
export function kwpForMonthlyKwh(monthlyKwh: number, region: Region): number {
  if (monthlyKwh <= 0) return 0;
  const dailyTarget = monthlyKwh / 30;
  const rawKwp = dailyTarget / AVG_GENERATION_KWH_PER_KWP_PER_DAY[region];
  return Math.ceil(rawKwp * 2) / 2; // round up to nearest 0.5
}

/**
 * Central-government PM Surya Ghar subsidy for a given recommended system size.
 * Capped at 3 kW. Residential only (commercial/industrial get nothing here).
 */
export function pmSuryaGharSubsidy(systemSizeKw: number, propertyType: PropertyType): number {
  if (propertyType !== "home" && propertyType !== "society") return 0;
  if (systemSizeKw < 1) return 0;
  if (systemSizeKw < 2) return PM_SURYA_GHAR_SUBSIDY_INR.oneKw;
  if (systemSizeKw < 3) return PM_SURYA_GHAR_SUBSIDY_INR.twoKw;
  return PM_SURYA_GHAR_SUBSIDY_INR.threeKwPlus;
}

/**
 * Build the full recommendation object from raw inputs. Resolves missing
 * fields (e.g., bill ↔ kWh) and computes downstream financials.
 */
export function buildRecommendation(inputs: QuoteInputs): QuoteRecommendation {
  const region = regionForPincode(inputs.pincode);

  const monthlyKwh = (() => {
    if (typeof inputs.monthlyKwh === "number" && inputs.monthlyKwh > 0) return inputs.monthlyKwh;
    if (typeof inputs.monthlyBillRupees === "number" && inputs.monthlyBillRupees > 0) {
      return kwhFromBillRupees(inputs.monthlyBillRupees);
    }
    return 0;
  })();

  const systemSizeKw = kwpForMonthlyKwh(monthlyKwh, region);
  const panelWattage = PANEL_WATTAGE_BY_PROPERTY[inputs.propertyType];
  const panelCount = Math.ceil((systemSizeKw * 1000) / panelWattage);
  const roofAreaSqftRequired = Math.round(systemSizeKw * ROOF_SQFT_PER_KWP);

  const monthlyGenerationKwh =
    systemSizeKw * AVG_GENERATION_KWH_PER_KWP_PER_DAY[region] * 30;

  // Self-consumption is the lesser of generation and demand; everything else is exported.
  const selfConsumedKwh = Math.min(monthlyGenerationKwh, monthlyKwh);
  const monthlyExportKwh = Math.max(0, monthlyGenerationKwh - monthlyKwh);

  // Savings = avoided cost of the units you would have otherwise drawn from the grid,
  // valued at the *marginal* slab rate (we approximate by recomputing the bill twice).
  const billWithoutSolar = billRupeesFromKwh(monthlyKwh);
  const billWithSolar = billRupeesFromKwh(Math.max(0, monthlyKwh - selfConsumedKwh));
  const monthlySavingsRupees = billWithoutSolar - billWithSolar;

  const monthlyExportEarningsRupees = monthlyExportKwh * NET_METERING_EXPORT_RATE_INR_PER_KWH;

  const pmSuryaGharSubsidyRupees = pmSuryaGharSubsidy(systemSizeKw, inputs.propertyType);
  const grossInstallCost = systemSizeKw * INSTALL_COST_PER_KWP_INR;
  const estimatedInstallCostRupees = Math.max(0, grossInstallCost - pmSuryaGharSubsidyRupees);

  const totalMonthlyBenefitYearOne =
    monthlySavingsRupees + monthlyExportEarningsRupees;

  // Breakeven = years for cumulative benefit to equal post-subsidy install cost.
  // (Same thing the industry calls "payback period" — we just use plainer English.)
  const breakevenYears = totalMonthlyBenefitYearOne > 0
    ? estimatedInstallCostRupees / (totalMonthlyBenefitYearOne * 12)
    : 0;

  const cumulativeSavingsRupees = projectCumulativeSavings(
    totalMonthlyBenefitYearOne,
    PROJECTION_HORIZON_YEARS,
  );

  return {
    monthlyKwh: Math.round(monthlyKwh),
    systemSizeKw,
    panelCount,
    panelWattage,
    roofAreaSqftRequired,
    monthlyGenerationKwh: Math.round(monthlyGenerationKwh),
    monthlySavingsRupees: Math.round(monthlySavingsRupees),
    monthlyExportKwh: Math.round(monthlyExportKwh),
    monthlyExportEarningsRupees: Math.round(monthlyExportEarningsRupees),
    breakevenYears: Number(breakevenYears.toFixed(1)),
    cumulativeSavingsRupees: Math.round(cumulativeSavingsRupees),
    pmSuryaGharSubsidyRupees,
    estimatedInstallCostRupees: Math.round(estimatedInstallCostRupees),
    region,
  };
}

/**
 * Cumulative savings over `years` years. Tariff inflates 4%/yr, panels degrade 0.5%/yr.
 */
export function projectCumulativeSavings(yearOneMonthlyBenefit: number, years: number): number {
  let total = 0;
  for (let year = 0; year < years; year++) {
    const tariffMultiplier = Math.pow(1 + ANNUAL_TARIFF_INFLATION, year);
    const degradationMultiplier = Math.pow(1 - ANNUAL_DEGRADATION, year);
    total += yearOneMonthlyBenefit * 12 * tariffMultiplier * degradationMultiplier;
  }
  return total;
}

/**
 * Year-by-year cumulative savings curve for the result page's projection chart.
 * Returns {year: 1..N, cumulative: INR} pairs.
 */
export function projectionCurve(yearOneMonthlyBenefit: number, years: number = PROJECTION_HORIZON_YEARS): Array<{ year: number; cumulative: number }> {
  const points: Array<{ year: number; cumulative: number }> = [];
  let running = 0;
  for (let year = 1; year <= years; year++) {
    const idx = year - 1;
    const tariffMultiplier = Math.pow(1 + ANNUAL_TARIFF_INFLATION, idx);
    const degradationMultiplier = Math.pow(1 - ANNUAL_DEGRADATION, idx);
    running += yearOneMonthlyBenefit * 12 * tariffMultiplier * degradationMultiplier;
    points.push({ year, cumulative: Math.round(running) });
  }
  return points;
}

/**
 * Indian-format currency formatter. ₹1,23,456.
 */
export function formatINR(rupees: number, options: { compact?: boolean } = {}): string {
  if (options.compact) {
    if (rupees >= 10000000) return `₹${(rupees / 10000000).toFixed(2)} Cr`;
    if (rupees >= 100000) return `₹${(rupees / 100000).toFixed(1)} L`;
    if (rupees >= 1000) return `₹${(rupees / 1000).toFixed(1)}k`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}
