import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const isActiveParam = searchParams.get("isActive");

    const where: any = {};
    if (type) where.type = type;
    if (isActiveParam !== null) where.isActive = isActiveParam === "true";

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { type, name, location, review, rating, videoUrl, avatarUrl, sortOrder, isActive } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        type: type ?? "GOOGLE",
        name,
        location: location ?? null,
        review: review ?? null,
        rating: rating ?? 5,
        videoUrl: videoUrl ?? null,
        avatarUrl: avatarUrl ?? null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
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

    const result = await prisma.testimonial.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
