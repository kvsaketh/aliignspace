import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isActiveParam = searchParams.get("isActive");

    const where: any = {};
    if (category) where.category = category;
    if (isActiveParam !== null) where.isActive = isActiveParam === "true";

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET /api/faqs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { question, answer, category, sortOrder, isActive } = body;

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category: category ?? "general",
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids array is required" }, { status: 400 });
    }

    const result = await prisma.fAQ.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("DELETE /api/faqs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
