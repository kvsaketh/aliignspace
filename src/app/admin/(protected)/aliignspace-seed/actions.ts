"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  seedAliignspacePages,
  seedAliignspaceServices,
  seedAliignspacePortfolio,
  seedAliignspaceTestimonials,
  seedAliignspaceFAQs,
  seedAliignspaceMilestones,
  seedAliignspaceTimeline,
} from "@/lib/aliignspace-seed";

export type SeedActionResult = {
  success: boolean;
  message: string;
  details: string[];
};

export async function seedAliignspaceContent(): Promise<SeedActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized. Please log in as an admin.",
        details: [],
      };
    }

    const userRole = (session.user as any).role;
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      return {
        success: false,
        message: "Insufficient permissions. Only admins and editors can seed content.",
        details: [],
      };
    }

    const details: string[] = [];

    // 1. Pages
    const pagesResult = await seedAliignspacePages();
    details.push(
      `Pages: ${pagesResult.created} created, ${pagesResult.updated} updated`
    );

    // 2. Services
    const servicesResult = await seedAliignspaceServices();
    details.push(
      `Services: ${servicesResult.created} created, ${servicesResult.updated} updated`
    );

    // 3. Portfolio
    const portfolioResult = await seedAliignspacePortfolio();
    details.push(
      `Portfolio Projects: ${portfolioResult.created} created, ${portfolioResult.updated} updated`
    );

    // 4. Testimonials
    const testimonialsResult = await seedAliignspaceTestimonials();
    details.push(
      `Testimonials: ${testimonialsResult.created} created, ${testimonialsResult.updated} updated`
    );

    // 5. FAQs
    const faqsResult = await seedAliignspaceFAQs();
    details.push(
      `FAQs: ${faqsResult.created} created, ${faqsResult.updated} updated`
    );

    // 6. Milestones
    const milestonesResult = await seedAliignspaceMilestones();
    details.push(
      `Milestones: ${milestonesResult.created} created, ${milestonesResult.updated} updated`
    );

    // 7. Timeline
    const timelineResult = await seedAliignspaceTimeline();
    details.push(
      `Timeline Events: ${timelineResult.created} created, ${timelineResult.updated} updated`
    );

    revalidatePath("/admin/aliignspace-seed");
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Aliignspace content seeded successfully!",
      details,
    };
  } catch (error: any) {
    console.error("Error seeding Aliignspace content:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while seeding content.",
      details: [],
    };
  }
}
