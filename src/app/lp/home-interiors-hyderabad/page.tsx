import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check, MessageCircle, Phone, Plus, X } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LeadForm } from "@/components/landing/lead-form";
import { YouTubeFacade } from "@/components/landing/youtube-facade";
import { ProjectGallery } from "@/components/landing/project-gallery";
import { MotionRoot } from "@/components/landing/motion-root";
import { ClientWins } from "@/components/landing/client-wins";
import { AliignspaceGoogleReviews } from "@/components/blocks/aliignspace-google-reviews";
import { GOOGLE_REVIEWS, GOOGLE_SCORE } from "@/lib/google-reviews";
import {
  PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF,
  heroPoints, resultVideos, steps, comparison, beforeAfter, usps, faqs, closing,
} from "@/components/landing/content";

// Paid-traffic page: kept out of search and free of site navigation.
export const metadata: Metadata = {
  title: "Home Interiors in Hyderabad — Free 3D Design Consultation | ALIIGNSPACE",
  description:
    "See up to 70% of your home designed in 3D before you commit, with one clear, scope-wise quote and zero hidden charges. Book a free home interiors consultation with ALIIGNSPACE, Hyderabad.",
  robots: { index: false, follow: false },
};

const GTAG_ID = "GT-MQ7XLH4";
const CLARITY_ID = "tx64kr0x5j";

// The old page's hidden placeholder testimonials (Sara / Judith / Rohan) were template filler, so they're
// replaced by the real Google reviews below.

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.3em]";

