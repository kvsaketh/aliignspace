"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Claims below are taken from ALIIGNSPACE's own published copy (services, process, ads landing page).
const PILLARS = [
  {
    title: "Factory-finished modular",
    body: "Every modular unit is cut, edged and finished on high-end imported machinery — no manual compromises on precision.",
  },
  {
    title: "Hettich, Hafele & Blum",
    body: "Premium branded hinges, channels and lift-ups — the gold standard in cabinetry fittings, built to glide for years.",
  },
  {
    title: "Multi-level quality checks",
    body: "Each unit is checked before it leaves our facility and again on site, before it is ever shown to you.",
  },
  {
    title: "A supervisor on site, daily",
    body: "Skilled craftsmen led by a dedicated supervisor, with regular photo updates so you can track every stage.",
  },
  {
    title: "3D to reality",
    body: "What you approve in 3D is what we build. Ask us — we'll show you past renders beside the finished homes.",
  },
];

const IMAGES = [
  { src: "/craft/kitchen-walnut.jpg", alt: "Walnut-finish U-shaped modular kitchen with patterned backsplash" },
  { src: "/craft/bedroom-lit-vanity.jpg", alt: "Bedroom with backlit vanity mirror and textured blue feature wall" },
  { src: "/craft/living-panelled-wall.jpg", alt: "Living room with panelled feature wall and cove lighting" },
  { src: "/craft/bedroom-walnut-wardrobe.jpg", alt: "Bedroom with walnut sliding wardrobe and moulded wall panels" },
];

export function AliignspaceCraftsmanship() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Two image columns travel at different speeds for layered depth.
  const slow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const fast = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -140]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#16141f] py-24 lg:py-36 text-white">
      {/* Soft violet glow for depth */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#4E2585]/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#D4A853]/10 blur-[120px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#D4A853]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E2B866]">The Finish</span>
            </div>
            <h2 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              Luxury lives in the <em className="text-[#E2B866]">last millimetre.</em>
            </h2>
            <p className="mt-6 max-w-xl text-base lg:text-lg leading-relaxed text-white/65">
              Anyone can render a beautiful room. What you feel every day is the finish — flush edges, silent drawers,
              aligned grains and joints you can&rsquo;t find. This is how we make sure of it.
            </p>

            <ol className="mt-12 border-t border-white/10">
              {PILLARS.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-6"
                >
                  <span className="font-serif text-2xl italic text-[#D4A853]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-white transition-colors duration-500 group-hover:text-[#E2B866]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Layered image columns */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 lg:gap-5 self-start lg:sticky lg:top-24">
            <motion.div style={{ y: slow }} className="flex flex-col gap-4 lg:gap-5">
              {[IMAGES[0], IMAGES[2]].map((img) => (
                <div key={img.src} className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                </div>
              ))}
            </motion.div>
            <motion.div style={{ y: fast }} className="mt-16 flex flex-col gap-4 lg:gap-5">
              {[IMAGES[1], IMAGES[3]].map((img) => (
                <div key={img.src} className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
