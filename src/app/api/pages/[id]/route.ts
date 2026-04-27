import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// GET /api/pages/[id] - Get a single page with sections
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({
      where: { id },
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
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

// PUT /api/pages/[id] - Update page with full section sync
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

    const authorId = (session.user as any).id;

    const body = await request.json();
    const { title, slug: customSlug, status, seo, sections, settings } = body;

    const existingPage = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: true,
      },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Handle slug update
    let slug = existingPage.slug;
    if (customSlug && customSlug !== existingPage.slug) {
      slug = customSlug;
      const slugExists = await prisma.page.findUnique({
        where: { slug },
      });
      if (slugExists && slugExists.id !== id) {
        return NextResponse.json(
          { error: "A page with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update or create SEO
    let seoId = existingPage.seoId;
    if (seo) {
      if (seoId) {
        await prisma.sEO.update({
          where: { id: seoId },
          data: {
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription,
            ogImage: seo.ogImage,
            canonicalUrl: seo.canonicalUrl,
            noIndex: seo.noIndex,
            schema: seo.schema,
          },
        });
      } else {
        const createdSeo = await prisma.sEO.create({
          data: {
            metaTitle: seo.metaTitle,
            metaDescription: seo.metaDescription,
            ogImage: seo.ogImage,
            canonicalUrl: seo.canonicalUrl,
            noIndex: seo.noIndex || false,
            schema: seo.schema,
          },
        });
        seoId = createdSeo.id;
      }
    }

    // Update sections if provided - full sync strategy
    if (sections && Array.isArray(sections)) {
      await prisma.$transaction(async (tx) => {
        // Delete sections that are no longer present
        const incomingIds = sections
          .filter((s) => s.id && !s.id.startsWith("temp-"))
          .map((s) => s.id);
        
        await tx.section.deleteMany({
          where: {
            pageId: id,
            NOT: {
              id: {
                in: incomingIds.length > 0 ? incomingIds : undefined,
              },
            },
          },
        });

        // Upsert sections
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionData = {
            pageId: id,
            type: section.type,
            order: i,
            props: section.props || {},
          };

          if (section.id && !section.id.startsWith("temp-")) {
            // Update existing section
            await tx.section.update({
              where: { id: section.id },
              data: sectionData,
            });
          } else {
            // Create new section
            await tx.section.create({
              data: sectionData,
            });
          }
        }
      });
    }

    // Create page version for history
    await prisma.pageVersion.create({
      data: {
        pageId: id,
        snapshot: {
          title: existingPage.title,
          slug: existingPage.slug,
          status: existingPage.status,
          sections: sections || existingPage.sections,
          settings: settings || {},
        },
        authorId,
      },
    });

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        title: title ?? existingPage.title,
        slug,
        status: status ?? existingPage.status,
        seoId,
      },
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
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
