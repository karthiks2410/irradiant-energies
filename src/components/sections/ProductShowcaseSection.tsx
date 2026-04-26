"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bell, Zap, Users, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const products = [
  {
    id: "solar",
    tag: "Solar Energy",
    tagColor: "text-orange-500",
    title: "Harness the Sun",
    description:
      "Premium panels with professional installation. We handle all government subsidies and paperwork for you.",
    image: "/solar-panel.jpg",
    icon: Sun,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
    cta: { label: "Get Quote", href: "/get-started" },
    ctaSecondary: { label: "Learn More", href: "#solar-learn-more" },
    gradient: "from-black/70 via-black/40 to-transparent",
    available: true,
  },
  {
    id: "smartbox",
    tag: "Smart Box",
    tagColor: "text-blue-400",
    title: "Intelligence That Pays for Itself",
    description:
      "Our Smart Box learns your home. It knows when to store, when to use, when to sell.",
    image: "/smart-box.jpg",
    icon: Zap,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    cta: { label: "Join Waitlist", href: "#waitlist" },
    gradient: "from-black/80 via-black/50 to-black/20",
    badge: "Coming Soon",
    available: false,
  },
  {
    id: "p2p",
    tag: "P2P Trading",
    tagColor: "text-green-400",
    title: "Your Energy. Your Market.",
    description:
      "Generate more than you need? Sell it to your neighbors. Coming to Karnataka first.",
    image: "/p2p-trading.jpg",
    icon: Users,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    cta: { label: "Get Started", href: "/get-started" },
    ctaSecondary: { label: "Learn More", href: "#p2p-learn-more" },
    gradient: "from-black/70 via-black/40 to-transparent",
    available: true,
  },
];

export function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      if (!panels) return;

      const totalWidth = panels.scrollWidth - window.innerWidth;

      gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const productPanels = panels.querySelectorAll(".product-panel");
      productPanels.forEach((panel, i) => {
        const content = panel.querySelector(".panel-content");
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById("horizontal") as gsap.core.Animation,
                start: "left center",
                end: "center center",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      <div ref={containerRef} className="h-screen flex items-center overflow-hidden">
        <div
          ref={panelsRef}
          className="flex h-full"
          style={{ width: `${products.length * 100}vw` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-panel relative w-screen h-full flex-shrink-0"
            >
              <div className="absolute inset-0">
                <Image
                  src={product.image}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  alt={product.title}
                  priority={index === 0}
                />
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-r ${product.gradient}`}
              />

              <div className="panel-content absolute inset-0 flex items-center">
                <div className="max-w-xl px-8 md:px-16 text-white">
                  {product.badge && (
                    <motion.div className="mb-4">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm">
                        {product.badge}
                      </Badge>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${product.iconBg}`}>
                      <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                    </div>
                    <p
                      className={`text-sm uppercase tracking-wider ${product.tagColor}`}
                    >
                      {product.tag}
                    </p>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                    {product.title}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-300 mb-8">
                    {product.description}
                  </p>

                  <div className="flex gap-4">
                    {product.ctaSecondary && (
                      <Link
                        href={product.ctaSecondary.href}
                        className="inline-flex items-center justify-center px-8 py-3 text-lg rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                      >
                        {product.ctaSecondary.label}
                      </Link>
                    )}
                    <Link
                      href={product.cta.href}
                      className={`inline-flex items-center justify-center px-8 py-3 text-lg rounded-full transition-all duration-300 ${
                        product.available
                          ? "bg-white text-black hover:bg-gray-100"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {!product.available && <Bell className="mr-2 w-5 h-5" />}
                      {product.cta.label}
                      {product.available && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {products.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === index ? "bg-white w-8" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-sm">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-xs uppercase tracking-wider">{product.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
