"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface HeroCleanProps {
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  image?: string;
  showVideoButton?: boolean;
  videoUrl?: string;
}

export function HeroClean({
  heading = "Crafting Spaces",
  subheading = "That Inspire",
  description = "We transform houses into dream homes with thoughtful design, quality craftsmanship, and a personal touch that reflects your unique style.",
  buttonText = "Start Your Project",
  buttonUrl = "/contact",
  secondaryButtonText = "View Portfolio",
  secondaryButtonUrl = "/portfolio",
  image = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
  showVideoButton = true,
  videoUrl,
}: HeroCleanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#fafafa] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C1917 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-24 lg:py-0">
          
          {/* Left Content */}
          <motion.div
            className="order-2 lg:order-1"
            style={{ opacity: contentOpacity }}
          >
            {/* Label */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-terracotta-500">
                Interior Design Studio
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-[#1C1917] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heading}
              <span className="block text-terracotta-500 italic">{subheading}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href={buttonUrl}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] text-white text-sm font-medium hover:bg-terracotta-500 transition-colors duration-300"
              >
                {buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={secondaryButtonUrl}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C1917] text-[#1C1917] text-sm font-medium hover:bg-[#1C1917] hover:text-white transition-colors duration-300"
              >
                {secondaryButtonText}
              </Link>

              {showVideoButton && (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-terracotta-500 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-terracotta-500">
                    <Play className="w-4 h-4 fill-current" />
                  </span>
                  Watch Showreel
                </button>
              )}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex items-center gap-8 mt-12 pt-8 border-t border-stone-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { value: "50+", label: "Projects" },
                { value: "5+", label: "Years" },
                { value: "4.9", label: "Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src={image}
                  alt="Interior Design"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                Established
              </div>
              <div className="text-3xl font-serif font-medium text-[#1C1917]">
                2021
              </div>
            </motion.div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-terracotta-500/30 rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-stone-400 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-stone-300"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

export default HeroClean;
