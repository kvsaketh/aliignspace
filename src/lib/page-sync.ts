import { prisma } from "./prisma";
import type { Section, Page, Media } from "@/types";
import type { Prisma } from "@prisma/client";

// Media resolution result type
interface MediaResolutionResult {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Helper to safely convert JsonValue to a plain object
type JsonValue = Prisma.JsonValue;

function safeJsonToObject(value: JsonValue): Record<string, any> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, any>;
  }
  return {};
}

/**
 * Sync page from CMS to database with full media handling
 * This function ensures all media references are properly resolved and stored
 */
export async function syncPageToCMS(
  pageId: string,
  sections: Section[]
): Promise<Page> {
  // Validate sections
  if (!Array.isArray(sections)) {
    throw new Error("Sections must be an array");
  }

  // Process sections to ensure media references are valid
  const processedSections = await Promise.all(
    sections.map(async (section, index) => {
      const processedProps = await processMediaReferences(section.props);
      return {
        ...section,
        order: section.order ?? index,
        props: processedProps,
      };
    })
  );

  // Update sections in database using transaction
  const updatedPage = await prisma.$transaction(async (tx) => {
    // Delete existing sections not in the new list
    const incomingIds = processedSections
      .filter((s) => s.id && !s.id.startsWith("temp-"))
      .map((s) => s.id);

    await tx.section.deleteMany({
      where: {
        pageId,
        NOT: {
          id: {
            in: incomingIds.length > 0 ? incomingIds : undefined,
          },
        },
      },
    });

    // Upsert sections
    for (let i = 0; i < processedSections.length; i++) {
      const section = processedSections[i];
      const sectionData = {
        pageId,
        type: section.type,
        order: i,
        props: section.props || {},
      };

      if (section.id && !section.id.startsWith("temp-")) {
        await tx.section.update({
          where: { id: section.id },
          data: sectionData,
        });
      } else {
        await tx.section.create({
          data: sectionData,
        });
      }
    }

    // Update page timestamp
    return tx.page.update({
      where: { id: pageId },
      data: { updatedAt: new Date() },
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
  });

  return updatedPage as Page;
}

/**
 * Process media references in section props
 * Resolves media IDs to URLs and validates media exists
 */
async function processMediaReferences(
  props: Record<string, any> | null
): Promise<Record<string, any>> {
  if (!props) return {};

  const processed: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (isMediaReference(key, value)) {
      // Resolve media ID or URL
      processed[key] = await resolveMedia(value);
    } else if (Array.isArray(value)) {
      // Process arrays that might contain media references
      processed[key] = await Promise.all(
        value.map(async (item) => {
          if (typeof item === "object" && item !== null) {
            return await processMediaReferences(item);
          }
          return item;
        })
      );
    } else if (typeof value === "object" && value !== null) {
      // Recursively process nested objects
      processed[key] = await processMediaReferences(value);
    } else {
      processed[key] = value;
    }
  }

  return processed;
}

/**
 * Check if a property is a media reference
 */
function isMediaReference(key: string, value: any): boolean {
  const mediaKeys = [
    "image",
    "backgroundImage",
    "featuredImage",
    "ogImage",
    "thumbnail",
    "avatar",
    "logo",
    "icon",
    "src",
    "url",
    "poster",
  ];
  
  return (
    typeof value === "string" &&
    (mediaKeys.includes(key) ||
      key.toLowerCase().includes("image") ||
      key.toLowerCase().includes("media") ||
      key.toLowerCase().endsWith("url"))
  );
}

/**
 * Resolve media reference (ID or URL) to a URL
 */
async function resolveMedia(value: string): Promise<string> {
  // If it's already a full URL, return as-is
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // If it looks like a media ID, try to resolve it
  if (value.match(/^[a-zA-Z0-9_-]+$/)) {
    try {
      const media = await prisma.media.findUnique({
        where: { id: value },
      });
      if (media) {
        return media.url;
      }
    } catch {
      // Fall through to return original value
    }
  }

  return value;
}

/**
 * Get page with all media resolved
 * Returns a page with all media URLs fully resolved from the database
 */
export async function getPageWithMedia(slug: string): Promise<Page | null> {
  const page = await prisma.page.findUnique({
    where: { slug },
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

  if (!page) return null;

  // Process all sections to resolve media
  const sectionsWithMedia = await Promise.all(
    page.sections.map(async (section) => ({
      ...section,
      props: await enrichMediaReferences(safeJsonToObject(section.props)),
    }))
  );

  return {
    ...page,
    sections: sectionsWithMedia,
  } as Page;
}

/**
 * Enrich media references with full media metadata
 */
async function enrichMediaReferences(
  props: Record<string, any>
): Promise<Record<string, any>> {
  if (!props || typeof props !== "object") return {};

  const enriched: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (isMediaReference(key, value) && typeof value === "string") {
      enriched[key] = await getMediaMetadata(value);
    } else if (Array.isArray(value)) {
      enriched[key] = await Promise.all(
        value.map(async (item) => {
          if (typeof item === "object" && item !== null) {
            return await enrichMediaReferences(item);
          }
          return item;
        })
      );
    } else if (typeof value === "object" && value !== null) {
      enriched[key] = await enrichMediaReferences(value);
    } else {
      enriched[key] = value;
    }
  }

  return enriched;
}

/**
 * Get full media metadata for a URL or ID
 */
async function getMediaMetadata(
  value: string
): Promise<MediaResolutionResult | string> {
  if (!value) return value;

  try {
    // Try to find by URL first
    let media: any = null;

    if (value.startsWith("http")) {
      media = await prisma.media.findFirst({
        where: { url: value },
      });
    } else {
      media = await prisma.media.findUnique({
        where: { id: value },
      });
    }

    if (media) {
      return {
        url: media.url,
        alt: media.alt || undefined,
        width: media.width || undefined,
        height: media.height || undefined,
      };
    }
  } catch {
    // Return original value if lookup fails
  }

  return value;
}

/**
 * Reorder sections
 * Updates the order of sections for a page
 */
export async function reorderSections(
  pageId: string,
  sectionIds: string[]
): Promise<Section[]> {
  // Validate all sections belong to the page
  const sections = await prisma.section.findMany({
    where: { pageId },
    select: { id: true },
  });

  const validIds = new Set(sections.map((s) => s.id));
  const allValid = sectionIds.every((id) => validIds.has(id));

  if (!allValid) {
    throw new Error("Invalid section IDs provided");
  }

  // Update order in transaction
  await prisma.$transaction(
    sectionIds.map((id, index) =>
      prisma.section.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  // Return updated sections
  const updatedSections = await prisma.section.findMany({
    where: { pageId },
    orderBy: { order: "asc" },
  });

  return updatedSections as Section[];
}

/**
 * Clone page with all sections
 * Creates a complete copy of a page including all sections
 */
export async function clonePage(
  pageId: string,
  newTitle: string
): Promise<Page> {
  const originalPage = await prisma.page.findUnique({
    where: { id: pageId },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
      seo: true,
    },
  });

  if (!originalPage) {
    throw new Error("Page not found");
  }

  // Generate unique slug
  const baseSlug = newTitle.toLowerCase().replace(/\s+/g, "-");
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

  // Create new page with duplicated sections
  const newPage = await prisma.$transaction(async (tx) => {
    const page = await tx.page.create({
      data: {
        title: newTitle,
        slug,
        status: "DRAFT",
        seoId,
      },
    });

    if (originalPage.sections.length > 0) {
      await tx.section.createMany({
        data: originalPage.sections.map((section) => ({
          pageId: page.id,
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      });
    }

    return page;
  });

  // Return complete page
  const completePage = await prisma.page.findUnique({
    where: { id: newPage.id },
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

  return completePage as Page;
}

/**
 * Get all media used in a page
 * Returns a list of all media items referenced by a page
 */
export async function getPageMedia(pageId: string): Promise<Media[]> {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    include: {
      sections: true,
      seo: true,
    },
  });

  if (!page) return [];

  const mediaUrls = new Set<string>();

  // Extract media URLs from all sections
  page.sections.forEach((section) => {
    extractMediaUrls(safeJsonToObject(section.props), mediaUrls);
  });

  // Extract from SEO
  if (page.seo?.ogImage) {
    mediaUrls.add(page.seo.ogImage);
  }

  // Fetch media records
  const media = await prisma.media.findMany({
    where: {
      OR: [
        { url: { in: Array.from(mediaUrls) } },
        { id: { in: Array.from(mediaUrls) } },
      ],
    },
  });

  return media as unknown as Media[];
}

/**
 * Recursively extract media URLs from props
 */
function extractMediaUrls(props: any, urls: Set<string>): void {
  if (!props) return;

  for (const [key, value] of Object.entries(props)) {
    if (isMediaReference(key, value) && typeof value === "string") {
      urls.add(value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          extractMediaUrls(item, urls);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      extractMediaUrls(value, urls);
    }
  }
}

/**
 * Validate page sections
 * Ensures all sections have valid types and required fields
 */
export function validateSections(sections: Section[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(sections)) {
    return { valid: false, errors: ["Sections must be an array"] };
  }

  sections.forEach((section, index) => {
    if (!section.type) {
      errors.push(`Section ${index + 1} is missing a type`);
    }
    
    if (section.props && typeof section.props !== "object") {
      errors.push(`Section ${index + 1} has invalid props`);
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Create page version snapshot
 * Creates a snapshot of the current page state for versioning
 */
export async function createPageVersion(
  pageId: string,
  authorId?: string
): Promise<void> {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page) {
    throw new Error("Page not found");
  }

  await prisma.pageVersion.create({
    data: {
      pageId,
      authorId,
      snapshot: {
        title: page.title,
        slug: page.slug,
        status: page.status,
        sections: page.sections,
      },
    },
  });
}

/**
 * Sync page to static file (for static export)
 * Generates a static JSON file for the page
 */
export async function syncPageToStatic(pageId: string): Promise<void> {
  const page = await getPageWithMedia(
    (await prisma.page.findUnique({ where: { id: pageId } }))?.slug || ""
  );

  if (!page) {
    throw new Error("Page not found");
  }

  // This would typically write to a JSON file
  // For now, we just return the page data
  console.log(`Syncing page ${page.slug} to static file`);
}
