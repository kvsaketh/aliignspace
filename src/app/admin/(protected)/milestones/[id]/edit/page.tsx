import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MilestoneForm } from "../../MilestoneForm";

export default async function EditMilestonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const milestone = await prisma.milestone.findUnique({ where: { id } });
  if (!milestone) notFound();

  return (
    <MilestoneForm
      initial={{
        id: milestone.id,
        number: milestone.number,
        suffix: milestone.suffix ?? "",
        label: milestone.label,
        sortOrder: milestone.sortOrder,
        isActive: milestone.isActive,
      }}
    />
  );
}
