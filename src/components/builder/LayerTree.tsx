"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, ChevronRight, ChevronDown, Trash2, Copy } from "lucide-react";
import { useBuilderStore } from "@/stores/builder-store";
import { getWidgetDefinition } from "@/lib/builder/widget-registry";
import * as Icons from "lucide-react";
import type { WidgetData } from "@/types/builder";

interface LayerTreeItemProps {
  widget: WidgetData;
  depth: number;
  children: WidgetData[];
}

function LayerTreeItem({ widget, depth, children }: LayerTreeItemProps) {
  const {
    selectedWidgetId,
    selectWidget,
    deleteWidget,
    duplicateWidget,
    toggleWidgetVisibility,
  } = useBuilderStore();
  const [expanded, setExpanded] = useState(true);

  const isSelected = selectedWidgetId === widget.id;
  const definition = getWidgetDefinition(widget.type);
  const IconComponent =
    ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string }>>)[
      definition?.icon || "Box"
    ] || Icons.Box;

  const hasChildren = children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
          isSelected
            ? "bg-coral-500/20 text-coral-300"
            : "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => selectWidget(widget.id)}
      >
        {/* Expand/collapse */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="flex-shrink-0 text-gray-500 hover:text-gray-300"
          >
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        ) : (
          <span className="w-3.5" />
        )}

        {/* Icon */}
        <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />

        {/* Label */}
        <span className="text-sm truncate flex-1 min-w-0">
          {widget.content.title || widget.content.text || widget.content.label || definition?.label || widget.type}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWidgetVisibility(widget.id);
            }}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {widget.hidden ? (
              <EyeOff className="w-3 h-3" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateWidget(widget.id);
            }}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteWidget(widget.id);
            }}
            className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Children */}
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children.map((child) => (
              <LayerTreeItem
                key={child.id}
                widget={child}
                depth={depth + 1}
                children={[]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LayerTree() {
  const { widgets, selectedWidgetId, selectWidget } = useBuilderStore();

  // Get root-level widgets (no parentId)
  const rootWidgets = widgets.filter((w) => !w.parentId);

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white">Layer Tree</h3>
        <p className="text-xs text-gray-500 mt-1">
          {widgets.length} widget{widgets.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {rootWidgets.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No widgets yet
          </div>
        ) : (
          <div className="space-y-0.5">
            {rootWidgets.map((widget) => (
              <div key={widget.id} className="group">
                <LayerTreeItem
                  widget={widget}
                  depth={0}
                  children={widgets.filter((w) => w.parentId === widget.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
