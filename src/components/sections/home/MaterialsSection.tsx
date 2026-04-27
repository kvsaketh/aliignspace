"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const materials = [
  { name: "Laminate Suede finish", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format" },
  { name: "Laminate Glossy finish", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format" },
  { name: "Fluted panel, CNIS", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format" },
  { name: "Phantom, Quartz", image: "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?q=80&w=400&auto=format" },
  { name: "Veneer with glossy polish", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=400&auto=format" },
  { name: "SS T-gold beadings", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=400&auto=format" },
  { name: "Tinted glass with profiles", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=400&auto=format" },
  { name: "Atomberg Fans", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=400&auto=format" },
  { name: "Panasonic Lights", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=400&auto=format" },
];

const styles = [
  { name: "Warm & Earthly", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format" },
  { name: "Minimal & Modern", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format" },
  { name: "Classic Indian", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format" },
  { name: "Contemporary Luxury", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format" },
];

export function MaterialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center">
            <span>Materials & Finishes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight">
            Only the finest touches
          </h2>
        </motion.div>

        {/* Materials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {materials.map((material, index) => (
              <motion.div
                key={material.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex-shrink-0 w-48 snap-start group"
              >
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
                <p className="text-sm font-medium text-charcoal text-center">
                  {material.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design Styles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-serif font-medium text-charcoal text-center mb-8">
            Our Design Styles
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {styles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-serif font-medium text-lg">
                    {style.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
