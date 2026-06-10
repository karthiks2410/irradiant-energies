import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { GovernmentSection } from "@/components/sections/GovernmentSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SubsidyCountdown } from "@/components/sections/SubsidyCountdown";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SubsidyCountdown />
        <ProductShowcaseSection />
        <GovernmentSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
