"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Happy Client",
    rating: 5,
    text: "We finalised designs and with utmost trust handed over keys for execution, the team shared with us site updates but we visited site only during handover and felt really happy with the outcome and quality of products provided. happy & satisfied with output and also experience over all.",
    date: "2 months ago",
  },
  {
    name: "Satisfied Homeowner",
    rating: 5,
    text: "My Second association with this Allignspace. Honestly speaking, we were most excited when Samhitha showed us the 3d design of our home interiors and finally very happy and satisfied with the output delivered. Never compromising nature in terms of quality of the material and looks of the interiors makes Alignspace to stand out.",
    date: "4 months ago",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Exceptional work! ALIIGNSPACE transformed our 3BHK into a dream home. The team was professional and delivered on time. Highly recommended for anyone looking for premium interiors in Hyderabad.",
    date: "3 months ago",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Best interior designers in Hyderabad! Transparent pricing and excellent quality. The entire process was smooth from design to handover. Our modular kitchen is absolutely stunning.",
    date: "1 month ago",
  },
  {
    name: "Anita Reddy",
    rating: 5,
    text: "From design to execution, everything was handled seamlessly. Our villa looks stunning! The team's attention to detail and commitment to quality is truly commendable.",
    date: "5 months ago",
  },
  {
    name: "Vikram Naidu",
    rating: 5,
    text: "Ar. Samhitha has an incredible eye for detail. The modular kitchen they designed for us is a masterpiece — functional and beautiful. Will definitely recommend to friends and family.",
    date: "2 weeks ago",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
        />
      ))}
    </div>
  );
}

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

export function GoogleReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-14"
        >
          <div>
            <div className="section-label mb-4">
              <span className="text-coral-400">Client Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-[1.1] tracking-tight">
              Trusted by Homeowners<br />
              <em className="text-coral-400 not-italic">Across Hyderabad</em>
            </h2>
          </div>

          {/* Google Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
          >
            <GoogleG size={32} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-semibold text-white">4.8</span>
                <StarRow rating={5} />
              </div>
              <span className="text-xs text-white/40">127 Google reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <StarRow rating={review.rating} />
                <GoogleG size={16} />
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white text-xs font-semibold">
                    {review.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <span className="text-sm text-white/80 font-medium">{review.name}</span>
                </div>
                <span className="text-xs text-white/30">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="https://g.page/r/aliignspace/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-coral-400 hover:text-coral-300 transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
