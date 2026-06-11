import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteCalculator } from "./QuoteCalculator";

export const metadata: Metadata = {
  title: "Get a solar quote · Irradiant Energie",
  description:
    "See your recommended solar system, monthly savings, BESCOM export earnings, and 15-year value — live, in seconds. No forms. No calls.",
};

/**
 * Bill-range tokens accepted from segment-page CTA forms. Each maps to a
 * representative midpoint that initialises the slider — the visitor still
 * sees and can adjust the number, the prefill is just a starting point.
 *
 * Three sets of tokens because each segment ships a differently-scaled set
 * of brackets (homeowner ₹s, society common-area ₹s, business ₹s).
 */
const BILL_RANGE_MIDPOINTS: Record<string, number> = {
  // Home
  "lt-1500": 1000,
  "1500-2500": 2000,
  "2500-4000": 3250,
  "4000-8000": 6000,
  "gt-8000": 12000,
  // Housing society
  "lt-15k": 10000,
  "15k-30k": 22500,
  "30k-60k": 45000,
  "60k-1L": 80000,
  "gt-1L": 150000,
  // Commercial
  "lt-50k": 30000,
  "50k-1L": 75000,
  "1L-3L": 200000,
  "3L-10L": 650000,
  "gt-10L": 1500000,
};

const SEGMENT_TO_PROPERTY_TYPE: Record<string, "home" | "society" | "commercial" | "industrial"> = {
  home: "home",
  "housing-society": "society",
  society: "society",
  commercial: "commercial",
  industrial: "industrial",
};

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

type SearchParams = {
  // Original (pre-existing) prefill params from the home-page CTA.
  name?: string;
  phone?: string;
  email?: string;
  // New params forwarded by segment-page lead forms (Home / Society / Commercial).
  segment?: string;
  pincode?: string;
  bill?: string;
  /** Society name when the lead came from the housing-society page. */
  society?: string;
  /** Company / facility name when the lead came from the commercial page. */
  company?: string;
};

type GetQuotePageProps = {
  // Next 16: searchParams is async — read with `await`.
  searchParams: Promise<SearchParams>;
};

export default async function GetQuotePage({ searchParams }: GetQuotePageProps) {
  const params = await searchParams;

  const segment = params.segment?.trim();
  const pincodeRaw = params.pincode?.trim();
  const billToken = params.bill?.trim();

  // Society name OR company name — whichever the segment-page form sent.
  // Both are surfaced in the lead alert email under a generic "organisation".
  const organisation = (params.society ?? params.company)?.trim() || undefined;

  const prefill = {
    name: params.name?.trim() ?? "",
    phone: params.phone?.trim() ?? "",
    email: params.email?.trim() ?? "",
    propertyType: segment ? SEGMENT_TO_PROPERTY_TYPE[segment] : undefined,
    pincode: pincodeRaw && PINCODE_REGEX.test(pincodeRaw) ? pincodeRaw : undefined,
    billRupees: billToken ? BILL_RANGE_MIDPOINTS[billToken] : undefined,
    organisation,
    segment,
  };

  const hasPrefill = Boolean(
    prefill.name ||
      prefill.phone ||
      prefill.email ||
      prefill.propertyType ||
      prefill.pincode ||
      prefill.billRupees ||
      prefill.organisation ||
      prefill.segment,
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        <QuoteCalculator prefill={hasPrefill ? prefill : undefined} />
      </main>
      <Footer />
    </>
  );
}
