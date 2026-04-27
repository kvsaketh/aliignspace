"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface Props {
  title?: string;
  location?: string;
  description?: string;
  gallery?: string[];
  mainVideoUrl?: string;
  mainVideoType?: string;
  clientName?: string;
  projectType?: string;
  budget?: string;
  area?: string;
  tags?: string[];
}

export function AertsenProjectDetail({
  title = "The Residence at Jubilee Hills",
  location = "Jubilee Hills, Hyderabad",
  description = "A complete transformation of a 4,500 sq ft penthouse into a serene modern sanctuary. Warm oak paneling, curated art walls, and floor-to-ceiling windows frame the city skyline. Every detail was considered—from the custom joinery to the hand-selected stone surfaces—to create a home that feels both luxurious and deeply personal.",
  gallery = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  ],
  mainVideoUrl = "",
  mainVideoType = "youtube",
  clientName = "Mr. & Mrs. Sharma",
  projectType = "Residential Interior",
  budget = "Premium",
  area = "4,500 sq ft",
  tags = ["Modern", "Luxury", "Penthouse"],
}: Props) {
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });
  const videoInView = useInView(videoRef, { once: true, margin: "-80px" });

  const heroImage = gallery[0];

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const youtubeId = mainVideoType === "youtube" ? getYouTubeId(mainVideoUrl || "") : "";
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : "";

  return (
    <>
      {/* Hero with full-width image */}
      <section ref={heroRef} className="relative w-full overflow-hidden">
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px]">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/80 via-[#1A1612]/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Location */}
                <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[rgb(255,134,113)] mb-3">
                  {location}
                </span>
                {/* Title */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
                  {title}
                </h1>
                {/* Metadata pills */}
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm font-sans text-xs text-white border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Client Info */}
      <section ref={contentRef} className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1612] mb-6">About the Project</h2>
              <p className="font-sans text-lg text-stone-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </motion.div>

            {/* Client Info Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-fit"
            >
              <div className="bg-[#f9f7f4] rounded-2xl p-8 space-y-6">
                <h3 className="font-serif text-xl text-[#1A1612]">Project Details</h3>
                <div className="space-y-4">
                  {clientName && (
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-stone-400 mb-1">Client</span>
                      <span className="font-sans text-sm text-[#1A1612]">{clientName}</span>
                    </div>
                  )}
                  {projectType && (
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-stone-400 mb-1">Type</span>
                      <span className="font-sans text-sm text-[#1A1612]">{projectType}</span>
                    </div>
                  )}
                  {area && (
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-stone-400 mb-1">Area</span>
                      <span className="font-sans text-sm text-[#1A1612]">{area}</span>
                    </div>
                  )}
                  {budget && (
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-stone-400 mb-1">Budget</span>
                      <span className="font-sans text-sm text-[#1A1612]">{budget}</span>
                    </div>
                  )}
                  {location && (
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-wider text-stone-400 mb-1">Location</span>
                      <span className="font-sans text-sm text-[#1A1612]">{location}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-24 lg:py-32 bg-[#f9f7f4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1612] mb-12 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden rounded-xl bg-stone-200 ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative w-full ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <Image
                      src={img}
                      alt={`${title} gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      {mainVideoUrl && (
        <section ref={videoRef} className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={videoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1612] mb-12 text-center">Project Walkthrough</h2>
              <div
                className="relative w-full aspect-video max-w-5xl mx-auto overflow-hidden rounded-2xl bg-stone-100 cursor-pointer group"
                onClick={() => setVideoOpen(true)}
              >
                <Image
                  src={gallery[1] || gallery[0]}
                  alt={`${title} video thumbnail`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1A1612]/30 group-hover:bg-[#1A1612]/20 transition-colors duration-300" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-[#D46546] ml-1" fill="#D46546" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && embedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#1A1612]/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={embedUrl}
                title={`${title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              {/* Close button */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AertsenProjectDetail;
