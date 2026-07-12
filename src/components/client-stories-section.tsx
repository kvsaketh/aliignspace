import { prisma } from "@/lib/prisma";
import { ClientStories, type Story } from "@/components/blocks/client-stories";

/**
 * Server wrapper for the Client Stories reel row.
 * Pulls VIDEO-type testimonials from the database (each `videoUrl` may be an
 * Instagram Reel or a YouTube Short link) and passes them to the client block,
 * which embeds them in a player modal. Managed from /admin/testimonials.
 */
export async function ClientStoriesSection() {
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
