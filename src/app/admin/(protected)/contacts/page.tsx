import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sourceLabel } from "@/lib/leads";

function timeAgo(date: Date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default async function ContactsAdminPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Every enquiry from the website and ads pages ({submissions.length} total). New leads are also sent to
            the configured email, WhatsApp and CRM channels.
          </p>
        </div>
        {/* Plain <a>: a file download, not a page. */}
        <a
          href="/api/contact/export"
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Download CSV
        </a>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No submissions yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{s.name}</span>
                    <Badge variant="outline">{sourceLabel(s.source)}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{timeAgo(s.createdAt)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  +91 {s.phone}
                  {s.email ? ` · ${s.email}` : ""}
                  {s.city ? ` · ${s.city}` : ""}
                </div>
                {(s.projectType || s.budget) && (
                  <div className="text-sm text-muted-foreground">
                    {s.projectType || "-"} · {s.budget || "-"}
                  </div>
                )}
                {s.message && <p className="text-sm mt-1">{s.message}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
