import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOrCreateAboutPage, updatePageSections } from "@/lib/cms-page";

// GET /api/pages/about - Get or create about page
export async function GET() {
  try {
    const page = await getOrCreateAboutPage();
    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching about page:", error);
    return NextResponse.json(
      { error: "Failed to fetch about page" },
      { status: 500 }
    );
  }
}

// PUT /api/pages/about - Update about page sections
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sections, title, status, seo } = body;

    const page = await getOrCreateAboutPage();

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      await updatePageSections(page.id, sections);
    }

    // Return updated page
    const updatedPage = await getOrCreateAboutPage();
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating about page:", error);
    return NextResponse.json(
      { error: "Failed to update about page" },
      { status: 500 }
    );
  }
}
