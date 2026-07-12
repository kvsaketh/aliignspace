"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

const comparisons = [
  {
    id: 1,
    before:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format",
    after:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format",
    label: "Living Room Transformation",
  },
  {
    id: 2,
    before:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format",
    after:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format",
    label: "Bedroom Makeover",
  },
  {
    id: 3,
    before:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format",
    after:
      "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?q=80&w=800&auto=format",
    label: "Kitchen Redesign",
  },
  {
    id: 4,
    before:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format",
    after:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=800&auto=format",
    label: "Dining Space",
  },
];

function BeforeAfterSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none group"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt={`${label} - After`}
        className="w-full aspect-[4/3] object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${label} - Before`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <MoveHorizontal className="w-4 h-4 text-charcoal" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal/70 text-white text-xs font-label tracking-wider uppercase rounded-full">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-coral-500 text-white text-xs font-label tracking-wider uppercase rounded-full">
        After
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/60 to-transparent">
        <p className="text-white font-medium text-sm">{label}</p>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center">
            <span>Render to Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight mb-4">
            What you approve is what you get
          </h2>
          <p className="text-slate-500 text-lg">No surprises at handover.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                label={item.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
