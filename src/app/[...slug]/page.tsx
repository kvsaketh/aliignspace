import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageRenderer } from "@/components/page-renderer";
import { Section } from "@/types";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPage(slug: string[]) {
  const slugString = slug.join("/");

  try {
    const page = await prisma.page.findUnique({
      where: {
        slug: slugString,
        status: "PUBLISHED",
      },
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
        seo: true,
      },
    });

    return page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found | ALIIGNSPACE",
    };
  }

  const seo = page.seo;

  return {
    title: seo?.metaTitle || `${page.title} | ALIIGNSPACE`,
    description: seo?.metaDescription || "",
    openGraph: {
      title: seo?.metaTitle || page.title,
      description: seo?.metaDescription || "",
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
    robots: seo?.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: seo?.canonicalUrl || `/${slug.join("/")}`,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  // Transform sections to match the expected type
  const sections: Section[] = page.sections.map((section) => ({
    ...section,
    props: (section.props as Record<string, any>) || {},
  }));

  return (
    <>
      <Header />
      <PageRenderer sections={sections} />
      <Footer />
    </>
  );
}

export const dynamic = "force-dynamic";
