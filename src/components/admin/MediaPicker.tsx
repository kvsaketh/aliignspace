"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Upload,
  X,
  Search,
  Grid3X3,
  List,
  Check,
  Trash2,
} from "lucide-react";
import { MediaGallery } from "./MediaGallery";
import { useToast } from "@/hooks/use-toast";
import type { MediaWithUsage } from "@/lib/media";
import { cn } from "@/lib/utils";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string | null) => void;
  onMediaSelect?: (media: MediaWithUsage | null) => void;
  buttonLabel?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "secondary";
  previewSize?: "sm" | "md" | "lg";
  allowedTypes?: string[];
  className?: string;
}

export function MediaPicker({
  value,
  onChange,
  onMediaSelect,
  buttonLabel = "Select Image",
  buttonVariant = "outline",
  previewSize = "md",
  allowedTypes,
  className,
}: MediaPickerProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState<MediaWithUsage[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaWithUsage | null>(null);

  const previewSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  // Fetch media when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, search, typeFilter]);

  // Find selected media from value
  useEffect(() => {
    if (value && media.length > 0) {
      const found = media.find((m) => m.url === value);
      setSelectedMedia(found || null);
    } else {
      setSelectedMedia(null);
    }
  }, [value, media]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter !== "all") params.append("type", typeFilter);

      const response = await fetch(`/api/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");
      const data = await response.json();
      setMedia(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load media library",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedMedia: MediaWithUsage[] = [];

    for (const file of Array.from(files)) {
      // Check allowed types
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an allowed file type`,
          variant: "destructive",
        });
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const data = await response.json();
        uploadedMedia.push({ ...data, usage: { pages: [], posts: [], portfolio: [], seo: [], total: 0 } });
      } catch (error: any) {
        toast({
          title: "Upload failed",
          description: error.message || `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    if (uploadedMedia.length > 0) {
      setMedia((prev) => [...uploadedMedia, ...prev]);
      toast({
        title: "Upload complete",
        description: `${uploadedMedia.length} file(s) uploaded successfully`,
      });

      // If single file uploaded, auto-select it
      if (uploadedMedia.length === 1) {
        handleSelect(uploadedMedia[0]);
      }
    }

    setIsUploading(false);
  };

  const handleSelect = (mediaItem: MediaWithUsage) => {
    onChange(mediaItem.url);
    onMediaSelect?.(mediaItem);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onChange(null);
    onMediaSelect?.(null);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectMultiple = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      const response = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      setMedia((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      setSelectedIds([]);

      toast({
        title: "Deleted",
        description: `${selectedIds.length} file(s) deleted`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete files",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Preview */}
      {value ? (
        <div className="relative inline-block">
          <div
            className={cn(
              "rounded-lg overflow-hidden border bg-gray-100",
              previewSizes[previewSize]
            )}
          >
            <img
              src={value}
              alt="Selected"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="absolute -top-2 -right-2 flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <ImageIcon className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant={buttonVariant}
          onClick={() => setIsOpen(true)}
          className="gap-2"
        >
          <ImageIcon className="h-4 w-4" />
          {buttonLabel}
        </Button>
      )}

      {/* Media Library Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>

          {/* Toolbar */}
          <div className="px-6 py-3 border-b space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Upload */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept={allowedTypes?.join(",") || "image/*,video/*,application/pdf"}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  variant="default"
                  className="bg-terracotta-500 hover:bg-terracotta-600 gap-2"
                  disabled={isUploading}
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload"}
                  </span>
                </Button>
              </label>

              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex items-center border rounded-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-none",
                    viewMode === "grid" && "bg-gray-100"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-none",
                    viewMode === "list" && "bg-gray-100"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selection Actions */}
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 p-2 bg-terracotta-50 rounded-md">
                <span className="text-sm text-terracotta-700">
                  {selectedIds.length} selected
                </span>
                <div className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-terracotta-600 hover:text-terracotta-700"
                  onClick={() => handleSelectMultiple([])}
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="bg-terracotta-500 hover:bg-terracotta-600 gap-1"
                  onClick={() => {
                    const selected = media.find((m) => m.id === selectedIds[0]);
                    if (selected) handleSelect(selected);
                  }}
                  disabled={selectedIds.length !== 1}
                >
                  <Check className="h-3 w-3" />
                  Select
                </Button>
              </div>
            )}
          </div>

          {/* Media Grid */}
          <div className="flex-1 overflow-auto px-6 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading media...
              </div>
            ) : media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                <ImageIcon className="h-16 w-16" />
                <p>No media files found</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4" />
                      Upload your first file
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <MediaGallery
                media={media}
                selectedIds={selectedIds}
                onSelect={handleSelectToggle}
                onSelectMultiple={handleSelectMultiple}
                onPreview={handleSelect}
                viewMode={viewMode}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {media.length} file{media.length !== 1 ? "s" : ""} total
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-terracotta-500 hover:bg-terracotta-600"
                onClick={() => {
                  if (selectedIds.length === 1) {
                    const selected = media.find((m) => m.id === selectedIds[0]);
                    if (selected) handleSelect(selected);
                  }
                }}
                disabled={selectedIds.length !== 1}
              >
                Select Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
