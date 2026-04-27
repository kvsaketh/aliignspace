"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-[#1A1612] flex flex-col lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-serif text-xl tracking-[0.15em] text-white">
                Aertsen
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-6 py-6 border-t border-white/10 space-y-3">
              <a
                href="tel:+919030444503"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 90304 44503
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{ backgroundColor: "rgb(250,202,194)", color: "#1A1612" }}
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* ── Logo ── */}
            <Link href="/" className="relative z-10 group flex-shrink-0">
              <span
                className={cn(
                  "font-serif text-2xl tracking-[0.15em] transition-colors duration-300",
                  isScrolled ? "text-[#1A1612]" : "text-white"
                )}
              >
                aertsen
              </span>
              <span
                className={cn(
                  "block h-[1px] w-0 transition-all duration-300 group-hover:w-full mt-0.5",
                  isScrolled ? "bg-[#D46546]" : "bg-white/60"
                )}
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 hover:text-[#D46546] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#D46546] after:transition-all after:duration-300 hover:after:w-full pb-0.5",
                    isScrolled ? "text-[#1A1612]/80" : "text-white/90"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop right actions ── */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+919030444503"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-[#D46546]",
                  isScrolled ? "text-[#1A1612]/70" : "text-white/80"
                )}
              >
                <Phone className="w-4 h-4" />
                +91 90304 44503
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "rgb(250,202,194)", color: "#1A1612" }}
              >
                Free Consultation
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                isScrolled
                  ? "text-[#1A1612] hover:bg-[#1A1612]/5"
                  : "text-white hover:bg-white/10"
              )}
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
