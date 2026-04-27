"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  subtitle?: string;
}

export function AertsenPortfolioHero({
  eyebrow = "Our Work",
  title = "Crafting Interiors with",
  accentWord = "Purpose",
  subtitle = "We believe every space has a story. Our mission is to tell yours through design that blends beauty, function, and soul.",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" style={{ paddingTop: 130 }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow with horizontal lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-stone-300" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546]">
              {eyebrow}
            </span>
            <span className="w-12 h-px bg-stone-300" />
          </motion.div>

          {/* Large serif H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#1A1612] leading-[1.05] tracking-tight mb-8"
          >
            {title}{" "}
            <span className="italic text-[#D46546]">{accentWord}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg sm:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default AertsenPortfolioHero;
