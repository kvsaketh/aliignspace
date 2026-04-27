"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, GripVertical, Plus, Trash2, AlertCircle } from "lucide-react";
import { getComponentSchema } from "@/lib/component-registry";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { VisualBuilder } from "@/components/admin/visual-builder";
import { cn } from "@/lib/utils";

interface SectionEditorProps {
  section: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: any) => void;
}

export function SectionEditor({
  section,
  isOpen,
  onClose,
  onSave,
}: SectionEditorProps) {
  const [props, setProps] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("content");
  const [isVisualBuilderOpen, setIsVisualBuilderOpen] = useState(false);
  const schema = getComponentSchema(section?.type);

  useEffect(() => {
    if (section) {
      setProps(section.props || {});
      setErrors({});
    }
  }, [section]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!schema) return true;

    schema.fields.forEach((field) => {
      const value = props[field.name];

      if (field.required) {
        if (value === undefined || value === null || value === "") {
          newErrors[field.name] = `${field.label} is required`;
        } else if (Array.isArray(value) && value.length === 0) {
          newErrors[field.name] = `${field.label} must have at least one item`;
        }
      }

      if (field.validation?.pattern && value) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(String(value))) {
          newErrors[field.name] = `${field.label} has an invalid format`;
        }
      }

      if (field.validation?.min !== undefined && value !== undefined) {
        if (typeof value === "number" && value < field.validation.min) {
          newErrors[field.name] = `${field.label} must be at least ${field.validation.min}`;
        }
        if (typeof value === "string" && value.length < field.validation.min) {
          newErrors[field.name] = `${field.label} must be at least ${field.validation.min} characters`;
        }
      }

      if (field.validation?.max !== undefined && value !== undefined) {
        if (typeof value === "number" && value > field.validation.max) {
          newErrors[field.name] = `${field.label} must be at most ${field.validation.max}`;
        }
        if (typeof value === "string" && value.length > field.validation.max) {
          newErrors[field.name] = `${field.label} must be at most ${field.validation.max} characters`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [props, schema]);

  const handleChange = (name: string, value: any) => {
    setProps((prev: any) => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    onSave({
      ...section,
      props,
    });
  };

  const handleVisualBuilderSave = (updatedSections: any[]) => {
    if (updatedSections.length > 0) {
      const updatedSection = updatedSections.find((s) => s.id === section?.id);
      if (updatedSection) {
        setProps(updatedSection.props);
        onSave(updatedSection);
      }
    }
  };

  // Group fields by category for tabbed interface
  const groupFields = () => {
    if (!schema) return { content: [], style: [], advanced: [] };

    return schema.fields.reduce(
      (acc, field) => {
        const category = field.category || "content";
        if (!acc[category]) acc[category] = [];
        acc[category].push(field);
        return acc;
      },
      { content: [], style: [], advanced: [] } as Record<string, any[]>
    );
  };

  const renderField = (field: any) => {
    const value = props[field.name] ?? field.defaultValue ?? "";
    const error = errors[field.name];

    const fieldWrapper = (children: React.ReactNode) => (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name} className="flex items-center gap-1">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </Label>
        {children}
        {error && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3 w-3" />
            {error}
          </div>
        )}
        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
      </div>
    );

    switch (field.type) {
      case "text":
        return fieldWrapper(
          <Input
            id={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            className={cn(error && "border-red-500")}
          />
        );

      case "textarea":
        return fieldWrapper(
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            rows={field.rows || 4}
            className={cn(error && "border-red-500")}
          />
        );

      case "richtext":
        return fieldWrapper(
          <>
            <Textarea
              id={field.name}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || field.defaultValue}
              rows={field.rows || 8}
              className={cn("font-mono text-sm", error && "border-red-500")}
            />
            <p className="text-xs text-muted-foreground">
              HTML is supported for rich formatting.
            </p>
          </>
        );

      case "url":
        return fieldWrapper(
          <Input
            id={field.name}
            type="url"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.defaultValue || "https://"}
            className={cn(error && "border-red-500")}
          />
        );

      case "email":
        return fieldWrapper(
          <Input
            id={field.name}
            type="email"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder || field.defaultValue}
            className={cn(error && "border-red-500")}
          />
        );

      case "number":
        return fieldWrapper(
          <Input
            id={field.name}
            type="number"
            value={value}
            onChange={(e) =>
              handleChange(field.name, parseFloat(e.target.value) || 0)
            }
            min={field.validation?.min}
            max={field.validation?.max}
            className={cn(error && "border-red-500")}
          />
        );

      case "select":
        return fieldWrapper(
          <Select value={value} onValueChange={(val) => handleChange(field.name, val)}>
            <SelectTrigger className={cn(error && "border-red-500")}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <div key={field.name} className="flex items-center justify-between">
            <Label htmlFor={field.name} className="flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Switch
              id={field.name}
              checked={value}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
          </div>
        );

      case "media":
        return fieldWrapper(
          <MediaPicker
            value={value}
            onChange={(url) => handleChange(field.name, url)}
            buttonLabel={value ? "Change Image" : "Select Image"}
            previewSize="md"
          />
        );

      case "color":
        return fieldWrapper(
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
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder="#000000"
              className={cn("flex-1", error && "border-red-500")}
            />
          </div>
        );

      case "array":
        return fieldWrapper(
          <EnhancedArrayEditor
            value={value || []}
            onChange={(val) => handleChange(field.name, val)}
            field={field}
            sectionType={section?.type}
          />
        );

      case "object":
        return fieldWrapper(
          <ObjectEditor
            value={value || {}}
            onChange={(val) => handleChange(field.name, val)}
            field={field}
          />
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

  const groupedFields = groupFields();
  const hasTabs =
    groupedFields.style.length > 0 || groupedFields.advanced.length > 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle>Edit {schema.label}</DialogTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVisualBuilderOpen(true)}
                className="border-terracotta-500/50 text-terracotta-600 hover:bg-terracotta-50"
              >
                <Palette className="mr-2 h-4 w-4" />
                Visual Edit
              </Button>
            </div>
            {schema.description && (
              <p className="text-sm text-muted-foreground">
                {schema.description}
              </p>
            )}
          </DialogHeader>

          {hasTabs ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="mx-6">
                <TabsTrigger value="content">Content</TabsTrigger>
                {groupedFields.style.length > 0 && (
                  <TabsTrigger value="style">Style</TabsTrigger>
                )}
                {groupedFields.advanced.length > 0 && (
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                )}
              </TabsList>

              <ScrollArea className="h-[50vh] px-6 py-4">
                <TabsContent value="content" className="mt-0 space-y-6">
                  {groupedFields.content.map(renderField)}
                </TabsContent>

                {groupedFields.style.length > 0 && (
                  <TabsContent value="style" className="mt-0 space-y-6">
                    {groupedFields.style.map(renderField)}
                  </TabsContent>
                )}

                {groupedFields.advanced.length > 0 && (
                  <TabsContent value="advanced" className="mt-0 space-y-6">
                    {groupedFields.advanced.map(renderField)}
                  </TabsContent>
                )}
              </ScrollArea>
            </Tabs>
          ) : (
            <ScrollArea className="h-[50vh] px-6 py-4">
              <div className="space-y-6">
                {schema.fields.map(renderField)}
              </div>
            </ScrollArea>
          )}

          <DialogFooter className="px-6 py-4 border-t">
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

      {/* Visual Builder Dialog */}
      {isVisualBuilderOpen && section && (
        <VisualBuilder
          sections={[{ ...section, props }]}
          onSectionsChange={handleVisualBuilderSave}
          onSave={() => {
            handleSave();
            setIsVisualBuilderOpen(false);
          }}
          onClose={() => setIsVisualBuilderOpen(false)}
        />
      )}
    </>
  );
}

