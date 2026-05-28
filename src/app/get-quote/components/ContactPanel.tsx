"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react";
import { EASE_OUT_EXPO, PRESS_HOVER, PRESS_TAP, SPRING_PRESS } from "@/lib/motion";
import { quoteContactSchema } from "@/lib/quote-schema";
import type { QuoteInputs } from "@/lib/solar-calc";

type ContactPanelProps = {
  inputs: QuoteInputs;
  /** Whether the calculator currently has a valid recommendation. Disables submit if not. */
  ready: boolean;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "success";
      whatsappLink: string;
      resultUrl: string;
      emailDelivered: boolean;
    }
  | { status: "error"; message: string };

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export function ContactPanel({ inputs, ready }: ContactPanelProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;

    const parsed = quoteContactSchema.safeParse({
      name,
      phone,
      email,
      whatsappOptIn,
      consent,
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setState({ status: "submitting" });

    try {
      const resp = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, contact: parsed.data }),
      });
      const data = (await resp.json()) as
        | {
            ok: true;
            emailDelivered: boolean;
            whatsappLink: string;
            resultUrl: string;
          }
        | { ok: false; error: string };

      if (!resp.ok || !("ok" in data) || !data.ok) {
        const message =
          "error" in data && data.error
            ? data.error
            : "Something went wrong. Please try again.";
        setState({ status: "error", message });
        return;
      }

      setState({
        status: "success",
        whatsappLink: data.whatsappLink,
        resultUrl: data.resultUrl,
        emailDelivered: data.emailDelivered,
      });
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the server. Please try again.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="rounded-3xl border border-[#52842D]/20 bg-[#52842D]/5 p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 text-[#446F26]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#52842D] text-white">
            <Check className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium">
            {state.emailDelivered
              ? "Sent! Check your inbox for the full report."
              : "Got it — we'll be in touch shortly."}
          </p>
        </div>
        <h3 className="mt-4 font-display text-2xl text-[#1d1d1f]">
          Want a faster reply?
        </h3>
        <p className="mt-2 text-sm text-[#6F6F6F]">
          Continue this conversation directly on WhatsApp — your numbers are pre-filled.
        </p>
        <motion.a
          href={state.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={PRESS_HOVER}
          whileTap={PRESS_TAP}
          transition={SPRING_PRESS}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#25D366]/30"
        >
          <MessageCircle className="h-4 w-4" />
          Continue on WhatsApp
        </motion.a>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-8"
    >
      <div className="mb-5">
        <h3 className="font-display text-2xl text-[#1d1d1f]">
          Send this report to your inbox
        </h3>
        <p className="mt-1 text-sm text-[#6F6F6F]">
          We'll email the breakdown and connect you on WhatsApp for the next steps.
          No spam, no calls without permission.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          value={name}
          onChange={setName}
          error={errors.name}
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          id="phone"
          label="Phone"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98XXX XXXXX"
        />
      </div>
      <div className="mt-4">
        <Field
          id="email"
          label="Email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-5 space-y-2.5">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[#1d1d1f]">
          <input
            type="checkbox"
            checked={whatsappOptIn}
            onChange={(e) => setWhatsappOptIn(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#52842D]"
          />
          <span>
            It's okay to message me on WhatsApp about my quote.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[#1d1d1f]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#52842D]"
          />
          <span>
            I agree to be contacted about this quote.{" "}
            {errors.consent && (
              <span className="text-[#b42318]">{errors.consent}</span>
            )}
          </span>
        </label>
      </div>

      <AnimatePresence>
        {state.status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-xs text-[#b42318]"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={!ready || state.status === "submitting"}
        whileHover={state.status === "idle" && ready ? PRESS_HOVER : undefined}
        whileTap={state.status === "idle" && ready ? PRESS_TAP : undefined}
        transition={SPRING_PRESS}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#52842D] px-6 py-3.5 text-sm font-medium text-white shadow-sm shadow-[#52842D]/25 transition-colors hover:bg-[#446F26] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {state.status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Email me the report
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-[#1d1d1f]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors focus:ring-2 focus:ring-[#52842D]/20 ${
          error
            ? "border-[#fca5a5] focus:border-[#ef4444]"
            : "border-[#e5e7eb] focus:border-[#52842D]"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-[#b42318]">{error}</p>
      )}
    </div>
  );
}
