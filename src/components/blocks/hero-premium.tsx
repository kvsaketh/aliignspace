"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronDown, Play, Pause } from "lucide-react";

interface HeroPremiumProps {
  heading?: string;
  accentWord?: string;
  subheading?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  image?: string;
  videoUrl?: string;
}

// Animated text reveal component
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Particle field component - client only to avoid hydration mismatch
function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Check if mobile for performance
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!mounted || isMobile) return null; // Disable particles on mobile for performance
  
  // Generate stable random values after mount
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
  
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-terracotta-400/30 rounded-full"
          initial={{ 
            x: `${p.x}%`, 
            y: `${p.y}%`,
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Magnetic button component
function MagneticButton({ children, href, variant = "primary" }: { children: React.ReactNode; href: string; variant?: "primary" | "secondary" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
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

  return (
    <motion.div style={{ x: isTouch ? 0 : springX, y: isTouch ? 0 : springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-sans font-medium text-sm sm:text-base overflow-hidden group w-full sm:w-auto ${
          variant === "primary"
            ? "bg-terracotta-500 text-white hover:bg-terracotta-600"
            : "border border-white/60 text-white hover:bg-white/10"
        } transition-colors duration-300`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-terracotta-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export function HeroPremium({
  heading = "Design That Feels Like You",
  accentWord = "Feels",
  subheading = "Every home is personal. We design spaces that reflect your lifestyle.",
  buttonText = "Get Free Consultation",
  buttonUrl = "/contact",
  secondaryButtonText = "View Our Work",
  secondaryButtonUrl = "/portfolio",
  image = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
  videoUrl,
}: HeroPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Split heading for accent
  const headingParts = heading.split(accentWord);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1917]"
    >
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <Image
          src={image}
          alt="ALIIGNSPACE — Premium Interior Design"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>

      {/* Animated particles/dots - client only to avoid hydration mismatch */}
      <ParticleField />

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          {/* Label with line animation */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="h-[1px] bg-terracotta-400 hidden sm:block"
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <span className="text-terracotta-400 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
              Est. 2021 · Hyderabad & Nellore
            </span>
          </motion.div>

          {/* Main Heading with Animated Text */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] mb-6 sm:mb-8">
            {headingParts[0] && (
              <AnimatedText text={headingParts[0]} delay={0.3} />
            )}
            {accentWord && (
              <motion.em
                className="not-italic text-terracotta-400 italic inline-block"
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                style={{
                  x: mousePosition.x * 0.5,
                  y: mousePosition.y * 0.5,
                }}
              >
                {accentWord}
              </motion.em>
            )}
            {headingParts[1] && (
              <AnimatedText text={headingParts[1]} delay={0.8} />
            )}
          </h1>

          {/* Subheading */}
          <motion.p
            className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light mb-8 sm:mb-12 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton href={buttonUrl} variant="primary">
              {buttonText}
            </MagneticButton>
            <MagneticButton href={secondaryButtonUrl} variant="secondary">
              {secondaryButtonText}
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center gap-6 sm:gap-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[
              { value: "50+", label: "Homes Transformed" },
              { value: "4.9★", label: "Google Rating" },
              { value: "60-90", label: "Day Delivery" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
              >
                <div className="font-serif text-lg sm:text-xl lg:text-2xl text-terracotta-400 font-medium">
                  {stat.value}
                </div>
                <div className="font-sans text-[10px] sm:text-xs text-white/60 mt-1 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Video Play Button (if video URL provided) */}
      {videoUrl && (
        <motion.button
          className="absolute bottom-32 right-8 lg:right-16 z-20 w-16 h-16 rounded-full bg-terracotta-500/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-terracotta-500 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
        >
          {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </motion.button>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroPremium;
