/**
 * Shared data contract for ALIIGNSPACE service seed content.
 *
 * Every service object written into a group file MUST satisfy `ServiceSeed`.
 * The detail page (`src/app/services/[slug]/page.tsx`) reads exactly these
 * fields, so the shapes here are the single source of truth.
 */

export interface ProcessStep {
  /** e.g. "Meet Designer" */
  title: string;
  /** e.g. "Day 1–3" */
  duration: string;
  /** 1–2 sentence explanation of what happens in this step */
  detail: string;
}

export interface HeroStat {
  /** e.g. "500+", "90 Days", "10 Yr" */
  value: string;
  /** e.g. "Homes Delivered" */
  label: string;
}

export interface Inclusion {
  /** Short scope-item title, e.g. "Bespoke Cabinetry" */
  title: string;
  /** 1–2 sentences describing the deliverable */
  description: string;
}

export interface Material {
  /** Material or brand name, e.g. "Hettich Hardware" */
  name: string;
  /** Why it matters / what it is */
  description: string;
}

export interface DesignStyle {
  /** Style name, e.g. "Contemporary Minimal" */
  name: string;
  /** 1–2 sentence description of the look */
  description: string;
  /** Unsplash image URL, w=800&q=80 */
  image: string;
}

export interface PricingTier {
  /** Tier name, e.g. "Essential", "Signature", "Bespoke" */
  name: string;
  /** Display price, e.g. "₹3.5L – ₹6L" */
  price: string;
  /** One-line positioning of the tier */
  description: string;
  /** 4–6 bullet points of what the tier includes */
  features: string[];
  /** Exactly one tier in the array should be highlighted */
  highlighted: boolean;
}

export interface WhyChooseItem {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Testimonial {
  /** The full quote, no surrounding quotation marks */
  quote: string;
  name: string;
  /** e.g. "3BHK Homeowner" */
  role: string;
  /** e.g. "Gachibowli, Hyderabad" */
  location: string;
}

/** Rich detail-page content stored in the `Service.content` JSON column. */
export interface ServiceContent {
  /** Hero eyebrow line, e.g. "Turnkey home transformation" */
  tagline: string;
  /** 3–4 punchy stats shown in the hero band */
  heroStats: HeroStat[];
  /** Long-form intro section */
  intro: { heading: string; body: string };
  /** 6 scope/deliverable cards */
  inclusions: Inclusion[];
  /** 5–6 materials & brand-partner items */
  materials: Material[];
  /** 3–4 design styles offered for this service */
  designStyles: DesignStyle[];
  /** Exactly 3 pricing tiers */
  pricingTiers: PricingTier[];
  /** 4 reasons-to-choose items */
  whyChoose: WhyChooseItem[];
  /** 6–8 FAQ entries */
  faqs: Faq[];
  /** One customer testimonial */
  testimonial: Testimonial;
}

/** Full seed object — maps 1:1 onto the Prisma `Service` model. */
export interface ServiceSeed {
  title: string;
  slug: string;
  /** 2–4 word card eyebrow, e.g. "Complete transformation" */
  shortDesc: string;
  /** Rich card/hero paragraph, ~60–100 words */
  description: string;
  /** Card image — Unsplash URL, w=800&q=80 */
  image: string;
  /** Hero background — Unsplash URL, w=1920&q=80 */
  heroImage: string;
  sortOrder: number;
  /** 8–12 "everything you get" bullet strings */
  features: string[];
  /** Exactly 5 process steps */
  processSteps: ProcessStep[];
  stats: { priceRange: string; deliveryTime: string; warranty: string };
  /** 6–8 gallery image URLs — Unsplash, w=800&q=80 */
  gallery: string[];
  content: ServiceContent;
}
