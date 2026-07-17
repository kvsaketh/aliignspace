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

export interface TimelineFormValues {
  id?: string;
  date: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY: TimelineFormValues = {
  date: "",
  title: "",
  description: "",
  sortOrder: 0,
  isActive: true,
};

export function TimelineForm({ initial }: { initial?: TimelineFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<TimelineFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<TimelineFormValues>) => setValues((v) => ({ ...v, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.date.trim() || !values.title.trim()) {
      setError("Date and title are both required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(values.id ? `/api/timeline/${values.id}` : "/api/timeline", {
        method: values.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: values.date.trim(),
          title: values.title.trim(),
          description: values.description.trim() || null,
          sortOrder: Number(values.sortOrder) || 0,
          isActive: values.isActive,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      router.push("/admin/timeline");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/timeline" className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {values.id ? "Edit Timeline Event" : "Add Timeline Event"}
          </h2>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={values.date}
                onChange={(e) => set({ date: e.target.value })}
                placeholder="Nov 2019"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(e) => set({ title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) => set({ description: e.target.value })}
                rows={3}
              />
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
                {values.id ? "Save Changes" : "Create Event"}
              </Button>
              <Link href="/admin/timeline">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
