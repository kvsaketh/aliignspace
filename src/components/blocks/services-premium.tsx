"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Home, UtensilsCrossed, Sofa, BedDouble, Briefcase, Building2 } from "lucide-react";

interface Service {
  title: string;
  description: string;
  image?: string;
  link?: string;
  icon: string;
}

interface ServicesPremiumProps {
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

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.icon] || Home;

  return (
    <motion.div
      className="relative flex-shrink-0 w-[320px] sm:w-[380px] group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.link || "#"} className="block h-full">
        <div className="relative h-[480px] overflow-hidden rounded-sm bg-[#1C1917]">
          {/* Background Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {service.image ? (
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="380px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
            )}
          </motion.div>

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
            transition={{ duration: 0.4 }}
          />

          {/* Top Icon Badge */}
          <motion.div
            className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered ? "rgba(212, 101, 70, 0.9)" : "rgba(255, 255, 255, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Arrow Icon */}
          <motion.div
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
            animate={{ 
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-white" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            {/* Title with animation */}
            <motion.h3
              className="font-serif text-2xl sm:text-3xl font-medium text-white mb-3"
              animate={{ y: isHovered ? -8 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {service.title}
            </motion.h3>

            {/* Description - reveals on hover */}
            <motion.p
              className="font-sans text-sm text-white/70 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.4 }}
            >
              {service.description}
            </motion.p>

            {/* CTA Line */}
            <motion.div
              className="flex items-center gap-2 text-terracotta-400 font-sans text-sm font-medium"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-terracotta-500"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesPremium({
  title = "Our Interior Services",
  subtitle = "Complete interior solutions for homes, offices, and commercial spaces",
  services = [],
}: ServicesPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const defaultServices: Service[] = [
    {
      title: "Full Home Interiors",
      description: "Complete turnkey home transformation — living room, bedrooms, kitchen, bathrooms, and more.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      link: "/services/home-interiors",
      icon: "home",
    },
    {
      title: "Modular Kitchen",
      description: "Custom modular kitchens with premium hardware, smart storage, and beautiful finishes.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      link: "/services/modular-kitchen",
      icon: "utensils",
    },
    {
      title: "Living Room Design",
      description: "Statement living spaces with bespoke false ceilings, ambient lighting, and custom furniture.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
      link: "/services/living-room",
      icon: "sofa",
    },
    {
      title: "Bedroom Design",
      description: "Serene, personalised bedrooms with wardrobe solutions and calming palettes.",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
      link: "/services/bedroom",
      icon: "bed",
    },
    {
      title: "Office Interiors",
      description: "Modern, productive workspaces that reflect your brand identity.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      link: "/services/office-interiors",
      icon: "briefcase",
    },
    {
      title: "Commercial Spaces",
      description: "High-impact retail stores, restaurants, and commercial interiors designed to impress.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
      link: "/services/commercial",
      icon: "building",
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-[#1C1917] relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-900/20 via-transparent to-stone-900" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <motion.span
              className="inline-block text-terracotta-400 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex gap-3 mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={scrollLeft}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-terracotta-500 hover:border-terracotta-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayServices.map((service, index) => (
            <div key={index} className="snap-start">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
          
          {/* View All Card */}
          <motion.div
            className="flex-shrink-0 w-[320px] sm:w-[380px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: displayServices.length * 0.1 }}
          >
            <Link href="/services" className="block h-full">
              <div className="relative h-[480px] overflow-hidden rounded-sm border border-white/10 flex flex-col items-center justify-center group hover:border-terracotta-500/50 transition-colors duration-300">
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mb-6 group-hover:border-terracotta-500 group-hover:bg-terracotta-500 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="w-8 h-8 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </motion.div>
                <h3 className="font-serif text-2xl text-white mb-2">View All Services</h3>
                <p className="font-sans text-sm text-white/50">Explore our complete offerings</p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="mt-8 h-[2px] bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-terracotta-500 rounded-full"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
