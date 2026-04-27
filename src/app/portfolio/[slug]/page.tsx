import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  const shortsMatch = url.match(/shorts\/([^?&]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0&modestbranding=1`;
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.portfolioProject.findFirst({
    where: { slug },
  });
  if (!project) return {};
  return {
    title: `${project.title} | ALIIGNSPACE Portfolio`,
    description: project.description || `${project.category} interior design project in ${project.location} by ALIIGNSPACE.`,
    openGraph: { images: [{ url: project.image }] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.portfolioProject.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (!project) { notFound(); }

  const imageList = (project.images as string[]) || [];
  const gallery = (project.galleryImages as { url: string; caption?: string; alt?: string }[]) || [];

  const galleryUrls = new Set(gallery.map((g) => g.url));
  const extraImages = imageList.filter((url) => !galleryUrls.has(url));

  const videoEmbedUrl = getYouTubeEmbedUrl(project.mainVideoUrl || "") || getYouTubeEmbedUrl(project.videoUrl || "");
  const hasVideo = !!videoEmbedUrl;
  const hasGallery = gallery.length > 0 || extraImages.length > 0;

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/90 via-[#1A1612]/40 to-[#1A1612]/10" />
          </div>

          <div className="absolute top-6 left-6 z-20">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-sans text-sm transition-colors"
            >
              <span>←</span>
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="relative z-10 px-6 sm:px-10 lg:px-20 pb-16 pt-32 max-w-4xl">
            <span className="inline-block text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4">
              {project.category}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight mb-4">
              {project.title}
            </h1>
            <p className="font-sans text-white/70 text-sm">
              <span>📍</span>{" "}
              <span>{project.location}</span>
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid gap-12 ${hasVideo ? "lg:grid-cols-2" : "max-w-3xl mx-auto"}`}>
              <div>
                {project.description && (
                  <p className="font-sans text-lg text-[#1A1612]/80 leading-relaxed mb-10">
                    {project.description}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#1A1612]/10 pt-8">
                  <div>
                    <p className="font-sans text-xs text-[#D46546] uppercase tracking-widest mb-1">Category</p>
                    <p className="font-sans text-sm text-[#1A1612] font-medium">{project.category}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#D46546] uppercase tracking-widest mb-1">Location</p>
                    <p className="font-sans text-sm text-[#1A1612] font-medium">{project.location}</p>
                  </div>
                  {project.clientName && (
                    <div>
                      <p className="font-sans text-xs text-[#D46546] uppercase tracking-widest mb-1">Client</p>
                      <p className="font-sans text-sm text-[#1A1612] font-medium">{project.clientName}</p>
                    </div>
                  )}
                  {project.area && (
                    <div>
                      <p className="font-sans text-xs text-[#D46546] uppercase tracking-widest mb-1">Area</p>
                      <p className="font-sans text-sm text-[#1A1612] font-medium">{project.area}</p>
                    </div>
                  )}
                  {project.projectType && (
                    <div>
                      <p className="font-sans text-xs text-[#D46546] uppercase tracking-widest mb-1">Project Type</p>
                      <p className="font-sans text-sm text-[#1A1612] font-medium">{project.projectType}</p>
                    </div>
                  )}
                </div>
              </div>

              {hasVideo && (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={videoEmbedUrl!}
                    title={`${project.title} — video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {hasGallery && (
          <section className="py-20 bg-[#f9f7f4]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="inline-block text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4">
                  The Work
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1612]">
                  Project Gallery
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item, i) => (
                  <div key={`gallery-${i}`} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.alt || item.caption || project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1612]/70 to-transparent px-4 py-3">
                        <p className="font-sans text-xs text-white/90">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
                {extraImages.map((url, i) => (
                  <div key={`extra-${i}`} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <Image
                      src={url}
                      alt={`${project.title} — image ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-[#1A1612] text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <span className="inline-block text-[rgb(255,134,113)] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-6">
              Start Your Project
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight mb-4">
              Love what you see?
            </h2>
            <p className="font-sans text-lg text-white/70 leading-relaxed mb-10">
              Let&apos;s create something like this for your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D46546] hover:bg-[rgb(255,134,113)] text-white font-sans font-medium text-base transition-all duration-300 hover:-translate-y-0.5 rounded"
              >
                Book a Consultation
              </Link>
              <Link
                href="https://wa.me/919030444503"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/60 hover:text-white text-sm transition-colors"
              >
                or chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = "force-dynamic";
