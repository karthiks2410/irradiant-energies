"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { COMPANY } from "@/lib/constants";
import { ParallaxWrapper } from "@/components/animations";

const benefits = [
  "Free site assessment",
  "Custom system design",
  "Subsidy assistance",
  "Professional installation",
  "24/7 monitoring",
  "5-year service warranty",
];

export function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show an alert. Later this will go to Supabase.
    alert("Thank you! We will contact you soon.");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden"
    >
      {/* Light background - Apple style */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[#f5f5f7]"
      />

      {/* Subtle animated background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 bottom-1/4 w-1/2 h-1/2 bg-emerald-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <ParallaxWrapper offset={30}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-6 tracking-tight">
                Ready to Go Solar?
              </h2>
              <p className="text-lg text-[#6e6e73] mb-8">
                Get a free consultation and customized quote for your home or business.
                Our experts will design the perfect system for your needs.
              </p>

              {/* Benefits with staggered animation */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.08,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-[#6e6e73] text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <a
                  href={`tel:${COMPANY.whatsapp}`}
                  className="flex items-center gap-3 text-[#6e6e73] hover:text-orange-500 transition-colors group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-orange-500" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-[#86868b]">Call us</div>
                    <div className="font-medium text-[#1d1d1f]">{COMPANY.phone}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-[#6e6e73] hover:text-orange-500 transition-colors group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-orange-500" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-[#86868b]">Email us</div>
                    <div className="font-medium text-[#1d1d1f]">{COMPANY.email}</div>
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </ParallaxWrapper>

          {/* Right Side - Form */}
          <ParallaxWrapper offset={-20}>
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-black/5 border border-black/5">
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-6">
                  Get Your Free Quote
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-[#1d1d1f]">Name</Label>
                      <Input id="name" placeholder="Your name" className="border-black/10 focus:border-orange-500" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="phone" className="text-[#1d1d1f]">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+91" className="border-black/10 focus:border-orange-500" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-[#1d1d1f]">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="border-black/10 focus:border-orange-500" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="location" className="text-[#1d1d1f]">Location</Label>
                    <Input id="location" placeholder="City, State" className="border-black/10 focus:border-orange-500" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-[#1d1d1f]">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      rows={3}
                      className="border-black/10 focus:border-orange-500"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl shadow-lg shadow-orange-500/25"
                      >
                        Get Free Quote
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                  <p className="text-xs text-[#86868b] text-center">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            </motion.div>
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
}
