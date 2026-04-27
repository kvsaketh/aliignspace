"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, X, MapPin, Star } from "lucide-react";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location?: string | null;
  description?: string | null;
  image: string;
  videoUrl?: string | null;
  videoType?: string | null;
  featured: boolean;
};

function getYtEmbedId(url: string) {
  const r = url.match(/[?&]v=([^&]+)/);
  const s = url.match(/shorts\/([^?&\n]+)/);
  return r?.[1] || s?.[1] || null;
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const embedId = project.videoUrl ? getYtEmbedId(project.videoUrl) : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-[#1C1917] rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white rounded-full p-1.5 transition-colors">
          <X className="h-5 w-5" />
        </button>

        {embedId ? (
          <div className="relative w-full" style={{ paddingTop: project.videoType === "Short" ? "177.78%" : "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-medium text-white mb-1">{project.title}</h3>
              {project.location && (
                <p className="flex items-center gap-1 text-sm text-white/60">
                  <MapPin className="h-3.5 w-3.5" /> {project.location}
                </p>
              )}
            </div>
            <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
              {project.category}
            </span>
          </div>
          {project.description && (
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{project.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-20 bg-[#F9F5ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D46546] text-sm font-medium tracking-wider uppercase font-sans">Browse Our Work</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mt-4 mb-2">Every project is unique.</h2>
          <p className="text-gray-500 font-sans">Every finish is a promise kept.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-[#D46546] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-[#D46546]/10 hover:text-[#D46546] border border-gray-200"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Play button overlay */}
                {project.videoUrl && (
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => { e.preventDefault(); setActive(project); }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                      <Play className="h-6 w-6 text-[#D46546] fill-[#D46546] translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-white">
                      <Star className="h-2.5 w-2.5 fill-white" /> Featured
                    </span>
                  )}
                  {project.videoType === "Short" && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D46546] text-white">Short</span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-base font-medium text-[#1C1917] leading-snug line-clamp-2">{project.title}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#D46546] bg-[#D46546]/10 px-2 py-0.5 rounded-full">{project.category}</span>
                  {project.location && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" /> {project.location.split(",")[0]}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16">No projects in this category yet.</p>
        )}
      </div>

      {/* Video Modal */}
      {active && <VideoModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
