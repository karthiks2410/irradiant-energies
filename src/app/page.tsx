import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { GovernmentSection } from "@/components/sections/GovernmentSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductShowcaseSection />
        <GovernmentSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
