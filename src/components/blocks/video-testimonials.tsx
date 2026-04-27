"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";

interface ReelCard {
  name: string;
  location: string;
  quote: string;
  thumbnail: string;
  videoUrl?: string;
  rating?: number;
}

const TESTIMONIALS: ReelCard[] = [
  {
    name: "Dishirasa Konduru",
    location: "Hyderabad",
    quote: "Our home looks elegant and perfectly matches our style",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    rating: 5,
  },
  {
    name: "Satish Kondeti",
    location: "Hyderabad",
    quote: "From a 20-year-old flat to a stunning modern home",
    thumbnail: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    rating: 5,
  },
  {
    name: "Arun Rej",
    location: "Hyderabad",
    quote: "Samhitha and team truly understood our vision",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    rating: 5,
  },
  {
    name: "Adharvam Thutupalli",
    location: "Hyderabad",
    quote: "Creativity and professionalism beyond expectations",
    thumbnail: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    rating: 5,
  },
  {
    name: "Kurmarao A",
    location: "Vizag",
    quote: "Creativity seamlessly blended with practicality",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    rating: 4,
  },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function ReelCard({ t }: { t: ReelCard }) {
  return (
    /*
      Explicit pixel width + aspect-[9/16] gives a reliable sized box
      so next/image fill always has a known parent dimension.
      bg-[#1A1612] shows while image loads.
    */
    <div className="relative w-[155px] sm:w-[175px] lg:w-[195px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#1A1612] group cursor-pointer">
      {/* Background image */}
      <Image
        src={t.thumbnail}
        alt={t.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 155px, (max-width: 1024px) 175px, 195px"
      />

      {/* Gradient: top tint + strong bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />

      {/* Location + rating row */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
          {t.location}
        </span>
        <div className="flex items-center gap-[2px] bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-white/10">
          {[...Array(t.rating ?? 5)].map((_, s) => (
            <Star key={s} className="w-[7px] h-[7px] text-[#D46546] fill-[#D46546]" />
          ))}
        </div>
      </div>

      {/* Play button with glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Soft glow ring (CSS only — no JS) */}
          <div className="absolute -inset-3 rounded-full bg-[#D46546]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-[#D46546] group-hover:border-[#D46546] transition-all duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 text-white fill-white ml-[2px]" />
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        {/* Serif italic quote */}
        <p className="font-serif text-[11px] italic text-white/90 leading-snug mb-2.5 line-clamp-3">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Reviewer row */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#D46546]/25 border border-[#D46546]/40 flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-[8px] font-bold text-[#D46546]">
              {getInitials(t.name)}
            </span>
          </div>
          <p className="font-sans text-[10px] text-white/55 truncate leading-none">{t.name}</p>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 group-hover:ring-[#D46546]/60 transition-all duration-300 pointer-events-none" />
    </div>
  );
}

export function VideoTestimonialsBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // scroll by ~2 card widths
    el.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0F0C09]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#D46546] mb-3">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Hear it from{" "}
              <span className="italic text-[rgb(250,202,194)]">our clients</span>
            </h2>
            <p className="font-sans text-[13px] text-white/40 mt-2">
              Real homeowners. Real results.
            </p>
          </div>

          {/* Nav — desktop only */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Reel row ── */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {TESTIMONIALS.map((t, i) =>
            t.videoUrl ? (
              <a
                key={i}
                href={t.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <ReelCard t={t} />
              </a>
            ) : (
              <div key={i} className="flex-shrink-0">
                <ReelCard t={t} />
              </div>
            )
          )}

          {/* Share your story card */}
          <div className="flex-shrink-0">
            <a href="https://wa.me/919030444503" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative w-[155px] sm:w-[175px] lg:w-[195px] aspect-[9/16] rounded-2xl border border-dashed border-white/15 bg-white/[0.015] flex flex-col items-center justify-center text-center p-4 hover:border-[#D46546]/40 hover:bg-[#D46546]/[0.04] transition-all duration-300">
                <div className="w-10 h-10 rounded-full border border-[#D46546]/30 bg-[#D46546]/5 flex items-center justify-center mb-3 group-hover:bg-[#D46546]/20 transition-colors duration-300">
                  <MessageCircle className="w-4 h-4 text-[#D46546]" />
                </div>
                <p className="font-serif text-[12px] text-white mb-1.5 leading-snug">Share your story</p>
                <p className="font-sans text-[10px] text-white/30 leading-relaxed mb-4">
                  Had a great experience? Feature your home.
                </p>
                <span className="font-sans text-[10px] text-[#D46546] border border-[#D46546]/25 px-2.5 py-1 rounded-full group-hover:bg-[#D46546]/10 transition-colors duration-200">
                  WhatsApp us
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p className="sm:hidden text-center font-sans text-[10px] text-white/20 mt-3 tracking-wide">
          Swipe to see more
        </p>
      </div>
    </section>
  );
}

export default VideoTestimonialsBlock;
