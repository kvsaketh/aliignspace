import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectTile } from "@/components/project-tile";

// Grid slots for six tiles: one tall hero tile, two stacked beside it, then a row of three.
const SLOTS = [
  "lg:col-span-7 lg:row-span-2 min-h-[420px] lg:min-h-[640px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-4 min-h-[340px]",
  "lg:col-span-4 min-h-[340px]",
  "lg:col-span-4 min-h-[340px]",
];

export async function HomePortfolioSection() {
  const where = { status: "PUBLISHED" as const };
  const [featured, total] = await Promise.all([
    prisma.portfolioProject.findMany({
      where,
      // Featured projects first, then the rest by the admin's ordering.
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      take: SLOTS.length,
    }),
    prisma.portfolioProject.count({ where }),
  ]);

  if (!featured.length) return null;

  return (
    <section className="relative py-24 lg:py-36 bg-[#F7F5F1] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#D4A853]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#4E2585]">Completed Homes</span>
            </div>
            <h2 className="font-serif font-medium text-[#1a1720] text-4xl sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight">
              Homes we&rsquo;ve <em className="text-[#4E2585]">handed over</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <p className="text-base lg:text-lg leading-relaxed text-[#1a1720]/70">
              Every project here is a real home, filmed after handover — the finish you see on screen is the finish our
              clients live with.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div>
                <span className="font-serif text-5xl text-[#4E2585]">{total}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1a1720]/50 mt-1">
                  Home tours on film
                </span>
              </div>
              <Link
                href="/portfolio"
                className="group ml-auto inline-flex items-center gap-3 rounded-full bg-[#4E2585] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#3B1868]"
              >
                View all projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-5 lg:grid-cols-12">
          {featured.map((p, i) => (
            <ProjectTile
              key={p.id}
              index={i}
              large={i === 0}
              className={SLOTS[i]}
              href={`/portfolio/${p.slug}`}
              image={p.image}
              title={p.title}
              category={p.category}
              location={p.location}
              hasVideo={Boolean(p.mainVideoUrl || p.videoUrl)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
