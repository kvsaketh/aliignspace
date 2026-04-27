"use client";

import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface Stat {
  /** Numeric value — used by AnimatedCounter for animation */
  number?: number;
  /** Pre-formatted string value (e.g. "500+", "60–90") — used when number is absent */
  value?: string;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    number: 500,
    suffix: "+",
    label: "Happy Homes",
    description: "Families who love where they live",
  },
  {
    number: 90,
    suffix: " Days",
    label: "Max Delivery",
    description: "60–90 day guaranteed turnaround",
  },
  {
    number: 4,
    suffix: "+",
    label: "Years Experience",
    description: "Crafting spaces since 2021",
  },
  {
    number: 2,
    suffix: " Cities",
    label: "Hyd &amp; Nellore",
    description: "Serving Hyderabad &amp; Nellore",
  },
];

export function StatsBlock({ stats = defaultStats }: StatsProps) {
  return (
    <section className="py-20 lg:py-28 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <Reveal direction="fade">
          <div className="text-center mb-14">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546]">
              Our Numbers
            </span>
          </div>
        </Reveal>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-stone-200">
          {stats.map((stat, index) => (
            <Reveal key={index} direction="up" delay={index * 100}>
              <div className="flex flex-col items-center text-center px-6 py-8 relative">
                {/* Number — animated if numeric, static if string */}
                <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-[#1C1917] leading-none mb-2">
                  {stat.number !== undefined ? (
                    <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix ?? ""}
                      prefix={stat.prefix ?? ""}
                      duration={2000}
                    />
                  ) : (
                    stat.value ?? ""
                  )}
                </span>

                {/* Label */}
                <span className="font-serif text-base sm:text-lg font-medium text-[#1C1917] mt-1 mb-2">
                  {stat.label}
                </span>

                {/* Description */}
                {stat.description && (
                  <span
                    className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: stat.description }}
                  />
                )}

                {/* Terracotta accent dot */}
                <span className="block w-1.5 h-1.5 rounded-full bg-[#D46546] mt-4" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
