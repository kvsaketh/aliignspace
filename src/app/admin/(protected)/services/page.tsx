import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

async function deleteService(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  redirect("/admin/services");
}

function truncate(text: string | null, maxLength: number) {
  if (!text) return "—";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const searchQuery = typeof params.search === "string" ? params.search : "";

  const where: any = {};
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { slug: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  const services = await prisma.service.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  const activeCount = services.filter((s) => s.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">Manage your service offerings.</p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {[
          { label: "Total Services", value: services.length, color: "text-blue-600" },
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

      <div className="flex flex-col sm:flex-row gap-4">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="search"
            placeholder="Search services..."
            defaultValue={searchQuery}
            className="pl-9"
          />
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {services.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No services found.{" "}
              <Link href="/admin/services/new" className="text-terracotta-500 hover:underline">
                Add your first service.
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Slug</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Sort Order</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
                      <td className="px-4 py-3 text-gray-600">/{s.slug}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs">
                        {truncate(s.description, 60)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={s.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {s.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{s.sortOrder}</td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/services/${s.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                          <form action={deleteService}>
                            <input type="hidden" name="id" value={s.id} />
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
