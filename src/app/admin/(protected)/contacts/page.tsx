import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function timeAgo(date: Date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Contact Page",
  process_page: "Process Page",
  consultation_block: "Consultation",
};

function sourceLabel(source: string) {
  if (SOURCE_LABELS[source]) return SOURCE_LABELS[source];
  if (source.startsWith("service:")) return `Service: ${source.slice(8)}`;
  return source;
}

export default async function ContactsAdminPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
        <p className="text-muted-foreground">
          Submissions from the website contact form. There is no client email
          hookup — this list is the only place these land, so check it regularly.
        </p>
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
