import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/timeline/[id] - Get single timeline event (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.timelineEvent.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching timeline event:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline event" },
      { status: 500 }
    );
  }
}

// PUT /api/timeline/[id] - Update timeline event (auth required)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { date, title, description, sortOrder, isActive } = body;

    const event = await prisma.timelineEvent.update({
      where: { id },
      data: {
        ...(date !== undefined && { date }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating timeline event:", error);
    return NextResponse.json(
      { error: "Failed to update timeline event" },
      { status: 500 }
    );
  }
}

// DELETE /api/timeline/[id] - Delete single timeline event (auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.timelineEvent.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting timeline event:", error);
    return NextResponse.json(
      { error: "Failed to delete timeline event" },
      { status: 500 }
    );
  }
}
