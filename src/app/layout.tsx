import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/cursor";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { Toaster } from "@/components/ui/toaster";

// ─── Fonts via next/font (zero-CLS, self-hosted, no external request) ─────────

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
  themeColor: "#E07A5F",
};

// ─── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased font-sans overflow-x-hidden" suppressHydrationWarning>
        {children}
        <CustomCursor />
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  );
}
