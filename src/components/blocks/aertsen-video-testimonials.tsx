"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  thumbnail: string;
  name: string;
  location: string;
  youtubeUrl: string;
  quote?: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  videos?: Video[];
}

const defaultVideos: Video[] = [
  {
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    name: "Priya & Rahul Sharma",
    location: "Jubilee Hills, Hyderabad",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Aertsen turned our vision into a breathtaking reality.",
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    name: "Anita Reddy",
    location: "Gachibowli, Hyderabad",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "The attention to detail in every corner of our home is remarkable.",
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    name: "Vikram & Sneha",
    location: "Banjara Hills, Hyderabad",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Professional, creative, and deeply attentive to our needs.",
  },
];

export function AertsenVideoTestimonials({
  label = "Video Stories",
  title = "Real Homes.",
  accentWord = "Real Stories.",
  videos = defaultVideos,
}: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const active = videos.find((v) => v.youtubeUrl === activeVideo);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext]);

  const handleMouseEnter = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleMouseLeave = () => {
    autoPlayRef.current = setInterval(goNext, 5000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#f9f7f4]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[rgb(255,134,113)] mb-4">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1612]">
            {title}{" "}
            <span className="italic text-[rgb(255,134,113)]">{accentWord}</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {videos.map((video, i) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(video.youtubeUrl)}
            >
              <div className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-[#1A1612] fill-[#1A1612] ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {video.quote && (
                    <p className="font-serif text-sm italic text-[#1A1612]/60 mb-3">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  )}
                  <h3 className="font-serif text-lg text-[#1A1612]">{video.name}</h3>
                  <p className="font-sans text-sm text-[#1A1612]/50 mt-1">{video.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel nav (optional, shown when more than 3 videos) */}
        {videos.length > 3 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-[#1A1612]/20 flex items-center justify-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white transition-colors duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-[#1A1612] w-6" : "bg-[#1A1612]/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-[#1A1612]/20 flex items-center justify-center text-[#1A1612] hover:bg-[#1A1612] hover:text-white transition-colors duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeVideo && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-video bg-[#1A1612] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={active.youtubeUrl}
                title={active.name}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
