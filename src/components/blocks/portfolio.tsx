"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  link?: string;
  featured?: boolean;
}

interface PortfolioProps {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
}

const CATEGORIES = ["All", "2BHK Apartment", "3BHK Apartment", "4BHK Apartment", "3BHK Villa", "4BHK Villa", "Office & Commercial"] as const;

const ITEMS_PER_PAGE = 9;

export function PortfolioBlock({
  title = "Our Work",
  subtitle = "Projects",
  items = [],
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = activeFilter === "All"
    ? items
    : items.filter((item) => item.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal direction="fade">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              {subtitle}
            </span>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917]">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* Filter Tabs */}
        <Reveal direction="up" delay={160}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`font-sans text-sm px-5 py-2 border transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-[#D46546] border-[#D46546] text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:border-[#D46546] hover:text-[#D46546]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
            {visible.map((item, index) => (
              <Reveal
                key={`${item.title}-${index}`}
                direction="up"
                delay={Math.min(index % 3, 2) * 80}
                className={item.featured ? "sm:row-span-2" : ""}
              >
                <Link
                  href={item.link || "#"}
                  className="group relative w-full h-full block overflow-hidden bg-stone-100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="font-sans text-xs font-semibold tracking-wider uppercase text-[#D46546] mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-[#D46546] text-white font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1">
                      Featured
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-sans text-stone-400">No projects found in this category yet.</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="font-sans text-sm font-medium px-8 py-3 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all duration-300"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#D46546] hover:text-[#c44d32] transition-colors group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
