"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Stat {
  number: string;
  suffix?: string;
  label: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  body?: string[];
  stats?: Stat[];
  image?: string;
}

export function AertsenWhoWeAre({
  label = "Who We Are",
  title = "Designing spaces that reflect",
  accentWord = "you",
  body = [
    "At Aertsen, we don't just design interiors—we curate experiences. Every project begins with listening, understanding, and imagining what a space could become when it truly belongs to the people who live in it.",
    "From Hyderabad to homes across India, our team of architects, interior designers, and craftsmen work in unison to deliver spaces that are as functional as they are beautiful. We blend timeless aesthetics with modern practicality.",
  ],
  stats = [
    { number: "12", suffix: "+", label: "Years of Excellence" },
    { number: "850", suffix: "+", label: "Homes Transformed" },
    { number: "35", suffix: "+", label: "Design Awards" },
    { number: "4", suffix: "", label: "Cities Served" },
  ],
  image = "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="space-y-5 font-sans text-base sm:text-lg text-stone-600 leading-relaxed mb-10">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1612]">
                    {stat.number}
                    <span className="text-[#D46546]">{stat.suffix}</span>
                  </div>
                  <p className="font-sans text-sm text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={image}
                alt="Who we are"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AertsenWhoWeAre;