// Enhanced Array Editor Component
interface EnhancedArrayEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
  field: any;
  sectionType?: string;
}

function EnhancedArrayEditor({
  value,
  onChange,
  field,
  sectionType,
}: EnhancedArrayEditorProps) {
  const [items, setItems] = useState<any[]>(value || []);

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  const getDefaultItem = () => {
    // Infer schema from field name and section type
    if (field.name === "members" || sectionType === "about_team") {
      return { name: "", role: "", bio: "", image: "" };
    }
    if (field.name === "stats" || sectionType === "about_stats") {
      return { value: "", label: "", description: "" };
    }
    if (field.name === "values" || sectionType === "about_values") {
      return { title: "", description: "", icon: "" };
    }
    if (field.name === "features") {
      return { title: "", description: "", icon: "" };
    }
    if (field.name === "testimonials") {
      return { name: "", role: "", quote: "", image: "" };
    }
    if (field.name === "faqs") {
      return { question: "", answer: "" };
    }
    if (field.name === "images") {
      return { url: "", alt: "" };
    }
    if (field.name === "videos" || sectionType === "video-testimonials") {
      return { id: "", videoUrl: "", thumbnailUrl: "", clientName: "", projectType: "", location: "", quote: "", duration: "" };
    }
    // Default fallback
    return { title: "", description: "" };
  };

  const handleAdd = () => {
    const newItems = [...items, getDefaultItem()];
    setItems(newItems);
    onChange(newItems);
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

    const newItems = [...items];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
    onChange(newItems);
  };

  // Detect item schema based on first item or field name
  const itemSchema = items.length > 0 ? Object.keys(items[0]) : Object.keys(getDefaultItem());

  const getItemTitle = (item: any, index: number) => {
    if (item.name) return item.name;
    if (item.title) return item.title;
    if (item.label) return item.label;
    if (item.question) return item.question;
    return `Item ${index + 1}`;
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg bg-gray-50/50 overflow-hidden"
        >
          {/* Item Header */}
          <div className="flex items-center justify-between p-3 bg-gray-100/50 border-b">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-sm truncate max-w-[200px]">
                {getItemTitle(item, index)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
              >
                <span className="sr-only">Move up</span>
                ↑
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleMove(index, "down")}
                disabled={index === items.length - 1}
              >
                <span className="sr-only">Move down</span>
                ↓
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

          {/* Item Fields */}
          <div className="p-3 space-y-3">
            {itemSchema.map((key) => {
              const val = item[key];
              
              // Determine field type based on key
              if (key === "image" || key === "url" || key === "icon") {
                return (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs capitalize">{key}</Label>
                    <MediaPicker
                      value={val}
                      onChange={(url) => handleChange(index, key, url)}
                      buttonLabel={val ? "Change" : `Select ${key}`}
                      previewSize="sm"
                    />
                  </div>
                );
              }
              
              if (key === "bio" || key === "description" || key === "answer" || key === "quote") {
                return (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs capitalize">{key}</Label>
                    <Textarea
                      value={val || ""}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      placeholder={`Enter ${key}...`}
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                );
              }
              
              return (
                <div key={key} className="space-y-1">
                  <Label className="text-xs capitalize">{key}</Label>
                  <Input
                    value={val || ""}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                    placeholder={`Enter ${key}...`}
                    className="text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
}

// Object Editor Component
interface ObjectEditorProps {
  value: any;
  onChange: (value: any) => void;
  field: any;
}

function ObjectEditor({ value, onChange, field }: ObjectEditorProps) {
  const [obj, setObj] = useState<any>(value || {});

  useEffect(() => {
    setObj(value || {});
  }, [value]);

  const handleChange = (key: string, val: any) => {
    const newObj = { ...obj, [key]: val };
    setObj(newObj);
    onChange(newObj);
  };

  // Define fields based on object type
  const getObjectFields = () => {
    const type = field.name.toLowerCase();
    
    if (type.includes("mission") || type.includes("vision")) {
      return [
        { key: "title", label: "Title", type: "text" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "image", label: "Image", type: "media" },
      ];
    }
    
    if (type.includes("cta") || type.includes("button")) {
      return [
        { key: "text", label: "Button Text", type: "text" },
        { key: "url", label: "Button URL", type: "url" },
        { key: "variant", label: "Variant", type: "select", options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
        ]},
      ];
    }
    
    // Default fields
    return Object.keys(obj).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      type: "text",
    }));
  };

  const fields = getObjectFields();

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50/50">
      {fields.map(({ key, label, type, options }) => (
        <div key={key} className="space-y-1">
          <Label className="text-sm">{label}</Label>
          
          {type === "textarea" && (
            <Textarea
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              rows={4}
            />
          )}
          
          {type === "media" && (
            <MediaPicker
              value={obj[key]}
              onChange={(url) => handleChange(key, url)}
              buttonLabel={obj[key] ? "Change Image" : "Select Image"}
              previewSize="sm"
            />
          )}
          
          {type === "select" && (
            <Select
              value={obj[key] || ""}
              onValueChange={(val) => handleChange(key, val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options?.map((opt: any) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {type === "text" && (
            <Input
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
            />
          )}
          
          {type === "url" && (
            <Input
              type="url"
              value={obj[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder="https://"
            />
          )}
        </div>
      ))}
    </div>
  );
}