function CtaButton({ children = "Start your free consultation", dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href="#enquire"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition ${
        dark ? "bg-[#D4A853] text-[#1a1720] hover:bg-[#E2B866]" : "bg-[#4E2585] text-white hover:bg-[#3B1868]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

function SectionHead({ kicker, children, sub, dark = false, center = true }: { kicker: string; children: React.ReactNode; sub?: string; dark?: boolean; center?: boolean }) {
  return (
    <ScrollReveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p className={`${eyebrow} ${dark ? "text-[#E2B866]" : "text-[#B8893A]"}`}>{kicker}</p>
      <h2 className={`mt-4 [text-wrap:balance] font-serif text-[40px] leading-[1.05] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#1a1720]"} [&_em]:italic ${dark ? "[&_em]:text-[#E2B866]" : "[&_em]:text-[#4E2585]"}`}>
        {children}
      </h2>
      {sub && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/65" : "text-[#1a1720]/65"}`}>{sub}</p>}
    </ScrollReveal>
  );
}

export default function LandingPage() {
  return (
    <MotionRoot>

      {/* ── Logo bar ─────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#1a1720]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Image src="/lp/logo-white.png" alt="ALIIGNSPACE" width={990} height={140} priority className="h-6 w-auto lg:h-8" />
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={PHONE_HREF} className="hidden items-center gap-2 text-sm font-medium text-white/80 hover:text-white md:inline-flex">
              <Phone className="h-4 w-4 text-[#D4A853]" /> {PHONE_DISPLAY}
            </a>
            <a href={PHONE_HREF} aria-label={`Call ${PHONE_DISPLAY}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#D4A853] md:hidden">
              <Phone className="h-4 w-4" />
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full border border-[#D4A853]/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A853] transition hover:bg-[#D4A853] hover:text-[#1a1720] sm:inline-flex">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href="#enquire" className="hidden rounded-full bg-[#D4A853] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1720] transition hover:bg-[#E2B866] sm:inline-flex">
              Free consultation
            </a>
          </div>
        </div>
      </header>

      <main className="bg-[#F7F5F1] pb-20 font-sans text-[#1a1720] sm:pb-0">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1a1720] pt-16 lg:pt-20">
          <Image src="/lp/project-living-room-5.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1720] via-[#1a1720]/85 to-[#1a1720]/60" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
            {/* No reveal animation in the hero: it must paint before hydration (LCP). */}
            <div>
              <p className={`${eyebrow} text-[#E2B866]`}>Hyderabad · Premium home interiors</p>
              <h1 className="mt-5 font-serif text-[52px] leading-[0.98] text-white sm:text-7xl lg:text-[88px]">
                Home interiors <em className="block italic text-[#E2B866]">in Hyderabad</em>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                Choose us with trust, and let us build your dream home.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:hidden">
                <CtaButton dark>Get a free consultation</CtaButton>
              </div>
              <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {heroPoints.map((p) => (
                  <li key={p.title} className="flex flex-col gap-3 bg-[#1a1720]/70 p-4 backdrop-blur sm:flex-row sm:items-start sm:gap-4 sm:p-5">
                    <Image src={p.icon} alt="" width={44} height={44} className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-white">{p.title}</p>
                      <p className="mt-1 text-[13px] text-white/55">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div id="enquire" className="scroll-mt-24">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* ── Real results ──────────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="Client stories" sub="Check out real results, straight from the home owners we’ve worked with.">
              Real results from <em>real home owners</em>
            </SectionHead>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {resultVideos.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 0.1}>
                  <YouTubeFacade id={v.id} title={v.title} />
                  <p className="mt-3 font-serif text-xl text-[#1a1720]">{v.title}</p>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-12 text-center"><CtaButton /></div>
          </div>
        </section>

        {/* ── Client wins ───────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="Client wins" sub="Unedited messages and reviews from home owners after handover. Tap any to read it in full.">
              In their messages, <em>not our words</em>
            </SectionHead>
            <div className="mt-12"><ClientWins /></div>
          </div>
        </section>

        <AliignspaceGoogleReviews
          title="Loved by home owners"
          accentWord="across Hyderabad"
          subtitle="Real reviews from our clients on Google"
          googleScore={GOOGLE_SCORE}
          reviewCount="7+"
          reviews={GOOGLE_REVIEWS}
        />

        {/* ── How it works ──────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="How it works" sub="Six clear steps from the first call to the day you move in.">
              From first call <em>to handover</em>
            </SectionHead>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[#3B1868]/10 bg-[#3B1868]/10 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="group relative bg-white p-7 transition hover:bg-[#F7F5F1] sm:p-9">
                  <span className="font-serif text-6xl italic leading-none text-[#B8893A]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-serif text-2xl text-[#1a1720]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#1a1720]/65">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-col items-center gap-4">
              <CtaButton />
              <p className="font-serif text-xl italic text-[#4E2585]">One clear price. Zero stress.</p>
            </div>
          </div>
        </section>

        {/* ── Comparison ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#16141f] py-20 lg:py-28">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#4E2585]/6 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="The ALIIGNSPACE advantage" dark sub="What working with us looks like, next to what most home owners are used to.">
              Not just a quote. <em>A clear plan.</em>
            </SectionHead>

            {/* Desktop: three-column table with the ALIIGNSPACE column raised */}
            <ScrollReveal className="mt-14 hidden lg:block">
              <div className="grid grid-cols-[0.8fr_1.35fr_1fr]">
                <div />
                <div className="rounded-t-3xl border-x border-t border-[#D4A853]/50 bg-[#3B1868] px-8 pb-5 pt-8">
                  <p className={`${eyebrow} text-[#E2B866]`}>With</p>
                  <p className="mt-1 font-serif text-3xl tracking-[0.2em] text-white">ALIIGNSPACE</p>
                </div>
                <div className="flex items-end px-8 pb-5">
                  <p className="font-serif text-2xl text-white/50">Typical brands</p>
                </div>
                {comparison.map((r, i) => (
                  <div key={r.label} className="contents">
                    <div className="flex items-center border-t border-white/10 py-6 pr-6">
                      <p className={`${eyebrow} text-white/55`}>{r.label}</p>
                    </div>
                    <div className={`flex gap-4 border-x border-t border-[#D4A853]/50 border-t-white/10 bg-[#3B1868] px-8 py-6 ${i === comparison.length - 1 ? "rounded-b-3xl border-b" : ""}`}>
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4A853] text-[#1a1720]"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      <div>
                        <p className="font-semibold text-white">{r.us}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">{r.usText}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 border-t border-white/10 px-8 py-6">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/40"><X className="h-3.5 w-3.5" /></span>
                      <p className="text-sm leading-relaxed text-white/50">{r.them}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Mobile / tablet: one card per row */}
            <div className="mt-12 space-y-4 lg:hidden">
              {comparison.map((r) => (
                <ScrollReveal key={r.label}>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <p className={`${eyebrow} bg-white/[0.04] px-5 py-3 text-white/55`}>{r.label}</p>
                    <div className="flex gap-3 border-l-2 border-[#D4A853] bg-[#3B1868] px-5 py-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4A853] text-[#1a1720]"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E2B866]">ALIIGNSPACE</p>
                        <p className="mt-1 font-semibold text-white">{r.us}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">{r.usText}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/40"><X className="h-3.5 w-3.5" /></span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">Typical brands</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/50">{r.them}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-12 text-center"><CtaButton dark /></div>
          </div>
        </section>

        {/* ── Portfolio ─────────────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead kicker="Our work" center={false} sub="Swipe to explore our work, room by room.">
                50+ homes <em>transformed</em>
              </SectionHead>
              <div className="hidden lg:block"><CtaButton /></div>
            </div>
            <div className="mt-10"><ProjectGallery /></div>
            <div className="mt-10 text-center lg:hidden"><CtaButton /></div>
          </div>
        </section>

        {/* ── Before & after ────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="Before & after" sub="Bare site to finished space, photographed on our own projects.">
              See the <em>difference</em>
            </SectionHead>
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {beforeAfter.map((p, i) => (
                <ScrollReveal key={p.after} delay={(i % 2) * 0.1}>
                  <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-3xl">
                    {([["Before", p.before], ["After", p.after]] as const).map(([tag, src]) => (
                      <figure key={tag} className="relative aspect-[4/5] overflow-hidden bg-[#3B1868]/10 sm:aspect-[4/3] lg:aspect-[4/5]">
                        <Image src={src} alt={`${tag} — ALIIGNSPACE project ${i + 1}`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                        <figcaption className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${tag === "After" ? "bg-[#D4A853] text-[#1a1720]" : "bg-[#1a1720]/75 text-white backdrop-blur"}`}>
                          {tag}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── USP ───────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead kicker="Our USP" sub="We make interiors easy in Hyderabad, from start to finish.">
              Why home owners <em>choose us</em>
            </SectionHead>
            <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-5">
              {usps.map((u, i) => (
                <li key={u.title} className={i === usps.length - 1 ? "col-span-2 lg:col-span-1" : ""}>
                  <ScrollReveal delay={i * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-[#3B1868]/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(59,24,104,0.45)] sm:p-7">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3B1868]">
                        <Image src={u.icon} alt="" width={30} height={30} className="h-7 w-7" />
                      </span>
                      <h3 className="mt-5 font-serif text-xl leading-tight text-[#1a1720] sm:text-2xl">{u.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1a1720]/60">{u.text}</p>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col items-center gap-4">
              <CtaButton />
              <p className="font-serif text-xl italic text-[#4E2585]">One clear price. Zero stress.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHead kicker="FAQ" center={false} sub="Straight answers to what home owners ask us most. Still unsure? Talk to us.">
                Still have <em>questions?</em>
              </SectionHead>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-[#4E2585]/30 px-5 py-3 text-sm font-semibold text-[#4E2585] hover:bg-[#4E2585]/5">
                  <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
                </a>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#4E2585]/30 px-5 py-3 text-sm font-semibold text-[#4E2585] hover:bg-[#4E2585]/5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </div>
            <div className="divide-y divide-[#3B1868]/10 border-y border-[#3B1868]/10">
              {faqs.map((f, i) => (
                <details key={f.q} className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-xl leading-snug text-[#1a1720] sm:text-2xl">{f.q}</span>
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#3B1868]/20 text-[#4E2585] transition group-open:rotate-45 group-open:border-[#D4A853] group-open:bg-[#D4A853] group-open:text-[#1a1720]">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="-mt-2 pb-6 pr-14 leading-relaxed text-[#1a1720]/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA + form ────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1a1720] py-20 lg:py-28">
          <Image src="/lp/project-living-room-6.webp" alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1720] via-[#1a1720]/90 to-[#16141f]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">
            <div>
              <SectionHead kicker="Your free consultation" dark center={false}>
                Discover how we can turn your requirements <em>into reality</em>
              </SectionHead>
              <ol className="mt-10 space-y-7">
                {closing.map((c, i) => (
                  <li key={c.title}>
                    <ScrollReveal delay={i * 0.08} className="flex gap-5">
                      <span className="font-serif text-3xl italic leading-none text-[#D4A853]">{String(i + 1).padStart(2, "0")}</span>
                      <div className="border-l border-[#D4A853]/30 pl-5">
                        <p className={`${eyebrow} text-[#E2B866]`}>{c.title}</p>
                        <p className="mt-2 leading-relaxed text-white/70">{c.text}</p>
                      </div>
                    </ScrollReveal>
                  </li>
                ))}
              </ol>
            </div>
            <ScrollReveal delay={0.1}>
              <LeadForm title="Start your free consultation" />
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-[#140726] pb-24 pt-8 text-center text-xs text-white/45 sm:pb-8">
        <p>© {new Date().getFullYear()} ALIIGNSPACE. All rights reserved.</p>
        <Link href="/privacy" className="mt-2 inline-block underline-offset-4 hover:text-white/70 hover:underline">Privacy policy</Link>
      </footer>

      {/* ── Mobile sticky CTA bar ─────────────────────────────── */}
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_auto_1fr] gap-2 border-t border-white/10 bg-[#1a1720]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        <a href={PHONE_HREF} aria-label="Call us" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-[#D4A853]"><Phone className="h-5 w-5" /></a>
        <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-[#D4A853]"><MessageCircle className="h-5 w-5" /></a>
        <a href="#enquire" className="flex h-12 items-center justify-center rounded-full bg-[#D4A853] text-xs font-bold uppercase tracking-[0.14em] text-[#1a1720]">Free consultation</a>
      </nav>

      {/* ── Tracking (this page only) ─────────────────────────── */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
      <Script id="lp-gtag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GTAG_ID}');`}
      </Script>
      <Script id="lp-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
      </Script>
    </MotionRoot>
  );
}
