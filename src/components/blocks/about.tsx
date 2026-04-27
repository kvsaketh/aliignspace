"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface AboutStat {
  value: string;
  label: string;
}

interface AboutProps {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  image?: string;
  /** Legacy prop — accepted but layout is always image-left, text-right */
  imagePosition?: "left" | "right";
  quote?: string;
  quoteAuthor?: string;
  stats?: AboutStat[];
}

export function AboutBlock({
  label = "Our Story",
  heading = "Where trust becomes the foundation",
  accentWord = "trust",
  content = "<p>At ALIIGNSPACE, we believe that every home tells a story — and we are here to help you tell yours beautifully. Founded by Ar. Samhitha Nagasamudra and Ar. Murali, we started with a simple idea: that great interior design should be honest, timely, and built on real relationships.</p><p>Since 2021, we have transformed 500+ homes across Hyderabad and Nellore, blending contemporary aesthetics with the warmth of traditional South Indian living. Every project we take on is personal — your vision drives every decision we make.</p>",
  image,
  imagePosition: _imagePosition,
  quote = "We don't just design spaces — we craft environments where families grow, memories are made, and every corner feels intentional.",
  quoteAuthor = "Ar. Samhitha Nagasamudra, Co-founder",
  stats = [
    { value: "2021", label: "Est." },
    { value: "Hyd & Nellore", label: "Cities" },
    { value: "500+", label: "Projects" },
  ],
}: AboutProps) {
  // Inject accent word styling
  const headingWithAccent = accentWord
    ? heading.replace(
        accentWord,
        `<em class="not-italic text-[#D46546] italic">${accentWord}</em>`
      )
    : heading;

  return (
    <section className="py-20 lg:py-32 bg-[#F9F5ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Image with decorative offset frame */}
          {image && (
            <Reveal direction="left">
              <div className="relative">
                {/* Decorative border offset */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D46546]/30 z-0" />
                <div className="relative z-10 aspect-[3/4] overflow-hidden">
                  <Image
                    src={image}
                    alt="ALIIGNSPACE — Our Story"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating stat badge */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-[#1C1917] text-white px-6 py-5">
                  <span className="font-serif text-3xl font-medium text-[#D46546]">500+</span>
                  <p className="font-sans text-xs text-white/70 mt-0.5 tracking-wider uppercase">
                    Homes Designed
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Right: Text Content */}
          <div className="space-y-7 lg:pt-4">
            {/* Label */}
            <Reveal direction="up" delay={0}>
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546]">
                {label}
              </span>
            </Reveal>

            {/* Heading */}
            <Reveal direction="up" delay={80}>
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] leading-tight"
                dangerouslySetInnerHTML={{ __html: headingWithAccent }}
              />
            </Reveal>

            {/* Body Content */}
            <Reveal direction="up" delay={160}>
              <div
                className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 [&_p]:mb-0"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Reveal>

            {/* Pull Quote */}
            {quote && (
              <Reveal direction="up" delay={240}>
                <blockquote className="border-l-4 border-[#D46546] pl-6 py-2 my-2">
                  <p className="font-serif text-lg italic text-[#1C1917]/80 leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                  {quoteAuthor && (
                    <footer className="font-sans text-sm text-stone-500 mt-3">
                      — {quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              </Reveal>
            )}

            {/* Stats Row */}
            {stats && stats.length > 0 && (
              <Reveal direction="up" delay={320}>
                <div className="flex flex-wrap gap-8 pt-4 border-t border-stone-200">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-serif text-2xl font-medium text-[#1C1917]">
                        {stat.value}
                      </span>
                      <span className="font-sans text-xs text-stone-500 tracking-wider uppercase mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* CTA */}
            <Reveal direction="up" delay={400}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#D46546] hover:text-[#c44d32] transition-colors group"
              >
                Learn Our Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
