import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConsultationBlock } from "@/components/blocks/consultation";
import { ProcessSteps } from "@/components/process-steps";

export const metadata: Metadata = {
  title: "Our Design Process | ALIIGNSPACE — How We Work",
  description:
    "Discover ALIIGNSPACE's transparent 4-step interior design process — from first consultation to final handover. No surprises. No hidden costs. Just beautiful homes delivered on time.",
};

const faqs = [
  {
    q: "Do I need to be present during the project?",
    a: "No. We handle everything — from procurement to daily supervision. You'll receive weekly updates and can visit the site whenever you like, but it's not required.",
  },
  {
    q: "What happens if there are changes mid-project?",
    a: "Any changes are documented in writing with cost implications clearly stated before proceeding. We never make changes or additions without your explicit approval.",
  },
  {
    q: "How do payments work?",
    a: "We follow a milestone-based payment schedule tied to project phases — so you pay as work progresses, not upfront. All payment terms are outlined in the contract before we start.",
  },
  {
    q: "What warranty do you provide?",
    a: "All furniture and fabrication comes with a 1-year workmanship warranty. Branded products carry manufacturer warranties. We stand behind our work.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden bg-[#1C1917]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
              alt="ALIIGNSPACE Design Process"
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              How We Work
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight max-w-3xl">
              A process built on{" "}
              <em className="not-italic italic text-[#D46546]">transparency</em>
            </h1>
            <p className="font-sans text-lg text-white/60 mt-4 max-w-xl">
              Five clear steps. Zero surprises. One beautiful home — delivered in 60–90 days.
            </p>
          </div>
        </section>

        {/* Process Overview Strip */}
        <section className="bg-[#D46546] py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {["Meet Designer", "Visualise Home", "Freeze Design", "Execution Begins", "Happy Handover"].map((step, i) => (
                <div key={step} className="flex items-center justify-center gap-3">
                  <span className="font-serif text-white/40 text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-sans text-white text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Steps — illustrated */}
        <ProcessSteps />

        {/* Timeline visual */}
        <section className="py-20 bg-[#1C1917]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
                Project Timeline
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white">
                From first call to keys in 60–90 days
              </h2>
            </div>
            <div className="relative max-w-4xl mx-auto">
              {/* Connecting line */}
              <div className="absolute top-8 left-8 right-8 h-px bg-[#D46546]/30 hidden sm:block" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { phase: "Week 1", label: "Consultation & Site Visit" },
                  { phase: "Week 2–3", label: "3D Design & BOQ Approval" },
                  { phase: "Week 4–10", label: "Fabrication & Execution" },
                  { phase: "Week 11–13", label: "Installation & Handover" },
                ].map((item, i) => (
                  <div key={item.phase} className="relative flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#D46546]/10 border border-[#D46546]/30 flex items-center justify-center mb-4 relative z-10">
                      <span className="font-serif text-[#D46546] text-sm font-medium">{i + 1}</span>
                    </div>
                    <span className="font-sans text-xs text-[#D46546] font-semibold tracking-wider uppercase block mb-1">{item.phase}</span>
                    <span className="font-sans text-white/60 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-[#F9F5ED]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
                Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917]">
                About our process
              </h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-7 shadow-sm">
                  <h3 className="font-serif text-lg font-medium text-[#1C1917] mb-3">{faq.q}</h3>
                  <p className="font-sans text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-4">
              Ready to start your project?
            </h2>
            <p className="font-sans text-stone-500 mb-8 max-w-md mx-auto">
              The first step is just a conversation. Let&apos;s talk about your space.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#D46546] hover:bg-[#c44d32] text-white font-sans font-semibold px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#D46546]/25 group"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919030444503"
                className="inline-flex items-center gap-2 border border-[#1C1917] text-[#1C1917] font-sans font-medium px-8 py-4 hover:bg-[#1C1917] hover:text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                +91 90304 44503
              </a>
            </div>
          </div>
        </section>

        <ConsultationBlock
          title="Let&apos;s Begin Your Project"
          subtitle="Drop your number and we'll call you back within 24 hours to schedule your free consultation."
        />
      </main>
      <Footer />
    </>
  );
}
