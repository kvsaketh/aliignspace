import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sourceLabel } from "@/lib/leads";

// CSV download of every lead, for Excel or bulk import into any CRM. Admin login required.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  const header = ["Date (IST)", "Name", "Phone", "Email", "City", "Project / floor plan", "Budget", "Message", "Source", "Lead ID"];
  // Quote every cell; neutralise leading =,+,-,@ so spreadsheet apps don't run them as formulas.
  const cell = (v: string | null | undefined) => {
    const s = (v ?? "").replace(/"/g, '""');
    return `"${/^[=+\-@]/.test(s) ? `'${s}` : s}"`;
  };
  const lines = rows.map((r) =>
    [
      r.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      r.name,
      r.phone,
      r.email,
      r.city,
      r.projectType,
      r.budget,
      r.message,
      sourceLabel(r.source),
      r.id,
    ]
      .map(cell)
      .join(","),
  );
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="aliignspace-leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
