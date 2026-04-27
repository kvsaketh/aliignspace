"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Home, UtensilsCrossed, Sofa, BedDouble, Briefcase, Gem } from "lucide-react";

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
};

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

export function AertsenServicesGrid({
  label = "What We Do",
  title = "Our",
  subtitle = "Comprehensive interior solutions for every space and style",
  accentWord = "Services",
  services = defaultServices,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-[#f9f7f4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[rgb(255,134,113)] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1612]">
            {title}{" "}
            <span className="text-[rgb(255,134,113)]">{accentWord}</span>
          </h2>
          <p className="mt-4 font-sans text-[#1A1612]/60 max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || ""] || Home;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={service.link || "#"}
                  className="group relative block bg-white rounded-xl p-8 shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Number */}
                  <span className="font-serif italic text-5xl text-[#1A1612]/10 absolute top-6 right-6">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-[#f9f7f4] flex items-center justify-center mb-6 group-hover:bg-[rgb(255,134,113)]/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[rgb(255,134,113)]" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl text-[#1A1612] mb-3">{service.title}</h3>
                  <p className="font-sans text-sm text-[#1A1612]/60 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center gap-2 font-sans text-sm text-[rgb(255,134,113)] group-hover:text-[#D46546] transition-colors">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Bottom gradient line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[rgb(255,134,113)] to-[rgb(250,202,194)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
