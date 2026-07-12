"use client";

import { cn } from "@/lib/utils";

interface ContentProps {
  content?: string;
  alignment?: "left" | "center" | "right";
}

export function ContentBlock({ content = "", alignment = "left" }: ContentProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "max-w-4xl mx-auto prose prose-lg",
            alignmentClasses[alignment]
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
