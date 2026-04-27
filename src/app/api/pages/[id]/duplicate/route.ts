import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// POST /api/pages/[id]/duplicate - Duplicate page with all sections
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authorId = (session.user as any).id;

    const body = await request.json();
    const { 
      newTitle,
      newSlug: customSlug,
      status = "DRAFT",
    } = body;

    // Fetch the original page with all sections and SEO
    const originalPage = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        seo: true,
      },
    });

    if (!originalPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Generate new title and slug
    const title = newTitle || `${originalPage.title} (Copy)`;
    const baseSlug = customSlug || slugify(title);
    
    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.page.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Duplicate SEO if exists
    let seoId = null;
    if (originalPage.seo) {
      const duplicatedSeo = await prisma.sEO.create({
        data: {
          metaTitle: originalPage.seo.metaTitle,
          metaDescription: originalPage.seo.metaDescription,
          ogImage: originalPage.seo.ogImage,
          canonicalUrl: originalPage.seo.canonicalUrl,
          noIndex: originalPage.seo.noIndex,
          schema: originalPage.seo.schema as any,
        },
      });
      seoId = duplicatedSeo.id;
    }

    // Create new page with duplicated sections in a transaction
    const duplicatedPage = await prisma.$transaction(async (tx) => {
      const newPage = await tx.page.create({
        data: {
          title,
          slug,
          status,
          authorId,
          seoId,
        },
      });

      // Duplicate all sections
      if (originalPage.sections.length > 0) {
        await tx.section.createMany({
          data: originalPage.sections.map((section) => ({
            pageId: newPage.id,
            type: section.type,
            order: section.order,
            props: section.props || {},
          })),
        });
      }

      return newPage;
    });

    // Fetch the complete duplicated page
    const completePage = await prisma.page.findUnique({
      where: { id: duplicatedPage.id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        seo: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { sections: true },
        },
      },
    });

    return NextResponse.json(completePage, { status: 201 });
  } catch (error) {
    console.error("Error duplicating page:", error);
    return NextResponse.json(
      { error: "Failed to duplicate page" },
      { status: 500 }
    );
  }
}
