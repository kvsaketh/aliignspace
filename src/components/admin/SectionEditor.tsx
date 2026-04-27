"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getComponentSchema, componentRegistry } from "@/lib/component-registry";
import { BuilderSection, FieldSchema } from "@/types";
import { BlockRenderer } from "./BlockRenderer";
import { cn } from "@/lib/utils";
import {
  Type,
  Image,
  Palette,
  Settings,
  Eye,
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Layout,
} from "lucide-react";

interface SectionEditorProps {
  section: BuilderSection;
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: BuilderSection) => void;
}

// Field type icons
const fieldIcons: Record<string, React.ReactNode> = {
  text: <Type className="h-4 w-4" />,
  textarea: <Type className="h-4 w-4" />,
  richtext: <Type className="h-4 w-4" />,
  media: <Image className="h-4 w-4" />,
  color: <Palette className="h-4 w-4" />,
  select: <Settings className="h-4 w-4" />,
  boolean: <Settings className="h-4 w-4" />,
  array: <Layout className="h-4 w-4" />,
  number: <Type className="h-4 w-4" />,
  url: <Type className="h-4 w-4" />,
};

export function SectionEditor({
  section,
  isOpen,
  onClose,
  onSave,
}: SectionEditorProps) {
  const [props, setProps] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState("content");
  const [expandedArrays, setExpandedArrays] = useState<Record<string, boolean>>({});
  const schema = getComponentSchema(section?.type);

  useEffect(() => {
    if (section) {
      // Merge with default values
      const defaults = schema?.fields.reduce((acc, field) => {
        return {
          ...acc,
          [field.name]: section.props?.[field.name] ?? field.defaultValue,
        };
      }, {});
      setProps({ ...defaults, ...section.props });
    }
  }, [section, schema]);

  const handleChange = (name: string, value: any) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      ...section,
      props,
    });
  };

  const toggleArrayExpand = (fieldName: string) => {
    setExpandedArrays((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  // Categorize fields
  const contentFields = schema?.fields.filter(
    (f) => !["backgroundColor", "textColor", "padding", "margin", "className"].includes(f.name)
  ) || [];

  const styleFields = schema?.fields.filter(
    (f) => ["backgroundColor", "textColor", "padding", "margin", "className", "alignment", "style"].includes(f.name)
  ) || [];

  const renderField = (field: FieldSchema) => {
    const value = props[field.name];

    switch (field.type) {
      case "text":
      case "url":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type === "url" ? "url" : "text"}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.defaultValue}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.name}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.defaultValue}
              rows={3}
            />
          </div>
        );

      case "richtext":
        return (
          <div key={field.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={field.name} className="flex items-center gap-2">
                {fieldIcons[field.type]}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <span className="text-xs text-gray-400">HTML supported</span>
            </div>
            <Textarea
              id={field.name}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.defaultValue}
              rows={6}
              className="font-mono text-sm"
            />
          </div>
        );

      case "number":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type="number"
              value={value ?? field.defaultValue ?? ""}
              onChange={(e) => handleChange(field.name, parseFloat(e.target.value))}
              min={field.validation?.min}
              max={field.validation?.max}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={value || field.defaultValue || ""}
              onValueChange={(val) => handleChange(field.name, val)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "boolean":
        return (
          <div key={field.name} className="flex items-center justify-between p-3 border rounded-lg">
            <Label htmlFor={field.name} className="flex items-center gap-2 cursor-pointer">
              {fieldIcons[field.type]}
              {field.label}
            </Label>
            <Switch
              id={field.name}
              checked={value ?? field.defaultValue ?? false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
          </div>
        );

      case "media":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="flex gap-2">
              <Input
                id={field.name}
                type="url"
                value={value || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Open media library - would integrate with actual media library
                  const url = prompt("Enter image URL:");
                  if (url) handleChange(field.name, url);
                }}
              >
                Browse
              </Button>
            </div>
            {value && (
              <div className="mt-2 relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
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
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {fieldIcons[field.type]}
              {field.label}
            </Label>
            <div className="flex gap-2">
              <Input
                id={field.name}
                type="color"
                value={value || "#000000"}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={value || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        );

      case "array":
        return (
          <div key={field.name} className="space-y-2">
            <div
              className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => toggleArrayExpand(field.name)}
            >
              <Label className="flex items-center gap-2 cursor-pointer">
                {fieldIcons[field.type]}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {(value || []).length} items
                </span>
                {expandedArrays[field.name] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
            {expandedArrays[field.name] && (
              <ArrayEditor
                value={value || []}
                onChange={(val) => handleChange(field.name, val)}
                fieldName={field.name}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!schema) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Unknown section type: {section?.type}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-terracotta-500" />
            Edit {schema.label}
          </DialogTitle>
          <DialogDescription>
            Customize the content and appearance of this section
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-4 w-auto justify-start">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Content
            </TabsTrigger>
            {styleFields.length > 0 && (
              <TabsTrigger value="style" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Style
              </TabsTrigger>
            )}
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="content" className="h-full m-0">
              <div className="flex h-full">
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-6 max-w-lg">
                    {contentFields.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No content fields available for this section
                      </p>
                    ) : (
                      contentFields.map((field) => renderField(field))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {styleFields.length > 0 && (
              <TabsContent value="style" className="h-full m-0">
                <ScrollArea className="h-full px-6 py-4">
                  <div className="space-y-6 max-w-lg">
                    {styleFields.map((field) => renderField(field))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}

            <TabsContent value="preview" className="h-full m-0 bg-gray-100">
              <ScrollArea className="h-full p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                  <BlockRenderer
                    type={section.type}
                    props={props}
                    isEditing={false}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="px-6 py-4 border-t gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-terracotta-500 hover:bg-terracotta-600"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Array Editor Component
interface ArrayEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
  fieldName: string;
}

function ArrayEditor({ value, onChange, fieldName }: ArrayEditorProps) {
  const [items, setItems] = useState<any[]>(value || []);

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  const handleAdd = () => {
    const newItem =
      fieldName === "features"
        ? { title: "", description: "", icon: "" }
        : fieldName === "services"
        ? { title: "", description: "", image: "" }
        : fieldName === "portfolio"
        ? { title: "", description: "", image: "", category: "" }
        : fieldName === "testimonials"
        ? { name: "", role: "", content: "", image: "" }
        : fieldName === "team"
        ? { name: "", role: "", bio: "", image: "" }
        : fieldName === "faqs"
        ? { question: "", answer: "" }
        : { title: "", description: "" };

    const newItems = [...items, newItem];
    setItems(newItems);
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleChange = (index: number, key: string, val: string) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: val } : item
    );
    setItems(newItems);
    onChange(newItems);
  };

  const getItemFields = (item: any) => {
    return Object.keys(item).filter((key) => key !== "id");
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setItems(newItems);
      onChange(newItems);
    } else if (direction === "down" && index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setItems(newItems);
      onChange(newItems);
    }
  };

  return (
    <div className="space-y-3 pl-4 border-l-2 border-gray-200">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg bg-gray-50 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Item #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(index, "down")}
                disabled={index === items.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-500 hover:text-red-600"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {getItemFields(item).map((field) => (
              <div key={field}>
                <Label className="text-xs text-gray-500 capitalize mb-1 block">
                  {field}
                </Label>
                {field === "description" || field === "answer" || field === "bio" || field === "content" ? (
                  <Textarea
                    value={item[field] || ""}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                    placeholder={`Enter ${field}`}
                    rows={2}
                    className="text-sm"
                  />
                ) : field === "image" ? (
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      value={item[field] || ""}
                      onChange={(e) => handleChange(index, field, e.target.value)}
                      placeholder="Image URL"
                      className="text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = prompt("Enter image URL:");
                        if (url) handleChange(index, field, url);
                      }}
                    >
                      Browse
                    </Button>
                  </div>
                ) : (
                  <Input
                    value={item[field] || ""}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                    placeholder={`Enter ${field}`}
                    className="text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
}
