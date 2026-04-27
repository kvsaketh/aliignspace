"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface SEOSectionProps {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    schema?: any;
  } | null;
  onSeoChange: (seo: any) => void;
}

export function SEOSection({ seo, onSeoChange }: SEOSectionProps) {
  const [localSeo, setLocalSeo] = useState({
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    canonicalUrl: "",
    noIndex: false,
    schema: null,
    ...seo,
  });

  useEffect(() => {
    setLocalSeo({
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
      schema: null,
      ...seo,
    });
  }, [seo]);

  const handleChange = (field: string, value: any) => {
    const updated = { ...localSeo, [field]: value };
    setLocalSeo(updated);
    onSeoChange(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meta Information</CardTitle>
          <CardDescription>
            Configure how this page appears in search results and social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={localSeo.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              placeholder="Page title for search engines"
            />
            <p className="text-sm text-muted-foreground">
              Recommended length: 50-60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={localSeo.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              placeholder="Brief description of the page content"
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              Recommended length: 150-160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <Input
              id="canonicalUrl"
              value={localSeo.canonicalUrl}
              onChange={(e) => handleChange("canonicalUrl", e.target.value)}
              placeholder="https://example.com/page"
            />
            <p className="text-sm text-muted-foreground">
              Use this to specify the preferred version of this page.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Configure how this page appears when shared on social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              value={localSeo.ogImage}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Recommended size: 1200x630 pixels
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
          <CardDescription>
            Advanced SEO settings for this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="noIndex">No Index</Label>
              <p className="text-sm text-muted-foreground">
                Prevent search engines from indexing this page.
              </p>
            </div>
            <Switch
              id="noIndex"
              checked={localSeo.noIndex}
              onCheckedChange={(checked) => handleChange("noIndex", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
