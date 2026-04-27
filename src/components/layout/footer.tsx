"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowRight,
  Award,
  Star,
  Shield,
  Heart,
  Send,
} from "lucide-react";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Portfolio", href: "/portfolio" },
  { label: "Design Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICES = [
  { label: "Home Interiors", href: "/services/full-home-interiors" },
  { label: "Modular Kitchen", href: "/services/modular-kitchen" },
  { label: "Living Room Design", href: "/services/living-room-interiors" },
  { label: "Bedroom Design", href: "/services/bedroom-interiors" },
  { label: "Wardrobe & Storage", href: "/services/wardrobe-design" },
  { label: "Luxury Furniture", href: "/services/luxury-furniture" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/aliignspace",
    icon: <Instagram className="w-4 h-4" />,
    color: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/aliignspace",
    icon: <Facebook className="w-4 h-4" />,
    color: "hover:bg-[#1877F2]",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@aliignspace",
    icon: <Youtube className="w-4 h-4" />,
    color: "hover:bg-[#FF0000]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919030444503",
    icon: <MessageCircle className="w-4 h-4" />,
    color: "hover:bg-[#25D366]",
  },
];

const AWARDS = [
  { icon: <Award className="w-5 h-5 text-terracotta-400" />, label: "Best Interior Studio 2023" },
  { icon: <Star className="w-5 h-5 text-terracotta-400" />, label: "5-Star Rated on Google" },
  { icon: <Shield className="w-5 h-5 text-terracotta-400" />, label: "Trusted by 500+ Families" },
];

// ─── Section Heading ─────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-[0.15em] text-white uppercase mb-6 flex items-center gap-2">
      <span className="block w-4 h-[1px] bg-terracotta-500" />
      {children}
    </h3>
  );
}

// ─── Newsletter Component ────────────────────────────────────────────────────

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="mt-6">
      <p className="text-xs text-white/50 mb-3">
        Subscribe for design tips and exclusive offers.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-terracotta-500/50 focus:ring-1 focus:ring-terracotta-500/30 transition-all"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-terracotta-500/20 border border-terracotta-500/30 rounded-lg text-terracotta-400 hover:bg-terracotta-500 hover:text-white transition-all duration-200"
          aria-label="Subscribe"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-xs text-green-400">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">Please enter a valid email.</p>
      )}
    </div>
  );
}

// ─── Copyright Component ─────────────────────────────────────────────────────

function CopyrightBar() {
  const year = 2026;

  return (
    <div className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Copyright Text */}
          <p className="text-xs text-white/40 text-center lg:text-left">
            Copyright &copy; {year}{" "}
            <span className="text-white/60 font-medium">Alignspace</span>.
            Designed with{" "}
            <Heart className="w-3 h-3 inline-block text-red-500 animate-pulse fill-red-500" />{" "}
            by{" "}
            <a
              href="https://amalyte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors duration-200 hover:underline underline-offset-2"
            >
              Amalyte
            </a>
            . All Rights Reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/15 text-xs">·</span>
            <Link
              href="/terms"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-white/15 text-xs">·</span>
            <Link
              href="/sitemap"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer Component ────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white relative overflow-hidden">
      {/* Subtle top terracotta accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-terracotta-500 to-transparent opacity-60" />

      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #d46546 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #d46546 0%, transparent 70%)" }}
      />

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Column 1 — Brand (spans 3) */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-5">
              <Image src="/logo.png" alt="ALIIGNSPACE" width={400} height={100} className="h-20 w-auto object-contain brightness-0 invert" />
            </Link>

            <p className="text-xs font-semibold tracking-widest text-terracotta-400 uppercase mb-4">
              Spaces Crafted with Trust
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Cleaner designs. Sharper strategies. Spaces that become homes.
              Crafting interiors across Hyderabad &amp; Nellore since 2021.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-transparent transition-all duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Est. badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="text-[10px] text-white/40 tracking-widest uppercase">Est.</span>
              <span className="text-terracotta-400 text-sm font-semibold">2021</span>
            </div>
          </div>

          {/* Column 2 — Quick Links (spans 2) */}
          <div className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-terracotta-300 transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-terracotta-400 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services (spans 2) */}
          <div className="lg:col-span-2">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-terracotta-300 transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-terracotta-400 flex-shrink-0" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact (spans 3) */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-terracotta-500/10 border border-terracotta-500/20 flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4 text-terracotta-400" />
                </div>
                <div>
                  <p className="text-sm text-white/70">NBR Towers, Road No. 36</p>
                  <p className="text-xs text-white/35">Jawahar Colony, Jubilee Hills</p>
                  <p className="text-xs text-white/35">Hyderabad, Telangana 500033</p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-terracotta-500/10 border border-terracotta-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-terracotta-400" />
                </div>
                <a
                  href="tel:+919030444503"
                  className="text-sm text-white/70 hover:text-terracotta-300 transition-colors"
                >
                  +91 90304 44503
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-terracotta-500/10 border border-terracotta-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-terracotta-400" />
                </div>
                <a
                  href="mailto:hello@aliignspace.com"
                  className="text-sm text-white/70 hover:text-terracotta-300 transition-colors"
                >
                  hello@aliignspace.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919030444503"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366] hover:text-white transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Column 5 — Newsletter (spans 2) */}
          <div className="lg:col-span-2">
            <FooterHeading>Newsletter</FooterHeading>
            <p className="text-sm text-white/50 leading-relaxed">
              Stay updated with our latest projects, design trends, and exclusive offers delivered to your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* ── Awards / Certifications row ──────────────────────────────────── */}
        <div className="mt-14 py-6 border-y border-white/[0.07]">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {AWARDS.map((award) => (
              <div key={award.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-terracotta-500/10 border border-terracotta-500/20 flex items-center justify-center">
                  {award.icon}
                </div>
                <span className="text-xs text-white/40 font-medium tracking-wide">
                  {award.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom bar with Copyright ─────────────────────────────────────── */}
      <CopyrightBar />
    </footer>
  );
}
