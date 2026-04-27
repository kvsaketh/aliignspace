"use client";

/**
 * PropertyPanel Component - Section Editor for Visual Builder
 * 
 * Features:
 * - Slide-out panel for editing section props
 * - Form fields based on component registry schema
 * - Support for: text, textarea, richtext, media picker, select, boolean, array, object
 * - Live preview updates as you type
 * - Media picker integration (opens media library modal)
 */

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Type,
  AlignLeft,
  Image,
  Link,
  ToggleLeft,
  List,
  Box,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  Search,
  Check,
  Code,
  Hash,
  Palette,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BuilderSection, FieldSchema } from "@/types";
import { getComponentSchema } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface PropertyPanelProps {
  section: BuilderSection;
  onUpdate: (updates: Partial<BuilderSection>) => void;
  onClose: () => void;
}

const fieldIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  text: Type,
  textarea: AlignLeft,
  richtext: Code,
  media: Image,
  url: ExternalLink,
  boolean: ToggleLeft,
  array: List,
  object: Box,
  select: ChevronDown,
  number: Hash,
  color: Palette,
};

// Media Picker Dialog
interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
}

function MediaPicker({ isOpen, onClose, onSelect, multiple = false }: MediaPickerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/media");
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (url: string) => {
    if (multiple) {
      setSelectedItems((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      );
    } else {
      onSelect(url);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (multiple && selectedItems.length > 0) {
      onSelect(selectedItems.join(","));
      onClose();
      setSelectedItems([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] bg-gray-900 border-gray-800 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-800">
          <DialogTitle className="text-white flex items-center gap-2">
            <Image className="h-5 w-5 text-terracotta-400" />
            Select Media
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media files..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Media Grid */}
          <ScrollArea className="h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-500" />
              </div>
            ) : filteredMedia.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {filteredMedia.map((item) => {
                  const isSelected = selectedItems.includes(item.url);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      className={cn(
                        "group relative aspect-square bg-gray-800 rounded-lg overflow-hidden transition-all",
                        isSelected
                          ? "ring-2 ring-terracotta-500"
                          : "hover:ring-2 hover:ring-terracotta-500/50"
                      )}
                    >
                      {item.mimeType?.startsWith("image/") ? (
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 text-sm">{item.mimeType}</span>
                        </div>
                      )}
                      
                      {/* Selection Overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center",
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {isSelected && (
                          <div className="w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Filename */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-xs text-white truncate block">
                          {item.filename}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Image className="h-12 w-12 mb-2 opacity-50" />
                <p>No media found</p>
                {searchQuery && (
                  <p className="text-sm mt-1">Try a different search term</p>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Actions */}
          {multiple && (
            <div className="flex justify-between items-center pt-4 border-t border-gray-800">
              <span className="text-sm text-gray-400">
                {selectedItems.length} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="border-gray-700 text-gray-300">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={selectedItems.length === 0}
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Text Field Editor
function TextFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder || field.defaultValue}
      className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
    />
  );
}

// URL Field Editor
function URLFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || "https://..."}
        className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
      />
    </div>
  );
}

// Textarea Field Editor
function TextareaFieldEditor({
  field,
  value,
  onChange,
  rows = 4,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <Textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder || field.defaultValue}
      rows={rows}
      className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500 resize-none"
    />
  );
}

// Rich Text Field Editor
function RichTextFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(false)}
            className={cn(
              "text-xs px-2 py-1 rounded transition-colors",
              !showPreview ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300"
            )}
          >
            HTML
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={cn(
              "text-xs px-2 py-1 rounded transition-colors",
              showPreview ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300"
            )}
          >
            Preview
          </button>
        </div>
      </div>

      {showPreview ? (
        <div
          className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white text-sm min-h-[200px] prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: value || "<p>No content</p>" }}
        />
      ) : (
        <Textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "<p>Enter HTML content...</p>"}
          rows={10}
          className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500 font-mono text-sm"
        />
      )}
      
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Code className="h-3 w-3" />
        <span>HTML supported</span>
        <span className="text-gray-600">•</span>
        <span>&lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, &lt;a&gt;</span>
      </div>
    </div>
  );
}

// Media Field Editor
function MediaFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="flex-1 bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPickerOpen(true)}
          className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Search className="h-4 w-4 mr-2" />
          Browse
        </Button>
      </div>
      
      {value && (
        <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <MediaPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={onChange}
      />
    </div>
  );
}

