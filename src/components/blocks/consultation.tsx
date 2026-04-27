"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Phone, Sparkles } from "lucide-react";

interface ConsultationProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

// Magnetic button component
function MagneticButton({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center gap-2 bg-[#D46546] hover:bg-[#c44d32] disabled:opacity-60 text-white font-sans font-semibold text-sm px-8 py-4 transition-all duration-300 whitespace-nowrap overflow-hidden group"
    >
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%", skewX: -15 }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

// Animated input with focus effects
function AnimatedInput({
  type,
  placeholder,
  value,
  onChange,
  required,
  delay = 0,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  delay?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div
      className="relative flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 font-sans text-sm px-5 py-4 focus:outline-none transition-all duration-300"
        style={{
          borderColor: isFocused ? "#D46546" : "rgba(255,255,255,0.2)",
          boxShadow: isFocused ? "0 0 20px rgba(212, 101, 70, 0.3)" : "none",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#D46546]"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function ConsultationBlock({
  title = "Start Your Interior Journey",
  subtitle = "Talk to our design team — no commitments, just a conversation about your dream space.",
  backgroundImage,
}: ConsultationProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", phone: "" });
  };

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 overflow-hidden bg-[#1C1917]">
      {/* Animated background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
      )}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D46546]/10 rounded-full blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D46546]/5 rounded-full blur-[100px]"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Terracotta gradient wash */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#D46546]/20 via-transparent to-transparent" />

      {/* Decorative circle accents */}
      <motion.div
        className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full border border-[#D46546]/10 z-[1]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full border border-[#D46546]/10 z-[1]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label with sparkle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-[#D46546]" />
            </motion.div>
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546]">
              Free Consultation
            </span>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-[#D46546]" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-5 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-base sm:text-lg text-white/70 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Form or Success */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {submitted ? (
              <motion.div
                className="bg-white/5 border border-white/10 p-8 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-[#D46546]" />
                </motion.div>
                <h3 className="font-serif text-xl text-white">
                  We&apos;ll Call You Back!
                </h3>
                <p className="font-sans text-sm text-white/60">
                  Our team will reach out within 24 hours. Get ready to see your dream space come alive.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <AnimatedInput
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  delay={0.5}
                />
                <AnimatedInput
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  delay={0.6}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <MagneticButton disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Sending...
                      </motion.span>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        Request Callback
                      </>
                    )}
                  </MagneticButton>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Trust signals */}
          {!submitted && (
            <motion.div
              className="flex items-center justify-center gap-4 mt-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              {["Free consultation", "No commitment", "24hr response"].map((text, i) => (
                <motion.span
                  key={i}
                  className="font-sans text-xs text-white/40 tracking-wide flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#D46546]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {text}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
