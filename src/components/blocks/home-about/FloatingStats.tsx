"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface FloatingStatsProps {
  stats?: Stat[];
  variant?: "glass" | "solid" | "minimal";
  className?: string;
}

// Animated counter with spring physics
function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "",
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  if (isInView) {
    motionValue.set(value);
  }

  return (
    <motion.span 
      ref={ref} 
      className="tabular-nums"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="text-terracotta-500">{prefix}</span>
      <motion.span>{displayValue}</motion.span>
      <span className="text-terracotta-500">{suffix}</span>
    </motion.span>
  );
}

// Individual floating stat card
function StatCard({ 
  stat, 
  index, 
  variant,
  totalCards 
}: { 
  stat: Stat; 
  index: number;
  variant: "glass" | "solid" | "minimal";
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-30px" });

  // Floating animation with different delays
  const floatVariants = {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const baseClasses = "relative p-6 text-center transition-all duration-300";
  
  const variantClasses = {
    glass: "glass-cream rounded-xl shadow-lg shadow-black/5 border border-terracotta-500/10 backdrop-blur-md",
    solid: "bg-white rounded-sm shadow-elevated border border-stone-100",
    minimal: "bg-transparent border-b-2 border-terracotta-500/20 pb-4",
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${baseClasses} ${variantClasses[variant]}`}
      variants={floatVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
    >
      {/* Value */}
      <motion.div
        className={`font-serif font-medium text-[#1C1917] mb-1 ${
          variant === "minimal" ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl"
        }`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <AnimatedCounter 
          value={stat.value} 
          suffix={stat.suffix} 
          prefix={stat.prefix}
          delay={index * 0.15 + 0.3}
        />
      </motion.div>
      
      {/* Label */}
      <motion.p 
        className={`font-sans text-stone-500 ${
          variant === "minimal" ? "text-xs tracking-wide" : "text-sm tracking-wide"
        }`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
      >
        {stat.label}
      </motion.p>

      {/* Decorative elements for glass/solid variants */}
      {variant !== "minimal" && (
        <>
          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-terracotta-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "40%", opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.6 }}
          />
          
          {/* Subtle corner accent */}
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-terracotta-500/30" />
        </>
      )}
    </motion.div>
  );
}

export function FloatingStats({ 
  stats,
  variant = "glass",
  className = ""
}: FloatingStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const defaultStats: Stat[] = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Happy Families" },
    { value: 98, suffix: "%", label: "Satisfaction Rate" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Background glow effect */}
      {variant === "glass" && (
        <div className="absolute inset-0 -m-4 bg-gradient-to-r from-terracotta-500/5 via-cream-200/30 to-terracotta-500/5 rounded-2xl blur-2xl" />
      )}
      
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {displayStats.map((stat, index) => (
          <StatCard
            key={index}
            stat={stat}
            index={index}
            variant={variant}
            totalCards={displayStats.length}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Compact floating stats for overlay on images
export function FloatingStatsCompact({ 
  stats,
  className = ""
}: { 
  stats?: Stat[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-30px" });

  const defaultStats: Stat[] = [
    { value: 500, suffix: "+", label: "Projects" },
    { value: 10, suffix: "+", label: "Years" },
    { value: 98, suffix: "%", label: "Happy Clients" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <motion.div
      ref={containerRef}
      className={`flex flex-wrap gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {displayStats.map((stat, index) => (
        <motion.div
          key={index}
          className="glass-cream px-4 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="font-serif text-xl font-medium text-[#1C1917]">
            <AnimatedCounter 
              value={stat.value} 
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          </div>
          <div className="text-xs text-stone-500">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
