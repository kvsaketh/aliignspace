"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Linkedin } from "lucide-react";

interface Founder {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedIn?: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  founders?: Founder[];
}

export function AertsenFounders({
  label = "Leadership",
  title = "Meet the founders behind the",
  accentWord = "vision",
  founders = [
    {
      name: "Arjun Mehta",
      role: "Co-Founder & Design Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "With over 15 years in architecture and interior design, Arjun brings a unique blend of creative vision and technical expertise to every project. His philosophy centers on designing spaces that evolve with the people who inhabit them.",
      linkedIn: "#",
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder & Creative Head",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: "Priya's background in fine arts and sustainable design shapes Aertsen's commitment to eco-conscious interiors. She believes that beauty and responsibility can coexist in every space we create.",
      linkedIn: "#",
    },
  ],
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

        {/* Founders grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="overflow-hidden rounded-[20px] mb-6">
                <Image
                  src={founder.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"}
                  alt={founder.name}
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#1A1612] mb-1">
                    {founder.name}
                  </h3>
                  <p className="font-sans text-sm text-[#D46546] font-medium mb-3">
                    {founder.role}
                  </p>
                  {founder.bio && (
                    <p className="font-sans text-base text-stone-600 leading-relaxed max-w-sm">
                      {founder.bio}
                    </p>
                  )}
                </div>
                {founder.linkedIn && (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#D46546] hover:border-[#D46546] transition-colors duration-300"
                    aria-label={`${founder.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AertsenFounders;
