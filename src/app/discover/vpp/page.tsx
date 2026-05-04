"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Clock,
  Calendar,
  Sun,
  Battery,
  Car,
  Smartphone,
  Share2,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  IndianRupee,
  Leaf,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function VPPArticlePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
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
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              Virtual Power Plant (VPP):{" "}
              <span className="text-blue-500">The Next Evolution</span> of Solar Energy in India
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#6F6F6F]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                8 min read
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                May 2026
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* What is VPP Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              What is a Virtual Power Plant?
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              A Virtual Power Plant (VPP) is a smart network of homes and businesses with solar
              systems, batteries, and intelligent devices that work together like a single power
              plant.
            </p>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Instead of producing electricity from one large location, a VPP connects thousands of
              small energy systems:
            </p>

            {/* VPP Components Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Sun, label: "Rooftop Solar Panels", color: "text-[#8EBE34]", bg: "bg-[#8EBE34]/10" },
                { icon: Battery, label: "Home Battery Storage", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Car, label: "Electric Vehicles", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { icon: Smartphone, label: "Smart Appliances", color: "text-purple-500", bg: "bg-purple-500/10" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className={`p-3 rounded-xl ${item.bg} mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-[#1d1d1f]">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-6">
              Using advanced software, these systems can automatically:
            </p>

            {/* Auto Features */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Share2, text: "Share electricity with the grid" },
                { icon: Battery, text: "Store excess energy" },
                { icon: TrendingDown, text: "Reduce usage during peak demand" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <item.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-[#1d1d1f] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <p className="text-lg font-medium flex items-start gap-3">
                <Lightbulb className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>In simple terms:</strong> Your home can not only use solar power—but also
                  support the grid and earn benefits from it.
                </span>
              </p>
            </div>
          </section>

          {/* Why This Matters Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Why This Concept Matters in India
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              India is seeing rapid growth in rooftop solar installations, electricity demand, and
              EV adoption. But the current electricity system has limitations.
            </p>

            {/* Problem Cards */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                The Problem
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  "Peak demand happens in the evening",
                  "Solar power is generated during the day",
                  "Grid infrastructure is expensive and underused",
                ].map((problem) => (
                  <div
                    key={problem}
                    className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-900 text-sm"
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </div>

            {/* Consequences */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-100 mb-10">
              <p className="text-red-900 font-medium mb-3">This leads to:</p>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Higher electricity costs
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Power cuts or load stress
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Dependence on polluting backup power
                </li>
              </ul>
            </div>
          </section>

          {/* How VPP Solves This */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              How a Virtual Power Plant Solves This
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              A VPP makes the grid smarter and more efficient by:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Storing excess solar energy during the day",
                "Supplying power back during peak hours",
                "Reducing strain on the grid",
                "Minimizing electricity costs",
              ].map((solution) => (
                <div
                  key={solution}
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-emerald-900 font-medium">{solution}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#8EBE34]/10 border border-[#8EBE34]/20">
              <p className="text-[#1d1d1f] font-medium text-lg">
                Instead of building new power plants, we use existing energy smarter.
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-8">
              How It Works{" "}
              <span className="text-[#6F6F6F] font-normal text-xl">(Simple Explanation)</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "You Install Solar (and optionally Battery)",
                  description: "Your home or business becomes energy-enabled.",
                  icon: Sun,
                  color: "bg-[#8EBE34]",
                },
                {
                  step: 2,
                  title: "You Join a VPP Network",
                  description: "Through your solar provider or energy platform.",
                  icon: Users,
                  color: "bg-blue-500",
                },
                {
                  step: 3,
                  title: "Smart System Takes Over",
                  description: "Software automatically stores extra energy, sends power to grid when needed, and optimizes your usage.",
                  icon: Zap,
                  color: "bg-purple-500",
                },
                {
                  step: 4,
                  title: "You Benefit",
                  description: "Lower electricity bills, incentives or credits, and better return on your solar investment.",
                  icon: IndianRupee,
                  color: "bg-emerald-500",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {item.step}
                    </div>
                    {index < 3 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                    <p className="text-[#6F6F6F]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-8">
              What This Means for You{" "}
              <span className="text-[#6F6F6F] font-normal text-xl">(Real Benefits)</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: IndianRupee,
                  title: "Lower Electricity Bills",
                  description: "Use your solar power more efficiently and reduce dependency on the grid.",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: Zap,
                  title: "Better Use of Solar Energy",
                  description: "Instead of wasting excess power, store or sell it intelligently.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Battery,
                  title: "Future-Ready Investment",
                  description: "Battery + smart systems will become the next big step after solar.",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: Leaf,
                  title: "Cleaner & Smarter Energy",
                  description: "Reduce carbon footprint while improving grid stability.",
                  color: "text-[#8EBE34]",
                  bg: "bg-[#8EBE34]/10",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`inline-flex p-3 rounded-xl ${benefit.bg} mb-4`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{benefit.title}</h3>
                  <p className="text-[#6F6F6F] text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* VPP in India Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Is VPP Available in India Today?
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              VPPs are still emerging in India, but the foundation is already being built through:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Smart meters rollout",
                "Time-based electricity tariffs",
                "Growth in battery storage",
                "Government renewable energy push",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <CheckCircle2 className="w-5 h-5 text-[#8EBE34]" />
                  <span className="text-[#1d1d1f]">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-blue-900 font-medium flex items-start gap-3">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                In the next few years, VPP-like systems will become more common in urban and
                semi-urban areas across India.
              </p>
            </div>
          </section>

          {/* Prosumer Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              The Future: From Consumer to "Prosumer"
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Traditionally, you only consumed electricity. With solar + VPP, you become a:
            </p>

            <div className="p-8 rounded-2xl bg-gradient-to-r from-[#8EBE34] to-emerald-500 text-white text-center mb-8">
              <p className="text-3xl font-bold mb-2">"Prosumer"</p>
              <p className="text-lg opacity-90">Producer + Consumer</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                "You generate your own power",
                "You store it",
                "You can even support the grid",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <span className="w-8 h-8 rounded-full bg-[#8EBE34] text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-[#1d1d1f] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Where We Fit In */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Where We Fit In
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              At <strong className="text-[#1d1d1f]">Irradiant Energies</strong>, we are not just
              installing solar systems—we are preparing our customers for the future of energy.
            </p>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
              <p className="text-[#1d1d1f] font-medium mb-4">Our approach focuses on:</p>
              <div className="space-y-3">
                {[
                  "Smart solar system design",
                  "Battery-ready solutions",
                  "Scalable technology for future VPP integration",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8EBE34]" />
                    <span className="text-[#6F6F6F]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#8EBE34]/10 border border-[#8EBE34]/20">
              <p className="text-[#1d1d1f] font-medium text-lg flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#8EBE34] flex-shrink-0 mt-1" />
                So when VPP becomes mainstream in India, you're already ready.
              </p>
            </div>
          </section>

          {/* Final Thought */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Final Thought
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Virtual Power Plants represent a major shift in how electricity works. Instead of
              relying only on large power stations, the future is:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Distributed", icon: Share2 },
                { label: "Intelligent", icon: Lightbulb },
                { label: "Customer-driven", icon: Users },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100"
                >
                  <item.icon className="w-8 h-8 text-blue-500 mb-3" />
                  <span className="text-[#1d1d1f] font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xl text-[#1d1d1f] font-medium text-center">
              And it starts with something as simple as installing solar today.
            </p>
          </section>

          {/* CTA Section */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2d2d2d] text-white text-center">
            <Building2 className="w-12 h-12 mx-auto mb-6 text-[#8EBE34]" />
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] mb-4">
              Want to Be Future-Ready?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              If you're planning to install solar or upgrade your system, we can help you design a
              solution that's ready for the next generation of energy.
            </p>
            <Link href="/#contact">
              <Button className="bg-[#8EBE34] hover:bg-[#7AA82D] text-white rounded-full px-8 py-6 text-lg">
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
