"use client";

/**
 * Sidebar Component - Section Palette for Visual Builder
 * 
 * Features:
 * - Grid of available section types with icons
 * - Categories: Hero, Content, Features, About, Services, Portfolio, Testimonials, CTA, Other
 * - Search/filter functionality
 * - Hover preview of section type
 * - Click to add to canvas
 * - Draggable items for drag-and-drop
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
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
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Star,
  Plus,
  Eye,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { componentRegistry, ComponentSchema } from "@/lib/component-registry";
import { cn } from "@/lib/utils";

// Icon mapping for components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

// Category definitions with their component types
interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  types: string[];
  description: string;
}

const categories: Category[] = [
  {
    id: "hero",
    label: "Hero Sections",
    icon: Layout,
    types: ["hero", "about_hero", "hero-premium"],
    description: "Large header sections with impactful visuals",
  },
  {
    id: "content",
    label: "Content",
    icon: FileText,
    types: ["about", "about_story", "content", "features", "home_about_premium"],
    description: "Text and media content blocks",
  },
  {
    id: "about",
    label: "About",
    icon: User,
    types: ["about_mission_vision", "about_stats", "about_values"],
    description: "Company information and story sections",
  },
  {
    id: "services",
    label: "Services",
    icon: Briefcase,
    types: ["services", "services-premium", "consultation"],
    description: "Service offerings and consultations",
  },
  {
    id: "showcase",
    label: "Showcase",
    icon: Image,
    types: ["portfolio", "portfolio-premium"],
    description: "Portfolio galleries and project displays",
  },
  {
    id: "social",
    label: "Social Proof",
    icon: Users,
    types: ["testimonials", "testimonials-premium", "team", "about_team"],
    description: "Testimonials, reviews, and team members",
  },
  {
    id: "info",
    label: "Information",
    icon: HelpCircle,
    types: ["faq", "contact", "stats", "stats-floating"],
    description: "FAQ, contact forms, and statistics",
  },
  {
    id: "cta",
    label: "Call to Action",
    icon: Megaphone,
    types: ["cta"],
    description: "Promotional banners and CTAs",
  },
  {
    id: "premium",
    label: "Premium",
    icon: Sparkles,
    types: ["why-choose-us", "why-choose-us-premium", "why-aliignspace-premium"],
    description: "Advanced animated sections",
  },
];

interface DraggableComponentItemProps {
  component: ComponentSchema;
  onAdd: () => void;
}

function DraggableComponentItem({ component, onAdd }: DraggableComponentItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${component.type}`,
    data: {
      type: component.type,
      isPaletteItem: true,
    },
  });

  const IconComponent = iconMap[component.icon || ""] || Layout;

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 101, 70, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onAdd}
      className={cn(
        "group relative p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab",
        "hover:border-terracotta-500/50 transition-all duration-200",
        isDragging && "opacity-50"
      )}
      title={`${component.label} - ${component.description} (${component.fields.length} fields)`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-700 group-hover:bg-terracotta-500/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-terracotta-400 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
            {component.label}
          </h4>
          <p className="text-xs text-gray-500 group-hover:text-gray-400 line-clamp-2 mt-0.5">
            {component.description}
          </p>
        </div>
      </div>
      
      {/* Drag hint overlay */}
      <div className="absolute inset-0 border-2 border-dashed border-terracotta-500/0 group-hover:border-terracotta-500/30 rounded-lg pointer-events-none transition-colors" />
      
      {/* Add button on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 bg-terracotta-500 rounded-full flex items-center justify-center">
          <Plus className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export interface SidebarProps {
  onAddSection: (type: string) => void;
}

export function Sidebar({ onAddSection }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery) return null;
    
    return componentRegistry.filter(
      (c) =>
        c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Get component count for each category
  const getCategoryCount = (category: Category) => {
    return componentRegistry.filter((c) =>
      category.types.includes(c.type)
    ).length;
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-lg flex items-center justify-center">
            <Layout className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Components</h2>
            <p className="text-xs text-gray-500">Drag to add to canvas</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-terracotta-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <span className="sr-only">Clear search</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Component List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredComponents ? (
            // Search results
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Search Results</span>
                <span>{filteredComponents.length} found</span>
              </div>
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <DraggableComponentItem
                    key={component.type}
                    component={component}
                    onAdd={() => onAddSection(component.type)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-sm">No components found</p>
                  <p className="text-gray-600 text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            // Categorized list
            <div className="space-y-3">
              {categories.map((category) => {
                const categoryComponents = componentRegistry.filter((c) =>
                  category.types.includes(c.type)
                );

                if (categoryComponents.length === 0) return null;

                const isExpanded = expandedCategories.includes(category.id);
                const count = getCategoryCount(category);
                const IconComponent = category.icon;

                return (
                  <div 
                    key={category.id}
                    className="border border-gray-800 rounded-lg overflow-hidden"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-800/50 transition-colors"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        hoveredCategory === category.id 
                          ? "bg-terracotta-500/20 text-terracotta-400"
                          : "bg-gray-800 text-gray-400"
                      )}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-200">
                            {category.label}
                          </span>
                          <span className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">
                            {count}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {category.description}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-gray-800"
                        >
                          <div className="p-3 space-y-2">
                            {categoryComponents.map((component) => (
                              <DraggableComponentItem
                                key={component.type}
                                component={component}
                                onAdd={() => onAddSection(component.type)}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            {componentRegistry.length} components available
          </span>
        </div>
        <p className="text-xs text-gray-600 text-center mt-2">
          Drag components or click to add instantly
        </p>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
