import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Search, Star } from "lucide-react";

async function deleteTestimonial(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  redirect("/admin/testimonials");
}

export default async function TestimonialsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const typeFilter = typeof params.type === "string" ? params.type : "all";
  const searchQuery = typeof params.search === "string" ? params.search : "";

  const where: any = {};
  if (typeFilter !== "all") where.type = typeFilter;
  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { location: { contains: searchQuery, mode: "insensitive" } },
      { review: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  const googleCount = testimonials.filter((t) => t.type === "GOOGLE").length;
  const videoCount = testimonials.filter((t) => t.type === "VIDEO").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">Manage customer testimonials and reviews.</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: testimonials.length, color: "text-blue-600" },
          { label: "Google Reviews", value: googleCount, color: "text-green-600" },
          { label: "Video Testimonials", value: videoCount, color: "text-purple-600" },
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
        <div className="flex gap-2">
          {[
            { label: "All", value: "all", count: testimonials.length },
            { label: "Google Reviews", value: "GOOGLE", count: googleCount },
            { label: "Video Testimonials", value: "VIDEO", count: videoCount },
          ].map((tab) => (
            <Link
              key={tab.value}
              href={`/admin/testimonials?type=${tab.value}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === tab.value
                  ? "bg-terracotta-50 text-terracotta-600 border border-terracotta-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
            </Link>
          ))}
        </div>
        <form className="relative flex-1 max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="search"
            placeholder="Search testimonials..."
            defaultValue={searchQuery}
            className="pl-9"
          />
          {typeFilter !== "all" && (
            <input type="hidden" name="type" value={typeFilter} />
          )}
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {testimonials.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No testimonials found.{" "}
              <Link href="/admin/testimonials/new" className="text-terracotta-500 hover:underline">
                Add your first testimonial.
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Rating</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={t.type === "GOOGLE" ? "success" : "terracotta"}
                          className="text-xs"
                        >
                          {t.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < (t.rating ?? 5)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{t.location ?? "—"}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={t.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {t.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/testimonials/${t.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                          <form action={deleteTestimonial}>
                            <input type="hidden" name="id" value={t.id} />
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
