"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Sun,
  Handshake,
  Smartphone,
  IndianRupee,
  Users,
  CheckCircle2,
  Lightbulb,
  Leaf,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Home,
  FileCheck,
  CreditCard,
  BarChart3,
  Eye,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function P2PTradingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
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
              <Users className="w-4 h-4" />
              Earn from Solar India
            </div>

            {/* H1 - Primary Keyword */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              Peer-to-Peer Energy Trading in India
            </h1>

            {/* Hero Description */}
            <p className="text-lg sm:text-xl text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              Turn your solar system into an{" "}
              <strong className="text-[#1d1d1f]">income-generating asset</strong>. Buy and sell
              electricity directly with others using smart digital platforms.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[#6F6F6F]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                7 min read
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
          {/* What is P2P Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              What is Peer-to-Peer Energy Trading?
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-6">
              <strong className="text-[#1d1d1f]">Peer-to-Peer (P2P) energy trading</strong> is a
              government-supported program that allows electricity consumers and rooftop solar
              producers to buy and sell electricity directly through a secure digital platform.
            </p>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Instead of sending your excess solar power back to the grid at lower net-metering
              rates, you can{" "}
              <strong className="text-[#1d1d1f]">sell solar electricity in India</strong> directly
              to other consumers at better prices—and buyers get access to clean, affordable energy.
            </p>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                {
                  icon: Sun,
                  label: "Solar Producers",
                  desc: "Generate extra electricity",
                  color: "text-[#8EBE34]",
                  bg: "bg-[#8EBE34]/10",
                },
                {
                  icon: Handshake,
                  label: "Direct Trading",
                  desc: "Sell power to nearby users",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: Smartphone,
                  label: "Digital Platform",
                  desc: "Automated matching & pricing",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: IndianRupee,
                  label: "Earn & Save",
                  desc: "Better value for electricity",
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
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

            {/* Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8EBE34] to-[#7AA82D] text-white">
              <p className="text-lg font-medium flex items-start gap-3">
                <Lightbulb className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>In simple terms:</strong> Using secure digital platforms (often
                  blockchain-based), buyers and sellers are matched automatically, ensuring
                  transparent pricing and billing. This is the future of{" "}
                  <strong>rooftop solar income in India</strong>.
                </span>
              </p>
            </div>
          </section>

          {/* Why India Needs P2P */}
          <section className="mb-16 p-8 rounded-3xl bg-gray-50">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6 text-center">
              Why P2P Energy Trading is Important for India
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8 text-center max-w-2xl mx-auto">
              India's energy landscape is rapidly evolving, making{" "}
              <strong className="text-[#1d1d1f]">P2P energy trading</strong> more relevant than
              ever.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Sun, text: "Rapid growth of rooftop solar systems" },
                { icon: IndianRupee, text: "Low returns from traditional net metering" },
                { icon: Zap, text: "Increasing electricity costs across states" },
                { icon: Leaf, text: "Strong government push for renewable energy" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100"
                >
                  <div className="p-2 rounded-lg bg-[#8EBE34]/10">
                    <item.icon className="w-5 h-5 text-[#8EBE34]" />
                  </div>
                  <span className="text-[#1d1d1f] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-8 text-center">
              How P2P Energy Trading Works
            </h2>

            <div className="space-y-0">
              {[
                {
                  step: 1,
                  title: "Register on Platform",
                  description:
                    "Sign up as a consumer or solar producer (prosumer) on an authorized trading platform like PowerXchange, Pulse Energy, or Kazam Buzz.",
                  icon: FileCheck,
                  color: "bg-emerald-500",
                },
                {
                  step: 2,
                  title: "DISCOM Verification",
                  description:
                    "Your smart meter and connection details are verified by your DISCOM (BSES, Tata Power, etc.). You receive Verified Credentials (VC) for secure trading.",
                  icon: Shield,
                  color: "bg-blue-500",
                },
                {
                  step: 3,
                  title: "Start Trading",
                  description:
                    "Consumers can buy electricity at competitive rates. Prosumers can sell excess solar power directly to other users at better-than-net-metering prices.",
                  icon: Handshake,
                  color: "bg-purple-500",
                },
                {
                  step: 4,
                  title: "Billing & Settlement",
                  description:
                    "All transactions are automatically integrated into your monthly electricity bill. Earnings are credited, purchases are debited—simple and transparent.",
                  icon: CreditCard,
                  color: "bg-amber-500",
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

          {/* Who Can Participate */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-8 text-center">
              Who Can Participate?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Consumers Card */}
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Home className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">Consumers (Buyers)</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Have a Smart Meter installed",
                    "Use electricity at home or business",
                    "Want lower electricity costs",
                    "Seek access to clean solar energy",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prosumers Card */}
              <div className="p-6 rounded-2xl bg-[#8EBE34]/10 border border-[#8EBE34]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#8EBE34]/20">
                    <Sun className="w-6 h-6 text-[#8EBE34]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">Prosumers (Sellers)</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Own a rooftop solar system",
                    "Have Net Meter or Smart Meter",
                    "Generate surplus electricity",
                    "Want to earn from excess power",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[#1d1d1f]">
                      <CheckCircle2 className="w-4 h-4 text-[#8EBE34] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 p-8 rounded-3xl bg-gradient-to-b from-[#8EBE34]/10 to-white">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-4 text-center">
              Benefits of P2P Energy Trading
            </h2>
            <p className="text-[#6F6F6F] text-center mb-8 max-w-xl mx-auto">
              Discover how <strong className="text-[#1d1d1f]">selling solar electricity in India</strong>{" "}
              can benefit both buyers and sellers
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: IndianRupee,
                  title: "Earn from Solar",
                  description:
                    "Sell excess electricity at rates better than net-metering. Turn your solar system into a revenue stream.",
                  color: "text-[#8EBE34]",
                  bg: "bg-[#8EBE34]/10",
                },
                {
                  icon: TrendingUp,
                  title: "Lower Bills",
                  description:
                    "Buy solar power at competitive prices directly from local producers. Reduce your electricity costs.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: Eye,
                  title: "Full Transparency",
                  description:
                    "Track all transactions digitally. See exactly how much you're earning or saving in real-time.",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: Leaf,
                  title: "Support Clean Energy",
                  description:
                    "Every P2P transaction supports the renewable energy ecosystem and reduces carbon footprint.",
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

          {/* P2P vs Net Metering */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Net Metering vs P2P Trading
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Understanding the difference helps you maximize your{" "}
              <strong className="text-[#1d1d1f]">rooftop solar income in India</strong>:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-semibold text-[#1d1d1f] border border-gray-200">
                      Feature
                    </th>
                    <th className="p-4 text-left font-semibold text-[#1d1d1f] border border-gray-200">
                      Net Metering
                    </th>
                    <th className="p-4 text-left font-semibold text-[#8EBE34] border border-gray-200">
                      P2P Trading
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sell To", "DISCOM (utility)", "Direct to consumers"],
                    ["Pricing", "Fixed low rates", "Market-based better rates"],
                    ["Control", "No choice", "You decide when to sell"],
                    ["Earnings", "Bill adjustment only", "Real income potential"],
                    ["Flexibility", "Limited", "High flexibility"],
                  ].map(([feature, net, p2p]) => (
                    <tr key={feature} className="hover:bg-gray-50">
                      <td className="p-4 border border-gray-200 font-medium text-[#1d1d1f]">
                        {feature}
                      </td>
                      <td className="p-4 border border-gray-200 text-[#6F6F6F]">{net}</td>
                      <td className="p-4 border border-gray-200 text-[#8EBE34] font-medium">
                        {p2p}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Available Platforms */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6">
              Authorized P2P Trading Platforms in India
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
              Several DISCOMs have launched P2P trading pilots. Here are some authorized platforms
              supported by India Energy Stack (IES):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {[
                "PowerXchange",
                "Pulse Energy",
                "Kazam Buzz",
                "VoltBrew",
                "SolarSquare",
                "EnergyBazaar",
                "GreenSwitch",
                "Electro Mate",
              ].map((platform) => (
                <div
                  key={platform}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center"
                >
                  <span className="text-[#1d1d1f] font-medium text-sm">{platform}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-blue-900 font-medium flex items-start gap-3">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Currently available in:</strong> Delhi (BSES, Tata Power-DDL), with more
                  states like Karnataka, Maharashtra, and Gujarat expected to launch soon.
                </span>
              </p>
            </div>
          </section>

          {/* Future Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-6 text-center">
              The Future of Solar Income in India
            </h2>
            <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              <strong className="text-[#1d1d1f]">Peer-to-Peer energy trading</strong> is the next
              big step after solar adoption. It transforms your solar system from a cost-saving tool
              into a revenue-generating asset.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Decentralized", icon: Users, desc: "Power to the people" },
                { label: "Market-Driven", icon: BarChart3, desc: "Fair pricing for all" },
                { label: "Sustainable", icon: Leaf, desc: "Clean energy economy" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#8EBE34]/10 to-white border border-[#8EBE34]/20"
                >
                  <item.icon className="w-8 h-8 text-[#8EBE34] mb-3" />
                  <span className="text-[#1d1d1f] font-semibold mb-1">{item.label}</span>
                  <span className="text-xs text-[#6F6F6F]">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Related Article Link */}
          <section className="mb-16 p-6 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-blue-900 font-medium flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>
                Also read:{" "}
                <Link
                  href="/discover/vpp"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  Virtual Power Plant (VPP) in India
                </Link>{" "}
                — Learn how VPPs complement P2P trading for maximum solar benefits.
              </span>
            </p>
          </section>

          {/* CTA Section */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2d2d2d] text-white text-center">
            <IndianRupee className="w-12 h-12 mx-auto mb-6 text-[#8EBE34]" />
            <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] mb-4">
              Start Earning from Your Solar Power
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Install a <strong className="text-white">smart solar system</strong> with us and get
              ready for P2P energy trading. We design systems that maximize your earning potential.
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
