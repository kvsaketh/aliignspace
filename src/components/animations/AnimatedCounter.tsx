"use client";

import { useCountUp } from "@/lib/animations/useCountUp";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const { ref, formattedCount } = useCountUp({
    end,
    duration,
    suffix,
    prefix,
  });

  return (
    <span ref={ref} className={className}>
      {formattedCount}
    </span>
  );
}
