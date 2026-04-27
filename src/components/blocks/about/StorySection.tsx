"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StorySectionProps {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  image?: string;
  imagePosition?: "left" | "right";
  quote?: string;
  quoteAuthor?: string;
}

export function StorySection({
  label = "Our Story",
  heading = "Crafting Spaces with Purpose",
  accentWord = "Purpose",
  content = "<p>At ALIIGNSPACE, we believe that every home tells a story.</p>",
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  imagePosition = "left",
  quote,
  quoteAuthor,
}: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const accentHeading = accentWord
    ? heading.replace(accentWord, `<span class="text-terracotta-500 italic">${accentWord}</span>`)
    : heading;

  const imageContent = (
    <motion.div
      className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-sm"
      initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Image
        src={image}
        alt="Our Story"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="text-terracotta-500 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
        {label}
      </span>
      
      <h2
        className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-tight mt-4 mb-6"
        dangerouslySetInnerHTML={{ __html: accentHeading }}
      />
      
      <div
        className="font-sans text-base text-stone-600 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {quote && (
        <blockquote className="mt-8 pl-6 border-l-2 border-terracotta-400">
          <p className="font-serif text-lg italic text-stone-600">
            &ldquo;{quote}&rdquo;
          </p>
          {quoteAuthor && (
            <footer className="mt-2 text-sm text-stone-500">
              — {quoteAuthor}
            </footer>
          )}
        </blockquote>
      )}
    </motion.div>
  );

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {imagePosition === "left" ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
