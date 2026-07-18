"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Home, UtensilsCrossed, Sofa, BedDouble, Briefcase, Gem, Building2, Hammer } from "lucide-react";

interface Service {
  number: string;
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

interface Props {
  label?: string;
  title?: string;
  subtitle?: string;
  accentWord?: string;
  services?: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  utensils: UtensilsCrossed,
  sofa: Sofa,
  bed: BedDouble,
  briefcase: Briefcase,
  gem: Gem,
  building: Building2,
  hammer: Hammer,
};

// Per-card accent scheme drawn from the logo palette (blue → violet → amber)
const cardAccents = [
  { from: "#3b4fea", to: "#8b5cd8", soft: "rgba(59,79,234,0.10)" },
  { from: "#8b5cd8", to: "#f2a03c", soft: "rgba(139,92,216,0.10)" },
  { from: "#f2a03c", to: "#8b5cd8", soft: "rgba(242,160,60,0.14)" },
  { from: "#3b4fea", to: "#f2a03c", soft: "rgba(59,79,234,0.10)" },
];

const defaultServices: Service[] = [
  {
    number: "01",
    title: "Full Home Interiors",
    description: "Complete home transformations from 2BHK apartments to luxury villas, tailored to your lifestyle.",
    icon: "home",
    link: "/services/full-home-interiors",
  },
  {
    number: "02",
    title: "Modular Kitchen",
    description: "Smart, stylish kitchens designed for efficiency with premium materials and finishes.",
    icon: "utensils",
    link: "/services/modular-kitchen",
  },
  {
    number: "03",
    title: "Living Room Interiors",
    description: "Elegant living rooms that balance comfort with sophisticated aesthetics.",
    icon: "sofa",
    link: "/services/living-room-interiors",
  },
  {
    number: "04",
    title: "Bedroom Interiors",
    description: "Serene sanctuaries crafted for rest, relaxation, and personal expression.",
    icon: "bed",
    link: "/services/bedroom-interiors",
  },
  {
    number: "05",
    title: "Wardrobe Design",
    description: "Bespoke wardrobe solutions that maximize space while reflecting your personal style.",
    icon: "briefcase",
    link: "/services/wardrobe-design",
  },
  {
    number: "06",
    title: "Luxury Furniture",
    description: "Handcrafted luxury furniture pieces that add character and elegance to every room.",
    icon: "gem",
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

  return (
    <section className="py-24 lg:py-32 bg-[#f7f5fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#8b5cd8] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#16141f]">
            {title}{" "}
            <span className="text-[#8b5cd8]">{accentWord}</span>
          </h2>
          <p className="mt-4 font-sans text-[#16141f]/60 max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Grid — clean 2×2 of equal-height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || ""] || Home;
            const a = cardAccents[i % cardAccents.length];
            return (
              <motion.div
                key={service.number}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={service.link || "#"}
                  className="group relative flex h-full flex-col bg-white rounded-2xl p-8 border border-[#16141f]/[0.06] shadow-[0_4px_20px_rgba(20,17,34,0.05)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(20,17,34,0.14)]"
                >
                  {/* Soft accent glow (appears on hover) */}
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: a.soft }}
                  />

                  {/* Top row: gradient icon badge + big number */}
                  <div className="relative flex items-start justify-between mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span
                      className="font-serif italic text-6xl leading-none bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${a.from}, ${a.to})`, opacity: 0.18 }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="relative font-serif text-2xl text-[#16141f] mb-3">{service.title}</h3>
                  <p className="relative font-sans text-sm text-[#16141f]/60 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link pinned to the bottom so every card matches */}
                  <span
                    className="relative mt-auto pt-6 inline-flex items-center gap-2 font-sans text-sm font-medium"
                    style={{ color: a.from }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </span>

                  {/* Bottom gradient line on hover */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
