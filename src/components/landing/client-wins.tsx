"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Real messages and reviews from ALIIGNSPACE clients (screenshots from the original ads page).
const WINS = [
  { src: "/lp/client-wins-1.webp", alt: "WhatsApp message from a client: “this house is a dream come true”", tag: "WhatsApp" },
  { src: "/lp/client-wins-2.webp", alt: "WhatsApp message from a client: “Amazinggg work”", tag: "WhatsApp" },
  { src: "/lp/client-wins-3.webp", alt: "Google review by Satish Kondeti about a full flat renovation", tag: "Google review" },
  { src: "/lp/client-wins-4.webp", alt: "Five-star Google review by Kurmarao A for a residence in Vizag", tag: "Google review" },
  { src: "/lp/client-wins-5.webp", alt: "Five-star Google review by Dishhiraa Konduru", tag: "Google review" },
];

export function ClientWins() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {WINS.map((w, i) => (
          <button
            key={w.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative w-[62%] shrink-0 snap-center text-left sm:w-[40%] lg:w-auto"
            aria-label={`Enlarge: ${w.alt}`}
          >
            {/* Phone frame */}
            <div className="relative aspect-[9/19] overflow-hidden rounded-[28px] border-[6px] border-[#1a1720] bg-[#1a1720] shadow-[0_30px_60px_-30px_rgba(26,23,32,0.6)] transition-transform duration-500 group-hover:-translate-y-2">
              <Image src={w.src} alt={w.alt} fill sizes="(max-width: 640px) 62vw, (max-width: 1024px) 40vw, 20vw" className="object-cover object-top" />
            </div>
            <span className="mt-3 block text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1a1720]/50">
              {w.tag}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={WINS[open].alt}
          data-lenis-prevent
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#16141f]/90 p-4 backdrop-blur-sm"
        >
          <button type="button" aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[88vh] w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
            <Image src={WINS[open].src} alt={WINS[open].alt} fill sizes="420px" className="rounded-2xl object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
