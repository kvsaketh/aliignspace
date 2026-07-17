"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80";

export function AliignspaceHeroSlider({ slides = defaultSlides, autoPlayInterval = 7000 }: Props) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0 || slides.length < 2) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, next, slides.length]);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#16141f]">
      {/* Cinematic photography: long crossfade, slow drift */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.07 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: 10, ease: "linear" },
          }}
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
              src={slide.image || FALLBACK_IMAGE}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cinematic grade: soft vignette, heavier at the base where the content sits */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#16141f]/95 via-[#16141f]/35 to-[#16141f]/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#16141f]/60 via-transparent to-transparent" />

      {/* Content, anchored low: emptiness above is the luxury */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-end pb-36 sm:pb-40 pt-28">
        <div className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-12 h-px bg-[#FF9900]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#FF9900]">
              Bespoke Interior Design
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={current} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
              <div className="overflow-hidden">
                <motion.h1
                  initial={reduce ? false : { y: "102%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] pb-1"
                >
                  {slide.title}
                </motion.h1>
              </div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-sans text-base sm:text-lg text-white/70 leading-relaxed max-w-xl"
              >
                {slide.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF9900] px-8 py-4 font-sans text-sm font-medium text-white hover:bg-[#CC7A00] active:scale-[0.98] transition-all duration-300"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Gallery navigation: slide titles on a hairline, gold progress on the active one */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-gradient-to-t from-[#16141f]/70 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: titles as navigation */}
          <div
            className="hidden md:grid"
            style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}
          >
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className="relative py-5 pr-6 text-left"
              >
                <span
                  className={`block font-sans text-[11px] uppercase tracking-[0.16em] truncate transition-colors duration-500 ${
                    i === current ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {s.title}
                </span>
                {i === current && (
                  <motion.span
                    key={`progress-${current}`}
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: reduce ? 0 : Math.max(autoPlayInterval, 1000) / 1000,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 right-6 h-px bg-[#FF9900] origin-left"
                  />
                )}
              </button>
            ))}
          </div>
          {/* Mobile: quiet gold line indicators */}
          <div className="flex md:hidden items-center gap-2.5 py-5">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className="group py-2"
              >
                <span
                  className={`block h-px transition-all duration-500 ${
                    i === current ? "w-10 bg-[#FF9900]" : "w-6 bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
