"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, PenTool, HardHat, KeyRound } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Design Pitch",
    description:
      "Let us get to know you. Your visions captured by our design team. Onboard with 10% confirmation.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design Finalization",
    description:
      "3D designs & layouts presented. Materials & finishes finalised. Design sign-off & timeline confirmed.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Dreams Under Construction",
    description:
      "Project handed to execution team. On-site work begins. Milestone-based progress updates.",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Step into Your Home",
    description:
      "Quality checks completed. Final walkthrough & handover. Warranty & documents handed over.",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="section-label justify-center">
            <span>Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight">
            From Vision to Reality
          </h2>
        </motion.div>

        {/* Timeline - Desktop: Horizontal with alternating content, Mobile: Vertical */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-coral-500/20 -translate-x-1/2" />

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-coral-500/20" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                    index > 0 ? "lg:mt-16" : ""
                  }`}
                >
                  {/* Step number circle - Desktop centered */}
                  <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className="w-14 h-14 rounded-full bg-coral-500 flex items-center justify-center shadow-lg shadow-coral-500/30">
                      <span className="text-white font-serif font-semibold text-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: icon + number on left */}
                  <div className="lg:hidden absolute left-0 top-0 z-10">
                    <div className="w-16 h-16 rounded-full bg-coral-500 flex items-center justify-center shadow-lg shadow-coral-500/30">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-24 lg:pl-0 ${
                      isEven
                        ? "lg:pr-20 lg:text-right"
                        : "lg:col-start-2 lg:pl-20"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isEven ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="hidden lg:flex w-10 h-10 rounded-lg bg-coral-500/10 items-center justify-center">
                        <step.icon className="w-5 h-5 text-coral-500" />
                      </span>
                      <span className="text-coral-500 text-xs font-label tracking-wider uppercase">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-charcoal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Empty column for alternating layout on desktop */}
                  {!isEven && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
