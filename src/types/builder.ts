// Widget-Level Builder Types

export type WidgetType =
  | "section"
  | "container"
  | "column"
  | "heading"
  | "text"
  | "image"
  | "button"
  | "divider"
  | "spacer"
  | "icon-box"
  | "testimonial"
  | "counter"
  | "tabs"
  | "accordion"
  | "timeline"
  | "gallery"
  | "before-after"
  | "contact-form"
  | "map"
  | "social-links"
  | "custom-html";

export type DeviceType = "desktop" | "tablet" | "mobile";

export interface WidgetContent {
  // Heading
  text?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  highlightWords?: string[];
  alignment?: "left" | "center" | "right";
  link?: string | null;

  // Text
  html?: string;

  // Image
  mediaId?: string;
  fallbackUrl?: string;
  altText?: string;
  caption?: string;
  objectFit?: "cover" | "contain" | "fill";
  aspectRatio?: string;
  lazyLoad?: boolean;
  lightbox?: boolean;

  // Button
  label?: string;
  url?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: string;

  // Container/Column
  layout?: "flex" | "grid";
  direction?: "row" | "column";
  wrap?: boolean;
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
  columns?: number;
  gap?: number;
  width?: string; // For column: 100%, 50%, 33%, 25%, 20%, 16%

  // Divider
  thickness?: number;
  style?: "solid" | "dashed" | "dotted";
  length?: string;

  // Spacer
  height?: number;

  // Icon Box
  iconName?: string;
  title?: string;
  description?: string;

  // Testimonial
  quote?: string;
  author?: string;
  role?: string;
  avatarMediaId?: string;
  rating?: number;

  // Counter
  target?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;

  // Tabs/Accordion
  items?: { label: string; content: string }[];

  // Timeline
  steps?: { title: string; description: string; icon?: string }[];

  // Gallery
  images?: { mediaId: string; alt?: string }[];
  galleryLayout?: "masonry" | "grid" | "carousel";

  // Before/After
  beforeMediaId?: string;
  afterMediaId?: string;

  // Contact Form
  fields?: { name: string; label: string; type: string; required?: boolean }[];
  submitLabel?: string;

  // Map
  address?: string;
  lat?: number;
  lng?: number;

  // Social
  links?: { platform: string; url: string }[];

  // Custom HTML
  code?: string;

  // Generic
  [key: string]: unknown;
}

export interface WidgetStyle {
  // Typography
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  overlayOpacity?: number;

  // Spacing
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;

  // Border
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;

  // Shadow
  boxShadow?: string;

  // Effects
  opacity?: number;
  transform?: string;
  mixBlendMode?: string;

  [key: string]: unknown;
}

export interface WidgetAnimation {
  type?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight" | "none";
  duration?: number;
  delay?: number;
  easing?: string;
  trigger?: "scroll" | "load" | "hover";
}

export interface WidgetResponsive {
  desktop?: Partial<WidgetStyle>;
  tablet?: Partial<WidgetStyle>;
  mobile?: Partial<WidgetStyle>;
}

export interface WidgetData {
  id: string;
  sectionId: string;
  type: WidgetType;
  order: number;
  parentId?: string | null;
  content: WidgetContent;
  style?: WidgetStyle;
  responsive?: WidgetResponsive;
  animation?: WidgetAnimation;
  hidden?: boolean;
  cssId?: string;
  cssClass?: string;
  customCss?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SectionData {
  id: string;
  pageId: string;
  type: string;
  order: number;
  props: Record<string, unknown>;
  config?: {
    backgroundColor?: string;
    backgroundImage?: string;
    padding?: string;
    fullWidth?: boolean;
    className?: string;
  };
  widgets?: WidgetData[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BuilderState {
  sections: SectionData[];
  widgets: WidgetData[];
  selectedWidgetId: string | null;
  selectedSectionId: string | null;
  device: DeviceType;
}

export interface BuilderAction {
  type: string;
  payload: unknown;
  inverse: BuilderAction;
}

export interface WidgetRegistryItem {
  type: WidgetType;
  label: string;
  description: string;
  icon: string;
  category: "layout" | "content" | "media" | "forms" | "advanced";
  defaultContent: WidgetContent;
  defaultStyle?: WidgetStyle;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string | null;
  folder: string;
  altText?: string;
  caption?: string;
  dimensions?: { width: number; height: number } | null;
  fileSize?: number | null;
  usedIn?: { pageId: string; widgetId: string }[];
  createdAt: string;
  updatedAt: string;
}
