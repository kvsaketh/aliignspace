"use client";

/**
 * BlockRenderer Component - Renders blocks in the Visual Builder
 * 
 * Features:
 * - Renders block components based on type
 * - Merges default values with provided props
 * - Shows placeholder for missing blocks
 * - Shows loading state for async blocks
 * - Supports editing mode with overlay
 */

import { Suspense, lazy } from "react";
import {
  Layout,
  Grid,
  User,
  Briefcase,
  Image,
  MessageSquare,
  Users,
  HelpCircle,
  Mail,
  Megaphone,
  FileText,
  Target,
  BarChart3,
  Heart,
  BookOpen,
  Sparkles,
  Star,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getComponentSchema } from "@/lib/component-registry";

export interface BlockRendererProps {
  type: string;
  props: Record<string, any>;
  isEditing?: boolean;
  className?: string;
}

// Icon mapping for block types
const blockIcons: Record<string, React.ReactNode> = {
  hero: <Layout className="h-6 w-6" />,
  "hero-premium": <Sparkles className="h-6 w-6" />,
  about: <User className="h-6 w-6" />,
  "about-premium": <Sparkles className="h-6 w-6" />,
  about_hero: <Image className="h-6 w-6" />,
  about_story: <BookOpen className="h-6 w-6" />,
  about_mission_vision: <Target className="h-6 w-6" />,
  about_stats: <BarChart3 className="h-6 w-6" />,
  about_team: <Users className="h-6 w-6" />,
  about_values: <Heart className="h-6 w-6" />,
  features: <Grid className="h-6 w-6" />,
  services: <Briefcase className="h-6 w-6" />,
  "services-premium": <Sparkles className="h-6 w-6" />,
  portfolio: <Image className="h-6 w-6" />,
  "portfolio-premium": <Sparkles className="h-6 w-6" />,
  testimonials: <MessageSquare className="h-6 w-6" />,
  "testimonials-premium": <Sparkles className="h-6 w-6" />,
  team: <Users className="h-6 w-6" />,
  faq: <HelpCircle className="h-6 w-6" />,
  contact: <Mail className="h-6 w-6" />,
  cta: <Megaphone className="h-6 w-6" />,
  content: <FileText className="h-6 w-6" />,
  stats: <Star className="h-6 w-6" />,
  "stats-floating": <Sparkles className="h-6 w-6" />,
  consultation: <Briefcase className="h-6 w-6" />,
  "why-choose-us": <Grid className="h-6 w-6" />,
  "why-choose-us-premium": <Sparkles className="h-6 w-6" />,
  home_about_premium: <Sparkles className="h-6 w-6" />,
  "why-aliignspace-premium": <Sparkles className="h-6 w-6" />,
};

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

// Placeholder component for missing blocks
function BlockPlaceholder({ type, schema }: { type: string; schema?: any }) {
  const icon = blockIcons[type] || <Layout className="h-6 w-6 text-gray-400" />;

  return (
    <div className="p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {schema?.label || type}
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          {schema?.description || "This block is not yet implemented."}
        </p>
      </div>
    </div>
  );
}

// Loading state for blocks
function BlockLoading() {
  return (
    <div className="p-12 bg-gray-50 flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-terracotta-500 mb-3" />
      <span className="text-gray-500 text-sm">Loading component...</span>
    </div>
  );
}

// Error state for blocks
function BlockError({ type, error }: { type: string; error?: Error }) {
  return (
    <div className="p-12 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-red-900 mb-2">
          Error Loading Block
        </h3>
        <p className="text-sm text-red-600 max-w-md">
          Failed to load &quot;{type}&quot; component. {error?.message || "Please try again."}
        </p>
      </div>
    </div>
  );
}

export function BlockRenderer({
  type,
  props,
  isEditing = false,
  className,
}: BlockRendererProps) {
  const BlockComponent = blockComponents[type];
  const schema = getComponentSchema(type);

  // Merge default values with provided props
  const mergedProps = schema?.fields.reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: props[field.name] ?? field.defaultValue,
    };
  }, {}) || props;

  if (!BlockComponent) {
    return (
      <div className={cn("block-renderer", className)}>
        <BlockPlaceholder type={type} schema={schema} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "block-renderer relative",
        isEditing && "pointer-events-none",
        className
      )}
    >
      {/* Edit Overlay - prevents interaction with block content while editing */}
      {isEditing && (
        <div className="absolute inset-0 z-10 cursor-pointer" />
      )}

      {/* Block Content */}
      <Suspense fallback={<BlockLoading />}>
        <BlockComponent {...mergedProps} />
      </Suspense>

      {/* Edit Mode Indicators */}
      {isEditing && schema && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
            {schema.label}
          </div>
        </div>
      )}
    </div>
  );
}

// Export individual block preview for use in library
export function BlockPreview({ type }: { type: string }) {
  const schema = getComponentSchema(type);
  const icon = blockIcons[type] || <Layout className="h-5 w-5" />;

  return (
    <div className="flex items-start gap-3 p-3">
      <div className="w-10 h-10 bg-terracotta-50 rounded-lg flex items-center justify-center flex-shrink-0 text-terracotta-500">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="font-medium text-sm text-gray-900">{schema?.label || type}</h4>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
          {schema?.description || "No description available"}
        </p>
      </div>
    </div>
  );
}

// Block skeleton for loading states
export function BlockSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-48 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// Empty block state
export function EmptyBlock({ message = "No content" }: { message?: string }) {
  return (
    <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

// Block type badge
export function BlockTypeBadge({ type }: { type: string }) {
  const schema = getComponentSchema(type);
  const icon = blockIcons[type];

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
      {icon && <span className="w-3 h-3">{icon}</span>}
      {schema?.label || type}
    </span>
  );
}

// Export list of available block types
export function getAvailableBlockTypes(): string[] {
  return Object.keys(blockComponents);
}

// Check if block type is available
export function isBlockTypeAvailable(type: string): boolean {
  return type in blockComponents;
}

export default BlockRenderer;
