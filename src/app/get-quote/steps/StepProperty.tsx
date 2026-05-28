"use client";

type StepProps = {
  onNext: () => void;
};

export function StepProperty({ onNext }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-display text-3xl text-[#1d1d1f] sm:text-4xl">
          Tell us about your <em className="italic">space</em>.
        </h2>
        <p className="text-[#6F6F6F]">
          We&apos;ll use this to size your system correctly and apply the right subsidies.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-[#e5e7eb] bg-white/50 p-8 text-center text-sm text-[#6F6F6F]">
        Property type cards + pincode input arrive in Task 3.
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-[#52842D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#446F26]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
