"use client";

import { useState, useCallback, Suspense, lazy, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BuilderSection } from "@/types";
import { getComponentSchema } from "@/lib/component-registry";

// Dynamic imports for block components
const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: lazy(() => import("@/components/blocks/hero").then((m) => ({ default: m.HeroBlock }))),
  "hero-premium": lazy(() => import("@/components/blocks/hero-premium").then((m) => ({ default: m.HeroPremium }))),
  features: lazy(() => import("@/components/blocks/features").then((m) => ({ default: m.FeaturesBlock }))),
  about: lazy(() => import("@/components/blocks/about").then((m) => ({ default: m.AboutBlock }))),
  "about-premium": lazy(() => import("@/components/blocks/about-premium").then((m) => ({ default: m.AboutPremium }))),
  services: lazy(() => import("@/components/blocks/services").then((m) => ({ default: m.ServicesBlock }))),
  "services-premium": lazy(() => import("@/components/blocks/services-premium").then((m) => ({ default: m.ServicesPremium }))),
  portfolio: lazy(() => import("@/components/blocks/portfolio").then((m) => ({ default: m.PortfolioBlock }))),
  "portfolio-premium": lazy(() => import("@/components/blocks/portfolio-premium").then((m) => ({ default: m.PortfolioPremium }))),
  testimonials: lazy(() => import("@/components/blocks/testimonials").then((m) => ({ default: m.TestimonialsBlock }))),
  "testimonials-premium": lazy(() => import("@/components/blocks/testimonials-premium").then((m) => ({ default: m.TestimonialsPremium }))),
  team: lazy(() => import("@/components/blocks/team").then((m) => ({ default: m.TeamBlock }))),
  faq: lazy(() => import("@/components/blocks/faq").then((m) => ({ default: m.FAQBlock }))),
  contact: lazy(() => import("@/components/blocks/contact").then((m) => ({ default: m.ContactBlock }))),
  cta: lazy(() => import("@/components/blocks/cta").then((m) => ({ default: m.CTABlock }))),
  content: lazy(() => import("@/components/blocks/content").then((m) => ({ default: m.ContentBlock }))),
  stats: lazy(() => import("@/components/blocks/stats").then((m) => ({ default: m.StatsBlock }))),
  "stats-floating": lazy(() => import("@/components/blocks/stats-floating").then((m) => ({ default: m.StatsFloating }))),
  consultation: lazy(() => import("@/components/blocks/consultation").then((m) => ({ default: m.ConsultationBlock }))),
  "why-choose-us": lazy(() => import("@/components/blocks/why-choose-us").then((m) => ({ default: m.WhyChooseUsBlock }))),
  "why-choose-us-premium": lazy(() => import("@/components/blocks/why-choose-us-premium").then((m) => ({ default: m.WhyChooseUsPremium }))),
  // About page specific blocks
  about_hero: lazy(() => import("@/components/blocks/AboutHero").then((m) => ({ default: m.AboutHero }))),
  about_story: lazy(() => import("@/components/blocks/StorySection").then((m) => ({ default: m.StorySection }))),
  about_mission_vision: lazy(() => import("@/components/blocks/StorySection").then((m) => ({ 
    default: (props: any) => (
      <m.StorySection 
        {...props} 
        label="Our Mission & Vision"
        heading="Purpose-Driven Design"
      />
    ) 
  }))),
  about_stats: lazy(() => import("@/components/blocks/StatsSection").then((m) => ({ default: m.StatsSection }))),
  about_team: lazy(() => import("@/components/blocks/TeamGrid").then((m) => ({ default: m.TeamGrid }))),
  about_values: lazy(() => import("@/components/blocks/StatsSection").then((m) => ({ 
    default: (props: any) => (
      <m.StatsSection 
        {...props} 
        variant="values"
      />
    ) 
  }))),
};

type DeviceType = "desktop" | "tablet" | "mobile";

interface PreviewCanvasProps {
  sections: BuilderSection[];
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onUpdateSection: (id: string, updates: Partial<BuilderSection>) => void;
  onDeleteSection: (id: string) => void;
  onDuplicateSection: (id: string) => void;
  device: DeviceType;
}

