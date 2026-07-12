"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, Video, Sparkles } from "lucide-react";

interface VideoTestimonial {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  duration?: string;
}

const videos: VideoTestimonial[] = [
  {
    id: "1",
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    clientName: "Priya & Rahul Sharma",
    projectType: "3BHK Apartment",
    location: "Jubilee Hills",
    quote: "ALIIGNSPACE transformed our house into a dream home beyond our imagination!",
    duration: "2:34",
  },
  {
    id: "2",
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    clientName: "Anita Reddy",
    projectType: "4BHK Villa",
    location: "Gachibowli",
    quote: "Professional, transparent, and delivered exactly on time. Highly recommend!",
    duration: "1:45",
  },
  {
    id: "3",
    videoUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    clientName: "Vikram & Sneha",
    projectType: "Modular Kitchen",
    location: "Banjara Hills",
    quote: "Our kitchen is now the heart of our home. The design is absolutely stunning!",
    duration: "3:12",
  },
];

function VideoCard({
  video,
  isActive,
  onClick,
}: {
  video: VideoTestimonial;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Portrait Card */}
      <div className="relative w-[260px] sm:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-b from-stone-800 to-stone-900 shadow-2xl">
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={video.thumbnailUrl}
            alt={video.clientName}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Border glow */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 ${
            isActive
              ? "ring-2 ring-coral-500/50 shadow-lg shadow-coral-500/20"
              : "ring-1 ring-white/10"
          }`}
        />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs text-white">
          <Video className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full bg-coral-500 flex items-center justify-center shadow-lg shadow-coral-500/40">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm leading-relaxed mb-3 line-clamp-2">
            &ldquo;{video.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white text-xs font-semibold">
              {video.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <h4 className="text-white text-sm font-medium truncate">{video.clientName}</h4>
              <p className="text-white/50 text-xs">{video.projectType} • {video.location}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function VideoTestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-coral-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-coral-400" />
            <span className="text-coral-400 text-xs font-label tracking-[0.3em] uppercase">
              Video Stories
            </span>
            <Sparkles className="w-4 h-4 text-coral-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-[1.1] mb-4">
            Real Homes. Real Stories.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Watch how Aliignspace has transformed homes across Hyderabad & Nellore
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop nav */}
          <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-coral-500 hover:border-coral-500 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-coral-500 hover:border-coral-500 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards */}
          <div className="flex items-end justify-center gap-5 py-6 overflow-hidden min-h-[480px]">
            <AnimatePresence mode="popLayout">
              {videos.map((video, index) => {
                const isVisible =
                  index === activeIndex ||
                  index === (activeIndex - 1 + videos.length) % videos.length ||
                  index === (activeIndex + 1) % videos.length;
                if (!isVisible) return null;

                return (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isActive={index === activeIndex}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveIndex(index);
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile nav */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-coral-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
