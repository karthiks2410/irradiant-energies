import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteCalculator } from "./QuoteCalculator";

export const metadata: Metadata = {
  title: "Get a solar quote · Irradiant Energie",
  description:
    "See your recommended solar system, monthly savings, BESCOM export earnings, and 15-year value — live, in seconds. No forms. No calls.",
};

export default function GetQuotePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <QuoteCalculator />
      </main>
      <Footer />
    </>
  );
}
