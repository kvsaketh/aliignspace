"use client";

import { useState } from "react";
import { MediaPicker } from "./MediaPicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

/**
 * Example: How to use MediaPicker in your forms
 * 
 * The MediaPicker component provides a complete media selection interface
 * with upload, search, filter, and preview capabilities.
 */
export function MediaPickerExample() {
  // Single image selection
  const [coverImage, setCoverImage] = useState<string>("");
  
  // Optional: Get full media details when needed
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Picker Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Usage */}
        <div className="space-y-2">
          <Label>Cover Image</Label>
          <MediaPicker
            value={coverImage}
            onChange={(url) => setCoverImage(url || "")}
            buttonLabel="Select Cover Image"
            previewSize="lg"
          />
        </div>

        {/* With Media Details Callback */}
        <div className="space-y-2">
          <Label>Featured Image (with details)</Label>
          <MediaPicker
            value={coverImage}
            onChange={(url) => setCoverImage(url || "")}
            onMediaSelect={setSelectedMedia}
            buttonLabel="Select Featured Image"
            previewSize="md"
          />
          {selectedMedia && (
            <p className="text-sm text-gray-500">
              Selected: {selectedMedia.filename} ({selectedMedia.width}×{selectedMedia.height})
            </p>
          )}
        </div>

        {/* Small Preview */}
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <MediaPicker
            value={coverImage}
            onChange={(url) => setCoverImage(url || "")}
            buttonLabel="Select Thumbnail"
            previewSize="sm"
            allowedTypes={["image/jpeg", "image/png", "image/webp"]}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Integration in Portfolio Edit Page:
 * 
 * Replace the URL input with MediaPicker:
 * 
 * BEFORE:
 *   <Input
 *     id="cover"
 *     value={coverImage}
 *     onChange={(e) => setCoverImage(e.target.value)}
 *     placeholder="https://..."
 *   />
 * 
 * AFTER:
 *   <MediaPicker
 *     value={coverImage}
 *     onChange={setCoverImage}
 *     buttonLabel="Select Cover Image"
 *     previewSize="md"
 *   />
 */
