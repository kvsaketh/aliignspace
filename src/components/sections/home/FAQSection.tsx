"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the cost of full home interiors in Hyderabad?",
    answer: "The cost of full home interiors depends on factors like home size, design preferences, materials, and finishes. At Aliignspace, we offer premium, fully customized solutions tailored to your requirements. Book a free consultation for a detailed estimate.",
  },
  {
    question: "How long does it take to complete home interiors?",
    answer: "A typical 3BHK home interior project takes between 60 to 90 days from design finalization to handover. The timeline may vary based on the scope of work, material availability, and customization level.",
  },
  {
    question: "Do you provide only modular kitchen or single room interiors?",
    answer: "Yes, we offer modular kitchen designs, single room interiors, and partial home makeovers. Whether it's just a kitchen upgrade or a bedroom redesign, we handle projects of all sizes with the same quality and care.",
  },
  {
    question: "What makes Aliignspace different from other interior designers?",
    answer: "Aliignspace stands out for our transparency-first approach, render-to-reality promise, and never-compromising attitude toward quality. Founded by architects, we bring design expertise and execution precision that typical contractors cannot match.",
  },
  {
    question: "Do you offer customized interior design?",
    answer: "Absolutely. Every project at Aliignspace is fully customized to reflect your lifestyle, preferences, and budget. Our design team works closely with you to create spaces that are uniquely yours.",
  },
  {
    question: "Can I visit your factory before starting my project?",
    answer: "Yes, we encourage site visits. You can visit our manufacturing unit to understand our quality standards, material selection, and craftsmanship before making your decision.",
  },
  {
    question: "Do you provide warranty on interiors?",
    answer: "Yes, all our interior projects come with a comprehensive warranty covering workmanship and materials. We also provide post-handover support to ensure your complete satisfaction.",
  },
];

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg">
            About <em className="text-coral-500 not-italic">Home Interiors</em>
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-warm-white rounded-xl px-5 sm:px-6 border border-stone-200/50 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-charcoal hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <a
            href="https://wa.me/919030444503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-coral-500 text-white text-sm font-semibold rounded-xl hover:bg-coral-600 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
