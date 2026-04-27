"use client";

import { ComponentType } from "react";
import {
  getSectionComponent,
  isValidSectionType,
  mergeSectionProps,
  SectionType,
  SectionProps,
  sectionTypeLabels,
} from "@/lib/section-mapper";

interface SectionRendererProps {
  type: string;
  props?: Record<string, unknown>;
  index?: number;
}

// Error fallback component
function SectionError({ type }: { type: string }) {
  return (
    <div className="w-full py-12 bg-red-50 border-y border-red-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-sm">
          Error rendering section: <strong>{type}</strong>
        </p>
      </div>
    </div>
  );
}

// Render section component
function RenderSection({ 
  type, 
  props, 
  index 
}: { 
  type: SectionType; 
  props: Record<string, unknown>; 
  index: number;
}) {
  const Component = getSectionComponent(type) as ComponentType<any> | null;
  
  if (!Component) {
    return <SectionError type={type} />;
  }
  
  const mergedProps = mergeSectionProps(type, props as Partial<SectionProps>);
  
  return (
    <section data-section-type={type} data-section-index={index} data-section-label={sectionTypeLabels[type]}>
      <Component {...mergedProps} />
    </section>
  );
}

// Render multiple sections
interface SectionsRendererProps {
  sections: Array<{
    id: string;
    type: string;
    order: number;
    props: Record<string, unknown>;
  }>;
  isPreview?: boolean;
  selectedSectionId?: string | null;
  onSectionClick?: (section: { id: string; type: string; order: number; props: Record<string, unknown> }) => void;
}

export function SectionsRenderer({
  sections,
  isPreview = false,
  selectedSectionId,
  onSectionClick,
}: SectionsRendererProps) {
  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedSections.map((section, index) => (
        <div
          key={section.id}
          onClick={() => onSectionClick?.(section)}
          className={isPreview && selectedSectionId === section.id ? "ring-4 ring-terracotta-500 ring-offset-4" : ""}
        >
          <SectionRenderer
            type={section.type}
            props={section.props}
            index={index}
          />
        </div>
      ))}
    </>
  );
}

export function SectionRenderer({ type, props = {}, index = 0 }: SectionRendererProps) {
  // Validate section type
  if (!isValidSectionType(type)) {
    console.warn(`Invalid section type: ${type}`);
    return <SectionError type={type} />;
  }

  const sectionType = type as SectionType;
  
  return <RenderSection type={sectionType} props={props} index={index} />;
}
