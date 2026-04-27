"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Cog, Award, CheckCircle, Building2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: "cnc" | "hardware" | "qc" | "inhouse";
}

interface CraftsmanshipV2Props {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  image?: string;
  videoUrl?: string;
}

const iconMap = {
  cnc: Cog,
  hardware: Award,
  qc: CheckCircle,
  inhouse: Building2,
};

const defaultFeatures: Feature[] = [
  {
    title: "Precision Craftsmanship",
    description: "Computer-controlled cutting and skilled artisans for flawless finishes on every panel, every time.",
    icon: "cnc",
  },
  {
    title: "Premium Hardware",
    description: "Hettich, Hafele & Blum — the gold standard in premium cabinetry fittings and accessories.",
    icon: "hardware",
  },
  {
    title: "Multi-Level QC",
    description: "Every unit passes through multiple quality checks before leaving our facility.",
    icon: "qc",
  },
  {
    title: "100% In-House",
    description: "No outsourcing. Complete control over quality, materials, and timelines.",
    icon: "inhouse",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[feature.icon];

  return (
    <motion.div
      ref={ref}
      className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-terracotta-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-terracotta-500" />
      </div>
      <div>
        <h4 className="font-serif text-lg font-medium text-[#1C1917] mb-1">
          {feature.title}
        </h4>
        <p className="font-sans text-sm text-stone-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function CraftsmanshipV2({
  title = "Where Craftsmanship Meets Technology",
  subtitle = "Our Promise",
  description = "We combine traditional woodworking expertise with modern manufacturing technology to deliver interiors that stand the test of time.",
  features = defaultFeatures,
  image = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
}: CraftsmanshipV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div>
            <motion.span
              className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-terracotta-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {subtitle}
            </motion.span>
            
            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            <motion.p
              className="font-sans text-base text-stone-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>

            {/* Features */}
            <div className="space-y-2">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>

          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt="Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Stats Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-terracotta-500 text-white p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="font-serif text-4xl font-medium mb-1">100%</div>
              <div className="font-sans text-sm opacity-90">In-House Production</div>
            </motion.div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-stone-200 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CraftsmanshipV2;
