"use client";

import { Section } from "@/types";
import { getBlockComponent } from "./blocks";
import { getSectionComponent } from "@/lib/section-mapper";

interface PageRendererProps {
  sections: Section[];
  context?: Record<string, any>;
}

export function PageRenderer({ sections, context }: PageRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">This page has no content yet.</p>
      </div>
    );
  }

  return (
    <main>
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          // Try block registry first, then section mapper as fallback
          const BlockComponent = getBlockComponent(section.type) || getSectionComponent(section.type);

          if (!BlockComponent) {
            console.warn(`Unknown block type: ${section.type}`);
            return (
              <div key={section.id} className="py-8 px-4 text-center text-amber-600 bg-amber-50 border border-amber-200 rounded-lg my-4">
                <p className="font-medium">Unknown block type: <code className="bg-amber-100 px-1 rounded">{section.type}</code></p>
                <p className="text-sm text-amber-500 mt-1">This section is not registered in the component registry.</p>
              </div>
            );
          }

          const mergedProps = {
            ...(section.props || {}),
            ...(context || {}),
          };

          return (
            <BlockComponent
              key={section.id}
              {...mergedProps}
            />
          );
        })}
    </main>
  );
}
