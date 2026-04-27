"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, X, Youtube, Image as ImageIcon, Loader2 } from "lucide-react";

const CATEGORIES = [
  "3BHK Apartment", "2BHK Apartment", "4BHK Apartment",
  "Villa", "Home Interiors", "Bedroom Design",
  "Kitchen Design", "Wardrobe Design", "Design Tips", "Office & Commercial",
];

function getYtThumb(url: string) {
  const r = url.match(/[?&]v=([^&]+)/);
  const s = url.match(/shorts\/([^?&\n]+)/);
  const id = r?.[1] || s?.[1];
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}

export default function EditPortfolioPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"Regular" | "Short">("Regular");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    fetch(`/api/portfolio/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setTitle(p.title ?? "");
        setCategory(p.category ?? CATEGORIES[0]);
        setLocation(p.location ?? "");
        setDescription(p.description ?? "");
        setVideoUrl(p.videoUrl ?? "");
        setVideoType(p.videoType ?? "Regular");
        setStatus(p.status ?? "DRAFT");
        setFeatured(p.featured ?? false);
        setCoverImage(p.image ?? "");
        setImages(Array.isArray(p.images) ? p.images : []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url);
    const thumb = getYtThumb(url);
    if (thumb && !coverImage) setCoverImage(thumb);
    if (url.includes("/shorts/")) setVideoType("Short");
    else if (url.includes("youtube.com/watch")) setVideoType("Regular");
  };

  const addImage = () => {
    const url = newImageUrl.trim();
    if (url && !images.includes(url)) { setImages([...images, url]); setNewImageUrl(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, location, description, videoUrl, videoType, status, featured, image: coverImage, images }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/portfolio");
    } catch (e: any) {
      setError(e.message || "Failed to save.");
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" /> Loading project...
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/portfolio"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}

        <Card>
          <CardHeader><CardTitle className="text-base">Project Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Youtube className="h-4 w-4 text-red-500" /> YouTube Video</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="videoUrl">YouTube URL</Label>
              <Input id="videoUrl" value={videoUrl} onChange={(e) => handleVideoUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or /shorts/..." />
              {videoUrl && (
                <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline mt-1">
                  <Youtube className="h-3 w-3" /> View on YouTube
                </a>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Video Type</Label>
              <div className="flex gap-4">
                {(["Regular", "Short"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="videoType" value={t} checked={videoType === t} onChange={() => setVideoType(t)} className="accent-terracotta-500" /> {t}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Images</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="cover">Cover / Thumbnail URL</Label>
              <Input id="cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
              {coverImage && (
                <div className="mt-2 w-32 h-24 rounded-lg overflow-hidden border bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Additional Images</Label>
              <div className="flex gap-2">
                <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                  placeholder="Paste image URL and press Enter" />
                <Button type="button" variant="outline" size="sm" onClick={addImage}><Plus className="h-4 w-4 mr-1" /> Add</Button>
              </div>
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {images.map((url, i) => (
                    <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden border bg-gray-100 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Publish Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Status</p><p className="text-xs text-muted-foreground">Published projects appear on the website</p></div>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div><p className="text-sm font-medium">Featured</p><p className="text-xs text-muted-foreground">Highlight on homepage</p></div>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-terracotta-500 cursor-pointer" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 pb-10">
          <Button type="submit" disabled={saving} className="bg-terracotta-500 hover:bg-terracotta-600">{saving ? "Saving..." : "Save Changes"}</Button>
          <Link href="/admin/portfolio"><Button type="button" variant="outline">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
}
