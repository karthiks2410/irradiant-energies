import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SegmentLandingPage } from "@/components/sections/SegmentLandingPage";

export const metadata: Metadata = {
  title: `Home Solar — Rooftop Solutions for Indian Homes | Irradiant Energie`,
  description:
    "Rooftop solar designed for your home. Free site visit, transparent quote, end-to-end installation, and lifetime after-sales. See which on-grid, off-grid, or hybrid system fits you.",
};

export default function HomeSolarPage() {
  return (
    <>
      <Header />
      <SegmentLandingPage
        segmentId="home"
        heroImage="/segments/home-hero.jpg"
        heroFocal="50% 25%"
        showLeadForm
        showJourney
        showWhyTrust
        showFAQ
      />
      <Footer />
    </>
  );
}
