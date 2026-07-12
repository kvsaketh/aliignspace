"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaPicker } from "./MediaPicker";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface StoryContent {
  imageUrl: string;
  heading: string;
  body: string[];
  quote: string;
  quoteAuthor: string;
}

const defaultContent: StoryContent = {
  imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format",
  heading: "Where <em>trust</em> becomes the foundation",
  body: [
    "Every home holds a different dream. At Aliignspace, we began with one belief — that the only thing standing between you and your dream home isn't the lack of options. It's the lack of trust.",
    "Founded in 2021 by Ar. Samhitha Nagasamudra, Aliignspace was born from years of watching homeowners navigate an industry clouded by vague estimates, mismatched expectations, and broken timelines. We chose a different path — cleaner designs, sharper strategies, and a process so transparent you can follow every step of it.",
  ],
  quote: "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
  quoteAuthor: "Ar. Samhitha Nagasamudra, Founder",
};

export function StoryEditor() {
  const { toast } = useToast();
  const [content, setContent] = useState<StoryContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/global-blocks/story");
      if (res.ok) {
        const data = await res.json();
        setContent({
          ...defaultContent,
          ...data,
        });
      }
    } catch {
      // Use defaults
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/global-blocks/story", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        toast({
          title: "Saved",
          description: "Story section updated successfully.",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save story section. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Homepage Story Section
        </CardTitle>
        <CardDescription>
          Edit the image and content for the &quot;Our Story&quot; section on the homepage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image */}
        <div className="space-y-2">
          <Label>Story Image</Label>
          <MediaPicker
            value={content.imageUrl}
            onChange={(url) => setContent((prev) => ({ ...prev, imageUrl: url || "" }))}
            buttonLabel="Select Story Image"
            previewSize="lg"
          />
          <p className="text-xs text-muted-foreground">
            Recommended: portrait orientation (3:4 ratio), at least 800px wide.
          </p>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <Label htmlFor="story-heading">Heading</Label>
          <Input
            id="story-heading"
            value={content.heading}
            onChange={(e) => setContent((prev) => ({ ...prev, heading: e.target.value }))}
            placeholder="Section heading..."
          />
          <p className="text-xs text-muted-foreground">
            Use {"<em>word</em>"} to italicize words with the brand coral color.
          </p>
        </div>

        {/* Body Paragraph 1 */}
        <div className="space-y-2">
          <Label htmlFor="story-body-1">Paragraph 1</Label>
          <Textarea
            id="story-body-1"
            value={content.body[0] || ""}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                body: [e.target.value, prev.body[1] || ""],
              }))
            }
            rows={3}
            placeholder="First paragraph..."
          />
        </div>

        {/* Body Paragraph 2 */}
        <div className="space-y-2">
          <Label htmlFor="story-body-2">Paragraph 2</Label>
          <Textarea
            id="story-body-2"
            value={content.body[1] || ""}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                body: [prev.body[0] || "", e.target.value],
              }))
            }
            rows={3}
            placeholder="Second paragraph..."
          />
        </div>

        {/* Quote */}
        <div className="space-y-2">
          <Label htmlFor="story-quote">Quote</Label>
          <Textarea
            id="story-quote"
            value={content.quote}
            onChange={(e) => setContent((prev) => ({ ...prev, quote: e.target.value }))}
            rows={2}
            placeholder="Founder quote..."
          />
        </div>

        {/* Quote Author */}
        <div className="space-y-2">
          <Label htmlFor="story-quote-author">Quote Attribution</Label>
          <Input
            id="story-quote-author"
            value={content.quoteAuthor}
            onChange={(e) => setContent((prev) => ({ ...prev, quoteAuthor: e.target.value }))}
            placeholder="— Name, Title"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-terracotta-500 hover:bg-terracotta-600 gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
