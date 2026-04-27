"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export interface StorySectionProps {
  variant?: "story" | "mission";
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  imagePosition?: "left" | "right";
  showExperienceBadge?: boolean;
  experienceYears?: string;
  experienceLabel?: string;
  backgroundColor?: "cream" | "white" | "dark";
  spacing?: "normal" | "compact" | "spacious";
}

export function StorySection({
  variant = "story",
  label = "Our Story",
  heading = "Where trust becomes the foundation",
  accentWord,
  content = "<p>At ALIIGNSPACE, we believe that every home tells a story.</p>",
  image,
  imageAlt,
  quote,
  quoteAuthor,
  imagePosition = "left",
  showExperienceBadge = true,
  experienceYears = "10+",
  experienceLabel = "Years Experience",
  backgroundColor = "cream",
  spacing = "normal",
}: StorySectionProps) {
  // Inject accent word styling if provided
  const headingWithAccent = accentWord
    ? heading.replace(
        new RegExp(accentWord, "gi"),
        `<em class="not-italic text-[#D46546] italic">${accentWord}</em>`
      )
    : heading;

  const isStory = variant === "story";
  const imageOnLeft = imagePosition === "left";

  const bgColors = {
    cream: "bg-[#F9F5ED]",
    white: "bg-white",
    dark: "bg-[#1C1917]",
  };

  const textColors = {
    cream: "text-[#1C1917]",
    white: "text-[#1C1917]",
    dark: "text-white",
  };

  const spacingClasses = {
    normal: "py-20 lg:py-32",
    compact: "py-12 lg:py-20",
    spacious: "py-28 lg:py-40",
  };

  return (
    <section className={cn(bgColors[backgroundColor], spacingClasses[spacing])}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-12 items-start",
            isStory ? "lg:grid-cols-2 lg:gap-20" : "grid-cols-1"
          )}
        >
          {/* Image - Conditional rendering based on position */}
          {isStory && image && (
            <Reveal direction={imageOnLeft ? "left" : "right"}>
              <div className="relative">
                {/* Decorative border offset */}
                <div
                  className={cn(
                    "absolute w-full h-full border-2 border-[#D46546]/30 z-0",
                    imageOnLeft ? "-top-4 -left-4" : "-top-4 -right-4"
                  )}
                />
                <div className="relative z-10 aspect-[4/5] overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt || heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge for story variant */}
                {isStory && showExperienceBadge && (
                  <div
                    className={cn(
                      "absolute -bottom-6 z-20 bg-[#1C1917] text-white px-6 py-5",
                      imageOnLeft ? "-right-6" : "-left-6"
                    )}
                  >
                    <span className="font-serif text-3xl font-medium text-[#D46546]">
                      {experienceYears}
                    </span>
                    <p className="font-sans text-xs text-white/70 mt-0.5 tracking-wider uppercase">
                      {experienceLabel}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* Mission/Vision variant - Image above */}
          {!isStory && image && (
            <Reveal direction="up">
              <div className="relative mb-6">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt || heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Text Content */}
          <div className={cn("space-y-6", isStory && "lg:pt-4")}>
            {/* Label */}
            {label && (
              <Reveal direction="up" delay={0}>
                <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546]">
                  {label}
                </span>
              </Reveal>
            )}

            {/* Heading */}
            <Reveal direction="up" delay={80}>
              <h2
                className={cn(
                  "font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight",
                  textColors[backgroundColor]
                )}
                dangerouslySetInnerHTML={{ __html: headingWithAccent }}
              />
            </Reveal>

            {/* Body Content */}
            <Reveal direction="up" delay={160}>
              <div
                className={cn(
                  "font-sans text-base leading-relaxed space-y-4 [&_p]:mb-4",
                  backgroundColor === "dark" ? "text-white/80" : "text-stone-600"
                )}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Reveal>

            {/* Pull Quote - Only for story variant */}
            {isStory && quote && (
              <Reveal direction="up" delay={240}>
                <blockquote className="border-l-4 border-[#D46546] pl-6 py-2 my-4">
                  <p className={cn(
                    "font-serif text-lg italic leading-relaxed",
                    backgroundColor === "dark" ? "text-white/90" : "text-[#1C1917]/80"
                  )}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  {quoteAuthor && (
                    <footer className={cn(
                      "font-sans text-sm mt-3",
                      backgroundColor === "dark" ? "text-white/60" : "text-stone-500"
                    )}>
                      — {quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// CMS Schema for the StorySection component
export const storySectionSchema = {
  type: "about_story",
  label: "About Story",
  description: "Company story section with image and quote",
  icon: "BookOpen",
  fields: [
    {
      name: "variant",
      label: "Section Variant",
      type: "select",
      required: false,
      defaultValue: "story",
      options: [
        { label: "Story (Two Column)", value: "story" },
        { label: "Mission (Single Column)", value: "mission" },
      ],
      category: "content",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      required: false,
      defaultValue: "Our Story",
      description: "Small label above the heading",
      category: "content",
    },
    {
      name: "heading",
      label: "Heading",
      type: "text",
      required: true,
      defaultValue: "Where trust becomes the foundation",
      category: "content",
    },
    {
      name: "accentWord",
      label: "Accent Word",
      type: "text",
      required: false,
      description: "Word to highlight in terracotta color",
      category: "content",
    },
    {
      name: "content",
      label: "Content",
      type: "richtext",
      required: true,
      defaultValue: "<p>At ALIIGNSPACE, we believe that every home tells a story.</p>",
      description: "Main content (HTML supported)",
      category: "content",
    },
    {
      name: "image",
      label: "Story Image",
      type: "media",
      required: false,
      category: "content",
    },
    {
      name: "imageAlt",
      label: "Image Alt Text",
      type: "text",
      required: false,
      description: "Accessibility text for the image",
      category: "content",
    },
    {
      name: "imagePosition",
      label: "Image Position",
      type: "select",
      required: false,
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      category: "style",
    },
    {
      name: "quote",
      label: "Quote",
      type: "textarea",
      required: false,
      description: "Optional pull quote",
      category: "content",
    },
    {
      name: "quoteAuthor",
      label: "Quote Author",
      type: "text",
      required: false,
      description: "Author of the quote",
      category: "content",
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "select",
      required: false,
      defaultValue: "cream",
      options: [
        { label: "Cream", value: "cream" },
        { label: "White", value: "white" },
        { label: "Dark", value: "dark" },
      ],
      category: "style",
    },
    {
      name: "spacing",
      label: "Section Spacing",
      type: "select",
      required: false,
      defaultValue: "normal",
      options: [
        { label: "Compact", value: "compact" },
        { label: "Normal", value: "normal" },
        { label: "Spacious", value: "spacious" },
      ],
      category: "style",
    },
    {
      name: "showExperienceBadge",
      label: "Show Experience Badge",
      type: "boolean",
      required: false,
      defaultValue: true,
      category: "advanced",
    },
    {
      name: "experienceYears",
      label: "Experience Years",
      type: "text",
      required: false,
      defaultValue: "10+",
      category: "advanced",
    },
    {
      name: "experienceLabel",
      label: "Experience Label",
      type: "text",
      required: false,
      defaultValue: "Years Experience",
      category: "advanced",
    },
  ],
};
