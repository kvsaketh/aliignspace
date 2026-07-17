import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

function timeAgo(date: Date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default async function NewsletterAdminPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h2>
        <p className="text-muted-foreground">
          Emails collected from the footer signup. {subscribers.length} total.
        </p>
      </div>

      {subscribers.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No subscribers yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {subscribers.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium">{s.email}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(s.createdAt)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
