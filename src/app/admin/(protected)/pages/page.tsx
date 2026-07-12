"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Plus,
  Pencil,
  Eye,
  Trash2,
  Copy,
  Grid3X3,
  List,
  MoreVertical,
  Search,
  Loader2,
  Check,
  X,
  Layout,
  FileText,
  Image,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string | null;
    email: string;
  };
  _count: {
    sections: number;
  };
}

const templates = [
  { id: "default", label: "Default", icon: Layout, description: "Hero + Content sections" },
  { id: "blank", label: "Blank", icon: FileText, description: "Start from scratch" },
  { id: "about", label: "About Page", icon: Image, description: "About hero + story sections" },
  { id: "landing", label: "Landing Page", icon: Sparkles, description: "Hero + Features + CTA" },
];

export default function AdminPagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const [isDuplicating, setIsDuplicating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageTemplate, setNewPageTemplate] = useState("default");
  const [isCreating, setIsCreating] = useState(false);

  // Fetch pages
  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await fetch(`/api/pages?${params}`);
      if (!response.ok) throw new Error("Failed to fetch pages");
      
      const data = await response.json();
      setPages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, toast]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPages();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, statusFilter]);

  // Create new page
  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a page title",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPageTitle,
          template: newPageTemplate,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create page");
      }

      const newPage = await response.json();
      toast({
        title: "Success",
        description: `Page "${newPage.title}" created successfully`,
      });

      setIsCreateModalOpen(false);
      setNewPageTitle("");
      router.push(`/admin/pages/${newPage.id}/edit`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Duplicate page
  const handleDuplicate = async (page: Page) => {
    try {
      setIsDuplicating(page.id);
      const response = await fetch(`/api/pages/${page.id}/duplicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newTitle: `${page.title} (Copy)`,
        }),
      });

      if (!response.ok) throw new Error("Failed to duplicate page");

      const duplicatedPage = await response.json();
      toast({
        title: "Success",
        description: `Page "${page.title}" duplicated successfully`,
      });

      fetchPages();
      router.push(`/admin/pages/${duplicatedPage.id}/edit`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate page",
        variant: "destructive",
      });
    } finally {
      setIsDuplicating(null);
    }
  };

  // Delete page
  const handleDelete = async () => {
    if (!pageToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/pages/${pageToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete page");

      toast({
        title: "Success",
        description: `Page "${pageToDelete.title}" deleted successfully`,
      });

      setPages(pages.filter((p) => p.id !== pageToDelete.id));
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedPages.size === 0) return;

    try {
      setIsDeleting(true);
      await Promise.all(
        Array.from(selectedPages).map((id) =>
          fetch(`/api/pages/${id}`, { method: "DELETE" })
        )
      );

      toast({
        title: "Success",
        description: `${selectedPages.size} page(s) deleted successfully`,
      });

      setPages(pages.filter((p) => !selectedPages.has(p.id)));
      setSelectedPages(new Set());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pages",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle page selection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedPages);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedPages(newSelection);
  };

  // Select all pages
  const toggleSelectAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map((p) => p.id)));
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="w-3 h-3 mr-1" />
            Published
          </Badge>
        );
      case "DRAFT":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Draft
          </Badge>
        );
      case "ARCHIVED":
        return (
          <Badge variant="outline" className="text-gray-500">
            Archived
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-muted-foreground">
            Manage your website pages and content.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-terracotta-500 hover:bg-terracotta-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-none",
                viewMode === "list" && "bg-muted"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-none",
                viewMode === "grid" && "bg-muted"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPages.size > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedPages.size} selected
          </span>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPages(new Set())}
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-1" />
            )}
            Delete
          </Button>
        </div>
      )}

      {/* Pages List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Pages</CardTitle>
              <CardDescription>
                {loading ? "Loading..." : `${pages.length} page${pages.length !== 1 ? "s" : ""} total`}
              </CardDescription>
            </div>
            {viewMode === "list" && pages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSelectAll}
              >
                {selectedPages.size === pages.length ? "Deselect All" : "Select All"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all"
                  ? "No pages match your search criteria."
                  : "No pages yet. Create your first page to get started."}
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-terracotta-500 hover:bg-terracotta-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Page
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={cn(
                    "group relative p-4 border rounded-lg hover:border-terracotta-300 transition-all cursor-pointer",
                    selectedPages.has(page.id) && "border-terracotta-500 bg-terracotta-50/50"
                  )}
                  onClick={() => toggleSelection(page.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    {getStatusBadge(page.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/pages/${page.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/${page.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicate(page);
                          }}
                          disabled={isDuplicating === page.id}
                        >
                          {isDuplicating === page.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPageToDelete(page);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h4 className="font-medium mb-1 truncate">{page.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">/{page.slug}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{page._count.sections} section{page._count.sections !== 1 ? "s" : ""}</span>
                    <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-colors",
                    selectedPages.has(page.id)
                      ? "border-terracotta-500 bg-terracotta-50/50"
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedPages.has(page.id)}
                    onChange={() => toggleSelection(page.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium truncate">{page.title}</h4>
                      {getStatusBadge(page.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      /{page.slug} • {page._count.sections} section
                      {page._count.sections !== 1 ? "s" : ""} • Updated{" "}
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/${page.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Preview">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/pages/${page.id}/edit`}>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Duplicate"
                      onClick={() => handleDuplicate(page)}
                      disabled={isDuplicating === page.id}
                    >
                      {isDuplicating === page.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      onClick={() => {
                        setPageToDelete(page);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Page Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Choose a template and name for your new page.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Page Title</label>
              <Input
                placeholder="Enter page title..."
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreatePage();
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setNewPageTemplate(template.id)}
                      className={cn(
                        "flex flex-col items-start p-4 border rounded-lg text-left transition-all hover:border-terracotta-300",
                        newPageTemplate === template.id &&
                          "border-terracotta-500 bg-terracotta-50/50"
                      )}
                    >
                      <Icon className="h-5 w-5 mb-2 text-terracotta-600" />
                      <span className="font-medium text-sm">{template.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {template.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreatePage}
              disabled={isCreating || !newPageTitle.trim()}
              className="bg-terracotta-500 hover:bg-terracotta-600"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Page
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{pageToDelete?.title}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPageToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
