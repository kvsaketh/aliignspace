"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image?: string;
  videoUrl?: string;
  title: string;
  subtitle: string;
}

interface Props {
  slides?: Slide[];
  autoPlayInterval?: number;
}

const defaultSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
    title: "Crafting Timeless Interiors",
    subtitle: "Where luxury meets functionality in every corner",
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    title: "Bespoke Design Solutions",
    subtitle: "Tailored spaces that reflect your unique story",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    title: "Elevated Living Spaces",
    subtitle: "Transforming houses into extraordinary homes",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    title: "Precision in Every Detail",
    subtitle: "Meticulous craftsmanship from concept to completion",
  },
];

export function AertsenHeroSlider({ slides = defaultSlides, autoPlayInterval = 6000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, next]);

  const slide = slides[current];
  const counter = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#1A1612]">
      {/* Background with Ken Burns */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={current}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ scale: { duration: 8, ease: "linear" }, opacity: { duration: 0.8 } }}
          className="absolute inset-0"
        >
          {slide.videoUrl ? (
            <video
              src={slide.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={slide.image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612]/80 via-[#1A1612]/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/60 via-transparent to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-[rgb(255,134,113)] mb-4">
                {slide.subtitle}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
                {slide.title}
              </h1>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D46546] text-white font-sans text-sm uppercase tracking-wider hover:bg-[rgb(255,134,113)] transition-colors duration-300"
              >
                Book a Consultation
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 z-10">
        <span className="font-serif text-white text-lg tracking-wider">{counter}</span>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-4 sm:right-6 lg:right-8 z-10 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-8 h-2 bg-[#D46546]" : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
