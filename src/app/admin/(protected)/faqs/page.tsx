import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

async function deleteFAQ(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.fAQ.delete({ where: { id } });
  redirect("/admin/faqs");
}

function truncate(text: string | null, maxLength: number) {
  if (!text) return "—";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default async function FAQsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const searchQuery = typeof params.search === "string" ? params.search : "";

  const where: any = {};
  if (searchQuery) {
    where.OR = [
      { question: { contains: searchQuery, mode: "insensitive" } },
      { answer: { contains: searchQuery, mode: "insensitive" } },
      { category: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  const faqs = await prisma.fAQ.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  const activeCount = faqs.filter((f) => f.isActive).length;
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FAQs</h2>
          <p className="text-muted-foreground">Manage frequently asked questions.</p>
        </div>
        <Link href="/admin/faqs/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: faqs.length, color: "text-blue-600" },
          { label: "Active", value: activeCount, color: "text-green-600" },
          { label: "Categories", value: categories.length, color: "text-purple-600" },
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
            placeholder="Search FAQs..."
            defaultValue={searchQuery}
            className="pl-9"
          />
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All FAQs ({faqs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {faqs.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No FAQs found.{" "}
              <Link href="/admin/faqs/new" className="text-terracotta-500 hover:underline">
                Add your first FAQ.
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Question</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Sort Order</th>
                    <th className="px-4 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {faqs.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900 max-w-xs">
                        {truncate(f.question, 60)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {f.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={f.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {f.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{f.sortOrder}</td>
                      <td className="px-4 py-3 pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/faqs/${f.id}/edit`}>
                            <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                          <form action={deleteFAQ}>
                            <input type="hidden" name="id" value={f.id} />
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
