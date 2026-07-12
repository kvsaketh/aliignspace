import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const posts = await prisma.post.findMany({
    where: status ? { status: status as any } : undefined,
    include: { author: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
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
