import { prisma } from "@/lib/prisma";

async function addVideoTestimonialsSection() {
  console.log("Adding video-testimonials section to home page...");

  // Find the home page
  const homePage = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { sections: { orderBy: { order: "asc" } } },
  });

  if (!homePage) {
    console.log("Home page not found. Creating new home page...");
    // Create home page with default sections
    const { defaultHomePage } = await import("@/lib/cms-page");
    
    await prisma.page.create({
      data: {
        title: defaultHomePage.title,
        slug: defaultHomePage.slug,
        status: defaultHomePage.status as any,
        seo: {
          create: defaultHomePage.seo,
        },
        sections: {
          create: defaultHomePage.sections.map((section) => ({
            type: section.type,
            order: section.order,
            props: section.props || {},
          })),
        },
      },
    });
    console.log("Home page created successfully with all sections!");
    return;
  }

  // Check if video-testimonials section already exists
  const existingVideoSection = homePage.sections.find(
    (s) => s.type === "video-testimonials"
  );

  if (existingVideoSection) {
    console.log("Video testimonials section already exists!");
    return;
  }

  // Find the portfolio section to determine where to insert
  const portfolioSection = homePage.sections.find(
    (s) => s.type === "portfolio-premium"
  );
  const testimonialsSection = homePage.sections.find(
    (s) => s.type === "testimonials-premium"
  );

  // Calculate order - place between portfolio and testimonials
  let order = 6; // default
  if (portfolioSection && testimonialsSection) {
    order = portfolioSection.order + 1;
    // Reorder sections after testimonials
    await prisma.section.updateMany({
      where: {
        pageId: homePage.id,
        order: { gt: portfolioSection.order },
      },
      data: {
        order: { increment: 1 },
      },
    });
  } else if (portfolioSection) {
    order = portfolioSection.order + 1;
  }

  // Create the video-testimonials section
  await prisma.section.create({
    data: {
      pageId: homePage.id,
      type: "video-testimonials",
      order: order,
      props: {
        title: "Hear It from Those Who Experienced It",
        subtitle: "Real stories from real homeowners",
        eyebrow: "Client Stories",
        description: "Watch authentic testimonials from our satisfied clients across Hyderabad and Nellore. Their experiences speak louder than our words.",
        autoplay: true,
        videos: [
          {
            id: "1",
            videoUrl: "",
            thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
            clientName: "Priya & Rahul Sharma",
            projectType: "3BHK Apartment",
            location: "Jubilee Hills",
            quote: "ALIIGNSPACE transformed our house into a dream home beyond our imagination!",
            duration: "2:34",
          },
          {
            id: "2",
            videoUrl: "",
            thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            clientName: "Anita Reddy",
            projectType: "4BHK Villa",
            location: "Gachibowli",
            quote: "Professional, transparent, and delivered exactly on time. Highly recommend!",
            duration: "1:45",
          },
          {
            id: "3",
            videoUrl: "",
            thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            clientName: "Vikram & Sneha",
            projectType: "Modular Kitchen",
            location: "Banjara Hills",
            quote: "Our kitchen is now the heart of our home. The design is absolutely stunning!",
            duration: "3:12",
          },
        ],
      },
    },
  });

  console.log("✅ Video testimonials section added successfully!");
  console.log(`   Positioned at order: ${order} (between Portfolio and Testimonials)`);
}

// Run the script
addVideoTestimonialsSection()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
