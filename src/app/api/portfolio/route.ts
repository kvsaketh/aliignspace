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

    // Anonymous callers only see published projects; drafts require a session.
    const where = user
      ? status
        ? { status: status as any }
        : undefined
      : { status: "PUBLISHED" as const };

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 200,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, category, image, featured, status } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  let slug = base;
  let i = 1;
  while (await prisma.portfolioProject.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const count = await prisma.portfolioProject.count();
  const project = await prisma.portfolioProject.create({
    data: { title, slug, category, image: image ?? "", featured: featured ?? false, status: status ?? "DRAFT", sortOrder: count },
  });

  return NextResponse.json(project, { status: 201 });
}
