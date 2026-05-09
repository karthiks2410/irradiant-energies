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
  Brain,
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
  Globe,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function VPPArticlePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - SEO Optimized */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-[#8EBE34]/10 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Back Link */}
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-[#6F6F6F] hover:text-[#1d1d1f] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Discover
            </Link>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8EBE34]/10 text-[#8EBE34] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Future of Solar Energy India
            </div>

            {/* H1 - Primary Keyword */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              Virtual Power Plant (VPP) in India
            </h1>

            {/* Hero Description - Keywords Rich */}
            <p className="text-lg sm:text-xl text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              The future of solar energy is here. Turn your home into a{" "}
              <strong className="text-[#1d1d1f]">smart solar system</strong> that saves money,
              stores power, and supports the grid.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[#6F6F6F]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                8 min read
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                May 2026
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                India Focus
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* What is VPP Section - H2 with Keywords */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              What is a Virtual Power Plant?
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              A <strong className="text-[#1d1d1f]">Virtual Power Plant (VPP)</strong> is a smart
              network of homes and businesses with solar systems, batteries, and intelligent devices
              that work together like a single power plant.
            </p>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Instead of producing electricity from one large location, a VPP connects thousands of
              small energy systems—creating{" "}
              <strong className="text-[#1d1d1f]">distributed energy in India</strong>:
            </p>

            {/* VPP Components Grid - Icon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                {
                  icon: Sun,
                  label: "Solar Panels",
                  desc: "Generate clean energy from your rooftop",
                  color: "text-[#8EBE34]",
                  bg: "bg-[#8EBE34]/10",
                },
                {
                  icon: Battery,
                  label: "Battery Storage",
                  desc: "Store extra energy for later use",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Car,
                  label: "EV Charging",
                  desc: "Smart charging for electric vehicles",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: Brain,
                  label: "Smart Software",
                  desc: "Automatically manages your energy",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-xl ${item.bg} mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-[#1d1d1f] mb-1">{item.label}</span>
                  <span className="text-xs text-[#6F6F6F]">{item.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-6">
              Using advanced software, these{" "}
              <strong className="text-[#1d1d1f]">smart solar systems in India</strong> can
              automatically:
            </p>

            {/* Auto Features */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Share2, text: "Share electricity with the grid" },
                { icon: Battery, text: "Store excess energy for backup" },
                { icon: TrendingDown, text: "Reduce usage during peak demand" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100"
                >
                  <item.icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-[#1d1d1f] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8EBE34] to-[#7AA82D] text-white">
              <p className="text-lg font-medium flex items-start gap-3">
                <Lightbulb className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>In simple terms:</strong> Your home can not only use solar power—but also
                  support the grid and earn benefits from it. This is the future of{" "}
                  <strong>solar energy savings in India</strong>.
                </span>
              </p>
            </div>
          </section>

          {/* Why India Needs VPP Section */}
          <section className="mb-16 p-8 rounded-3xl bg-gray-50">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6 text-center">
              Why India Needs Virtual Power Plants
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              India is seeing rapid growth in{" "}
              <strong className="text-[#1d1d1f]">rooftop solar with battery</strong> installations,
              electricity demand, and EV adoption. But the current electricity system has
              limitations.
            </p>

            {/* Problem Cards */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4 flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                The Problem
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Zap, text: "High electricity demand during evenings" },
                  { icon: Sun, text: "Solar energy available mostly during daytime" },
                  { icon: IndianRupee, text: "Expensive grid infrastructure" },
                  { icon: Globe, text: "Need for cleaner sustainable energy" },
                ].map((problem) => (
                  <div
                    key={problem.text}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-amber-50 border border-amber-100"
                  >
                    <problem.icon className="w-6 h-6 text-amber-600 mb-2" />
                    <span className="text-amber-900 text-sm">{problem.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consequences */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-red-900 font-medium mb-3 text-center">This leads to:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Higher electricity costs",
                  "Power cuts or load stress",
                  "Dependence on polluting backup power",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* How VPP Solves This */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              How Virtual Power Plant Works
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              A VPP makes the <strong className="text-[#1d1d1f]">smart grid in India</strong>{" "}
              smarter and more efficient by:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Storing excess solar energy during the day",
                "Supplying power back during peak hours",
                "Reducing strain on the grid",
                "Minimizing electricity costs for you",
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
              <p className="text-[#1d1d1f] font-medium text-lg text-center">
                Instead of building new power plants, we use existing energy smarter with{" "}
                <strong>solar + battery systems in India</strong>.
              </p>
            </div>
          </section>

          {/* How It Works Steps */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-8 text-center">
              How VPP Works in Solar Systems
            </h2>

            <div className="space-y-0">
              {[
                {
                  step: 1,
                  title: "Install Solar System",
                  description:
                    "Start with rooftop solar (battery optional). Your home or business becomes energy-enabled.",
                  icon: Sun,
                  color: "bg-[#8EBE34]",
                },
                {
                  step: 2,
                  title: "Connect to VPP Network",
                  description:
                    "Join a smart energy platform through your solar provider like Irradiant Energies.",
                  icon: Users,
                  color: "bg-blue-500",
                },
                {
                  step: 3,
                  title: "Smart Optimization",
                  description:
                    "Your system automatically stores extra energy, sends power to grid when needed, and optimizes your usage.",
                  icon: Brain,
                  color: "bg-purple-500",
                },
                {
                  step: 4,
                  title: "Save & Earn",
                  description:
                    "Reduce electricity bills India-wide, get future incentives or credits, and better return on your solar investment.",
                  icon: IndianRupee,
                  color: "bg-emerald-500",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    {index < 3 && <div className="w-0.5 h-full bg-gray-200 my-2" />}
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="text-xs text-[#6F6F6F] mb-1">Step {item.step}</div>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                    <p className="text-[#6F6F6F]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 p-8 rounded-3xl bg-gradient-to-b from-[#8EBE34]/10 to-white">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-4 text-center">
              Benefits of Virtual Power Plant for Homes
            </h2>
            <p className="text-[#6F6F6F] text-center mb-8 max-w-xl mx-auto">
              Discover how <strong className="text-[#1d1d1f]">VPP solar in India</strong> can
              transform your energy experience
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: IndianRupee,
                  title: "Lower Bills",
                  description:
                    "Reduce electricity bill India-wide with smart energy usage and solar savings.",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: Battery,
                  title: "Energy Backup",
                  description:
                    "Store power and use it when needed. Never worry about power cuts again.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Zap,
                  title: "Smart Usage",
                  description:
                    "Automatically optimize energy consumption with intelligent solar battery systems.",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: Leaf,
                  title: "Eco-Friendly",
                  description:
                    "Reduce carbon footprint and support clean energy for a greener India.",
                  color: "text-[#8EBE34]",
                  bg: "bg-[#8EBE34]/10",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
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
              Is VPP Available in India?
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              <strong className="text-[#1d1d1f]">Virtual Power Plants in India</strong> are still
              emerging, but the foundation is already being built through:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Smart meters rollout across major cities",
                "Time-based electricity tariffs (ToD)",
                "Growth in home battery storage India",
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
                <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                In the next few years, VPP-like systems will become more common in urban and
                semi-urban areas across India—making the{" "}
                <strong>future of solar energy with battery storage</strong> a reality.
              </p>
            </div>
          </section>

          {/* Prosumer Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              The Future of Solar Energy in India
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Traditionally, you only consumed electricity. With solar + VPP, you become a:
            </p>

            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#8EBE34] to-emerald-500 text-white text-center mb-8">
              <p className="text-4xl font-bold mb-2">"Prosumer"</p>
              <p className="text-xl opacity-90">Producer + Consumer</p>
            </div>

            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-6 text-center">
              Virtual Power Plants will transform how electricity works in India. Homes will not
              just consume power—they will produce, store, and share it intelligently.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { num: "1", text: "Generate your own power" },
                { num: "2", text: "Store it for when you need" },
                { num: "3", text: "Support the grid & earn" },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <span className="w-8 h-8 rounded-full bg-[#8EBE34] text-white flex items-center justify-center font-bold text-sm">
                    {item.num}
                  </span>
                  <span className="text-[#1d1d1f] font-medium">{item.text}</span>
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
              installing solar systems—we are preparing our customers for the{" "}
              <strong className="text-[#1d1d1f]">solar energy future in India</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
              <p className="text-[#1d1d1f] font-medium mb-4">Our approach focuses on:</p>
              <div className="space-y-3">
                {[
                  "Smart solar system design optimized for Indian conditions",
                  "Battery-ready solutions for future upgrades",
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

          {/* CTA Section - Very Important */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2d2d2d] text-white text-center">
            <Building2 className="w-12 h-12 mx-auto mb-6 text-[#8EBE34]" />
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] mb-4">
              Ready for the Future of Energy?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Install a <strong className="text-white">smart solar system</strong> today and be
              VPP-ready. We help you design a solution that's ready for the next generation of
              energy in India.
            </p>
            <Link href="/#contact">
              <Button className="bg-[#8EBE34] hover:bg-[#7AA82D] text-white rounded-full px-10 py-6 text-lg font-medium">
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
