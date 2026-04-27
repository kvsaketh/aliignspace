import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/timeline - List all timeline events (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");

    const events = await prisma.timelineEvent.findMany({
      where: isActive !== null ? { isActive: isActive === "true" } : undefined,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching timeline events:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline events" },
      { status: 500 }
    );
  }
}

// POST /api/timeline - Create new timeline event (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { date, title, description, sortOrder, isActive } = body;

    if (!date || !title) {
      return NextResponse.json(
        { error: "Date and title are required" },
        { status: 400 }
      );
    }

    const event = await prisma.timelineEvent.create({
      data: {
        date,
        title,
        description: description ?? null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating timeline event:", error);
    return NextResponse.json(
      { error: "Failed to create timeline event" },
      { status: 500 }
    );
  }
}

// DELETE /api/timeline - Bulk delete by IDs (auth required)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No IDs provided" },
        { status: 400 }
      );
    }

    const result = await prisma.timelineEvent.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, deleted: result.count });
  } catch (error) {
    console.error("Error deleting timeline events:", error);
    return NextResponse.json(
      { error: "Failed to delete timeline events" },
      { status: 500 }
    );
  }
}
