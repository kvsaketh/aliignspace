"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GripVertical,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Globe,
  Loader2,
  ChevronLeft,
  Type,
  Image,
  Palette,
  Layout,
  Plus,
  Trash2 as TrashIcon,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BuilderSection, FieldSchema } from "@/types";
import { BlockLibrary } from "./BlockLibrary";
import { BlockRenderer } from "./BlockRenderer";
import { SectionEditor } from "./SectionEditor";
import { getComponentSchema, componentRegistry } from "@/lib/component-registry";
import { useToast } from "@/hooks/use-toast";

export interface VisualBuilderProps {
  sections: BuilderSection[];
  onSectionsChange: (sections: BuilderSection[]) => void;
  pageTitle?: string;
  pageStatus?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  onSave?: (status?: "DRAFT" | "PUBLISHED") => Promise<void>;
  onPublish?: () => Promise<void>;
}

// Field type icons
const fieldIcons: Record<string, React.ReactNode> = {
  text: <Type className="h-4 w-4" />,
  textarea: <Type className="h-4 w-4" />,
  richtext: <Type className="h-4 w-4" />,
  media: <Image className="h-4 w-4" />,
  color: <Palette className="h-4 w-4" />,
  select: <Layout className="h-4 w-4" />,
  boolean: <Layout className="h-4 w-4" />,
  array: <Layout className="h-4 w-4" />,
  number: <Type className="h-4 w-4" />,
  url: <Type className="h-4 w-4" />,
};

// Sortable Section Item
interface SortableSectionItemProps {
  section: BuilderSection;
  index: number;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
}

