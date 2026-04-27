"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

interface CTACleanProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  showPhone?: boolean;
  phoneNumber?: string;
}

export function CTAClean({
  title = "Ready to Transform Your Space?",
  subtitle = "Let's discuss your project and bring your vision to life. Schedule a free consultation with our design experts.",
  buttonText = "Get Free Consultation",
  buttonUrl = "/contact",
  secondaryButtonText = "Call Us",
  secondaryButtonUrl = "tel:+919030444503",
  showPhone = true,
  phoneNumber = "+91 90304 44503",
}: CTACleanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-[#1C1917] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-terracotta-500">
              Start Your Journey
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-stone-400 mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={buttonUrl}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-terracotta-500 text-white font-medium hover:bg-terracotta-600 transition-colors duration-300"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {showPhone && (
              <a
                href={secondaryButtonUrl}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                {phoneNumber}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTAClean;
