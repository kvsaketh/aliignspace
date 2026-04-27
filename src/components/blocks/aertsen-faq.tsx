"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  intro?: string;
  faqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "How long does a typical interior design project take?",
    answer: "Project timelines vary based on scope. A standard 3BHK apartment typically takes 8-12 weeks from design approval to handover. Larger villas or commercial spaces may take 16-24 weeks. We provide a detailed timeline during the consultation phase.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer transparent, all-inclusive pricing with no hidden costs. Our packages are customized based on square footage, material selection, and design complexity. We provide a detailed quotation after the initial site visit and requirement gathering.",
  },
  {
    question: "Do you offer a warranty on your work?",
    answer: "Yes, we provide a comprehensive 5-year warranty on all carpentry and structural work, and a 2-year warranty on hardware and fittings. Our after-sales support team is always available for any maintenance needs.",
  },
  {
    question: "Can I see samples before finalizing materials?",
    answer: "Absolutely. We have an extensive material library at our studio where you can touch and feel finishes, fabrics, and hardware. We also create detailed 3D renders so you can visualize the final look before production begins.",
  },
  {
    question: "Do you handle renovation projects or only new interiors?",
    answer: "We handle both. Whether it's a complete renovation of an existing home or fresh interiors for a new property, our team has the expertise to deliver exceptional results within your budget and timeline.",
  },
  {
    question: "Will I have a dedicated project manager?",
    answer: "Yes, every project is assigned a dedicated project manager who serves as your single point of contact. They coordinate between designers, craftsmen, and vendors to ensure seamless execution and regular progress updates.",
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Hyderabad and Nellore, with projects extending across Telangana and Andhra Pradesh. For select premium projects, we also undertake work in other major Indian cities.",
  },
];

export function AertsenFAQ({
  label = "FAQ",
  title = "Frequently Asked",
  accentWord = "Questions",
  intro = "Have questions? We have answers. If you don't find what you're looking for, feel free to reach out.",
  faqs = defaultFaqs,
}: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-24 lg:py-32 bg-[#f4f1ec]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#D46546] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1612]">
            {title} <span className="text-[#D46546]">{accentWord}</span>
          </h2>
          <p className="mt-4 font-sans text-[#1A1612]/60 max-w-xl mx-auto">{intro}</p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-[860px] mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg text-[rgb(255,134,113)] flex-shrink-0 w-8">
                    {num}
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#1A1612] flex-1">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1A1612]/40 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 pl-[72px]">
                        <p className="font-sans text-sm text-[#1A1612]/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
