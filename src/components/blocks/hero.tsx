"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Users, Clock, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface HeroProps {
  heading?: string;
  accentWord?: string;
  subheading?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  image?: string;
  overlay?: boolean;
}

export function HeroBlock({
  heading = "Spaces",
  accentWord = "Crafted",
  subheading = "Cleaner Designs. Sharper Strategies. Spaces That Become Homes.",
  buttonText = "Get Free Consultation",
  buttonUrl = "/contact",
  secondaryButtonText = "View Our Work",
  secondaryButtonUrl = "/portfolio",
  image,
  overlay = true,
}: HeroProps) {
  // Split heading to inject accent word
  const headingParts = heading.split(accentWord);
  const hasAccent = headingParts.length > 1;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-parallax
    >
      {/* Background Image */}
      {image ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="ALIIGNSPACE — Premium Interior Design"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-stone-900" />
      )}

      {/* Overlay gradient */}
      {overlay && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl">
          {/* Label */}
          <Reveal direction="fade" delay={0}>
            <span className="inline-block text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-6">
              Est. 2021 · Hyderabad &amp; Nellore
            </span>
          </Reveal>

          {/* Heading */}
          <Reveal direction="up" delay={100}>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] mb-6">
              {hasAccent ? (
                <>
                  {headingParts[0]}
                  <em className="not-italic text-[#D46546] italic">
                    {accentWord}
                  </em>
                  {headingParts[1]}
                </>
              ) : (
                heading
              )}
            </h1>
          </Reveal>

          {/* Subheading */}
          <Reveal direction="up" delay={200}>
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl leading-relaxed">
              {subheading}
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap gap-4">
              {buttonText && buttonUrl && (
                <Link
                  href={buttonUrl}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#D46546] hover:bg-[#c44d32] text-white font-sans font-medium text-base rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-[#D46546]/30 hover:-translate-y-0.5"
                >
                  {buttonText}
                </Link>
              )}
              {secondaryButtonText && secondaryButtonUrl && (
                <Link
                  href={secondaryButtonUrl}
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/60 hover:border-white text-white font-sans font-medium text-base rounded-none transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </Reveal>

          {/* Trust Badges */}
          <Reveal direction="fade" delay={450}>
            <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-4 h-4 text-[#D46546]" />
                <span className="font-sans text-sm">500+ Happy Families</span>
              </div>
              <span className="text-white/30 hidden sm:block">·</span>
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-[#D46546]" />
                <span className="font-sans text-sm">60–90 Day Delivery</span>
              </div>
              <span className="text-white/30 hidden sm:block">·</span>
              <div className="flex items-center gap-2 text-white/70">
                <BadgeCheck className="w-4 h-4 text-[#D46546]" />
                <span className="font-sans text-sm">Transparent Pricing</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </div>
    </section>
  );
}
