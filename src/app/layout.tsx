import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CustomCursor } from "@/components/ui/cursor";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { AmbientSound } from "@/components/ui/ambient-sound";
import "lenis/dist/lenis.css";

// ─── Fonts via next/font (zero-CLS, self-hosted, no external request) ─────────

// Display: high-contrast Garamond for editorial luxury; body: clean geometric sans.
// Self-hosted (SIL Open Font License) — Turbopack's Google-font loader fails on Vercel builds.
const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/manrope-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "ALIIGNSPACE — Spaces Crafted with Trust",
  description:
    "Cleaner designs. Sharper strategies. Spaces that become homes. Premium interior design across Hyderabad & Nellore. Est. 2021.",
  keywords: [
    "interior design",
    "Hyderabad",
    "Nellore",
    "modular kitchen",
    "home interiors",
    "ALIIGNSPACE",
  ],
  openGraph: {
    title: "ALIIGNSPACE — Spaces Crafted with Trust",
    description:
      "Premium interior design studio crafting beautiful homes across Hyderabad & Nellore.",
    siteName: "ALIIGNSPACE",
    locale: "en_IN",
    type: "website",
  },
};

// ─── Viewport ──────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16141f",
};

// ─── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="antialiased font-sans overflow-x-hidden" suppressHydrationWarning>
        {children}
        <SmoothScroll />
        <AmbientSound />
        <CustomCursor />
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  );
}
