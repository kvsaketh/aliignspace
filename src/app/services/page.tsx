import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  PencilRuler,
  CheckCircle2,
  Hammer,
  KeyRound,
  Quote,
  ShieldCheck,
  Clock,
  Gem,
  HeartHandshake,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Interior Design Services | ALIIGNSPACE Hyderabad & Nellore",
  description:
    "Explore ALIIGNSPACE's full range of interior design services — full home interiors, modular kitchen, living room, bedroom, wardrobe, luxury furniture, and office & commercial spaces. Transparent pricing, 60–90 day delivery.",
};

export const dynamic = "force-dynamic";

const SLUG_IMAGES: Record<string, string> = {
  "full-home-interiors":
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  "modular-kitchen":
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "living-room-interiors":
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  "bedroom-interiors":
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  "wardrobe-design":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "luxury-furniture":
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  "office-commercial-interiors":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

const FALLBACK_SERVICES = [
  {
    title: "Full Home Interiors",
    slug: "full-home-interiors",
    shortDesc: "Complete transformation",
    description:
      "A complete turnkey transformation of your entire home — from concept and 3D design to the final styled handover. One team, one timeline, zero hassle.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    shortDesc: "Smart & functional",
    description:
      "Smart, functional kitchens built with premium hardware, durable finishes, and intelligent storage. Designed around how your family actually cooks.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    title: "Living Room Interiors",
    slug: "living-room-interiors",
    shortDesc: "Statement spaces",
    description:
      "Statement living rooms that balance comfort, conversation, and style — the space your home is remembered by.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  },
  {
    title: "Bedroom Interiors",
    slug: "bedroom-interiors",
    shortDesc: "Serene retreats",
    description:
      "Serene, restful bedrooms designed around how you truly unwind — warm textures, soft lighting, and clutter-free calm.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  },
  {
    title: "Wardrobe & Storage",
    slug: "wardrobe-design",
    shortDesc: "Smart storage",
    description:
      "Precision-designed wardrobes and storage solutions that make every inch count, with finishes that match your interiors.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Luxury Furniture",
    slug: "luxury-furniture",
    shortDesc: "Bespoke pieces",
    description:
      "Handcrafted, bespoke furniture designed to fit your space and elevate your interior — built to last a lifetime.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    title: "Office & Commercial Interiors",
    slug: "office-commercial-interiors",
    shortDesc: "Productive spaces",
    description:
      "Productive, brand-aligned workspaces and commercial interiors designed to impress clients and inspire teams.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];

const STATS = [
  { value: "500+", label: "Homes Delivered" },
  { value: "12+", label: "Years of Experience" },
  { value: "90-Day", label: "Delivery Promise" },
  { value: "4.9★", label: "Average Client Rating" },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consult",
    Icon: ClipboardList,
    body: "We listen to your needs, lifestyle, and budget in a free design consultation.",
  },
  {
    number: "02",
    title: "Design",
    Icon: PencilRuler,
    body: "Our designers craft detailed 3D layouts and material palettes for your space.",
  },
  {
    number: "03",
    title: "Approve",
    Icon: CheckCircle2,
    body: "You review a transparent, itemised estimate and sign off — no hidden costs.",
  },
  {
    number: "04",
    title: "Build",
    Icon: Hammer,
    body: "Skilled craftsmen execute the build with quality checks at every milestone.",
  },
  {
    number: "05",
    title: "Handover",
    Icon: KeyRound,
    body: "We deliver a styled, move-in-ready home within 60–90 days.",
  },
];

const PROMISES = [
  {
    number: "01",
    title: "Transparent Pricing",
    Icon: ShieldCheck,
    body: "No hidden costs. Every estimate is itemised and explained in detail before work begins.",
  },
  {
    number: "02",
    title: "On-Time Delivery",
    Icon: Clock,
    body: "We respect your time and commit to every deadline — most homes ready within 60–90 days.",
  },
  {
    number: "03",
    title: "Premium Quality",
    Icon: Gem,
    body: "Certified materials, branded hardware, and skilled craftsmanship on every project.",
  },
  {
    number: "04",
    title: "Lifetime Support",
    Icon: HeartHandshake,
    body: "Our relationship doesn't end at handover — we stand behind our work for years to come.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ALIIGNSPACE turned our empty 3BHK into a warm, finished home in just under three months. Every update was transparent and on schedule.",
    name: "Priya & Rahul Menon",
    location: "Gachibowli, Hyderabad",
  },
  {
    quote:
      "The modular kitchen they designed is genuinely the heart of our house now. Smart storage, premium finish, and zero surprises on the bill.",
    name: "Sandeep Reddy",
    location: "Nellore",
  },
  {
    quote:
      "From the first 3D walkthrough to the final styling, the team was professional and detail-obsessed. Worth every rupee.",
    name: "Lakshmi Varma",
    location: "Kondapur, Hyderabad",
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
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
            alt="Elegantly designed ALIIGNSPACE living interior"
            fill
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/95 via-[#1A1612]/50 to-transparent"
          />
          <div className="relative z-10 pt-36 pb-20 px-8 lg:px-20 max-w-3xl">
            <p className="text-[#D46546] text-sm font-sans font-semibold tracking-[0.2em] uppercase mb-4">
              Interior Design Services
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-5">
              Everything Your Home Needs
            </h1>
            <p className="font-sans text-white/75 text-lg leading-relaxed">
              From a single modular kitchen to a complete home makeover — our
              Hyderabad and Nellore studios handle every detail, end to end,
              with transparent pricing and a 60–90 day delivery promise.
            </p>
          </div>
        </section>

        {/* ── Section 2: Stats Band ────────────────────────────────────────── */}
        <section className="bg-[#1C1917]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="py-10 px-4 text-center"
                >
                  <p className="font-serif text-4xl sm:text-5xl text-[#D46546] leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-white/60 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Services Grid ─────────────────────────────────────── */}
        <section className="py-24 bg-[#f9f7f4]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                What We Offer
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612] mb-4">
                Our Services
              </h2>
              <p className="font-sans text-stone-500 leading-relaxed">
                Seven specialised services, one accountable team. Explore each
                one to see what a turnkey ALIIGNSPACE project includes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {services.map((s) => {
                const slug = (s as { slug?: string }).slug ?? "";
                const shortDesc =
                  (s as { shortDesc?: string }).shortDesc ??
                  (s as { short_desc?: string }).short_desc ??
                  "";
                const description =
                  (s as { description?: string }).description ?? "";
                const rawImage =
                  (s as { image?: string }).image ??
                  (s as { imageUrl?: string }).imageUrl ??
                  "";
                const image =
                  rawImage ||
                  SLUG_IMAGES[slug] ||
                  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80";

                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="relative block rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/90 via-[#1A1612]/35 to-transparent"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="font-sans text-[#D46546] text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5">
                        {shortDesc}
                      </p>
                      <h3 className="font-serif text-2xl text-white leading-snug mb-2">
                        {s.title}
                      </h3>
                      {description ? (
                        <p className="font-sans text-sm text-white/70 leading-relaxed line-clamp-2 mb-3">
                          {description}
                        </p>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-white tracking-wide uppercase transition-transform duration-300 group-hover:translate-x-1">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 4: Design Process Preview ────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                How We Work
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612] mb-4">
                A Process Built on Clarity
              </h2>
              <p className="font-sans text-stone-500 leading-relaxed">
                Every ALIIGNSPACE project follows the same five proven steps —
                so you always know exactly where things stand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="bg-[#f9f7f4] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D46546]/10 text-[#D46546]">
                      <step.Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-3xl text-stone-300">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#1A1612] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-stone-500 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#D46546] hover:text-[#c25538] transition-colors duration-200"
              >
                See our full design process
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 5: Why ALIIGNSPACE ───────────────────────────────────── */}
        <section className="py-24 bg-[#F9F5ED]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Why ALIIGNSPACE
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612] mb-4">
                The ALIIGNSPACE Promise
              </h2>
              <p className="font-sans text-stone-500 leading-relaxed">
                Premium turnkey interiors should feel effortless. Here is what
                every client can count on.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
              {PROMISES.map((p) => (
                <div
                  key={p.number}
                  className="bg-white p-8 rounded-2xl border border-stone-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D46546]/10 text-[#D46546] mb-5">
                    <p.Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] mb-2">
                    {p.number}
                  </p>
                  <h3 className="font-serif text-xl text-[#1A1612] mb-3">
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

        {/* ── Section 6: Testimonials ──────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Client Stories
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612]">
                Loved by Homeowners
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="bg-[#f9f7f4] rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <Quote
                    className="w-9 h-9 text-[#D46546]/30 mb-4"
                    aria-hidden="true"
                  />
                  <blockquote className="font-sans text-stone-600 leading-relaxed flex-1">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-stone-200">
                    <p className="font-serif text-base text-[#1A1612]">
                      {t.name}
                    </p>
                    <p className="font-sans text-xs text-stone-500 tracking-wide uppercase mt-0.5">
                      {t.location}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 7: Final CTA ─────────────────────────────────────────── */}
        <section className="py-24 bg-[#1A1612] text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <p className="font-sans text-[#D46546] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Let's Begin
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Not sure which service you need?
            </h2>
            <p className="font-sans text-white/60 text-lg mb-10 leading-relaxed">
              Tell us about your space and our designers will help you map it
              out — completely free, with no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans bg-[#D46546] text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-[#c25538] transition-colors duration-200"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
