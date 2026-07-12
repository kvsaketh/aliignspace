import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET /api/services - List all services (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get("isActive");

    const services = await prisma.service.findMany({
      where: isActive !== null ? { isActive: isActive === "true" } : undefined,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services - Create new service (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: providedSlug,
      description,
      shortDesc,
      icon,
      image,
      heroImage,
      features,
      processSteps,
      stats,
      gallery,
      sortOrder,
      isActive,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    let slug = providedSlug || generateSlug(title);
    if (!providedSlug) {
      const base = slug;
      let i = 1;
      while (await prisma.service.findUnique({ where: { slug } })) {
        slug = `${base}-${i++}`;
      }
    } else {
      const existing = await prisma.service.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        shortDesc: shortDesc ?? null,
        icon: icon ?? null,
        image: image ?? null,
        heroImage: heroImage ?? null,
        features: features ?? null,
        processSteps: processSteps ?? null,
        stats: stats ?? null,
        gallery: gallery ?? null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// DELETE /api/services - Bulk delete by IDs (auth required)
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

    const result = await prisma.service.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, deleted: result.count });
  } catch (error) {
    console.error("Error deleting services:", error);
    return NextResponse.json(
      { error: "Failed to delete services" },
      { status: 500 }
    );
  }
}
