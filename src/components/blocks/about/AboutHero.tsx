"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AboutHeroProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
}

export function AboutHero({
  heading = "About Aliignspace",
  subheading = "Our Core team is specialised in interiors with 10 years of experience",
  backgroundImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
}: AboutHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="About Aliignspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          className="inline-block text-terracotta-400 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Who We Are
        </motion.span>
        
        <motion.h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {heading}
        </motion.h1>
        
        <motion.p
          className="font-sans text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
}
