"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Home,
  Users,
  Shield,
  Briefcase,
  LucideIcon,
} from "lucide-react";

interface StatItem {
  value: string;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  icon?: string;
}

interface Props {
  stats?: StatItem[];
}

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  shield: Shield,
  briefcase: Briefcase,
};

function StatIcon({ name }: { name?: string }) {
  const Icon = iconMap[name || ""];
  if (!Icon) return null;
  return <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "rgb(255,134,113)" }} />;
}

/* ------------------------------------------------------------------ */
/*  Count-up number                                                    */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  const numeric = parseFloat(target);
  const isDecimal = target.includes(".");

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numeric, isDecimal]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated connecting dots (desktop only)                            */
/* ------------------------------------------------------------------ */
function ConnectingDots({ count }: { count: number }) {
  return (
    <div className="hidden lg:flex absolute top-[72px] left-0 right-0 items-center justify-between px-[12.5%]">
      {Array.from({ length: count - 1 }).map((_, i) => (
        <div key={i} className="flex-1 flex items-center justify-center relative">
          {/* Line */}
          <div className="w-full h-[1px] overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.8 + i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-full origin-left"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,134,113,0.4), rgba(250,202,194,0.4))",
              }}
            />
          </div>
          {/* Pulse dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.2 + i * 0.25,
              ease: "backOut",
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgb(255,134,113)" }}
          >
            <motion.div
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "rgb(255,134,113)" }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function AertsenInfographics({
  stats = [
    {
      value: "1000",
      suffix: "+",
      label: "Projects",
      description: "Successfully delivered across Hyderabad",
      icon: "home",
    },
    {
      value: "1500",
      suffix: "+",
      label: "Happy Families",
      description: "Trust us with their dream homes",
      icon: "users",
    },
    {
      value: "10",
      suffix: " yrs",
      label: "Warranty",
      description: "Comprehensive coverage on all work",
      icon: "shield",
    },
    {
      value: "200",
      suffix: "+",
      label: "Crew Members",
      description: "Dedicated in-house professionals",
      icon: "briefcase",
    },
  ],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#1A1612" }}
    >
      {/* Subtle animated gradient blobs in background */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgb(255,134,113)" }}
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgb(250,202,194)" }}
      />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[80px] pointer-events-none"
        style={{ backgroundColor: "rgb(255,134,113)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <span
            className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgb(255,134,113)" }}
          >
            By The Numbers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-white">
            Trusted by{" "}
            <span
              className="italic"
              style={{
                color: "rgb(255,134,113)",
              }}
            >
              thousands
            </span>{" "}
            of families
          </h2>
        </motion.div>

        {/* Stats grid with connecting dots */}
        <div className="relative">
          <ConnectingDots count={stats.length} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl p-8 sm:p-10 text-center lg:text-left cursor-default"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: "0 0 40px rgba(255,134,113,0.08)",
                  }}
                />

                {/* Icon circle with gold accent */}
                <div className="relative mb-6 inline-flex">
                  {/* Gold ring behind */}
                  <div
                    className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    style={{
                      backgroundColor: "rgb(255,134,113)",
                    }}
                  />
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,134,113,0.12)" }}
                  >
                    <StatIcon name={stat.icon} />
                  </motion.div>
                </div>

                {/* Number */}
                <div
                  className="font-serif text-4xl sm:text-5xl font-medium tracking-tight mb-2"
                  style={{ color: "#f9f7f4" }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(249,247,244,0.5)" }}
                >
                  {stat.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-6 h-[2px] w-12 origin-left rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgb(255,134,113), rgb(250,202,194))",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AertsenInfographics;
