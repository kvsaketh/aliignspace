"use client";

import { Star, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface GoogleReviewsProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Exceptional work! ALIIGNSPACE transformed our 3BHK into a dream home. The team was professional and delivered on time.",
    date: "2 weeks ago",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Best interior designers in Hyderabad! Transparent pricing and excellent quality. Highly recommended!",
    date: "1 month ago",
  },
  {
    name: "Anita Reddy",
    rating: 5,
    text: "From design to execution, everything was handled seamlessly. Our villa looks stunning!",
    date: "2 months ago",
  },
  {
    name: "Vikram Naidu",
    rating: 5,
    text: "Ar. Samhitha has an incredible eye for detail. The modular kitchen they designed for us is a masterpiece — functional and beautiful.",
    date: "3 months ago",
  },
  {
    name: "Sujatha Rao",
    rating: 5,
    text: "Very professional team. They delivered exactly what was promised, within budget and on schedule. 5 stars is not enough!",
    date: "4 months ago",
  },
  {
    name: "Anil Babu",
    rating: 5,
    text: "The team at ALIIGNSPACE is truly dedicated. Every concern was addressed promptly and the result is breathtaking.",
    date: "5 months ago",
  },
];

// Google "G" SVG logo
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}`}
        />
      ))}
    </div>
  );
}

export function GoogleReviewsBlock({
  title = "Loved by Homeowners",
  subtitle = "Real reviews from our Google Business Profile",
  rating = 4.9,
  reviewCount = 127,
  reviews = defaultReviews,
}: GoogleReviewsProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
          <div>
            <Reveal direction="fade">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-3">
                {subtitle}
              </span>
            </Reveal>
            <Reveal direction="up" delay={80}>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917]">
                {title}
              </h2>
            </Reveal>
          </div>

          {/* Google Badge */}
          <Reveal direction="right" delay={120}>
            <div className="flex-shrink-0 inline-flex items-center gap-4 bg-stone-50 border border-stone-100 px-6 py-4">
              <GoogleG size={28} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-2xl font-bold text-[#1C1917] leading-none">
                    {rating}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="font-sans text-xs text-stone-400 mt-0.5 block">
                  {reviewCount} Google reviews
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
          {reviews.map((review, index) => (
            <Reveal
              key={index}
              direction="up"
              delay={index * 60}
              className="min-w-[300px] sm:min-w-[340px] lg:min-w-0 snap-start flex-shrink-0 lg:flex-shrink"
            >
              <div className="bg-white border border-stone-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Stars + Google logo */}
                <div className="flex items-center justify-between mb-4">
                  <StarRow rating={review.rating} />
                  <GoogleG size={18} />
                </div>

                {/* Review text */}
                <p className="font-sans text-sm text-stone-600 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-sm font-semibold text-[#1C1917] block">
                      {review.name}
                    </span>
                    <span className="font-sans text-xs text-stone-400 mt-0.5 block">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <a
            href="https://g.page/r/aliignspace/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#D46546] hover:text-[#c44d32] transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
