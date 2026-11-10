import { prisma } from "@/lib/prisma";
import { ClientStories, type Story } from "@/components/blocks/client-stories";
import clips from "../../public/testimonials/manifest.json";

// Homeowner testimonials cut from the full YouTube home tours (public/testimonials).
// They ship with the site, so they take priority over the older Shorts stored in the CMS.
const CLIP_STORIES: Story[] = clips.map((c) => ({
  name: c.speaker ?? `Homeowners, ${(c.location ?? "Hyderabad").split(",")[0]}`,
  location: (c.location ?? "Hyderabad").split(",")[0],
  quote: c.quote,
  thumbnail: c.poster,
  videoUrl: c.file,
  rating: 5,
}));

/**
 * Server wrapper for the Client Stories reel row.
 * Uses the bundled testimonial clips when present; otherwise falls back to the CMS rows below.
 * Pulls VIDEO-type testimonials from the database (each `videoUrl` may be an
 * Instagram Reel or a YouTube Short link) and passes them to the client block,
 * which embeds them in a player modal. Managed from /admin/testimonials.
 */
export async function ClientStoriesSection() {
  if (CLIP_STORIES.length) return <ClientStories stories={CLIP_STORIES} />;

  let rows: Array<{
    name: string;
    location: string | null;
    review: string | null;
    videoUrl: string | null;
    avatarUrl: string | null;
    rating: number | null;
  }> = [];

  try {
    rows = await prisma.testimonial.findMany({
      where: { type: "VIDEO", isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { name: true, location: true, review: true, videoUrl: true, avatarUrl: true, rating: true },
    });
  } catch {
    rows = [];
  }

  const stories: Story[] = rows
    .filter((r) => r.videoUrl)
    .map((r) => ({
      name: r.name,
      location: r.location ?? "",
      quote: r.review ?? "",
      thumbnail: r.avatarUrl ?? undefined,
      videoUrl: r.videoUrl ?? undefined,
      rating: r.rating ?? 5,
    }));

  if (stories.length === 0) {
    // Graceful fallback until stories are added in the admin.
    stories.push(
      { name: "Dishirasa Konduru", location: "Hyderabad", quote: "Our home looks elegant and perfectly matches our style.", rating: 5, thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
      { name: "Satish Kondeti", location: "Hyderabad", quote: "From a 20-year-old flat to a stunning modern home.", rating: 5, thumbnail: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80" },
      { name: "Arun Raj", location: "Hyderabad", quote: "Samhitha and team truly understood our vision.", rating: 5, thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
    );
  }

  return <ClientStories stories={stories} />;
}

export default ClientStoriesSection;
