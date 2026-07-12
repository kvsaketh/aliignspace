import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const milestones = await prisma.milestone.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error("GET /api/milestones error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { number, suffix, label, sortOrder, isActive } = body;

    const milestone = await prisma.milestone.create({
      data: {
        number,
        suffix: suffix ?? null,
        label,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(milestone, { status: 201 });
  } catch (error) {
    console.error("POST /api/milestones error:", error);
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

    const result = await prisma.milestone.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("DELETE /api/milestones error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
