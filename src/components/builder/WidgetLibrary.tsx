"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { widgetRegistry, widgetCategories } from "@/lib/builder/widget-registry";
import * as Icons from "lucide-react";
import type { WidgetType } from "@/types/builder";

function WidgetLibraryItem({ type, label, icon, description }: {
  type: WidgetType;
  label: string;
  icon: string;
  description: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: {
      type,
      isPaletteItem: true,
    },
  });

  const IconComponent = ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string }>>)[icon] || Icons.Box;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-coral-500/30 hover:bg-coral-500/5 cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-coral-500/20 flex items-center justify-center transition-colors">
        <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-coral-400 transition-colors" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
          {label}
        </div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
    </div>
  );
}

export function WidgetLibrary() {
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["layout", "content"])
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredWidgets = search
    ? widgetRegistry.filter(
        (w) =>
          w.label.toLowerCase().includes(search.toLowerCase()) ||
          w.description.toLowerCase().includes(search.toLowerCase())
      )
    : widgetRegistry;

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white mb-3">Widget Library</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search widgets..."
            className="pl-9 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-coral-500/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {search ? (
          <div className="space-y-1">
            {filteredWidgets.map((widget) => (
              <WidgetLibraryItem
                key={widget.type}
                type={widget.type}
                label={widget.label}
                icon={widget.icon}
                description={widget.description}
              />
            ))}
            {filteredWidgets.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No widgets found
              </div>
            )}
          </div>
        ) : (
          widgetCategories.map((category) => {
            const categoryWidgets = filteredWidgets.filter(
              (w) => w.category === category.id
            );
            const isExpanded = expandedCategories.has(category.id);

            return (
              <div key={category.id} className="mb-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center gap-2 w-full px-2 py-2 text-xs font-label tracking-wider uppercase text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isExpanded ? "" : "-rotate-90"
                    }`}
                  />
                  {category.label}
                  <span className="text-gray-600">({categoryWidgets.length})</span>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 pt-1">
                        {categoryWidgets.map((widget) => (
                          <WidgetLibraryItem
                            key={widget.type}
                            type={widget.type}
                            label={widget.label}
                            icon={widget.icon}
                            description={widget.description}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
