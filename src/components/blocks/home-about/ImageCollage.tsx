"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ImageCollageProps {
  images: string[];
  layout?: "overlapping" | "masonry" | "grid";
}

export function ImageCollage({ 
  images, 
  layout = "overlapping" 
}: ImageCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for each image
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  // Rotation transforms for subtle movement
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [2, -2]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [-1, 3]);

  const defaultImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  ];

  const displayImages = images.length >= 3 ? images : defaultImages;

  if (layout === "masonry") {
    return (
      <div ref={containerRef} className="relative h-[600px] lg:h-[700px]">
        <motion.div 
          className="absolute top-0 left-0 w-[55%] h-[65%] overflow-hidden rounded-sm shadow-elevated"
          style={{ y: springY1, rotate: rotate1 }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[0]}
            alt="Interior design showcase 1"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        <motion.div 
          className="absolute top-[20%] right-0 w-[50%] h-[50%] overflow-hidden rounded-sm shadow-elevated z-[2]"
          style={{ y: springY2, rotate: rotate2 }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[1]}
            alt="Interior design showcase 2"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        <motion.div 
          className="absolute bottom-0 left-[15%] w-[45%] h-[45%] overflow-hidden rounded-sm shadow-elevated z-[3]"
          style={{ y: springY3, rotate: rotate3 }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[2]}
            alt="Interior design showcase 3"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Decorative frame */}
        <div className="absolute -bottom-4 -left-4 w-32 h-32 border-l-2 border-b-2 border-terracotta-300/50" />
        <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-terracotta-300/50" />
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div ref={containerRef} className="grid grid-cols-2 gap-4 h-[500px]">
        <motion.div 
          className="row-span-2 relative overflow-hidden rounded-sm shadow-elevated"
          style={{ y: springY1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[0]}
            alt="Interior design showcase 1"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
        <motion.div 
          className="relative overflow-hidden rounded-sm shadow-elevated"
          style={{ y: springY2 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[1]}
            alt="Interior design showcase 2"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
        <motion.div 
          className="relative overflow-hidden rounded-sm shadow-elevated"
          style={{ y: springY3 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={displayImages[2]}
            alt="Interior design showcase 3"
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
      </div>
    );
  }

  // Default overlapping layout
  return (
    <div ref={containerRef} className="relative h-[550px] lg:h-[650px]">
      {/* Background decorative shape */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-cream-100/50 rounded-full blur-3xl"
        style={{ y: springY1 }}
      />
      
      {/* Main large image - Left */}
      <motion.div 
        className="absolute top-0 left-0 w-[60%] h-[70%] overflow-hidden rounded-sm shadow-2xl z-[3]"
        style={{ y: springY1, rotate: rotate1 }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[0]}
          alt="Interior design showcase 1"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 35vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Subtle border */}
        <div className="absolute inset-0 border border-white/10 rounded-sm" />
      </motion.div>

      {/* Secondary image - Right Top (overlapping) */}
      <motion.div 
        className="absolute top-[10%] right-0 w-[55%] h-[50%] overflow-hidden rounded-sm shadow-elevated z-[4]"
        style={{ y: springY2, rotate: rotate2 }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[1]}
          alt="Interior design showcase 2"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-sm" />
      </motion.div>

      {/* Third image - Bottom Center */}
      <motion.div 
        className="absolute bottom-0 left-[20%] w-[50%] h-[45%] overflow-hidden rounded-sm shadow-elevated z-[5]"
        style={{ y: springY3, rotate: rotate3 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 1.03, zIndex: 20 }}
      >
        <Image
          src={displayImages[2]}
          alt="Interior design showcase 3"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-sm" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute -bottom-6 -left-6 w-40 h-40 border-l-2 border-b-2 border-terracotta-400/40 z-0"
        style={{ y: springY1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.div 
        className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-terracotta-400/40 z-0"
        style={{ y: springY2 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />

      {/* Accent dot */}
      <motion.div 
        className="absolute top-[5%] left-[55%] w-4 h-4 rounded-full bg-terracotta-500 z-[6]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
      />
    </div>
  );
}
