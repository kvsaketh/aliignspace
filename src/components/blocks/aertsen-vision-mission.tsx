"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Card {
  icon?: string;
  title: string;
  text: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  vision?: Card;
  mission?: Card;
}

function CardIcon({ name }: { name?: string }) {
  if (name === "eye") {
    return (
      <svg className="w-8 h-8 text-[#D46546]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  if (name === "target") {
    return (
      <svg className="w-8 h-8 text-[#D46546]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-[#D46546]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}

export function AertsenVisionMission({
  label = "Our Purpose",
  title = "Driven by vision, guided by",
  accentWord = "mission",
  vision = {
    icon: "eye",
    title: "Our Vision",
    text: "To be India's most trusted interior design partner—creating spaces that inspire, comfort, and elevate everyday living. We envision a world where every home is a masterpiece of personal expression.",
  },
  mission = {
    icon: "target",
    title: "Our Mission",
    text: "To deliver exceptional interior design experiences through innovation, craftsmanship, and unwavering attention to detail. We exist to transform how people experience their spaces, one home at a time.",
  },
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1612] leading-[1.1] tracking-tight">
            {title} <span className="italic text-[#D46546]">{accentWord}</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-[20px] border border-stone-100 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6">
              <CardIcon name={vision.icon} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1612] mb-4">
              {vision.title}
            </h3>
            <p className="font-sans text-base text-stone-600 leading-relaxed">
              {vision.text}
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-[20px] border border-stone-100 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6">
              <CardIcon name={mission.icon} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1612] mb-4">
              {mission.title}
            </h3>
            <p className="font-sans text-base text-stone-600 leading-relaxed">
              {mission.text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AertsenVisionMission;
