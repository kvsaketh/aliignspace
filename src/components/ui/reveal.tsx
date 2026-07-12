"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RevealProps {
  children: React.ReactNode;
  /** Animation direction — how the element enters the viewport */
  direction?: "up" | "left" | "right" | "fade";
  /** Delay before animation starts, in ms (default: 0) */
  delay?: number;
  /** Additional className applied to the wrapper div */
  className?: string;
  /** Intersection threshold (default: 0.15) */
  threshold?: number;
  /** Custom duration class override — e.g. "duration-1000" */
  durationClass?: string;
}

// ─── Initial transform map ────────────────────────────────────────────────────

const HIDDEN_TRANSFORM: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-10 opacity-0",
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  fade: "opacity-0",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  threshold = 0.15,
  durationClass = "duration-700",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        // Base transition
        "transition-all ease-out will-change-transform",
        durationClass,
        // Hidden state (before visible)
        !isVisible && HIDDEN_TRANSFORM[direction],
        // Visible state
        isVisible && "translate-y-0 translate-x-0 opacity-100",
        className
      )}
      style={delay > 0 ? { transitionDelay: isVisible ? `${delay}ms` : "0ms" } : undefined}
    >
      {children}
    </div>
  );
}

// ─── Stagger helper ───────────────────────────────────────────────────────────
// Convenience wrapper to stagger a list of children with auto-incrementing delays.

export interface RevealGroupProps {
  children: React.ReactNode[];
  direction?: RevealProps["direction"];
  stagger?: number;
  className?: string;
  itemClassName?: string;
}

export function RevealGroup({
  children,
  direction = "up",
  stagger = 100,
  className,
  itemClassName,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal
          key={i}
          direction={direction}
          delay={i * stagger}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
