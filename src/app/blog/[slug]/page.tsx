import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ALIIGNSPACE Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const content = (post.content as { html?: string } | null) ?? {};

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="pt-32 pb-12 bg-[#1a1720]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white leading-tight">
              {post.title}
            </h1>
            {post.author?.name && (
              <p className="font-sans text-white/40 text-sm mt-4">By {post.author.name}</p>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            {post.featuredImage && (
              <div className="relative aspect-[16/9] mb-10 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}
            <div
              className="font-sans text-stone-600 leading-relaxed space-y-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-[#1a1720] [&_h2]:pt-4 [&_a]:text-[#6D28D9] [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.html) }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
