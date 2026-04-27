import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function HomePortfolioSection() {
  const projects = await prisma.portfolioProject.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 3,
  });

  if (!projects.length) return null;

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block font-sans text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#D46546" }}
          >
            Our Work
          </span>
          <h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
            style={{ color: "#1A1612" }}
          >
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group relative block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: "#e8e0d8" }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {project.category && (
                  <span
                    className="inline-block font-sans text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
                    style={{ color: "#D46546" }}
                  >
                    {project.category}
                  </span>
                )}
                <h3 className="font-serif text-xl font-medium text-white leading-snug">
                  {project.title}
                </h3>
                {project.location && (
                  <p className="font-sans text-sm mt-1 text-white/70">{project.location}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="font-sans text-sm font-medium px-8 py-3 border border-[#1A1612] text-[#1A1612] hover:bg-[#1A1612] hover:text-white transition-colors duration-200"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
