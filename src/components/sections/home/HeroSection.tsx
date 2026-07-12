"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format')`,
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-label tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
              Premium Home Interiors • Hyderabad & Nellore
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6"
          >
            Spaces Crafted with{" "}
            <em className="text-coral-400 not-italic">Trust</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/80 font-sans max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Cleaner designs. Sharper strategies. Spaces that become homes.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-coral-500 text-white text-sm font-semibold rounded-xl hover:bg-coral-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats / Infographic Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10">
            {[
              { value: "150+", label: "Homes Transformed" },
              { value: "4.9★", label: "Google Rating" },
              { value: "60-90", label: "Day Delivery" },
              { value: "5★", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                className="bg-charcoal/40 px-4 py-5 sm:py-6 text-center"
              >
                <div className="text-xl sm:text-2xl font-serif font-medium text-coral-400">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-white/60 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal/60 to-transparent z-10" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
