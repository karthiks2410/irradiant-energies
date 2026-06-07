"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO, SPRING_PRESS, PRESS_HOVER, PRESS_TAP } from "@/lib/motion";

export function AboutCTA() {
  return (
    <section className="py-20 md:py-24 bg-[#1b4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Ready to switch to solar?
            </h2>
            <p className="text-white/75 text-lg">
              Join happy customers powering their lives with the sun.
            </p>
          </div>

          <motion.div
            whileHover={PRESS_HOVER}
            whileTap={PRESS_TAP}
            transition={SPRING_PRESS}
          >
            <Link href="/get-quote">
              <Button className="bg-[#fdd404] hover:bg-[#e9c400] text-[#1d1d1f] rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-black/20">
                Schedule Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
