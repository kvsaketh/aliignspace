"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  videoUrl?: string;
  thumbnail?: string;
}

export function AertsenFactoryVideo({
  label = "Behind The Scenes",
  title = "See how we bring ideas to",
  accentWord = "life",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  thumbnail = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A1612] leading-[1.1] tracking-tight">
            {title} <span className="italic text-[#D46546]">{accentWord}</span>
          </h2>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-[20px] overflow-hidden aspect-video bg-stone-900"
        >
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={thumbnail}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Play button */}
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:bg-[#D46546] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A1612] group-hover:text-white transition-colors duration-300 ml-1" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title="Factory Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default AertsenFactoryVideo;
