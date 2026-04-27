import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Briefcase,
  Image,
  MessageSquare,
  HelpCircle,
  Flag,
  Clock,
  CheckCircle2,
  XCircle,
  Rocket,
} from "lucide-react";
import SeedButton from "./SeedButton";

async function getPageStatus(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    select: { id: true, title: true, status: true },
  });
  return !!page;
}

async function getContentCounts() {
  const [servicesCount, portfolioCount, testimonialsCount, faqsCount] =
    await Promise.all([
      prisma.service.count(),
      prisma.portfolioProject.count(),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
    ]);

  return {
    services: servicesCount,
    portfolio: portfolioCount,
    testimonials: testimonialsCount,
    faqs: faqsCount,
  };
}

export default async function AertsenSeedPage() {
  const [homeExists, aboutExists, servicesExists, portfolioExists] =
    await Promise.all([
      getPageStatus("home"),
      getPageStatus("about"),
      getPageStatus("services"),
      getPageStatus("portfolio"),
    ]);

  const counts = await getContentCounts();

  const pageStatuses = [
    {
      title: "Home Page",
      slug: "home",
      exists: homeExists,
      icon: FileText,
    },
    {
      title: "About Page",
      slug: "about",
      exists: aboutExists,
      icon: FileText,
    },
    {
      title: "Services Page",
      slug: "services",
      exists: servicesExists,
      icon: FileText,
    },
    {
      title: "Portfolio Page",
      slug: "portfolio",
      exists: portfolioExists,
      icon: FileText,
    },
  ];

  const contentCards = [
    {
      title: "Services",
      count: counts.services,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Portfolio Projects",
      count: counts.portfolio,
      icon: Image,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Testimonials",
      count: counts.testimonials,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "FAQs",
      count: counts.faqs,
      icon: HelpCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Aertsen Content Seeding
        </h2>
        <p className="text-muted-foreground">
          One-click setup for the Aertsen website replication
        </p>
      </div>

      {/* Page Status Cards */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          Page Status
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pageStatuses.map((page) => {
            const Icon = page.icon;
            return (
              <Card key={page.slug}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {page.title}
                  </CardTitle>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {page.exists ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-700">
                          Created
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-red-700">
                          Not Found
                        </span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content Status Cards */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          Content Status
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contentCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{card.count}</div>
                    <Badge
                      variant={card.count > 0 ? "default" : "secondary"}
                      className={
                        card.count > 0
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {card.count > 0 ? "Seeded" : "Empty"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Seed Actions Section */}
      <Card className="border-dashed border-2">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-terracotta-100 flex items-center justify-center">
              <Rocket className="h-8 w-8 text-terracotta-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Seed All Aertsen Content
              </h3>
              <p className="text-muted-foreground max-w-lg">
                This action will create or update all Aertsen pages, services,
                portfolio projects, testimonials, FAQs, milestones, and timeline
                events with default data.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left w-full max-w-2xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>4 Pages</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>6 Services</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Image className="h-4 w-4" />
                <span>8 Projects</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>6 Testimonials</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
                <span>7 FAQs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flag className="h-4 w-4" />
                <span>4 Milestones</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>11 Timeline Events</span>
              </div>
            </div>

            <SeedButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
