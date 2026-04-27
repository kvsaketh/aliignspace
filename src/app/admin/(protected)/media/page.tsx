"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Grid3X3,
  List,
  Trash2,
  Copy,
  ExternalLink,
  MoreVertical,
  X,
  FileText,
  Video,
  File,
  Check,
  Loader2,
} from "lucide-react";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { useToast } from "@/hooks/use-toast";
import type { MediaWithUsage } from "@/lib/media";
import { formatBytes, getMediaTypeLabel, mediaFolders } from "@/lib/media";
import { cn } from "@/lib/utils";

export default function MediaAdminPage() {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaWithUsage[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaWithUsage[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaWithUsage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/media");
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
  }, [toast]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Apply filters
  useEffect(() => {
    let filtered = [...media];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.filename.toLowerCase().includes(searchLower) ||
          item.alt?.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((item) => {
        if (typeFilter === "image") return item.mimeType.startsWith("image/");
        if (typeFilter === "video") return item.mimeType.startsWith("video/");
        if (typeFilter === "document") {
          return (
            item.mimeType.includes("pdf") ||
            item.mimeType.includes("doc") ||
            item.mimeType.includes("txt")
          );
        }
        return true;
      });
    }

    if (folderFilter !== "all") {
      filtered = filtered.filter((item) => item.folder === folderFilter);
    }

    setFilteredMedia(filtered);
  }, [media, search, typeFilter, folderFilter]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedCount = { success: 0, failed: 0 };

    for (const file of Array.from(files)) {
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

        uploadedCount.success++;
      } catch (error: any) {
        uploadedCount.failed++;
        toast({
          title: "Upload failed",
          description: error.message || `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    // Refresh media list
    await fetchMedia();

    if (uploadedCount.success > 0) {
      toast({
        title: "Upload complete",
        description: `${uploadedCount.success} file(s) uploaded successfully`,
      });
    }

    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectMultiple = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleDelete = async () => {
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
      setDeleteDialogOpen(false);

      toast({
        title: "Deleted",
        description: `${selectedIds.length} file(s) deleted successfully`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete files",
        variant: "destructive",
      });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    });
  };

  const handleUpdateAlt = async (id: string, alt: string) => {
    try {
      const response = await fetch("/api/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, alt }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setMedia((prev) =>
        prev.map((m) => (m.id === id ? { ...m, alt } : m))
      );

      toast({
        title: "Updated",
        description: "Alt text updated successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update alt text",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFolder = async (id: string, folder: string) => {
    try {
      const response = await fetch("/api/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, folder }),
      });

      if (!response.ok) throw new Error("Failed to update");

      setMedia((prev) =>
        prev.map((m) => (m.id === id ? { ...m, folder } : m))
      );

      toast({
        title: "Updated",
        description: "Folder updated successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update folder",
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return ImageIcon;
    if (mimeType.startsWith("video/")) return Video;
    if (mimeType.includes("pdf")) return FileText;
    return File;
  };

  return (
    <div
      className="space-y-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 bg-terracotta-500/20 border-4 border-terracotta-500 border-dashed z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 text-center shadow-2xl">
            <Upload className="h-16 w-16 text-terracotta-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Drop files to upload</h3>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            {filteredMedia.length} file{filteredMedia.length !== 1 ? "s" : ""}
            {selectedIds.length > 0 && ` · ${selectedIds.length} selected`}
          </p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/*,application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            disabled={isUploading}
          />
          <Button
            className="bg-terracotta-500 hover:bg-terracotta-600 gap-2"
            disabled={isUploading}
            asChild
          >
            <span>
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isUploading ? "Uploading..." : "Upload Files"}
            </span>
          </Button>
        </label>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by filename or alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Folder Filter */}
        <Select value={folderFilter} onValueChange={setFolderFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All folders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            {mediaFolders.map((folder) => (
              <SelectItem key={folder} value={folder}>
                {folder}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-none",
              viewMode === "grid" && "bg-gray-100"
            )}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-none",
              viewMode === "list" && "bg-gray-100"
            )}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIds([])}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete ({selectedIds.length})
            </Button>
          </div>
        )}
      </div>

      {/* Media Gallery */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          Loading media...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-4 border-2 border-dashed border-gray-200 rounded-lg">
          <ImageIcon className="h-16 w-16 text-gray-300" />
          <div>
            <p className="text-lg font-medium">
              {search || typeFilter !== "all"
                ? "No media files match your filters"
                : "No media files yet"}
            </p>
            <p className="text-sm">
              {search || typeFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Upload images, videos, or documents to get started"}
            </p>
          </div>
          {!search && typeFilter === "all" && (
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <Button variant="outline" className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  Upload your first file
                </span>
              </Button>
            </label>
          )}
        </div>
      ) : (
        <MediaGallery
          media={filteredMedia}
          selectedIds={selectedIds}
          onSelect={handleSelectToggle}
          onSelectMultiple={handleSelectMultiple}
          onPreview={setPreviewMedia}
          viewMode={viewMode}
        />
      )}

      {/* Preview Modal */}
      <Dialog open={!!previewMedia} onOpenChange={() => setPreviewMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {previewMedia && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = getFileIcon(previewMedia.mimeType);
                    return <Icon className="h-5 w-5 text-gray-400" />;
                  })()}
                  {previewMedia.filename}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Preview */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {previewMedia.mimeType.startsWith("image/") ? (
                    <img
                      src={previewMedia.url}
                      alt={previewMedia.alt || previewMedia.filename}
                      className="w-full h-full object-contain max-h-[400px]"
                    />
                  ) : previewMedia.mimeType.startsWith("video/") ? (
                    <video
                      src={previewMedia.url}
                      controls
                      className="w-full max-h-[400px]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      {(() => {
                        const Icon = getFileIcon(previewMedia.mimeType);
                        return <Icon className="h-20 w-20 mb-4" />;
                      })()}
                      <p>Preview not available</p>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {/* URL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      URL
                    </label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={previewMedia.url}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopyUrl(previewMedia.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={previewMedia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Folder */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Folder
                    </label>
                    <Select
                      value={previewMedia.folder || "uncategorized"}
                      onValueChange={(v) => handleUpdateFolder(previewMedia.id, v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mediaFolders.map((folder) => (
                          <SelectItem key={folder} value={folder}>
                            {folder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Alt Text */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Alt Text
                    </label>
                    <Input
                      defaultValue={previewMedia.alt || ""}
                      placeholder="Describe this image..."
                      className="mt-1"
                      onBlur={(e) =>
                        handleUpdateAlt(previewMedia.id, e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Used for accessibility and SEO
                    </p>
                  </div>

                  {/* File Info */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      File Information
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span>{getMediaTypeLabel(previewMedia.mimeType)}</span>
                      <span className="text-gray-500">Folder:</span>
                      <span>{previewMedia.folder || "uncategorized"}</span>
                      <span className="text-gray-500">Size:</span>
                      <span>{formatBytes(previewMedia.size)}</span>
                      {previewMedia.width && previewMedia.height && (
                        <>
                          <span className="text-gray-500">Dimensions:</span>
                          <span>
                            {previewMedia.width} × {previewMedia.height}
                          </span>
                        </>
                      )}
                      <span className="text-gray-500">Uploaded:</span>
                      <span>
                        {new Date(previewMedia.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Usage */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Usage ({previewMedia.usage.total} locations)
                    </h4>
                    {previewMedia.usage.total === 0 ? (
                      <p className="text-sm text-gray-500">Not used anywhere</p>
                    ) : (
                      <div className="space-y-2 max-h-32 overflow-auto">
                        {previewMedia.usage.pages.map((page) => (
                          <div
                            key={page.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="flex-1 truncate">{page.title}</span>
                            <span className="text-xs text-gray-400">Page</span>
                          </div>
                        ))}
                        {previewMedia.usage.posts.map((post) => (
                          <div
                            key={post.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <FileText className="h-4 w-4 text-green-500" />
                            <span className="flex-1 truncate">{post.title}</span>
                            <span className="text-xs text-gray-400">Post</span>
                          </div>
                        ))}
                        {previewMedia.usage.portfolio.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ImageIcon className="h-4 w-4 text-purple-500" />
                            <span className="flex-1 truncate">
                              {project.title}
                            </span>
                            <span className="text-xs text-gray-400">
                              Portfolio
                            </span>
                          </div>
                        ))}
                        {previewMedia.usage.seo.map((seo) => (
                          <div
                            key={seo.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ExternalLink className="h-4 w-4 text-orange-500" />
                            <span className="flex-1 truncate">
                              {seo.metaTitle || "SEO Image"}
                            </span>
                            <span className="text-xs text-gray-400">SEO</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => handleCopyUrl(previewMedia.url)}
                    >
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </Button>
                    <Button
                      variant="destructive"
                      className="gap-2"
                      onClick={() => {
                        setPreviewMedia(null);
                        setSelectedIds([previewMedia.id]);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media Files</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedIds.length} file
              {selectedIds.length !== 1 ? "s" : ""}? This action cannot be undone.
              {selectedIds.some((id) => {
                const mediaItem = media.find((m) => m.id === id);
                return mediaItem && mediaItem.usage.total > 0;
              }) && (
                <span className="block mt-2 text-amber-600">
                  Warning: Some files are currently in use and deleting them may
                  break content on your site.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedIds([])}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
