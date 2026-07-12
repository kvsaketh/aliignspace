"use client";

/**
 * Canvas Component - Drag & Drop Canvas for Visual Builder
 * 
 * Features:
 * - Full-width canvas showing sections in order
 * - Drag handle on each section for reordering
 * - Drop zones between sections for insertion
 * - Live preview of how sections look
 * - Empty state with "Add Section" CTA
 */

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
  Plus,
  Move,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BuilderSection } from "@/types";
import { getComponentSchema } from "@/lib/component-registry";
type DeviceType = "desktop" | "tablet" | "mobile";

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
  home_about_premium: lazy(() => import("@/components/blocks/about-premium").then((m) => ({ default: m.AboutPremium }))),
  "why-aliignspace-premium": lazy(() => import("@/components/blocks/why-choose-us-premium").then((m) => ({ default: m.WhyChooseUsPremium }))),
};

export interface CanvasProps {
  sections: BuilderSection[];
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onUpdateSection: (id: string, updates: Partial<BuilderSection>) => void;
  onDeleteSection: (id: string) => void;
  onDuplicateSection: (id: string) => void;
  onMoveSection: (id: string, direction: "up" | "down") => void;
  device: DeviceType;
}

interface SortableSectionWrapperProps {
  section: BuilderSection;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<BuilderSection>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

function SortableSectionWrapper({
  section,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  index,
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
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
          "absolute inset-0 pointer-events-none transition-all duration-200 rounded-sm",
          isSelected
            ? "ring-2 ring-terracotta-500 ring-offset-2 ring-offset-gray-950"
            : "ring-1 ring-transparent group-hover:ring-gray-700"
        )}
      />

      {/* Section Index Badge */}
      <div
        className={cn(
          "absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 z-20",
          isSelected
            ? "bg-terracotta-500 text-white"
            : "bg-gray-800 text-gray-500 opacity-0 group-hover:opacity-100"
        )}
      >
        {index + 1}
      </div>

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
          title="Drag to reorder"
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
          title="Move up"
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
          title="Move down"
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
          title={isHidden ? "Show section" : "Hide section"}
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
          title="Duplicate section"
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
          title="Edit section"
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
          title="Delete section"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Hidden Overlay */}
      {isHidden && (
        <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-sm">
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
              <div className="h-48 bg-gray-800 animate-pulse flex items-center justify-center rounded-sm">
                <span className="text-gray-500 text-sm">Loading...</span>
              </div>
            }
          >
            <BlockComponent {...section.props} />
          </Suspense>
        ) : (
          <div className="h-48 bg-gray-800 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center rounded-sm">
            <span className="text-gray-400 font-medium">{schema?.label || section.type}</span>
            <span className="text-gray-500 text-sm mt-1">Component not available in preview</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Drop Zone Indicator
function DropZone({ isActive, isOver }: { isActive: boolean; isOver: boolean }) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: isOver ? 1 : 0.5, 
        height: isOver ? 40 : 20 
      }}
      exit={{ opacity: 0, height: 0 }}
      className={cn(
        "w-full border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-200",
        isOver 
          ? "border-terracotta-500 bg-terracotta-500/10" 
          : "border-gray-700 bg-transparent"
      )}
    >
      {isOver && (
        <span className="text-terracotta-400 text-sm font-medium">Drop here</span>
      )}
    </motion.div>
  );
}

export function Canvas({
  sections,
  selectedSectionId,
  onSelectSection,
  onUpdateSection,
  onDeleteSection,
  onDuplicateSection,
  onMoveSection,
  device,
}: CanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  const deviceWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[device];

  const devicePadding = {
    desktop: "0",
    tablet: "20px",
    mobile: "20px",
  }[device];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-full flex justify-center transition-all duration-300",
        isOver && "bg-terracotta-500/5"
      )}
      style={{ padding: devicePadding }}
      onClick={() => onSelectSection(null)}
    >
      <div
        className="w-full transition-all duration-300"
        style={{ maxWidth: deviceWidth }}
      >
        {sections.length === 0 ? (
          <EmptyState isOver={isOver} />
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
                  onMoveUp={() => onMoveSection(section.id, "up")}
                  onMoveDown={() => onMoveSection(section.id, "down")}
                  isFirst={index === 0}
                  isLast={index === sections.length - 1}
                  index={index}
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
              <div className="flex flex-col items-center gap-2">
                <Plus className="h-6 w-6 text-gray-500" />
                <span className="text-gray-500 text-sm">
                  {isOver ? "Drop here to add" : "Drag components here"}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ isOver }: { isOver: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "h-[calc(100vh-200px)] min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors",
        isOver
          ? "border-terracotta-500 bg-terracotta-500/10"
          : "border-gray-800 bg-gray-900/50"
      )}
    >
      <motion.div 
        className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mb-6"
        animate={isOver ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Plus className={cn(
          "h-10 w-10 transition-colors",
          isOver ? "text-terracotta-400" : "text-gray-500"
        )} />
      </motion.div>
      <h3 className="text-white font-semibold text-lg mb-2">Start Building Your Page</h3>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-6">
        Drag components from the left sidebar and drop them here to start building your page
      </p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Move className="h-3 w-3" />
          Drag components
        </span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span className="flex items-center gap-1">
          <Settings className="h-3 w-3" />
          Edit properties
        </span>
        <span className="w-1 h-1 bg-gray-600 rounded-full" />
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          Preview live
        </span>
      </div>
      {isOver && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-4 py-2 bg-terracotta-500 text-white text-sm font-medium rounded-lg"
        >
          Drop to add section
        </motion.div>
      )}
    </motion.div>
  );
}

export default Canvas;
