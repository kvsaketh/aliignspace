import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConsultationBlock } from "@/components/blocks/consultation";
import { ServiceFaq } from "@/components/services/service-faq";
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Palette,
  FileCheck,
  Hammer,
  KeyRound,
  Sparkles,
  Layers,
  ShieldCheck,
  Ruler,
  Lightbulb,
  PaintBucket,
  Sofa,
  Gem,
  Quote,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/* ----------------------------- Content types ----------------------------- */

interface HeroStat {
  value: string;
  label: string;
}
interface IntroContent {
  heading: string;
  body: string;
}
interface Inclusion {
  title: string;
  description: string;
}
interface Material {
  name: string;
  description: string;
}
interface DesignStyle {
  name: string;
  description: string;
  image: string;
}
interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}
interface WhyChooseItem {
  title: string;
  body: string;
}
interface Faq {
  q: string;
  a: string;
}
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}
interface ServiceContent {
  tagline?: string;
  heroStats?: HeroStat[];
  intro?: IntroContent;
  inclusions?: Inclusion[];
  materials?: Material[];
  designStyles?: DesignStyle[];
  pricingTiers?: PricingTier[];
  whyChoose?: WhyChooseItem[];
  faqs?: Faq[];
  testimonial?: Testimonial;
}

/* ------------------------------- Constants -------------------------------- */

