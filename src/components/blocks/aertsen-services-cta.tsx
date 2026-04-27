"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  label?: string;
  title?: string;
  body?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export function AertsenServicesCTA({
  label = "Get Started",
  title = "Not sure which service is right for you?",
  body = "Schedule a free consultation with our design experts. We'll assess your space, understand your needs, and recommend the perfect solution for your home or office.",
  buttonText = "Book Free Consultation",
  buttonUrl = "/contact",
  secondaryButtonText = "View Our Portfolio",
  secondaryButtonUrl = "/portfolio",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#1A1612" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "rgb(255,134,113)" }}>
            {label}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-6">
            {title}
          </h2>
          <p className="font-sans text-lg text-stone-400 leading-relaxed mb-10 max-w-xl mx-auto">
            {body}
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={buttonUrl}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans font-medium text-[#1A1612] transition-colors duration-300 group"
              style={{ backgroundColor: "rgb(255,134,113)" }}
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border font-sans font-medium text-white border-stone-700 hover:border-stone-500 transition-all duration-300 group"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgb(250,202,194)";
                (e.currentTarget as HTMLElement).style.color = "#1A1612";
                (e.currentTarget as HTMLElement).style.borderColor = "rgb(250,202,194)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.borderColor = "rgb(68,64,60)";
              }}
            >
              {secondaryButtonText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AertsenServicesCTA;
