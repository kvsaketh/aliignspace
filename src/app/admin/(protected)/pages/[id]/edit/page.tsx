"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Save, Eye } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { PageBuilder } from "@/components/builder/page-builder";
import { SEOSection } from "@/components/builder/seo-section";

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: string;
  sections: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    schema?: any;
  } | null;
}

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState<PageData | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [sections, setSections] = useState<any[]>([]);
  const [seo, setSeo] = useState<PageData["seo"]>(null);

  useEffect(() => {
    if (id) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/pages/${id}`);
      if (!response.ok) throw new Error("Failed to fetch page");
      const data = await response.json();
      setPage(data);
      setTitle(data.title);
      setSlug(data.slug);
      setStatus(data.status);
      setSections(data.sections || []);
      setSeo(data.seo);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          status,
          sections,
          seo,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save page");
      }

      toast({
        title: "Page saved",
        description: "Your changes have been saved successfully.",
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-500" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Page</h2>
            <p className="text-muted-foreground">
              Editing: {page.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/${slug}`} target="_blank">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            className="bg-terracotta-500 hover:bg-terracotta-600"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder">Page Builder</TabsTrigger>
          <TabsTrigger value="settings">Page Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <PageBuilder
            sections={sections}
            onSectionsChange={setSections}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
              <CardDescription>
                Configure the basic settings for this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Page Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <SEOSection seo={seo || null} onSeoChange={setSeo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
