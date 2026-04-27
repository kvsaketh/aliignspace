"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Sofa,
  BedDouble,
  Briefcase,
  Building2,
  MessageCircle,
  Phone,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

const SERVICES: ServiceItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home Interiors",
    href: "/services/full-home-interiors",
    description: "Complete home transformation from concept to completion",
  },
  {
    icon: <UtensilsCrossed className="w-5 h-5" />,
    label: "Modular Kitchen",
    href: "/services/modular-kitchen",
    description: "Smart, functional kitchens built to perfection",
  },
  {
    icon: <Sofa className="w-5 h-5" />,
    label: "Living Room",
    href: "/services/living-room-interiors",
    description: "Inviting spaces designed for comfort and style",
  },
  {
    icon: <BedDouble className="w-5 h-5" />,
    label: "Bedroom",
    href: "/services/bedroom-interiors",
    description: "Serene retreats crafted for rest and relaxation",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: "Wardrobe & Storage",
    href: "/services/wardrobe-design",
    description: "Precision-designed storage solutions for every space",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    label: "Luxury Furniture",
    href: "/services/luxury-furniture",
    description: "Bespoke furniture pieces crafted to elevate your space",
  },
];

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] z-10">
      <div
        className="h-full bg-terracotta-500 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Services Mega Dropdown ───────────────────────────────────────────────────

function ServicesMegaDropdown({ isScrolled }: { isScrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-terracotta-400 focus:outline-none text-white/90"
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Invisible bridge — fills the gap so mouseLeave doesn't fire mid-travel */}
      <div className="absolute top-full left-0 right-0 h-3" />

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[620px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-200",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        style={{ background: "rgba(28,25,23,0.97)", backdropFilter: "blur(16px)" }}
      >
        {/* Header strip */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <p className="text-xs font-semibold text-terracotta-400 tracking-widest uppercase">
            Our Services
          </p>
          <Link
            href="/services"
            className="text-xs text-white/50 hover:text-terracotta-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-px p-1">
          {SERVICES.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              onClick={() => setOpen(false)}
              className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-150"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-terracotta-500/10 border border-terracotta-500/20 flex items-center justify-center text-terracotta-400 group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-150">
                {service.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-terracotta-300 transition-colors">
                  {service.label}
                </p>
                <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-terracotta-500/5">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 text-sm text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            Book a free consultation today
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-[#1C1917] flex flex-col transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Image src="/logo.png" alt="ALIIGNSPACE" width={300} height={76} className="h-[62px] w-auto object-contain" />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setServicesExpanded((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      servicesExpanded && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    servicesExpanded ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
                      >
                        <span className="text-terracotta-400">{s.icon}</span>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-6 border-t border-white/10 space-y-3">
          <a
            href="https://wa.me/919030444503"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20c05e] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full py-3 rounded-xl bg-terracotta-500 text-white text-sm font-semibold hover:bg-terracotta-600 transition-colors"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#1C1917]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        {/* Scroll progress */}
        <ScrollProgressBar />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28">
            {/* ── Logo ── */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image src="/logo.png" alt="ALIIGNSPACE" width={360} height={90} className="h-[70px] sm:h-20 w-auto object-contain" priority />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <ServicesMegaDropdown key={link.label} isScrolled={isScrolled} />
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-200 hover:text-terracotta-400 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-terracotta-400 after:transition-all after:duration-300 hover:after:w-full pb-0.5",
                      isScrolled ? "text-white/90" : "text-white/90"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Desktop right actions ── */}
            <div className="hidden lg:flex items-center gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919030444503"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 text-white text-sm font-semibold hover:bg-terracotta-600 active:scale-95 transition-all duration-200 shadow-[0_2px_12px_rgba(212,101,70,0.4)]"
              >
                Get Free Consultation
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
