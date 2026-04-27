"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Home, UtensilsCrossed, Sofa, BedDouble, Briefcase, Building2 } from "lucide-react";

interface Service {
  title: string;
  description: string;
  image?: string;
  link?: string;
  icon?: string;
}

interface ServicesCleanProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  utensils: UtensilsCrossed,
  sofa: Sofa,
  bed: BedDouble,
  briefcase: Briefcase,
  building: Building2,
};

const defaultServices: Service[] = [
  {
    title: "Full Home Interiors",
    description: "Complete transformation of your living spaces with custom designs that reflect your personality.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    link: "/services/home-interiors",
    icon: "home",
  },
  {
    title: "Modular Kitchen",
    description: "Smart, functional kitchens with premium finishes and intelligent storage solutions.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    link: "/services/modular-kitchen",
    icon: "utensils",
  },
  {
    title: "Living Room",
    description: "Elegant living spaces designed for comfort, conversation, and lasting impressions.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    link: "/services/living-room",
    icon: "sofa",
  },
  {
    title: "Bedroom Design",
    description: "Serene retreats crafted for rest, relaxation, and rejuvenation.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    link: "/services/bedroom",
    icon: "bed",
  },
  {
    title: "Office Interiors",
    description: "Productive workspaces that inspire creativity and reflect your brand.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    link: "/services/office-interiors",
    icon: "briefcase",
  },
  {
    title: "Commercial",
    description: "High-impact retail and commercial spaces designed to attract and engage.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    link: "/services/commercial",
    icon: "building",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon ? iconMap[service.icon] : null;
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={service.link || "#"} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-stone-100">
          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Arrow Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-5 h-5 text-[#1C1917]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-terracotta-50 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-terracotta-500" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-[#1C1917] group-hover:text-terracotta-500 transition-colors mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-stone-500 line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesClean({
  title = "Our Services",
  subtitle = "Comprehensive interior solutions tailored to your needs",
  services = defaultServices,
}: ServicesCleanProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-12 lg:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-terracotta-500">
              What We Do
            </span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className="text-stone-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesClean;
