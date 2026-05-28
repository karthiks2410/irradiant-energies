"use client";

type StepProps = {
  onBack: () => void;
};

export function StepContact({ onBack }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-display text-3xl text-[#1d1d1f] sm:text-4xl">
          Where should we <em className="italic">send it</em>?
        </h2>
        <p className="text-[#6F6F6F]">
          We&apos;ll email your full recommendation and continue the chat on WhatsApp.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-[#e5e7eb] bg-white/50 p-8 text-center text-sm text-[#6F6F6F]">
        Contact fields, WhatsApp opt-in, and submit arrive in Task 5.
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-6 py-2.5 text-sm font-medium text-[#6F6F6F] transition-colors hover:text-[#1d1d1f]"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled
          className="rounded-full bg-[#52842D]/40 px-6 py-2.5 text-sm font-medium text-white"
        >
          Get my quote
        </button>
      </div>
    </div>
  );
}
