import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Battery } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Battery Energy Storage (BESS) — Coming Soon | Irradiant Energie",
  description:
    "Battery Energy Storage Systems for homes, businesses, and utility-scale applications. Coming soon.",
  robots: { index: false, follow: false },
};

export default function BESSPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-full text-left">
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 text-[#6F6F6F] hover:text-[#1d1d1f] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Solutions
              </Link>
            </div>

            <div className="inline-flex p-4 rounded-2xl bg-blue-500/10 mb-6">
              <Battery className="w-10 h-10 text-blue-500" />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              Battery Energy
              <br />
              <span className="text-blue-500">Storage System</span>
            </h1>

            <p className="text-lg text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              Store excess energy and use it when you need it most. BESS solutions
              for homes, businesses, and utility-scale applications.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Coming Soon
            </div>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="p-12 rounded-3xl bg-gray-50 text-center">
              <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#1d1d1f] mb-4">
                Energy Storage Solutions Coming Soon
              </h2>
              <p className="text-[#6F6F6F] mb-8 max-w-lg mx-auto">
                We're preparing comprehensive BESS solutions for various applications.
                Register your interest to be notified when we launch.
              </p>
              <Link href="/get-quote">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3">
                  Register Interest
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
