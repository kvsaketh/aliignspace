"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BuilderSection } from "@/types";
import { getBlockComponent } from "@/components/blocks";
import {
  Monitor,
  Smartphone,
  Tablet,
  X,
  RotateCcw,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface LivePreviewProps {
  sections: BuilderSection[];
  pageTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onEditSection?: (sectionId: string) => void;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

interface ViewportConfig {
  width: string;
  height: string;
  label: string;
  icon: React.ReactNode;
}

const viewports: Record<ViewportSize, ViewportConfig> = {
  desktop: {
    width: "100%",
    height: "100%",
    label: "Desktop",
    icon: <Monitor className="h-4 w-4" />,
  },
  tablet: {
    width: "768px",
    height: "100%",
    label: "Tablet",
    icon: <Tablet className="h-4 w-4" />,
  },
  mobile: {
    width: "375px",
    height: "100%",
    label: "Mobile",
    icon: <Smartphone className="h-4 w-4" />,
  },
};

// Individual preview section with click-to-edit
interface PreviewSectionProps {
  section: BuilderSection;
  index: number;
  isEditing: boolean;
  onClick?: () => void;
}

function PreviewSection({
  section,
  index,
  isEditing,
  onClick,
}: PreviewSectionProps) {
  const BlockComponent = getBlockComponent(section.type);

  if (!BlockComponent || section.hidden) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative transition-all",
        isEditing && "cursor-pointer hover:ring-2 hover:ring-terracotta-500 hover:ring-inset"
      )}
      onClick={isEditing ? onClick : undefined}
      data-section-id={section.id}
      data-section-index={index}
    >
      {isEditing && (
        <div className="absolute top-0 left-0 bg-terracotta-500 text-white text-xs px-2 py-1 z-10 opacity-0 hover:opacity-100 transition-opacity">
          {section.type} #{index + 1}
        </div>
      )}
      <BlockComponent {...section.props} />
    </div>
  );
}

export function LivePreview({
  sections,
  pageTitle = "Untitled Page",
  isOpen,
  onClose,
  onEditSection,
}: LivePreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scale, setScale] = useState(1);

  // Calculate scale to fit viewport in available space
  useEffect(() => {
    const calculateScale = () => {
      const containerWidth = window.innerWidth - (isFullscreen ? 0 : 100);
      const targetWidth = viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : 1200;
      
      if (targetWidth > containerWidth) {
        setScale(containerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [viewport, isFullscreen]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm transition-all",
        isFullscreen && "bg-white"
      )}
    >
      {/* Header Toolbar */}
      {!isFullscreen && (
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-gray-900">Live Preview</h2>
            <span className="text-sm text-gray-500">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(Object.keys(viewports) as ViewportSize[]).map((size) => (
                <Button
                  key={size}
                  variant={viewport === size ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewport(size)}
                  className={cn(
                    "h-8 gap-2",
                    viewport === size && "bg-white shadow-sm"
                  )}
                >
                  {viewports[size].icon}
                  <span className="hidden sm:inline capitalize">{size}</span>
                </Button>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* Actions */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className={cn(isRefreshing && "animate-spin")}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Preview Canvas */}
      <div
        className={cn(
          "flex-1 overflow-auto flex items-start justify-center p-8",
          isFullscreen && "h-screen pt-0"
        )}
        style={{ height: isFullscreen ? "100vh" : "calc(100vh - 3.5rem)" }}
      >
        <div
          className="bg-white shadow-2xl transition-all duration-300 origin-top"
          style={{
            width: viewports[viewport].width,
            minHeight: viewports[viewport].height,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: "top center",
          }}
        >
          {/* Preview Content */}
          <div className="relative">
            {sections.length === 0 ? (
              <div className="min-h-[50vh] flex items-center justify-center p-12">
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-2">No sections added yet</p>
                  <p className="text-gray-300 text-sm">
                    Add blocks from the library to see them here
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {sections.map((section, index) => (
                  <PreviewSection
                    key={section.id}
                    section={section}
                    index={index}
                    isEditing={!!onEditSection}
                    onClick={() => onEditSection?.(section.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFullscreen}
          className="fixed bottom-4 right-4 z-50 shadow-lg"
        >
          <Minimize2 className="h-4 w-4 mr-2" />
          Exit Fullscreen
        </Button>
      )}
    </div>
  );
}

// Compact preview for sidebar or inline use
interface CompactPreviewProps {
  sections: BuilderSection[];
  className?: string;
}

export function CompactPreview({ sections, className }: CompactPreviewProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden border", className)}>
      <ScrollArea className="h-full">
        <div className="space-y-0">
          {sections.map((section) => {
            const BlockComponent = getBlockComponent(section.type);
            if (!BlockComponent || section.hidden) return null;

            return (
              <div
                key={section.id}
                className="transform scale-50 origin-top"
                style={{ marginBottom: "-50%" }}
              >
                <BlockComponent {...section.props} />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// Preview thumbnail for section list
interface SectionThumbnailProps {
  section: BuilderSection;
  className?: string;
}

export function SectionThumbnail({ section, className }: SectionThumbnailProps) {
  const BlockComponent = getBlockComponent(section.type);

  if (!BlockComponent) {
    return (
      <div
        className={cn(
          "bg-gray-100 flex items-center justify-center text-gray-400 text-xs",
          className
        )}
      >
        {section.type}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        section.hidden && "opacity-50 grayscale",
        className
      )}
    >
      <div className="transform scale-[0.25] origin-top">
        <BlockComponent {...section.props} />
      </div>
    </div>
  );
}

// Device frame preview for marketing/screenshots
interface DeviceFramePreviewProps {
  sections: BuilderSection[];
  device?: "mobile" | "tablet" | "desktop";
  className?: string;
}

export function DeviceFramePreview({
  sections,
  device = "mobile",
  className,
}: DeviceFramePreviewProps) {
  const dimensions = {
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 800 },
  };

  const { width, height } = dimensions[device];

  return (
    <div
      className={cn(
        "relative mx-auto",
        device === "mobile" && "w-[375px]",
        device === "tablet" && "w-[768px]",
        device === "desktop" && "w-[1280px]",
        className
      )}
    >
      {/* Device Frame */}
      <div
        className={cn(
          "relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl",
          device === "desktop" && "rounded-lg p-2"
        )}
      >
        {/* Notch (mobile only) */}
        {device === "mobile" && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-10" />
        )}

        {/* Screen */}
        <div
          className="bg-white rounded-[2.5rem] overflow-hidden relative"
          style={{
            height: device === "mobile" ? "750px" : device === "tablet" ? "900px" : "700px",
          }}
        >
          <ScrollArea className="h-full">
            {sections.map((section) => {
              const BlockComponent = getBlockComponent(section.type);
              if (!BlockComponent || section.hidden) return null;

              return <BlockComponent key={section.id} {...section.props} />;
            })}
          </ScrollArea>
        </div>

        {/* Home Indicator (mobile only) */}
        {device === "mobile" && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
        )}
      </div>
    </div>
  );
}
