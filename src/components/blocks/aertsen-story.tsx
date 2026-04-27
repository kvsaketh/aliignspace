"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  body?: string[];
  image?: string;
}

export function AertsenStory({
  label = "How We Began",
  title = "A journey built on passion and",
  accentWord = "purpose",
  body = [
    "Aertsen was born from a simple observation: most people settle for spaces that don't inspire them. In 2012, our founders—a duo of architects with a shared vision—decided to change that narrative.",
    "What started as a small studio in Hyderabad has grown into a full-service interior design firm with a reputation for excellence. We've never lost sight of our founding principle: every space should tell a story, and every story deserves to be told beautifully.",
    "Today, we continue to push boundaries, blending traditional craftsmanship with contemporary design to create interiors that stand the test of time.",
  ],
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image (left on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={image}
                alt="Our story"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>

          {/* Text Content (right on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            {/* Label */}
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] mb-4">
              {label}
            </span>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1612] leading-[1.1] tracking-tight mb-8">
              {title} <span className="italic text-[#D46546]">{accentWord}</span>
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-5 font-sans text-base sm:text-lg text-stone-600 leading-relaxed">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AertsenStory;
