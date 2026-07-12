"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Service {
  number: string;
  title: string;
  description: string;
  icon?: string; // legacy prop, kept so existing CMS section props keep working
  image?: string;
  link?: string;
}

interface Props {
  label?: string;
  title?: string;
  subtitle?: string;
  accentWord?: string;
  services?: Service[];
}

// ponytail: index-based fallback so panels always have photography
const fallbackImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
];

const defaultServices: Service[] = [
  {
    number: "01",
    title: "Full Home Interiors",
    description: "Complete home transformations from 2BHK apartments to luxury villas, tailored to your lifestyle.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    link: "/services/full-home-interiors",
  },
  {
    number: "02",
    title: "Modular Kitchen",
    description: "Smart, stylish kitchens designed for efficiency with premium materials and finishes.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
    link: "/services/modular-kitchen",
  },
  {
    number: "03",
    title: "Living Room Interiors",
    description: "Elegant living rooms that balance comfort with sophisticated aesthetics.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80",
    link: "/services/living-room-interiors",
  },
  {
    number: "04",
    title: "Bedroom Interiors",
    description: "Serene sanctuaries crafted for rest, relaxation, and personal expression.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    link: "/services/bedroom-interiors",
  },
  {
    number: "05",
    title: "Wardrobe Design",
    description: "Bespoke wardrobe solutions that maximize space while reflecting your personal style.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200&q=80",
    link: "/services/wardrobe-design",
  },
  {
    number: "06",
    title: "Luxury Furniture",
    description: "Handcrafted luxury furniture pieces that add character and elegance to every room.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80",
    link: "/services/luxury-furniture",
  },
];

export function AliignspaceServicesGrid({
  label = "What We Do",
  title = "Our",
  subtitle = "Comprehensive interior solutions for every space and style",
  accentWord = "Services",
  services = defaultServices,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-[#F6F5FB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#7A22FF] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#16141f]">
            {title} <span className="text-[#7A22FF]">{accentWord}</span>
          </h2>
          <p className="mt-4 font-sans text-[#16141f]/60">{subtitle}</p>
        </motion.div>

        {/* Desktop: expanding photographic panels */}
        <div className="hidden lg:flex gap-3 h-[600px]">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={service.number}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(i)}
                className={`relative basis-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isActive ? "grow-[2.5]" : "grow"
                }`}
              >
                <Link
                  href={service.link || "/services"}
                  onFocus={() => setActive(i)}
                  className="group absolute inset-0 flex flex-col justify-end p-8 outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-inset"
                >
                  <Image
                    src={service.image || fallbackImages[i % fallbackImages.length]}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className={`object-cover transition-transform duration-[1200ms] motion-reduce:transition-none ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#16141f]/80 via-[#16141f]/25 to-transparent" />
                  <div className="relative">
                    <span className="font-sans text-xs tracking-[0.2em] text-white/75">{service.number}</span>
                    <h3 className="mt-2 font-serif text-2xl text-white">{service.title}</h3>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 delay-100 motion-reduce:transition-none ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-white/80">
                          {service.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-medium text-white">
                          Explore
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / tablet: stacked photographic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-80 overflow-hidden rounded-2xl"
            >
              <Link href={service.link || "/services"} className="group absolute inset-0 flex flex-col justify-end p-6">
                <Image
                  src={service.image || fallbackImages[i % fallbackImages.length]}
                  alt={service.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#16141f]/85 via-[#16141f]/30 to-transparent" />
                <div className="relative">
                  <span className="font-sans text-xs tracking-[0.2em] text-white/75">{service.number}</span>
                  <h3 className="mt-1 font-serif text-xl text-white">{service.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-medium text-white">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
