"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "We finalised designs and with utmost trust handed over keys for execution, the team shared with us site updates but we visited site only during handover and felt really happy with the outcome and quality of products provided. happy & satisfied with output and also experience over all.",
    author: "Happy Homeowner",
    location: "Jubilee Hills, Hyderabad",
  },
  {
    id: 2,
    quote:
      "My Second association with this Allignspace. Honestly speaking, we were most excited when Samhitha showed us the 3d design of our home interiors and finally very happy and satisfied with the output delivered. Never compromising nature in terms of quality of the material and looks of the interiors makes Alignspace to stand out. Thank you team for delivering our dream interiors.",
    author: "Satisfied Client",
    location: "Hyderabad",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center">
            <span>Client Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight mb-4">
            Your happiness is the metric
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-warm-white rounded-3xl p-8 sm:p-12 shadow-card border border-stone-200/50">
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-coral-500/20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-xl sm:text-2xl font-serif italic text-charcoal leading-relaxed mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white font-serif font-medium text-lg">
                    {testimonials[current].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">
                      {testimonials[current].author}
                    </div>
                    <div className="text-sm text-slate-500">
                      {testimonials[current].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-200/50">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-coral-500 w-8"
                        : "bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-slate-500 hover:bg-coral-50 hover:border-coral-300 hover:text-coral-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-slate-500 hover:bg-coral-50 hover:border-coral-300 hover:text-coral-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral-500/10 text-coral-600 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 fill-coral-500 text-coral-500" />
              Your Happiness Matters!
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
