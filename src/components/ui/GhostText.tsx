"use client";

import { cn } from "@/lib/utils";

interface GhostTextProps {
  text: string;
  className?: string;
  position?: "left" | "right" | "center";
}

export function GhostText({ text, className, position = "left" }: GhostTextProps) {
  const positionClasses = {
    left: "left-0 text-left",
    right: "right-0 text-right",
    center: "left-1/2 -translate-x-1/2 text-center",
  };

  return (
    <span
      className={cn(
        "absolute pointer-events-none select-none font-serif text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] leading-none tracking-tight",
        "text-[#1A1612]/[0.03] whitespace-nowrap",
        positionClasses[position],
        className
      )}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
