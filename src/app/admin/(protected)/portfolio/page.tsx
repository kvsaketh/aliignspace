"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Star, Filter,
  ChevronDown, GripVertical, LayoutGrid, List, Loader2,
} from "lucide-react";

const CATEGORIES = [
  "All", "2BHK Apartment", "3BHK Apartment", "4BHK Apartment",
  "3BHK Villa", "4BHK Villa", "Office & Commercial",
];

type Project = {
  id: string;
  title: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  image: string;
  createdAt: string;
  featured: boolean;
};

type ViewMode = "table" | "grid";

function StatusBadge({ status }: { status: Project["status"] }) {
  return status === "PUBLISHED"
    ? <Badge variant="success">Published</Badge>
    : <Badge variant="warning">Draft</Badge>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function DeleteModal({ project, onConfirm, onCancel }: { project: Project; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-2">Delete Project</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Are you sure you want to delete &quot;{project.title}&quot;? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const total = projects.length;
  const published = projects.filter((p) => p.status === "PUBLISHED").length;
  const drafts = projects.filter((p) => p.status === "DRAFT").length;
  const featured = projects.filter((p) => p.featured).length;

  const filtered = categoryFilter === "All" ? projects : projects.filter((p) => p.category === categoryFilter);

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleSelectAll = () =>
    setSelectedIds(selectedIds.size === filtered.length ? new Set() : new Set(filtered.map((p) => p.id)));

  const handleTogglePublish = async (id: string) => {
    const project = projects.find((p) => p.id === id)!;
    const newStatus = project.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await fetch(`/api/portfolio/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleToggleFeatured = async (id: string) => {
    const project = projects.find((p) => p.id === id)!;
    const featured = !project.featured;
    await fetch(`/api/portfolio/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ featured }) });
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, featured } : p));
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/portfolio/${deleteTarget.id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setSelectedIds((prev) => { const n = new Set(prev); n.delete(deleteTarget.id); return n; });
    setDeleteTarget(null);
  };

  const handleBulkDelete = async () => {
    await Promise.all([...selectedIds].map((id) => fetch(`/api/portfolio/${id}`, { method: "DELETE" })));
    setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
  };

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => { setDraggedId(id); e.dataTransfer.effectAllowed = "move"; }, []);
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    setProjects((prev) => {
      const items = [...prev];
      const from = items.findIndex((p) => p.id === draggedId);
      const to = items.findIndex((p) => p.id === targetId);
      const [moved] = items.splice(from, 1);
      items.splice(to, 0, moved);
      fetch("/api/portfolio/reorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderedIds: items.map((p) => p.id) }) });
      return items;
    });
    setDraggedId(null);
  }, [draggedId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfolio</h2>
          <p className="text-muted-foreground">Manage your interior design projects.</p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: total, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Published", value: published, color: "text-green-600", bg: "bg-green-50" },
          { label: "Drafts", value: drafts, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Featured", value: featured, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">
              All Projects <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedIds.size > 0 && (
                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50" onClick={handleBulkDelete}>
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete ({selectedIds.size})
                </Button>
              )}
              <div className="relative">
                <Button variant="outline" size="sm" onClick={() => setShowFilterMenu((v) => !v)}>
                  <Filter className="mr-1.5 h-3.5 w-3.5" />{categoryFilter}<ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
                {showFilterMenu && (
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border rounded-lg shadow-lg py-1 min-w-[160px]">
                    {CATEGORIES.map((cat) => (
                      <button key={cat} className={`w-full text-left px-4 py-1.5 text-sm hover:bg-gray-50 ${categoryFilter === cat ? "text-terracotta-600 font-medium" : "text-gray-700"}`}
                        onClick={() => { setCategoryFilter(cat); setShowFilterMenu(false); setSelectedIds(new Set()); }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex border rounded-lg overflow-hidden">
                <button className={`p-1.5 ${viewMode === "table" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`} onClick={() => setViewMode("table")}><List className="h-4 w-4" /></button>
                <button className={`p-1.5 ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`} onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading projects...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No projects found. <Link href="/admin/portfolio/new" className="text-terracotta-500 hover:underline">Add your first project.</Link>
            </div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="pl-4 pr-2 py-3 w-8"><input type="checkbox" className="rounded" checked={filtered.length > 0 && selectedIds.size === filtered.length} onChange={toggleSelectAll} /></th>
                    <th className="px-2 py-3 w-6" />
                    <th className="px-4 py-3 text-left">Project</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((project) => (
                    <tr key={project.id} draggable onDragStart={(e) => handleDragStart(e, project.id)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, project.id)}
                      className={`hover:bg-gray-50 transition-colors ${draggedId === project.id ? "opacity-40" : ""}`}>
                      <td className="pl-4 pr-2 py-3"><input type="checkbox" className="rounded" checked={selectedIds.has(project.id)} onChange={() => toggleSelect(project.id)} /></td>
                      <td className="px-2 py-3 text-gray-300 cursor-grab active:cursor-grabbing"><GripVertical className="h-4 w-4" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="font-medium text-gray-900 flex items-center gap-1.5">
                            {project.title}
                            {project.featured && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{project.category}</td>
                      <td className="px-4 py-3"><StatusBadge status={project.status} /></td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(project.createdAt)}</td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <button title={project.featured ? "Remove featured" : "Mark featured"} onClick={() => handleToggleFeatured(project.id)}
                            className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${project.featured ? "text-amber-400" : "text-gray-300 hover:text-amber-400"}`}>
                            <Star className={`h-4 w-4 ${project.featured ? "fill-amber-400" : ""}`} />
                          </button>
                          <button title={project.status === "PUBLISHED" ? "Unpublish" : "Publish"} onClick={() => handleTogglePublish(project.id)}
                            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                            {project.status === "PUBLISHED" ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                          </button>
                          <Link href={`/admin/portfolio/${project.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 hover:text-blue-700 transition-colors"><Edit2 className="h-4 w-4" /></button>
                          </Link>
                          <button onClick={() => setDeleteTarget(project)} className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((project) => (
                <div key={project.id} className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${selectedIds.has(project.id) ? "ring-2 ring-terracotta-400" : ""}`}>
                  <div className="relative h-40 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2"><input type="checkbox" className="rounded" checked={selectedIds.has(project.id)} onChange={() => toggleSelect(project.id)} /></div>
                    {project.featured && <div className="absolute top-2 right-2 bg-amber-400 rounded-full p-1"><Star className="h-3 w-3 text-white fill-white" /></div>}
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-gray-900 text-sm leading-snug">{project.title}</h4>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">{project.category} &middot; {formatDate(project.createdAt)}</p>
                    <div className="flex items-center gap-1 pt-1 border-t">
                      <button onClick={() => handleToggleFeatured(project.id)} className={`flex-1 py-1 text-xs rounded flex items-center justify-center gap-1 hover:bg-gray-50 ${project.featured ? "text-amber-500" : "text-gray-400"}`}>
                        <Star className={`h-3.5 w-3.5 ${project.featured ? "fill-amber-400" : ""}`} />{project.featured ? "Featured" : "Feature"}
                      </button>
                      <button onClick={() => handleTogglePublish(project.id)} className="flex-1 py-1 text-xs rounded flex items-center justify-center gap-1 hover:bg-gray-50 text-gray-500">
                        {project.status === "PUBLISHED" ? <Eye className="h-3.5 w-3.5 text-green-500" /> : <EyeOff className="h-3.5 w-3.5" />}
                        {project.status === "PUBLISHED" ? "Published" : "Draft"}
                      </button>
                      <Link href={`/admin/portfolio/${project.id}/edit`} className="flex-1 py-1 text-xs rounded flex items-center justify-center gap-1 hover:bg-blue-50 text-blue-500">
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <button onClick={() => setDeleteTarget(project)} className="flex-1 py-1 text-xs rounded flex items-center justify-center gap-1 hover:bg-red-50 text-red-400">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {deleteTarget && <DeleteModal project={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}
