import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <ServiceForm
      initial={{
        id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        shortDesc: service.shortDesc ?? "",
        image: service.image ?? "",
        heroImage: service.heroImage ?? "",
        sortOrder: service.sortOrder,
        isActive: service.isActive,
      }}
    />
  );
}
