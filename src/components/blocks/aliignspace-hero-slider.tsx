"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

// Real service lines, run as a kinetic type band (not decorative filler).
const MARQUEE_ITEMS = [
  "Full Home Interiors",
  "Modular Kitchens",
  "Living Rooms",
  "Wardrobes & Storage",
  "Villas",
  "Commercial Spaces",
  "Renovations",
];

/* Magnetic CTA — pointer-driven via motion values, never React state (no re-renders). */
function MagneticCTA({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center gap-2.5 rounded-full bg-[#0055FF] px-8 py-4 font-sans text-sm font-medium text-white hover:bg-[#0043CC] active:scale-[0.98] transition-colors duration-300"
    >
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

export function AliignspaceHeroSlider({ slides = defaultSlides, autoPlayInterval = 7000 }: Props) {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0 || slides.length < 2) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, next, slides.length]);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#16141f]">
      {/* Restrained brand-purple depth wash */}
      <div className="pointer-events-none absolute -top-40 right-[6%] w-[560px] h-[560px] rounded-full bg-[#7A22FF]/12 blur-[150px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6 pt-28 pb-28 lg:pb-24">
        {/* Left: editorial statement */}
        <div className="lg:col-span-6 relative z-10 lg:pr-8">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-12 h-px bg-[#FF9900]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#FF9900]">
              Interior Design Studio
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={current} exit={{ opacity: 0, transition: { duration: 0.35 } }}>
              <div className="overflow-hidden">
                <motion.h1
                  initial={reduce ? false : { y: "103%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.06] pb-1"
                >
                  {slide.title}
                </motion.h1>
              </div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-sans text-base sm:text-lg text-white/70 leading-relaxed max-w-md"
              >
                {slide.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <MagneticCTA href="/contact">Book a Consultation</MagneticCTA>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              View Portfolio
              <span className="block w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
            </Link>
          </motion.div>

          {/* Slide indicators, inline with the content */}
          <div className="mt-12 flex items-center gap-2.5">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className="group py-2"
              >
                <span
                  className={`block h-px transition-all duration-500 ${
                    i === current ? "w-10 bg-white" : "w-6 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: layered image with Ken Burns drift */}
        <div className="lg:col-span-6 relative lg:pl-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: reduce ? 1 : 1.08 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.1, ease: "easeInOut" },
                  scale: { duration: 9, ease: "linear" },
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
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            {/* Soft bottom fade so the frame melts into the section */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#16141f]/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Kinetic marquee of real service lines — the motion signature */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 py-5 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center">
                  <span
                    className="font-serif italic text-xl sm:text-2xl text-transparent px-6"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                  >
                    {item}
                  </span>
                  <span className="text-[#FF9900] text-xs">&#9670;</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
