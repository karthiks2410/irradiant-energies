"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Zap, Clock, Calendar } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function VPPArticlePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-20">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-[#6F6F6F] hover:text-[#1d1d1f] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Energy Innovation
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
            style={{ lineHeight: 1.1, letterSpacing: "-1.5px", color: "#1d1d1f" }}
          >
            What is a Virtual Power Plant (VPP)?
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-[#6F6F6F] mb-10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              May 2026
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-emerald-500/20 mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-24 h-24 text-blue-500/30" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-6 prose prose-lg prose-gray">
          <p className="lead text-xl text-[#6F6F6F] leading-relaxed">
            A Virtual Power Plant (VPP) is a cloud-based network that aggregates distributed energy resources—like your rooftop solar panels and home batteries—into a coordinated system that operates like a single power plant.
          </p>

          <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#1d1d1f] mt-12 mb-4">
            How Does a VPP Work?
          </h2>
          <p className="text-[#6F6F6F] leading-relaxed">
            Think of it as a symphony of diverse instruments, each playing its part, but all under the guidance of a single conductor. Advanced software harmonizes individual energy resources—solar panels, batteries, EV chargers—allowing them to operate independently while remaining interconnected.
          </p>
          <p className="text-[#6F6F6F] leading-relaxed">
            This enables real-time power dispatch where electricity is needed most, reducing grid strain and maximizing the value of your clean energy investment.
          </p>

          <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#1d1d1f] mt-12 mb-4">
            Benefits for Homeowners
          </h2>
          <ul className="text-[#6F6F6F] space-y-3">
            <li><strong className="text-[#1d1d1f]">Earn from your energy:</strong> Sell excess energy back to the grid during peak demand periods</li>
            <li><strong className="text-[#1d1d1f]">Energy independence:</strong> Reduce reliance on grid electricity, especially during peak pricing</li>
            <li><strong className="text-[#1d1d1f]">Blackout protection:</strong> Battery storage provides backup during outages</li>
            <li><strong className="text-[#1d1d1f]">Enrollment incentives:</strong> Most VPP programs offer rewards for joining</li>
          </ul>

          <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#1d1d1f] mt-12 mb-4">
            Benefits for the Grid
          </h2>
          <ul className="text-[#6F6F6F] space-y-3">
            <li><strong className="text-[#1d1d1f]">Demand management:</strong> Prevents overloads during peak usage times</li>
            <li><strong className="text-[#1d1d1f]">Renewable integration:</strong> Smoothly incorporates intermittent solar and wind power</li>
            <li><strong className="text-[#1d1d1f]">Reduced emissions:</strong> Decreases dependence on polluting peaker plants</li>
            <li><strong className="text-[#1d1d1f]">Real-time flexibility:</strong> Instantly responds to fluctuating energy demands</li>
          </ul>

          <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#1d1d1f] mt-12 mb-4">
            Why VPP Matters for India
          </h2>
          <p className="text-[#6F6F6F] leading-relaxed">
            India's growing energy demand and commitment to renewable energy make VPPs particularly valuable. As more homes and businesses install solar panels, VPPs can help balance the grid while providing financial benefits to participants.
          </p>
          <p className="text-[#6F6F6F] leading-relaxed">
            Battery storage is crucial for solar systems since panels generate power during the day but demand peaks in evenings. VPPs unlock significant ROI improvements for solar customers through energy storage self-consumption.
          </p>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl">
            <h3 className="text-xl font-medium text-[#1d1d1f] mb-3">
              Be Part of India's Energy Future
            </h3>
            <p className="text-[#6F6F6F] mb-6">
              Join our waitlist to be among the first to participate in Irradiant Energies' Virtual Power Plant program when it launches.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3">
              Join the Waitlist
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
