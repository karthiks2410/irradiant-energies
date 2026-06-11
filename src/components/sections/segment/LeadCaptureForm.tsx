"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";
import { homeLeadForm } from "@/lib/home-segment-content";
import type { LeadFormContent } from "@/lib/segment-content-types";

/**
 * Lightweight consultation form. Forwards to the existing /get-quote wizard
 * with prefill query params — single source of truth for validation, email,
 * and quote calculation. No new API endpoint.
 *
 * The shape is content-driven: each segment passes its own copy + bill
 * ranges + an optional organisation field (society name, company name).
 * Fall-back is the Home segment.
 */
export function LeadCaptureForm({
  segment = "home",
  content = homeLeadForm,
}: {
  segment?: string;
  content?: LeadFormContent;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [pincode, setPincode] = useState("");
  const [bill, setBill] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    const cleanPhone = whatsapp.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a 10-digit WhatsApp number.");
      return;
    }
    if (pincode && !/^\d{6}$/.test(pincode)) {
      setError("Pincode should be 6 digits.");
      return;
    }
    if (!bill) {
      setError("Please pick a bill range.");
      return;
    }
    if (content.organisationField && organisation.trim().length < 2) {
      setError(`Please enter your ${content.organisationField.label.toLowerCase()}.`);
      return;
    }

    setSubmitting(true);
    const params = new URLSearchParams({
      name: name.trim(),
      phone: cleanPhone,
      segment,
      ...(pincode ? { pincode } : {}),
      bill,
      ...(content.organisationField && organisation.trim()
        ? { [content.organisationField.paramName]: organisation.trim() }
        : {}),
    });
    router.push(`/get-quote?${params.toString()}`);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-[#f5f5f7]/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="lg:col-span-2 lg:pt-4"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#52842D] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4 leading-tight">
            {content.heading}
          </h2>
          <p className="text-base text-[#6F6F6F] leading-relaxed mb-5 max-w-md">
            {content.subheading}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200">
            <MessageCircle className="w-3.5 h-3.5 text-[#52842D]" />
            <span className="text-xs font-medium text-[#1d1d1f]">{content.pill}</span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-xs font-medium text-[#1d1d1f] mb-1.5">
                Full name
              </label>
              <input
                id="lead-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-white text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:border-[#52842D]/50 focus:ring-2 focus:ring-[#52842D]/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-whatsapp" className="block text-xs font-medium text-[#1d1d1f] mb-1.5">
                WhatsApp number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm text-[#6F6F6F] pointer-events-none">+91</span>
                <input
                  id="lead-whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  className="w-full h-11 pl-12 pr-3.5 rounded-lg border border-gray-200 bg-white text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:border-[#52842D]/50 focus:ring-2 focus:ring-[#52842D]/20 transition-colors"
                />
              </div>
            </div>

            {content.organisationField && (
              <div className="sm:col-span-2">
                <label htmlFor="lead-organisation" className="block text-xs font-medium text-[#1d1d1f] mb-1.5">
                  {content.organisationField.label}
                </label>
                <input
                  id="lead-organisation"
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  placeholder={content.organisationField.placeholder}
                  className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-white text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:border-[#52842D]/50 focus:ring-2 focus:ring-[#52842D]/20 transition-colors"
                />
              </div>
            )}

            <div>
              <label htmlFor="lead-pincode" className="block text-xs font-medium text-[#1d1d1f] mb-1.5">
                Pincode
              </label>
              <input
                id="lead-pincode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 560100"
                maxLength={6}
                className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-white text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:border-[#52842D]/50 focus:ring-2 focus:ring-[#52842D]/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-bill" className="block text-xs font-medium text-[#1d1d1f] mb-1.5">
                {content.billLabel}
              </label>
              <select
                id="lead-bill"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm text-[#1d1d1f] focus:outline-none focus:border-[#52842D]/50 focus:ring-2 focus:ring-[#52842D]/20 transition-colors"
              >
                <option value="">Pick a range…</option>
                {content.billRanges.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-xs font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <p className="text-[11px] text-[#6F6F6F] leading-relaxed">
            By submitting, you agree to be contacted by our team via WhatsApp or phone.
            We don&apos;t spam, sell your data, or share with third parties.
          </p>

          <motion.div whileHover={PRESS_HOVER} whileTap={PRESS_TAP} transition={SPRING_PRESS}>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#52842D] hover:bg-[#446F26] text-white rounded-full h-12 text-sm font-medium"
            >
              {submitting ? "Just a sec…" : content.submitLabel}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
