"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  link?: string;
  featured?: boolean;
}

interface PortfolioPremiumProps {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
  maxItems?: number;
  showViewAllButton?: boolean;
  showFilters?: boolean;
}

const CATEGORIES = ["All", "2BHK Apartment", "3BHK Apartment", "4BHK Apartment", "3BHK Villa", "4BHK Villa", "Office & Commercial"];

// Portfolio Card Component
function PortfolioCard({ item, index, compact = false }: { item: PortfolioItem; index: number; compact?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg cursor-pointer ${
        !compact && item.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={item.link || "#"} className="block relative w-full h-full">
        <div className={`relative w-full ${compact ? 'aspect-[16/10]' : item.featured ? "h-full min-h-[400px] md:min-h-[600px]" : "aspect-square"} overflow-hidden`}>
          {/* Image with zoom effect */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes={item.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          />

          {/* Featured Badge */}
          {item.featured && (
            <motion.div
              className="absolute top-4 left-4 px-4 py-2 bg-terracotta-500 text-white font-sans text-xs font-semibold tracking-wider uppercase rounded-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Featured Project
            </motion.div>
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            {/* Category */}
            <motion.span
              className="font-sans text-xs font-semibold tracking-wider uppercase text-terracotta-400 mb-2"
              animate={{ 
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
            >
              {item.category}
            </motion.span>

            {/* Title */}
            <motion.h3
              className={`font-serif font-medium text-white mb-4 ${
                item.featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
              }`}
              animate={{ y: isHovered ? -8 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {item.title}
            </motion.h3>

            {/* View Project Link */}
            <motion.div
              className="flex items-center gap-2 text-white font-sans text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
            >
              <span>View Project</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-terracotta-500 flex items-center justify-center"
                animate={{ rotate: isHovered ? 45 : 0 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>

          {/* Corner Accent */}
          <motion.div
            className="absolute bottom-0 right-0 w-0 h-0 border-b-[60px] border-r-[60px] border-b-transparent border-r-terracotta-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// Filter Button Component
function FilterButton({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 font-sans text-sm font-medium transition-colors duration-300 rounded-full ${
        isActive 
          ? "text-white" 
          : "text-stone-600 hover:text-terracotta-500"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-terracotta-500 rounded-full"
          layoutId="activeFilter"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{category}</span>
    </motion.button>
  );
}

export function PortfolioPremium({
  title = "Our Work",
  subtitle = "Browse our portfolio of transformed spaces across Hyderabad & Nellore",
  items = [],
  maxItems,
  showViewAllButton = true,
  showFilters = true,
}: PortfolioPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const defaultItems: PortfolioItem[] = [
    {
      title: "Modern 3BHK — Jubilee Hills",
      category: "3BHK Apartment",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      link: "/portfolio",
      featured: true,
    },
    {
      title: "Contemporary Kitchen — Banjara Hills",
      category: "2BHK Apartment",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      link: "/portfolio",
    },
    {
      title: "Luxury 4BHK Villa — Gachibowli",
      category: "4BHK Villa",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      link: "/portfolio",
      featured: true,
    },
    {
      title: "Elegant 3BHK Villa — Nellore",
      category: "3BHK Villa",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      link: "/portfolio",
    },
    {
      title: "Executive Office — HITEC City",
      category: "Office & Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      link: "/portfolio",
    },
    {
      title: "Spacious 4BHK — Kondapur",
      category: "4BHK Apartment",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      link: "/portfolio",
    },
    {
      title: "Minimalist 2BHK — Madhapur",
      category: "2BHK Apartment",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      link: "/portfolio",
    },
    {
      title: "Premium Penthouse — Begumpet",
      category: "4BHK Apartment",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      link: "/portfolio",
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;
  
  // Limit items if maxItems is specified
  const limitedItems = maxItems ? displayItems.slice(0, maxItems) : displayItems;

  const filteredItems = activeFilter === "All" 
    ? limitedItems 
    : limitedItems.filter(item => item.category === activeFilter);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cream-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            className="inline-block text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Filter Tabs - Only show if showFilters is true */}
        {showFilters && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-stone-100 rounded-full">
              {CATEGORIES.map((category) => (
                <FilterButton
                  key={category}
                  category={category}
                  isActive={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Grid - 3 column landscape for homepage */}
        <motion.div 
          className={`grid gap-6 ${maxItems === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[280px]'}`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.slice(0, maxItems || filteredItems.length).map((item, index) => (
              <PortfolioCard 
                key={`${item.title}-${index}`} 
                item={item} 
                index={index} 
                compact={maxItems === 3}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {showViewAllButton && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#1C1917] text-[#1C1917] font-sans font-medium hover:bg-[#1C1917] hover:text-white transition-all duration-300 group"
            >
              View All Projects
              <motion.span
                className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center group-hover:bg-terracotta-500 transition-colors"
                whileHover={{ rotate: 45 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
