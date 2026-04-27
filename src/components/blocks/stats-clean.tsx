"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsCleanProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "50+", label: "Projects", description: "Successfully completed" },
  { value: "5+", label: "Years", description: "Of excellence" },
  { value: "98%", label: "Satisfaction", description: "Client happiness" },
  { value: "2", label: "Cities", description: "Hyderabad & Nellore" },
];

export function StatsClean({ stats = defaultStats }: StatsCleanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-16 lg:py-20 bg-white border-y border-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-terracotta-500 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-stone-400">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsClean;
