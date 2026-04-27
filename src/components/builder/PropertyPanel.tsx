"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Palette, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useBuilderStore } from "@/stores/builder-store";
import { getWidgetDefinition } from "@/lib/builder/widget-registry";
import type { WidgetData, WidgetStyle, WidgetContent } from "@/types/builder";

type TabValue = "content" | "style" | "advanced";

interface PropertyPanelProps {
  onClose?: () => void;
}

// ─── Content Tab ────────────────────────────────────────────────────────────

function ContentTab({ widget }: { widget: WidgetData }) {
  const { updateWidget } = useBuilderStore();
  const definition = getWidgetDefinition(widget.type);

  const updateContent = (key: string, value: unknown) => {
    updateWidget(widget.id, {
      content: { ...widget.content, [key]: value },
    });
  };

  return (
    <div className="space-y-5">
      {/* Widget type label */}
      <div className="text-xs text-gray-500 font-label tracking-wider uppercase">
        {definition?.label || widget.type}
      </div>

      {/* Dynamic content fields based on widget type */}
      {widget.type === "heading" && (
        <>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Text</Label>
            <Textarea
              value={(widget.content.text as string) || ""}
              onChange={(e) => updateContent("text", e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200 min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Tag</Label>
            <Select
              value={(widget.content.tag as string) || "h2"}
              onValueChange={(v) => updateContent("tag", v)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
                  <SelectItem key={tag} value={tag} className="text-gray-200">
                    {tag.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Alignment</Label>
            <Select
              value={(widget.content.alignment as string) || "left"}
              onValueChange={(v) => updateContent("alignment", v)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {["left", "center", "right"].map((a) => (
                  <SelectItem key={a} value={a} className="text-gray-200">
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {widget.type === "text" && (
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs uppercase tracking-wider">Content (HTML)</Label>
          <Textarea
            value={(widget.content.html as string) || ""}
            onChange={(e) => updateContent("html", e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 min-h-[200px] font-mono text-sm"
          />
        </div>
      )}

      {widget.type === "image" && (
        <>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Media ID</Label>
            <Input
              value={(widget.content.mediaId as string) || ""}
              onChange={(e) => updateContent("mediaId", e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200"
              placeholder="Select from media library"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Alt Text</Label>
            <Input
              value={(widget.content.altText as string) || ""}
              onChange={(e) => updateContent("altText", e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Object Fit</Label>
            <Select
              value={(widget.content.objectFit as string) || "cover"}
              onValueChange={(v) => updateContent("objectFit", v)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {["cover", "contain", "fill"].map((fit) => (
                  <SelectItem key={fit} value={fit} className="text-gray-200">
                    {fit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Lightbox</Label>
            <Switch
              checked={(widget.content.lightbox as boolean) || false}
              onCheckedChange={(v) => updateContent("lightbox", v)}
            />
          </div>
        </>
      )}

      {widget.type === "button" && (
        <>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Label</Label>
            <Input
              value={(widget.content.label as string) || ""}
              onChange={(e) => updateContent("label", e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">URL</Label>
            <Input
              value={(widget.content.url as string) || ""}
              onChange={(e) => updateContent("url", e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Variant</Label>
            <Select
              value={(widget.content.variant as string) || "primary"}
              onValueChange={(v) => updateContent("variant", v)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {["primary", "secondary", "ghost"].map((v) => (
                  <SelectItem key={v} value={v} className="text-gray-200">
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {widget.type === "spacer" && (
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs uppercase tracking-wider">
            Height (px)
          </Label>
          <Input
            type="number"
            value={(widget.content.height as number) || 40}
            onChange={(e) => updateContent("height", parseInt(e.target.value) || 0)}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      )}

      {widget.type === "divider" && (
        <>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">
              Thickness (px)
            </Label>
            <Input
              type="number"
              value={(widget.content.thickness as number) || 1}
              onChange={(e) => updateContent("thickness", parseInt(e.target.value) || 1)}
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-xs uppercase tracking-wider">Style</Label>
            <Select
              value={(widget.content.style as string) || "solid"}
              onValueChange={(v) => updateContent("style", v)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {["solid", "dashed", "dotted"].map((s) => (
                  <SelectItem key={s} value={s} className="text-gray-200">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Generic fallback for other widget types */}
      {!["heading", "text", "image", "button", "spacer", "divider"].includes(widget.type) && (
        <div className="text-sm text-gray-500 py-4">
          Content editing for &ldquo;{definition?.label || widget.type}&rdquo; widgets is coming soon.
        </div>
      )}
    </div>
  );
}

// ─── Style Tab ──────────────────────────────────────────────────────────────

function StyleTab({ widget }: { widget: WidgetData }) {
  const { updateWidget } = useBuilderStore();
  const style = widget.style || {};

  const updateStyle = (key: string, value: unknown) => {
    updateWidget(widget.id, {
      style: { ...style, [key]: value } as WidgetStyle,
    });
  };

  return (
    <div className="space-y-6">
      {/* Typography */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Typography
        </h4>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={(style.color as string) || "#2B2D42"}
              onChange={(e) => updateStyle("color", e.target.value)}
              className="w-12 h-9 p-1 bg-gray-800 border-gray-700"
            />
            <Input
              value={(style.color as string) || "#2B2D42"}
              onChange={(e) => updateStyle("color", e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-gray-200 text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Font Size</Label>
          <Input
            value={(style.fontSize as string) || ""}
            onChange={(e) => updateStyle("fontSize", e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="e.g. 1rem, 16px"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Font Weight</Label>
          <Select
            value={String(style.fontWeight || "400")}
            onValueChange={(v) => updateStyle("fontWeight", v)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {["300", "400", "500", "600", "700"].map((w) => (
                <SelectItem key={w} value={w} className="text-gray-200">
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Text Align</Label>
          <Select
            value={(style.textAlign as string) || "left"}
            onValueChange={(v) => updateStyle("textAlign", v)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {["left", "center", "right", "justify"].map((a) => (
                <SelectItem key={a} value={a} className="text-gray-200">
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Background
        </h4>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={(style.backgroundColor as string) || "#ffffff"}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              className="w-12 h-9 p-1 bg-gray-800 border-gray-700"
            />
            <Input
              value={(style.backgroundColor as string) || ""}
              onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-gray-200 text-sm"
              placeholder="transparent"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Overlay Opacity</Label>
          <Input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={(style.overlayOpacity as number) || 0}
            onChange={(e) => updateStyle("overlayOpacity", parseFloat(e.target.value))}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Spacing
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "marginTop", label: "Margin Top" },
            { key: "marginBottom", label: "Margin Bottom" },
            { key: "marginLeft", label: "Margin Left" },
            { key: "marginRight", label: "Margin Right" },
            { key: "paddingTop", label: "Padding Top" },
            { key: "paddingBottom", label: "Padding Bottom" },
            { key: "paddingLeft", label: "Padding Left" },
            { key: "paddingRight", label: "Padding Right" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <Label className="text-gray-300 text-xs">{label}</Label>
              <Input
                value={(style[key as keyof WidgetStyle] as string) || ""}
                onChange={(e) => updateStyle(key, e.target.value)}
                className="bg-gray-800 border-gray-700 text-gray-200 text-sm"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Border */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Border
        </h4>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Border Width</Label>
          <Input
            value={(style.borderWidth as string) || ""}
            onChange={(e) => updateStyle("borderWidth", e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="0px"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Border Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={(style.borderColor as string) || "#000000"}
              onChange={(e) => updateStyle("borderColor", e.target.value)}
              className="w-12 h-9 p-1 bg-gray-800 border-gray-700"
            />
            <Input
              value={(style.borderColor as string) || ""}
              onChange={(e) => updateStyle("borderColor", e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-gray-200 text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Border Radius</Label>
          <Input
            value={(style.borderRadius as string) || ""}
            onChange={(e) => updateStyle("borderRadius", e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="0px"
          />
        </div>
      </div>

      {/* Shadow */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Shadow
        </h4>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Box Shadow</Label>
          <Input
            value={(style.boxShadow as string) || ""}
            onChange={(e) => updateStyle("boxShadow", e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200"
            placeholder="none"
          />
        </div>
      </div>

      {/* Effects */}
      <div className="space-y-3">
        <h4 className="text-xs font-label tracking-wider uppercase text-gray-500">
          Effects
        </h4>
        <div className="space-y-2">
          <Label className="text-gray-300 text-xs">Opacity</Label>
          <Input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={(style.opacity as number) ?? 1}
            onChange={(e) => updateStyle("opacity", parseFloat(e.target.value))}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Advanced Tab ───────────────────────────────────────────────────────────

function AdvancedTab({ widget }: { widget: WidgetData }) {
  const { updateWidget } = useBuilderStore();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-gray-300 text-xs uppercase tracking-wider">CSS ID</Label>
        <Input
          value={widget.cssId || ""}
          onChange={(e) => updateWidget(widget.id, { cssId: e.target.value })}
          className="bg-gray-800 border-gray-700 text-gray-200"
          placeholder="e.g. my-section"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 text-xs uppercase tracking-wider">CSS Classes</Label>
        <Input
          value={widget.cssClass || ""}
          onChange={(e) => updateWidget(widget.id, { cssClass: e.target.value })}
          className="bg-gray-800 border-gray-700 text-gray-200"
          placeholder="e.g. custom-class another-class"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 text-xs uppercase tracking-wider">Custom CSS</Label>
        <Textarea
          value={widget.customCss || ""}
          onChange={(e) => updateWidget(widget.id, { customCss: e.target.value })}
          className="bg-gray-800 border-gray-700 text-gray-200 min-h-[120px] font-mono text-sm"
          placeholder="/* Your custom CSS */"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-gray-300 text-xs uppercase tracking-wider">Visibility</Label>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-400">Hidden</span>
          <Switch
            checked={widget.hidden || false}
            onCheckedChange={(v) => updateWidget(widget.id, { hidden: v })}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Property Panel ────────────────────────────────────────────────────

export function PropertyPanel({ onClose }: PropertyPanelProps) {
  const { widgets, selectedWidgetId } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<TabValue>("content");

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800 items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
          <Palette className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-white font-medium mb-2">No Widget Selected</h3>
        <p className="text-gray-400 text-sm">
          Click on any widget in the canvas to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-coral-400" />
          <span className="text-white font-medium text-sm">
            {getWidgetDefinition(selectedWidget.type)?.label || selectedWidget.type}
          </span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <TabsList className="w-full grid grid-cols-3 bg-gray-800/50 p-0 h-10 rounded-none">
          <TabsTrigger
            value="content"
            className="rounded-none data-[state=active]:bg-gray-800 data-[state=active]:text-coral-400 text-gray-400 text-xs"
          >
            <Type className="w-3.5 h-3.5 mr-1.5" />
            Content
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="rounded-none data-[state=active]:bg-gray-800 data-[state=active]:text-coral-400 text-gray-400 text-xs"
          >
            <Palette className="w-3.5 h-3.5 mr-1.5" />
            Style
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="rounded-none data-[state=active]:bg-gray-800 data-[state=active]:text-coral-400 text-gray-400 text-xs"
          >
            <Settings className="w-3.5 h-3.5 mr-1.5" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <TabsContent value="content" className="mt-0">
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ContentTab widget={selectedWidget} />
              </motion.div>
            </TabsContent>
            <TabsContent value="style" className="mt-0">
              <motion.div
                key="style"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <StyleTab widget={selectedWidget} />
              </motion.div>
            </TabsContent>
            <TabsContent value="advanced" className="mt-0">
              <motion.div
                key="advanced"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AdvancedTab widget={selectedWidget} />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
