import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SystemAdminPage() {
  const [pages, posts, portfolio, media, users, menus] = await Promise.all([
    prisma.page.count(),
    prisma.post.count(),
    prisma.portfolioProject.count(),
    prisma.media.count(),
    prisma.user.count(),
    prisma.menu.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System</h2>
        <p className="text-muted-foreground">Database stats and environment information.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Database Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Pages", value: pages },
              { label: "Blog Posts", value: posts },
              { label: "Portfolio Projects", value: portfolio },
              { label: "Media Files", value: media },
              { label: "Users", value: users },
              { label: "Menus", value: menus },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-1 border-b last:border-0 text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-bold">{row.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Environment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Node.js", value: process.version },
              { label: "Environment", value: process.env.NODE_ENV ?? "development" },
              { label: "App URL", value: process.env.APP_URL ?? "localhost:3001" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-1 border-b last:border-0 text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-mono text-xs font-medium">{row.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
