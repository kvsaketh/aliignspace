import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConsultationBlock } from "@/components/blocks/consultation";
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  ArrowRight,
  MessageSquare,
  Palette,
  FileCheck,
  Hammer,
  KeyRound,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SLUG_IMAGES: Record<string, string> = {
  "full-home-interiors": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
  "modular-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
  "living-room-interiors": "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80",
  "bedroom-interiors": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
  "wardrobe-design": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  "luxury-furniture": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) {
    return { title: "Service Not Found | ALIIGNSPACE" };
  }

  const stats = (service.stats as { priceRange?: string; deliveryTime?: string }) || {};

  return {
    title: `${service.title} | ALIIGNSPACE — Interior Designers Hyderabad`,
    description: `${service.shortDesc || service.description.slice(0, 120)} ${stats.priceRange ? stats.priceRange + "." : ""} ${stats.deliveryTime ? stats.deliveryTime + " delivery." : ""} ALIIGNSPACE, Hyderabad & Nellore.`,
    openGraph: {
      title: `${service.title} | ALIIGNSPACE`,
      description: service.shortDesc || service.description,
      images: [
        {
          url: service.heroImage || service.image || SLUG_IMAGES[slug] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: { slug, isActive: true },
  });

  if (!service) {
    notFound();
  }

  const relatedServices = await prisma.service.findMany({
    where: { isActive: true, NOT: { slug } },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  const features = (service.features as string[]) || [];
  const gallery = (service.gallery as string[]) || [];
  const stats = (service.stats as { priceRange?: string; deliveryTime?: string; warranty?: string }) || {};

  const processSteps =
    (service.processSteps as Array<{
      title: string;
      number?: string;
      description?: string;
      detail?: string;
      duration?: string;
      checklist?: string[];
    }>) || [];

  const normalizedProcess =
    processSteps.length > 0
      ? processSteps.map((step, i) => ({
          title: step.title,
          duration: step.duration || step.number || `Step ${i + 1}`,
          detail: step.detail || step.description || "",
        }))
      : [
          {
            title: "Meet Designer",
            duration: "Day 1–3",
            detail: "Site visit, measurements, lifestyle brief, and budget alignment.",
          },
          {
            title: "Visualise Your Home",
            duration: "Day 4–12",
            detail: "3D renders for every room, material mood boards, and lighting plans.",
          },
          {
            title: "Freeze Design",
            duration: "Day 13–18",
            detail: "Complete itemised BOQ, final material lock-in, and project timeline.",
          },
          {
            title: "Execution Begins",
            duration: "Day 19–80",
            detail: "Dedicated supervisor on-site daily. All materials quality-checked.",
          },
          {
            title: "Happy Handover",
            duration: "Day 81–90",
            detail: "Full walkthrough, punch list resolved, cleaning done. Keys to your dream home.",
          },
        ];

  const icons = [
    <MessageSquare key={0} className="w-5 h-5" />,
    <Palette key={1} className="w-5 h-5" />,
    <FileCheck key={2} className="w-5 h-5" />,
    <Hammer key={3} className="w-5 h-5" />,
    <KeyRound key={4} className="w-5 h-5" />,
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={
                service.heroImage ||
                service.image ||
                SLUG_IMAGES[slug] ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              }
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/50 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
            <div className="max-w-3xl">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-sm mb-6 transition-colors duration-200"
              >
                ← All Services
              </Link>
              <span className="block text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4">
                {service.shortDesc || "Premium Service"}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-white leading-tight mb-6">
                {service.title}
              </h1>
              <p className="font-sans text-xl text-white/75 font-light leading-relaxed max-w-xl mb-8">
                {service.description.length > 160
                  ? service.description.slice(0, 160) + "..."
                  : service.description}
              </p>
              <div className="flex flex-wrap gap-6">
                {stats.priceRange && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
                    <IndianRupee className="w-4 h-4 text-[#D46546]" />
                    <span className="text-white font-sans text-sm font-medium">
                      {stats.priceRange}
                    </span>
                  </div>
                )}
                {stats.deliveryTime && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
                    <Clock className="w-4 h-4 text-[#D46546]" />
                    <span className="text-white font-sans text-sm font-medium">
                      {stats.deliveryTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Description + Features */}
        <section className="py-20 lg:py-32 bg-[#F9F5ED]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-6">
                  What this service includes
                </h2>
                <p className="text-gray-600 font-sans leading-relaxed text-lg mb-8">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#D46546] hover:bg-[#c44d32] text-white font-sans font-medium text-base transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Free Consultation
                </Link>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-6">
                  Everything you get
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D46546] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-10 text-center">
                From our portfolio
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden group"
                  >
                    <Image
                      src={img}
                      alt={`${service.title} example ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-[#D46546] font-sans font-medium hover:underline"
                >
                  View Full Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Timeline / Process */}
        <section className="py-20 bg-[#1C1917]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#D46546] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                How It Works
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white mt-4 mb-3">
                Your {service.title} journey
              </h2>
              <p className="text-white/40 font-sans text-sm max-w-md mx-auto">
                Same trusted process — timed to your project.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-0">
              {normalizedProcess.map((step, index) => {
                const isLast = index === normalizedProcess.length - 1;
                return (
                  <div key={index} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#D46546]/15 border border-[#D46546]/40 flex items-center justify-center text-[#D46546]">
                        {icons[index % icons.length]}
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 bg-[#D46546]/15 my-1" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-medium text-white">
                          {step.title}
                        </h3>
                        <span className="text-xs font-sans font-semibold text-[#D46546] bg-[#D46546]/10 px-2.5 py-0.5 rounded-full border border-[#D46546]/20">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-white/55 font-sans text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 text-[#D46546] font-sans font-medium text-sm hover:underline"
              >
                See the full process breakdown <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-20 bg-[#F9F5ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] mb-8 text-center">
                Related Services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={
                          related.heroImage ||
                          related.image ||
                          SLUG_IMAGES[related.slug] ||
                          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                        }
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#D46546] font-sans font-semibold uppercase tracking-wider mb-1">
                          {related.shortDesc || "Service"}
                        </p>
                        <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                          {related.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#D46546] group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <ConsultationBlock
          title={`Ready to get started with ${service.title}?`}
          subtitle="Book a free consultation. We'll visit your space, understand your vision, and share a detailed plan — no commitment required."
        />
      </main>
      <Footer />
    </>
  );
}
