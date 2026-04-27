import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Users, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getStats() {
  const [pagesCount, postsCount, mediaCount, usersCount] = await Promise.all([
    prisma.page.count(),
    prisma.post.count(),
    prisma.media.count(),
    prisma.user.count(),
  ]);

  return {
    pages: pagesCount,
    posts: postsCount,
    media: mediaCount,
    users: usersCount,
  };
}

async function getRecentPages() {
  return prisma.page.findMany({
    take: 5,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      updatedAt: true,
    },
  });
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentPages = await getRecentPages();

  const statCards = [
    {
      title: "Total Pages",
      value: stats.pages,
      icon: FileText,
      href: "/admin/pages",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Blog Posts",
      value: stats.posts,
      icon: Eye,
      href: "/admin/posts",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: Image,
      href: "/admin/media",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Users",
      value: stats.users,
      icon: Users,
      href: "/admin/users",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your site.
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600">
            Create New Page
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {recentPages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pages yet. Create your first page to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{page.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      /{page.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        page.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {page.status}
                    </span>
                    <Link href={`/admin/pages/${page.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/pages/new">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create New Page
              </Button>
            </Link>
            <Link href="/admin/media">
              <Button variant="outline" className="w-full justify-start">
                <Image className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0 font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Create Your First Page</h4>
                  <p className="text-sm text-muted-foreground">
                    Start by creating a homepage or any other page for your
                    website.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0 font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Add Content Blocks</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the page builder to add hero sections, features, and
                    more.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0 font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Publish Your Site</h4>
                  <p className="text-sm text-muted-foreground">
                    Once you&apos;re happy with your content, publish your pages
                    to make them live.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
