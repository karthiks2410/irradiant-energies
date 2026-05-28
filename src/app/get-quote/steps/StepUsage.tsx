"use client";

type StepProps = {
  onNext: () => void;
  onBack: () => void;
};

export function StepUsage({ onNext, onBack }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-display text-3xl text-[#1d1d1f] sm:text-4xl">
          What does your <em className="italic">electricity</em> cost you?
        </h2>
        <p className="text-[#6F6F6F]">
          Drag the slider — your recommendation updates as you go.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-[#e5e7eb] bg-white/50 p-8 text-center text-sm text-[#6F6F6F]">
        Usage slider, bill upload and live calculator preview arrive in Task 4.
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
          onClick={onNext}
          className="rounded-full bg-[#52842D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#446F26]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
