"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  body?: string;
  buttonText?: string;
  buttonUrl?: string;
  phone?: string;
}

export function AertsenAboutCTA({
  label = "Ready to Begin?",
  title = "Let's create a space you'll",
  accentWord = "love",
  body = "Whether you're starting from scratch or reimagining an existing space, we're here to guide you every step of the way. Book a free consultation with our design experts today.",
  buttonText = "Book a Free Consultation",
  buttonUrl = "/contact",
  phone = "+91 98765 43210",
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
            {title} <span className="italic" style={{ color: "rgb(250,202,194)" }}>{accentWord}</span>
          </h2>
          <p className="font-sans text-lg text-stone-400 leading-relaxed mb-10 max-w-xl mx-auto">
            {body}
          </p>

          {/* CTAs */}
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
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border font-sans font-medium text-white border-stone-700 hover:border-stone-500 transition-colors duration-300"
            >
              {phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AertsenAboutCTA;
