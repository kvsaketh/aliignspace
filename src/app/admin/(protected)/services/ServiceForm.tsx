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

export interface ServiceFormValues {
  id?: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  image: string;
  heroImage: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY: ServiceFormValues = {
  title: "",
  slug: "",
  description: "",
  shortDesc: "",
  image: "",
  heroImage: "",
  sortOrder: 0,
  isActive: true,
};

export function ServiceForm({ initial }: { initial?: ServiceFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<ServiceFormValues>) => setValues((v) => ({ ...v, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.title.trim() || !values.slug.trim() || !values.description.trim()) {
      setError("Title, slug, and description are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(values.id ? `/api/services/${values.id}` : "/api/services", {
        method: values.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title.trim(),
          slug: values.slug.trim(),
          description: values.description.trim(),
          shortDesc: values.shortDesc.trim() || null,
          image: values.image.trim() || null,
          heroImage: values.heroImage.trim() || null,
          sortOrder: Number(values.sortOrder) || 0,
          isActive: values.isActive,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/services" className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {values.id ? "Edit Service" : "Add Service"}
          </h2>
          {values.id && (
            <p className="text-muted-foreground text-sm">
              This form covers core fields only. Rich detail-page content (process steps,
              pricing tiers, gallery) is preserved as-is and can be seeded via
              prisma/seed-services.
            </p>
          )}
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={values.slug}
                onChange={(e) => set({ slug: e.target.value })}
                placeholder="modular-kitchen"
              />
              <p className="text-xs text-muted-foreground">Used in the URL: /services/{values.slug || "..."}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDesc">Short Description (card)</Label>
              <Input
                id="shortDesc"
                value={values.shortDesc}
                onChange={(e) => set({ shortDesc: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) => set({ description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Card Image URL</Label>
                <Input
                  id="image"
                  value={values.image}
                  onChange={(e) => set({ image: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <Input
                  id="heroImage"
                  value={values.heroImage}
                  onChange={(e) => set({ heroImage: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={values.sortOrder}
                onChange={(e) => set({ sortOrder: Number(e.target.value) })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => set({ isActive: e.target.checked })}
              />
              Active (visible on the site)
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving} className="bg-terracotta-500 hover:bg-terracotta-600">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {values.id ? "Save Changes" : "Create Service"}
              </Button>
              <Link href="/admin/services">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
