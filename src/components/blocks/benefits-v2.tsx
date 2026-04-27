"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Factory, Eye, Users } from "lucide-react";

interface Benefit {
  number: string;
  title: string;
  description: string;
  icon: "shield" | "factory" | "eye" | "users";
  features?: string[];
}

interface BenefitsV2Props {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
}

const iconMap = {
  shield: Shield,
  factory: Factory,
  eye: Eye,
  users: Users,
};

const defaultBenefits: Benefit[] = [
  {
    number: "01",
    title: "Complete Transparency",
    description: "Every material, finish, and specification is clearly documented and shared for your approval before work begins.",
    icon: "eye",
    features: ["Detailed quotations", "Material documentation", "Progress tracking"],
  },
  {
    number: "02",
    title: "Expert Design Team",
    description: "Our in-house design team handles everything from concept to installation — no third-party involvement, zero compromise.",
    icon: "users",
    features: ["Dedicated designers", "3D visualization", "Unlimited revisions"],
  },
  {
    number: "03",
    title: "Quality Assurance",
    description: "Premium materials and meticulous craftsmanship in every detail. We never compromise on quality.",
    icon: "shield",
    features: ["Premium materials", "Multi-level QC", "10-year warranty"],
  },
  {
    number: "04",
    title: "In-House Production",
    description: "Our own manufacturing unit ensures complete quality control and precision-timed delivery for every project.",
    icon: "factory",
    features: ["Own manufacturing", "Quality control", "On-time delivery"],
  },
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[benefit.icon];

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Number & Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            {/* Large Number */}
            <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-medium text-stone-200 group-hover:text-terracotta-200 transition-colors duration-500">
              {benefit.number}
            </span>
            {/* Icon Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-terracotta-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1917] mb-3 group-hover:text-terracotta-500 transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed mb-4">
            {benefit.description}
          </p>
          
          {/* Features */}
          {benefit.features && (
            <ul className="space-y-2">
              {benefit.features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 font-sans text-xs sm:text-sm text-stone-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + i * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function BenefitsV2({
  title = "The ALIIGNSPACE Advantage",
  subtitle = "Why Homeowners Trust Us",
  benefits = defaultBenefits,
}: BenefitsV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
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

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-x-20 lg:gap-y-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.number} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsV2;
