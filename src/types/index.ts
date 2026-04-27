import { ReactNode } from "react";

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: "ADMIN" | "EDITOR" | "SEO";
  createdAt: Date;
}

// Page Types
export interface Page {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seo?: SEO;
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  id: string;
  pageId: string;
  type: string;
  order: number;
  props: Record<string, any> | null;
}

// SEO Types
export interface SEO {
  id: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  schema?: Record<string, any>;
  canonicalUrl?: string;
  noIndex: boolean;
}

// Component Registry Types
export interface ComponentSchema {
  type: string;
  label: string;
  description?: string;
  icon?: string;
  fields: FieldSchema[];
}

export interface FieldSchema {
  name: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "number" | "boolean" | "select" | "media" | "color" | "url" | "array" | "object";
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  description?: string;
  category?: "content" | "style" | "advanced";
  options?: { label: string; value: string }[];
  rows?: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  itemFields?: FieldSchema[]; // For array type fields
}

export interface BlockComponent {
  type: string;
  component: React.ComponentType<any>;
  schema: ComponentSchema;
}

// Media Types
export interface Media {
  id: string;
  url: string;
  key: string;
  filename: string;
  alt?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  createdAt: Date;
}

// Blog Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt?: string;
  featuredImage?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date;
  author?: User;
  seo?: SEO;
  categories: Category[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// Menu Types
export interface Menu {
  id: string;
  name: string;
  location: "HEADER" | "FOOTER";
  items: MenuItem[];
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target?: string;
  children?: MenuItem[];
}

// Global Block Types
export interface GlobalBlock {
  id: string;
  type: "HEADER" | "FOOTER" | "STORY";
  name: string;
  content: Record<string, any>;
  isActive: boolean;
}

// Page Version Types
export interface PageVersion {
  id: string;
  pageId: string;
  snapshot: any;
  author?: User;
  createdAt: Date;
}

// Builder Types
export interface BuilderSection {
  id: string;
  type: string;
  props: Record<string, any>;
  hidden?: boolean;
}

export interface DragItem {
  id: string;
  type: string;
  index: number;
}
