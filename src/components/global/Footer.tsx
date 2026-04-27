"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { label: "Home Interiors", href: "/services/home-interiors" },
  { label: "Modular Kitchen", href: "/services/modular-kitchen" },
  { label: "Living Room", href: "/services/living-room" },
  { label: "Bedroom Design", href: "/services/bedroom" },
  { label: "Office Interiors", href: "/services/office-interiors" },
  { label: "Commercial Spaces", href: "/services/commercial" },
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const POLICIES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/aertsen",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/aertsen",
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/aertsen",
    icon: <Linkedin className="w-4 h-4" />,
  },
];

// ─── Footer Heading ───────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-6">
      {children}
    </h3>
  );
}

// ─── CTA Strip ────────────────────────────────────────────────────────────────

function CTAStrip() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1A1612" }}
    >
      {/* Top accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D46546]/60 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-3xl lg:text-4xl text-white tracking-wide">
              Your Dream Home Awaits
            </h2>
            <p className="mt-3 text-white/50 text-sm max-w-md">
              Schedule a free consultation with our design experts and bring your vision to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "rgb(250,202,194)", color: "#1A1612" }}
            >
              Book Consultation
            </Link>
            <a
              href="tel:+919030444503"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 90304 44503
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

function MainFooter() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">
        {/* Column 1 — Brand + Social */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block mb-5">
            <span className="font-serif text-2xl tracking-[0.15em] text-white">
              aertsen
            </span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
            Premium interior design studio crafting timeless spaces that reflect your personality and elevate everyday living.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#D46546] hover:border-[#D46546] transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Services */}
        <div className="lg:col-span-2 lg:col-start-6">
          <FooterHeading>Services</FooterHeading>
          <ul className="space-y-3">
            {SERVICES.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#D46546] flex-shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Company + Policies */}
        <div className="lg:col-span-2">
          <FooterHeading>Company</FooterHeading>
          <ul className="space-y-3 mb-8">
            {COMPANY.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#D46546] flex-shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <FooterHeading>Legal</FooterHeading>
          <ul className="space-y-3">
            {POLICIES.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#D46546] flex-shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div className="lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                <MapPin className="w-4 h-4 text-[#D46546]" />
              </div>
              <div>
                <p className="text-sm text-white/70">Jubilee Hills</p>
                <p className="text-xs text-white/35">Hyderabad, Telangana 500033</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#D46546]" />
              </div>
              <a
                href="tel:+919030444503"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                +91 90304 44503
              </a>
            </li>

            <li className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#D46546]" />
              </div>
              <a
                href="mailto:hello@aertsen.in"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                hello@aertsen.in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Footer Bottom ────────────────────────────────────────────────────────────

function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center lg:text-left">
            Copyright &copy; {year}{" "}
            <span className="text-white/50 font-medium">Aertsen</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/10 text-xs">·</span>
            <Link
              href="/terms"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-white/10 text-xs">·</span>
            <Link
              href="/sitemap"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer Component ─────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#1A1612" }}>
      {/* Decorative radial blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #D46546 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #D46546 0%, transparent 70%)" }}
      />

      <CTAStrip />
      <MainFooter />
      <FooterBottom />
    </footer>
  );
}
