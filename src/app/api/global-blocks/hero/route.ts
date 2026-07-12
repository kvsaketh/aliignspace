import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Default hero slides (images live in /public/hero — editable from the admin).
const defaultHeroContent = {
  slides: [
    { image: "/hero/kitchen.jpg", title: "Crafting Timeless Interiors", subtitle: "Where luxury meets functionality in every corner" },
    { image: "/hero/dining.jpg", title: "Bespoke Design Solutions", subtitle: "Tailored spaces that reflect your unique story" },
    { image: "/hero/living-room.jpg", title: "Elevated Living Spaces", subtitle: "Transforming houses into extraordinary homes" },
    { image: "/hero/kitchen-2.jpg", title: "Precision in Every Detail", subtitle: "Meticulous craftsmanship from concept to completion" },
  ],
};

// GET /api/global-blocks/hero — get hero slides
export async function GET() {
  try {
    let hero = await prisma.globalBlock.findUnique({
      where: { type_name: { type: "HERO", name: "main" } },
    });

    if (!hero) {
      // Only persist the default for logged-in users; anonymous GETs must not write
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(defaultHeroContent);
      }
            hero = await prisma.globalBlock.create({
        data: { type: "HERO", name: "main", content: defaultHeroContent, isActive: true },
      });
    }

    return NextResponse.json(hero.content);
  } catch (error) {
    console.error("Error fetching hero block:", error);
    return NextResponse.json(defaultHeroContent);
  }
}

// PUT /api/global-blocks/hero — update hero slides
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if ((session.user as { role?: string } | undefined)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const content = await request.json();

    const hero = await prisma.globalBlock.upsert({
      where: { type_name: { type: "HERO", name: "main" } },
      update: { content },
      create: { type: "HERO", name: "main", content, isActive: true },
    });

    return NextResponse.json(hero.content);
  } catch (error) {
    console.error("Error updating hero block:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
