import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SegmentLandingPage } from "@/components/sections/SegmentLandingPage";

export const metadata: Metadata = {
  title: `Commercial Solar — Shops, Offices, Factories & Warehouses | Irradiant Energie`,
  description:
    "Solar for businesses of every shape and size. Predictable energy costs, accelerated depreciation benefits, and a single team handling design, install, and after-sales.",
};

export default function CommercialSolarPage() {
  return (
    <>
      <Header />
      <SegmentLandingPage
        segmentId="commercial"
        heroImage="/segments/commercial-hero.jpg"
        heroFocal="50% 60%"
        showFAQ
      />
      <Footer />
    </>
  );
}
