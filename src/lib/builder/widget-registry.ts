import type { WidgetRegistryItem, WidgetType } from "@/types/builder";

export const widgetRegistry: WidgetRegistryItem[] = [
  // ─── LAYOUT ───────────────────────────────────────────────
  {
    type: "section",
    label: "Section",
    description: "Root container for a page section",
    icon: "Layout",
    category: "layout",
    defaultContent: {
      fullWidth: false,
    },
    defaultStyle: {
      backgroundColor: "transparent",
      paddingTop: "96px",
      paddingBottom: "96px",
    },
  },
  {
    type: "container",
    label: "Container",
    description: "Flex or grid layout container",
    icon: "Box",
    category: "layout",
    defaultContent: {
      layout: "flex",
      direction: "row",
      wrap: false,
      justify: "start",
      align: "stretch",
      gap: 24,
    },
    defaultStyle: {
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  {
    type: "column",
    label: "Column",
    description: "Responsive column for grid layouts",
    icon: "Columns",
    category: "layout",
    defaultContent: {
      width: "100%",
    },
    defaultStyle: {},
  },
  {
    type: "divider",
    label: "Divider",
    description: "Horizontal line separator",
    icon: "Minus",
    category: "layout",
    defaultContent: {
      thickness: 1,
      style: "solid",
      length: "100%",
    },
    defaultStyle: {
      borderColor: "#EDE0D4",
      marginTop: "24px",
      marginBottom: "24px",
    },
  },
  {
    type: "spacer",
    label: "Spacer",
    description: "Empty space with configurable height",
    icon: "MoveVertical",
    category: "layout",
    defaultContent: {
      height: 40,
    },
    defaultStyle: {},
  },

  // ─── CONTENT ──────────────────────────────────────────────
  {
    type: "heading",
    label: "Heading",
    description: "H1–H6 heading with highlight support",
    icon: "Type",
    category: "content",
    defaultContent: {
      text: "Your Heading Here",
      tag: "h2",
      highlightWords: [],
      alignment: "left",
      link: null,
    },
    defaultStyle: {
      color: "#2B2D42",
      fontSize: "3.052rem",
      fontFamily: "var(--font-playfair)",
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      marginBottom: "1.5rem",
    },
  },
  {
    type: "text",
    label: "Text Block",
    description: "Rich text content block",
    icon: "FileText",
    category: "content",
    defaultContent: {
      html: "<p>Start typing your content here...</p>",
      alignment: "left",
    },
    defaultStyle: {
      color: "#4A4E69",
      fontSize: "1rem",
      fontFamily: "var(--font-inter)",
      lineHeight: 1.7,
      marginBottom: "1rem",
    },
  },
  {
    type: "icon-box",
    label: "Icon Box",
    description: "Icon with heading and description",
    icon: "SquareStack",
    category: "content",
    defaultContent: {
      iconName: "Star",
      title: "Feature Title",
      description: "Describe your feature here.",
    },
    defaultStyle: {
      padding: "24px",
      backgroundColor: "#FFFBF7",
      borderRadius: "16px",
    },
  },
  {
    type: "testimonial",
    label: "Testimonial",
    description: "Client quote with avatar and rating",
    icon: "MessageSquareQuote",
    category: "content",
    defaultContent: {
      quote: "Amazing experience working with this team!",
      author: "Happy Client",
      role: "Homeowner",
      avatarMediaId: "",
      rating: 5,
    },
    defaultStyle: {
      backgroundColor: "#FDF6F0",
      borderLeftColor: "#E07A5F",
      borderLeftWidth: "4px",
      padding: "2rem",
    },
  },
  {
    type: "counter",
    label: "Counter",
    description: "Animated number counter",
    icon: "Hash",
    category: "content",
    defaultContent: {
      target: 100,
      suffix: "+",
      prefix: "",
      duration: 2,
    },
    defaultStyle: {
      color: "#E07A5F",
      fontSize: "3rem",
      fontFamily: "var(--font-playfair)",
      fontWeight: 600,
    },
  },
  {
    type: "tabs",
    label: "Tabs",
    description: "Tabbed content panels",
    icon: "Tabs",
    category: "content",
    defaultContent: {
      items: [
        { label: "Tab 1", content: "Content for tab 1" },
        { label: "Tab 2", content: "Content for tab 2" },
      ],
    },
    defaultStyle: {},
  },
  {
    type: "accordion",
    label: "Accordion",
    description: "Collapsible FAQ or process steps",
    icon: "ListCollapse",
    category: "content",
    defaultContent: {
      items: [
        { label: "Question 1?", content: "Answer to question 1." },
        { label: "Question 2?", content: "Answer to question 2." },
      ],
    },
    defaultStyle: {},
  },
  {
    type: "timeline",
    label: "Timeline",
    description: "Vertical or horizontal process timeline",
    icon: "GitBranch",
    category: "content",
    defaultContent: {
      steps: [
        { title: "Step 1", description: "Description of step 1", icon: "Circle" },
        { title: "Step 2", description: "Description of step 2", icon: "Circle" },
      ],
    },
    defaultStyle: {},
  },

  // ─── MEDIA ────────────────────────────────────────────────
  {
    type: "image",
    label: "Image",
    description: "Image with media library picker",
    icon: "Image",
    category: "media",
    defaultContent: {
      mediaId: "",
      fallbackUrl: "/images/placeholder.jpg",
      altText: "",
      caption: "",
      objectFit: "cover",
      aspectRatio: "16/9",
      lazyLoad: true,
      lightbox: false,
    },
    defaultStyle: {
      borderRadius: "16px",
      opacity: 1,
    },
  },
  {
    type: "gallery",
    label: "Gallery",
    description: "Masonry, grid, or carousel gallery",
    icon: "Images",
    category: "media",
    defaultContent: {
      images: [],
      galleryLayout: "grid",
    },
    defaultStyle: {},
  },
  {
    type: "before-after",
    label: "Before/After",
    description: "Interactive before/after slider",
    icon: "Columns2",
    category: "media",
    defaultContent: {
      beforeMediaId: "",
      afterMediaId: "",
    },
    defaultStyle: {},
  },

  // ─── FORMS ────────────────────────────────────────────────
  {
    type: "button",
    label: "Button",
    description: "Clickable button with styles",
    icon: "MousePointerClick",
    category: "forms",
    defaultContent: {
      label: "Click Me",
      url: "#",
      variant: "primary",
      icon: "ArrowRight",
    },
    defaultStyle: {
      backgroundColor: "#E07A5F",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: 600,
      paddingTop: "16px",
      paddingBottom: "16px",
      paddingLeft: "32px",
      paddingRight: "32px",
      borderRadius: "12px",
    },
  },
  {
    type: "contact-form",
    label: "Contact Form",
    description: "Name, email, phone, message form",
    icon: "Mail",
    category: "forms",
    defaultContent: {
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: false },
        { name: "message", label: "Message", type: "textarea", required: true },
      ],
      submitLabel: "Send Message",
    },
    defaultStyle: {},
  },

  // ─── ADVANCED ─────────────────────────────────────────────
  {
    type: "map",
    label: "Map",
    description: "Google Maps embed",
    icon: "MapPin",
    category: "advanced",
    defaultContent: {
      address: "Hyderabad, India",
      lat: 17.4065,
      lng: 78.4772,
    },
    defaultStyle: {
      height: "300px",
      borderRadius: "16px",
    },
  },
  {
    type: "social-links",
    label: "Social Links",
    description: "Social media icon links",
    icon: "Share2",
    category: "advanced",
    defaultContent: {
      links: [
        { platform: "instagram", url: "#" },
        { platform: "facebook", url: "#" },
        { platform: "linkedin", url: "#" },
      ],
    },
    defaultStyle: {},
  },
  {
    type: "custom-html",
    label: "Custom HTML",
    description: "Raw HTML/CSS/JS injection",
    icon: "Code",
    category: "advanced",
    defaultContent: {
      code: "<!-- Your custom code here -->",
    },
    defaultStyle: {},
  },
];

export function getWidgetDefinition(type: WidgetType): WidgetRegistryItem | undefined {
  return widgetRegistry.find((w) => w.type === type);
}

export function getWidgetsByCategory(category: WidgetRegistryItem["category"]) {
  return widgetRegistry.filter((w) => w.category === category);
}

export const widgetCategories = [
  { id: "layout" as const, label: "Layout", icon: "Layout" },
  { id: "content" as const, label: "Content", icon: "FileText" },
  { id: "media" as const, label: "Media", icon: "Image" },
  { id: "forms" as const, label: "Forms", icon: "MousePointerClick" },
  { id: "advanced" as const, label: "Advanced", icon: "Settings" },
];
