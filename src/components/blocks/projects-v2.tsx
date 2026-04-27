"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  subtitle?: string;
  category: string;
  location: string;
  image: string;
  link?: string;
  year?: string;
}

interface ProjectsV2Props {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: "Natural Serenity",
    subtitle: "Where light meets tranquility",
    category: "3BHK Apartment",
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    link: "/portfolio",
    year: "2024",
  },
  {
    title: "Lustrous Home in The Sky",
    subtitle: "Modern luxury redefined",
    category: "4BHK Penthouse",
    location: "Banjara Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    link: "/portfolio",
    year: "2024",
  },
  {
    title: "Euphoric Walls",
    subtitle: "Contemporary elegance",
    category: "3BHK Villa",
    location: "Gachibowli, Hyderabad",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
    link: "/portfolio",
    year: "2023",
  },
  {
    title: "Modern Life, Contemporary Living",
    subtitle: "Simplicity in every detail",
    category: "2BHK Apartment",
    location: "Kondapur, Hyderabad",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    link: "/portfolio",
    year: "2023",
  },
];

function ProjectSlide({ project, isActive }: { project: Project; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative w-full h-full ${isActive ? "block" : "hidden"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <Link href={project.link || "#"} className="block relative w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div 
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="max-w-4xl">
            {/* Year & Category */}
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-terracotta-400">
                {project.year}
              </span>
              <span className="w-8 h-[1px] bg-terracotta-400" />
              <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            {/* Subtitle */}
            {project.subtitle && (
              <motion.p
                className="font-serif text-lg sm:text-xl lg:text-2xl text-white/70 italic mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {project.subtitle}
              </motion.p>
            )}

            {/* Location & CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-sans text-sm text-white/60">
                {project.location}
              </span>
              
              <motion.div
                className="inline-flex items-center gap-2 text-white font-sans text-sm font-medium group"
                whileHover={{ x: 5 }}
              >
                <span>View Project</span>
                <motion.div
                  className="w-10 h-10 rounded-full bg-terracotta-500 flex items-center justify-center"
                  animate={{ rotate: isHovered ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsV2({
  title = "Our Work",
  subtitle = "Finest Projects We've Crafted",
  projects = defaultProjects,
}: ProjectsV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section ref={containerRef} className="relative bg-[#1C1917]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <motion.span
              className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase text-terracotta-400 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {subtitle}
            </motion.span>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Slider */}
      <div className="relative h-[80vh] min-h-[600px] max-h-[900px]">
        <AnimatePresence mode="wait">
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.title}
              project={project}
              isActive={index === currentIndex}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 lg:p-16">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {projects.map((project, index) => (
            <button
              key={project.title}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? "ring-2 ring-terracotta-500 ring-offset-2 ring-offset-[#1C1917]" 
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
          
          {/* View All Link */}
          <Link
            href="/portfolio"
            className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-white/20 flex flex-col items-center justify-center text-white hover:bg-white hover:text-[#1C1917] transition-all duration-300 ml-4"
          >
            <ArrowUpRight className="w-5 h-5 mb-1" />
            <span className="font-sans text-xs">View All</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsV2;
