"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Plus, GripVertical, Pencil, Trash2, Palette } from "lucide-react";
import { componentRegistry } from "@/lib/component-registry";
import { SectionEditor } from "./section-editor";
import { VisualBuilder } from "@/components/admin/visual-builder";

interface PageBuilderProps {
  sections: any[];
  onSectionsChange: (sections: any[]) => void;
}

interface SortableSectionProps {
  section: any;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

function SortableSection({
  section,
  index,
  onEdit,
  onDelete,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const componentType = componentRegistry.find((c) => c.type === section.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="p-2 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {componentType?.label || section.type}
            </span>
            <span className="text-sm text-gray-400">#{index + 1}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {section.props?.heading || section.props?.title || "No title"}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PageBuilder({ sections, onSectionsChange }: PageBuilderProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      onSectionsChange(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleAddSection = (type: string) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      props: {},
    };
    onSectionsChange([...sections, newSection]);
    setIsAddDialogOpen(false);
    setEditingSection(newSection);
    setEditingIndex(sections.length);
  };

  const handleEditSection = (index: number) => {
    setEditingSection(sections[index]);
    setEditingIndex(index);
  };

  const handleDeleteSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    onSectionsChange(newSections);
  };

  const handleSaveSection = (updatedSection: any) => {
    const newSections = [...sections];
    newSections[editingIndex] = updatedSection;
    onSectionsChange(newSections);
    setEditingSection(null);
    setEditingIndex(-1);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Visual Builder Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Page Sections</h3>
          <Button
            variant="outline"
            onClick={() => setIsVisualBuilderOpen(true)}
            className="border-terracotta-500/50 text-terracotta-600 hover:bg-terracotta-50"
          >
            <Palette className="mr-2 h-4 w-4" />
            Switch to Visual Builder
          </Button>
        </div>

      {/* Add Section Button */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {componentRegistry.map((component) => (
              <button
                key={component.type}
                onClick={() => handleAddSection(component.type)}
                className="text-left p-4 border rounded-lg hover:border-terracotta-500 hover:bg-terracotta-50 transition-colors"
              >
                <h4 className="font-medium mb-1">{component.label}</h4>
                <p className="text-sm text-gray-500">
                  {component.description}
                </p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Sections List */}
      {sections.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No sections added yet. Click the button above to add your first
            section.
          </p>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sections.map((section, index) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  index={index}
                  onEdit={() => handleEditSection(index)}
                  onDelete={() => handleDeleteSection(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Section Editor Dialog */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          isOpen={!!editingSection}
          onClose={() => {
            setEditingSection(null);
            setEditingIndex(-1);
          }}
          onSave={handleSaveSection}
        />
      )}
    </div>

    {/* Visual Builder */}
    {isVisualBuilderOpen && (
      <VisualBuilder
        sections={sections}
        onSectionsChange={onSectionsChange}
        onSave={() => setIsVisualBuilderOpen(false)}
        onClose={() => setIsVisualBuilderOpen(false)}
      />
    )}
  </>
  );
}
