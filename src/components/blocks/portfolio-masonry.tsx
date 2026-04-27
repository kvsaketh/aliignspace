"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  link?: string;
  size?: "small" | "medium" | "large";
}

interface PortfolioMasonryProps {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
  maxItems?: number;
  showViewAllButton?: boolean;
}

const defaultItems: PortfolioItem[] = [
  {
    title: "Modern 3BHK Apartment",
    category: "Jubilee Hills",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    size: "large",
  },
  {
    title: "Luxury Villa Interior",
    category: "Gachibowli",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    size: "small",
  },
  {
    title: "Contemporary Kitchen",
    category: "Banjara Hills",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    size: "medium",
  },
  {
    title: "Elegant Living Room",
    category: "Madhapur",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    size: "medium",
  },
  {
    title: "Minimalist Bedroom",
    category: "Kondapur",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    size: "small",
  },
];

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const sizeClasses = {
    small: "aspect-[4/3]",
    medium: "aspect-[4/5]",
    large: "aspect-[4/5] sm:row-span-2",
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg ${sizeClasses[item.size || "medium"]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={item.link || "/portfolio"} className="block w-full h-full">
        {/* Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-xs text-terracotta-300 uppercase tracking-wider mb-2 block">
              {item.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-2">
              {item.title}
            </h3>
          </div>
          
          {/* View Project Link */}
          <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <span className="text-sm font-medium">View Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function PortfolioMasonry({
  title = "Featured Projects",
  subtitle = "Explore our latest interior transformations",
  items = defaultItems,
  maxItems = 5,
  showViewAllButton = true,
}: PortfolioMasonryProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const displayItems = items.slice(0, maxItems);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-terracotta-500">
                Our Work
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
          
          {showViewAllButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1C1917] text-[#1C1917] text-sm font-medium hover:bg-[#1C1917] hover:text-white transition-colors duration-300"
              >
                View All Projects
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[200px] sm:auto-rows-[250px]">
          {displayItems.map((item, index) => (
            <PortfolioCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioMasonry;
