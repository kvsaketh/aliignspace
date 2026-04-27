"use client";

import { getBlockComponent } from "@/components/blocks";
import { componentRegistry, getComponentSchema } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { Loader2, Image, Type, AlignLeft, Grid, Layout, Users, MessageSquare, HelpCircle, Mail, Megaphone, FileText, Briefcase, Star } from "lucide-react";

interface BlockRendererProps {
  type: string;
  props: Record<string, any>;
  isEditing?: boolean;
  className?: string;
}

// Icon mapping for block types
const blockIcons: Record<string, React.ReactNode> = {
  hero: <Layout className="h-6 w-6" />,
  about: <Type className="h-6 w-6" />,
  features: <Grid className="h-6 w-6" />,
  services: <Briefcase className="h-6 w-6" />,
  portfolio: <Image className="h-6 w-6" />,
  testimonials: <MessageSquare className="h-6 w-6" />,
  team: <Users className="h-6 w-6" />,
  faq: <HelpCircle className="h-6 w-6" />,
  contact: <Mail className="h-6 w-6" />,
  cta: <Megaphone className="h-6 w-6" />,
  content: <AlignLeft className="h-6 w-6" />,
  stats: <Star className="h-6 w-6" />,
  process: <Grid className="h-6 w-6" />,
  consultation: <Briefcase className="h-6 w-6" />,
  googleReviews: <Star className="h-6 w-6" />,
  whyChooseUs: <Grid className="h-6 w-6" />,
};

// Placeholder component for missing blocks
function BlockPlaceholder({ type, schema }: { type: string; schema?: any }) {
  return (
    <div className="p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          {blockIcons[type] || <Layout className="h-6 w-6 text-gray-400" />}
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
    <div className="p-12 bg-gray-50 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-terracotta-500" />
    </div>
  );
}

export function BlockRenderer({
  type,
  props,
  isEditing = false,
  className,
}: BlockRendererProps) {
  const BlockComponent = getBlockComponent(type);
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
      <BlockComponent {...mergedProps} />

      {/* Edit Mode Indicators */}
      {isEditing && schema && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
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

  return (
    <div className="flex items-start gap-3 p-3">
      <div className="w-10 h-10 bg-terracotta-50 rounded-lg flex items-center justify-center flex-shrink-0 text-terracotta-500">
        {blockIcons[type] || <Layout className="h-5 w-5" />}
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
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
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
