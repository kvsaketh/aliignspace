import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { deliverLead } from "@/lib/leads";

// Leads are saved here first, then fanned out (email, WhatsApp, CRM webhooks) by deliverLead after the
// response is sent, so a slow or failing channel never loses a lead or delays the visitor.

// shortcut: per-instance memory, so the limit is approximate across serverless instances; move to a
// shared store (e.g. Upstash/Vercel KV) if bot traffic gets past it.
const RECENT = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (RECENT.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RECENT.set(ip, hits);
  return hits.length > LIMIT;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: the hidden "website" field is invisible to people, so anything in it is a bot.
  // Pretend success so bots don't retry.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests — please call us instead." }, { status: 429 });
  }

  const name = text(body.name, 120);
  const phone = text(body.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");
  if (!name || phoneDigits.length < 10 || phoneDigits.length > 15) {
    return NextResponse.json({ error: "Please enter your name and a valid phone number" }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      name,
      phone,
      email: text(body.email, 200) || null,
      city: text(body.city, 120) || null,
      projectType: text(body.projectType, 120) || null,
      budget: text(body.budget, 120) || null,
      message: text(body.message, 4000) || null,
      source: text(body.source, 80) || "contact_form",
    },
  });

  after(() => deliverLead(submission));

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
