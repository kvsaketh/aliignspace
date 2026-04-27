import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Default footer content
const defaultFooterContent = {
  logo: "ALIIGNSPACE",
  tagline: "Spaces Crafted with Trust",
  description: "Cleaner designs. Sharper strategies. Spaces that become homes. Crafting interiors across Hyderabad & Nellore since 2021.",
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/about" },
        { label: "Our Portfolio", url: "/portfolio" },
        { label: "Design Process", url: "/process" },
        { label: "Blog", url: "/blog" },
        { label: "Contact Us", url: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Home Interiors", url: "/services/home-interiors" },
        { label: "Modular Kitchen", url: "/services/modular-kitchen" },
        { label: "Living Room Design", url: "/services/living-room" },
        { label: "Bedroom Design", url: "/services/bedroom" },
        { label: "Office Interiors", url: "/services/office-interiors" },
        { label: "Commercial Spaces", url: "/services/commercial" },
      ],
    },
  ],
  contact: {
    address: "NBR Towers, Road No. 36, Jawahar Colony, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 90304 44503",
    email: "hello@aliignspace.com",
    whatsapp: "+91 90304 44503",
  },
  social: [
    { platform: "Instagram", url: "https://instagram.com/aliignspace", icon: "instagram" },
    { platform: "Facebook", url: "https://facebook.com/aliignspace", icon: "facebook" },
    { platform: "YouTube", url: "https://youtube.com/@aliignspace", icon: "youtube" },
    { platform: "WhatsApp", url: "https://wa.me/919030444503", icon: "whatsapp" },
  ],
  newsletter: {
    title: "Newsletter",
    subtitle: "Stay updated with our latest projects, design trends, and exclusive offers delivered to your inbox.",
    buttonText: "Subscribe",
  },
  copyright: {
    companyName: "Alignspace",
    year: new Date().getFullYear(),
    designerName: "Amalyte",
    designerUrl: "https://amalyte.com",
    showHeart: true,
  },
  bottomLinks: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" },
    { label: "Sitemap", url: "/sitemap" },
  ],
  awards: [
    { label: "Best Interior Studio 2023", icon: "award" },
    { label: "5-Star Rated on Google", icon: "star" },
    { label: "Trusted by 500+ Families", icon: "shield" },
  ],
  founders: {
    text: "Founded by Ar. Samhitha Nagasudra & Ar. Murali · NOM Design & NOM Operations",
  },
};

// GET /api/global-blocks/footer - Get footer content
export async function GET() {
  try {
    let footer = await prisma.globalBlock.findUnique({
      where: {
        type_name: {
          type: "FOOTER",
          name: "main",
        },
      },
    });

    if (!footer) {
      // Create default footer
      footer = await prisma.globalBlock.create({
        data: {
          type: "FOOTER",
          name: "main",
          content: defaultFooterContent,
          isActive: true,
        },
      });
    }

    return NextResponse.json(footer.content);
  } catch (error) {
    console.error("Error fetching footer:", error);
    return NextResponse.json(defaultFooterContent);
  }
}

// PUT /api/global-blocks/footer - Update footer content
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const footer = await prisma.globalBlock.upsert({
      where: {
        type_name: {
          type: "FOOTER",
          name: "main",
        },
      },
      update: {
        content: body,
      },
      create: {
        type: "FOOTER",
        name: "main",
        content: body,
        isActive: true,
      },
    });

    return NextResponse.json(footer.content);
  } catch (error) {
    console.error("Error updating footer:", error);
    return NextResponse.json(
      { error: "Failed to update footer" },
      { status: 500 }
    );
  }
}
