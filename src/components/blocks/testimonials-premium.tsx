"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  location?: string;
}

interface TestimonialsPremiumProps {
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

// Google G Logo
function GoogleG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Star
            className={`w-5 h-5 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Avatar Component
function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  
  if (avatar && avatar.startsWith("http")) {
    return (
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-terracotta-400 shadow-lg">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg border-2 border-white">
      {avatar || initials}
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ review, isActive }: { review: Review; isActive: boolean }) {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 shadow-xl border border-stone-100 h-full flex flex-col ${
        isActive ? "ring-2 ring-terracotta-500 ring-offset-4" : ""
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.9,
        filter: isActive ? "blur(0px)" : "blur(2px)"
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-10 h-10 text-terracotta-200" />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>

      {/* Review Text */}
      <p className="font-sans text-base text-stone-600 leading-relaxed flex-1 mb-6">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
        <Avatar name={review.name} avatar={review.avatar} />
        <div className="flex-1">
          <h4 className="font-serif text-lg font-medium text-[#1C1917]">
            {review.name}
          </h4>
          {review.location && (
            <p className="font-sans text-sm text-stone-500">{review.location}</p>
          )}
        </div>
        <span className="font-sans text-xs text-stone-400">{review.date}</span>
      </div>
    </motion.div>
  );
}

export function TestimonialsPremium({
  title = "What Our Clients Say",
  subtitle = "Rated 4.9★ on Google by 127+ happy families",
  rating = 4.9,
  reviewCount = 127,
  reviews = [],
}: TestimonialsPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const defaultReviews: Review[] = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "ALIIGNSPACE transformed our 3BHK in Jubilee Hills into an absolute dream. The team was professional, transparent with costs, and delivered 5 days ahead of schedule. Ar. Samhitha's attention to detail is extraordinary.",
      date: "2 weeks ago",
      avatar: "PS",
      location: "Jubilee Hills, Hyderabad",
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Best interior designers in Hyderabad — hands down. No hidden costs, stunning 3D renders before work began, and the final result matched every pixel. Our kitchen is something out of a magazine.",
      date: "1 month ago",
      avatar: "RK",
      location: "Banjara Hills, Hyderabad",
    },
    {
      name: "Anita Reddy",
      rating: 5,
      text: "We were nervous about our first home renovation. ALIIGNSPACE made the entire experience stress-free and joyful. From design to handover in 78 days. Our villa looks absolutely stunning.",
      date: "2 months ago",
      avatar: "AR",
      location: "Gachibowli, Hyderabad",
    },
    {
      name: "Venkat Narayana",
      rating: 5,
      text: "Got our Nellore office interiors done — the team worked around our business hours and delivered a world-class workspace. Client impressions have improved dramatically.",
      date: "3 months ago",
      avatar: "VN",
      location: "Nellore, AP",
    },
    {
      name: "Lakshmi Devi",
      rating: 5,
      text: "The modular kitchen ALIIGNSPACE designed is functional perfection. Every inch is optimised, the finish quality is exceptional, and they stayed exactly on budget.",
      date: "3 months ago",
      avatar: "LD",
      location: "Kondapur, Hyderabad",
    },
    {
      name: "Suresh Babu",
      rating: 5,
      text: "From the first meeting to the day we moved in, the experience was seamless. Transparent, trustworthy, and genuinely talented. ALIIGNSPACE is in a different league.",
      date: "4 months ago",
      avatar: "SB",
      location: "HITEC City, Hyderabad",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayReviews.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Get visible reviews (current and neighbors)
  const getVisibleReviews = () => {
    const prev = (currentIndex - 1 + displayReviews.length) % displayReviews.length;
    const next = (currentIndex + 1) % displayReviews.length;
    return [prev, currentIndex, next];
  };

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-cream-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-terracotta-100/30 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span
              className="inline-block text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C1917] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Google Rating Badge */}
          <motion.div
            className="flex-shrink-0 inline-flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-lg border border-stone-100"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <GoogleG size={32} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-3xl font-bold text-[#1C1917]">{rating}</span>
                <StarRating rating={5} />
              </div>
              <span className="font-sans text-sm text-stone-500">{reviewCount} Google reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop: 3 visible cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {getVisibleReviews().map((reviewIndex, i) => (
              <TestimonialCard
                key={reviewIndex}
                review={displayReviews[reviewIndex]}
                isActive={i === 1}
              />
            ))}
          </div>

          {/* Mobile/Tablet: Single card view */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard review={displayReviews[currentIndex]} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              onClick={goToPrevious}
              className="w-14 h-14 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-[#1C1917] hover:bg-terracotta-500 hover:text-white hover:border-terracotta-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {displayReviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-terracotta-500 w-8" 
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              className="w-14 h-14 rounded-full bg-white shadow-lg border border-stone-100 flex items-center justify-center text-[#1C1917] hover:bg-terracotta-500 hover:text-white hover:border-terracotta-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Client Logos / Trust Badges */}
        <motion.div
          className="mt-20 pt-12 border-t border-stone-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-center font-sans text-sm text-stone-500 mb-8">
            Trusted by 500+ families across Hyderabad & Nellore
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50">
            {["Jubilee Hills", "Banjara Hills", "Gachibowli", "HITEC City", "Nellore"].map((location, i) => (
              <motion.div
                key={location}
                className="font-serif text-lg text-stone-400"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ color: "#d46546", scale: 1.05 }}
              >
                {location}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
