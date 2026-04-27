"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? value : 0}{suffix}
    </span>
  );
}

export function StatsSection({
  title = "Our Impact",
  subtitle = "Numbers that reflect our commitment to excellence",
  stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 2, suffix: "", label: "Cities Served" },
  ],
}: StatsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section ref={containerRef} className="py-24 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            {title}
          </motion.h2>
          <motion.p
            className="font-sans text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-sm shadow-soft"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="font-serif text-4xl sm:text-5xl font-medium text-terracotta-500 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-sans text-sm text-stone-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
