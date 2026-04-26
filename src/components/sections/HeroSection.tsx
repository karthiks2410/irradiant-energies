"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, ScrollTrigger} from "@/lib/gsap";
import { MaskReveal } from "@/components/animations/TextReveal";

const stats = [
  { value: "50MW+", label: "Capacity Installed" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "25%", label: "Energy Savings" },
  { value: "15+", label: "Cities Covered" },
];

const SunRays = () => {
  const rays = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
      {rays.map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-orange-500/30 to-transparent"
          style={{
            height: "50%",
            transformOrigin: "bottom center",
            rotate: `${i * 30}deg`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const raysRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const raysScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1.5,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex items-start justify-center overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f5f5f7]"
        />

        <motion.div
          style={{ rotate: raysRotate, opacity: contentOpacity, scale: raysScale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SunRays />
        </motion.div>

        <motion.div
          ref={contentRef}
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8"
            >
              <Sun className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 text-sm font-medium">
                India's Leading Solar Energy Provider
              </span>
            </motion.div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1d1d1f] mb-6 leading-tight tracking-tight overflow-hidden"
            >
              <span className="block overflow-hidden">
                <span className="word inline-block">Power</span>{" "}
                <span className="word inline-block">Your</span>{" "}
                <span className="word inline-block">Future</span>
              </span>
              <span className="block overflow-hidden">
                <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  With
                </span>{" "}
                <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Solar
                </span>{" "}
                <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Energy
                </span>
              </span>
            </h1>

            <MaskReveal delay={2}>
              <p className="text-lg sm:text-xl text-[#6e6e73] max-w-2xl mx-auto mb-10">
                Join thousands of Indian homes and businesses saving money while
                building a sustainable future. Premium solar panels, smart energy
                management, and peer-to-peer energy trading.
              </p>
            </MaskReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Video
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6e6e73]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#1d1d1f]/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-[#1d1d1f]/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