function SortableSectionItem({
  section,
  index,
  isSelected,
  isPreviewMode,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleVisibility,
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id, disabled: isPreviewMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={cn(
        "group relative rounded-lg border-2 transition-all cursor-pointer",
        isSelected
          ? "border-terracotta-500 ring-2 ring-terracotta-500/20"
          : "border-transparent hover:border-gray-300",
        section.hidden && "opacity-50"
      )}
    >
      {/* Section Controls Overlay */}
      {!isPreviewMode && (
        <div
          className={cn(
            "absolute inset-x-0 -top-10 h-10 flex items-center justify-between px-2",
            "opacity-0 group-hover:opacity-100 transition-opacity z-20",
            isSelected && "opacity-100"
          )}
        >
          <div className="flex items-center gap-1 bg-gray-900 text-white rounded-md px-2 py-1 text-xs">
            <button
              {...attributes}
              {...listeners}
              className="p-1 hover:bg-white/20 rounded cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-3 w-3" />
            </button>
            <span className="font-medium capitalize">{section.type}</span>
            <span className="text-white/60">#{index + 1}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-7 w-7 bg-gray-900 text-white hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility();
              }}
            >
              {section.hidden ? (
                <EyeOff className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "h-7 w-7 bg-gray-900 text-white hover:bg-gray-800",
                isSelected && "bg-terracotta-500 hover:bg-terracotta-600"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-7 w-7 bg-gray-900 text-white hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Section Content */}
      <div className={cn("relative", section.hidden && "grayscale")}>
        <BlockRenderer
          type={section.type}
          props={section.props}
          isEditing={!isPreviewMode}
        />
      </div>
    </div>
  );
}

// Inline Field Editor Component
interface InlineFieldEditorProps {
  field: FieldSchema;
  value: any;
  onChange: (value: any) => void;
}

function InlineFieldEditor({ field, value, onChange }: InlineFieldEditorProps) {
  switch (field.type) {
    case "text":
    case "url":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Input
            type={field.type === "url" ? "url" : "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            className="h-8 text-sm"
          />
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            rows={3}
            className="text-sm resize-none"
          />
        </div>
      );

    case "richtext":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            rows={5}
            className="text-sm font-mono text-xs resize-none"
          />
          <p className="text-[10px] text-gray-400">HTML supported</p>
        </div>
      );

    case "number":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Input
            type="number"
            value={value ?? field.defaultValue ?? ""}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            min={field.validation?.min}
            max={field.validation?.max}
            className="h-8 text-sm"
          />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between py-2">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5 cursor-pointer">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Switch
            checked={value ?? field.defaultValue ?? false}
            onCheckedChange={onChange}
            className="data-[state=checked]:bg-terracotta-500"
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <Select
            value={value || field.defaultValue || ""}
            onValueChange={onChange}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "media":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <div className="flex gap-2">
            <Input
              type="url"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              className="h-8 text-sm flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const url = prompt("Enter image URL:");
                if (url) onChange(url);
              }}
              className="h-8 px-2 text-xs"
            >
              Browse
            </Button>
          </div>
          {value && (
            <div className="mt-2 relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      );

    case "color":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
            {fieldIcons[field.type]}
            {field.label}
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-8 p-1"
            />
            <Input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="h-8 text-sm flex-1"
            />
          </div>
        </div>
      );

    case "array":
      return (
        <InlineArrayEditor
          field={field}
          value={value || []}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}

// Inline Array Editor
interface InlineArrayEditorProps {
  field: FieldSchema;
  value: any[];
  onChange: (value: any[]) => void;
}

function InlineArrayEditor({ field, value, onChange }: InlineArrayEditorProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const handleAdd = () => {
    const newItem = field.itemFields?.reduce((acc, f) => ({
      ...acc,
      [f.name]: f.defaultValue ?? (f.type === "boolean" ? false : ""),
    }), {}) || {};
    onChange([...value, newItem]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, fieldName: string, val: any) => {
    onChange(value.map((item, i) =>
      i === index ? { ...item, [fieldName]: val } : item
    ));
  };

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getItemTitle = (item: any, index: number) => {
    const titleField = field.itemFields?.find(f => f.type === "text")?.name;
    return item[titleField || "title"] || item.name || item.label || `Item ${index + 1}`;
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
        {fieldIcons.array}
        {field.label}
        <span className="text-gray-400">({value.length})</span>
      </Label>
      
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="border rounded-lg bg-gray-50/50 overflow-hidden">
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleExpand(index)}
            >
              <span className="text-sm font-medium truncate pr-2">
                {getItemTitle(item, index)}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                >
                  <TrashIcon className="h-3 w-3 text-red-500" />
                </Button>
                {expandedItems[index] ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            
            {expandedItems[index] && field.itemFields && (
              <div className="px-3 pb-3 pt-1 space-y-3 border-t bg-white">
                {field.itemFields.map((itemField) => (
                  <div key={itemField.name}>
                    {itemField.type === "text" && (
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-gray-400">{itemField.label}</Label>
                        <Input
                          value={item[itemField.name] || ""}
                          onChange={(e) => handleChange(index, itemField.name, e.target.value)}
                          className="h-7 text-xs"
                        />
                      </div>
                    )}
                    {itemField.type === "textarea" && (
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-gray-400">{itemField.label}</Label>
                        <Textarea
                          value={item[itemField.name] || ""}
                          onChange={(e) => handleChange(index, itemField.name, e.target.value)}
                          rows={2}
                          className="text-xs resize-none"
                        />
                      </div>
                    )}
                    {itemField.type === "media" && (
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-gray-400">{itemField.label}</Label>
                        <div className="flex gap-1">
                          <Input
                            type="url"
                            value={item[itemField.name] || ""}
                            onChange={(e) => handleChange(index, itemField.name, e.target.value)}
                            className="h-7 text-xs flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const url = prompt("Enter image URL:");
                              if (url) handleChange(index, itemField.name, url);
                            }}
                            className="h-7 px-2 text-xs"
                          >
                            ...
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full h-8 text-xs border-dashed"
        size="sm"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Item
      </Button>
    </div>
  );
}

// Inline Editor Panel
interface InlineEditorPanelProps {
  section: BuilderSection;
  onChange: (section: BuilderSection) => void;
  onClose: () => void;
}

function InlineEditorPanel({ section, onChange, onClose }: InlineEditorPanelProps) {
  const schema = getComponentSchema(section.type);
  const [activeTab, setActiveTab] = useState("content");

  if (!schema) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">Unknown section type: {section.type}</p>
      </div>
    );
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    onChange({
      ...section,
      props: { ...section.props, [fieldName]: value },
    });
  };

  // Categorize fields
  const contentFields = schema.fields.filter(
    (f) => !["backgroundColor", "textColor", "padding", "margin", "className", "style"].includes(f.name)
  );

  const styleFields = schema.fields.filter(
    (f) => ["backgroundColor", "textColor", "padding", "margin", "className", "alignment", "style"].includes(f.name)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-medium text-sm">{schema.label}</h3>
            <p className="text-xs text-gray-500">Edit section properties</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 w-auto justify-start">
          <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
          {styleFields.length > 0 && (
            <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
          )}
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="content" className="m-0 p-4 space-y-4">
            {contentFields.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No content fields</p>
            ) : (
              contentFields.map((field) => (
                <InlineFieldEditor
                  key={field.name}
                  field={field}
                  value={section.props[field.name]}
                  onChange={(value) => handleFieldChange(field.name, value)}
                />
              ))
            )}
          </TabsContent>

          {styleFields.length > 0 && (
            <TabsContent value="style" className="m-0 p-4 space-y-4">
              {styleFields.map((field) => (
                <InlineFieldEditor
                  key={field.name}
                  field={field}
                  value={section.props[field.name]}
                  onChange={(value) => handleFieldChange(field.name, value)}
                />
              ))}
            </TabsContent>
          )}
        </ScrollArea>
      </Tabs>
    </div>
  );
}

export function VisualBuilder({
  sections,
  onSectionsChange,
  pageTitle = "Untitled Page",
  pageStatus = "DRAFT",
  onSave,
  onPublish,
}: VisualBuilderProps) {
  const { toast } = useToast();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<BuilderSection | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [history, setHistory] = useState<BuilderSection[][]>([sections]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [showInlineEditor, setShowInlineEditor] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get selected section
  const selectedSection = selectedSectionId
    ? sections.find((s) => s.id === selectedSectionId)
    : null;

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const interval = setInterval(() => {
      if (onSave && historyIndex > 0) {
        handleAutoSave();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [sections, autoSaveEnabled, historyIndex]);

  const handleAutoSave = async () => {
    if (!onSave) return;
    try {
      await onSave("DRAFT");
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  // Add to history
  const addToHistory = useCallback((newSections: BuilderSection[]) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newSections);
      return newHistory.slice(-50);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onSectionsChange(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onSectionsChange(history[newIndex]);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      onSectionsChange(newSections);
      addToHistory(newSections);
    }
  };

  const handleAddSection = (type: string, position?: number) => {
    const newSection: BuilderSection = {
      id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: {},
      hidden: false,
    };

    const newSections = [...sections];
    if (position !== undefined) {
      newSections.splice(position, 0, newSection);
    } else {
      newSections.push(newSection);
    }

    onSectionsChange(newSections);
    addToHistory(newSections);
    setSelectedSectionId(newSection.id);
    setEditingSection(newSection);
    setIsEditorOpen(true);
  };

  const handleEditSection = (section: BuilderSection) => {
    setEditingSection(section);
    setSelectedSectionId(section.id);
    setShowInlineEditor(true);
  };

  const handleSectionUpdate = (updatedSection: BuilderSection) => {
    const newSections = sections.map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );
    onSectionsChange(newSections);
    // Don't add to history on every keystroke - debounce this in production
  };

  const handleSaveSection = (updatedSection: BuilderSection) => {
    const newSections = sections.map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );
    onSectionsChange(newSections);
    addToHistory(newSections);
    setIsEditorOpen(false);
    setEditingSection(null);
  };

  const handleDeleteSection = (sectionId: string) => {
    const newSections = sections.filter((s) => s.id !== sectionId);
    onSectionsChange(newSections);
    addToHistory(newSections);
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
      setShowInlineEditor(false);
    }
  };

  const handleDuplicateSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const index = sections.findIndex((s) => s.id === sectionId);
    const duplicatedSection: BuilderSection = {
      ...section,
      id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      props: JSON.parse(JSON.stringify(section.props)),
    };

    const newSections = [...sections];
    newSections.splice(index + 1, 0, duplicatedSection);
    onSectionsChange(newSections);
    addToHistory(newSections);
  };

  const handleToggleVisibility = (sectionId: string) => {
    const newSections = sections.map((s) =>
      s.id === sectionId ? { ...s, hidden: !s.hidden } : s
    );
    onSectionsChange(newSections);
    addToHistory(newSections);
  };

  const handleSave = async (publish = false) => {
    if (publish && onPublish) {
      setIsPublishing(true);
      try {
        await onPublish();
        toast({
          title: "Page published",
          description: "Your page has been published successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to publish page.",
          variant: "destructive",
        });
      } finally {
        setIsPublishing(false);
      }
    } else if (onSave) {
      setIsSaving(true);
      try {
        await onSave(publish ? "PUBLISHED" : "DRAFT");
        setLastSaved(new Date());
        toast({
          title: publish ? "Page published" : "Draft saved",
          description: publish
            ? "Your page has been published successfully."
            : "Your changes have been saved.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save page.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const activeDragSection = activeDragId
    ? sections.find((s) => s.id === activeDragId)
    : null;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar - Block Library or Inline Editor */}
      {!isPreviewMode && (
        <div className="w-80 bg-white border-r flex flex-col">
          {showInlineEditor && selectedSection ? (
            <InlineEditorPanel
              section={selectedSection}
              onChange={handleSectionUpdate}
              onClose={() => {
                setShowInlineEditor(false);
                setSelectedSectionId(null);
                addToHistory(sections);
              }}
            />
          ) : (
            <BlockLibrary onAddBlock={handleAddSection} />
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          {/* Left: History & View Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleUndo}
                disabled={historyIndex === 0}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("tablet")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={2} />
                </svg>
              </Button>
              <Button
                variant={viewMode === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant={isPreviewMode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="ml-2"
            >
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          </div>

          {/* Right: Save Status & Actions */}
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={isSaving || isPublishing}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={isSaving || isPublishing}
                className="bg-terracotta-500 hover:bg-terracotta-600"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                {pageStatus === "PUBLISHED" ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div
            className={cn(
              "mx-auto transition-all duration-300",
              viewMode === "desktop" && "max-w-full",
              viewMode === "tablet" && "max-w-3xl",
              viewMode === "mobile" && "max-w-md"
            )}
          >
            {sections.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No sections added yet. Select a block from the sidebar to get started.
                </p>
              </Card>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-8 pb-20">
                    {sections.map((section, index) => (
                      <SortableSectionItem
                        key={section.id}
                        section={section}
                        index={index}
                        isSelected={selectedSectionId === section.id}
                        isPreviewMode={isPreviewMode}
                        onSelect={() => {
                          setSelectedSectionId(section.id);
                          if (!isPreviewMode) {
                            setShowInlineEditor(true);
                          }
                        }}
                        onEdit={() => handleEditSection(section)}
                        onDelete={() => handleDeleteSection(section.id)}
                        onDuplicate={() => handleDuplicateSection(section.id)}
                        onToggleVisibility={() => handleToggleVisibility(section.id)}
                      />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeDragSection ? (
                    <div className="opacity-80 rotate-2 scale-105">
                      <BlockRenderer
                        type={activeDragSection.type}
                        props={activeDragSection.props}
                        isEditing={false}
                      />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}

            {/* Add Section Button at Bottom */}
            {!isPreviewMode && sections.length > 0 && (
              <div className="flex justify-center pt-8">
                <Button
                  variant="outline"
                  onClick={() => handleAddSection("content", sections.length)}
                  className="border-dashed border-2"
                >
                  + Add Section
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
