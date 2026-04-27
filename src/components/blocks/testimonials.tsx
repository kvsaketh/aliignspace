"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsProps {
  title?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "ALIIGNSPACE transformed our 3BHK into exactly the home we dreamed of. The team was professional, transparent with costs, and delivered on time. Absolutely love every corner!",
    date: "2 weeks ago",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Best interior designers in Hyderabad! No hidden charges, great quality materials, and Ar. Samhitha's design sense is phenomenal. Highly recommend to anyone building their home.",
    date: "1 month ago",
  },
  {
    name: "Anita Reddy",
    rating: 5,
    text: "From design to execution, everything was handled seamlessly. Our villa looks stunning — friends keep asking for the interior designer's contact. 100% ALIIGNSPACE!",
    date: "2 months ago",
  },
];

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sz} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}`}
        />
      ))}
    </div>
  );
}

// Google "G" SVG logo
function GoogleG() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function TestimonialsBlock({
  title = "What Our Clients Say",
  rating = 4.9,
  reviewCount = 127,
  reviews = defaultReviews,
}: TestimonialsProps) {
  return (
    <section className="py-20 lg:py-32 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal direction="fade">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              Client Stories
            </span>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] mb-6">
              {title}
            </h2>
          </Reveal>

          {/* Google Rating Badge */}
          <Reveal direction="up" delay={160}>
            <div className="inline-flex items-center gap-4 bg-white px-6 py-3 shadow-sm border border-stone-100">
              <GoogleG />
              <div className="flex items-center gap-2">
                <span className="font-sans text-2xl font-bold text-[#1C1917]">
                  {rating}
                </span>
                <StarRow rating={5} size="md" />
              </div>
              <div className="border-l border-stone-200 pl-4">
                <span className="font-sans text-sm text-stone-500">
                  {reviewCount} reviews
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Reveal key={index} direction="up" delay={index * 80}>
              <div className="bg-white p-7 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 transition-transform flex flex-col h-full">
                {/* Stars */}
                <StarRow rating={review.rating} />

                {/* Text */}
                <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed mt-4 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-100">
                  <div>
                    <span className="font-sans text-sm font-semibold text-[#1C1917] block">
                      {review.name}
                    </span>
                    <span className="font-sans text-xs text-stone-400 mt-0.5 block">
                      {review.date}
                    </span>
                  </div>
                  <GoogleG />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
