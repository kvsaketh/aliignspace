import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm, type PostFormValues } from "../../PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const content = (post.content as { html?: string } | null) ?? {};
  const initial: PostFormValues = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt ?? "",
    featuredImage: post.featuredImage ?? "",
    html: content.html ?? "",
    status: post.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
  };

  return <PostForm initial={initial} />;
}
