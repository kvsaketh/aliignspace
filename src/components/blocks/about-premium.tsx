"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

interface AboutPremiumProps {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  images?: string[];
  quote?: string;
  quoteAuthor?: string;
  stats?: AboutStat[];
}

// Image gallery component with before/after style
function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Display */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1C1917] shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
          whileHover={{ scale: 1.1, backgroundColor: "#d46546", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          onClick={prevImage}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1C1917] shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "#d46546", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          onClick={nextImage}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Play button overlay (decorative) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.button
            className="w-20 h-20 rounded-full bg-terracotta-500/90 backdrop-blur-sm flex items-center justify-center text-white shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 ml-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
              idx === currentIndex ? "border-terracotta-500" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
            {idx === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-terracotta-500/20"
                layoutId="activeThumb"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

// Animated counter for stats
function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="font-serif text-3xl sm:text-4xl font-medium text-terracotta-500"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}{suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

export function AboutPremium({
  label = "About Us",
  heading = "Where Creativity Meets Strategy",
  accentWord = "Creativity",
  content = "",
  images = [],
  quote = "",
  quoteAuthor = "",
  stats = [],
}: AboutPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const defaultImages = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  ];

  const defaultStats: AboutStat[] = [
    { value: 10, suffix: "+", label: "Years Combined Experience" },
    { value: 500, suffix: "+", label: "Happy Families" },
    { value: 2, suffix: "", label: "Cities Served" },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;
  const displayStats = stats.length > 0 ? stats : defaultStats;

  // Inject accent word styling
  const headingWithAccent = accentWord
    ? heading.replace(
        accentWord,
        `<span class="text-terracotta-500 italic">${accentWord}</span>`
      )
    : heading;

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cream-100/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Interactive Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <ImageGallery images={displayImages} />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Label */}
            <motion.span
              className="inline-block text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {label}
            </motion.span>

            {/* Heading */}
            <motion.h2
              className="font-serif text-4xl sm:text-5xl font-medium text-[#1C1917] leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: headingWithAccent }}
            />

            {/* Content */}
            <motion.div
              className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Quote */}
            {quote && (
              <motion.blockquote
                className="relative pl-6 border-l-2 border-terracotta-400 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <p className="font-serif text-lg italic text-stone-600 leading-relaxed mb-3">
                  &ldquo;{quote}&rdquo;
                </p>
                {quoteAuthor && (
                  <footer className="font-sans text-sm text-stone-500">
                    — {quoteAuthor}
                  </footer>
                )}
              </motion.blockquote>
            )}

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mb-10 py-6 border-t border-b border-stone-100"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {displayStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <p className="font-sans text-xs text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-white font-sans font-medium hover:bg-terracotta-500 transition-colors duration-300 group"
              >
                Learn Our Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPremium;