// Color Field Editor
function ColorFieldEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const presetColors = [
    "#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6",
    "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg border border-gray-700"
          style={{ backgroundColor: value || "#000000" }}
        />
        <Input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 bg-gray-800 border-gray-700 text-white font-mono text-sm"
        />
        <Input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-0 border-0 rounded-lg overflow-hidden cursor-pointer"
        />
      </div>
      
      <div className="grid grid-cols-9 gap-1">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              "w-6 h-6 rounded-md border border-gray-700 transition-transform hover:scale-110",
              value === color && "ring-2 ring-white"
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

// Boolean Field Editor
function BooleanFieldEditor({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={value || false}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-terracotta-500"
      />
      <span className="text-sm text-gray-400">
        {value ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}

// Select Field Editor
function SelectFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        {field.options?.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-white focus:bg-gray-700 focus:text-white"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Array Field Editor
function ArrayFieldEditor({
  field,
  value,
  onChange,
  sectionType,
}: {
  field: FieldSchema;
  value: any[];
  onChange: (value: any[]) => void;
  sectionType: string;
}) {
  const [items, setItems] = useState<any[]>(value || []);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  const getDefaultItem = () => {
    // Define defaults based on section type and field name
    if (sectionType === "about_team" || field.name === "members") {
      return { name: "", role: "", bio: "", image: "" };
    }
    if (sectionType === "about_stats" || field.name === "stats") {
      return { value: "", label: "", description: "" };
    }
    if (sectionType === "about_values" || field.name === "values") {
      return { title: "", description: "", icon: "" };
    }
    if (field.name === "features") {
      return { title: "", description: "", icon: "" };
    }
    if (field.name === "services") {
      return { title: "", description: "", image: "", link: "", icon: "" };
    }
    if (field.name === "items" || field.name === "portfolio") {
      return { title: "", category: "", image: "", link: "", featured: false };
    }
    if (field.name === "testimonials") {
      return { name: "", rating: 5, text: "", date: "", avatar: "", location: "" };
    }
    if (field.name === "faqs") {
      return { question: "", answer: "" };
    }
    if (field.name === "images") {
      return "";
    }
    // Default fallback
    return { title: "", description: "" };
  };

  const handleAdd = () => {
    const defaultItem = getDefaultItem();
    const newItems = [...items, defaultItem];
    setItems(newItems);
    onChange(newItems);
    setExpandedItems((prev) => [...prev, newItems.length - 1]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleChange = (index: number, key: string, val: any) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: val } : item
    );
    setItems(newItems);
    onChange(newItems);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
    onChange(newItems);
  };

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getItemTitle = (item: any, index: number) => {
    if (typeof item === "string") return `Image ${index + 1}`;
    return (
      item.name ||
      item.title ||
      item.label ||
      item.question ||
      `Item ${index + 1}`
    );
  };

  // Determine field structure based on item shape
  const itemShape = items[0] || getDefaultItem();
  const itemFields = typeof itemShape === "object" ? Object.keys(itemShape) : ["value"];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          {/* Item Header */}
          <button
            onClick={() => toggleExpand(index)}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-white">
                {getItemTitle(item, index)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {/* Move Up */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove(index, "up");
                }}
                disabled={index === 0}
                className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              {/* Move Down */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove(index, "down");
                }}
                disabled={index === items.length - 1}
                className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Remove */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              {/* Expand */}
              {expandedItems.includes(index) ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </button>

          {/* Item Fields */}
          {expandedItems.includes(index) && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="border-t border-gray-700 p-3 space-y-3"
            >
              {typeof item === "string" ? (
                // String array (like images)
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleChange(index, "value", e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-gray-700 border-gray-600 text-white text-sm"
                    />
                  </div>
                </div>
              ) : (
                // Object array
                itemFields.map((key) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    {key === "image" || key === "avatar" ? (
                      <div className="flex gap-2">
                        <Input
                          value={item[key] || ""}
                          onChange={(e) => handleChange(index, key, e.target.value)}
                          placeholder="https://..."
                          className="flex-1 bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                    ) : key === "description" || key === "bio" || key === "answer" || key === "content" ? (
                      <Textarea
                        value={item[key] || ""}
                        onChange={(e) => handleChange(index, key, e.target.value)}
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-white text-sm resize-none"
                      />
                    ) : key === "featured" ? (
                      <Switch
                        checked={item[key] || false}
                        onCheckedChange={(checked) => handleChange(index, key, checked)}
                        className="data-[state=checked]:bg-terracotta-500"
                      />
                    ) : key === "rating" ? (
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={item[key] || 5}
                        onChange={(e) => handleChange(index, key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    ) : (
                      <Input
                        value={item[key] || ""}
                        onChange={(e) => handleChange(index, key, e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                    )}
                  </div>
                ))
              )}
            </motion.div>
          )}
        </motion.div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
}

// Object Field Editor
function ObjectFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: any;
  onChange: (value: any) => void;
}) {
  const [obj, setObj] = useState<any>(value || {});

  useEffect(() => {
    setObj(value || {});
  }, [value]);

  const handleChange = (key: string, val: any) => {
    const newObj = { ...obj, [key]: val };
    setObj(newObj);
    onChange(newObj);
  };

  // Define field structure based on field name
  const objectFields: Record<string, string[]> = {
    mission: ["title", "content", "image"],
    vision: ["title", "content", "image"],
  };

  const fields = objectFields[field.name] || ["title", "description"];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
      {fields.map((key) => (
        <div key={key} className="space-y-2">
          <Label className="text-xs text-gray-400 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          {key === "image" ? (
            <Input
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder="https://..."
              className="bg-gray-700 border-gray-600 text-white text-sm"
            />
          ) : key === "content" || key === "description" ? (
            <Textarea
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              rows={4}
              className="bg-gray-700 border-gray-600 text-white text-sm resize-none"
            />
          ) : (
            <Input
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-gray-700 border-gray-600 text-white text-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Number Field Editor
function NumberFieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Input
      type="number"
      value={value ?? field.defaultValue ?? 0}
      onChange={(e) => onChange(Number(e.target.value))}
      min={field.validation?.min}
      max={field.validation?.max}
      className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
    />
  );
}

// Field Renderer
function renderField(
  field: FieldSchema,
  value: any,
  onChange: (value: any) => void,
  sectionType: string
) {
  switch (field.type) {
    case "text":
      return <TextFieldEditor field={field} value={value} onChange={onChange} />;
    case "textarea":
      return <TextareaFieldEditor field={field} value={value} onChange={onChange} />;
    case "richtext":
      return <RichTextFieldEditor field={field} value={value} onChange={onChange} />;
    case "media":
      return <MediaFieldEditor field={field} value={value} onChange={onChange} />;
    case "url":
      return <URLFieldEditor field={field} value={value} onChange={onChange} />;
    case "color":
      return <ColorFieldEditor value={value} onChange={onChange} />;
    case "boolean":
      return <BooleanFieldEditor value={value} onChange={onChange} />;
    case "select":
      return <SelectFieldEditor field={field} value={value} onChange={onChange} />;
    case "number":
      return <NumberFieldEditor field={field} value={value} onChange={onChange} />;
    case "array":
      return (
        <ArrayFieldEditor
          field={field}
          value={value}
          onChange={onChange}
          sectionType={sectionType}
        />
      );
    case "object":
      return <ObjectFieldEditor field={field} value={value} onChange={onChange} />;
    default:
      return (
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      );
  }
}

export function PropertyPanel({ section, onUpdate, onClose }: PropertyPanelProps) {
  const schema = getComponentSchema(section.type);
  const [props, setProps] = useState(section.props || {});
  const { toast } = useToast();

  useEffect(() => {
    setProps(section.props || {});
  }, [section]);

  const handlePropChange = useCallback(
    (name: string, value: any) => {
      const newProps = { ...props, [name]: value };
      setProps(newProps);
      onUpdate({ props: newProps });
    },
    [props, onUpdate]
  );

  const handleReset = () => {
    if (schema) {
      const defaultProps: Record<string, any> = {};
      schema.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          defaultProps[field.name] = field.defaultValue;
        }
      });
      setProps(defaultProps);
      onUpdate({ props: defaultProps });
      toast({
        title: "Section reset",
        description: "All fields reset to default values",
      });
    }
  };

  if (!schema) {
    return (
      <motion.aside
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-white font-semibold">Unknown Component</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Component type &quot;{section.type}&quot; not found</p>
          </div>
        </div>
      </motion.aside>
    );
  }

  const IconComponent = fieldIcons[schema.icon || ""] || Type;

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-terracotta-500/20 rounded-lg flex items-center justify-center">
            <IconComponent className="h-5 w-5 text-terracotta-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{schema.label}</h3>
            <p className="text-xs text-gray-500">{schema.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            title="Reset to defaults"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fields */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {schema.fields.map((field, index) => {
            const FieldIcon = fieldIcons[field.type] || Type;
            const value = props[field.name];

            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                      <FieldIcon className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <Label className="text-sm text-gray-200">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                  </div>
                </div>

                <div className="pl-8">
                  {renderField(field, value, (val) => handlePropChange(field.name, val), section.type)}
                </div>

                {/* Validation hints */}
                {field.validation && (
                  <p className="text-xs text-gray-500 pl-8">
                    {field.validation.min !== undefined &&
                      field.validation.max !== undefined &&
                      `Range: ${field.validation.min} - ${field.validation.max}`}
                    {field.validation.pattern && " Must match pattern"}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-mono">ID: {section.id.slice(-8)}</span>
          <span className="text-gray-600">Type: {section.type}</span>
        </div>
      </div>
    </motion.aside>
  );
}

export default PropertyPanel;
