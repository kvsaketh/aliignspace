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

export interface PostFormValues {
  id?: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  html: string;
  status: "DRAFT" | "PUBLISHED";
}

const EMPTY: PostFormValues = {
  title: "",
  excerpt: "",
  featuredImage: "",
  html: "",
  status: "DRAFT",
};

export function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<PostFormValues>) => setValues((v) => ({ ...v, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(values.id ? `/api/posts/${values.id}` : "/api/posts", {
        method: values.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title.trim(),
          excerpt: values.excerpt.trim() || null,
          featuredImage: values.featuredImage.trim() || null,
          content: { html: values.html },
          status: values.status,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts" className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {values.id ? "Edit Post" : "New Post"}
          </h2>
          <p className="text-muted-foreground text-sm">Published posts appear at /blog.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(e) => set({ title: e.target.value })}
                placeholder="5 Tips for a Modular Kitchen That Lasts"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={values.excerpt}
                onChange={(e) => set({ excerpt: e.target.value })}
                placeholder="Short summary shown on the blog list page"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured image URL</Label>
              <Input
                id="featuredImage"
                value={values.featuredImage}
                onChange={(e) => set({ featuredImage: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="html">Content (HTML)</Label>
              <Textarea
                id="html"
                value={values.html}
                onChange={(e) => set({ html: e.target.value })}
                placeholder="<p>Write the post body here. Basic HTML tags are supported.</p>"
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set({ status: s })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      values.status === s
                        ? "bg-terracotta-50 text-terracotta-600 border-terracotta-200"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {s === "DRAFT" ? "Draft" : "Published"}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving} className="bg-terracotta-500 hover:bg-terracotta-600">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {values.id ? "Save Changes" : "Create Post"}
              </Button>
              <Link href="/admin/posts">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
