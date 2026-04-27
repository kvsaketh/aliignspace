import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

function isYouTubeUrl(url: string): boolean {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

// POST /api/media/youtube - Create YouTube video media (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { videoUrl, title } = body;

    if (!videoUrl || typeof videoUrl !== "string") {
      return NextResponse.json(
        { error: "videoUrl is required" },
        { status: 400 }
      );
    }

    if (!isYouTubeUrl(videoUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: "Could not extract video ID from URL" },
        { status: 400 }
      );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const key = `youtube/${videoId}`;
    const filename = title || videoId;

    // Check if media already exists for this video
    const existing = await prisma.media.findUnique({ where: { key } });
    if (existing) {
      return NextResponse.json(existing);
    }

    const media = await prisma.media.create({
      data: {
        url: embedUrl,
        thumbnailUrl,
        key,
        filename,
        mimeType: "video/youtube",
        size: 0,
        folder: "youtube",
        videoUrl: videoUrl,
        videoType: "YOUTUBE",
        videoId,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Error creating YouTube media:", error);
    return NextResponse.json(
      { error: "Failed to create YouTube media" },
      { status: 500 }
    );
  }
}
