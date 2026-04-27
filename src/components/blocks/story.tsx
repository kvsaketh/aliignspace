"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface StoryBlockProps {
  imageUrl?: string;
  heading?: string;
  body?: string[];
  quote?: string;
  quoteAuthor?: string;
  label?: string;
}

const defaultBody = [
  "Every home holds a different dream. At Aliignspace, we began with one belief — that the only thing standing between you and your dream home isn't the lack of options. It's the lack of trust.",
  "Founded in 2021 by Ar. Samhitha Nagasamudra, Aliignspace was born from years of watching homeowners navigate an industry clouded by vague estimates, mismatched expectations, and broken timelines. We chose a different path — cleaner designs, sharper strategies, and a process so transparent you can follow every step of it.",
];

export function StoryBlock({
  imageUrl = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format",
  heading = "Where <em>trust</em> becomes the foundation",
  body = defaultBody,
  quote = "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
  quoteAuthor = "Ar. Samhitha Nagasamudra, Founder",
  label = "Our Story",
}: StoryBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text Content - 60% */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            {/* Label */}
            <div className="section-label">
              <span>{label}</span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight mb-8"
              dangerouslySetInnerHTML={{ __html: heading }}
            />

            {/* Body */}
            <div className="space-y-5 text-slate-500 leading-[1.8] text-base sm:text-lg">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 relative pl-6 border-l-4 border-coral-500"
            >
              <blockquote className="text-lg sm:text-xl font-serif italic text-charcoal leading-relaxed">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <cite className="block mt-4 text-sm text-slate-500 not-italic font-label tracking-wider uppercase">
                — {quoteAuthor}
              </cite>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-coral-500/10 text-coral-600 rounded-full text-sm font-label tracking-wider uppercase">
                <Calendar className="w-4 h-4" />
                Est. 2021
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-coral-500/10 text-coral-600 rounded-full text-sm font-label tracking-wider uppercase">
                <MapPin className="w-4 h-4" />
                Hyderabad & Nellore
              </span>
            </motion.div>
          </motion.div>

          {/* Image - 40% with Arch Frame */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative"
          >
            <div className="relative">
              {/* Decorative arch frame */}
              <div className="absolute -inset-4 border-2 border-coral-500/20 rounded-t-[120px] rounded-b-3xl" />
              <div className="absolute -inset-8 border border-coral-500/10 rounded-t-[140px] rounded-b-3xl" />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-t-[100px] rounded-b-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Aliignspace interior design showcase"
                  className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-coral-500/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-peach/30 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
