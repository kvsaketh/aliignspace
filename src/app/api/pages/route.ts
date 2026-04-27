import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// Default section templates for new pages
const defaultSections = [
  {
    type: "hero",
    order: 0,
    props: {
      heading: "Welcome to Our Site",
      subheading: "Discover amazing spaces crafted with trust",
      buttonText: "Get Started",
      buttonUrl: "#contact",
      overlay: true,
    },
  },
  {
    type: "content",
    order: 1,
    props: {
      content: "<p>Start editing this page to add your content.</p>",
      alignment: "left",
    },
  },
];

// GET /api/pages - List all pages with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const where: any = {};

    // Apply status filter
    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    // Apply search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const pages = await prisma.page.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
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

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

// POST /api/pages - Create new page with default sections
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authorId = (session.user as any).id;

    const body = await request.json();
    const { 
      title, 
      slug: customSlug, 
      status = "DRAFT", 
      seo, 
      template = "default",
      sections: customSections 
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: "A page with this slug already exists" },
        { status: 409 }
      );
    }

    // Create SEO if provided
    let seoId = null;
    if (seo) {
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

    // Determine sections based on template
    let sectionsToCreate = customSections;
    if (!sectionsToCreate) {
      switch (template) {
        case "blank":
          sectionsToCreate = [];
          break;
        case "about":
          sectionsToCreate = [
            {
              type: "about_hero",
              order: 0,
              props: {
                heading: "About Us",
                subheading: "Learn more about our story",
              },
            },
            {
              type: "about_story",
              order: 1,
              props: {
                label: "Our Story",
                heading: "Where trust becomes the foundation",
                content: "<p>Your story begins here.</p>",
                imagePosition: "left",
              },
            },
          ];
          break;
        case "landing":
          sectionsToCreate = [
            {
              type: "hero",
              order: 0,
              props: {
                heading: "Welcome",
                subheading: "Your journey starts here",
                buttonText: "Get Started",
                buttonUrl: "#contact",
              },
            },
            {
              type: "features",
              order: 1,
              props: {
                title: "Our Features",
                features: [],
              },
            },
            {
              type: "cta",
              order: 2,
              props: {
                heading: "Ready to get started?",
                buttonText: "Contact Us",
                buttonUrl: "/contact",
              },
            },
          ];
          break;
        default:
          sectionsToCreate = defaultSections;
      }
    }

    // Create page with sections in a transaction
    const page = await prisma.$transaction(async (tx) => {
      const newPage = await tx.page.create({
        data: {
          title,
          slug,
          status,
          authorId,
          seoId,
        },
        include: {
          seo: true,
        },
      });

      // Create sections
      if (sectionsToCreate && sectionsToCreate.length > 0) {
        await tx.section.createMany({
          data: sectionsToCreate.map((section: any, index: number) => ({
            pageId: newPage.id,
            type: section.type,
            order: section.order ?? index,
            props: section.props || {},
          })),
        });
      }

      return newPage;
    });

    // Fetch the complete page with sections
    const completePage = await prisma.page.findUnique({
      where: { id: page.id },
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
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
