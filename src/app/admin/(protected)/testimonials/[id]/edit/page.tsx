import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../../TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <TestimonialForm
      initial={{
        id: t.id,
        type: t.type,
        name: t.name,
        location: t.location,
        review: t.review,
        rating: t.rating,
        videoUrl: t.videoUrl,
        avatarUrl: t.avatarUrl,
        sortOrder: t.sortOrder,
        isActive: t.isActive,
      }}
    />
  );
}
