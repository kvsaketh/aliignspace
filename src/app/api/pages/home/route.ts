import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateHomePage, updatePageSections } from "@/lib/cms-page";

// GET /api/pages/home - Get or create home page
export async function GET() {
  try {
    // Anonymous GETs must not create; only logged-in users trigger get-or-create
    const session = await getServerSession(authOptions);
    if (!session) {
      const existing = await prisma.page.findUnique({
        where: { slug: "home" },
        include: { sections: { orderBy: { order: "asc" } }, seo: true },
      });
      if (!existing || existing.status !== "PUBLISHED") {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
      return NextResponse.json(existing);
    }
    const page = await getOrCreateHomePage();
    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching home page:", error);
    return NextResponse.json(
      { error: "Failed to fetch home page" },
      { status: 500 }
    );
  }
}

// PUT /api/pages/home - Update home page sections
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sections } = body;

    const page = await getOrCreateHomePage();

    if (!page) {
      return NextResponse.json(
        { error: "Failed to get or create home page" },
        { status: 500 }
      );
    }

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      await updatePageSections(page.id, sections);
    }

    // Return updated page
    const updatedPage = await getOrCreateHomePage();
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating home page:", error);
    return NextResponse.json(
      { error: "Failed to update home page" },
      { status: 500 }
    );
  }
}

// POST alias for PUT
export async function POST(request: NextRequest) {
  return PUT(request);
}
