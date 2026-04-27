import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About ALIIGNSPACE | Interior Designers in Hyderabad & Nellore",
  description:
    "Meet the team behind ALIIGNSPACE — a boutique interior design studio founded in 2021 by Ar. Samhitha Nagasamudra and Ar. Murali. Built on trust, transparency, and obsessive attention to detail across Hyderabad and Nellore.",
  keywords: [
    "about aliignspace",
    "interior design studio hyderabad",
    "best interior designers hyderabad",
    "aliignspace founders",
    "ar samhitha nagasamudra",
    "interior designers nellore",
    "boutique interior design india",
  ],
  openGraph: {
    title: "About ALIIGNSPACE | Spaces Crafted with Trust",
    description:
      "A boutique interior design studio built on trust, transparency, and an obsessive attention to detail. Serving Hyderabad and Nellore since 2021.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "ALIIGNSPACE Interior Design Studio",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── 1. HERO ── */}
        <section className="relative min-h-[65vh] flex items-end pb-20 pt-32 bg-[#1A1612] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="ALIIGNSPACE interior design"
              fill
              className="object-cover opacity-15"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/80 to-[#1A1612]/30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[#D46546] font-sans text-sm uppercase tracking-widest mb-5">
              Interior Designers · Hyderabad &amp; Nellore
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Crafting Spaces That{" "}
              <em className="text-[#D46546] not-italic">Tell Your Story</em>
            </h1>
            <p className="font-sans text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
              We are ALIIGNSPACE — a boutique interior design studio built on
              trust, transparency, and an obsessive attention to detail.
            </p>
          </div>
        </section>

        {/* ── 2. STORY ── */}
        <section className="py-24 lg:py-32 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#D46546] font-sans text-sm uppercase tracking-widest mb-4">
                  Our Story
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612] leading-tight mb-8">
                  Built on a single belief
                </h2>
                <p className="font-sans text-[#1A1612]/70 text-base leading-relaxed mb-5">
                  At ALIIGNSPACE, we saw a gap in the industry — a lack of
                  transparency, missed deadlines, and designs that didn't truly
                  reflect the homeowner's personality. We knew we could do
                  better.
                </p>
                <p className="font-sans text-[#1A1612]/70 text-base leading-relaxed mb-10">
                  Founded in 2021, we set out with one clear mission: every
                  estimate explained, every timeline in writing, and what you
                  approve is exactly what you get.
                </p>
                <blockquote className="bg-[#1A1612] text-white p-6 rounded-lg">
                  <p className="font-serif italic text-lg leading-relaxed mb-4">
                    "Not lack of options, but lack of trust is the problem. We
                    all need to experience trust to make a decision."
                  </p>
                  <footer className="font-sans text-sm text-white/60">
                    — Ar. Samhitha Nagasamudra, Founder
                  </footer>
                </blockquote>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="ALIIGNSPACE beautifully designed interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. STATS BAR ── */}
        <section className="bg-[#1A1612] py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {[
                { number: "50+", label: "Homes Transformed" },
                { number: "5+", label: "Years of Excellence" },
                { number: "2", label: "Cities Served" },
                { number: "4.9★", label: "Google Rating" },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p className="font-serif text-4xl sm:text-5xl text-[#D46546] mb-2">
                    {number}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. MISSION & VISION ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <p className="text-[#D46546] font-sans text-sm uppercase tracking-widest mb-4">
                Our Purpose
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612]">
                What Drives Us
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#f9f7f4] p-10 rounded-2xl">
                <div className="w-12 h-12 bg-[#D46546]/10 border border-[#D46546]/20 rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-[#D46546] text-xl font-bold">
                    M
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#1A1612] mb-4">
                  Our Mission
                </h3>
                <p className="font-sans text-[#1A1612]/70 text-base leading-relaxed">
                  To transform houses into homes that reflect the unique
                  personality and lifestyle of each family we serve, delivering
                  exceptional quality with complete transparency.
                </p>
              </div>
              <div className="bg-[#1A1612] p-10 rounded-2xl">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-[#D46546] text-xl font-bold">
                    V
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">
                  Our Vision
                </h3>
                <p className="font-sans text-white/70 text-base leading-relaxed">
                  To be the most trusted interior design partner across India,
                  known for our integrity, innovation, and unwavering commitment
                  to client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FOUNDERS ── */}
        <section className="py-24 bg-[#f9f7f4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <p className="text-[#D46546] font-sans text-sm uppercase tracking-widest mb-4">
                The Team
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612]">
                Meet Our Founders
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                {
                  initials: "SN",
                  name: "Ar. Samhitha Nagasamudra",
                  role: "Founder & Principal Architect",
                  bio: "An architect with a passion for creating spaces that tell stories. She leads every project with a vision for beauty, function, and lasting trust.",
                },
                {
                  initials: "AM",
                  name: "Ar. Murali",
                  role: "Co-Founder & Operations Director",
                  bio: "Ensuring every project runs smoothly, on time, and within budget. Murali is the backbone of every successful ALIIGNSPACE handover.",
                },
              ].map(({ initials, name, role, bio }) => (
                <div key={name} className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-20 h-20 bg-[#D46546]/10 border border-[#D46546]/20 rounded-full flex items-center justify-center mb-6">
                    <span className="font-serif text-[#D46546] text-xl font-semibold">
                      {initials}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#1A1612] mb-1">
                    {name}
                  </h3>
                  <p className="font-sans text-[#D46546] text-xs uppercase tracking-widest mb-4">
                    {role}
                  </p>
                  <p className="font-sans text-[#1A1612]/70 text-sm leading-relaxed">
                    {bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. VALUES GRID ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1612]">
                Our Values
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Trust",
                  body: "We believe transparency builds lasting relationships.",
                },
                {
                  num: "02",
                  title: "Quality",
                  body: "Only the best materials and craftsmanship make the cut.",
                },
                {
                  num: "03",
                  title: "Innovation",
                  body: "We constantly evolve our designs and processes.",
                },
                {
                  num: "04",
                  title: "Integrity",
                  body: "We do what we say, and we say what we do.",
                },
                {
                  num: "05",
                  title: "Collaboration",
                  body: "Your vision + our expertise = your dream home.",
                },
                {
                  num: "06",
                  title: "Passion",
                  body: "We love what we do, and it shows in every project.",
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="bg-[#f9f7f4] p-6 rounded-xl">
                  <p className="font-sans text-[#D46546] text-xs font-semibold tracking-widest mb-3">
                    {num}
                  </p>
                  <h3 className="font-serif text-lg text-[#1A1612] mb-2">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-[#1A1612]/60 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. TIMELINE ── */}
        <section className="py-24 bg-[#1A1612]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl sm:text-5xl text-white">
                Our Journey
              </h2>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-white/10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  {
                    year: "2021",
                    title: "Founded",
                    desc: "ALIIGNSPACE was established in Hyderabad with a vision to redefine trust in interior design.",
                  },
                  {
                    year: "2022",
                    title: "First 100 Projects",
                    desc: "Crossed 100 successful project deliveries, earning the trust of families across Hyderabad.",
                  },
                  {
                    year: "2023",
                    title: "Expansion to Nellore",
                    desc: "Opened operations in Nellore, bringing our design philosophy to a new city.",
                  },
                  {
                    year: "2024",
                    title: "500+ Homes Transformed",
                    desc: "Celebrated transforming over 500 homes with our signature blend of trust and craftsmanship.",
                  },
                ].map(({ year, title, desc }) => (
                  <div key={year} className="relative text-center lg:text-left">
                    <div className="hidden lg:flex justify-center mb-6">
                      <div className="w-4 h-4 rounded-full bg-[#D46546] ring-4 ring-[#D46546]/20 relative z-10" />
                    </div>
                    <p className="font-serif text-4xl text-[#D46546] mb-2">
                      {year}
                    </p>
                    <h3 className="font-sans text-white font-semibold text-base mb-2">
                      {title}
                    </h3>
                    <p className="font-sans text-white/50 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. CTA ── */}
        <section className="py-24 bg-[#D46546]">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-5">
              Ready to Begin Your Journey?
            </h2>
            <p className="font-sans text-white/80 text-lg mb-10">
              Let's create a space that truly reflects you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#D46546] font-sans font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="https://wa.me/919030444503"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white text-white font-sans font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
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
