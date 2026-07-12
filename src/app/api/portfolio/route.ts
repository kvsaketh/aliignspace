import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const projects = await prisma.portfolioProject.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, category, image, featured, status } = body;

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
