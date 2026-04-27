import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";

async function deleteMilestone(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.milestone.delete({ where: { id } });
  redirect("/admin/milestones");
}

export default async function MilestonesAdminPage() {
  const milestones = await prisma.milestone.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const activeCount = milestones.filter((m) => m.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Milestones</h2>
          <p className="text-muted-foreground">Manage key business milestones and stats.</p>
        </div>
        <Link href="/admin/milestones/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {[
          { label: "Total", value: milestones.length, color: "text-blue-600" },
          { label: "Active", value: activeCount, color: "text-green-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Milestones ({milestones.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {milestones.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No milestones found.{" "}
              <Link href="/admin/milestones/new" className="text-terracotta-500 hover:underline">
                Add your first milestone.
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Number</th>
                    <th className="px-4 py-3 text-left">Suffix</th>
                    <th className="px-4 py-3 text-left">Label</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Sort Order</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {milestones.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{m.number}</td>
                      <td className="px-4 py-3 text-gray-600">{m.suffix ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-900">{m.label}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={m.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {m.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{m.sortOrder}</td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/milestones/${m.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                          <form action={deleteMilestone}>
                            <input type="hidden" name="id" value={m.id} />
                            <button
                              type="submit"
                              className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
