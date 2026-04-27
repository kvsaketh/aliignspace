import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Interior Design Services | ALIIGNSPACE Hyderabad & Nellore",
  description:
    "Explore ALIIGNSPACE's full range of interior design services — home interiors, modular kitchen, living room, bedroom, office, and commercial spaces. Transparent pricing, 60–90 day delivery.",
};

export const dynamic = "force-dynamic";

const SLUG_IMAGES: Record<string, string> = {
  "full-home-interiors": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  "modular-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "living-room-interiors": "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  "bedroom-interiors": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  "wardrobe-design": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "luxury-furniture": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
};

const FALLBACK_SERVICES = [
  {
    title: "Full Home Interiors",
    slug: "full-home-interiors",
    shortDesc: "Complete transformation",
    description:
      "Complete turnkey transformation of your entire home from concept to completion.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    shortDesc: "Smart & functional",
    description:
      "Smart, functional kitchens with premium hardware and beautiful finishes.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    title: "Living Room Design",
    slug: "living-room-interiors",
    shortDesc: "Statement spaces",
    description:
      "Statement living spaces that balance comfort, conversation, and style.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  },
  {
    title: "Bedroom Design",
    slug: "bedroom-interiors",
    shortDesc: "Serene retreats",
    description:
      "Serene, restful bedrooms designed around how you actually live.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  },
  {
    title: "Wardrobe & Storage",
    slug: "wardrobe-design",
    shortDesc: "Smart storage",
    description:
      "Precision-designed wardrobes and storage solutions for every space.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Luxury Furniture",
    slug: "luxury-furniture",
    shortDesc: "Bespoke pieces",
    description:
      "Handcrafted luxury furniture designed to elevate your interior.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
];

const PROMISES = [
  {
    number: "01",
    title: "Transparent Pricing",
    body: "No hidden costs. Every estimate explained in detail before work begins.",
  },
  {
    number: "02",
    title: "On-Time Delivery",
    body: "We respect your time and commit to every deadline we set.",
  },
  {
    number: "03",
    title: "Premium Quality",
    body: "Certified materials and skilled craftsmanship on every project.",
  },
  {
    number: "04",
    title: "Lifetime Support",
    body: "Our relationship doesn't end at handover.",
  },
];

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const services = dbServices.length > 0 ? dbServices : FALLBACK_SERVICES;

  return (
    <>
      <Header />

      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
            alt="Interior design hero"
            fill
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/90 via-[#1A1612]/40 to-transparent"
          />
          <div className="relative z-10 pt-32 pb-20 px-8 lg:px-20 max-w-3xl">
            <p className="text-[#D46546] text-sm font-sans font-semibold tracking-[0.2em] uppercase mb-4">
              Interior Design Services
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-5">
              Everything Your Home Needs
            </h1>
            <p className="font-sans text-white/70 text-lg leading-relaxed">
              From a modular kitchen to a complete home makeover — we handle
              every detail, end to end.
            </p>
          </div>
        </section>

        {/* ── Section 2: Services Grid ─────────────────────────────────────── */}
        <section className="py-24 bg-[#f9f7f4]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                What We Offer
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612]">
                Our Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {services.map((s) => {
                const slug = (s as { slug?: string }).slug ?? "";
                const shortDesc =
                  (s as { shortDesc?: string }).shortDesc ??
                  (s as { short_desc?: string }).short_desc ??
                  "";
                const rawImage =
                  (s as { image?: string }).image ??
                  (s as { imageUrl?: string }).imageUrl ??
                  "";
                const image = rawImage || SLUG_IMAGES[slug] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80";

                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="relative block rounded-2xl overflow-hidden shadow-md group"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/80 via-[#1A1612]/20 to-transparent"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <p className="font-sans text-[#D46546] text-[10px] font-semibold tracking-[0.2em] uppercase mb-1">
                        {shortDesc}
                      </p>
                      <div className="flex items-end justify-between">
                        <h3 className="font-serif text-xl text-white leading-snug">
                          {s.title}
                        </h3>
                        <span className="font-sans text-xs text-white/70 ml-3 flex-shrink-0">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Why ALIIGNSPACE ───────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612] text-center mb-14">
              The ALIIGNSPACE Promise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROMISES.map((p) => (
                <div key={p.number} className="bg-[#f9f7f4] p-8 rounded-2xl">
                  <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] mb-4">
                    {p.number}
                  </p>
                  <h3 className="font-serif text-lg text-[#1A1612] mb-3">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm text-stone-500 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: CTA ───────────────────────────────────────────────── */}
        <section className="py-20 bg-[#1A1612] text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Not sure which service you need?
            </h2>
            <p className="font-sans text-white/60 text-lg mb-10">
              Our designers will help you figure it out — for free.
            </p>
            <Link
              href="/contact"
              className="inline-block font-sans bg-[#D46546] text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-[#c25538] transition-colors duration-200"
            >
              Book a Free Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
