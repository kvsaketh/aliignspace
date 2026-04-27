"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  location: string;
  description: string;
  images: string[];
  tags?: string[];
  link?: string;
  index?: number;
}

interface Props {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: "The Residence at Jubilee Hills",
    location: "Jubilee Hills, Hyderabad",
    description:
      "A complete transformation of a 4,500 sq ft penthouse into a serene modern sanctuary. Warm oak paneling, curated art walls, and floor-to-ceiling windows frame the city skyline.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    tags: ["Residential", "Modern"],
    link: "#",
    index: 1,
  },
  {
    title: "Banjara Hills Villa",
    location: "Banjara Hills, Hyderabad",
    description:
      "An elegant 6,000 sq ft villa blending traditional Indian motifs with contemporary luxury. Featuring a custom marble courtyard, brass inlay details, and lush indoor gardens.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
    tags: ["Villa", "Luxury"],
    link: "#",
    index: 2,
  },
  {
    title: "Nellore Lake House",
    location: "Nellore, Andhra Pradesh",
    description:
      "A weekend retreat designed around water and light. Natural stone, teak decks, and expansive glazing dissolve the boundary between interior and the lakeside landscape.",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    tags: ["Weekend Home", "Contemporary"],
    link: "#",
    index: 3,
  },
];

function ProjectImageSlider({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} - ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-sans text-[#1A1612]">
        {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1612] hover:bg-white transition-colors shadow-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1612] hover:bg-white transition-colors shadow-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-[#D46546]" : "w-2 h-2 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isReversed,
}: {
  project: Project;
  isReversed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-center ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Text Column */}
      <div className={`space-y-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
        {/* Location label */}
        <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[rgb(250,202,194)]">
          {project.location}
        </span>

        {/* Index number */}
        <div className="font-serif italic text-5xl text-[rgb(250,202,194)]">
          {String(project.index || 1).padStart(2, "0")}
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1612] leading-[1.15]">
          {project.title}
        </h2>

        {/* Description */}
        <p className="font-sans text-base text-stone-500 leading-relaxed line-clamp-5">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-stone-200 font-sans text-xs text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Project button */}
        <a
          href={project.link || "#"}
          className="inline-flex items-center gap-2 mt-2 font-sans text-sm font-medium text-[#D46546] hover:text-[rgb(255,134,113)] transition-colors group"
        >
          View Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Image Slider Column */}
      <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
        <ProjectImageSlider images={project.images} title={project.title} />
      </div>
    </motion.div>
  );
}

export function AertsenProjectList({ projects = defaultProjects }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-[#f9f7f4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.title + i} project={project} isReversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AertsenProjectList;
