import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderedIds } = await request.json();

  await Promise.all(
    (orderedIds as string[]).map((id, index) =>
      prisma.portfolioProject.update({ where: { id }, data: { sortOrder: index } })
    )
  );

  return NextResponse.json({ success: true });
}
