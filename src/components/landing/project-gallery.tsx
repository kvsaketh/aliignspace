"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleries } from "./content";

export function ProjectGallery() {
  const [tab, setTab] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const g = galleries[tab];

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Room type" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
          {galleries.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={i === tab}
              onClick={() => {
                setTab(i);
                track.current?.scrollTo({ left: 0 });
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                i === tab ? "bg-[#3B1868] text-white" : "text-[#1a1720]/70 hover:bg-[#3B1868]/5"
              }`}
            >
              {x.label}
              <span className={`ml-2 text-xs ${i === tab ? "text-[#E2B866]" : "text-[#1a1720]/40"}`}>{x.images.length}</span>
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Previous photos" : "Next photos"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3B1868]/20 text-[#3B1868] transition hover:bg-[#3B1868] hover:text-white"
            >
              {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        role="tabpanel"
        aria-label={`${g.label} designs`}
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {g.images.map((src, i) => (
          <figure key={src} className="relative aspect-[4/3] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#3B1868]/10 sm:w-[46%] lg:w-[38%]">
            <Image
              src={src}
              alt={`${g.label} interior by ALIIGNSPACE, photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 85vw"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
      <p className="mt-2 text-center text-xs uppercase tracking-[0.3em] text-[#1a1720]/40 sm:hidden">Swipe to explore</p>
    </div>
  );
}
