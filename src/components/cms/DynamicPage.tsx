"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectionsRenderer } from "./SectionRenderer";
import { motion } from "framer-motion";

interface Section {
  id: string;
  type: string;
  order: number;
  props: Record<string, any>;
}

interface PageSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: string;
  sections: Section[];
  seo?: PageSEO;
}

interface DynamicPageProps {
  page: PageData;
  isPreview?: boolean;
  selectedSectionId?: string | null;
  onSectionClick?: (section: Section) => void;
}

export function DynamicPage({
  page,
  isPreview = false,
  selectedSectionId,
  onSectionClick,
}: DynamicPageProps) {
  if (!page || !page.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-500">
            The requested page could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={isPreview ? "bg-gray-100" : ""}
    >
      {!isPreview && <Header />}
      
      <main className={isPreview ? "" : "overflow-x-hidden"}>
        <SectionsRenderer
          sections={page.sections}
          isPreview={isPreview}
          selectedSectionId={selectedSectionId}
          onSectionClick={onSectionClick}
        />
      </main>
      
      {!isPreview && <Footer />}
    </motion.div>
  );
}

// Loading state
export function DynamicPageLoading() {
  return (
    <div className="min-h-screen">
      <div className="h-20 bg-white border-b animate-pulse" />
      <div className="space-y-4 p-8">
        <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}

// Error state
export function DynamicPageError({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">
          {message || "Failed to load the page. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
