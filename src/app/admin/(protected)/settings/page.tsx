import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoryEditor } from "@/components/admin/StoryEditor";

export default async function SettingsAdminPage() {
  const blocks = await prisma.globalBlock.findMany({ orderBy: { type: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Global Settings</h2>
        <p className="text-muted-foreground">Header, footer, homepage sections, and site-wide configuration blocks.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Site Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Site Name", value: "ALIIGNSPACE" },
              { label: "Tagline", value: "Interior Design Studio" },
              { label: "Location", value: "Hyderabad & Nellore" },
              { label: "Phone", value: "+91 90304 44503" },
              { label: "Email", value: "hello@aliignspace.com" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-1 border-b last:border-0 text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Global Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            {blocks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No global blocks configured.</p>
            ) : (
              <div className="space-y-2">
                {blocks.map((block) => (
                  <div key={block.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                    <span className="font-medium">{block.name}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{block.type}</Badge>
                      <Badge variant={block.isActive ? "success" : "warning" as never}>
                        {block.isActive ? "Active" : "Off"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Story Section Editor */}
      <StoryEditor />
    </div>
  );
}
