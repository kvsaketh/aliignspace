"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Users,
  Gem,
  Clock,
  Palette,
  ShieldCheck,
  HeartHandshake,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight: string;
  stat?: string;
  statLabel?: string;
}

interface WhyChooseUsPremiumProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  founderImage?: string;
  features?: Feature[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  gem: Gem,
  clock: Clock,
  palette: Palette,
  "shield-check": ShieldCheck,
  "heart-handshake": HeartHandshake,
  award: Award,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
};

// Premium 3D Card with Glassmorphism
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Icon = iconMap[feature.icon] || Sparkles;

  return (
    <motion.div
      ref={ref}
      className="relative h-full"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div
        className="relative h-full p-6 sm:p-8 rounded-3xl overflow-hidden cursor-pointer group"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-black/5" />
        
        {/* Hover Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-terracotta-500/10 via-transparent to-cream-100/50 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? "inset 0 0 0 2px rgba(212, 101, 70, 0.3), 0 20px 40px -15px rgba(212, 101, 70, 0.2)"
              : "inset 0 0 0 1px rgba(255,255,255,0.5), 0 4px 20px -5px rgba(0,0,0,0.05)"
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Top Row - Icon & Highlight */}
          <div className="flex items-start justify-between mb-6">
            {/* Animated Icon Container */}
            <motion.div
              className="relative"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-lg shadow-terracotta-500/30">
                <Icon className="w-8 h-8 text-white" />
              </div>
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-2 bg-terracotta-500/30 rounded-2xl blur-xl"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Highlight Badge */}
            <motion.div
              className="px-3 py-1.5 rounded-full bg-terracotta-500/10 border border-terracotta-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className="text-terracotta-600 text-xs font-semibold tracking-wide">
                {feature.highlight}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1917] mb-3 group-hover:text-terracotta-600 transition-colors duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-stone-600 leading-relaxed mb-6">
            {feature.description}
          </p>

          {/* Stat (if exists) */}
          {feature.stat && (
            <motion.div
              className="flex items-baseline gap-2 pt-4 border-t border-stone-200/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <span className="font-serif text-3xl font-medium text-terracotta-500">
                {feature.stat}
              </span>
              <span className="text-stone-500 text-sm">
                {feature.statLabel}
              </span>
            </motion.div>
          )}
        </div>

        {/* Bottom Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta-500 to-terracotta-400 rounded-b-3xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated Counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      className="font-serif text-6xl sm:text-7xl lg:text-8xl font-medium text-terracotta-500"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export function WhyChooseUsPremium({
  title = "The ALIIGNSPACE Difference",
  subtitle = "Why discerning homeowners choose us",
  eyebrow = "Why Choose Us",
  description = "We don't just design spaces; we craft experiences that transform houses into homes you'll love for years to come.",
  quote = "Our Core team is specialised in interiors with 10 years of experience. Creativity & strategy — it's what drives us.",
  quoteAuthor = "Ar. Samhitha Nagasamudra",
  quoteRole = "Founder & Principal Designer",
  founderImage,
  features = [],
}: WhyChooseUsPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const defaultFeatures: Feature[] = [
    {
      icon: "users",
      title: "Expert Design Team",
      description: "Award-winning architects and interior designers with years of experience crafting luxury spaces.",
      highlight: "5+ Years",
      stat: "10+",
      statLabel: "Design Experts",
    },
    {
      icon: "gem",
      title: "Premium Materials",
      description: "Hand-picked, certified materials sourced directly from trusted global suppliers for lasting elegance.",
      highlight: "Certified",
      stat: "100%",
      statLabel: "Quality Assured",
    },
    {
      icon: "clock",
      title: "On-Time Delivery",
      description: "Our streamlined process ensures your dream space is ready within the promised timeline, every time.",
      highlight: "Guaranteed",
      stat: "98%",
      statLabel: "On-Time Rate",
    },
    {
      icon: "palette",
      title: "Bespoke Designs",
      description: "Every design is uniquely tailored to reflect your personality, lifestyle, and aspirations.",
      highlight: "100% Unique",
      stat: "50+",
      statLabel: "Custom Projects",
    },
    {
      icon: "shield-check",
      title: "Total Transparency",
      description: "Complete cost breakdown with no hidden charges. What you see is exactly what you pay.",
      highlight: "No Hidden Costs",
      stat: "0",
      statLabel: "Hidden Fees",
    },
    {
      icon: "heart-handshake",
      title: "Lifetime Support",
      description: "Our relationship doesn't end at handover. Dedicated support for all your maintenance needs.",
      highlight: "Always",
      stat: "24/7",
      statLabel: "Support",
    },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 bg-cream-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Decorative Circle */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-terracotta-200/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-terracotta-300/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradient Blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-terracotta-200/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cream-300/50 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.3em] uppercase">
                {eyebrow}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-stone-600 font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-stone-500 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>

            {/* Quote Block */}
            <motion.div
              className="relative pl-6 border-l-2 border-terracotta-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="font-serif text-lg italic text-stone-600 leading-relaxed mb-4">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {founderImage && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-terracotta-400">
                    <Image
                      src={founderImage}
                      alt={quoteAuthor}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-[#1C1917] text-sm">{quoteAuthor}</p>
                  <p className="text-stone-500 text-xs">{quoteRole}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Visual Element */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Circle */}
              <motion.div
                className="w-80 h-80 rounded-full bg-gradient-to-br from-terracotta-100 to-cream-200 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 60px rgba(212, 101, 70, 0.2)",
                    "0 0 100px rgba(212, 101, 70, 0.3)",
                    "0 0 60px rgba(212, 101, 70, 0.2)",
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-center">
                  <AnimatedNumber value={5} suffix="+" />
                  <p className="text-stone-600 font-medium mt-2">Years of Excellence</p>
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-terracotta-500" />
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Gem className="w-6 h-6 text-terracotta-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-white font-sans font-medium rounded-full hover:bg-terracotta-500 transition-colors duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
            <motion.span
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUsPremium;
