import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import crypto from "crypto";

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "application/pdf",
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG, MP4, WebM, PDF",
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const hash = crypto.createHash("md5").update(buffer).digest("hex");
    const originalName = file.name;
    const extension = path.extname(originalName).toLowerCase();
    const timestamp = Date.now();
    const filename = `${timestamp}-${hash.slice(0, 8)}${extension}`;
    const key = `uploads/${filename}`;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save file to disk
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    // Get image dimensions if it's an image
    let width: number | null = null;
    let height: number | null = null;
    let thumbnailUrl: string | null = null;

    if (file.type.startsWith("image/")) {
      try {
        // For images, try to get dimensions
        const imageSize = await import("image-size");
        const dimensions = imageSize.imageSize(buffer);
        width = dimensions.width || null;
        height = dimensions.height || null;

        // Create a simple thumbnail for images (resize to max 300px width)
        if (width && height && width > 300) {
          try {
            const sharp = await import("sharp");
            const thumbnailFilename = `${timestamp}-${hash.slice(0, 8)}-thumb${extension}`;
            const thumbnailPath = path.join(uploadsDir, thumbnailFilename);

            await sharp
              .default(buffer)
              .resize(300, null, { withoutEnlargement: true })
              .toFile(thumbnailPath);

            thumbnailUrl = `/uploads/${thumbnailFilename}`;
          } catch {
            // If sharp is not available, skip thumbnail creation
            thumbnailUrl = null;
          }
        }
      } catch {
        // If image-size fails, continue without dimensions
      }
    }

    // Save to database
    const media = await prisma.media.create({
      data: {
        url: `/uploads/${filename}`,
        thumbnailUrl,
        key,
        filename: originalName,
        alt: null,
        mimeType: file.type,
        size: file.size,
        width,
        height,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
