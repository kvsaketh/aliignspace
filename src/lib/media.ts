import { prisma } from "./prisma";

export interface MediaWithUsage {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  filename: string;
  alt: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  folder: string;
  caption: string | null;
  createdAt: Date;
  usage: {
    pages: { id: string; title: string }[];
    posts: { id: string; title: string }[];
    portfolio: { id: string; title: string }[];
    seo: { id: string; metaTitle: string | null }[];
    widgets: { id: string; type: string }[];
    total: number;
  };
}

export const mediaFolders = [
  "uncategorized",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Lifestyle",
  "Team",
  "Materials",
  "Styles",
  "Renders",
];

export async function getMediaWithUsage(): Promise<MediaWithUsage[]> {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Get all pages, posts, portfolio projects, SEO records, and widgets to check for media usage
  const [pages, posts, portfolio, seoRecords, widgets] = await Promise.all([
    prisma.page.findMany({
      include: { seo: true },
    }),
    prisma.post.findMany({
      include: { seo: true },
    }),
    prisma.portfolioProject.findMany(),
    prisma.sEO.findMany(),
    prisma.widget.findMany(),
  ]);

  return media.map((file) => {
    const usage = {
      pages: [] as { id: string; title: string }[],
      posts: [] as { id: string; title: string }[],
      portfolio: [] as { id: string; title: string }[],
      seo: [] as { id: string; metaTitle: string | null }[],
      widgets: [] as { id: string; type: string }[],
      total: 0,
    };

    // Check pages for media usage
    pages.forEach((page) => {
      const pageStr = JSON.stringify(page);
      if (pageStr.includes(file.url) || pageStr.includes(file.id)) {
        usage.pages.push({ id: page.id, title: page.title });
      }
    });

    // Check posts for media usage
    posts.forEach((post) => {
      const postStr = JSON.stringify(post);
      if (
        postStr.includes(file.url) ||
        postStr.includes(file.id) ||
        post.featuredImage === file.url
      ) {
        usage.posts.push({ id: post.id, title: post.title });
      }
    });

    // Check portfolio for media usage
    portfolio.forEach((project) => {
      const projectStr = JSON.stringify(project);
      if (
        projectStr.includes(file.url) ||
        projectStr.includes(file.id) ||
        project.image === file.url
      ) {
        usage.portfolio.push({ id: project.id, title: project.title });
      }
    });

    // Check SEO records for media usage
    seoRecords.forEach((seo) => {
      if (seo.ogImage === file.url) {
        usage.seo.push({ id: seo.id, metaTitle: seo.metaTitle });
      }
    });

    // Check widgets for mediaId references
    widgets.forEach((widget) => {
      const widgetStr = JSON.stringify(widget.content);
      if (widgetStr.includes(file.id)) {
        usage.widgets.push({ id: widget.id, type: widget.type });
      }
    });

    usage.total =
      usage.pages.length +
      usage.posts.length +
      usage.portfolio.length +
      usage.seo.length +
      usage.widgets.length;

    return {
      ...file,
      usage,
    };
  });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function isVideoFile(mimeType: string): boolean {
  return mimeType.startsWith("video/");
}

export function getMediaTypeLabel(mimeType: string): string {
  if (isImageFile(mimeType)) return "Image";
  if (isVideoFile(mimeType)) return "Video";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("audio")) return "Audio";
  return "File";
}

export async function deleteMedia(id: string): Promise<void> {
  await prisma.media.delete({
    where: { id },
  });
}

export async function updateMedia(
  id: string,
  data: { alt?: string; filename?: string }
): Promise<void> {
  await prisma.media.update({
    where: { id },
    data,
  });
}
