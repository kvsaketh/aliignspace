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
        // ALIIGNSPACE logo palette — blue #3b4fea, violet #8b5cd8, amber #f2a03c
        brand: {
          blue: "#3b4fea",
          violet: "#8b5cd8",
          amber: "#f2a03c",
        },
        // `coral` classes -> logo BLUE ramp (spreads blue across existing usages)
        coral: {
          50: "hsl(233, 90%, 96%)",
          100: "hsl(233, 88%, 92%)",
          200: "hsl(233, 86%, 86%)",
          300: "hsl(233, 84%, 78%)",
          400: "hsl(233, 82%, 70%)",
          500: "#3b4fea",
          600: "hsl(233, 76%, 55%)",
          700: "hsl(233, 70%, 47%)",
          800: "hsl(233, 64%, 39%)",
          900: "hsl(233, 58%, 32%)",
          950: "hsl(233, 60%, 20%)",
        },
        // amber accents introduced via these tokens
        "coral-light": "hsl(33, 88%, 62%)",
        peach: "hsl(36, 92%, 88%)",
        salmon: "hsl(33, 88%, 66%)",
        // `terracotta` classes -> logo VIOLET ramp (#8b5cd8), matches --primary
        terracotta: {
          50: "hsl(263, 72%, 96%)",
          100: "hsl(263, 70%, 92%)",
          200: "hsl(263, 66%, 87%)",
          300: "hsl(263, 63%, 80%)",
          400: "hsl(263, 61%, 71%)",
          500: "#8b5cd8",
          600: "hsl(263, 55%, 54%)",
          700: "hsl(263, 52%, 46%)",
          800: "hsl(263, 50%, 38%)",
          900: "hsl(263, 48%, 31%)",
          950: "hsl(263, 52%, 20%)",
        },
        // Neutrals retuned cool/lavender for the purple makeover
        cream: {
          50: "hsl(265, 40%, 99%)",
          100: "hsl(265, 38%, 98%)",
          200: "hsl(265, 30%, 95%)",
          300: "hsl(265, 25%, 91%)",
          400: "hsl(265, 20%, 85%)",
          500: "hsl(265, 16%, 78%)",
          600: "hsl(265, 12%, 66%)",
          700: "hsl(265, 10%, 52%)",
          800: "hsl(265, 10%, 40%)",
          900: "hsl(265, 12%, 28%)",
          950: "hsl(265, 15%, 16%)",
        },
        "warm-white": "hsl(265, 40%, 99%)",
        stone: {
          50: "hsl(260, 24%, 97%)",
          100: "hsl(260, 22%, 94%)",
          200: "hsl(260, 18%, 89%)",
          300: "hsl(260, 15%, 82%)",
          400: "hsl(260, 12%, 72%)",
          500: "hsl(260, 11%, 62%)",
          600: "hsl(260, 11%, 52%)",
          700: "hsl(260, 12%, 43%)",
          800: "hsl(260, 13%, 34%)",
          900: "hsl(260, 15%, 26%)",
          950: "hsl(260, 18%, 16%)",
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
