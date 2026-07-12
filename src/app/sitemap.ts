import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/process",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const [services, projects] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.portfolioProject.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...staticRoutes,
      ...services.map((s) => ({
        url: `${BASE_URL}/services/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...projects.map((p) => ({
        url: `${BASE_URL}/portfolio/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // DB unavailable: still serve the static routes
    return staticRoutes;
  }
}
