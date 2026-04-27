import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/portfolio/[id] - Get single portfolio project by ID or slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by slug
    let project = await prisma.portfolioProject.findUnique({ where: { id } });
    if (!project) {
      project = await prisma.portfolioProject.findUnique({ where: { slug: id } });
    }

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching portfolio project:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio project" },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - Update project with all fields including new ones (auth required)
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
    const {
      title,
      slug,
      category,
      location,
      description,
      image,
      images,
      videoUrl,
      videoType,
      mainVideoUrl,
      mainVideoType,
      galleryImages,
      clientName,
      projectType,
      budget,
      area,
      featured,
      status,
      sortOrder,
    } = body;

    // If slug is being changed, check for uniqueness
    if (slug) {
      const existing = await prisma.portfolioProject.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    const project = await prisma.portfolioProject.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(category !== undefined && { category }),
        ...(location !== undefined && { location }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(images !== undefined && { images }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(videoType !== undefined && { videoType }),
        ...(mainVideoUrl !== undefined && { mainVideoUrl }),
        ...(mainVideoType !== undefined && { mainVideoType }),
        ...(galleryImages !== undefined && { galleryImages }),
        ...(clientName !== undefined && { clientName }),
        ...(projectType !== undefined && { projectType }),
        ...(budget !== undefined && { budget }),
        ...(area !== undefined && { area }),
        ...(featured !== undefined && { featured }),
        ...(status !== undefined && { status }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating portfolio project:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio project" },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - Delete project (auth required)
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
    await prisma.portfolioProject.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio project" },
      { status: 500 }
    );
  }
}
