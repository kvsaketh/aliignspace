"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  seedAertsenPages,
  seedAertsenServices,
  seedAertsenPortfolio,
  seedAertsenTestimonials,
  seedAertsenFAQs,
  seedAertsenMilestones,
  seedAertsenTimeline,
} from "@/lib/aertsen-seed";

export type SeedActionResult = {
  success: boolean;
  message: string;
  details: string[];
};

export async function seedAertsenContent(): Promise<SeedActionResult> {
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
    const pagesResult = await seedAertsenPages();
    details.push(
      `Pages: ${pagesResult.created} created, ${pagesResult.updated} updated`
    );

    // 2. Services
    const servicesResult = await seedAertsenServices();
    details.push(
      `Services: ${servicesResult.created} created, ${servicesResult.updated} updated`
    );

    // 3. Portfolio
    const portfolioResult = await seedAertsenPortfolio();
    details.push(
      `Portfolio Projects: ${portfolioResult.created} created, ${portfolioResult.updated} updated`
    );

    // 4. Testimonials
    const testimonialsResult = await seedAertsenTestimonials();
    details.push(
      `Testimonials: ${testimonialsResult.created} created, ${testimonialsResult.updated} updated`
    );

    // 5. FAQs
    const faqsResult = await seedAertsenFAQs();
    details.push(
      `FAQs: ${faqsResult.created} created, ${faqsResult.updated} updated`
    );

    // 6. Milestones
    const milestonesResult = await seedAertsenMilestones();
    details.push(
      `Milestones: ${milestonesResult.created} created, ${milestonesResult.updated} updated`
    );

    // 7. Timeline
    const timelineResult = await seedAertsenTimeline();
    details.push(
      `Timeline Events: ${timelineResult.created} created, ${timelineResult.updated} updated`
    );

    return {
      success: true,
      message: "Aertsen content seeded successfully!",
      details,
    };
  } catch (error: any) {
    console.error("Error seeding Aertsen content:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while seeding content.",
      details: [],
    };
  }
}
