"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaPicker } from "./MediaPicker";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

const defaultSlides: HeroSlide[] = [
  { image: "/hero/kitchen.jpg", title: "Crafting Timeless Interiors", subtitle: "Where luxury meets functionality in every corner" },
  { image: "/hero/dining.jpg", title: "Bespoke Design Solutions", subtitle: "Tailored spaces that reflect your unique story" },
  { image: "/hero/living-room.jpg", title: "Elevated Living Spaces", subtitle: "Transforming houses into extraordinary homes" },
  { image: "/hero/kitchen-2.jpg", title: "Precision in Every Detail", subtitle: "Meticulous craftsmanship from concept to completion" },
];

export function HeroEditor() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/global-blocks/hero");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.slides) && data.slides.length > 0) {
          setSlides(data.slides);
        }
      }
    } catch {
      // keep defaults
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const update = (i: number, key: keyof HeroSlide, value: string) => {
    setSlides((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/global-blocks/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Saved", description: "Hero backgrounds updated successfully." });
    } catch {
      toast({ title: "Error", description: "Failed to save hero section. Please try again.", variant: "destructive" });
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
          Homepage Hero Backgrounds
        </CardTitle>
        <CardDescription>
          Change the background images shown in the homepage hero slider. Recommended: landscape images, at least 1920px wide.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {slides.map((slide, i) => (
          <div key={i} className="space-y-3 pb-6 border-b last:border-0">
            <p className="text-sm font-semibold">Slide {i + 1}</p>

            <div className="space-y-2">
              <Label>Background Image</Label>
              <MediaPicker
                value={slide.image}
                onChange={(url) => update(i, "image", url || "")}
                buttonLabel="Select Image"
                previewSize="lg"
              />
              <Input
                value={slide.image}
                onChange={(e) => update(i, "image", e.target.value)}
                placeholder="/hero/your-image.jpg or https://…"
              />
              <p className="text-xs text-muted-foreground">
                Pick from the media library, or paste an image path/URL (e.g. <code>/hero/kitchen.jpg</code>).
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={slide.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Slide title" />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={slide.subtitle} onChange={(e) => update(i, "subtitle", e.target.value)} placeholder="Slide subtitle" />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-1">
          <Button onClick={handleSave} disabled={isSaving} className="bg-terracotta-500 hover:bg-terracotta-600 gap-2">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroEditor;
