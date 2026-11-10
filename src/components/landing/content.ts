// Copy for /lp/home-interiors-hyderabad, carried over from the old WordPress
// "29 October" ad page (landing-source/CONTENT.md) with light grammar fixes only.

export const PHONE_DISPLAY = "+91 90304 44503";
export const PHONE_HREF = "tel:+919030444503";
export const WHATSAPP_HREF =
  "https://wa.me/919030444503?text=" +
  encodeURIComponent("Hi ALIIGNSPACE, I'd like a free consultation for my home interiors.");

export const heroPoints = [
  { icon: "/lp/icon-hero-free-visualisation.png", title: "70% of home designs visualised free of cost", text: "With a clear quote." },
  { icon: "/lp/icon-hero-3d-to-reality.png", title: "3D to reality", text: "Live site examples." },
  { icon: "/lp/icon-hero-client-reviews.png", title: "Multiple client reviews", text: "Building your confidence." },
  { icon: "/lp/icon-hero-one-stop-help.png", title: "One-stop help", text: "For your interiors." },
];

// Hero video on the old page (XHOmBV4js_E) is Elementor's stock "Video Placeholder",
// not an ALIIGNSPACE video, so it is intentionally not used.
export const resultVideos = [
  { id: "Dz-YED47FyQ", title: "Traditional home interiors" },
  { id: "K3rLweAuWXU", title: "Client review — Aparna Serenity" },
  { id: "LSW3I3yPvtA", title: "Dream home delivered" },
];

export const steps = [
  { title: "We call you", text: "Design with purpose. Let’s see if we’re the match you need." },
  { title: "Let’s meet directly", text: "Spend wisely — let us show you how. We bet it’s worth it!" },
  { title: "We’ve got you covered", text: "Your scope, our scope and beyond, with a quote that’s clear and covered." },
  { title: "Sign up to start designing", text: "Your purpose transforms into 3D reality, now." },
  { title: "Build & install", text: "We provide a foolproof plan and keep you in the loop about your home interiors every day." },
  { title: "Handover & support", text: "Your 3D is now a reality. We keep our promise and hand over your home while you smile." },
];

export const comparison = [
  { label: "First meeting", us: "70% visualised", usText: "Not just a quote — multiple designs shown.", them: "Estimates without design leave you guessing." },
  { label: "Scope of work", us: "Budget = scope", usText: "We detail every part of your home interiors.", them: "Hidden issues and missing details often show up as unexpected costs." },
  { label: "Price factor", us: "Zero hidden charges", usText: "All your requirements estimated scope-wise in one go.", them: "Budgets often cover only their work — hidden costs can appear later." },
  { label: "3D to reality", us: "Don’t just take our word", usText: "See how a 3D design transforms into reality.", them: "Not everyone shows how it works in reality." },
  { label: "Modular work", us: "No manual compromises", usText: "We use high-end imported machinery to ensure the finest factory finish.", them: "Many projects lack the precision and careful monitoring they deserve." },
  { label: "Craftsmanship", us: "Skilled hands", usText: "Our expert teams know the ropes — your home is safe with them.", them: "Cutting costs often means fewer experienced hands, which impacts the final quality." },
  { label: "Supervision", us: "Daily updates on your home", usText: "Track progress. Spot mistakes. Stay on schedule.", them: "Many don’t keep you informed consistently." },
  { label: "Selections & support", us: "Our designer supports all your selections", usText: "Furniture, furnishings and every detail to complete your home.", them: "Without full support, you’re left managing everything beyond their scope." },
  { label: "Warranties", us: "We stand by our services", usText: "All warranties explained upfront — in your first meeting.", them: "Many don’t clearly explain what their services or warranties include." },
];

const range = (prefix: string, n: number) => Array.from({ length: n }, (_, i) => `/lp/${prefix}-${i + 1}.webp`);

export const galleries = [
  { key: "living", label: "Living room", images: range("project-living-room", 9) },
  { key: "kitchen", label: "Kitchen", images: range("project-kitchen", 6) },
  { key: "bedroom", label: "Bedroom", images: range("project-bedroom", 10) },
  { key: "bathroom", label: "Bathroom", images: range("project-bathroom", 3) },
];

// Pairs checked visually: same rooms, but shot from different angles, so they're
// shown side by side rather than as a drag-to-compare slider.
export const beforeAfter = [1, 3, 5, 7].map((n) => ({
  before: `/lp/before-after-${n}.webp`,
  after: `/lp/before-after-${n + 1}.webp`,
}));

export const usps = [
  { icon: "/lp/icon-usp-render-to-reality.png", title: "Render-to-reality match", text: "Designed in 3D to match reality." },
  { icon: "/lp/icon-usp-turnkey.png", title: "Turnkey home interiors", text: "We provide complete, reliable home services." },
  { icon: "/lp/icon-usp-3d-quality.png", title: "High-quality 3Ds", text: "Realistic 3D visuals crafted with care." },
  { icon: "/lp/icon-usp-dream-the-theme.png", title: "You dream, we theme", text: "Share your needs and we theme your home." },
  { icon: "/lp/icon-usp-one-estimate.png", title: "One consolidated estimate", text: "One comprehensive estimate for all interiors." },
];

export const faqs = [
  { q: "How are you different from a local carpenter?", a: "We give fresh, clean designs you don’t see often." },
  { q: "Will you show designs before you give the quote?", a: "Yes. You see 3D views first, then a clear quote." },
  { q: "Can I see a finished home you have done?", a: "Yes. We can arrange a visit to a live site so you can touch and see the work." },
  { q: "What materials do you use? How do I trust the quality?", a: "We explain the core material. We can show samples and even cut a panel to show the inside." },
  { q: "Do you handle end-to-end work?", a: "Yes. One team handles all jobs from start to handover." },
  { q: "Do you also help with loose furniture like sofas and beds?", a: "Yes. We work with trusted partners and suggest good pieces." },
  { q: "I don’t know much about interiors. Will you guide me?", a: "Yes. We teach you the basics and keep things simple and honest." },
  { q: "Can you match low prices or give big discounts like others?", a: "We keep fair pricing and one clear offer. No tricks." },
  { q: "How do you manage timelines and scope?", a: "We set the scope and milestones clearly, so work moves on time." },
  { q: "Do you give warranty and after-sales support?", a: "We explain what is covered and for how long, and we stay reachable for fixes and checks." },
];

export const closing = [
  { title: "Agenda", text: "We’ll connect online to understand your requirements and give you a brief about who we are, how we have transformed homes, and what you can expect from us." },
  { title: "We add value", text: "Based on the requirements and plan you share, we prepare a concept 3D presentation and a clear quote that considers our scope of work and payments, your scope, the builder’s scope and beyond. This helps you plan your budget." },
  { title: "Live site visits", text: "We take you to our ongoing and completed sites to build your confidence and show you our work standards." },
];

export const budgetOptions = ["6 – 10 Lakhs", "10 – 15 Lakhs", "15 – 20 Lakhs", "20 – 25 Lakhs", "25+ Lakhs"];
export const floorPlanOptions = ["2 BHK", "3 BHK", "4 BHK", "5 BHK / Penthouse", "Villa", "Bungalow"];
export const timelineOptions = ["Immediately", "Within 3 months", "After 3 months"];
