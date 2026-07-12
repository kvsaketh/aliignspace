import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const published = posts.filter((p) => p.status === "PUBLISHED").length;
  const drafts = posts.filter((p) => p.status === "DRAFT").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: posts.length, color: "text-blue-600" },
          { label: "Published", value: published, color: "text-green-600" },
          { label: "Drafts", value: drafts, color: "text-amber-600" },
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
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No posts yet.{" "}
              <Link href="/admin/posts/new" className="text-terracotta-500 hover:underline">
                Create your first post.
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Author</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{post.title}</td>
                    <td className="px-4 py-3 text-gray-600">{post.author?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={post.status === "PUBLISHED" ? "success" : "warning"}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <button className="p-1.5 rounded hover:bg-blue-50 text-blue-500 transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
