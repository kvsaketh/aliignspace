import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ALIIGNSPACE logo palette — deep violet #6D28D9, gold #FF9900 (blue removed)
        brand: {
          violet: "#6D28D9",
          amber: "#FF9900",
        },
        // `coral` classes -> logo AMBER ramp (spreads amber across existing usages)
        coral: {
          50: "hsl(36, 100%, 96%)",
          100: "hsl(36, 100%, 92%)",
          200: "hsl(36, 100%, 86%)",
          300: "hsl(36, 100%, 78%)",
          400: "hsl(36, 100%, 68%)",
          500: "#FF9900",
          600: "hsl(36, 100%, 40%)", // #CC7A00 hover
          700: "hsl(36, 100%, 33%)",
          800: "hsl(36, 90%, 27%)",
          900: "hsl(36, 80%, 22%)",
          950: "hsl(36, 80%, 14%)",
        },
        // amber accents introduced via these tokens
        "coral-light": "hsl(36, 100%, 50%)",
        peach: "hsl(36, 100%, 88%)",
        salmon: "hsl(36, 100%, 55%)",
        // `terracotta` classes -> logo violet ramp (#6D28D9), matches --primary
        // Saturation pulled down from the original 100% (electric/neon) to a
        // deeper, more premium tone — same hue (264°), softer everywhere it's used.
        terracotta: {
          50: "hsl(264, 60%, 97%)",
          100: "hsl(264, 55%, 94%)",
          200: "hsl(264, 55%, 88%)",
          300: "hsl(264, 55%, 80%)",
          400: "hsl(264, 60%, 65%)",
          500: "#6D28D9",
          600: "hsl(264, 69%, 43%)", // #5B21B6-ish hover
          700: "hsl(264, 70%, 36%)",
          800: "hsl(264, 68%, 30%)",
          900: "hsl(264, 65%, 24%)",
          950: "hsl(264, 65%, 15%)",
        },
        // Neutrals: previously tinted lavender/purple site-wide (a leftover
        // "purple makeover") which made every background/border/text read as
        // off-white or off-black instead of neutral — flattened to true near-0
        // saturation grays so purple only reads where it's an intentional accent.
        cream: {
          50: "hsl(30, 20%, 99%)",
          100: "hsl(30, 15%, 97%)",
          200: "hsl(30, 10%, 95%)",
          300: "hsl(30, 8%, 91%)",
          400: "hsl(30, 6%, 85%)",
          500: "hsl(30, 4%, 78%)",
          600: "hsl(30, 3%, 66%)",
          700: "hsl(30, 3%, 52%)",
          800: "hsl(30, 3%, 40%)",
          900: "hsl(30, 4%, 28%)",
          950: "hsl(30, 5%, 16%)",
        },
        "warm-white": "hsl(30, 20%, 99%)",
        stone: {
          50: "hsl(30, 8%, 97%)",
          100: "hsl(30, 7%, 94%)",
          200: "hsl(30, 6%, 89%)",
          300: "hsl(30, 5%, 82%)",
          400: "hsl(30, 4%, 72%)",
          500: "hsl(30, 4%, 62%)",
          600: "hsl(30, 4%, 52%)",
          700: "hsl(30, 4%, 43%)",
          800: "hsl(30, 5%, 34%)",
          900: "hsl(30, 5%, 26%)",
          950: "hsl(30, 6%, 16%)",
        },
        charcoal: "#2B2D42",
        slate: {
          50: "#f4f4f7",
          100: "#e4e4eb",
          200: "#cbcbd8",
          300: "#a8a9be",
          400: "#7e80a0",
          500: "#4A4E69",
          600: "#42455f",
          700: "#383a50",
          800: "#313344",
          900: "#2c2d3a",
          950: "#1a1a24",
        },
        "aliign-muted": "#8D99AE",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "16px",
        xl: "12px",
        DEFAULT: "8px",
        full: "9999px",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(180, 149, 245, 0.12)",
        card: "0 8px 32px rgba(43, 45, 66, 0.12)",
        elevated: "0 16px 48px rgba(43, 45, 66, 0.16)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
