"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bell, Zap, Users, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "solar",
    tag: "Solar Energy",
    tagColor: "text-[#8EBE34]",
    title: "Harness the Sun",
    description:
      "Premium panels with professional installation. We handle all government subsidies and paperwork for you.",
    image: "/solar-panel.jpg",
    icon: Sun,
    iconBg: "bg-[#8EBE34]/20",
    iconColor: "text-[#8EBE34]",
    cta: { label: "Get Quote", href: "/get-started" },
    ctaSecondary: { label: "Learn More", href: "#solar-learn-more" },
    available: true,
  },
  {
    id: "smartbox",
    tag: "Smart Box",
    tagColor: "text-blue-500",
    title: "Intelligence That Pays for Itself",
    description:
      "Our Smart Box learns your home. It knows when to store, when to use, when to sell.",
    image: "/smart-box.jpg",
    icon: Zap,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    cta: { label: "Join Waitlist", href: "#waitlist" },
    badge: "Coming Soon",
    available: false,
  },
  {
    id: "p2p",
    tag: "P2P Trading",
    tagColor: "text-emerald-500",
    title: "Your Energy. Your Market.",
    description:
      "Generate more than you need? Sell it to your neighbors. Coming to Karnataka first.",
    image: "/p2p-trading.jpg",
    icon: Users,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    cta: { label: "Get Started", href: "/get-started" },
    ctaSecondary: { label: "Learn More", href: "#p2p-learn-more" },
    available: true,
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div
        className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          isEven ? "" : "lg:direction-rtl"
        }`}
      >
        {/* Content */}
        <motion.div
          style={{ y }}
          className={`space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          {product.badge && (
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-1.5 text-sm">
              {product.badge}
            </Badge>
          )}

          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${product.iconBg}`}>
              <product.icon className={`w-6 h-6 ${product.iconColor}`} />
            </div>
            <p
              className={`text-sm uppercase tracking-wider font-medium ${product.tagColor}`}
            >
              {product.tag}
            </p>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal font-[family-name:var(--font-display)]"
            style={{
              lineHeight: 1,
              letterSpacing: "-1.5px",
              color: "#1d1d1f",
            }}
          >
            {product.title}
          </h2>

          <p className="text-lg text-[#6F6F6F] max-w-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {product.ctaSecondary && (
              <Link
                href={product.ctaSecondary.href}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base rounded-full border-2 border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300"
              >
                {product.ctaSecondary.label}
              </Link>
            )}
            <Link
              href={product.cta.href}
              className={`inline-flex items-center justify-center px-8 py-3.5 text-base rounded-full transition-all duration-300 hover:scale-[1.03] ${
                product.available
                  ? "bg-[#8EBE34] text-white hover:bg-[#7AA82D] shadow-lg shadow-[#8EBE34]/25"
                  : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25"
              }`}
            >
              {!product.available && <Bell className="mr-2 w-5 h-5" />}
              {product.cta.label}
              {product.available && <ArrowRight className="ml-2 w-5 h-5" />}
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          style={{ y: imageY }}
          className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
            <Image
              src={product.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              alt={product.title}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Decorative element */}
          <motion.div
            className={`absolute -z-10 w-full h-full rounded-3xl ${
              product.available ? "bg-[#8EBE34]/10" : "bg-blue-500/10"
            }`}
            style={{
              top: "20px",
              left: isEven ? "20px" : "-20px",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#f5f5f7]"
    >
      {/* Section Header */}
      <div className="sticky top-0 z-10 bg-[#f5f5f7]/80 backdrop-blur-md py-8 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-[#8EBE34] text-sm uppercase tracking-wider font-medium mb-2">
                Our Solutions
              </p>
              <h2
                className="text-3xl md:text-4xl font-normal font-[family-name:var(--font-display)]"
                style={{ color: "#1d1d1f" }}
              >
                Complete Solar Ecosystem
              </h2>
            </div>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-3">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-[#6F6F6F]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#6F6F6F]">
                    {product.tag}
                  </span>
                  {i < products.length - 1 && (
                    <span className="w-8 h-px bg-black/10 mx-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="relative">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center px-6"
      >
        <p className="text-[#6F6F6F] text-lg mb-6 max-w-xl mx-auto">
          Not sure which solution is right for you? Let our experts help you design the perfect system.
        </p>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center px-10 py-4 text-base rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-all duration-300 hover:scale-[1.03]"
        >
          Talk to an Expert
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
