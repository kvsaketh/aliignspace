"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export interface MilestoneFormValues {
  id?: string;
  number: string;
  suffix: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY: MilestoneFormValues = {
  number: "",
  suffix: "",
  label: "",
  sortOrder: 0,
  isActive: true,
};

export function MilestoneForm({ initial }: { initial?: MilestoneFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<MilestoneFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<MilestoneFormValues>) => setValues((v) => ({ ...v, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!values.number.trim() || !values.label.trim()) {
      setError("Number and label are both required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(values.id ? `/api/milestones/${values.id}` : "/api/milestones", {
        method: values.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: values.number.trim(),
          suffix: values.suffix.trim() || null,
          label: values.label.trim(),
          sortOrder: Number(values.sortOrder) || 0,
          isActive: values.isActive,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Save failed (${res.status})`);
      }
      router.push("/admin/milestones");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/milestones" className="p-1.5 rounded hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {values.id ? "Edit Milestone" : "Add Milestone"}
          </h2>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  value={values.number}
                  onChange={(e) => set({ number: e.target.value })}
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  value={values.suffix}
                  onChange={(e) => set({ suffix: e.target.value })}
                  placeholder="+"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={values.label}
                onChange={(e) => set({ label: e.target.value })}
                placeholder="Projects Delivered"
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
                {values.id ? "Save Changes" : "Create Milestone"}
              </Button>
              <Link href="/admin/milestones">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
