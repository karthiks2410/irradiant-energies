import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Users, Sun, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Discover Clean Energy | Irradiant Energie",
  description:
    "Articles and guides on solar, virtual power plants, peer-to-peer energy trading, and the future of sustainable energy in India.",
  alternates: { canonical: "/discover" },
};

const articles = [
  {
    slug: "vpp",
    title: "What is a Virtual Power Plant?",
    description:
      "Learn how distributed energy resources like solar panels and batteries can work together to create a smarter, cleaner grid.",
    icon: Zap,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    tag: "Energy Innovation",
    readTime: "8 min read",
  },
  {
    slug: "p2p-trading",
    title: "Peer-to-Peer Energy Trading",
    description:
      "Discover how you can sell your excess solar energy directly to your neighbors and earn money from your rooftop solar system.",
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    tag: "Earn from Solar",
    readTime: "7 min read",
  },
  {
    slug: "solar-basics",
    title: "Solar Energy 101",
    description:
      "Everything you need to know about solar panels, installation, and maximizing your energy savings.",
    icon: Sun,
    iconColor: "text-[#52842D]",
    iconBg: "bg-[#52842D]/10",
    tag: "Coming Soon",
    readTime: "6 min read",
    comingSoon: true,
  },
];

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52842D]/10 text-[#52842D] text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-[family-name:var(--font-display)] mb-6"
              style={{ lineHeight: 1, letterSpacing: "-1.5px", color: "#1d1d1f" }}
            >
              Discover Clean Energy
            </h1>
            <p className="text-lg text-[#6F6F6F] max-w-2xl mx-auto">
              Explore articles and guides about solar energy, virtual power plants, and the future of sustainable energy.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const cardClass = `group relative bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 ${
                article.comingSoon
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-xl hover:border-gray-200 hover:-translate-y-1"
              }`;

              const inner = (
                <>
                  {article.comingSoon && (
                    <div className="absolute top-4 right-4 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}

                  <div className={`inline-flex p-3 rounded-xl ${article.iconBg} mb-6`}>
                    <article.icon className={`w-6 h-6 ${article.iconColor}`} />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#6F6F6F]">
                      {article.tag}
                    </span>
                    <span className="text-xs text-[#6F6F6F]">•</span>
                    <span className="text-xs text-[#6F6F6F]">{article.readTime}</span>
                  </div>

                  <h2 className="text-xl font-medium text-[#1d1d1f] mb-3 group-hover:text-[#52842D] transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-[#6F6F6F] text-sm leading-relaxed mb-6">
                    {article.description}
                  </p>

                  {!article.comingSoon && (
                    <div className="flex items-center text-[#52842D] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </>
              );

              if (article.comingSoon) {
                return (
                  <div
                    key={article.slug}
                    aria-disabled="true"
                    className={cardClass}
                  >
                    {inner}
                  </div>
                );
              }

              return (
                <Link
                  key={article.slug}
                  href={`/discover/${article.slug}`}
                  className={cardClass}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
