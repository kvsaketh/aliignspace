"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBuilderStore } from "@/stores/builder-store";
import { getWidgetDefinition } from "@/lib/builder/widget-registry";
import type { WidgetData, DeviceType } from "@/types/builder";
import { cn } from "@/lib/utils";

interface WidgetRendererProps {
  widget: WidgetData;
  device: DeviceType;
  isSelected: boolean;
  onSelect: () => void;
}

function buildStyles(
  style: WidgetData["style"],
  responsive: WidgetData["responsive"],
  device: DeviceType
): React.CSSProperties {
  const base: React.CSSProperties = {};

  // Apply base styles
  if (style) {
    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        (base as Record<string, unknown>)[cssKey] = value;
      }
    });
  }

  // Apply responsive overrides
  if (responsive?.[device]) {
    Object.entries(responsive[device]).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        (base as Record<string, unknown>)[cssKey] = value;
      }
    });
  }

  return base;
}

function WidgetContent({ widget }: { widget: WidgetData }) {
  const { content, type } = widget;

  switch (type) {
    case "heading": {
      const tagName = (content.tag as string) || "h2";
      const text = (content.text as string) || "";
      const highlightWords = (content.highlightWords as string[]) || [];
      const Tag = tagName as keyof JSX.IntrinsicElements;

      // Process highlight words
      let processedText = text;
      if (highlightWords.length > 0) {
        const parts = text.split(new RegExp(`(${highlightWords.join("|")})`, "gi"));
        return (
          <Tag className="font-serif">
            {parts.map((part, i) =>
              highlightWords.some(
                (hw) => hw.toLowerCase() === part.toLowerCase()
              ) ? (
                <span key={i} className="text-coral-500 italic">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </Tag>
        );
      }

      return <Tag className="font-serif">{text}</Tag>;
    }

    case "text":
      return (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: (content.html as string) || "<p>Text content...</p>",
          }}
        />
      );

    case "image": {
      const src = content.mediaId
        ? `/api/media/${content.mediaId}`
        : (content.fallbackUrl as string) || "/images/placeholder.jpg";
      return (
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: (content.aspectRatio as string) || "16/9" }}
        >
          <img
            src={src}
            alt={(content.altText as string) || ""}
            className="w-full h-full object-cover"
            loading={content.lazyLoad ? "lazy" : "eager"}
          />
          {content.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-white text-sm">{content.caption as string}</span>
            </div>
          )}
        </div>
      );
    }

    case "button": {
      const variant = (content.variant as string) || "primary";
      const variantClasses = {
        primary: "bg-coral-500 text-white hover:bg-coral-600",
        secondary: "border-2 border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white",
        ghost: "text-charcoal hover:text-coral-500 underline-offset-4 hover:underline",
      };

      return (
        <a
          href={(content.url as string) || "#"}
          className={cn(
            "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300",
            variantClasses[variant as keyof typeof variantClasses]
          )}
        >
          {content.label as string}
        </a>
      );
    }

    case "divider":
      return (
        <div
          className="w-full"
          style={{
            height: `${(content.thickness as number) || 1}px`,
            borderTop: `${(content.thickness as number) || 1}px ${(content.style as string) || "solid"} currentColor`,
            width: (content.length as string) || "100%",
          }}
        />
      );

    case "spacer":
      return <div style={{ height: `${(content.height as number) || 40}px` }} />;

    case "icon-box":
      return (
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coral-500/10 flex items-center justify-center">
            <span className="text-coral-500 text-xl">★</span>
          </div>
          <div>
            <h4 className="font-serif font-medium text-charcoal text-lg mb-1">
              {content.title as string}
            </h4>
            <p className="text-slate-500 text-sm">{content.description as string}</p>
          </div>
        </div>
      );

    case "container":
      return (
        <div
          className={cn(
            "flex",
            content.direction === "column" ? "flex-col" : "flex-row",
            content.wrap ? "flex-wrap" : "flex-nowrap"
          )}
          style={{ gap: `${(content.gap as number) || 24}px` }}
        >
          {/* Container children are rendered by the canvas */}
        </div>
      );

    case "column":
      return (
        <div style={{ width: (content.width as string) || "100%" }}>
          {/* Column children are rendered by the canvas */}
        </div>
      );

    case "section":
      return (
        <div className={cn((content.fullWidth as boolean) ? "w-full" : "container mx-auto")}>
          {/* Section children are rendered by the canvas */}
        </div>
      );

    default:
      return (
        <div className="p-4 bg-gray-100 rounded-lg text-gray-500 text-sm">
          {getWidgetDefinition(type)?.label || type} widget
        </div>
      );
  }
}

export function WidgetRenderer({ widget, device, isSelected, onSelect }: WidgetRendererProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { widgets } = useBuilderStore();

  const styles = buildStyles(widget.style, widget.responsive, device);
  const isHidden = widget.hidden;

  // Get children for container types
  const children = widgets.filter((w) => w.parentId === widget.id);
  const hasChildren = children.length > 0;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isHidden ? 0.3 : 1, y: 0 }}
      className={cn(
        "relative group transition-all duration-200",
        isSelected && "z-10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Selection border */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-200 rounded-sm",
          isSelected
            ? "ring-2 ring-coral-500 ring-offset-2 ring-offset-gray-950"
            : "ring-1 ring-transparent group-hover:ring-gray-700"
        )}
      />

      {/* Hidden overlay */}
      {isHidden && (
        <div className="absolute inset-0 bg-gray-950/50 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-sm">
          <span className="text-gray-500 text-xs font-medium">Hidden</span>
        </div>
      )}

      {/* Widget content */}
      <div style={styles} className={cn(isHidden && "grayscale")}>
        <WidgetContent widget={widget} />

        {/* Render children for container widgets */}
        {hasChildren && (
          <div
            className={cn(
              "min-h-[40px]",
              widget.type === "container" &&
                (widget.content.direction === "column" ? "flex flex-col" : "flex flex-row"),
              widget.type === "column" && "flex flex-col"
            )}
            style={
              widget.type === "container"
                ? { gap: `${(widget.content.gap as number) || 24}px` }
                : undefined
            }
          >
            {children.map((child) => (
              <WidgetRenderer
                key={child.id}
                widget={child}
                device={device}
                isSelected={false}
                onSelect={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
