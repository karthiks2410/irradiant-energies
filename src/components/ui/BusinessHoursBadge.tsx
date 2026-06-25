import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One-line muted business-hours / response-time indicator that pairs
 * underneath WhatsApp CTAs. Sets the right expectation for buyers tapping
 * the chat button outside business hours.
 *
 * Visually subtle — `text-[#6F6F6F] text-xs` — never competes with the
 * adjacent primary CTAs.
 */
export interface BusinessHoursBadgeProps {
  /** Optional override / extension classes (e.g. center alignment). */
  className?: string;
}

export function BusinessHoursBadge({ className }: BusinessHoursBadgeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-[#6F6F6F] leading-none",
        className,
      )}
    >
      <Clock className="w-3.5 h-3.5" aria-hidden />
      <span>
        Replies in &lt;10 min <span className="text-[#1d1d1f]/30">·</span> 9 AM–9 PM IST
      </span>
    </p>
  );
}
