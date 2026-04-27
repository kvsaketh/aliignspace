import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Default story content
const defaultStoryContent = {
  imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format",
  heading: "Where <em>trust</em> becomes the foundation",
  body: [
    "Every home holds a different dream. At Aliignspace, we began with one belief — that the only thing standing between you and your dream home isn't the lack of options. It's the lack of trust.",
    "Founded in 2021 by Ar. Samhitha Nagasamudra, Aliignspace was born from years of watching homeowners navigate an industry clouded by vague estimates, mismatched expectations, and broken timelines. We chose a different path — cleaner designs, sharper strategies, and a process so transparent you can follow every step of it.",
  ],
  quote: "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
  quoteAuthor: "Ar. Samhitha Nagasamudra, Founder",
  stats: [
    { label: "Est. 2021", icon: "calendar" },
    { label: "Hyderabad & Nellore", icon: "mapPin" },
  ],
};

// GET /api/global-blocks/story - Get story content
export async function GET() {
  try {
    let story = await prisma.globalBlock.findUnique({
      where: {
        type_name: {
          type: "STORY",
          name: "main",
        },
      },
    });

    if (!story) {
      // Create default story block
      story = await prisma.globalBlock.create({
        data: {
          type: "STORY",
          name: "main",
          content: defaultStoryContent,
          isActive: true,
        },
      });
    }

    return NextResponse.json(story.content);
  } catch (error) {
    console.error("Error fetching story block:", error);
    return NextResponse.json(defaultStoryContent);
  }
}

// PUT /api/global-blocks/story - Update story content
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const story = await prisma.globalBlock.upsert({
      where: {
        type_name: {
          type: "STORY",
          name: "main",
        },
      },
      update: {
        content: body,
      },
      create: {
        type: "STORY",
        name: "main",
        content: body,
        isActive: true,
      },
    });

    return NextResponse.json(story.content);
  } catch (error) {
    console.error("Error updating story block:", error);
    return NextResponse.json(
      { error: "Failed to update story block" },
      { status: 500 }
    );
  }
}