const SLUG_IMAGES: Record<string, string> = {
  "full-home-interiors": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
  "modular-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
  "living-room-interiors": "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80",
  "bedroom-interiors": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
  "wardrobe-design": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  "luxury-furniture": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80";

/* ------------------------------- Metadata --------------------------------- */

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

  const stats =
    (service.stats as { priceRange?: string; deliveryTime?: string }) || {};
  const content = service.content as ServiceContent | null;
  const tagline = content?.tagline ? `${content.tagline}. ` : "";

  return {
    title: `${service.title} | ALIIGNSPACE — Interior Designers Hyderabad`,
    description: `${tagline}${service.shortDesc || service.description.slice(0, 120)} ${stats.priceRange ? stats.priceRange + "." : ""} ${stats.deliveryTime ? stats.deliveryTime + " delivery." : ""} ALIIGNSPACE, Hyderabad & Nellore.`,
    openGraph: {
      title: `${service.title} | ALIIGNSPACE`,
      description: content?.tagline || service.shortDesc || service.description,
      images: [
        {
          url:
            service.heroImage ||
            service.image ||
            SLUG_IMAGES[slug] ||
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

/* --------------------------------- Page ----------------------------------- */

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

  /* ----------------------------- Data parsing ----------------------------- */

  const features = (service.features as string[]) || [];
  const gallery = (service.gallery as string[]) || [];
  const stats =
    (service.stats as {
      priceRange?: string;
      deliveryTime?: string;
      warranty?: string;
    }) || {};
  const content = service.content as ServiceContent | null;

  const heroImage =
    service.heroImage || service.image || SLUG_IMAGES[slug] || FALLBACK_IMAGE;

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
            detail:
              "Site visit, measurements, lifestyle brief, and budget alignment.",
          },
          {
            title: "Visualise Your Home",
            duration: "Day 4–12",
            detail:
              "3D renders for every room, material mood boards, and lighting plans.",
          },
          {
            title: "Freeze Design",
            duration: "Day 13–18",
            detail:
              "Complete itemised BOQ, final material lock-in, and project timeline.",
          },
          {
            title: "Execution Begins",
            duration: "Day 19–80",
            detail:
              "Dedicated supervisor on-site daily. All materials quality-checked.",
          },
          {
            title: "Happy Handover",
            duration: "Day 81–90",
            detail:
              "Full walkthrough, punch list resolved, cleaning done. Keys to your dream home.",
          },
        ];

  const processIcons = [
    <MessageSquare key={0} className="w-5 h-5" />,
    <Palette key={1} className="w-5 h-5" />,
    <FileCheck key={2} className="w-5 h-5" />,
    <Hammer key={3} className="w-5 h-5" />,
    <KeyRound key={4} className="w-5 h-5" />,
  ];

  const inclusionIcons = [
    Sparkles,
    Layers,
    ShieldCheck,
    Ruler,
    Lightbulb,
    PaintBucket,
    Sofa,
    Gem,
  ];

  /* Derived content sections (all guarded) */
  const heroStats = content?.heroStats ?? [];
  const intro = content?.intro;
  const inclusions = content?.inclusions ?? [];
  const materials = content?.materials ?? [];
  const designStyles = content?.designStyles ?? [];
  const pricingTiers = content?.pricingTiers ?? [];
  const whyChoose = content?.whyChoose ?? [];
  const faqs = content?.faqs ?? [];
  const testimonial = content?.testimonial;

  return (
    <>
      <Header />
      <main>
        {/* ============================= HERO ============================= */}
        <section className="relative min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${service.title} — interior design by ALIIGNSPACE`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#16141f] via-[#16141f]/65 to-[#16141f]/20"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#16141f]/70 to-transparent"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36">
            <div className="max-w-3xl">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-sm mb-8 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" /> All Services
              </Link>
              <span className="block text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.28em] uppercase mb-5">
                {content?.tagline || service.shortDesc || "Premium Service"}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-white leading-[1.05] mb-7">
                {service.title}
              </h1>
              <p className="font-sans text-lg sm:text-xl text-white/75 font-light leading-relaxed max-w-2xl mb-9">
                {service.shortDesc || service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {stats.deliveryTime && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md ring-1 ring-white/15 px-5 py-3 rounded-full">
                    <Clock className="w-4 h-4 text-[#7A22FF]" />
                    <span className="text-white font-sans text-sm font-medium">
                      {stats.deliveryTime}
                    </span>
                  </div>
                )}
                {stats.warranty && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md ring-1 ring-white/15 px-5 py-3 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-[#7A22FF]" />
                    <span className="text-white font-sans text-sm font-medium">
                      {stats.warranty}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================= HERO STATS BAND ======================= */}
        {heroStats.length > 0 && (
          <section className="bg-[#7A22FF]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/15">
                {heroStats.map((stat, index) => (
                  <div
                    key={index}
                    className="px-6 py-10 text-center first:pl-0 last:pr-0"
                  >
                    <div className="font-serif text-4xl sm:text-5xl font-medium text-white leading-none mb-2">
                      {stat.value}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-white/75 tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================== INTRO ============================ */}
        <section className="py-20 lg:py-32 bg-[#f6f4fb]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-5">
                  <span
                    aria-hidden="true"
                    className="w-8 h-px bg-[#7A22FF]"
                  />
                  The Overview
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] leading-tight mb-7">
                  {intro?.heading || `Designed around the way you live`}
                </h2>
                <p className="text-gray-600 font-sans leading-relaxed text-lg mb-6">
                  {intro?.body || service.description}
                </p>
                {intro?.body && (
                  <p className="text-gray-600 font-sans leading-relaxed text-base mb-8">
                    {service.description}
                  </p>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#7A22FF] hover:bg-[#9b57cf] text-white font-sans font-medium text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7A22FF]/25"
                >
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Everything you get */}
              {features.length > 0 && (
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm ring-1 ring-black/5">
                    <h3 className="font-serif text-xl font-medium text-[#1a1720] mb-6">
                      Everything you get
                    </h3>
                    <ul className="space-y-3.5">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#7A22FF] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-sans text-[15px] leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================== INCLUSIONS ========================== */}
        {inclusions.length > 0 && (
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                  What&apos;s Included
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] mt-4">
                  A complete, worry-free package
                </h2>
                <p className="text-gray-500 font-sans mt-4 leading-relaxed">
                  Every {service.title.toLowerCase()} project includes these as
                  standard — no hidden surprises, no last-minute add-ons.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inclusions.map((item, index) => {
                  const Icon = inclusionIcons[index % inclusionIcons.length];
                  return (
                    <div
                      key={index}
                      className="group bg-[#F6F5FB] rounded-2xl p-8 transition-all duration-300 hover:bg-[#1a1720] hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#7A22FF]/10 group-hover:bg-[#7A22FF] flex items-center justify-center text-[#7A22FF] group-hover:text-white transition-colors duration-300 mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-xl font-medium text-[#1a1720] group-hover:text-white transition-colors duration-300 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-white/65 font-sans text-sm leading-relaxed transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ======================== PROCESS TIMELINE ======================= */}
        <section className="py-20 lg:py-28 bg-[#1a1720]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                How It Works
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white mt-4 mb-3">
                Your {service.title} journey
              </h2>
              <p className="text-white/40 font-sans text-sm max-w-md mx-auto">
                Same trusted process — timed to your project, with a dedicated
                designer at every step.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-0">
              {normalizedProcess.map((step, index) => {
                const isLast = index === normalizedProcess.length - 1;
                return (
                  <div key={index} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#7A22FF]/15 border border-[#7A22FF]/40 flex items-center justify-center text-[#7A22FF]">
                        {processIcons[index % processIcons.length]}
                      </div>
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className="w-px flex-1 bg-gradient-to-b from-[#7A22FF]/40 to-[#7A22FF]/5 my-1"
                        />
                      )}
                    </div>
                    <div className="pb-10">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <span className="font-sans text-xs font-semibold text-white/30 tabular-nums">
                          0{index + 1}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-white">
                          {step.title}
                        </h3>
                        <span className="text-xs font-sans font-semibold text-[#7A22FF] bg-[#7A22FF]/10 px-2.5 py-0.5 rounded-full border border-[#7A22FF]/20">
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
                className="inline-flex items-center gap-2 text-[#7A22FF] font-sans font-medium text-sm hover:underline"
              >
                See the full process breakdown <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================== DESIGN STYLES ======================== */}
        {designStyles.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#f6f4fb]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                  Curated Aesthetics
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] mt-4">
                  Find your design language
                </h2>
                <p className="text-gray-500 font-sans mt-4 leading-relaxed">
                  Whatever your taste, our designers translate it into a space
                  that feels unmistakably yours.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {designStyles.map((style, index) => (
                  <article
                    key={index}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={style.image || FALLBACK_IMAGE}
                        alt={`${style.name} interior style`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <div className="p-7">
                      <h3 className="font-serif text-xl font-medium text-[#1a1720] mb-2">
                        {style.name}
                      </h3>
                      <p className="text-gray-600 font-sans text-sm leading-relaxed">
                        {style.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ======================= MATERIALS & BRANDS ====================== */}
        {materials.length > 0 && (
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                    Materials &amp; Brands
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] mt-4 mb-5 leading-tight">
                    Built only with materials we&apos;d use ourselves
                  </h2>
                  <p className="text-gray-500 font-sans leading-relaxed">
                    We partner with trusted Indian and global brands so your
                    space looks beautiful on day one — and holds up for years
                    after.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <div className="grid sm:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden ring-1 ring-gray-200">
                    {materials.map((material, index) => (
                      <div
                        key={index}
                        className="bg-white p-7 transition-colors duration-300 hover:bg-[#F6F5FB]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-7 h-7 rounded-full bg-[#7A22FF]/10 text-[#7A22FF] flex items-center justify-center text-xs font-sans font-bold tabular-nums">
                            {index + 1}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-[#1a1720]">
                            {material.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed pl-10">
                          {material.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================= GALLERY =========================== */}
        {gallery.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#16141f]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                  Real Spaces, Real Homes
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white mt-4">
                  From our portfolio
                </h2>
                <p className="text-white/40 font-sans mt-4 leading-relaxed">
                  A glimpse of {service.title.toLowerCase()} projects we&apos;ve
                  delivered across Hyderabad and Nellore.
                </p>
              </div>
              <div className="columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
                {gallery.map((img, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl group break-inside-avoid ${
                      index % 3 === 0
                        ? "aspect-[3/4]"
                        : index % 3 === 1
                          ? "aspect-square"
                          : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${service.title} project ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-sans font-medium text-sm hover:bg-white hover:text-[#1a1720] transition-all duration-300"
                >
                  View Full Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* =========================== WHY CHOOSE ========================== */}
        {whyChoose.length > 0 && (
          <section className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                  Why ALIIGNSPACE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] mt-4">
                  The difference is in the details
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-3xl overflow-hidden ring-1 ring-gray-200">
                {whyChoose.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 transition-colors duration-300 hover:bg-[#F6F5FB]"
                  >
                    <div className="font-serif text-3xl text-[#7A22FF]/30 mb-4 tabular-nums">
                      0{index + 1}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#1a1720] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================== FAQ ============================== */}
        {faqs.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#f6f4fb]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[#7A22FF] text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                  Questions, Answered
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1a1720] mt-4">
                  Frequently asked questions
                </h2>
              </div>
              <ServiceFaq faqs={faqs} />
            </div>
          </section>
        )}

        {/* ========================== TESTIMONIAL ========================== */}
        {testimonial && (
          <section className="py-20 lg:py-32 bg-[#1a1720] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#7A22FF]/10 blur-3xl"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <Quote
                  aria-hidden="true"
                  className="w-12 h-12 text-[#7A22FF] mx-auto mb-8"
                />
                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-snug mb-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex flex-col items-center">
                  <div
                    aria-hidden="true"
                    className="w-12 h-px bg-[#7A22FF] mb-5"
                  />
                  <p className="font-serif text-lg font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="font-sans text-sm text-white/50 mt-1">
                    {testimonial.role}
                    {testimonial.location ? ` · ${testimonial.location}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================== RELATED SERVICES ======================= */}
        {relatedServices.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#f6f4fb]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1a1720] mb-10 text-center">
                Explore related services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                        <p className="text-xs text-[#7A22FF] font-sans font-semibold uppercase tracking-wider mb-1">
                          {related.shortDesc || "Service"}
                        </p>
                        <h3 className="font-serif text-lg font-medium text-[#1a1720]">
                          {related.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#7A22FF] group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================== CTA ============================== */}
        <ConsultationBlock
          title={`Ready to get started with ${service.title}?`}
          subtitle="Book a free consultation. We'll visit your space, understand your vision, and share a detailed plan — no commitment required."
        />
      </main>
      <Footer />

      {/* ======================= STICKY BOTTOM CTA ======================= */}
      <div className="sticky bottom-0 z-40 bg-[#1a1720]/95 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <p className="font-serif text-base sm:text-lg font-medium text-white truncate">
                {service.title}
              </p>
              {content?.tagline && (
                <p className="font-sans text-xs text-[#7A22FF] hidden sm:block">
                  {content.tagline}
                </p>
              )}
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 sm:px-7 py-3 bg-[#7A22FF] hover:bg-[#9b57cf] text-white font-sans font-medium text-sm transition-colors duration-300 rounded-full"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
