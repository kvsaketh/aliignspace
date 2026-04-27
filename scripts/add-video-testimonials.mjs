import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addVideoTestimonialsSection() {
  console.log("Adding video-testimonials section to home page...");

  // Find the home page
  const homePage = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { sections: { orderBy: { order: "asc" } } },
  });

  if (!homePage) {
    console.log("❌ Home page not found. Please create it first.");
    return;
  }

  console.log(`Found home page with ${homePage.sections.length} sections`);

  // Check if video-testimonials section already exists
  const existingVideoSection = homePage.sections.find(
    (s) => s.type === "video-testimonials"
  );

  if (existingVideoSection) {
    console.log("✅ Video testimonials section already exists!");
    await prisma.$disconnect();
    return;
  }

  // Find the portfolio section to determine where to insert
  const portfolioSection = homePage.sections.find(
    (s) => s.type === "portfolio-premium"
  );

  // Calculate order - place after portfolio
  let order = 6; // default
  if (portfolioSection) {
    order = portfolioSection.order + 1;
    
    // Reorder sections that come after portfolio
    const sectionsToReorder = homePage.sections.filter(s => s.order > portfolioSection.order);
    for (const section of sectionsToReorder) {
      await prisma.section.update({
        where: { id: section.id },
        data: { order: section.order + 1 },
      });
    }
    console.log(`Reordered ${sectionsToReorder.length} sections`);
  }

  // Create the video-testimonials section
  const newSection = await prisma.section.create({
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
  console.log(`   Section ID: ${newSection.id}`);
  console.log(`   Order: ${order} (between Portfolio and Testimonials)`);
  
  await prisma.$disconnect();
}

// Run the script
addVideoTestimonialsSection()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  });
