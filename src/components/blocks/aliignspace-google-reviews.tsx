"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  review: string;
  avatar?: string;
  location?: string;
  time?: string;
}

interface Props {
  label?: string;
  title?: string;
  accentWord?: string;
  subtitle?: string;
  reviews?: Review[];
  googleScore?: string;
  reviewCount?: string;
}

const defaultReviews: Review[] = [
  {
    name: "Adharvam Sree Raagav Thutupalli",
    rating: 5,
    review: "We had an amazing experience with this interior design company. From the initial consultation to the final execution, everything was handled with professionalism and creativity. They truly understood our vision and transformed our space into something beyond our expectations.",
    location: "Hyderabad",
    time: "2 months ago",
  },
  {
    name: "Arun Rej",
    rating: 5,
    review: "We had an absolutely wonderful experience working with Samhitha and team. From the initial consultation to project completion, everything was handled exceptionally well. They truly understood our vision and transformed our space into a beautiful home.",
    location: "Hyderabad",
    time: "2 months ago",
  },
  {
    name: "Dishirasa Konduru",
    rating: 5,
    review: "Working with Alignspace was a great experience. From the first meeting to the final installation, everything went smoothly. The team was very patient with our ideas and gave us the best possible output. Our home looks elegant and perfectly matches our style.",
    location: "Hyderabad",
    time: "6 months ago",
  },
  {
    name: "Satish Kondeti",
    rating: 5,
    review: "We were relocating to Hyderabad, so wanted to get our 20 year old flat fully renovated and give it a modern makeover. Alignspace was more than ready to take up complete renovation which most other designers refused. Highly recommend!",
    location: "Hyderabad",
    time: "6 months ago",
  },
  {
    name: "Kurmarao A",
    rating: 4,
    review: "We engaged M/s Align Space, Hyderabad, for the interior design of our residence at Vizag, and the outcome has been truly spectacular. The design approach seamlessly blended creativity with practicality, aligning perfectly with our requirements.",
    location: "Vizag",
    time: "6 months ago",
  },
  {
    name: "Thupupalli Ravindra",
    rating: 4,
    review: "I was extremely delighted with the team work of Alignspace. Three best qualities: 1. Design to actual — 100%. 2. Time schedule — delivered within agreed time. 3. Reasonable pricing and documentation.",
    location: "Hyderabad",
    time: "11 months ago",
  },
  {
    name: "Srinivas Adivilli",
    rating: 5,
    review: "Excellent work by the ALIIGNSPACE team. Very professional approach from design to execution. Highly satisfied with the quality and attention to detail throughout the entire project.",
    location: "Hyderabad",
    time: "6 months ago",
  },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

// Full original review text (line breaks kept); long ones collapse behind "Read more".
function ReviewText({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 260;
  return (
    <div className="flex-1 -mt-2">
      <p className={`font-sans text-[13px] text-[#1a1720] leading-relaxed whitespace-pre-line ${long && !open ? "line-clamp-6" : ""}`}>
        {text}
      </p>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-2 font-sans text-xs font-semibold text-[#4E2585] hover:underline">
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export function AliignspaceGoogleReviews({
  label = "Client Reviews",
  title = "Loved by Homeowners",
  accentWord = "Across Hyderabad",
  subtitle,
  reviews = defaultReviews,
  googleScore = "4.9",
  reviewCount = "7+",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const syncArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // scroll by one card width — the card uses calc(50vw-24px) capped at 340px
    const cardW = Math.min(window.innerWidth / 2 - 24, 340);
    el.scrollBy({ left: dir === "right" ? cardW + 16 : -(cardW + 16), behavior: "smooth" });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F1] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#4E2585] mb-3">
              {label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1720] leading-tight">
              {title}{" "}
              <span className="italic text-[#4E2585]">{accentWord}</span>
            </h2>
            {subtitle && (
              <p className="font-sans text-[#1a1720]/60 text-sm mt-2">{subtitle}</p>
            )}
          </div>

          {/* Rating badge */}
          <div className="flex items-center gap-4 bg-white border border-[#4E2585]/10 rounded-2xl px-5 py-3.5 self-start sm:self-auto flex-shrink-0">
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                ))}
              </div>
              <p className="font-sans text-[9px] text-[#1a1720]/55 uppercase tracking-widest">Google Rating</p>
            </div>
            <div className="h-8 w-px bg-[#4E2585]/10" />
            <div>
              <p className="font-serif text-3xl text-[#1a1720] leading-none">{googleScore}</p>
              <p className="font-sans text-[10px] text-[#1a1720]/55 mt-0.5">{reviewCount} reviews</p>
            </div>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            aria-label="Previous"
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-[#4E2585]/20 bg-[#F7F5F1] items-center justify-center text-[#1a1720] hover:bg-[#4E2585]/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/*
            Card width uses viewport-based calc so it always shows 2 on mobile
            regardless of the flex container's scroll width.
            max-w-[340px] caps the width on desktop.
          */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                style={{ width: "calc(50vw - 24px)", maxWidth: "340px", minWidth: "150px", flexShrink: 0 }}
              >
                <div className="h-full flex flex-col bg-white border border-[#4E2585]/10 shadow-[0_10px_40px_-20px_rgba(30,14,54,0.35)] rounded-2xl p-5 hover:border-[#D4A853]/60 transition-colors duration-300">

                  {/* Stars + G */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${s < review.rating
                            ? "text-[#D4A853] fill-[#D4A853]"
                            : "text-[#1a1720]/55 fill-white/15"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#F7F5F1] border border-[#4E2585]/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-sans text-[9px] font-bold text-[#4E2585]">G</span>
                    </div>
                  </div>

                  {/* Large quote mark */}
                  <div className="font-serif text-4xl leading-none text-[#4E2585]/20 mb-1 select-none">&ldquo;</div>

                  {/* Review text */}
                  <ReviewText text={review.review} />

                  {/* Author */}
                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-[#4E2585]/10">
                    <div className="w-8 h-8 rounded-full bg-[#4E2585]/10 border border-[#4E2585]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-sans text-[10px] font-semibold text-[#4E2585]">
                        {getInitials(review.name)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-xs font-semibold text-[#1a1720] leading-snug mb-0.5">
                        {review.name}
                      </p>
                      <p className="font-sans text-[10px] text-[#1a1720]/70">
                        {[review.location, review.time].filter(Boolean).join(" · ") || "Google review"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            aria-label="Next"
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-[#4E2585]/20 bg-[#F7F5F1] items-center justify-center text-[#1a1720] hover:bg-[#4E2585]/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile swipe hint */}
        <p className="sm:hidden text-center font-sans text-[10px] text-[#1a1720]/55 mt-3 tracking-wide">
          Swipe to see more
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <a
            href="https://share.google/YpqTBRuwtfRtteI0m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#16141f] text-white font-sans text-sm font-medium hover:bg-[#3B1868] transition-colors duration-300"
          >
            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <span className="font-sans text-[9px] font-bold text-[#16141f]">G</span>
            </span>
            Write a Google Review
          </a>
          <a
            href="https://share.google/YpqTBRuwtfRtteI0m"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-[#1a1720]/55 hover:text-[#4E2585] transition-colors duration-300 underline underline-offset-4"
          >
            See all reviews
          </a>
        </div>
      </div>
    </section>
  );
}

export default AliignspaceGoogleReviews;
