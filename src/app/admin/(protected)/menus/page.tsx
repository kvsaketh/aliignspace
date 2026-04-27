import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function MenusAdminPage() {
  const menus = await prisma.menu.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menus</h2>
        <p className="text-muted-foreground">Navigation menus configured for the site.</p>
      </div>

      {menus.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            No menus seeded yet. Run <code className="bg-gray-100 px-1 rounded text-xs">npx prisma db seed</code> to create them.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {menus.map((menu) => (
            <Card key={menu.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{menu.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{menu.location}</Badge>
                    <Badge variant={menu.isActive ? "success" : "warning"}>
                      {menu.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {(menu.items as any[]).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 py-1 border-b last:border-0">
                      <span className="w-4 text-gray-400 text-xs">{i + 1}.</span>
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground text-xs">→ {item.href}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
