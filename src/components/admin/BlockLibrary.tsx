"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { componentRegistry } from "@/lib/component-registry";
import { BlockPreview } from "./BlockRenderer";
import { Search, Plus, Layout, Type, Grid, Image, Users, MessageSquare, HelpCircle, Mail, Megaphone, AlignLeft, Star, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockLibraryProps {
  onAddBlock: (type: string, position?: number) => void;
}

// Block categories
const categories = {
  all: "All Blocks",
  hero: "Hero",
  content: "Content",
  grid: "Grid & Lists",
  cta: "Call to Action",
  social: "Social Proof",
  form: "Forms & Contact",
} as const;

// Category mapping for blocks
type CategoryKey = keyof typeof categories;

const blockCategories: Record<string, CategoryKey[]> = {
  hero: ["all", "hero"],
  about: ["all", "content"],
  features: ["all", "grid"],
  services: ["all", "grid"],
  portfolio: ["all", "grid", "social"],
  testimonials: ["all", "social"],
  team: ["all", "social"],
  faq: ["all", "content"],
  contact: ["all", "form"],
  cta: ["all", "cta"],
  content: ["all", "content"],
  stats: ["all", "social"],
  process: ["all", "content"],
  consultation: ["all", "form"],
  googleReviews: ["all", "social"],
  whyChooseUs: ["all", "content"],
};

// Category icons
const categoryIcons: Record<CategoryKey, React.ReactNode> = {
  all: <Layout className="h-4 w-4" />,
  hero: <Image className="h-4 w-4" />,
  content: <AlignLeft className="h-4 w-4" />,
  grid: <Grid className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  social: <Users className="h-4 w-4" />,
  form: <Mail className="h-4 w-4" />,
};

// Block type icons
const blockTypeIcons: Record<string, React.ReactNode> = {
  hero: <Image className="h-5 w-5" />,
  about: <Type className="h-5 w-5" />,
  features: <Grid className="h-5 w-5" />,
  services: <Briefcase className="h-5 w-5" />,
  portfolio: <Image className="h-5 w-5" />,
  testimonials: <MessageSquare className="h-5 w-5" />,
  team: <Users className="h-5 w-5" />,
  faq: <HelpCircle className="h-5 w-5" />,
  contact: <Mail className="h-5 w-5" />,
  cta: <Megaphone className="h-5 w-5" />,
  content: <AlignLeft className="h-5 w-5" />,
  stats: <Star className="h-5 w-5" />,
  process: <Grid className="h-5 w-5" />,
  consultation: <Briefcase className="h-5 w-5" />,
  googleReviews: <Star className="h-5 w-5" />,
  whyChooseUs: <Grid className="h-5 w-5" />,
};

export function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  // Filter blocks based on search and category
  const filteredBlocks = componentRegistry.filter((block) => {
    const matchesSearch =
      searchQuery === "" ||
      block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      blockCategories[block.type]?.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  // Group blocks by category for "all" view
  const groupedBlocks = activeCategory === "all"
    ? {
        hero: filteredBlocks.filter((b) => blockCategories[b.type]?.includes("hero")),
        content: filteredBlocks.filter((b) =>
          blockCategories[b.type]?.some((c) => c === "content" || c === "grid")
        ),
        social: filteredBlocks.filter((b) =>
          blockCategories[b.type]?.includes("social")
        ),
        cta: filteredBlocks.filter((b) =>
          blockCategories[b.type]?.includes("cta") ||
          blockCategories[b.type]?.includes("form")
        ),
      }
    : null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900 mb-1">Block Library</h2>
        <p className="text-sm text-gray-500">
          Drag blocks to build your page
        </p>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 pb-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-1 py-2">
            {(Object.keys(categories) as CategoryKey[]).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex-shrink-0 text-xs",
                  activeCategory === category && "bg-terracotta-50 text-terracotta-600"
                )}
              >
                {categoryIcons[category]}
                <span className="ml-1.5">{categories[category]}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Blocks List */}
      <ScrollArea className="flex-1">
        <div className="p-4 pt-2 space-y-6">
          {filteredBlocks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                No blocks found matching &quot;{searchQuery}&quot;
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : activeCategory === "all" && groupedBlocks ? (
            // Grouped view
            <>
              {groupedBlocks.hero.length > 0 && (
                <BlockGroup
                  title="Hero Sections"
                  icon={<Image className="h-4 w-4" />}
                  blocks={groupedBlocks.hero}
                  onAdd={onAddBlock}
                  onHover={setHoveredBlock}
                  hoveredBlock={hoveredBlock}
                />
              )}
              {groupedBlocks.content.length > 0 && (
                <BlockGroup
                  title="Content Sections"
                  icon={<AlignLeft className="h-4 w-4" />}
                  blocks={groupedBlocks.content}
                  onAdd={onAddBlock}
                  onHover={setHoveredBlock}
                  hoveredBlock={hoveredBlock}
                />
              )}
              {groupedBlocks.social.length > 0 && (
                <BlockGroup
                  title="Social Proof"
                  icon={<Users className="h-4 w-4" />}
                  blocks={groupedBlocks.social}
                  onAdd={onAddBlock}
                  onHover={setHoveredBlock}
                  hoveredBlock={hoveredBlock}
                />
              )}
              {groupedBlocks.cta.length > 0 && (
                <BlockGroup
                  title="CTA & Forms"
                  icon={<Megaphone className="h-4 w-4" />}
                  blocks={groupedBlocks.cta}
                  onAdd={onAddBlock}
                  onHover={setHoveredBlock}
                  hoveredBlock={hoveredBlock}
                />
              )}
            </>
          ) : (
            // Flat list view
            <div className="grid gap-2">
              {filteredBlocks.map((block) => (
                <BlockCard
                  key={block.type}
                  block={block}
                  onAdd={() => onAddBlock(block.type)}
                  isHovered={hoveredBlock === block.type}
                  onHover={() => setHoveredBlock(block.type)}
                  onLeave={() => setHoveredBlock(null)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          {filteredBlocks.length} block{filteredBlocks.length !== 1 ? "s" : ""} available
        </p>
      </div>
    </div>
  );
}

// Block Group Component
interface BlockGroupProps {
  title: string;
  icon: React.ReactNode;
  blocks: typeof componentRegistry;
  onAdd: (type: string) => void;
  onHover: (type: string | null) => void;
  hoveredBlock: string | null;
}

function BlockGroup({
  title,
  icon,
  blocks,
  onAdd,
  onHover,
  hoveredBlock,
}: BlockGroupProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="grid gap-2">
        {blocks.map((block) => (
          <BlockCard
            key={block.type}
            block={block}
            onAdd={() => onAdd(block.type)}
            isHovered={hoveredBlock === block.type}
            onHover={() => onHover(block.type)}
            onLeave={() => onHover(null)}
          />
        ))}
      </div>
    </div>
  );
}

// Block Card Component
interface BlockCardProps {
  block: (typeof componentRegistry)[0];
  onAdd: () => void;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function BlockCard({
  block,
  onAdd,
  isHovered,
  onHover,
  onLeave,
}: BlockCardProps) {
  return (
    <div
      className={cn(
        "group relative border rounded-lg transition-all cursor-pointer overflow-hidden",
        isHovered
          ? "border-terracotta-500 ring-1 ring-terracotta-500 shadow-sm"
          : "border-gray-200 hover:border-gray-300"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-600 group-hover:bg-terracotta-50 group-hover:text-terracotta-500 transition-colors">
            {blockTypeIcons[block.type] || <Layout className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900">{block.label}</h4>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {block.description}
            </p>
          </div>
        </div>
      </div>

      {/* Add Button Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-terracotta-500/95 flex items-center justify-center transition-opacity",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Button
          size="sm"
          variant="secondary"
          onClick={onAdd}
          className="bg-white text-terracotta-600 hover:bg-gray-100"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Block
        </Button>
      </div>
    </div>
  );
}
