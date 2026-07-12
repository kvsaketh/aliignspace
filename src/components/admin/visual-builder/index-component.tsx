"use client";

/**
 * Visual Page Builder - WordPress-Level Page Builder Component
 * 
 * A comprehensive drag-and-drop page builder with:
 * - Drag & Drop Canvas for section management
 * - Section Palette with categorized components
 * - Property Panel for editing section properties
 * - Toolbar with device preview, undo/redo, save
 * - Full support for all field types from component registry
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { X, Save, Undo2, Redo2, Eye, Monitor, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";
import { Canvas } from "./Canvas";
import { Toolbar } from "./Toolbar";
import { PropertyPanel } from "./PropertyPanel";
import { componentRegistry, getComponentSchema } from "@/lib/component-registry";
import { BuilderSection } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface VisualBuilderProps {
  sections: BuilderSection[];
  onSectionsChange: (sections: BuilderSection[]) => void;
  onSave: () => void;
  onClose: () => void;
  pageTitle?: string;
  pageId?: string;
}

export type DeviceType = "desktop" | "tablet" | "mobile";
export type SaveStatus = "saved" | "saving" | "unsaved" | "error";

interface HistoryState {
  sections: BuilderSection[];
  timestamp: number;
}

const MAX_HISTORY_SIZE = 50;

// Generate default props from schema
function generateDefaultProps(type: string): Record<string, any> {
  const schema = getComponentSchema(type);
  const props: Record<string, any> = {};

  schema?.fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      props[field.name] = field.defaultValue;
    } else {
      // Set sensible defaults based on field type
      switch (field.type) {
        case "text":
        case "textarea":
        case "richtext":
          props[field.name] = "";
          break;
        case "boolean":
          props[field.name] = false;
          break;
        case "number":
          props[field.name] = 0;
          break;
        case "select":
          props[field.name] = field.options?.[0]?.value || "";
          break;
        case "array":
          props[field.name] = [];
          break;
        case "object":
          props[field.name] = {};
          break;
        case "media":
        case "url":
          props[field.name] = "";
          break;
        case "color":
          props[field.name] = "#000000";
          break;
        default:
          props[field.name] = null;
      }
    }
  });

  return props;
}

export function VisualBuilder({
  sections,
  onSectionsChange,
  onSave,
  onClose,
  pageTitle = "Untitled Page",
  pageId,
}: VisualBuilderProps) {
  const { toast } = useToast();
  const [localSections, setLocalSections] = useState<BuilderSection[]>(sections);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [isPropertyPanelOpen, setIsPropertyPanelOpen] = useState(true);

  // Undo/Redo state
  const [history, setHistory] = useState<HistoryState[]>([
    { sections, timestamp: Date.now() },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isUndoRedoRef = useRef(false);

  // Auto-save draft to localStorage
  const draftKey = pageId ? `visual-builder-draft-${pageId}` : null;

  // Load draft on mount
  useEffect(() => {
    if (draftKey) {
      try {
        const saved = localStorage.getItem(draftKey);
        if (saved) {
          const draft = JSON.parse(saved);
          if (draft.sections && Array.isArray(draft.sections)) {
            setLocalSections(draft.sections);
            onSectionsChange(draft.sections);
            setSaveStatus("unsaved");
          }
        }
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, [draftKey]);

  // Auto-save draft
  useEffect(() => {
    if (draftKey && !isUndoRedoRef.current) {
      const timeout = setTimeout(() => {
        localStorage.setItem(
          draftKey,
          JSON.stringify({ sections: localSections, savedAt: Date.now() })
        );
        if (saveStatus === "saved") {
          setSaveStatus("unsaved");
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [localSections, draftKey, saveStatus]);

  // Sync with parent when not in visual builder
  useEffect(() => {
    if (!isUndoRedoRef.current) {
      setLocalSections(sections);
    }
  }, [sections]);

  // Add to history helper
  const addToHistory = useCallback((newSections: BuilderSection[]) => {
    setHistory((prev) => {
      const newState = prev.slice(0, historyIndex + 1);
      newState.push({ sections: newSections, timestamp: Date.now() });
      if (newState.length > MAX_HISTORY_SIZE) {
        newState.shift();
      }
      return newState;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY_SIZE - 1));
  }, [historyIndex]);

  const updateSections = useCallback((newSections: BuilderSection[]) => {
    setLocalSections(newSections);
    onSectionsChange(newSections);
    if (!isUndoRedoRef.current) {
      addToHistory(newSections);
    }
    setSaveStatus("unsaved");
  }, [onSectionsChange, addToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newSections = history[newIndex].sections;
      setLocalSections(newSections);
      onSectionsChange(newSections);
      setSaveStatus("unsaved");
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [history, historyIndex, onSectionsChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newSections = history[newIndex].sections;
      setLocalSections(newSections);
      onSectionsChange(newSections);
      setSaveStatus("unsaved");
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
    }
  }, [history, historyIndex, onSectionsChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
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
      const newSection: BuilderSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        props: generateDefaultProps(type),
      };
      updateSections([...localSections, newSection]);
      setSelectedSectionId(newSection.id);
      setIsPropertyPanelOpen(true);

      toast({
        title: "Section added",
        description: `${getComponentSchema(type)?.label || type} added to page`,
      });
      return;
    }

    // Handle dropping from palette between sections
    if (active.data.current?.isPaletteItem && over.data.current?.sortable) {
      const type = active.data.current.type;
      const overIndex = localSections.findIndex((s) => s.id === over.id);
      
      if (overIndex !== -1) {
        const newSection: BuilderSection = {
          id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type,
          props: generateDefaultProps(type),
        };
        const newSections = [...localSections];
        newSections.splice(overIndex, 0, newSection);
        updateSections(newSections);
        setSelectedSectionId(newSection.id);
        setIsPropertyPanelOpen(true);

        toast({
          title: "Section added",
          description: `${getComponentSchema(type)?.label || type} added to page`,
        });
      }
      return;
    }

    // Handle reordering within canvas
    if (active.id !== over.id && over.id !== "canvas") {
      const oldIndex = localSections.findIndex((s) => s.id === active.id);
      const newIndex = localSections.findIndex((s) => s.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        updateSections(arrayMove(localSections, oldIndex, newIndex));
      }
    }
  };

  const handleSectionUpdate = useCallback(
    (sectionId: string, updates: Partial<BuilderSection>) => {
      const newSections = localSections.map((s) =>
        s.id === sectionId ? { ...s, ...updates } : s
      );
      updateSections(newSections);
    },
    [localSections, updateSections]
  );

  const handleSectionDelete = useCallback(
    (sectionId: string) => {
      const newSections = localSections.filter((s) => s.id !== sectionId);
      updateSections(newSections);
      if (selectedSectionId === sectionId) {
        setSelectedSectionId(null);
      }
      toast({
        title: "Section deleted",
        description: "The section has been removed",
      });
    },
    [localSections, selectedSectionId, updateSections, toast]
  );

  const handleSectionDuplicate = useCallback(
    (sectionId: string) => {
      const section = localSections.find((s) => s.id === sectionId);
      if (!section) return;

      const index = localSections.findIndex((s) => s.id === sectionId);
      const newSection: BuilderSection = {
        ...section,
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      const newSections = [...localSections];
      newSections.splice(index + 1, 0, newSection);
      updateSections(newSections);
      setSelectedSectionId(newSection.id);
      setIsPropertyPanelOpen(true);

      toast({
        title: "Section duplicated",
        description: "A copy has been created",
      });
    },
    [localSections, updateSections, toast]
  );

  const handleAddSection = useCallback(
    (type: string) => {
      const newSection: BuilderSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        props: generateDefaultProps(type),
      };
      updateSections([...localSections, newSection]);
      setSelectedSectionId(newSection.id);
      setIsPropertyPanelOpen(true);

      toast({
        title: "Section added",
        description: `${getComponentSchema(type)?.label || type} added to page`,
      });
    },
    [localSections, updateSections, toast]
  );

  const handleMoveSection = useCallback(
    (sectionId: string, direction: "up" | "down") => {
      const index = localSections.findIndex((s) => s.id === sectionId);
      if (index === -1) return;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= localSections.length) return;

      const newSections = arrayMove(localSections, index, newIndex);
      updateSections(newSections);
    },
    [localSections, updateSections]
  );

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await onSave();
      // Clear draft after successful save
      if (draftKey) {
        localStorage.removeItem(draftKey);
      }
      setSaveStatus("saved");
      toast({
        title: "Changes saved",
        description: "Your page has been saved successfully",
      });
    } catch (error) {
      setSaveStatus("error");
      toast({
        title: "Error saving",
        description: "There was a problem saving your changes",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    window.open(`/${pageId || ""}`, "_blank");
  };

  const selectedSection = localSections.find((s) => s.id === selectedSectionId);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed inset-0 z-50 flex flex-col bg-gray-950">
        {/* Toolbar */}
        <Toolbar
          pageTitle={pageTitle}
          device={device}
          onDeviceChange={setDevice}
          onSave={handleSave}
          onPreview={handlePreview}
          onClose={onClose}
          saveStatus={saveStatus}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={undo}
          onRedo={redo}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Section Palette */}
          <Sidebar onAddSection={handleAddSection} />

          {/* Center: Canvas */}
          <main className="flex-1 bg-gray-950 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto p-8">
              <Canvas
                sections={localSections}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
                onUpdateSection={handleSectionUpdate}
                onDeleteSection={handleSectionDelete}
                onDuplicateSection={handleSectionDuplicate}
                onMoveSection={handleMoveSection}
                device={device}
              />
            </div>
          </main>

          {/* Right Sidebar: Property Panel */}
          <AnimatePresence mode="wait">
            {selectedSection && isPropertyPanelOpen ? (
              <PropertyPanel
                key="property-panel"
                section={selectedSection}
                onUpdate={(updates) =>
                  handleSectionUpdate(selectedSection.id, updates)
                }
                onClose={() => {
                  setIsPropertyPanelOpen(false);
                  setSelectedSectionId(null);
                }}
              />
            ) : (
              <motion.aside
                key="empty-state"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                  <Monitor className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-white font-medium mb-2">No Section Selected</h3>
                <p className="text-gray-400 text-sm">
                  Click on any section in the canvas to edit its properties
                </p>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* Drag Overlay */}
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItem?.isPaletteItem && (
            <div className="bg-gray-800 border border-terracotta-500/50 rounded-lg p-4 shadow-2xl opacity-90 cursor-grabbing">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-terracotta-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-terracotta-400 text-lg">
                    {getComponentSchema(activeDragItem.type)?.icon?.charAt(0) || "B"}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {getComponentSchema(activeDragItem.type)?.label || activeDragItem.type}
                </span>
              </div>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default VisualBuilder;
