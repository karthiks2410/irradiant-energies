import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { decodeQuoteToken } from "@/lib/quote-token";
import { buildRecommendation } from "@/lib/solar-calc";
import { ResultStory } from "./ResultStory";

export const metadata: Metadata = {
  title: "Your solar plan · Irradiant Energie",
  description:
    "Personalised solar recommendation: system size, monthly savings, BESCOM export earnings, and 25-year value.",
};

type ResultPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { token } = await searchParams;
  const inputs = token ? decodeQuoteToken(token) : null;

  if (!inputs) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] bg-white">
          <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#446F26]">
              Hmm — that link looks expired
            </p>
            <h1 className="mt-4 font-display text-3xl text-[#1d1d1f] sm:text-4xl">
              We couldn&rsquo;t open this report.
            </h1>
            <p className="mt-3 text-base text-[#6F6F6F]">
              The link may be malformed, or the inputs are missing. Re-run the
              calculator to get a fresh report — it only takes a few seconds.
            </p>
            <Link
              href="/get-quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#52842D] px-6 py-3 text-sm font-medium text-white shadow-sm shadow-[#52842D]/25 transition-colors hover:bg-[#446F26]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the calculator
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const recommendation = buildRecommendation(inputs);

  return (
    <>
      <Header />
      <main className="bg-white">
        <ResultStory recommendation={recommendation} />
      </main>
      <Footer />
    </>
  );
}
