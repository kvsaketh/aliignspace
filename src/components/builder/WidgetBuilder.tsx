"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
  Tablet,
  Save,
  Eye,
  X,
  Loader2,
  LayoutList,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/builder-store";
import { getWidgetDefinition } from "@/lib/builder/widget-registry";
import { WidgetLibrary } from "./WidgetLibrary";
import { PropertyPanel } from "./PropertyPanel";
import { LayerTree } from "./LayerTree";
import { WidgetRenderer } from "./WidgetRenderer";
import type { DeviceType, WidgetData } from "@/types/builder";

interface WidgetBuilderProps {
  pageId?: string;
  onSave?: () => Promise<void>;
  onClose?: () => void;
}

function DeviceToolbar({
  device,
  onDeviceChange,
}: {
  device: DeviceType;
  onDeviceChange: (d: DeviceType) => void;
}) {
  const devices: { id: DeviceType; icon: React.ElementType; label: string }[] = [
    { id: "desktop", icon: Monitor, label: "Desktop" },
    { id: "tablet", icon: Tablet, label: "Tablet" },
    { id: "mobile", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
      {devices.map((d) => (
        <button
          key={d.id}
          onClick={() => onDeviceChange(d.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            device === d.id
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <d.icon className="w-3.5 h-3.5" />
          {d.label}
        </button>
      ))}
    </div>
  );
}

function CanvasArea({
  device,
  onSelectWidget,
}: {
  device: DeviceType;
  onSelectWidget: (id: string | null) => void;
}) {
  const { widgets, selectedWidgetId, selectWidget } = useBuilderStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  const deviceWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[device];

  const rootWidgets = widgets.filter((w) => !w.parentId);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-auto p-8 transition-colors ${
        isOver ? "bg-coral-500/5" : ""
      }`}
      onClick={() => {
        selectWidget(null);
        onSelectWidget(null);
      }}
    >
      <div
        className="mx-auto transition-all duration-300 min-h-[600px]"
        style={{ maxWidth: deviceWidth }}
      >
        {rootWidgets.length === 0 ? (
          <div
            className={`h-[calc(100vh-300px)] border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${
              isOver
                ? "border-coral-500 bg-coral-500/10"
                : "border-gray-800 bg-gray-900/50"
            }`}
          >
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <PanelLeft className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Start Building Your Page
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-sm">
              Drag widgets from the left sidebar and drop them here
            </p>
          </div>
        ) : (
          <div className="space-y-1 pb-20">
            {rootWidgets.map((widget) => (
              <WidgetRenderer
                key={widget.id}
                widget={widget}
                device={device}
                isSelected={selectedWidgetId === widget.id}
                onSelect={() => {
                  selectWidget(widget.id);
                  onSelectWidget(widget.id);
                }}
              />
            ))}

            {/* Bottom drop zone */}
            <div
              className={`h-24 border-2 border-dashed rounded-xl flex items-center justify-center transition-colors mt-4 ${
                isOver
                  ? "border-coral-500 bg-coral-500/10"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              <span className="text-gray-500 text-sm">
                {isOver ? "Drop here to add" : "Drag widgets here"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function WidgetBuilder({ pageId, onSave, onClose }: WidgetBuilderProps) {
  const { widgets, device, setDevice, undo, redo, canUndo, canRedo, addWidget } =
    useBuilderStore();
  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showLayerTree, setShowLayerTree] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItem(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    // Handle dropping from palette to canvas
    if (active.data.current?.isPaletteItem && over.id === "canvas") {
      const type = active.data.current.type;
      const definition = getWidgetDefinition(type);

      const newWidget: Omit<WidgetData, "id" | "createdAt" | "updatedAt"> = {
        sectionId: pageId || "default",
        type,
        order: widgets.length,
        parentId: null,
        content: definition?.defaultContent || {},
        style: definition?.defaultStyle || {},
        responsive: {},
        animation: {},
      };

      addWidget(newWidget);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed inset-0 z-50 flex flex-col bg-gray-950">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-coral-500 to-coral-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-semibold">Widget Builder</span>
            </div>
          </div>

          {/* Center: Device Toolbar */}
          <DeviceToolbar device={device} onDeviceChange={setDevice} />

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2 pr-2 border-r border-gray-700">
              <Button
                variant="ghost"
                size="icon"
                onClick={undo}
                disabled={!canUndo}
                className="text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={redo}
                disabled={!canRedo}
                className="text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLayerTree(!showLayerTree)}
              className={`text-gray-400 hover:text-white hover:bg-gray-800 ${
                showLayerTree ? "bg-gray-800 text-coral-400" : ""
              }`}
              title="Layer Tree"
            >
              <LayoutList className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open(`/${pageId || ""}`, "_blank")}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-coral-500 hover:bg-coral-600 text-white"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Widget Library or Layer Tree */}
          <AnimatePresence mode="wait">
            {showLayerTree ? (
              <motion.aside
                key="layer-tree"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-64 flex-shrink-0"
              >
                <LayerTree />
              </motion.aside>
            ) : (
              <motion.aside
                key="widget-library"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-72 flex-shrink-0"
              >
                <WidgetLibrary />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Center: Canvas */}
          <main className="flex-1 bg-gray-950 overflow-hidden flex flex-col">
            <CanvasArea
              device={device}
              onSelectWidget={setSelectedWidgetId}
            />
          </main>

          {/* Right Sidebar: Property Panel */}
          <AnimatePresence mode="wait">
            <motion.aside
              key="property-panel"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-80 flex-shrink-0"
            >
              <PropertyPanel onClose={() => setSelectedWidgetId(null)} />
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDragItem?.isPaletteItem && (
          <div className="bg-gray-800 border border-coral-500/50 rounded-lg p-4 shadow-2xl opacity-90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-coral-500/20 rounded-lg flex items-center justify-center">
                <span className="text-coral-400 text-lg">
                  {getWidgetDefinition(activeDragItem.type)?.icon?.charAt(0) || "W"}
                </span>
              </div>
              <span className="text-white font-medium">
                {getWidgetDefinition(activeDragItem.type)?.label || activeDragItem.type}
              </span>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
