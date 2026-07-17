"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export interface TestimonialFormValues {
  id?: string;
  type: string;
  name: string;
  location: string | null;
  review: string | null;
  rating: number | null;
  videoUrl: string | null;
  avatarUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY: TestimonialFormValues = {
  type: "VIDEO",
  name: "",
  location: "",
  review: "",
  rating: 5,
  videoUrl: "",
  avatarUrl: "",
  sortOrder: 0,
  isActive: true,
};

export function TestimonialForm({ initial }: { initial?: TestimonialFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<TestimonialFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<TestimonialFormValues>) => setValues((v) => ({ ...v, ...patch }));
  const isVideo = values.type === "VIDEO";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.name.trim()) {
      setError("Name / title is required.");
      return;
    }
    if (isVideo && !values.videoUrl?.trim()) {
      setError("A video URL is required for video testimonials.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(
        values.id ? `/api/testimonials/${values.id}` : "/api/testimonials",
        {
          method: values.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: values.type,
            name: values.name.trim(),
            location: values.location?.trim() || null,
            review: values.review?.trim() || null,
            rating: values.rating ?? 5,
            videoUrl: isVideo ? values.videoUrl?.trim() || null : null,
            avatarUrl: values.avatarUrl?.trim() || null,
            sortOrder: Number(values.sortOrder) || 0,
            isActive: values.isActive,
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/testimonials" className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {values.id ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <p className="text-muted-foreground text-sm">
            Video testimonials appear in the &ldquo;Client Stories&rdquo; row on the home page.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label>Type</Label>
              <div className="flex gap-2">
                {["VIDEO", "GOOGLE"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set({ type: t })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      values.type === t
                        ? "bg-terracotta-50 text-terracotta-600 border-terracotta-200"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {t === "VIDEO" ? "Video Story" : "Google Review"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{isVideo ? "Title / client name" : "Client name"}</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => set({ name: e.target.value })}
                  placeholder={isVideo ? "Bedroom Renovation Before vs After" : "Client name"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={values.location ?? ""}
                  onChange={(e) => set({ location: e.target.value })}
                  placeholder="Hyderabad"
                />
              </div>
            </div>

            {isVideo && (
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={values.videoUrl ?? ""}
                  onChange={(e) => set({ videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/shorts/..."
                />
                <p className="text-xs text-muted-foreground">
                  YouTube Short, YouTube video, Instagram Reel, or a direct .mp4/.webm/.mov file
                  link. The thumbnail is pulled from the video automatically (YouTube only —
                  set the thumbnail field above for Instagram or self-hosted files).
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="review">{isVideo ? "Card quote" : "Review text"}</Label>
              <Textarea
                id="review"
                rows={3}
                value={values.review ?? ""}
                onChange={(e) => set({ review: e.target.value })}
                placeholder={isVideo ? "One line shown on the story card." : "The review text."}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <select
                  id="rating"
                  value={values.rating ?? 5}
                  onChange={(e) => set({ rating: Number(e.target.value) })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={values.sortOrder}
                  onChange={(e) => set({ sortOrder: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Thumbnail override</Label>
                <Input
                  id="avatarUrl"
                  value={values.avatarUrl ?? ""}
                  onChange={(e) => set({ avatarUrl: e.target.value })}
                  placeholder="Optional image URL"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => set({ isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              Active (visible on the site)
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={saving} className="bg-terracotta-500 hover:bg-terracotta-600">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {values.id ? "Save changes" : "Create testimonial"}
              </Button>
              <Link href="/admin/testimonials">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
