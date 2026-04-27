import type { WidgetData } from "@/types/builder";

export interface SectionTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  category: "hero" | "content" | "gallery" | "forms" | "other";
  widgets: Omit<WidgetData, "id" | "sectionId" | "createdAt" | "updatedAt">[];
}

export const sectionTemplates: SectionTemplate[] = [
  {
    id: "hero-premium",
    name: "Premium Hero",
    description: "Full-viewport hero with label, heading, subtitle, and CTAs",
    category: "hero",
    widgets: [
      {
        type: "section",
        order: 0,
        parentId: null,
        content: { fullWidth: true },
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "120px",
          paddingBottom: "120px",
        },
      },
      {
        type: "container",
        order: 1,
        parentId: "section-1",
        content: { layout: "flex", direction: "column", justify: "center", align: "center", gap: 24 },
        style: { textAlign: "center" },
      },
      {
        type: "heading",
        order: 2,
        parentId: "container-1",
        content: {
          text: "Spaces Crafted with Trust",
          tag: "h1",
          highlightWords: ["Trust"],
          alignment: "center",
        },
        style: { color: "#ffffff", fontSize: "3.815rem", marginBottom: "1rem" },
      },
      {
        type: "text",
        order: 3,
        parentId: "container-1",
        content: {
          html: "<p>Cleaner designs. Sharper strategies. Spaces that become homes.</p>",
          alignment: "center",
        },
        style: { color: "#ffffff", fontSize: "1.25rem", opacity: 0.9 },
      },
      {
        type: "container",
        order: 4,
        parentId: "container-1",
        content: { layout: "flex", direction: "row", justify: "center", gap: 16 },
        style: { marginTop: "2rem" },
      },
      {
        type: "button",
        order: 5,
        parentId: "container-2",
        content: { label: "Start Your Journey", url: "/contact", variant: "primary" },
        style: { backgroundColor: "#E07A5F", color: "#ffffff" },
      },
      {
        type: "button",
        order: 6,
        parentId: "container-2",
        content: { label: "View Portfolio", url: "#portfolio", variant: "secondary" },
        style: { borderColor: "#ffffff", color: "#ffffff" },
      },
    ],
  },
  {
    id: "story-split",
    name: "Split Story",
    description: "Two-column layout with text and image",
    category: "content",
    widgets: [
      {
        type: "section",
        order: 0,
        parentId: null,
        content: {},
        style: { backgroundColor: "#FDF6F0", paddingTop: "96px", paddingBottom: "96px" },
      },
      {
        type: "container",
        order: 1,
        parentId: "section-1",
        content: { layout: "flex", direction: "row", gap: 48 },
        style: {},
      },
      {
        type: "column",
        order: 2,
        parentId: "container-1",
        content: { width: "60%" },
        style: {},
      },
      {
        type: "heading",
        order: 3,
        parentId: "column-1",
        content: {
          text: "Where trust becomes the foundation",
          tag: "h2",
          highlightWords: ["trust"],
          alignment: "left",
        },
        style: { color: "#2B2D42", fontSize: "3.052rem", marginBottom: "1.5rem" },
      },
      {
        type: "text",
        order: 4,
        parentId: "column-1",
        content: {
          html: "<p>Every home holds a different dream. At Aliignspace, we began with one belief — that the only thing standing between you and your dream home isn't the lack of options. It's the lack of trust.</p>",
          alignment: "left",
        },
        style: { color: "#4A4E69", lineHeight: 1.8 },
      },
      {
        type: "column",
        order: 5,
        parentId: "container-1",
        content: { width: "40%" },
        style: {},
      },
      {
        type: "image",
        order: 6,
        parentId: "column-2",
        content: {
          mediaId: "",
          fallbackUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
          altText: "Interior design showcase",
          objectFit: "cover",
          aspectRatio: "3/4",
          borderRadius: "24px",
        },
        style: { borderRadius: "24px" },
      },
    ],
  },
  {
    id: "contact-cta",
    name: "Contact CTA",
    description: "Gradient CTA section with contact form and info cards",
    category: "forms",
    widgets: [
      {
        type: "section",
        order: 0,
        parentId: null,
        content: {},
        style: {
          background: "linear-gradient(135deg, #E07A5F 0%, #D4765F 50%, #c44d32 100%)",
          paddingTop: "96px",
          paddingBottom: "96px",
        },
      },
      {
        type: "container",
        order: 1,
        parentId: "section-1",
        content: { layout: "flex", direction: "row", gap: 48 },
        style: {},
      },
      {
        type: "column",
        order: 2,
        parentId: "container-1",
        content: { width: "50%" },
        style: {},
      },
      {
        type: "heading",
        order: 3,
        parentId: "column-1",
        content: {
          text: "Choose Us with Trust!",
          tag: "h2",
          alignment: "left",
        },
        style: { color: "#ffffff", fontSize: "3.052rem", marginBottom: "1rem" },
      },
      {
        type: "text",
        order: 4,
        parentId: "column-1",
        content: {
          html: "<p>Let's build Your Dream Home!!</p>",
          alignment: "left",
        },
        style: { color: "#ffffff", fontSize: "1.25rem", opacity: 0.9, marginBottom: "2rem" },
      },
      {
        type: "icon-box",
        order: 5,
        parentId: "column-1",
        content: {
          iconName: "Mail",
          title: "hello@aliignspace.com",
          description: "Email us anytime",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", marginBottom: "1rem" },
      },
      {
        type: "icon-box",
        order: 6,
        parentId: "column-1",
        content: {
          iconName: "Phone",
          title: "+91 9030444512",
          description: "Call us Monday–Saturday",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", marginBottom: "1rem" },
      },
      {
        type: "column",
        order: 7,
        parentId: "container-1",
        content: { width: "50%" },
        style: {},
      },
      {
        type: "contact-form",
        order: 8,
        parentId: "column-2",
        content: {
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: false },
            { name: "message", label: "Message", type: "textarea", required: true },
          ],
          submitLabel: "Send Message",
        },
        style: { backgroundColor: "#FFFBF7", borderRadius: "24px", padding: "32px" },
      },
    ],
  },
  {
    id: "testimonial-carousel",
    name: "Testimonials",
    description: "Client testimonials with quote and author",
    category: "content",
    widgets: [
      {
        type: "section",
        order: 0,
        parentId: null,
        content: {},
        style: { backgroundColor: "#FFFBF7", paddingTop: "96px", paddingBottom: "96px" },
      },
      {
        type: "container",
        order: 1,
        parentId: "section-1",
        content: { layout: "flex", direction: "column", align: "center", gap: 32 },
        style: { textAlign: "center" },
      },
      {
        type: "heading",
        order: 2,
        parentId: "container-1",
        content: {
          text: "Your happiness is the metric",
          tag: "h2",
          alignment: "center",
        },
        style: { color: "#2B2D42", fontSize: "3.052rem", marginBottom: "2rem" },
      },
      {
        type: "testimonial",
        order: 3,
        parentId: "container-1",
        content: {
          quote: "We finalised designs and with utmost trust handed over keys for execution... happy & satisfied with output and also experience over all.",
          author: "Happy Homeowner",
          role: "Jubilee Hills, Hyderabad",
          rating: 5,
        },
        style: {
          backgroundColor: "#FDF6F0",
          borderLeftColor: "#E07A5F",
          borderLeftWidth: "4px",
          padding: "2rem",
          maxWidth: "800px",
        },
      },
    ],
  },
  {
    id: "features-grid",
    name: "Features Grid",
    description: "2x2 grid of feature cards with icons",
    category: "content",
    widgets: [
      {
        type: "section",
        order: 0,
        parentId: null,
        content: {},
        style: { backgroundColor: "#E07A5F", paddingTop: "96px", paddingBottom: "96px" },
      },
      {
        type: "container",
        order: 1,
        parentId: "section-1",
        content: { layout: "grid", columns: 2, gap: 24 },
        style: { maxWidth: "900px", margin: "0 auto" },
      },
      {
        type: "icon-box",
        order: 2,
        parentId: "container-1",
        content: {
          iconName: "Eye",
          title: "Transparency over promises",
          description: "Every estimate explained. Every timeline in writing, not just in words.",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px" },
      },
      {
        type: "icon-box",
        order: 3,
        parentId: "container-1",
        content: {
          iconName: "Palette",
          title: "Cleaner design, sharper thinking",
          description: "Every element earns its place — in the budget, in the room, in your life.",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px" },
      },
      {
        type: "icon-box",
        order: 4,
        parentId: "container-1",
        content: {
          iconName: "CheckCircle2",
          title: "Render to reality, always",
          description: "What you approve is what you get. No surprises at handover.",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px" },
      },
      {
        type: "icon-box",
        order: 5,
        parentId: "container-1",
        content: {
          iconName: "Heart",
          title: "Your happiness is the metric",
          description: "We measure success by how much you love the space we leave behind.",
        },
        style: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px" },
      },
    ],
  },
];

export function getTemplatesByCategory(category: SectionTemplate["category"]) {
  return sectionTemplates.filter((t) => t.category === category);
}

export function getTemplateById(id: string): SectionTemplate | undefined {
  return sectionTemplates.find((t) => t.id === id);
}
