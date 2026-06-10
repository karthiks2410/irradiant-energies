import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SegmentLandingPage } from "@/components/sections/SegmentLandingPage";

export const metadata: Metadata = {
  title: `Housing Society Solar — Cut Common-Area Electricity Bills | Irradiant Energie`,
  description:
    "Solar for apartments, gated communities, and RWA-managed buildings. Lower society maintenance, predictable energy costs, and a single point of contact end-to-end.",
};

export default function HousingSocietySolarPage() {
  return (
    <>
      <Header />
      <SegmentLandingPage segmentId="housing-society" heroImage="/segments/housing-society-hero.jpg" />
      <Footer />
    </>
  );
}
