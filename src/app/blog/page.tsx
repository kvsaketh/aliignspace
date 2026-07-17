import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | ALIIGNSPACE — Interior Design Tips & Stories",
  description: "Design tips, project stories, and updates from the ALIIGNSPACE studio.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="pt-32 pb-16 bg-[#1a1720]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#6D28D9] block mb-4">
              The Journal
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white">Blog</h1>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-center text-stone-500 py-16">
                No posts published yet — check back soon.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-4">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <h2 className="font-serif text-xl font-medium text-[#1a1720] group-hover:text-[#6D28D9] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-sans text-sm text-stone-500 mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
