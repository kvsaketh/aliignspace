"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const categories = ["Living Room", "Bedroom", "Kitchen", "Lifestyle"];

const projects = [
  {
    id: 1,
    title: "Modern Living Haven",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format",
    featured: true,
    timeline: "60-90 days",
  },
  {
    id: 2,
    title: "Cozy Urban Retreat",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format",
  },
  {
    id: 3,
    title: "Serene Master Suite",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format",
  },
  {
    id: 4,
    title: "Minimalist Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format",
  },
  {
    id: 5,
    title: "Chef's Dream Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format",
  },
  {
    id: 6,
    title: "Contemporary Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=800&auto=format",
  },
  {
    id: 7,
    title: "Pooja Room Sanctuary",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format",
  },
  {
    id: 8,
    title: "Home Theatre",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format",
  },
];

export function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("Living Room");

  const filteredProjects = projects.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  const featuredProject = projects.find(
    (p) => p.category === activeTab && p.featured
  );

  return (
    <section ref={ref} id="portfolio" className="relative py-24 md:py-32 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal leading-[1.1] tracking-tight">
            Rooms that tell your story
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "bg-coral-500 text-white shadow-soft"
                  : "bg-white text-slate-500 hover:bg-coral-50 hover:text-coral-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Project */}
        <AnimatePresence mode="wait">
          {featuredProject && (
            <motion.div
              key={`featured-${activeTab}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-coral-500 text-white text-xs font-label tracking-wider uppercase rounded-full">
                      {featuredProject.category}
                    </span>
                    {featuredProject.timeline && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                        <Clock className="w-3 h-3" />
                        {featuredProject.timeline}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white mb-2">
                    {featuredProject.title}
                  </h3>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-coral-300 hover:text-coral-200 text-sm font-medium transition-colors"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-coral-300 text-xs font-label tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h4 className="text-white font-serif font-medium text-lg mt-1">
                      {project.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal text-sm font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            Explore More Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
