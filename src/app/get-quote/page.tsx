import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteCalculator } from "./QuoteCalculator";

export const metadata: Metadata = {
  title: "Get a solar quote · Irradiant Energie",
  description:
    "See your recommended solar system, monthly savings, BESCOM export earnings, and 15-year value — live, in seconds. No forms. No calls.",
};

type GetQuotePageProps = {
  // Next 16: searchParams is async — read with `await`.
  searchParams: Promise<{ name?: string; phone?: string; email?: string }>;
};

export default async function GetQuotePage({ searchParams }: GetQuotePageProps) {
  // Optional pre-fill arrives when a visitor submitted the home-page CTA form,
  // which forwards what they typed via URL params. Direct visits get nothing.
  const params = await searchParams;
  const prefill = {
    name: params.name?.trim() ?? "",
    phone: params.phone?.trim() ?? "",
    email: params.email?.trim() ?? "",
  };
  const hasPrefill = Boolean(prefill.name || prefill.phone || prefill.email);

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
