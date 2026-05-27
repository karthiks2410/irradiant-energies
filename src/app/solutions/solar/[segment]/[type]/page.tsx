import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  getSegmentById,
  getSolutionTypeById,
  type SolutionTypeId,
} from "@/lib/solutions-data";

interface PageProps {
  params: Promise<{
    segment: string;
    type: SolutionTypeId;
  }>;
}

export default async function SolarSolutionPage({ params }: PageProps) {
  const { segment: segmentId, type: typeId } = await params;

  const segment = getSegmentById(segmentId);
  const solutionType = getSolutionTypeById(typeId);

  if (!segment || !solutionType) {
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

  const TypeIcon = solutionType.icon;
  const SegmentIcon = segment.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-[#52842D]/10 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 text-[#6F6F6F] hover:text-[#1d1d1f] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Solutions
            </Link>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#52842D]/10">
                <SegmentIcon className="w-6 h-6 text-[#52842D]" />
              </div>
              <span className="text-[#6F6F6F]">+</span>
              <div className="p-3 rounded-xl bg-[#52842D]/10">
                <TypeIcon className="w-6 h-6 text-[#52842D]" />
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1.15, letterSpacing: "-1px", color: "#1d1d1f" }}
            >
              {segment.name} Solar
              <br />
              <span className="text-[#52842D]">{solutionType.name} System</span>
            </h1>

            <p className="text-lg text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              {segment.description} with {solutionType.name.toLowerCase()} configuration.
              {solutionType.description}.
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
                We're Building Something Amazing
              </h2>
              <p className="text-[#6F6F6F] mb-8 max-w-lg mx-auto">
                Our team is working on comprehensive information about {segment.name.toLowerCase()} {solutionType.name.toLowerCase()} solar solutions.
                In the meantime, get in touch for a personalized consultation.
              </p>
              <Link href="/#contact">
                <Button className="bg-[#52842D] hover:bg-[#446F26] text-white rounded-full px-8 py-3">
                  Request Consultation
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
  const segments = ["home", "housing-society", "roof-rental", "utility-scale", "industrial"];
  const types = ["on-grid", "off-grid", "hybrid"];

  const params = [];
  for (const segment of segments) {
    for (const type of types) {
      params.push({ segment, type });
    }
  }
  return params;
}
