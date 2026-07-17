import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TimelineForm } from "../../TimelineForm";

export default async function EditTimelineEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.timelineEvent.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <TimelineForm
      initial={{
        id: event.id,
        date: event.date,
        title: event.title,
        description: event.description ?? "",
        sortOrder: event.sortOrder,
        isActive: event.isActive,
      }}
    />
  );
}
