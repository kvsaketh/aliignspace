"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span
        className="block w-10 h-[1px] flex-shrink-0"
        style={{ backgroundColor: "rgb(255,134,113)" }}
      />
      <span
        className="text-xs font-medium tracking-[0.2em] uppercase"
        style={{ color: "rgb(255,134,113)" }}
      >
        {label}
      </span>
    </div>
  );
}
