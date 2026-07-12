"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, MessageCircle, Star, X } from "lucide-react";

export interface Story {
  name: string;
  location: string;
  quote: string;
  thumbnail?: string;
  videoUrl?: string;
  rating?: number;
}

/* Turn an Instagram Reel or YouTube Short/watch URL into an embeddable player URL. */
function parseMedia(url?: string): {
  kind: "youtube" | "instagram" | "other" | "none";
  embed?: string;
  thumb?: string;
} {
  if (!url) return { kind: "none" };
  const yt = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  if (yt) {
    return {
      kind: "youtube",
      embed: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      thumb: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const ig = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/);
  if (ig) {
    return { kind: "instagram", embed: `https://www.instagram.com/reel/${ig[1]}/embed/` };
  }
  return { kind: "other", embed: url };
}

const FALLBACK_THUMB = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function StoryCard({ s, onPlay }: { s: Story; onPlay?: () => void }) {
  const media = parseMedia(s.videoUrl);
  const thumb = s.thumbnail || media.thumb || FALLBACK_THUMB;
  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={!onPlay}
      className="relative w-[155px] sm:w-[175px] lg:w-[195px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#16141f] group text-left disabled:cursor-default"
    >
      <Image
        src={thumb}
        alt={s.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 155px, (max-width: 1024px) 175px, 195px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
          {s.location}
        </span>
        <div className="flex items-center gap-[2px] bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-white/10">
          {[...Array(s.rating ?? 5)].map((_, i) => (
            <Star key={i} className="w-[7px] h-[7px] text-[#FF9900] fill-[#FF9900]" />
          ))}
        </div>
      </div>

      {onPlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-[#7A22FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-[#7A22FF] group-hover:border-[#7A22FF] transition-all duration-300 group-hover:scale-110">
              <Play className="w-4 h-4 text-white fill-white ml-[2px]" />
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <p className="font-serif text-[11px] italic text-white/90 leading-snug mb-2.5 line-clamp-3">
          &ldquo;{s.quote}&rdquo;
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#7A22FF]/25 border border-[#7A22FF]/40 flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-[8px] font-bold text-[#C4A2FF]">{getInitials(s.name)}</span>
          </div>
          <p className="font-sans text-[10px] text-white/55 truncate leading-none">{s.name}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 group-hover:ring-[#7A22FF]/60 transition-all duration-300 pointer-events-none" />
    </button>
  );
}

export function ClientStories({ stories }: { stories: Story[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Story | null>(null);
  const activeMedia = active ? parseMedia(active.videoUrl) : null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0B0B10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#FF9900] mb-3">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Hear it from <span className="italic text-[#C4A2FF]">our clients</span>
            </h2>
            <p className="font-sans text-[13px] text-white/40 mt-2">
              Real homeowners. Real reels. Tap to watch their stories.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button onClick={() => scroll("left")} aria-label="Previous" className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll("right")} aria-label="Next" className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {stories.map((s, i) => (
            <div key={i} className="flex-shrink-0">
              <StoryCard s={s} onPlay={s.videoUrl ? () => setActive(s) : undefined} />
            </div>
          ))}

          {/* Share your story card */}
          <div className="flex-shrink-0">
            <a href="https://wa.me/919030444503" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative w-[155px] sm:w-[175px] lg:w-[195px] aspect-[9/16] rounded-2xl border border-dashed border-white/15 bg-white/[0.015] flex flex-col items-center justify-center text-center p-4 hover:border-[#7A22FF]/40 hover:bg-[#7A22FF]/[0.04] transition-all duration-300">
                <div className="w-10 h-10 rounded-full border border-[#7A22FF]/30 bg-[#7A22FF]/5 flex items-center justify-center mb-3 group-hover:bg-[#7A22FF]/20 transition-colors duration-300">
                  <MessageCircle className="w-4 h-4 text-[#C4A2FF]" />
                </div>
                <p className="font-serif text-[12px] text-white mb-1.5 leading-snug">Share your story</p>
                <p className="font-sans text-[10px] text-white/30 leading-relaxed mb-4">Had a great experience? Feature your home.</p>
                <span className="font-sans text-[10px] text-[#FF9900] border border-[#FF9900]/25 px-2.5 py-1 rounded-full group-hover:bg-[#FF9900]/10 transition-colors duration-200">WhatsApp us</span>
              </div>
            </a>
          </div>
        </div>

        <p className="sm:hidden text-center font-sans text-[10px] text-white/20 mt-3 tracking-wide">Swipe to see more</p>
      </div>

      {/* ── Reel / Short player modal ── */}
      {active && activeMedia?.embed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeMedia.embed}
              title={active.name}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; clipboard-write; picture-in-picture"
              allowFullScreen
              scrolling="no"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ClientStories;
