"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Palette, Hammer, Home } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: "consultation" | "design" | "execution" | "handover";
  features: string[];
}

interface ProcessV2Props {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

const iconMap = {
  consultation: MessageSquare,
  design: Palette,
  execution: Hammer,
  handover: Home,
};

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Design Pitch",
    description: "Let us get to know you. Your visions will be captured by our design team and a preliminary cost presentation shared with you.",
    icon: "consultation",
    features: ["Requirement discussion & moodboard", "Tentative quotation shared", "Onboarding with 10% confirmation"],
  },
  {
    number: "02",
    title: "Count on our Designers",
    description: "Our designers present the final proposal tailored to your requirements. Sign off and sit back — watch your vision turn into reality.",
    icon: "design",
    features: ["3D designs & layouts presented", "Materials & finishes finalised", "Design sign-off & timeline confirmed"],
  },
  {
    number: "03",
    title: "Dreams Under Construction",
    description: "Our ground team makes your dreams a reality. With seamless production and execution, your project moves forward with full transparency.",
    icon: "execution",
    features: ["Project handover to execution team", "On-site work begins", "Milestone-based progress updates"],
  },
  {
    number: "04",
    title: "Step into your Dream Home",
    description: "Your ideal home is ready after completion of production and installation. Quality checks done, final walkthrough complete.",
    icon: "handover",
    features: ["Quality checks completed", "Final walkthrough & handover", "Warranty & documents handed over"],
  },
];

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[step.icon];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${isEven ? "" : "lg:flex-row-reverse"}`}>
        {/* Visual Side */}
        <div className={`flex-1 w-full ${isEven ? "lg:text-right" : "lg:text-left"}`}>
          <div className={`inline-flex items-center gap-4 mb-6 ${isEven ? "lg:flex-row-reverse" : ""}`}>
            {/* Number */}
            <span className="font-serif text-7xl sm:text-8xl lg:text-9xl font-medium text-stone-100">
              {step.number}
            </span>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-terracotta-50 flex items-center justify-center">
              <Icon className="w-8 h-8 text-terracotta-500" />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] mb-4">
            {step.title}
          </h3>
          <p className="font-sans text-base text-stone-600 leading-relaxed mb-6 max-w-md">
            {step.description}
          </p>
          
          {/* Features */}
          <ul className={`space-y-3 ${isEven ? "lg:ml-auto" : ""}`}>
            {step.features.map((feature, i) => (
              <motion.li
                key={i}
                className={`flex items-center gap-3 font-sans text-sm text-stone-500 ${isEven ? "lg:justify-end" : ""}`}
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + i * 0.1 }}
              >
                {!isEven && <span className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0" />}
                {feature}
                {isEven && <span className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0" />}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Empty side for visual balance */}
        <div className="hidden lg:block flex-1" />
      </div>

      {/* Connecting Line (except for last item) */}
      {index < defaultSteps.length - 1 && (
        <div className="absolute left-1/2 top-full h-24 w-[1px] bg-gradient-to-b from-stone-200 to-transparent -translate-x-1/2 hidden lg:block" />
      )}
    </motion.div>
  );
}

export function ProcessV2({
  title = "Steps to give your home an ALIIGNSPACE Makeover",
  subtitle = "Our Process",
  steps = defaultSteps,
}: ProcessV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 sm:py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-terracotta-50/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.span
            className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-terracotta-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessV2;
