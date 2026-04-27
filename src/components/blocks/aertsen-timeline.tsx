"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Event {
  date: string;
  title: string;
  description?: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  events?: Event[];
}

export function AertsenTimeline({
  label = "Our Journey",
  title = "The story of how we built something",
  accentWord = "lasting",
  events = [
    {
      date: "2012",
      title: "The Beginning",
      description: "Aertsen was founded in a small studio in Hyderabad with a bold vision to transform Indian interiors.",
    },
    {
      date: "2015",
      title: "First Major Project",
      description: "Completed our first luxury villa project, setting the standard for quality and attention to detail.",
    },
    {
      date: "2017",
      title: "Expanding Horizons",
      description: "Opened our second studio in Bangalore, bringing our design philosophy to South India's tech capital.",
    },
    {
      date: "2019",
      title: "Design Excellence Award",
      description: "Recognized by the Indian Institute of Interior Designers for innovation in sustainable residential design.",
    },
    {
      date: "2021",
      title: "In-House Manufacturing",
      description: "Launched our own furniture manufacturing unit, giving us complete control over quality and customization.",
    },
    {
      date: "2024",
      title: "National Presence",
      description: "Expanded to Mumbai and Delhi, completing 850+ homes and establishing Aertsen as a national design leader.",
    },
  ],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0F0C09" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "rgb(255,134,113)" }}>
            {label}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight">
            {title} <span className="italic" style={{ color: "rgb(250,202,194)" }}>{accentWord}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px" style={{ backgroundColor: "rgba(255,134,113,0.2)" }} />

          <div className="space-y-12 md:space-y-16">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on line */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 md:top-1/2 w-3 h-3 rounded-full md:-translate-x-1/2 md:-translate-y-1/2" style={{ backgroundColor: "rgb(255,134,113)" }}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "rgb(255,134,113)" }} />
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <span className="font-serif text-2xl sm:text-3xl font-medium" style={{ color: "rgb(255,134,113)" }}>
                      {event.date}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mt-2 mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="font-sans text-base text-stone-400 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AertsenTimeline;
