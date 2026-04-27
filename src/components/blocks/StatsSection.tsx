"use client";

import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface Stat {
  value: string | number;
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  variant?: "dark" | "light";
}

const defaultStats: Stat[] = [
  {
    value: "10+",
    label: "Years Experience",
    description: "Combined expertise in interior design",
  },
  {
    value: "500+",
    label: "Projects Completed",
    description: "Homes transformed across Hyderabad & Nellore",
  },
  {
    value: "1000+",
    label: "Happy Clients",
    description: "Families who love their new spaces",
  },
  {
    value: "2",
    label: "Cities",
    description: "Currently serving Hyderabad & Nellore",
  },
];

export function StatsSection({
  title = "Our Impact",
  subtitle = "Numbers that reflect our commitment to excellence",
  stats = defaultStats,
  variant = "dark",
}: StatsSectionProps) {
  const isDark = variant === "dark";
  
  // Parse numeric value from string (e.g., "10+" -> 10)
  const parseNumericValue = (value: string | number): { number: number; suffix: string } => {
    const valueStr = String(value);
    const match = valueStr.match(/(\d+)/);
    const number = match ? parseInt(match[1], 10) : 0;
    const suffix = valueStr.replace(/\d+/, "");
    return { number, suffix };
  };

  return (
    <section className={`py-20 lg:py-28 ${isDark ? "bg-[#1C1917]" : "bg-white"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span
              className={`font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4 block ${
                isDark ? "text-[#D46546]" : "text-[#D46546]"
              }`}
            >
              By The Numbers
            </span>
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 ${
                isDark ? "text-white" : "text-[#1C1917]"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`font-sans text-lg ${
                  isDark ? "text-white/70" : "text-stone-600"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 ${
            isDark ? "divide-stone-700" : "divide-stone-200"
          } divide-x-0 lg:divide-x`}
        >
          {stats.map((stat, index) => {
            const { number, suffix } = parseNumericValue(stat.value);
            
            return (
              <Reveal key={index} direction="up" delay={index * 100}>
                <div className="flex flex-col items-center text-center px-6 py-8 relative">
                  {/* Number */}
                  <span
                    className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-none mb-2 ${
                      isDark ? "text-white" : "text-[#1C1917]"
                    }`}
                  >
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <AnimatedCounter
                      end={number}
                      suffix={suffix || stat.suffix || ""}
                      duration={2000}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={`font-serif text-base sm:text-lg font-medium mt-1 mb-2 ${
                      isDark ? "text-white" : "text-[#1C1917]"
                    }`}
                  >
                    {stat.label}
                  </span>

                  {/* Description */}
                  {stat.description && (
                    <span
                      className={`font-sans text-xs sm:text-sm leading-relaxed max-w-[200px] ${
                        isDark ? "text-white/60" : "text-stone-500"
                      }`}
                    >
                      {stat.description}
                    </span>
                  )}

                  {/* Accent dot */}
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#D46546] mt-4" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
