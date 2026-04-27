"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

interface Button {
  label: string;
  url: string;
  type: "primary" | "phone" | "whatsapp";
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  body?: string;
  buttons?: Button[];
}

const defaultButtons: Button[] = [
  { label: "Book Consultation", url: "#contact", type: "primary" },
  { label: "Call Us", url: "tel:+919999999999", type: "phone" },
  { label: "WhatsApp", url: "https://wa.me/919999999999", type: "whatsapp" },
];

export function AertsenFinalCTA({
  label = "Get Started",
  title = "Let&apos;s Create Something",
  accentWord = "Beautiful",
  body = "Ready to transform your space? Reach out today and let's begin your journey toward the home you've always envisioned.",
  buttons = defaultButtons,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 bg-[#1A1612] overflow-hidden" ref={ref}>
      {/* Ghost word background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[12vw] text-white/[0.03] whitespace-nowrap">TOGETHER</span>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[rgb(255,134,113)] mb-6">
            {label}
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: `${title} <span class="text-[rgb(255,134,113)]">${accentWord}</span>` }}
          />
          <p className="font-sans text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">{body}</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {buttons.map((btn, i) => {
            if (btn.type === "primary") {
              return (
                <a
                  key={i}
                  href={btn.url}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#D46546] text-white font-sans text-sm uppercase tracking-wider hover:bg-[rgb(255,134,113)] transition-colors duration-300 rounded-full"
                >
                  {btn.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              );
            }
            if (btn.type === "phone") {
              return (
                <a
                  key={i}
                  href={btn.url}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-sans text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 rounded-full"
                >
                  <Phone className="w-4 h-4" />
                  {btn.label}
                </a>
              );
            }
            return (
              <a
                key={i}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-sans text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                {btn.label}
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
