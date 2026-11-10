"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

interface Props {
  href: string;
  image: string;
  title: string;
  category?: string | null;
  location?: string | null;
  hasVideo: boolean;
  large?: boolean;
  index: number;
  className?: string;
}

export function ProjectTile({ href, image, title, category, location, hasVideo, large, index, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  // Not every YouTube video has a maxres thumbnail; fall back to the always-present hq one.
  const [src, setSrc] = useState(image);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Image drifts slower than the page for depth.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link
        ref={ref}
        href={href}
        className="group relative block h-full min-h-[300px] overflow-hidden rounded-[4px] bg-[#16141f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
      >
        <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={src}
            alt={title}
            onError={() => src.includes("maxresdefault") && setSrc(src.replace("maxresdefault", "hqdefault"))}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1720]/95 via-[#1a1720]/25 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
        {/* Brass hairline frame on hover */}
        <div className="pointer-events-none absolute inset-3 border border-[#E2B866]/0 transition-colors duration-700 group-hover:border-[#E2B866]/50" />

        <div className={`absolute inset-x-0 bottom-0 ${large ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E2B866]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-[#E2B866]/60" />
            {category && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">{category}</span>
            )}
          </div>
          <h3 className={`font-serif font-medium text-white leading-[1.08] ${large ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl"}`}>
            {title}
          </h3>
          <div className="mt-4 flex items-center justify-between gap-4">
            {location && <p className="text-sm text-white/60">{location}</p>}
            {hasVideo && (
              <span className="ml-auto inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-[#E2B866]/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E2B866] transition-all duration-500 group-hover:bg-[#D4A853] group-hover:text-[#16141f] group-hover:border-[#D4A853]">
                <Play className="h-3 w-3 fill-current" /> Watch tour
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
