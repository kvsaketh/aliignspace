"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check, Users, Clock, Shield, Award, Sparkles } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface WhyChooseCleanProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  image?: string;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  clock: Clock,
  shield: Shield,
  award: Award,
  sparkles: Sparkles,
};

const defaultFeatures: Feature[] = [
  {
    title: "Expert Team",
    description: "Skilled designers with 5+ years of experience in creating beautiful spaces.",
    icon: "users",
  },
  {
    title: "On-Time Delivery",
    description: "We respect your time and ensure projects are completed within promised timelines.",
    icon: "clock",
  },
  {
    title: "Quality Assurance",
    description: "Premium materials and meticulous craftsmanship in every detail.",
    icon: "award",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. Clear quotations with detailed breakdowns.",
    icon: "shield",
  },
];

const defaultQuote = {
  text: "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
  author: "Ar. Samhitha Nagasamudra",
  role: "Founder & Principal Designer",
};

export function WhyChooseClean({
  title = "Why Choose Us",
  subtitle = "The ALIIGNSPACE Difference",
  description = "We believe in building trust through transparency, quality, and exceptional service. Our commitment to excellence has made us a preferred choice for homeowners across Hyderabad and Nellore.",
  features = defaultFeatures,
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  quote = defaultQuote.text,
  quoteAuthor = defaultQuote.author,
  quoteRole = defaultQuote.role,
}: WhyChooseCleanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-terracotta-500">
                {title}
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.h2>

            <motion.p
              className="text-stone-600 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon ? iconMap[feature.icon] : Check;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-terracotta-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-terracotta-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1C1917] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-stone-500">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote */}
            <motion.blockquote
              className="mt-10 pt-8 border-t border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="text-lg font-serif italic text-[#1C1917] mb-4">
                &ldquo;{quote}&rdquo;
              </p>
              <footer>
                <div className="font-medium text-[#1C1917]">{quoteAuthor}</div>
                <div className="text-sm text-stone-500">{quoteRole}</div>
              </footer>
            </motion.blockquote>
          </div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src={image}
                alt="Interior Design"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-terracotta-500/10 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-terracotta-500/30 rounded-lg -z-10" />
            
            {/* Experience Badge */}
            <motion.div
              className="absolute bottom-8 left-8 bg-white p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-4xl font-serif font-medium text-terracotta-500 mb-1">
                5+
              </div>
              <div className="text-sm text-stone-600">Years of<br />Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseClean;
