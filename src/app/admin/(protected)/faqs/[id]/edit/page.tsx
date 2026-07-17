import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FAQForm } from "../../FAQForm";

export default async function EditFAQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.fAQ.findUnique({ where: { id } });
  if (!faq) notFound();

  return <FAQForm initial={faq} />;
}