interface SortableSectionWrapperProps {
  section: BuilderSection;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<BuilderSection>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SortableSectionWrapper({
  section,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: SortableSectionWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: section.id,
    data: {
      type: section.type,
      section,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const schema = getComponentSchema(section.type);
  const isHidden = section.hidden || false;

  const BlockComponent = blockComponents[section.type];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layoutId={section.id}
      className={cn(
        "relative group transition-all duration-200",
        isDragging && "opacity-50 z-50",
        isSelected && "z-10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Selection Border */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-200",
          isSelected
            ? "ring-2 ring-terracotta-500 ring-offset-2 ring-offset-gray-950"
            : "ring-1 ring-transparent group-hover:ring-gray-700"
        )}
      />

      {/* Section Toolbar */}
      <div
        className={cn(
          "absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1.5 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-200",
          isSelected || isDragging
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="w-px h-4 bg-gray-700 mx-1" />

        {/* Section Type Label */}
        <span className="text-xs text-gray-400 px-2 truncate max-w-[100px]">
          {schema?.label || section.type}
        </span>

        <div className="w-px h-4 bg-gray-700 mx-1" />

        {/* Move Up */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
          disabled={isFirst}
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </Button>

        {/* Move Down */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
          disabled={isLast}
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>

        {/* Toggle Visibility */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7",
            isHidden
              ? "text-gray-500 hover:text-gray-300 hover:bg-gray-700"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onUpdate({ hidden: !isHidden });
          }}
        >
          {isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </Button>

        {/* Duplicate */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>

        {/* Edit/Settings */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7",
            isSelected
              ? "text-terracotta-400 hover:text-terracotta-300 hover:bg-terracotta-500/20"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <Settings className="h-3.5 w-3.5" />
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Hidden Overlay */}
      {isHidden && (
        <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[1px] z-20 flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500">
            <EyeOff className="h-5 w-5" />
            <span className="text-sm font-medium">Hidden Section</span>
          </div>
        </div>
      )}

      {/* Section Content */}
      <div className={cn("relative", isHidden && "grayscale")}>
        {BlockComponent ? (
          <Suspense
            fallback={
              <div className="h-48 bg-gray-800 animate-pulse flex items-center justify-center">
                <span className="text-gray-500 text-sm">Loading...</span>
              </div>
            }
          >
            <BlockComponent {...section.props} />
          </Suspense>
        ) : (
          <div className="h-48 bg-gray-800 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center">
            <span className="text-gray-400 font-medium">{schema?.label || section.type}</span>
            <span className="text-gray-500 text-sm mt-1">Component not available in preview</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function PreviewCanvas({
  sections,
  selectedSectionId,
  onSelectSection,
  onUpdateSection,
  onDeleteSection,
  onDuplicateSection,
  device,
}: PreviewCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  const deviceWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[device];

  const handleMoveSection = useCallback(
    (index: number, direction: "up" | "down") => {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sections.length) return;

      const newSections = [...sections];
      [newSections[index], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[index],
      ];

      // Find the section at newIndex and update it to trigger re-render
      const movedSection = newSections[newIndex];
      onUpdateSection(movedSection.id, { ...movedSection });
    },
    [sections, onUpdateSection]
  );

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-full flex justify-center transition-all duration-300",
        isOver && "bg-terracotta-500/5"
      )}
      onClick={() => onSelectSection(null)}
    >
      <div
        className="w-full transition-all duration-300"
        style={{ maxWidth: deviceWidth }}
      >
        {sections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "h-96 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors",
              isOver
                ? "border-terracotta-500 bg-terracotta-500/10"
                : "border-gray-800 bg-gray-900/50"
            )}
          >
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🎨</span>
            </div>
            <h3 className="text-white font-medium mb-2">Start Building Your Page</h3>
            <p className="text-gray-400 text-sm text-center max-w-sm mb-4">
              Drag components from the left sidebar and drop them here to start building your page
            </p>
            <span className="text-xs text-gray-500">
              {isOver ? "Drop to add section" : "Or click a component to add it"}
            </span>
          </motion.div>
        ) : (
          <div className="space-y-1 pb-20">
            <AnimatePresence mode="popLayout">
              {sections.map((section, index) => (
                <SortableSectionWrapper
                  key={section.id}
                  section={section}
                  isSelected={selectedSectionId === section.id}
                  onSelect={() => onSelectSection(section.id)}
                  onUpdate={(updates) => onUpdateSection(section.id, updates)}
                  onDelete={() => onDeleteSection(section.id)}
                  onDuplicate={() => onDuplicateSection(section.id)}
                  isFirst={index === 0}
                  isLast={index === sections.length - 1}
                  onMoveUp={() => handleMoveSection(index, "up")}
                  onMoveDown={() => handleMoveSection(index, "down")}
                />
              ))}
            </AnimatePresence>

            {/* Drop zone at the bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "h-24 border-2 border-dashed rounded-xl flex items-center justify-center transition-colors mt-4",
                isOver
                  ? "border-terracotta-500 bg-terracotta-500/10"
                  : "border-gray-800 hover:border-gray-700"
              )}
            >
              <span className="text-gray-500 text-sm">
                {isOver ? "Drop here to add" : "Drag components here"}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
