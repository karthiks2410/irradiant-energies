import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolarPanelsSection } from "@/components/sections/SolarPanelsSection";
import { SmartBoxSection } from "@/components/sections/SmartBoxSection";
import { P2PTradingSection } from "@/components/sections/P2PTradingSection";
import { GovernmentSection } from "@/components/sections/GovernmentSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SolarPanelsSection />
        <SmartBoxSection />
        <P2PTradingSection />
        <GovernmentSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
