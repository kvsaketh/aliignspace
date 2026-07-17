import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// No email service is configured (client controls hello@aliignspace.com and
// won't provide credentials/API access), so submissions are saved here and
// read from /admin/contacts instead of being emailed out.
export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, city, projectType, budget, message, source } = body ?? {};

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: { name, phone, email, city, projectType, budget, message, source: source || "contact_form" },
  });

  return NextResponse.json({ ok: true, id: submission.id });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(submissions);
}
