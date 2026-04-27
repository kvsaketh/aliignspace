import { prisma } from "@/lib/prisma";
import {
  defaultAertsenHomePage,
  defaultAertsenAboutPage,
  defaultAertsenServicesPage,
  defaultAertsenPortfolioPage,
} from "@/lib/cms-page";

export type SeedResult = {
  created: number;
  updated: number;
  skipped: number;
};

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function seedAertsenPages(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  const pageConfigs = [
    { slug: "home", data: defaultAertsenHomePage },
    { slug: "about", data: defaultAertsenAboutPage },
    { slug: "services", data: defaultAertsenServicesPage },
    { slug: "portfolio", data: defaultAertsenPortfolioPage },
  ];

  for (const config of pageConfigs) {
    const existing = await prisma.page.findUnique({
      where: { slug: config.slug },
      include: { sections: true },
    });

    if (!existing) {
      await prisma.page.create({
        data: {
          title: config.data.title,
          slug: config.data.slug,
          status: config.data.status as any,
          seo: {
            create: config.data.seo,
          },
          sections: {
            create: config.data.sections.map((section: any) => ({
              type: section.type,
              order: section.order,
              props: section.props || {},
            })),
          },
        },
      });
      created++;
    } else {
      // Update page title/status and replace sections
      await prisma.page.update({
        where: { id: existing.id },
        data: {
          title: config.data.title,
          status: config.data.status as any,
        },
      });

      // Delete existing sections
      await prisma.section.deleteMany({
        where: { pageId: existing.id },
      });

      // Create new sections
      await prisma.section.createMany({
        data: config.data.sections.map((section: any) => ({
          pageId: existing.id,
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      });

      // Update or create SEO
      if (existing.seoId) {
        await prisma.sEO.update({
          where: { id: existing.seoId },
          data: config.data.seo,
        });
      } else {
        const seo = await prisma.sEO.create({
          data: config.data.seo,
        });
        await prisma.page.update({
          where: { id: existing.id },
          data: { seoId: seo.id },
        });
      }

      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── Services ─────────────────────────────────────────────────────────────────

const defaultServices = [
  {
    title: "Full Home Interiors",
    slug: "full-home-interiors",
    description:
      "Transform your entire home with our comprehensive interior design solutions. From concept to completion, we handle every detail to create a cohesive, beautiful living space that reflects your personality and lifestyle.",
    shortDesc: "Complete turnkey transformation of your entire home.",
    icon: "home",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
    features: ["3D Visualization", "Material Selection", "Project Management", "Custom Furniture"],
    processSteps: [
      { number: "01", title: "Consultation", description: "Understand your vision and requirements.", checklist: ["Site visit", "Moodboard creation"] },
      { number: "02", title: "Design", description: "Create detailed 3D designs and layouts.", checklist: ["3D renders", "Material finalization"] },
      { number: "03", title: "Execution", description: "Precision manufacturing and installation.", checklist: ["Quality checks", "Milestone updates"] },
      { number: "04", title: "Handover", description: "Final walkthrough and documentation.", checklist: ["Final QC", "Warranty docs"] },
    ],
    stats: { priceRange: "₹ 8L – ₹ 50L+", deliveryTime: "60–90 Days", warranty: "10 Years" },
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  {
    title: "Modular Kitchen",
    slug: "modular-kitchen",
    description:
      "Design the heart of your home with our modular kitchen solutions. We combine smart storage, premium finishes, and elegant aesthetics to create kitchens that are as functional as they are beautiful.",
    shortDesc: "Smart kitchens with premium finishes and hardware.",
    icon: "utensils",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    features: ["Smart Storage", "Premium Hardware", "Custom Layouts", "Easy Maintenance"],
    processSteps: [
      { number: "01", title: "Measurements", description: "Precise site measurements and layout planning.", checklist: ["Site survey", "Layout options"] },
      { number: "02", title: "Design", description: "3D kitchen design with material selection.", checklist: ["3D renders", "Hardware selection"] },
      { number: "03", title: "Manufacturing", description: "CNC-precision manufacturing in our factory.", checklist: ["Material cutting", "Edge banding"] },
      { number: "04", title: "Installation", description: "Expert installation with final checks.", checklist: ["Cabinet fitting", "Appliance integration"] },
    ],
    stats: { priceRange: "₹ 2L – ₹ 15L+", deliveryTime: "30–45 Days", warranty: "10 Years" },
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
  },
  {
    title: "Living Room Interiors",
    slug: "living-room-interiors",
    description:
      "Create a living room that welcomes, impresses, and comforts. Our designs balance aesthetics with functionality, ensuring your living space becomes the perfect backdrop for everyday moments and special occasions.",
    shortDesc: "Statement spaces that balance comfort and style.",
    icon: "sofa",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80",
    features: ["TV Unit Design", "False Ceiling", "Lighting Design", "Furniture Curation"],
    processSteps: [
      { number: "01", title: "Discovery", description: "Understand your lifestyle and preferences.", checklist: ["Style quiz", "Inspiration board"] },
      { number: "02", title: "Concept", description: "Design concept with 3D visualization.", checklist: ["Layout options", "Material palette"] },
      { number: "03", title: "Build", description: "Manufacturing and on-site execution.", checklist: ["Carpentry", "Electrical work"] },
      { number: "04", title: "Style", description: "Final styling and accessory placement.", checklist: ["Soft furnishings", "Art curation"] },
    ],
    stats: { priceRange: "₹ 3L – ₹ 20L+", deliveryTime: "30–60 Days", warranty: "10 Years" },
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
  {
    title: "Bedroom Interiors",
    slug: "bedroom-interiors",
    description:
      "Design a sanctuary for rest and rejuvenation. Our bedroom interiors focus on comfort, tranquility, and personal expression — creating spaces that help you unwind and wake up refreshed.",
    shortDesc: "Serene retreats crafted for rest and relaxation.",
    icon: "bed",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
    features: ["Wardrobe Design", "Bed Design", "Lighting", "Wall Treatments"],
    processSteps: [
      { number: "01", title: "Consultation", description: "Discuss needs, style, and budget.", checklist: ["Requirement gathering", "Budget planning"] },
      { number: "02", title: "Design", description: "3D bedroom design with material selection.", checklist: ["Layout finalization", "Color scheme"] },
      { number: "03", title: "Production", description: "In-house manufacturing of furniture.", checklist: ["CNC cutting", "Finishing"] },
      { number: "04", title: "Install", description: "Installation and final styling.", checklist: ["Furniture placement", "Bedding setup"] },
    ],
    stats: { priceRange: "₹ 2L – ₹ 15L+", deliveryTime: "30–50 Days", warranty: "10 Years" },
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
  },
  {
    title: "Wardrobe Design",
    slug: "wardrobe-design",
    description:
      "Maximize storage and style with our custom wardrobe solutions. From walk-in closets to compact built-ins, we design wardrobes that organize your life while complementing your interior aesthetic.",
    shortDesc: "Custom wardrobe solutions for every space and style.",
    icon: "shirt",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1920&q=80",
    features: ["Sliding Doors", "Walk-in Closets", "Smart Organizers", "Mirror Integration"],
    processSteps: [
      { number: "01", title: "Survey", description: "Space assessment and measurement.", checklist: ["Dimension check", "Storage audit"] },
      { number: "02", title: "Design", description: "Interior layout and exterior finish selection.", checklist: ["3D renders", "Material samples"] },
      { number: "03", title: "Build", description: "Precision manufacturing.", checklist: ["Panel cutting", "Hardware fitting"] },
      { number: "04", title: "Install", description: "On-site assembly and fitting.", checklist: ["Alignment check", "Final polish"] },
    ],
    stats: { priceRange: "₹ 1L – ₹ 8L+", deliveryTime: "20–40 Days", warranty: "10 Years" },
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
  },
  {
    title: "Luxury Furniture",
    slug: "luxury-furniture",
    description:
      "Elevate your interiors with bespoke luxury furniture crafted to perfection. Each piece is designed to be a statement of refined taste, using premium materials and master craftsmanship.",
    shortDesc: "Bespoke luxury furniture crafted to perfection.",
    icon: "gem",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&q=80",
    features: ["Custom Designs", "Premium Materials", "Handcrafted", "Lifetime Durability"],
    processSteps: [
      { number: "01", title: "Concept", description: "Design concept based on your vision.", checklist: ["Sketching", "Material selection"] },
      { number: "02", title: "Prototype", description: "Sample creation for approval.", checklist: ["Miniature model", "Finish sample"] },
      { number: "03", title: "Craft", description: "Master craftsmen build your furniture.", checklist: ["Joinery", "Upholstery"] },
      { number: "04", title: "Deliver", description: "White-glove delivery and placement.", checklist: ["Packaging", "Installation"] },
    ],
    stats: { priceRange: "₹ 50K – ₹ 10L+", deliveryTime: "45–90 Days", warranty: "Lifetime" },
    gallery: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
];

export async function seedAertsenServices(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultServices.length; i++) {
    const svc = defaultServices[i];
    const existing = await prisma.service.findUnique({
      where: { slug: svc.slug },
    });

    if (!existing) {
      await prisma.service.create({
        data: {
          ...svc,
          sortOrder: i,
          isActive: true,
        } as any,
      });
      created++;
    } else {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          title: svc.title,
          description: svc.description,
          shortDesc: svc.shortDesc,
          icon: svc.icon,
          image: svc.image,
          heroImage: svc.heroImage,
          features: svc.features as any,
          processSteps: svc.processSteps as any,
          stats: svc.stats as any,
          gallery: svc.gallery as any,
          sortOrder: i,
          isActive: true,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── Portfolio Projects ───────────────────────────────────────────────────────

const defaultPortfolioProjects = [
  {
    title: "Natural Perseverance",
    slug: "natural-perseverance",
    category: "Residential",
    location: "Jubilee Hills, Hyderabad",
    description:
      "A serene 3,200 sq ft residence where natural materials meet modern minimalism. Warm oak flooring, stone accents, and floor-to-ceiling windows create a tranquil retreat in the heart of the city.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Ravi & Priya Sharma",
    projectType: "3BHK Apartment",
    budget: "₹ 27 Lakhs",
    area: "3,200 sq ft",
    featured: true,
    status: "PUBLISHED",
  },
  {
    title: "Lustrous Home in The Sky",
    slug: "lustrous-home-in-the-sky",
    category: "Residential",
    location: "Banjara Hills, Hyderabad",
    description:
      "A breathtaking penthouse that lives up to its name. Gold-accented interiors, bespoke lighting, and panoramic city views make this 4,500 sq ft home a true sky sanctuary.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Vikram Reddy",
    projectType: "4BHK Penthouse",
    budget: "₹ 45 Lakhs",
    area: "4,500 sq ft",
    featured: true,
    status: "PUBLISHED",
  },
  {
    title: "Euphoric Walls",
    slug: "euphoric-walls",
    category: "Residential",
    location: "Gachibowli, Hyderabad",
    description:
      "An explosion of art and color meets sophisticated design. This 2,800 sq ft villa features custom murals, textured walls, and curated art pieces that create an atmosphere of pure joy.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Anita & Suresh Kumar",
    projectType: "3BHK Villa",
    budget: "₹ 32 Lakhs",
    area: "2,800 sq ft",
    featured: true,
    status: "PUBLISHED",
  },
  {
    title: "Modern Home Close To Nature",
    slug: "modern-home-close-to-nature",
    category: "Residential",
    location: "Kondapur, Hyderabad",
    description:
      "Biophilic design at its finest. This 3,500 sq ft home blurs the line between indoors and outdoors with living walls, natural light optimization, and organic material palettes.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Meera & Arjun Nair",
    projectType: "4BHK Independent House",
    budget: "₹ 38 Lakhs",
    area: "3,500 sq ft",
    featured: false,
    status: "PUBLISHED",
  },
  {
    title: "Kitchens Descended From The Heavens",
    slug: "kitchens-descended-from-the-heavens",
    category: "Kitchen",
    location: "HITEC City, Hyderabad",
    description:
      "A modular kitchen that truly feels divine. Featuring imported Italian marble, gold-brass hardware, smart appliances integration, and a stunning island that anchors the entire home.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Deepa & Karthik Iyer",
    projectType: "Modular Kitchen",
    budget: "₹ 18 Lakhs",
    area: "450 sq ft",
    featured: false,
    status: "PUBLISHED",
  },
  {
    title: "Breach The Boring!",
    slug: "breach-the-boring",
    category: "Residential",
    location: "Madhapur, Hyderabad",
    description:
      "A bold, unconventional home that breaks every rule beautifully. Industrial elements meet bohemian flair in this 2,400 sq ft apartment designed for a creative professional couple.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Rohan & Neha Gupta",
    projectType: "2BHK Apartment",
    budget: "₹ 22 Lakhs",
    area: "2,400 sq ft",
    featured: false,
    status: "PUBLISHED",
  },
  {
    title: "Modern Life, Contemporary Living",
    slug: "modern-life-contemporary-living",
    category: "Residential",
    location: "Kukatpally, Hyderabad",
    description:
      "Clean lines, smart storage, and a neutral palette define this 3,000 sq ft contemporary home. Designed for a young family, it balances style with the practical demands of daily life.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Sunita & Prakash Rao",
    projectType: "3BHK Apartment",
    budget: "₹ 28 Lakhs",
    area: "3,000 sq ft",
    featured: false,
    status: "PUBLISHED",
  },
  {
    title: "Luxury Wrapped With Gold",
    slug: "luxury-wrapped-with-gold",
    category: "Residential",
    location: "Film Nagar, Hyderabad",
    description:
      "Opulence redefined in this 5,000 sq ft luxury villa. Gold leaf accents, imported marble, crystal chandeliers, and bespoke furniture create an environment of uncompromising elegance.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    mainVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    mainVideoType: "YOUTUBE",
    clientName: "Rajesh & Lakshmi Devi",
    projectType: "5BHK Villa",
    budget: "₹ 65 Lakhs",
    area: "5,000 sq ft",
    featured: false,
    status: "PUBLISHED",
  },
];

export async function seedAertsenPortfolio(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultPortfolioProjects.length; i++) {
    const proj = defaultPortfolioProjects[i];
    const existing = await prisma.portfolioProject.findUnique({
      where: { slug: proj.slug },
    });

    if (!existing) {
      await prisma.portfolioProject.create({
        data: {
          ...proj,
          sortOrder: i,
        } as any,
      });
      created++;
    } else {
      await prisma.portfolioProject.update({
        where: { id: existing.id },
        data: {
          title: proj.title,
          category: proj.category,
          location: proj.location,
          description: proj.description,
          image: proj.image,
          images: proj.images as any,
          mainVideoUrl: proj.mainVideoUrl,
          mainVideoType: proj.mainVideoType,
          clientName: proj.clientName,
          projectType: proj.projectType,
          budget: proj.budget,
          area: proj.area,
          featured: proj.featured,
          status: proj.status as any,
          sortOrder: i,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const defaultTestimonials = [
  // Google Reviews (3)
  {
    type: "GOOGLE",
    name: "Rahul Mehta",
    location: "Jubilee Hills, Hyderabad",
    review:
      "Aertsen Living transformed our 3BHK apartment beyond our wildest dreams. The attention to detail, quality of materials, and professionalism of the team were exceptional. Every deadline was met, and the final result exceeded our expectations. Highly recommended!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    type: "GOOGLE",
    name: "Sneha Kapoor",
    location: "Banjara Hills, Hyderabad",
    review:
      "We interviewed five interior designers before choosing Aertsen, and it was the best decision we made. Their transparent pricing, 3D visualization, and on-time delivery made the entire process stress-free. Our modular kitchen is the envy of everyone who visits!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    type: "GOOGLE",
    name: "Arjun Reddy",
    location: "Gachibowli, Hyderabad",
    review:
      "The team at Aertsen truly understands luxury. They designed our penthouse with a perfect blend of modern aesthetics and functional design. The gold accents and custom furniture pieces are stunning. Worth every rupee invested.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  // Video Testimonials (3)
  {
    type: "VIDEO",
    name: "Priya Sharma",
    location: "Kondapur, Hyderabad",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    type: "VIDEO",
    name: "Vikram Naidu",
    location: "HITEC City, Hyderabad",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    type: "VIDEO",
    name: "Anita Reddy",
    location: "Madhapur, Hyderabad",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export async function seedAertsenTestimonials(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultTestimonials.length; i++) {
    const t = defaultTestimonials[i];
    const existing = await prisma.testimonial.findFirst({
      where: {
        name: t.name,
        type: t.type,
      },
    });

    if (!existing) {
      await prisma.testimonial.create({
        data: {
          ...t,
          sortOrder: i,
          isActive: true,
        } as any,
      });
      created++;
    } else {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          location: t.location,
          review: (t as any).review ?? null,
          rating: (t as any).rating ?? null,
          videoUrl: (t as any).videoUrl ?? null,
          avatarUrl: t.avatarUrl,
          sortOrder: i,
          isActive: true,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const defaultFAQs = [
  {
    question: "What is the cost of full home interiors in Hyderabad?",
    answer:
      "The cost of full home interiors in Hyderabad typically ranges from ₹ 8 lakhs to ₹ 50 lakhs or more, depending on the size of your home, materials chosen, and design complexity. We provide detailed, transparent quotations with no hidden costs. A typical 3BHK (1,800 sq ft) home interior starts around ₹ 15–20 lakhs with premium finishes.",
    category: "pricing",
  },
  {
    question: "How long does it take to complete home interiors?",
    answer:
      "Most residential interior projects take between 60 to 90 days from design finalization to handover. Smaller projects like modular kitchens can be completed in 30–45 days, while larger villas may take up to 120 days. We provide a detailed timeline during the design phase and keep you updated at every milestone.",
    category: "timeline",
  },
  {
    question: "Do you provide only modular kitchen or single room interiors?",
    answer:
      "Yes, absolutely! While we specialize in full home interiors, we also offer modular kitchen design, living room interiors, bedroom design, wardrobe solutions, and single-room makeovers. Every project receives the same attention to detail regardless of size.",
    category: "services",
  },
  {
    question: "What makes Aertsen Living different?",
    answer:
      "Aertsen Living stands apart through our commitment to transparency, quality, and design excellence. We offer: 100% in-house manufacturing for quality control, detailed 3D visualization before execution, fixed timelines with penalty clauses for delays, premium materials with certifications, and a 10-year warranty on all our work. Most importantly, we believe in building trust through honest communication.",
    category: "general",
  },
  {
    question: "Do you offer customized interior designs?",
    answer:
      "Every project we undertake is fully customized to reflect your personality, lifestyle, and preferences. We don't believe in template-based designs. Our process starts with understanding your vision, followed by mood boards, 3D renders, and unlimited revisions until you're completely satisfied with the design.",
    category: "design",
  },
  {
    question: "Can I visit your factory?",
    answer:
      "Yes, we encourage all our clients to visit our state-of-the-art manufacturing facility. You'll see firsthand how we maintain quality standards, from CNC cutting and edge banding to finishing and hardware installation. Factory visits can be scheduled by appointment with your design consultant.",
    category: "general",
  },
  {
    question: "Do you provide warranty on interiors?",
    answer:
      "Yes, we provide a comprehensive 10-year warranty on all our interior work, including cabinetry, wardrobes, modular kitchens, and furniture. This covers manufacturing defects, hardware issues, and structural problems. We also offer lifetime support for maintenance and repairs at nominal costs.",
    category: "warranty",
  },
];

export async function seedAertsenFAQs(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultFAQs.length; i++) {
    const faq = defaultFAQs[i];
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });

    if (!existing) {
      await prisma.fAQ.create({
        data: {
          ...faq,
          sortOrder: i,
          isActive: true,
        },
      });
      created++;
    } else {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: {
          answer: faq.answer,
          category: faq.category,
          sortOrder: i,
          isActive: true,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── Milestones ───────────────────────────────────────────────────────────────

const defaultMilestones = [
  { number: "1000", suffix: "+", label: "Projects Delivered" },
  { number: "1500", suffix: "+", label: "Happy Customers" },
  { number: "10", suffix: " yrs", label: "Warranty Provided" },
  { number: "200", suffix: "+", label: "Aertsen Crew" },
];

export async function seedAertsenMilestones(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultMilestones.length; i++) {
    const m = defaultMilestones[i];
    const existing = await prisma.milestone.findFirst({
      where: { label: m.label },
    });

    if (!existing) {
      await prisma.milestone.create({
        data: {
          ...m,
          sortOrder: i,
          isActive: true,
        },
      });
      created++;
    } else {
      await prisma.milestone.update({
        where: { id: existing.id },
        data: {
          number: m.number,
          suffix: m.suffix,
          sortOrder: i,
          isActive: true,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}

// ─── Timeline Events ──────────────────────────────────────────────────────────

const defaultTimelineEvents = [
  { date: "Nov 2019", title: "The Beginning", description: "Aertsen Living was founded with a vision to transform interior design in Hyderabad. A small team of passionate designers set out to build trust in an industry plagued by hidden costs and missed deadlines." },
  { date: "Jul 2020", title: "First 100 Projects", description: "Despite the challenging pandemic year, we completed our first 100 interior projects, establishing a reputation for reliability and design excellence." },
  { date: "Sep 2020", title: "Factory Launch", description: "Launched our state-of-the-art manufacturing facility with CNC machinery and skilled craftsmen, enabling complete in-house production and quality control." },
  { date: "Oct 2020", title: "Team Expansion", description: "Grew our design and execution team to 50+ members, bringing diverse expertise in architecture, interior design, and project management." },
  { date: "Nov 2020", title: "500 Projects Milestone", description: "Crossed the 500-project mark with a 98% client satisfaction rate, validating our commitment to transparency and quality." },
  { date: "Feb 2021", title: "Premium Services Launch", description: "Introduced luxury interior design services catering to high-end villas and penthouses, with bespoke furniture and imported materials." },
  { date: "May 2021", title: "1000 Projects Delivered", description: "Reached the milestone of 1,000 completed projects across residential, commercial, and kitchen categories." },
  { date: "Jun 2021", title: "Design Awards", description: "Recognized by the Indian Interior Design Association for excellence in residential interior design and sustainable practices." },
  { date: "Sep 2021", title: "1500 Happy Customers", description: "Celebrated 1,500 happy customers with a referral rate of over 60%, proving that trust breeds growth." },
  { date: "Dec 2021", title: "Technology Integration", description: "Implemented advanced 3D visualization and project management tools to enhance client experience and project transparency." },
  { date: "Jun 2022", title: "PAN India Vision", description: "Announced expansion plans to Bangalore, Chennai, and Mumbai, bringing the Aertsen promise of trust and quality to more Indian homes." },
];

export async function seedAertsenTimeline(): Promise<SeedResult> {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < defaultTimelineEvents.length; i++) {
    const event = defaultTimelineEvents[i];
    const existing = await prisma.timelineEvent.findFirst({
      where: {
        date: event.date,
        title: event.title,
      },
    });

    if (!existing) {
      await prisma.timelineEvent.create({
        data: {
          ...event,
          sortOrder: i,
          isActive: true,
        },
      });
      created++;
    } else {
      await prisma.timelineEvent.update({
        where: { id: existing.id },
        data: {
          description: event.description,
          sortOrder: i,
          isActive: true,
        },
      });
      updated++;
    }
  }

  return { created, updated, skipped };
}
