"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-white">
      {/* Image Background */}
      <div
        className="absolute z-0"
        style={{
          top: "200px",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          src="/solar-panel.jpg"
          alt="Solar panels on rooftop"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.9 }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white/90" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          paddingTop: "calc(6rem + 20px)",
          paddingBottom: "6rem",
          minHeight: "85vh",
        }}
      >
        {/* Headline */}
        <h1
          className="animate-fade-rise max-w-7xl font-normal font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "-2.46px",
            color: "#000000",
          }}
        >
          Power Your Future{" "}
          <em style={{ color: "#52842D", fontStyle: "italic" }}>
            With Solar Energy
          </em>
        </h1>

        {/* Description */}
        <p
          className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ color: "#6F6F6F" }}
        >
          India's complete solar ecosystem — from rooftop to revenue. Premium
          panels, smart energy management, and peer-to-peer trading.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-rise-delay-2 mt-12">
          <Button
            size="lg"
            className="rounded-full px-14 py-6 text-base bg-[#52842D] hover:bg-[#446F26] text-white transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#52842D]/25"
          >
            Get Free Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
