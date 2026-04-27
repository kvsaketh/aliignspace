"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { componentRegistry, ComponentSchema } from "@/lib/component-registry";

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
};

// Group components by category
const categories: { id: string; label: string; types: string[] }[] = [
  {
    id: "hero",
    label: "Hero Sections",
    types: ["hero", "about_hero"],
  },
  {
    id: "content",
    label: "Content",
    types: ["about", "about_story", "content", "features"],
  },
  {
    id: "services",
    label: "Services",
    types: ["services"],
  },
  {
    id: "showcase",
    label: "Showcase",
    types: ["portfolio", "portfolio-premium"],
  },
  {
    id: "social",
    label: "Social Proof",
    types: ["testimonials", "team", "about_team", "about_stats", "about_values"],
  },
  {
    id: "info",
    label: "Information",
    types: ["faq", "contact", "about_mission_vision"],
  },
  {
    id: "cta",
    label: "Call to Action",
    types: ["cta"],
  },
];

interface DraggableComponentItemProps {
  component: ComponentSchema;
}

function DraggableComponentItem({ component }: DraggableComponentItemProps) {
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
      className={`
        group relative p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-grab
        hover:border-terracotta-500/50 transition-all duration-200
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
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
      
      {/* Drag hint */}
      <div className="absolute inset-0 border-2 border-dashed border-terracotta-500/0 group-hover:border-terracotta-500/30 rounded-lg pointer-events-none transition-colors" />
    </motion.div>
  );
}

export function ComponentPalette() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter components based on search
  const filteredComponents = searchQuery
    ? componentRegistry.filter(
        (c) =>
          c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white font-semibold mb-3">Components</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-terracotta-500"
          />
        </div>
      </div>

      {/* Component List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredComponents ? (
            // Search results
            <div className="space-y-3">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <DraggableComponentItem
                    key={component.type}
                    component={component}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No components found</p>
                </div>
              )}
            </div>
          ) : (
            // Categorized list
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryComponents = componentRegistry.filter((c) =>
                  category.types.includes(c.type)
                );

                if (categoryComponents.length === 0) return null;

                const isExpanded = expandedCategories.includes(category.id);

                return (
                  <div key={category.id}>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-2 w-full text-left mb-2 group"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-300" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300" />
                      )}
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-300">
                        {category.label}
                      </span>
                      <span className="text-xs text-gray-600">
                        ({categoryComponents.length})
                      </span>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        {categoryComponents.map((component) => (
                          <DraggableComponentItem
                            key={component.type}
                            component={component}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer hint */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Drag components to the canvas
        </p>
      </div>
    </div>
  );
}
