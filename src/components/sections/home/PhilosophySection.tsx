"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Palette, CheckCircle2, Heart } from "lucide-react";

const principles = [
  {
    number: "01",
    icon: Eye,
    title: "Transparency over promises",
    description:
      "Every estimate explained. Every timeline in writing, not just in words.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Cleaner design, sharper thinking",
    description:
      "Every element earns its place — in the budget, in the room, in your life.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Render to reality, always",
    description:
      "What you approve is what you get. No surprises at handover.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Your happiness is the metric",
    description:
      "We measure success by how much you love the space we leave behind.",
  },
];



export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #E07A5F 0%, #D4765F 100%)" }}
    >
      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-3 text-cream-100/80 text-sm font-label tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-[2px] bg-cream-100/60" />
            Design Philosophy
            <span className="w-8 h-[2px] bg-cream-100/60" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-cream-50 leading-[1.1] tracking-tight">
            How we think before we build
          </h2>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/15 hover:shadow-elevated hover:-translate-y-1 transition-all duration-500 border border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-coral-500/30 transition-colors duration-300">
                    <principle.icon className="w-5 h-5 text-cream-100" />
                  </div>
                </div>
                <div>
                  <span className="text-cream-100/40 text-xs font-label tracking-wider uppercase">
                    Principle {principle.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-medium text-cream-50 mt-1 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-cream-100/70 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-xl sm:text-2xl font-serif italic text-cream-100/90">
            &ldquo;A team that listens first, designs after.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
