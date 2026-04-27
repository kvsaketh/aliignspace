"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
  description?: string;
}

interface StatsV2Props {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "50", suffix: "+", label: "Projects", description: "Successfully Delivered" },
  { value: "5", suffix: "+", label: "Years", description: "Of Excellence" },
  { value: "98", suffix: "%", label: "Satisfaction", description: "Client Happiness" },
  { value: "60", suffix: "-90 Days", label: "Delivery", description: "On-Time Completion" },
];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="text-center px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="mb-2">
        <span className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#1C1917] tracking-tight">
          {stat.value}
        </span>
        {stat.suffix && (
          <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-terracotta-500">
            {stat.suffix}
          </span>
        )}
      </div>
      <h3 className="font-sans text-sm sm:text-base font-semibold tracking-wider uppercase text-[#1C1917] mb-1">
        {stat.label}
      </h3>
      {stat.description && (
        <p className="font-sans text-xs sm:text-sm text-stone-500">
          {stat.description}
        </p>
      )}
    </motion.div>
  );
}

export function StatsV2({ stats = defaultStats }: StatsV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C1917 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="flex flex-wrap justify-center items-start gap-8 sm:gap-12 lg:gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsV2;
