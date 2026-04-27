"use client";

import Link from "next/link";

interface MarqueeItem {
  title: string;
  link?: string;
}

interface Props {
  items?: MarqueeItem[];
  speed?: number;
  direction?: "left" | "right";
  variant?: "dark" | "light";
}

const defaultItems: MarqueeItem[] = [
  { title: "Full Home Interiors", link: "/services/full-home-interiors" },
  { title: "Modular Kitchen", link: "/services/modular-kitchen" },
  { title: "Living Room Interiors", link: "/services/living-room-interiors" },
  { title: "Bedroom Interiors", link: "/services/bedroom-interiors" },
  { title: "Wardrobe Design", link: "/services/wardrobe-design" },
  { title: "Luxury Furniture", link: "/services/luxury-furniture" },
];

function StarShape({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

function DiamondShape({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L22 12L12 22L2 12L12 2Z" />
    </svg>
  );
}

function CircleShape({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

const shapes = [StarShape, DiamondShape, CircleShape];

export function AertsenServicesMarquee({
  items = defaultItems,
  speed = 30,
  direction = "left",
  variant = "dark",
}: Props) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const isDark = variant === "dark";

  const bgClass = isDark ? "bg-[#1A1612]" : "bg-[#f9f7f4]";
  const textClass = isDark ? "text-[#f9f7f4]" : "text-[#1A1612]";
  const mutedTextClass = isDark ? "text-[#f9f7f4]/50" : "text-[#1A1612]/50";
  const shapeColor = "text-[rgb(255,134,113)]";

  const row1Anim = direction === "left" 
    ? { animation: `marqueeLeft ${speed}s linear infinite` } 
    : { animation: `marqueeRight ${speed}s linear infinite` };
  const row2Anim = direction === "left" 
    ? { animation: `marqueeRight ${speed}s linear infinite` } 
    : { animation: `marqueeLeft ${speed}s linear infinite` };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}} />
      <section className={`${bgClass} overflow-hidden py-16 lg:py-24`}>
        {/* Row 1: Large serif titles */}
        <div className="marquee-row relative mb-8">
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 ${isDark ? "bg-gradient-to-r from-[#1A1612] to-transparent" : "bg-gradient-to-r from-[#f9f7f4] to-transparent"}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 ${isDark ? "bg-gradient-to-l from-[#1A1612] to-transparent" : "bg-gradient-to-l from-[#f9f7f4] to-transparent"}`} />
          <div className="marquee-track flex whitespace-nowrap" style={row1Anim}>
            {duplicatedItems.map((item, i) => {
              const Shape = shapes[i % shapes.length];
              return (
                <div key={`r1-${i}`} className="flex items-center gap-8 px-6">
                  <Link href={item.link || "#"} className={`font-serif text-4xl sm:text-5xl lg:text-6xl ${textClass} opacity-60 hover:opacity-100 transition-opacity duration-300`}>
                    {item.title}
                  </Link>
                  <Shape className={`${shapeColor} flex-shrink-0 opacity-80`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Smaller sans descriptions */}
        <div className="marquee-row relative">
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 ${isDark ? "bg-gradient-to-r from-[#1A1612] to-transparent" : "bg-gradient-to-r from-[#f9f7f4] to-transparent"}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 ${isDark ? "bg-gradient-to-l from-[#1A1612] to-transparent" : "bg-gradient-to-l from-[#f9f7f4] to-transparent"}`} />
          <div className="marquee-track flex whitespace-nowrap" style={row2Anim}>
            {duplicatedItems.map((item, i) => {
              const Shape = shapes[(i + 1) % shapes.length];
              return (
                <div key={`r2-${i}`} className="flex items-center gap-6 px-6">
                  <Link href={item.link || "#"} className={`font-sans text-sm sm:text-base uppercase tracking-[0.15em] ${mutedTextClass} hover:opacity-100 transition-opacity duration-300`}>
                    {item.title}
                  </Link>
                  <Shape className="text-[rgb(250,202,194)] flex-shrink-0 opacity-70" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AertsenServicesMarquee;
