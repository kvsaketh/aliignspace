import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";

async function deleteTimelineEvent(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.timelineEvent.delete({ where: { id } });
  redirect("/admin/timeline");
}

function truncate(text: string | null, maxLength: number) {
  if (!text) return "—";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default async function TimelineAdminPage() {
  const events = await prisma.timelineEvent.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const activeCount = events.filter((e) => e.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Timeline</h2>
          <p className="text-muted-foreground">Manage company timeline events.</p>
        </div>
        <Link href="/admin/timeline/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {[
          { label: "Total Events", value: events.length, color: "text-blue-600" },
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
          <CardTitle className="text-base">All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {events.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No events found.{" "}
              <Link href="/admin/timeline/new" className="text-terracotta-500 hover:underline">
                Add your first event.
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Sort Order</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {events.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{e.date}</td>
                      <td className="px-4 py-3 text-gray-900">{e.title}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs">
                        {truncate(e.description, 60)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={e.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {e.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{e.sortOrder}</td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/timeline/${e.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                          <form action={deleteTimelineEvent}>
                            <input type="hidden" name="id" value={e.id} />
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
