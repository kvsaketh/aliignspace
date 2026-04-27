import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/media/replace - Replace media file and update all references
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { oldMediaId, newMediaId, updateAll = true, selectiveWidgets = [] } = body;

    if (!oldMediaId || !newMediaId) {
      return NextResponse.json(
        { error: "oldMediaId and newMediaId are required" },
        { status: 400 }
      );
    }

    // Get both media records
    const [oldMedia, newMedia] = await Promise.all([
      prisma.media.findUnique({ where: { id: oldMediaId } }),
      prisma.media.findUnique({ where: { id: newMediaId } }),
    ]);

    if (!oldMedia || !newMedia) {
      return NextResponse.json(
        { error: "One or both media records not found" },
        { status: 404 }
      );
    }

    // Get all widgets that reference the old media
    const widgets = await prisma.widget.findMany();
    const sections = await prisma.section.findMany();
    const pages = await prisma.page.findMany({
      include: { sections: true },
    });

    const updates: { widgetId: string; field: string }[] = [];

    // Check widgets for mediaId references
    widgets.forEach((widget) => {
      const content = widget.content as Record<string, unknown>;
      const hasMediaRef = Object.entries(content).some(
        ([key, value]) =>
          (key.includes("mediaId") || key.includes("image") || key.includes("MediaId")) &&
          value === oldMediaId
      );

      if (hasMediaRef) {
        if (updateAll || selectiveWidgets.includes(widget.id)) {
          updates.push({ widgetId: widget.id, field: "content" });
        }
      }
    });

    // Check sections/props for media references
    sections.forEach((section) => {
      const props = section.props as Record<string, unknown>;
      const propsStr = JSON.stringify(props);
      if (propsStr.includes(oldMediaId) || propsStr.includes(oldMedia.url)) {
        // Update section props
        const newProps = JSON.parse(
          propsStr.replaceAll(oldMediaId, newMediaId).replaceAll(oldMedia.url, newMedia.url)
        );
        prisma.section.update({
          where: { id: section.id },
          data: { props: newProps },
        });
      }
    });

    // Update widgets
    await Promise.all(
      updates.map(async ({ widgetId }) => {
        const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
        if (!widget) return;

        const content = widget.content as Record<string, unknown>;
        const newContent: Record<string, unknown> = {};

        Object.entries(content).forEach(([key, value]) => {
          if (
            (key.includes("mediaId") || key.includes("image") || key.includes("MediaId")) &&
            value === oldMediaId
          ) {
            newContent[key] = newMediaId;
          } else {
            newContent[key] = value;
          }
        });

        await prisma.widget.update({
          where: { id: widgetId },
          data: { content: newContent as any },
        });
      })
    );

    // Update media usedIn tracking
    await prisma.media.update({
      where: { id: newMediaId },
      data: {
        usedIn: {
          set: [
            ...((oldMedia.usedIn as any[]) || []),
            ...((newMedia.usedIn as any[]) || []),
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      updatedWidgets: updates.length,
      oldMediaId,
      newMediaId,
    });
  } catch (error) {
    console.error("Error replacing media:", error);
    return NextResponse.json(
      { error: "Failed to replace media" },
      { status: 500 }
    );
  }
}
