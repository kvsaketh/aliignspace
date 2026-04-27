"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

interface Commitment {
  text: string;
}

interface Card {
  number: string;
  title: string;
  description: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  commitments?: Commitment[];
  cards?: Card[];
}

export function AertsenPromises({
  label = "Our Promises",
  title = "Commitments we live by every",
  accentWord = "day",
  commitments = [
    { text: "Transparent pricing with no hidden costs" },
    { text: "On-time delivery, every single time" },
    { text: "Premium materials sourced responsibly" },
    { text: "Dedicated project managers for every client" },
    { text: "10-year warranty on all workmanship" },
    { text: "Post-completion support and maintenance" },
  ],
  cards = [
    {
      number: "01",
      title: "Quality First",
      description: "We never compromise on materials or craftsmanship. Every detail is inspected and perfected.",
    },
    {
      number: "02",
      title: "Client Centric",
      description: "Your vision drives our process. We listen, adapt, and deliver exactly what you imagined.",
    },
    {
      number: "03",
      title: "Innovation Driven",
      description: "We stay ahead of trends and technologies to bring you cutting-edge design solutions.",
    },
  ],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Text with commitments */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] mb-4">
              {label}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1612] leading-[1.1] tracking-tight mb-10">
              {title} <span className="italic text-[#D46546]">{accentWord}</span>
            </h2>

            <div className="space-y-4">
              {commitments.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgb(255,134,113)" }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="font-sans text-base text-stone-600">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Numbered cards */}
          <div className="space-y-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-[20px] bg-white border border-stone-100 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="font-serif text-4xl font-medium text-stone-200">{card.number}</span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1612] mt-3 mb-2">
                  {card.title}
                </h3>
                <p className="font-sans text-base text-stone-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AertsenPromises;
