import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const user = await getSessionUser();

    // Anonymous callers only see published posts; drafts require a session.
    const where = user
      ? status
        ? { status: status as any }
        : undefined
      : { status: "PUBLISHED" as const };

    const posts = await prisma.post.findMany({
      where,
      // Public responses expose author name only, never staff email.
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, content, excerpt, status } = body;

  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  let slug = base;
  let i = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content: content ?? {},
      excerpt: excerpt ?? null,
      status: status ?? "DRAFT",
      authorId: (session.user as any).id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
