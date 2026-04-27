"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AboutHeroProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  label?: string;
  showScrollIndicator?: boolean;
  overlayOpacity?: number;
  alignment?: "center" | "left" | "right";
  minHeight?: string;
}

export function AboutHero({
  heading = "About Aliignspace",
  subheading = "Our Core team is specialised in interiors with 10 years of experience",
  backgroundImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
  label = "Who We Are",
  showScrollIndicator = true,
  overlayOpacity = 70,
  alignment = "center",
  minHeight = "70vh",
}: AboutHeroProps) {
  const alignmentClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  const gradientOpacity = Math.max(0, Math.min(100, overlayOpacity)) / 100;

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div 
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${gradientOpacity * 0.9}), rgba(0,0,0,${gradientOpacity * 0.6}), rgba(0,0,0,${gradientOpacity * 0.9}))`,
        }}
      />

      {/* Content */}
      <div 
        className={cn(
          "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col",
          alignmentClasses[alignment]
        )}
      >
        {label && (
          <Reveal direction="fade" delay={0}>
            <span className="inline-block text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-6">
              {label}
            </span>
          </Reveal>
        )}

        <Reveal direction="up" delay={100}>
          <h1 className={cn(
            "font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-6 max-w-4xl",
            alignment === "center" && "mx-auto",
            alignment === "right" && "ml-auto"
          )}>
            {heading}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <p className={cn(
            "font-sans text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed",
            alignment === "center" && "mx-auto",
            alignment === "right" && "ml-auto"
          )}>
            {subheading}
          </p>
        </Reveal>

        {/* Decorative Line */}
        <Reveal direction="fade" delay={300}>
          <div className={cn(
            "flex items-center gap-4 mt-12",
            alignment === "center" && "justify-center",
            alignment === "right" && "justify-end"
          )}>
            <span className="w-12 h-[1px] bg-[#D46546]" />
            <span className="w-2 h-2 rounded-full bg-[#D46546]" />
            <span className="w-12 h-[1px] bg-[#D46546]" />
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </div>
      )}
    </section>
  );
}

// CMS Schema for the AboutHero component
export const aboutHeroSchema = {
  type: "about_hero",
  label: "About Hero",
  description: "Hero section for About page with background image",
  icon: "Image",
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "text",
      required: true,
      defaultValue: "About Aliignspace",
      category: "content",
    },
    {
      name: "subheading",
      label: "Subheading",
      type: "textarea",
      required: false,
      defaultValue: "Our Core team is specialised in interiors with 10 years of experience",
      category: "content",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      required: false,
      defaultValue: "Who We Are",
      description: "Small label above the heading",
      category: "content",
    },
    {
      name: "backgroundImage",
      label: "Background Image",
      type: "media",
      required: false,
      category: "content",
    },
    {
      name: "alignment",
      label: "Content Alignment",
      type: "select",
      required: false,
      defaultValue: "center",
      options: [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      category: "style",
    },
    {
      name: "minHeight",
      label: "Minimum Height",
      type: "select",
      required: false,
      defaultValue: "70vh",
      options: [
        { label: "50vh", value: "50vh" },
        { label: "60vh", value: "60vh" },
        { label: "70vh", value: "70vh" },
        { label: "80vh", value: "80vh" },
        { label: "90vh", value: "90vh" },
        { label: "100vh", value: "100vh" },
      ],
      category: "style",
    },
    {
      name: "overlayOpacity",
      label: "Overlay Opacity",
      type: "number",
      required: false,
      defaultValue: 70,
      validation: { min: 0, max: 100 },
      description: "Background overlay darkness (0-100)",
      category: "style",
    },
    {
      name: "showScrollIndicator",
      label: "Show Scroll Indicator",
      type: "boolean",
      required: false,
      defaultValue: true,
      category: "style",
    },
  ],
};
