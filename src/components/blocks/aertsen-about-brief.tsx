"use client";

import { useRef, useEffect, useState } from "react";
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
  images?: string[];
}

/* ------------------------------------------------------------------ */
/*  Count-up number                                                    */
/* ------------------------------------------------------------------ */
function AnimatedNumber({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  const numeric = parseFloat(target);
  const isDecimal = target.includes(".");

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = numeric * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numeric, isDecimal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating images with mouse parallax                                */
/* ------------------------------------------------------------------ */
function FloatingImages({ images }: { images: string[] }) {
  const imageSet = images.slice(0, 3);
  while (imageSet.length < 3) {
    imageSet.push("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80");
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px]">
      {/* Image 1 — large, left */}
      <div className="absolute top-0 left-0 w-[55%] sm:w-[50%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10">
        <Image src={imageSet[0]} alt="Interior 1" fill className="object-cover" sizes="(max-width: 768px) 55vw, 25vw" loading="lazy" />
      </div>

      {/* Image 2 — medium, right, rotated */}
      <div className="absolute top-[12%] right-0 w-[50%] sm:w-[45%] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl z-20 rotate-3">
        <Image src={imageSet[1]} alt="Interior 2" fill className="object-cover" sizes="(max-width: 768px) 50vw, 22vw" loading="lazy" />
      </div>

      {/* Image 3 — small, bottom center, negative rotate */}
      <div className="absolute bottom-[5%] left-[22%] w-[42%] sm:w-[38%] aspect-square rounded-2xl overflow-hidden shadow-lg z-30 -rotate-6">
        <Image src={imageSet[2]} alt="Interior 3" fill className="object-cover" sizes="(max-width: 768px) 42vw, 18vw" loading="lazy" />
      </div>

      {/* Static decorative blobs — CSS only, no JS */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-25 blur-2xl pointer-events-none" style={{ backgroundColor: "rgb(250,202,194)" }} />
      <div className="absolute top-10 -left-10 w-40 h-40 rounded-full opacity-15 blur-2xl pointer-events-none" style={{ backgroundColor: "rgb(255,134,113)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function AertsenAboutBrief({
  label = "Who We Are",
  title = "Designing Homes That",
  accentWord = "Inspire",
  body = [
    "At ALIIGNSPACE, we don't just design interiors — we craft experiences. Every space tells a story, and we're here to help you write yours.",
    "Founded in 2021 by Ar. Samhitha Nagasamudra and Ar. Murali, we bring transparency, quality, and precision to every project across Hyderabad & Nellore.",
  ],
  stats = [
    { number: "50", suffix: "+", label: "Homes" },
    { number: "5", suffix: "+", label: "Years" },
    { number: "2", suffix: "", label: "Cities" },
    { number: "4.9", suffix: "★", label: "Rating" },
  ],
  images = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  ],
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const isTextInView = useInView(textRef, { once: true, margin: "-80px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#f9f7f4" }}
    >
      {/* Ghost text background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-serif text-[clamp(100px,18vw,280px)] font-bold tracking-tighter whitespace-nowrap"
          style={{ color: "#1A1612" }}
        >
          ALIIGNSPACE
        </motion.span>
      </div>

      {/* Static decorative blobs */}
      <div
        className="absolute top-20 right-[10%] w-24 h-24 rounded-full opacity-20 blur-xl pointer-events-none"
        style={{ backgroundColor: "rgb(250,202,194)" }}
      />
      <div className="absolute bottom-40 left-[5%] w-32 h-32 rounded-full opacity-15 blur-xl pointer-events-none" style={{ backgroundColor: "rgb(255,134,113)" }} />
      <div className="absolute top-[40%] left-[45%] w-16 h-16 rounded-full opacity-10 blur-lg pointer-events-none" style={{ backgroundColor: "rgb(255,134,113)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main grid: text left, images right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column — Text */}
          <div ref={textRef}>
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "rgb(255,134,113)" }}
            >
              {label}
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-tight mb-8"
              style={{ color: "#1A1612" }}
            >
              {title}{" "}
              <span
                className="italic bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgb(255,134,113) 0%, rgb(250,202,194) 100%)",
                }}
              >
                {accentWord}
              </span>
            </motion.h2>

            {/* Body paragraphs with stagger */}
            <div className="space-y-5 max-w-lg">
              {body.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-sans text-base sm:text-lg leading-relaxed"
                  style={{ color: "#1A1612", opacity: 0.75 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Animated underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isTextInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[2px] w-24 origin-left"
              style={{
                background: "linear-gradient(90deg, rgb(255,134,113), rgb(250,202,194))",
              }}
            />
          </div>

          {/* Right column — Floating images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <FloatingImages images={images} />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center md:text-left"
            >
              <div
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight"
                style={{ color: "#1A1612" }}
              >
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              </div>
              <p
                className="font-sans text-sm sm:text-base mt-2 tracking-wide uppercase"
                style={{ color: "#1A1612", opacity: 0.5 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AertsenAboutBrief;
