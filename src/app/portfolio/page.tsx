import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio | ALIIGNSPACE — Interior Design Work, Hyderabad",
  description: "Browse completed interior design projects by ALIIGNSPACE — homes, kitchens, bedrooms, and villas across Hyderabad & Nellore.",
  openGraph: {
    title: "Our Work | ALIIGNSPACE Interior Design Portfolio",
    description: "1,500+ spaces transformed across Hyderabad. Browse our full portfolio.",
    images: [{ url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80", width: 1200, height: 630, alt: "ALIIGNSPACE Portfolio" }],
  },
};

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "4.9★", label: "Google Rating" },
  { value: "5+", label: "Years Experience" },
  { value: "2", label: "Cities Served" },
];

export default async function PortfolioPage() {
  const projects = await prisma.portfolioProject.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="Aertsen portfolio"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612]/85 via-[#1A1612]/60 to-[#1A1612]/25" />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-24">
            <span className="inline-block text-[rgb(255,134,113)] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-6">
              Our Portfolio
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-white leading-tight mb-6">
              Spaces Crafted With<br className="hidden sm:block" />
              <em className="not-italic text-[rgb(250,202,194)]"> Intention &amp; Heart</em>
            </h1>
            <p className="font-sans text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              50+ homes transformed across Hyderabad &amp; Nellore — each one a story of trust fulfilled.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1A1612] py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl font-medium text-[rgb(255,134,113)] mb-1">{stat.value}</p>
                  <p className="font-sans text-sm text-white/60 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <PortfolioGrid projects={projects} />

        {/* CTA */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[rgb(255,134,113)] text-xs font-sans font-semibold tracking-[0.25em] uppercase">Your Project</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A1612] mt-4 mb-6">
              Want to see your home here?<br /><em className="not-italic text-[rgb(255,134,113)]">Let&apos;s talk.</em>
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-xl mx-auto mb-10">
              Every project in this portfolio started with a single conversation. Book your free consultation and let&apos;s start yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1612] hover:bg-[rgb(255,134,113)] text-white font-sans font-medium text-base transition-all duration-300 hover:-translate-y-0.5">
                Get Free Consultation
              </Link>
              <Link href="https://wa.me/919030444503" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#1A1612] hover:border-[rgb(255,134,113)] text-[#1A1612] hover:text-[rgb(255,134,113)] font-sans font-medium text-base transition-all duration-300">
                Chat on WhatsApp
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
