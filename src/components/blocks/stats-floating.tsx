"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsFloatingProps {
  stats?: Stat[];
}

// Animated counter component
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  if (isInView) {
    motionValue.set(value);
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsFloating({ stats }: StatsFloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const defaultStats: Stat[] = [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 60, suffix: "-90 Days", label: "Delivery Time" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={containerRef}
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="bg-white shadow-2xl shadow-black/10 rounded-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {displayStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`relative px-6 py-10 text-center group ${
                  index !== displayStats.length - 1 ? "lg:border-r border-stone-100" : ""
                } ${index === 1 ? "border-r-0 lg:border-r" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/0 to-terracotta-500/0 group-hover:from-terracotta-500/5 group-hover:to-transparent transition-all duration-500" />
                
                <motion.div
                  className="relative font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-terracotta-500">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </span>
                </motion.div>
                <p className="font-sans text-sm text-stone-500 tracking-wide">
                  {stat.label}
                </p>

                {/* Bottom accent line on hover */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-terracotta-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
