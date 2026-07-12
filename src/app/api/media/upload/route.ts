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
// The stored extension is derived from the validated MIME type, never from the
// client-supplied filename, so an attacker cannot land an executable extension
// (.html/.svg/.xml) in the web root by spoofing Content-Type.
const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "application/pdf": ".pdf",
};
const ALLOWED_MIME_TYPES = Object.keys(MIME_TO_EXTENSION);

/**
 * Verify the file's real content matches the declared MIME by inspecting magic
 * bytes, so a spoofed Content-Type can't slip disguised content past the header
 * allowlist. Returns true if the buffer's signature matches the declared type.
 */
function magicBytesMatch(mime: string, buf: Buffer): boolean {
  const startsWith = (bytes: number[], offset = 0) =>
    bytes.every((b, i) => buf[offset + i] === b);
  switch (mime) {
    case "image/jpeg":
      return startsWith([0xff, 0xd8, 0xff]);
    case "image/png":
      return startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "image/gif":
      return startsWith([0x47, 0x49, 0x46, 0x38]); // GIF8
    case "image/webp":
      return startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8); // RIFF....WEBP
    case "video/mp4":
      return startsWith([0x66, 0x74, 0x79, 0x70], 4); // ....ftyp
    case "video/webm":
      return startsWith([0x1a, 0x45, 0xdf, 0xa3]);
    case "application/pdf":
      return startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
    default:
      return false;
  }
}

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
            "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4, WebM, PDF",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Reject when the real content doesn't match the declared MIME type.
    if (!magicBytesMatch(file.type, buffer)) {
      return NextResponse.json(
        { error: "File content does not match its declared type." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const hash = crypto.createHash("md5").update(buffer).digest("hex");
    const originalName = file.name;
    const extension = MIME_TO_EXTENSION[file.type];
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
