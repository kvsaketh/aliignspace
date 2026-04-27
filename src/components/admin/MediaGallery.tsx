"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  Image as ImageIcon,
  FileText,
  Video,
  File,
  ExternalLink,
} from "lucide-react";
import { formatBytes, getMediaTypeLabel } from "@/lib/media";
import type { MediaWithUsage } from "@/lib/media";

interface MediaGalleryProps {
  media: MediaWithUsage[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectMultiple: (ids: string[]) => void;
  onPreview: (media: MediaWithUsage) => void;
  viewMode?: "grid" | "list";
}

export function MediaGallery({
  media,
  selectedIds,
  onSelect,
  onSelectMultiple,
  onPreview,
  viewMode = "grid",
}: MediaGalleryProps) {
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleClick = (
    e: React.MouseEvent,
    item: MediaWithUsage
  ) => {
    // Handle Ctrl/Cmd+Click for multi-select
    if (e.ctrlKey || e.metaKey) {
      onSelect(item.id);
      setLastSelected(item.id);
      return;
    }

    // Handle Shift+Click for range select
    if (e.shiftKey && lastSelected) {
      const currentIndex = media.findIndex((m) => m.id === item.id);
      const lastIndex = media.findIndex((m) => m.id === lastSelected);
      const start = Math.min(currentIndex, lastIndex);
      const end = Math.max(currentIndex, lastIndex);
      const rangeIds = media.slice(start, end + 1).map((m) => m.id);
      onSelectMultiple(rangeIds);
      return;
    }

    // Regular click - just select this one
    onSelect(item.id);
    setLastSelected(item.id);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return ImageIcon;
    if (mimeType.startsWith("video/")) return Video;
    if (mimeType.includes("pdf")) return FileText;
    return File;
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  if (viewMode === "list") {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    media.length > 0 && selectedIds.length === media.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      onSelectMultiple(media.map((m) => m.id));
                    } else {
                      onSelectMultiple([]);
                    }
                  }}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                File
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Usage
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {media.map((item) => {
              const Icon = getFileIcon(item.mimeType);
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "hover:bg-gray-50 cursor-pointer transition-colors",
                    isSelected(item.id) && "bg-terracotta-50 hover:bg-terracotta-100"
                  )}
                  onClick={(e) => handleClick(e, item)}
                  onDoubleClick={() => onPreview(item)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected(item.id)}
                      onChange={() => {}}
                      className="rounded border-gray-300 pointer-events-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {item.mimeType.startsWith("image/") ? (
                          <img
                            src={item.thumbnailUrl || item.url}
                            alt={item.filename}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <Icon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {item.filename}
                        </p>
                        {item.alt && (
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {item.alt}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {getMediaTypeLabel(item.mimeType)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatBytes(item.size)}
                  </td>
                  <td className="px-4 py-3">
                    {item.usage.total > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs text-terracotta-600">
                        <ExternalLink className="w-3 h-3" />
                        Used {item.usage.total} time
                        {item.usage.total > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Unused</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {media.map((item) => {
        const Icon = getFileIcon(item.mimeType);
        const selected = isSelected(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              "group relative border rounded-lg overflow-hidden cursor-pointer transition-all",
              selected
                ? "ring-2 ring-terracotta-500 border-terracotta-500"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={(e) => handleClick(e, item)}
            onDoubleClick={() => onPreview(item)}
          >
            {/* Selection indicator */}
            <div
              className={cn(
                "absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                selected
                  ? "bg-terracotta-500 text-white"
                  : "bg-white/80 text-transparent group-hover:text-gray-400"
              )}
            >
              <Check className="w-4 h-4" />
            </div>

            {/* Usage indicator */}
            {item.usage.total > 0 && (
              <div className="absolute top-2 right-2 z-10 bg-terracotta-500 text-white text-xs px-2 py-0.5 rounded-full">
                {item.usage.total}
              </div>
            )}

            {/* Thumbnail */}
            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
              {item.mimeType.startsWith("image/") ? (
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "";
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Icon className="w-12 h-12" />
                  <span className="text-xs uppercase">
                    {getMediaTypeLabel(item.mimeType)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2 bg-white">
              <p className="text-xs font-medium text-gray-700 truncate">
                {item.filename}
              </p>
              <p className="text-xs text-gray-400">
                {formatBytes(item.size)}
                {item.width && item.height && (
                  <span className="ml-1">
                    · {item.width}×{item.height}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
