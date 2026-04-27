"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Easing ───────────────────────────────────────────────────────────────────

// Ease-out quart — fast start, gentle landing
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useAnimatedCounter(
  end: number,
  duration: number,
  startAnimation: boolean
) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startAnimation) return;

    // Cancel any running animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, startAnimation]);

  return count;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AnimatedCounterProps {
  /** The final number to count up to */
  end: number;
  /** Text appended after the number, e.g. "+" or "%" */
  suffix?: string;
  /** Text prepended before the number, e.g. "₹" */
  prefix?: string;
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Optional className for the root span */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Intersection Observer — start animation when element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  const count = useAnimatedCounter(end, duration, hasStarted);

  // Format with locale-aware thousands separator
  const formatted = count.toLocaleString("en-IN");

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${end}${suffix}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
