import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Irradiant Energie",
  description:
    "Meet the team behind Irradiant Energie — powering India's clean energy future with innovative solar solutions.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1 overflow-hidden">
        <AboutHero />
        <AboutTeam />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
