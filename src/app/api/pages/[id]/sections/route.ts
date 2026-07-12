import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reorderSections, syncPageToCMS } from "@/lib/page-sync";

// PUT /api/pages/[id]/sections/reorder - Reorder sections
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sectionIds, sections } = body;

    // Check if page exists
    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Handle full sections update (sync)
    if (sections && Array.isArray(sections)) {
      const updatedPage = await syncPageToCMS(id, sections);
      return NextResponse.json(updatedPage);
    }

    // Handle simple reorder (just IDs)
    if (sectionIds && Array.isArray(sectionIds)) {
      const updatedSections = await reorderSections(id, sectionIds);
      return NextResponse.json(updatedSections);
    }

    return NextResponse.json(
      { error: "Invalid request. Provide either 'sections' or 'sectionIds'" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error updating sections:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}

// GET /api/pages/[id]/sections - Get all sections for a page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sections = await prisma.section.findMany({
      where: { pageId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}
