// CMS Types for pages, sections, and SEO

export interface SEO {
  id: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
  canonicalUrl?: string;
  noIndex?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  id: string;
  pageId: string;
  type: string;
  order: number;
  props: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type PageStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  seoId?: string | null;
  authorId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  sections: Section[];
  seo?: SEO | null;
}

// API Response types
export interface PageApiResponse {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  seo?: SEO | null;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface PageListItem {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  updatedAt: string;
  _count: {
    sections: number;
  };
}

// Admin panel types
export interface SectionEditorProps {
  section: Section;
  onUpdate: (props: Record<string, unknown>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface PageEditorProps {
  page: Page | null;
  onSave: (page: Partial<Page>) => Promise<void>;
  isLoading?: boolean;
}

// Component registry types
export interface ComponentField {
  name: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "media" | "url" | "boolean" | "select" | "array" | "object" | "number";
  required?: boolean;
  defaultValue?: unknown;
  options?: { label: string; value: string }[];
}

export interface ComponentSchema {
  type: string;
  label: string;
  description: string;
  icon: string;
  fields: ComponentField[];
}
