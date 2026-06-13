import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Car, PlugZap, Sun, Merge } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const evTypes = {
  "grid-dependent": {
    name: "Grid Dependent",
    description: "Standard EV charging powered entirely by the utility grid",
    icon: PlugZap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  "solar-grid": {
    name: "Solar + Grid",
    description: "Solar-powered EV charging with grid backup for reliability",
    icon: Sun,
    color: "text-[#52842D]",
    bg: "bg-[#52842D]/10",
  },
  "hybrid": {
    name: "Hybrid",
    description: "Complete integration of solar, battery storage, and grid power",
    icon: Merge,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: typeId } = await params;
  const evType = evTypes[typeId as keyof typeof evTypes];
  if (!evType) {
    return { title: "Not Found | Irradiant Energie", robots: { index: false, follow: false } };
  }
  return {
    title: `EV Charging: ${evType.name} — Coming Soon | Irradiant Energie`,
    description: `${evType.description}. Coming soon to Irradiant Energie.`,
    robots: { index: false, follow: false },
  };
}

export default async function EVChargingPage({ params }: PageProps) {
  const { type: typeId } = await params;
  const evType = evTypes[typeId as keyof typeof evTypes];

  if (!evType) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">
              Solution Not Found
            </h1>
            <Link href="/" className="text-[#52842D] hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const TypeIcon = evType.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-purple-50 to-white">
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

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Car className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-[#6F6F6F]">+</span>
              <div className={`p-3 rounded-xl ${evType.bg}`}>
                <TypeIcon className={`w-6 h-6 ${evType.color}`} />
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              EV Charging
              <br />
              <span className="text-purple-500">{evType.name}</span>
            </h1>

            <p className="text-lg text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              {evType.description}. Perfect for homes, offices, and commercial spaces.
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
                EV Charging Solutions Coming Soon
              </h2>
              <p className="text-[#6F6F6F] mb-8 max-w-lg mx-auto">
                We're preparing comprehensive EV charging solutions for various needs.
                Register your interest to be notified when we launch.
              </p>
              <Link href="/get-quote">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-3">
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

export function generateStaticParams() {
  return [
    { type: "grid-dependent" },
    { type: "solar-grid" },
    { type: "hybrid" },
  ];
}
