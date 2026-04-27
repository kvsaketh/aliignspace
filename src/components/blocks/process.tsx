"use client";

import { Users, Eye, Snowflake, Hammer, Key } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Step {
  number?: string;
  icon?: string;
  title: string;
  description: string;
}

interface ProcessProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  meet: Users,
  visualise: Eye,
  freeze: Snowflake,
  execution: Hammer,
  handover: Key,
  coffee: Users,
  palette: Eye,
  hammer: Hammer,
  heart: Key,
  sofa: Snowflake,
};

const defaultSteps: Step[] = [
  {
    number: "01",
    icon: "meet",
    title: "Meet Designer",
    description:
      "A relaxed, no-pressure conversation with our designer — we listen to your vision, budget, and lifestyle before making a single design decision.",
  },
  {
    number: "02",
    icon: "visualise",
    title: "Visualise Your Home",
    description:
      "We create detailed 3D renders of every room so you can see and feel your future home before anything is built.",
  },
  {
    number: "03",
    icon: "freeze",
    title: "Freeze Design",
    description:
      "You review and approve the complete design and itemised BOQ. Nothing moves to execution without your sign-off.",
  },
  {
    number: "04",
    icon: "execution",
    title: "Execution Begins",
    description:
      "Our skilled team gets to work with a dedicated site supervisor on-site daily. You receive weekly photo updates throughout.",
  },
  {
    number: "05",
    icon: "handover",
    title: "Happy Handover",
    description:
      "We walk through every room together, resolve every last detail, and hand over your dream home — exactly as approved.",
  },
];

export function ProcessBlock({
  title = "Five steps to your dream home",
  subtitle = "Our Process",
  steps = defaultSteps,
}: ProcessProps) {
  const cols = steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <section className="py-20 lg:py-32 bg-[#F9F5ED] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <Reveal direction="fade">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              {subtitle}
            </span>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917]">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line for mobile */}
          <div className="absolute left-[3.25rem] top-0 bottom-0 w-px border-l-2 border-dashed border-[#D46546]/20 lg:hidden" />

          {/* Horizontal line desktop */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[10%] right-[10%] h-px border-t-2 border-dashed border-[#D46546]/30 z-0" />

          <div className={`grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 ${cols} gap-10 lg:gap-4 relative z-10`}>
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon ?? ""] ?? Users;
              return (
                <Reveal key={index} direction="up" delay={index * 100}>
                  <div className="flex lg:flex-col items-start lg:items-center lg:text-center gap-6 lg:gap-0 group pl-4 lg:pl-0">

                    {/* Icon circle */}
                    <div className="relative mb-0 lg:mb-6 flex-shrink-0">
                      <span className="font-serif text-6xl font-medium text-[#D46546]/12 leading-none select-none absolute -top-2 -left-1 lg:-left-2">
                        {step.number ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="relative w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center border border-stone-100 group-hover:border-[#D46546]/40 group-hover:shadow-md transition-all duration-300">
                        <Icon className="w-8 h-8 text-[#D46546]" />
                      </div>
                    </div>

                    <div className="lg:px-2">
                      <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#D46546] mb-2 block">
                        {step.number ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] mb-2">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
