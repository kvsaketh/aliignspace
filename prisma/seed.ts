import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function ytThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

async function main() {
  // Admin user
  const password = await bcrypt.hash("aliignspace@admin2024", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@aliignspace.com" },
    update: {},
    create: { email: "admin@aliignspace.com", password, name: "ALIIGNSPACE Admin", role: "ADMIN" },
  });
  console.log("✅ Admin user:", user.email);

  // Clear existing portfolio projects and re-seed
  await prisma.portfolioProject.deleteMany({});

  const projects = [
    {
      title: "Stunning 3BHK — Urban Trilla, Mokila",
      category: "3BHK Apartment",
      location: "Urban Trilla, Mokila, Hyderabad",
      description: "3000 SFT flat featuring traditional Indian bedroom with cane shutters and Pandiri Mancham, contemporary bedroom, modern living room, modular kitchen, and home theatre.",
      videoUrl: "https://www.youtube.com/watch?v=QodXhFHptcQ",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "Elegant Traditional Interiors — MyHome Tridasa",
      category: "3BHK Apartment",
      location: "MyHome Tridasa, Hyderabad",
      description: "Traditional interiors on a budget — timeless design with warm textures and classic Indian motifs.",
      videoUrl: "https://www.youtube.com/watch?v=OG6s7mUYg1I",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "MyHome Tridasa Vibes — 3BHK",
      category: "3BHK Apartment",
      location: "MyHome Tridasa, Hyderabad",
      description: "A full 3BHK interior showcase blending comfort and contemporary aesthetics.",
      videoUrl: "https://www.youtube.com/watch?v=ULkdG1rU5p0",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Wholesome & Warm 3BHK Home",
      category: "3BHK Apartment",
      location: "Hyderabad",
      description: "A warm and functional 3BHK design blending functionality with charm.",
      videoUrl: "https://www.youtube.com/watch?v=IcS7FKf2Oqo",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Classic Wood — 3BHK Home Interiors",
      category: "3BHK Apartment",
      location: "Hyderabad",
      description: "Classic wood-themed 3BHK interiors with style in every angle.",
      videoUrl: "https://www.youtube.com/watch?v=BjM2jc8P1QE",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Turnkey Home Interiors",
      category: "Home Interiors",
      location: "Hyderabad",
      description: "Complete turnkey interior solutions — design to execution, all under one roof.",
      videoUrl: "https://www.youtube.com/watch?v=KyQo0viGwYs",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "A Touch of Grey — Warm Home Interiors",
      category: "Home Interiors",
      location: "Hyderabad",
      description: "Grey-themed warm and blissful home interiors that feel cozy and sophisticated.",
      videoUrl: "https://www.youtube.com/watch?v=Chq4MCjwfoA",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Traditional Indian Art Themed Interiors",
      category: "Home Interiors",
      location: "Hyderabad",
      description: "Rich Indian art-themed interiors celebrating traditional craftsmanship and culture.",
      videoUrl: "https://www.youtube.com/watch?v=acXLnN1905U",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "Bright & Glitter — Lansum Eden Garden 3BHK",
      category: "3BHK Apartment",
      location: "Lansum Eden Garden, Hyderabad",
      description: "Bright and glitter-themed 3BHK interiors that bring energy and elegance together.",
      videoUrl: "https://www.youtube.com/watch?v=B3JgPvf1Eo4",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Classic Themed 3BHK — Hyderabad",
      category: "3BHK Apartment",
      location: "Hyderabad",
      description: "A classic themed 3BHK home interior that stands the test of time.",
      videoUrl: "https://www.youtube.com/watch?v=4zwXb8bgouY",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Fusion Traditional & Modern 3BHK",
      category: "3BHK Apartment",
      location: "Hyderabad",
      description: "Fusion of traditional elements blending beautifully with modern 3BHK design.",
      videoUrl: "https://www.youtube.com/watch?v=0dto9Lzsx5c",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Stylish Villa Interiors — Vajram Aster Homes",
      category: "Villa",
      location: "Vajram Aster Homes, Hyderabad",
      description: "Stylish and unique villa interior design that redefines luxury living.",
      videoUrl: "https://www.youtube.com/watch?v=qA9JhTACz00",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "3BHK Interiors — Jains Balaji Casa",
      category: "3BHK Apartment",
      location: "Jains Balaji Casa, Hyderabad",
      description: "A complete 3BHK home interior showcase at Jains Balaji Casa.",
      videoUrl: "https://www.youtube.com/watch?v=0dgBMrPIZ4I",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "3BHK Home Tour — Aparna Marigold",
      category: "3BHK Apartment",
      location: "Aparna Marigold, Hyderabad",
      description: "Complete 3BHK home tour with thoughtful interior design at Aparna Marigold.",
      videoUrl: "https://www.youtube.com/watch?v=vvNgdZ7tBd0",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Bedroom Renovation Before vs After",
      category: "Bedroom Design",
      location: "",
      description: "Complete bedroom transformation — stunning before and after renovation reveal.",
      videoUrl: "https://www.youtube.com/shorts/bgjLjZ7tU0w",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Ultimate Space-Saving Bedroom Design",
      category: "Bedroom Design",
      location: "",
      description: "Smart space-saving bedroom design ideas for compact homes.",
      videoUrl: "https://www.youtube.com/shorts/qA0GayHiS3c",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Smart Bedroom Design for Better Living",
      category: "Bedroom Design",
      location: "",
      description: "Smart bedroom design concepts that enhance your daily living experience.",
      videoUrl: "https://www.youtube.com/shorts/ijH1R10pWNI",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Design a Wardrobe Like This",
      category: "Wardrobe Design",
      location: "",
      description: "Wardrobe design ideas and inspiration for your dream storage solution.",
      videoUrl: "https://www.youtube.com/shorts/HLSjx3HU35E",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Sage Green — The New Elegant",
      category: "Design Tips",
      location: "",
      description: "Sage green is the new elegant — explore this trending color theme for interiors.",
      videoUrl: "https://www.youtube.com/shorts/bWd6DB5d628",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "A Warmed Up Kitchen",
      category: "Kitchen Design",
      location: "",
      description: "Warm kitchen design showcase — cozy, functional, and beautiful.",
      videoUrl: "https://www.youtube.com/shorts/HQSBn2yfM1U",
      videoType: "Short",
      featured: false,
      status: "PUBLISHED" as const,
    },
  ];

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    // Extract video ID for thumbnail
    const regularMatch = p.videoUrl?.match(/[?&]v=([^&]+)/);
    const shortsMatch = p.videoUrl?.match(/shorts\/([^?&]+)/);
    const videoId = regularMatch?.[1] || shortsMatch?.[1] || "";
    const image = videoId ? ytThumb(videoId) : "";

    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.portfolioProject.create({
      data: { ...p, slug, image, images: [], sortOrder: i },
    });
  }
  console.log(`✅ Portfolio: ${projects.length} projects seeded`);

  // Menus
  await prisma.menu.upsert({
    where: { name: "Main Navigation" },
    update: {},
    create: {
      name: "Main Navigation",
      location: "HEADER",
      isActive: true,
      items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Process", href: "/process" },
        { label: "Contact", href: "/contact" },
      ],
    },
  });
  await prisma.menu.upsert({
    where: { name: "Footer Links" },
    update: {},
    create: {
      name: "Footer Links",
      location: "FOOTER",
      isActive: true,
      items: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  });
  console.log("✅ Menus seeded");
}

main().catch(console.error).finally(() => prisma.$disconnect());
