"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight, Play, X, Quote } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface HomeAboutPremiumProps {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  images?: string[];
  quote?: string;
  quoteAuthor?: string;
  stats?: Stat[];
  layout?: "collage" | "split" | "timeline" | "fullwidth";
  showVideo?: boolean;
  videoUrl?: string;
}

// ─── Default Content ───────────────────────────────────────────────────────────

const defaultImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
];

// ─── Animated Counter Component ────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2.5,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.round(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ─── Magnetic Button Component ─────────────────────────────────────────────────

function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    "relative inline-flex items-center justify-center px-8 py-4 font-sans font-medium text-base overflow-hidden group transition-colors duration-300 rounded-sm";

  const variantClasses = {
    primary: "bg-[#1C1917] text-white hover:bg-terracotta-600",
    secondary: "bg-terracotta-500 text-white hover:bg-terracotta-600",
    outline: "border-2 border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white",
  };

  const Component = href ? motion(Link) : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Component
        ref={ref as any}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseClasses} ${variantClasses[variant]}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant !== "outline" && (
          <motion.div
            className="absolute inset-0 bg-terracotta-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </Component>
    </motion.div>
  );
}

// ─── Parallax Image Collage Component ──────────────────────────────────────────

function ParallaxImageCollage({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  // Subtle rotation on scroll
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [2, -4]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const displayImages = images.length >= 3 ? images : defaultImages;

  return (
    <div ref={containerRef} className="relative h-[600px] lg:h-[700px]">
      {/* Main large image - Left */}
      <motion.div
        className="absolute top-0 left-0 w-[58%] h-[72%] overflow-hidden rounded-2xl shadow-2xl z-[3]"
        style={{ y: springY1, rotate: rotate1 }}
        initial={{ opacity: 0, x: -60, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[0]}
          alt="Interior design showcase"
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 35vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
      </motion.div>

      {/* Secondary image - Right Top */}
      <motion.div
        className="absolute top-[8%] right-0 w-[52%] h-[48%] overflow-hidden rounded-2xl shadow-elevated z-[4]"
        style={{ y: springY2, rotate: rotate2 }}
        initial={{ opacity: 0, x: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[1]}
          alt="Interior design detail"
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
      </motion.div>

      {/* Third image - Bottom Right */}
      <motion.div
        className="absolute bottom-0 right-[5%] w-[48%] h-[42%] overflow-hidden rounded-2xl shadow-elevated z-[5]"
        style={{ y: springY3, rotate: rotate3 }}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[2]}
          alt="Interior design project"
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
      </motion.div>

      {/* Decorative frame elements */}
      <motion.div
        className="absolute -bottom-4 -left-4 w-40 h-40 border-l-2 border-b-2 border-terracotta-400/50 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <motion.div
        className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-terracotta-400/50 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />

      {/* Accent dot */}
      <motion.div
        className="absolute top-[5%] left-[55%] w-4 h-4 rounded-full bg-terracotta-500 z-[6]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
      />
    </div>
  );
}

// ─── Stats Component ───────────────────────────────────────────────────────────

function StatsGrid({ stats }: { stats?: Stat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const defaultStats: Stat[] = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Happy Families" },
    { value: 2, suffix: "", label: "Cities" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-3 gap-4 sm:gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {displayStats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-terracotta-500 mb-1">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-500">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Quote Block Component ─────────────────────────────────────────────────────

function QuoteBlock({
  quote,
  author,
  isInView,
}: {
  quote: string;
  author?: string;
  isInView: boolean;
}) {
  return (
    <motion.blockquote
      className="relative my-8"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Large decorative quote mark */}
      <motion.div
        className="absolute -top-6 -left-4 text-terracotta-200 select-none"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
      >
        <Quote className="w-16 h-16 fill-current" />
      </motion.div>

      <div className="relative pl-8 border-l-2 border-terracotta-400">
        <p className="font-serif text-xl sm:text-2xl italic text-stone-700 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {author && (
          <footer className="mt-4 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-terracotta-400" />
            <cite className="font-sans text-sm text-stone-500 not-italic">{author}</cite>
          </footer>
        )}
      </div>
    </motion.blockquote>
  );
}

// ─── Animated Heading Component ────────────────────────────────────────────────

function AnimatedHeading({
  heading,
  accentWord,
  isInView,
}: {
  heading: string;
  accentWord?: string;
  isInView: boolean;
}) {
  const words = heading.split(" ");

  return (
    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C1917] leading-[1.1] mb-6">
      {words.map((word, i) => {
        const isAccent = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());
        return (
          <motion.span
            key={i}
            className={`inline-block mr-[0.3em] ${isAccent ? "italic text-terracotta-500" : ""}`}
            initial={{ opacity: 0, y: 40, rotateX: -30 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.05,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            {word}
          </motion.span>
        );
      })}

      {/* Animated underline */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-terracotta-500 to-terracotta-400 mt-2 origin-left rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      />
    </h2>
  );
}

// ─── Video Modal Component ─────────────────────────────────────────────────────

function VideoModal({
  videoUrl,
  isOpen,
  onClose,
}: {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isOpen && (
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Collage Layout ────────────────────────────────────────────────────────────

function CollageLayout(props: HomeAboutPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="h-[1px] bg-terracotta-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
            {props.label}
          </span>
          <motion.div
            className="h-[1px] bg-terracotta-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        <AnimatedHeading
          heading={props.heading || ""}
          accentWord={props.accentWord}
          isInView={isInView}
        />
      </div>

      {/* Grid with Images and Content */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Images */}
        <ParallaxImageCollage images={props.images || []} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-8"
            dangerouslySetInnerHTML={{ __html: props.content || "" }}
          />

          {props.quote && (
            <QuoteBlock quote={props.quote} author={props.quoteAuthor} isInView={isInView} />
          )}

          {/* Stats */}
          <motion.div
            className="mb-8 p-6 bg-gradient-to-r from-terracotta-50/50 to-transparent rounded-xl border border-terracotta-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <StatsGrid stats={props.stats} />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <MagneticButton href="/about" variant="primary">
              Learn Our Story
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="outline">
              View Our Work
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Split Layout ──────────────────────────────────────────────────────────────

function SplitLayout(props: HomeAboutPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Label */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="h-[1px] bg-terracotta-500 w-8"
                initial={{ width: 0 }}
                animate={isInView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                {props.label}
              </span>
            </motion.div>

            {/* Heading */}
            <AnimatedHeading
              heading={props.heading || ""}
              accentWord={props.accentWord}
              isInView={isInView}
            />

            {/* Content */}
            <motion.div
              className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              dangerouslySetInnerHTML={{ __html: props.content || "" }}
            />

            {/* Quote */}
            {props.quote && (
              <QuoteBlock quote={props.quote} author={props.quoteAuthor} isInView={isInView} />
            )}

            {/* Stats */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              <StatsGrid stats={props.stats} />
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <MagneticButton href="/about" variant="primary">
                Learn Our Story
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Images Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ParallaxImageCollage images={props.images || []} />

              {/* Video play button */}
              {props.showVideo && props.videoUrl && (
                <motion.button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-terracotta-500/90 backdrop-blur-sm flex items-center justify-center text-white shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoOpen(true)}
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {props.videoUrl && (
        <VideoModal videoUrl={props.videoUrl} isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      )}
    </>
  );
}

// ─── Timeline Layout ───────────────────────────────────────────────────────────

function TimelineLayout(props: HomeAboutPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const milestones = [
    { year: "2021", title: "Founded", description: "Started with a vision in Nellore" },
    { year: "2022", title: "First 100 Homes", description: "Milestone achieved with trust" },
    { year: "2023", title: "Expansion", description: "Extended to Hyderabad" },
    { year: "2024", title: "500+ Projects", description: "Trusted by families across AP & TS" },
  ];

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
            {props.label}
          </span>
        </motion.div>

        <AnimatedHeading
          heading={props.heading || ""}
          accentWord={props.accentWord}
          isInView={isInView}
        />
      </div>

      {/* Timeline */}
      <div className="relative mb-20">
        <motion.div
          className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta-500 via-terracotta-300 to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-12 lg:space-y-0">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className={`relative lg:grid lg:grid-cols-2 lg:gap-8`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
            >
              <div
                className={`pl-12 lg:pl-0 ${
                  index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:col-start-2 lg:pl-12"
                }`}
              >
                <span className="text-terracotta-500 font-serif text-2xl font-medium">
                  {milestone.year}
                </span>
                <h3 className="font-serif text-xl text-[#1C1917] mt-2">{milestone.title}</h3>
                <p className="text-stone-600 mt-1">{milestone.description}</p>
              </div>

              <motion.div
                className="absolute left-2 lg:left-1/2 lg:-translate-x-1/2 top-1 w-5 h-5 rounded-full bg-terracotta-500 border-4 border-white shadow-md"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.15, type: "spring" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ParallaxImageCollage images={props.images || []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div
            className="font-sans text-base text-stone-600 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: props.content || "" }}
          />

          {props.quote && <QuoteBlock quote={props.quote} author={props.quoteAuthor} isInView={isInView} />}

          <StatsGrid stats={props.stats} />

          <div className="mt-8">
            <MagneticButton href="/about" variant="primary">
              Learn Our Story
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Full Width Layout ─────────────────────────────────────────────────────────

function FullWidthLayout(props: HomeAboutPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Full width background image */}
      <div className="absolute inset-0 h-[65%] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <Image
            src={props.images?.[0] || defaultImages[0]}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-12 lg:p-16 rounded-2xl shadow-2xl">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                {props.label}
              </span>
            </motion.div>

            <AnimatedHeading
              heading={props.heading || ""}
              accentWord={props.accentWord}
              isInView={isInView}
            />

            <motion.div
              className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              dangerouslySetInnerHTML={{ __html: props.content || "" }}
            />

            {props.quote && (
              <QuoteBlock quote={props.quote} author={props.quoteAuthor} isInView={isInView} />
            )}

            <motion.div
              className="my-8 p-6 bg-gradient-to-r from-terracotta-50/50 to-transparent rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <StatsGrid stats={props.stats} />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <MagneticButton href="/about" variant="primary">
                Learn Our Story
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function HomeAboutPremium({
  label = "About Us",
  heading = "Where Trust Becomes the Foundation",
  accentWord = "Trust",
  content = `<p>We are a young and experienced Interior Design team. Creativity & strategy — it's what drives us.</p>
<p>We are currently operational in both Telugu states — AP & Telangana, bringing dream spaces to life with precision and passion.</p>`,
  images = [],
  quote = "Not lack of options, but lack of trust is the problem.",
  quoteAuthor = "Ar. Samhitha Nagasamudra",
  stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Happy Families" },
    { value: 2, suffix: "", label: "Cities" },
  ],
  layout = "collage",
  showVideo = false,
  videoUrl,
}: HomeAboutPremiumProps) {
  const layoutComponents = {
    collage: CollageLayout,
    split: SplitLayout,
    fullwidth: FullWidthLayout,
    timeline: TimelineLayout,
  };

  const LayoutComponent = layoutComponents[layout] || CollageLayout;

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream-100/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta-50/50 rounded-full blur-3xl pointer-events-none" />

      <LayoutComponent
        label={label}
        heading={heading}
        accentWord={accentWord}
        content={content}
        images={images}
        quote={quote}
        quoteAuthor={quoteAuthor}
        stats={stats}
        layout={layout}
        showVideo={showVideo}
        videoUrl={videoUrl}
      />
    </section>
  );
}

export default HomeAboutPremium;
