"use client";

import { useEffect, useState } from "react";

export function SubsidyCountdown() {
  const targetDate = new Date("2027-03-31T23:59:59");

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col items-center justify-center gap-6 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Government Solar Subsidy
              </p>

              <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                Subsidy Ends on March 31, 2027
              </h3>

              <p className="mt-2 text-muted-foreground">
                Secure your solar installation before the subsidy window closes.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[90px] rounded-xl border border-border bg-card px-4 py-4 text-center shadow-sm">
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
