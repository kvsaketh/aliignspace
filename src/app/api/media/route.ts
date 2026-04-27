import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMediaWithUsage, deleteMedia } from "@/lib/media";

// GET /api/media - List all media with usage information
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const type = searchParams.get("type");
    const folder = searchParams.get("folder");

    let media = await getMediaWithUsage();

    // Apply search filter
    if (search) {
      media = media.filter(
        (file) =>
          file.filename.toLowerCase().includes(search) ||
          file.alt?.toLowerCase().includes(search)
      );
    }

    // Apply type filter
    if (type && type !== "all") {
      media = media.filter((file) => {
        if (type === "image") return file.mimeType.startsWith("image/");
        if (type === "video") return file.mimeType.startsWith("video/");
        if (type === "document") {
          return (
            file.mimeType.includes("pdf") ||
            file.mimeType.includes("doc") ||
            file.mimeType.includes("txt")
          );
        }
        return true;
      });
    }

    // Apply folder filter
    if (folder && folder !== "all") {
      media = media.filter((file) => file.folder === folder);
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// DELETE /api/media - Delete multiple media files
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No media IDs provided" },
        { status: 400 }
      );
    }

    // Delete all media files
    await Promise.all(ids.map((id) => deleteMedia(id)));

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}

// PATCH /api/media - Update media metadata
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, alt, filename, folder, caption } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Media ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.media.update({
      where: { id },
      data: {
        ...(alt !== undefined && { alt }),
        ...(filename !== undefined && { filename }),
        ...(folder !== undefined && { folder }),
        ...(caption !== undefined && { caption }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}
