"use client";

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

interface PropertyEditorProps {
  section: BuilderSection;
  onUpdate: (updates: Partial<BuilderSection>) => void;
  onClose: () => void;
}

const fieldIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  text: Type,
  textarea: AlignLeft,
  richtext: AlignLeft,
  media: Image,
  url: Link,
  boolean: ToggleLeft,
  array: List,
  object: Box,
  select: ChevronDown,
  number: Type,
};

// Media Picker Dialog
interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="bg-gray-800 border-gray-700 text-white"
          />

          <ScrollArea className="h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">Loading...</span>
              </div>
            ) : filteredMedia.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                    className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-terracotta-500 transition-all"
                  >
                    {item.mimeType?.startsWith("image/") ? (
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">{item.mimeType}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-xs text-white truncate block">
                        {item.filename}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No media found
              </div>
            )}
          </ScrollArea>
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
      placeholder={field.defaultValue}
      className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
    />
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
      placeholder={field.defaultValue}
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
  return (
    <div className="space-y-2">
      <Textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.defaultValue}
        rows={8}
        className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500 font-mono text-sm"
      />
      <p className="text-xs text-gray-500">
        HTML is supported. Use {"<p>"}, {"<strong>"}, {"<em>"}, {"<br>"} tags for formatting.
      </p>
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
    <div className="space-y-2">
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
        <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
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

// Boolean Field Editor
function BooleanFieldEditor({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Switch
      checked={value || false}
      onCheckedChange={onChange}
      className="data-[state=checked]:bg-terracotta-500"
    />
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
    // Default fallback
    return { title: "", description: "" };
  };

  const handleAdd = () => {
    const newItems = [...items, getDefaultItem()];
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

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getItemTitle = (item: any, index: number) => {
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
  const itemFields = Object.keys(itemShape);

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
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
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
              {itemFields.map((key) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  {key === "image" ? (
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
                  ) : (
                    <Input
                      value={item[key] || ""}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white text-sm"
                    />
                  )}
                </div>
              ))}
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
      return <TextFieldEditor field={field} value={value} onChange={onChange} />;
    case "boolean":
      return <BooleanFieldEditor value={value} onChange={onChange} />;
    case "select":
      return <SelectFieldEditor field={field} value={value} onChange={onChange} />;
    case "number":
      return (
        <Input
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-gray-800 border-gray-700 text-white focus:border-terracotta-500"
        />
      );
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

export function PropertyEditor({ section, onUpdate, onClose }: PropertyEditorProps) {
  const schema = getComponentSchema(section.type);
  const [props, setProps] = useState(section.props || {});

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

  if (!schema) {
    return (
      <div className="flex flex-col h-full">
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
          <p className="text-gray-500">Component type &quot;{section.type}&quot; not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div>
          <h3 className="text-white font-semibold">{schema.label}</h3>
          <p className="text-xs text-gray-500">{schema.description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Fields */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {schema.fields.map((field, index) => {
            const IconComponent = fieldIcons[field.type] || Type;
            const value = props[field.name];

            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                      <IconComponent className="h-3.5 w-3.5 text-gray-400" />
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

                {field.validation && (
                  <p className="text-xs text-gray-500 pl-8">
                    {field.validation.min !== undefined &&
                      field.validation.max !== undefined &&
                      `Min: ${field.validation.min}, Max: ${field.validation.max}`}
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
          <span>ID: {section.id.slice(-8)}</span>
          <span>Type: {section.type}</span>
        </div>
      </div>
    </div>
  );
}
