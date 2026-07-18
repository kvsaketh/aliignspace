import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function ytThumb(videoId: string) {
  // hqdefault is guaranteed to exist for every video; maxresdefault 404s for
  // videos YouTube never generated a high-res thumbnail for (seen in practice).
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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
      category: "3BHK",
      location: "Urban Trilla, Mokila, Hyderabad",
      description: "3000 SFT flat featuring traditional Indian bedroom with cane shutters and Pandiri Mancham, contemporary bedroom, modern living room, modular kitchen, and home theatre.",
      videoUrl: "https://www.youtube.com/watch?v=QodXhFHptcQ",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "Elegant Traditional Interiors — MyHome Tridasa",
      category: "2BHK",
      location: "MyHome Tridasa, Hyderabad",
      description: "Traditional interiors on a budget — timeless design with warm textures and classic Indian motifs.",
      videoUrl: "https://www.youtube.com/watch?v=OG6s7mUYg1I",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "MyHome Tridasa Vibes — 3BHK",
      category: "3BHK",
      location: "MyHome Tridasa, Hyderabad",
      description: "A full 3BHK interior showcase blending comfort and contemporary aesthetics.",
      videoUrl: "https://www.youtube.com/watch?v=ULkdG1rU5p0",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Wholesome & Warm 3BHK Home",
      category: "3BHK",
      location: "Hyderabad",
      description: "A warm and functional 3BHK design blending functionality with charm.",
      videoUrl: "https://www.youtube.com/watch?v=IcS7FKf2Oqo",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Classic Wood — 3BHK Home Interiors",
      category: "3BHK",
      location: "Hyderabad",
      description: "Classic wood-themed 3BHK interiors with style in every angle.",
      videoUrl: "https://www.youtube.com/watch?v=BjM2jc8P1QE",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Turnkey Home Interiors",
      category: "3BHK",
      location: "Hyderabad",
      description: "Complete turnkey interior solutions — design to execution, all under one roof.",
      videoUrl: "https://www.youtube.com/watch?v=KyQo0viGwYs",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "A Touch of Grey — Warm Home Interiors",
      category: "3BHK",
      location: "Hyderabad",
      description: "Grey-themed warm and blissful home interiors that feel cozy and sophisticated.",
      videoUrl: "https://www.youtube.com/watch?v=Chq4MCjwfoA",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Traditional Indian Art Themed Interiors",
      category: "3BHK",
      location: "Hyderabad",
      description: "Rich Indian art-themed interiors celebrating traditional craftsmanship and culture.",
      videoUrl: "https://www.youtube.com/watch?v=acXLnN1905U",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "Bright & Glitter — Lansum Eden Garden 3BHK",
      category: "3BHK",
      location: "Lansum Eden Garden, Hyderabad",
      description: "Bright and glitter-themed 3BHK interiors that bring energy and elegance together.",
      videoUrl: "https://www.youtube.com/watch?v=B3JgPvf1Eo4",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Classic Themed 3BHK — Hyderabad",
      category: "3BHK",
      location: "Hyderabad",
      description: "A classic themed 3BHK home interior that stands the test of time.",
      videoUrl: "https://www.youtube.com/watch?v=4zwXb8bgouY",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Fusion Traditional & Modern 3BHK",
      category: "3BHK",
      location: "Hyderabad",
      description: "Fusion of traditional elements blending beautifully with modern 3BHK design.",
      videoUrl: "https://www.youtube.com/watch?v=0dto9Lzsx5c",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "Stylish Villa Interiors — Vajram Aster Homes",
      category: "Villas",
      location: "Vajram Aster Homes, Hyderabad",
      description: "Stylish and unique villa interior design that redefines luxury living.",
      videoUrl: "https://www.youtube.com/watch?v=qA9JhTACz00",
      videoType: "Regular",
      featured: true,
      status: "PUBLISHED" as const,
    },
    {
      title: "3BHK Interiors — Jains Balaji Casa",
      category: "3BHK",
      location: "Jains Balaji Casa, Hyderabad",
      description: "A complete 3BHK home interior showcase at Jains Balaji Casa.",
      videoUrl: "https://www.youtube.com/watch?v=0dgBMrPIZ4I",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    {
      title: "3BHK Home Tour — Aparna Marigold",
      category: "3BHK",
      location: "Aparna Marigold, Hyderabad",
      description: "Complete 3BHK home tour with thoughtful interior design at Aparna Marigold.",
      videoUrl: "https://www.youtube.com/watch?v=vvNgdZ7tBd0",
      videoType: "Regular",
      featured: false,
      status: "PUBLISHED" as const,
    },
    // YouTube Shorts intentionally excluded: they live as VIDEO testimonials
    // in the home page "Client Stories" row (managed at /admin/testimonials).
    // TODO: add once video links are available — Platina Cove (3BHK),
    // Arunraj (3BHK), Dishira (Villas), Pavani Towers (2BHK),
    // Kukatpally Office Space (Commercial Space).
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
