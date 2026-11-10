"use client";

import { MotionConfig } from "framer-motion";

// Turns off transform animations (ScrollReveal slide-ins) for users who ask for reduced motion.
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
