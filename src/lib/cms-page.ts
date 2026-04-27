import { prisma } from "@/lib/prisma";

// Default home page configuration
export const defaultHomePage = {
  title: "Home",
  slug: "home",
  status: "PUBLISHED",
  sections: [
    {
      id: "hero-clean",
      type: "hero-clean",
      order: 0,
      props: {
        heading: "Crafting Spaces",
        subheading: "That Inspire",
        description: "We transform houses into dream homes with thoughtful design, quality craftsmanship, and a personal touch that reflects your unique style.",
        buttonText: "Start Your Project",
        buttonUrl: "/contact",
        secondaryButtonText: "View Portfolio",
        secondaryButtonUrl: "/portfolio",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
        showVideoButton: true,
      },
    },
    {
      id: "stats-v2",
      type: "stats-v2",
      order: 1,
      props: {
        stats: [
          { value: "50", suffix: "+", label: "Projects", description: "Successfully Delivered" },
          { value: "5", suffix: "+", label: "Years", description: "Of Excellence" },
          { value: "98", suffix: "%", label: "Satisfaction", description: "Client Happiness" },
          { value: "60", suffix: "-90 Days", label: "Delivery", description: "On-Time Completion" },
        ],
      },
    },
    {
      id: "benefits-v2",
      type: "benefits-v2",
      order: 2,
      props: {
        title: "The ALIIGNSPACE Advantage",
        subtitle: "Why Homeowners Trust Us",
        benefits: [
          {
            number: "01",
            title: "Complete Transparency",
            description: "Every material, finish, and specification is clearly documented and shared for your approval before work begins.",
            icon: "eye",
            features: ["Detailed quotations", "Material documentation", "Progress tracking"],
          },
          {
            number: "02",
            title: "Expert Design Team",
            description: "Our in-house design team handles everything from concept to installation — no third-party involvement, zero compromise.",
            icon: "users",
            features: ["Dedicated designers", "3D visualization", "Unlimited revisions"],
          },
          {
            number: "03",
            title: "Quality Assurance",
            description: "Premium materials and meticulous craftsmanship in every detail. We never compromise on quality.",
            icon: "shield",
            features: ["Premium materials", "Multi-level QC", "10-year warranty"],
          },
          {
            number: "04",
            title: "In-House Production",
            description: "Our own manufacturing unit ensures complete quality control and precision-timed delivery for every project.",
            icon: "factory",
            features: ["Own manufacturing", "Quality control", "On-time delivery"],
          },
        ],
      },
    },
    {
      id: "projects-v2",
      type: "projects-v2",
      order: 3,
      props: {
        title: "Our Work",
        subtitle: "Finest Projects We've Crafted",
        projects: [
          {
            title: "Natural Serenity",
            subtitle: "Where light meets tranquility",
            category: "3BHK Apartment",
            location: "Jubilee Hills, Hyderabad",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
            link: "/portfolio",
            year: "2024",
          },
          {
            title: "Lustrous Home in The Sky",
            subtitle: "Modern luxury redefined",
            category: "4BHK Penthouse",
            location: "Banjara Hills, Hyderabad",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
            link: "/portfolio",
            year: "2024",
          },
          {
            title: "Euphoric Walls",
            subtitle: "Contemporary elegance",
            category: "3BHK Villa",
            location: "Gachibowli, Hyderabad",
            image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
            link: "/portfolio",
            year: "2023",
          },
          {
            title: "Modern Life, Contemporary Living",
            subtitle: "Simplicity in every detail",
            category: "2BHK Apartment",
            location: "Kondapur, Hyderabad",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
            link: "/portfolio",
            year: "2023",
          },
        ],
      },
    },
    {
      id: "process-v2",
      type: "process-v2",
      order: 4,
      props: {
        title: "Steps to give your home an ALIIGNSPACE Makeover",
        subtitle: "Our Process",
        steps: [
          {
            number: "01",
            title: "Design Pitch",
            description: "Let us get to know you. Your visions will be captured by our design team and a preliminary cost presentation shared with you.",
            icon: "consultation",
            features: ["Requirement discussion & moodboard", "Tentative quotation shared", "Onboarding with 10% confirmation"],
          },
          {
            number: "02",
            title: "Count on our Designers",
            description: "Our designers present the final proposal tailored to your requirements. Sign off and sit back — watch your vision turn into reality.",
            icon: "design",
            features: ["3D designs & layouts presented", "Materials & finishes finalised", "Design sign-off & timeline confirmed"],
          },
          {
            number: "03",
            title: "Dreams Under Construction",
            description: "Our ground team makes your dreams a reality. With seamless production and execution, your project moves forward with full transparency.",
            icon: "execution",
            features: ["Project handover to execution team", "On-site work begins", "Milestone-based progress updates"],
          },
          {
            number: "04",
            title: "Step into your Dream Home",
            description: "Your ideal home is ready after completion of production and installation. Quality checks done, final walkthrough complete.",
            icon: "handover",
            features: ["Quality checks completed", "Final walkthrough & handover", "Warranty & documents handed over"],
          },
        ],
      },
    },
    {
      id: "craftsmanship-v2",
      type: "craftsmanship-v2",
      order: 5,
      props: {
        title: "Where Craftsmanship Meets Technology",
        subtitle: "Our Promise",
        description: "We combine traditional woodworking expertise with modern manufacturing technology to deliver interiors that stand the test of time.",
        features: [
          { title: "Precision Craftsmanship", description: "Computer-controlled cutting and skilled artisans for flawless finishes on every panel.", icon: "cnc" },
          { title: "Premium Hardware", description: "Hettich, Hafele & Blum — the gold standard in premium cabinetry fittings.", icon: "hardware" },
          { title: "Multi-Level QC", description: "Every unit passes through multiple quality checks before leaving our facility.", icon: "qc" },
          { title: "100% In-House", description: "No outsourcing. Complete control over quality, materials, and timelines.", icon: "inhouse" },
        ],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      },
    },
    {
      id: "services-clean",
      type: "services-clean",
      order: 6,
      props: {
        title: "Our Services",
        subtitle: "Comprehensive interior solutions tailored to your needs",
        services: [
          { title: "Full Home Interiors", description: "Complete transformation of your living spaces with custom designs that reflect your personality.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", link: "/services/home-interiors", icon: "home" },
          { title: "Modular Kitchen", description: "Smart, functional kitchens with premium finishes and intelligent storage solutions.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", link: "/services/modular-kitchen", icon: "utensils" },
          { title: "Living Room", description: "Elegant living spaces designed for comfort, conversation, and lasting impressions.", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", link: "/services/living-room", icon: "sofa" },
          { title: "Bedroom Design", description: "Serene retreats crafted for rest, relaxation, and rejuvenation.", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", link: "/services/bedroom", icon: "bed" },
          { title: "Office Interiors", description: "Productive workspaces that inspire creativity and reflect your brand.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", link: "/services/office-interiors", icon: "briefcase" },
          { title: "Commercial", description: "High-impact retail and commercial spaces designed to attract and engage.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", link: "/services/commercial", icon: "building" },
        ],
      },
    },
    {
      id: "testimonials-premium",
      type: "testimonials-premium",
      order: 7,
      props: {
        title: "What Our Clients Say",
        subtitle: "Rated 4.9★ on Google by 127+ happy families",
        rating: 4.9,
        reviewCount: 127,
        reviews: [
          { name: "Priya Sharma", rating: 5, text: "ALIIGNSPACE transformed our 3BHK in Jubilee Hills into an absolute dream. The team was professional, transparent with costs, and delivered ahead of schedule.", date: "2 weeks ago", avatar: "PS", location: "Jubilee Hills, Hyderabad" },
          { name: "Rajesh Kumar", rating: 5, text: "Best interior designers in Hyderabad — hands down. No hidden costs, stunning 3D renders before work began, and the final result matched every pixel.", date: "1 month ago", avatar: "RK", location: "Banjara Hills, Hyderabad" },
          { name: "Anita Reddy", rating: 5, text: "We were nervous about our first home renovation. ALIIGNSPACE made the entire experience stress-free. From design to handover in 78 days.", date: "2 months ago", avatar: "AR", location: "Gachibowli, Hyderabad" },
          { name: "Venkat Narayana", rating: 5, text: "Got our Nellore office interiors done — the team worked around our business hours and delivered a world-class workspace.", date: "3 months ago", avatar: "VN", location: "Nellore, AP" },
          { name: "Lakshmi Devi", rating: 5, text: "The modular kitchen ALIIGNSPACE designed is functional perfection. Every inch is optimised and they stayed exactly on budget.", date: "3 months ago", avatar: "LD", location: "Kondapur, Hyderabad" },
          { name: "Suresh Babu", rating: 5, text: "From the first meeting to the day we moved in, the experience was seamless. Transparent, trustworthy, and genuinely talented.", date: "4 months ago", avatar: "SB", location: "HITEC City, Hyderabad" },
        ],
      },
    },
    {
      id: "google-reviews",
      type: "google-reviews",
      order: 8,
      props: {
        title: "Loved by Homeowners",
        subtitle: "Real reviews from our Google Business Profile",
        rating: 4.9,
        reviewCount: 127,
        reviews: [
          { name: "Priya Sharma", rating: 5, text: "Exceptional work! ALIIGNSPACE transformed our 3BHK into a dream home. The team was professional and delivered on time.", date: "2 weeks ago" },
          { name: "Rajesh Kumar", rating: 5, text: "Best interior designers in Hyderabad! Transparent pricing and excellent quality. Highly recommended!", date: "1 month ago" },
          { name: "Anita Reddy", rating: 5, text: "From design to execution, everything was handled seamlessly. Our villa looks stunning!", date: "2 months ago" },
          { name: "Vikram Naidu", rating: 5, text: "Ar. Samhitha has an incredible eye for detail. The modular kitchen is a masterpiece — functional and beautiful.", date: "3 months ago" },
          { name: "Sujatha Rao", rating: 5, text: "Very professional team. They delivered exactly what was promised, within budget and on schedule.", date: "4 months ago" },
          { name: "Anil Babu", rating: 5, text: "The team at ALIIGNSPACE is truly dedicated. Every concern was addressed promptly and the result is breathtaking.", date: "5 months ago" },
        ],
      },
    },
    {
      id: "cta-clean",
      type: "cta-clean",
      order: 9,
      props: {
        title: "Ready to Transform Your Space?",
        subtitle: "Let's discuss your project and bring your vision to life. Schedule a free consultation with our design experts.",
        buttonText: "Get Free Consultation",
        buttonUrl: "/contact",
        showPhone: true,
        phoneNumber: "+91 90304 44503",
      },
    },
  ],
  seo: {
    metaTitle: "ALIIGNSPACE — Best Interior Designers in Hyderabad & Nellore",
    metaDescription: "ALIIGNSPACE is a premium interior design studio in Hyderabad & Nellore. 50+ homes transformed. 60–90 day delivery. Transparent pricing. Est. 2021.",
    ogImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
  },
};

// Default about page configuration
export const defaultAboutPage = {
  title: "About Us",
  slug: "about",
  status: "PUBLISHED",
  sections: [
    {
      id: "about-hero",
      type: "about_hero",
      order: 0,
      props: {
        heading: "About ALIIGNSPACE",
        subheading: "Our Core team is specialised in interiors with 10 years of experience. Creativity & strategy — it's what drives us.",
        backgroundImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
      },
    },
    {
      id: "about-story",
      type: "about_story",
      order: 1,
      props: {
        label: "Our Story",
        heading: "Crafting Spaces with Purpose",
        accentWord: "Purpose",
        content: "<p>At ALIIGNSPACE, we believe that every home tells a story. Founded in 2021 by Ar. Samhitha Nagasamudra and Ar. Murali, we set out with one clear mission: to transform how people experience interior design.</p><p>We saw a gap in the industry — a lack of transparency, missed deadlines, and designs that didn't truly reflect the homeowner's personality. We knew we could do better.</p>",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        imagePosition: "left",
        quote: "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
        quoteAuthor: "Ar. Samhitha Nagasamudra, Founder",
      },
    },
    {
      id: "about-mission-vision",
      type: "about_mission_vision",
      order: 2,
      props: {
        mission: {
          title: "Our Mission",
          description: "To transform houses into homes that reflect the unique personality and lifestyle of each family we serve, delivering exceptional quality with complete transparency.",
          icon: "target",
        },
        vision: {
          title: "Our Vision",
          description: "To be the most trusted interior design partner across India, known for our integrity, innovation, and unwavering commitment to client satisfaction.",
          icon: "eye",
        },
      },
    },
    {
      id: "about-stats",
      type: "about_stats",
      order: 3,
      props: {
        title: "Our Impact",
        subtitle: "Numbers that reflect our commitment to excellence",
        stats: [
          { value: 5, suffix: "+", label: "Years Experience" },
          { value: 50, suffix: "+", label: "Projects Completed" },
          { value: 98, suffix: "%", label: "Client Satisfaction" },
          { value: 2, suffix: "", label: "Cities Served" },
        ],
      },
    },
    {
      id: "about-values",
      type: "about_values",
      order: 4,
      props: {
        title: "Our Values",
        subtitle: "The principles that guide everything we do",
        values: [
          { icon: "shield", title: "Trust", description: "We believe transparency builds lasting relationships." },
          { icon: "gem", title: "Quality", description: "Only the best materials and craftsmanship make the cut." },
          { icon: "lightbulb", title: "Innovation", description: "We constantly evolve our designs and processes." },
          { icon: "handshake", title: "Integrity", description: "We do what we say, and we say what we do." },
          { icon: "users", title: "Collaboration", description: "Your vision + our expertise = your dream home." },
          { icon: "heart", title: "Passion", description: "We love what we do, and it shows in every project." },
        ],
      },
    },
    {
      id: "about-team",
      type: "about_team",
      order: 5,
      props: {
        title: "Meet Our Team",
        subtitle: "The creative minds behind every beautiful space",
        members: [
          { name: "Ar. Samhitha Nagasamudra", role: "Founder & Principal Architect", bio: "With over 5 years of experience in interior design, Samhitha leads our creative vision.", image: "" },
          { name: "Ar. Murali", role: "Co-Founder & Operations Director", bio: "Murali ensures every project runs smoothly, on time, and within budget.", image: "" },
        ],
      },
    },
  ],
  seo: {
    metaTitle: "About ALIIGNSPACE | Interior Designers in Hyderabad & Nellore",
    metaDescription: "Meet the team behind ALIIGNSPACE. 5+ years of experience crafting beautiful homes across Hyderabad & Nellore. Learn about our story, mission, and values.",
  },
};

// Page type definition
type PageWithRelations = {
  id: string;
  title: string;
  slug: string;
  status: string;
  seoId: string | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  sections: { id: string; type: string; order: number; props: any; pageId: string; createdAt: Date; updatedAt: Date }[];
  seo: { id: string; metaTitle: string | null; metaDescription: string | null; ogImage: string | null; schema: any; canonicalUrl: string | null; noIndex: boolean; createdAt: Date; updatedAt: Date } | null;
};

// Fetch or create home page
export async function getOrCreateHomePage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  // Create home page with default sections
  const newPage = await prisma.page.create({
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
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}

// Fetch or create about page
export async function getOrCreateAboutPage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "about" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  // Create about page with default sections
  const newPage = await prisma.page.create({
    data: {
      title: defaultAboutPage.title,
      slug: defaultAboutPage.slug,
      status: defaultAboutPage.status as any,
      seo: {
        create: defaultAboutPage.seo,
      },
      sections: {
        create: defaultAboutPage.sections.map((section) => ({
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      },
    },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}

// Fetch any page by slug
export async function getPageBySlug(slug: string): Promise<PageWithRelations | null> {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return page as PageWithRelations | null;
}

// Update page sections
export async function updatePageSections(pageId: string, sections: any[]): Promise<PageWithRelations> {
  // Delete existing sections
  await prisma.section.deleteMany({
    where: { pageId },
  });

  // Create new sections
  await prisma.section.createMany({
    data: sections.map((section, index) => ({
      pageId,
      type: section.type,
      order: index,
      props: section.props || {},
    })),
  });

  // Return updated page
  const page = await prisma.page.findUnique({
    where: { id: pageId },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return page as PageWithRelations;
}

// ─── Aertsen Default Page Configurations ───────────────────────────────────────

export const defaultAertsenHomePage = {
  title: "Home",
  slug: "home",
  status: "PUBLISHED",
  sections: [
    {
      id: "aertsen-hero-slider",
      type: "aertsen-hero-slider",
      order: 0,
      props: {
        slides: [
          {
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
            title: "Crafting Timeless Interiors",
            subtitle: "Where luxury meets functionality in every corner",
          },
          {
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
            title: "Bespoke Design Solutions",
            subtitle: "Tailored spaces that reflect your unique story",
          },
        ],
        autoPlayInterval: 6000,
      },
    },
    {
      id: "aertsen-services-grid",
      type: "aertsen-services-grid",
      order: 1,
      props: {
        label: "What We Do",
        title: "Our",
        accentWord: "Services",
        subtitle: "Comprehensive interior solutions for every space and style",
        services: [
          { number: "01", title: "Full Home Interiors", description: "Complete turnkey transformation of your entire home.", icon: "home", link: "/services/home-interiors" },
          { number: "02", title: "Modular Kitchen", description: "Smart kitchens with premium finishes and hardware.", icon: "utensils", link: "/services/modular-kitchen" },
          { number: "03", title: "Living Room Design", description: "Statement spaces that balance comfort and style.", icon: "sofa", link: "/services/living-room" },
          { number: "04", title: "Bedroom Design", description: "Serene retreats crafted for rest and relaxation.", icon: "bed", link: "/services/bedroom" },
          { number: "05", title: "Office Interiors", description: "Productive workspaces that inspire creativity.", icon: "briefcase", link: "/services/office-interiors" },
          { number: "06", title: "Commercial Spaces", description: "High-impact retail and commercial interiors.", icon: "building", link: "/services/commercial" },
        ],
      },
    },
    {
      id: "aertsen-milestones",
      type: "aertsen-milestones",
      order: 2,
      props: {
        title: "Our Journey",
        milestones: [
          { year: "2021", title: "Founded", description: "ALIIGNSPACE was established with a vision to transform homes." },
          { year: "2022", title: "100 Projects", description: "Completed our first 100 interior design projects." },
          { year: "2023", title: "Expanded", description: "Expanded operations to Nellore and surrounding areas." },
          { year: "2024", title: "500+ Homes", description: "Transformed over 500 homes across Telangana and AP." },
        ],
      },
    },
    {
      id: "aertsen-why-choose",
      type: "aertsen-why-choose",
      order: 3,
      props: {
        title: "Why Choose Us",
        subtitle: "The ALIIGNSPACE Difference",
        features: [
          { title: "Expert Team", description: "10+ years of combined experience in interior design.", icon: "users" },
          { title: "Quality Materials", description: "Premium, certified materials sourced from trusted suppliers.", icon: "gem" },
          { title: "On-Time Delivery", description: "Guaranteed project completion within committed timelines.", icon: "clock" },
          { title: "Bespoke Designs", description: "Every design is uniquely tailored to reflect your personality.", icon: "palette" },
          { title: "Total Transparency", description: "Complete cost breakdown with no hidden charges.", icon: "shield-check" },
          { title: "Lifetime Support", description: "Our relationship doesn't end at handover.", icon: "heart-handshake" },
        ],
      },
    },
    {
      id: "aertsen-portfolio-slider",
      type: "aertsen-portfolio-slider",
      order: 4,
      props: {
        title: "Our Work",
        subtitle: "Finest Projects We've Crafted",
        projects: [
          { title: "Jubilee Hills Residence", location: "Hyderabad", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", link: "#" },
          { title: "Banjara Hills Villa", location: "Hyderabad", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80", link: "#" },
          { title: "Gachibowli Apartment", location: "Hyderabad", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", link: "#" },
          { title: "Nellore Lake House", location: "Nellore", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", link: "#" },
        ],
      },
    },
    {
      id: "aertsen-process-wheel",
      type: "aertsen-process-wheel",
      order: 5,
      props: {
        title: "Steps to give your home an ALIIGNSPACE Makeover",
        subtitle: "Our Process",
        steps: [
          { number: "01", title: "Consultation", description: "Free consultation to understand your vision and requirements." },
          { number: "02", title: "Design", description: "Custom 3D designs tailored to your space and budget." },
          { number: "03", title: "Execution", description: "Precision execution with premium materials and skilled craftsmen." },
          { number: "04", title: "Handover", description: "On-time delivery with quality checks and final walkthrough." },
        ],
      },
    },
    {
      id: "aertsen-factory",
      type: "aertsen-factory",
      order: 6,
      props: {
        title: "Our Factory",
        subtitle: "Where craftsmanship comes to life",
        description: "State-of-the-art manufacturing facility with precision machinery and skilled artisans.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
        stats: [
          { label: "Production Capacity", value: "10,000 sq ft/month" },
          { label: "Quality Checks", value: "15+ stages" },
        ],
      },
    },
    {
      id: "aertsen-google-reviews",
      type: "aertsen-google-reviews",
      order: 7,
      props: {
        title: "Loved by Homeowners Across Hyderabad",
        subtitle: "Real reviews from real clients",
        rating: 4.9,
        reviewCount: 127,
        reviews: [
          { name: "Priya Sharma", rating: 5, text: "Amazing work! Transformed our home beautifully.", date: "2 weeks ago" },
          { name: "Rajesh Kumar", rating: 5, text: "Professional team with excellent attention to detail.", date: "1 month ago" },
          { name: "Anita Reddy", rating: 5, text: "From design to execution, everything was seamless.", date: "2 months ago" },
          { name: "Vikram Naidu", rating: 5, text: "The modular kitchen is a masterpiece.", date: "3 months ago" },
          { name: "Sujatha Rao", rating: 5, text: "Very professional team. Delivered on time.", date: "4 months ago" },
          { name: "Anil Babu", rating: 5, text: "The team is truly dedicated. Breathtaking result.", date: "5 months ago" },
        ],
      },
    },
    {
      id: "aertsen-video-testimonials",
      type: "aertsen-video-testimonials",
      order: 8,
      props: {
        title: "Video Testimonials",
        subtitle: "Hear from our happy clients",
        videos: [
          { videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", clientName: "Priya Sharma", quote: "Transformed our home beautifully!" },
          { videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", clientName: "Rajesh Kumar", quote: "Professional and on time." },
          { videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", clientName: "Anita Reddy", quote: "Exceeded all expectations." },
        ],
      },
    },
    {
      id: "aertsen-final-cta",
      type: "aertsen-final-cta",
      order: 9,
      props: {
        title: "Ready to Transform Your Space?",
        subtitle: "Book a free consultation with our design experts today.",
        buttonText: "Get Free Consultation",
        buttonUrl: "/contact",
      },
    },
    {
      id: "aertsen-faq",
      type: "aertsen-faq",
      order: 10,
      props: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our services",
        faqs: [
          { question: "How long does a typical project take?", answer: "Most residential projects are completed within 60-90 days depending on the scope." },
          { question: "Do you offer free consultations?", answer: "Yes, we offer free initial consultations to understand your requirements." },
          { question: "What cities do you operate in?", answer: "We are currently active in Hyderabad and Nellore with plans to expand PAN India." },
          { question: "Do you provide a warranty?", answer: "Yes, we offer a comprehensive warranty on all our work and materials." },
        ],
      },
    },
  ],
  seo: {
    metaTitle: "ALIIGNSPACE — Best Interior Designers in Hyderabad & Nellore",
    metaDescription: "ALIIGNSPACE is a premium interior design studio in Hyderabad & Nellore. 500+ homes transformed. 60–90 day delivery. Transparent pricing. Est. 2021.",
    ogImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
  },
};

export const defaultAertsenAboutPage = {
  title: "About Us",
  slug: "about",
  status: "PUBLISHED",
  sections: [
    {
      id: "aertsen-about-hero",
      type: "aertsen-about-hero",
      order: 0,
      props: {
        eyebrow: "About Us",
        title: "Crafting Interiors with",
        accentWord: "Purpose",
        subtitle: "We believe every space has a story. Our mission is to tell yours through design that blends beauty, function, and soul.",
      },
    },
    {
      id: "aertsen-who-we-are",
      type: "aertsen-who-we-are",
      order: 1,
      props: {
        label: "Who We Are",
        title: "Designing spaces that reflect",
        accentWord: "you",
        body: [
          "At ALIIGNSPACE, we don't just design interiors—we curate experiences. Every project begins with listening, understanding, and imagining what a space could become.",
          "From Hyderabad to homes across India, our team of architects, interior designers, and craftsmen work in unison to deliver spaces that are as functional as they are beautiful.",
        ],
        stats: [
          { number: "10", suffix: "+", label: "Years of Excellence" },
          { number: "500", suffix: "+", label: "Homes Transformed" },
          { number: "2", suffix: "", label: "Cities Served" },
          { number: "98", suffix: "%", label: "Client Satisfaction" },
        ],
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      },
    },
    {
      id: "aertsen-story",
      type: "aertsen-story",
      order: 2,
      props: {
        title: "Our Story",
        subtitle: "From a small studio to a trusted name in interiors",
        content: "Founded in 2021, ALIIGNSPACE began with a simple belief: every estimate explained, every timeline in writing, and what you approve is exactly what you get. Today, we've transformed over 500 homes and built a reputation for transparency, quality, and design excellence.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
    },
    {
      id: "aertsen-vision-mission",
      type: "aertsen-vision-mission",
      order: 3,
      props: {
        title: "Vision & Mission",
        vision: "To be India's most trusted interior design partner, creating spaces that inspire and endure.",
        mission: "To deliver transparent, high-quality interior solutions that transform houses into homes through creativity, craftsmanship, and care.",
      },
    },
    {
      id: "aertsen-promises",
      type: "aertsen-promises",
      order: 4,
      props: {
        title: "Our Promises",
        subtitle: "What you can expect from every ALIIGNSPACE project",
        promises: [
          { title: "Transparent Pricing", description: "No hidden costs. Every estimate explained in detail.", icon: "shield-check" },
          { title: "On-Time Delivery", description: "We respect your time and commit to deadlines.", icon: "clock" },
          { title: "Premium Quality", description: "Certified materials and skilled craftsmanship guaranteed.", icon: "gem" },
          { title: "Lifetime Support", description: "Our relationship doesn't end at handover.", icon: "heart-handshake" },
        ],
      },
    },
    {
      id: "aertsen-founders",
      type: "aertsen-founders",
      order: 5,
      props: {
        title: "Meet Our Founders",
        subtitle: "The visionaries behind ALIIGNSPACE",
        founders: [
          { name: "Ar. Samhitha Nagasamudra", role: "Founder & Principal Designer", bio: "An architect with a passion for creating spaces that tell stories.", image: "" },
          { name: "Ar. Murali", role: "Co-Founder & Operations Director", bio: "Ensuring every project runs smoothly, on time, and within budget.", image: "" },
        ],
      },
    },
    {
      id: "aertsen-timeline",
      type: "aertsen-timeline",
      order: 6,
      props: {
        title: "Our Journey",
        subtitle: "Milestones that shaped who we are today",
        events: [
          { year: "2021", title: "The Beginning", description: "ALIIGNSPACE was founded with a vision to transform interior design in India." },
          { year: "2022", title: "First 100 Projects", description: "Completed our first 100 successful interior transformations." },
          { year: "2023", title: "Expansion", description: "Expanded to Nellore and grew the team to 25+ designers." },
          { year: "2024", title: "500+ Homes", description: "Crossed the milestone of 500 transformed homes." },
        ],
      },
    },
    {
      id: "aertsen-factory-video",
      type: "aertsen-factory-video",
      order: 7,
      props: {
        title: "Inside Our Factory",
        subtitle: "See where the magic happens",
        videoUrl: "",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
      },
    },
    {
      id: "aertsen-about-cta",
      type: "aertsen-about-cta",
      order: 8,
      props: {
        title: "Ready to Begin Your Journey?",
        subtitle: "Let's create a space that truly reflects you.",
        buttonText: "Book a Consultation",
        buttonUrl: "/contact",
      },
    },
  ],
  seo: {
    metaTitle: "About ALIIGNSPACE | Interior Designers in Hyderabad & Nellore",
    metaDescription: "Meet the team behind ALIIGNSPACE. 10+ years of experience crafting beautiful homes across Hyderabad & Nellore. Learn about our story, mission, and values.",
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
};

export const defaultAertsenServicesPage = {
  title: "Services",
  slug: "services",
  status: "PUBLISHED",
  sections: [
    {
      id: "aertsen-services-hero",
      type: "aertsen-services-hero",
      order: 0,
      props: {
        eyebrow: "Our Services",
        title: "Interior Solutions Crafted with",
        accentWord: "Care",
        subtitle: "From concept to completion, we handle every detail so you can enjoy the transformation.",
      },
    },
    {
      id: "aertsen-services-cards",
      type: "aertsen-services-cards",
      order: 1,
      props: {
        title: "What We Offer",
        subtitle: "Comprehensive interior solutions for every need",
        services: [
          { title: "Full Home Interiors", description: "Complete turnkey solutions for your entire home.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", icon: "home" },
          { title: "Modular Kitchen", description: "Smart kitchens with premium finishes and hardware.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", icon: "utensils" },
          { title: "Living Room Design", description: "Statement spaces that balance comfort and style.", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", icon: "sofa" },
          { title: "Bedroom Design", description: "Serene retreats crafted for rest and relaxation.", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", icon: "bed" },
          { title: "Office Interiors", description: "Productive workspaces that inspire creativity.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", icon: "briefcase" },
          { title: "Commercial Spaces", description: "High-impact retail and commercial interiors.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", icon: "building" },
        ],
      },
    },
    {
      id: "aertsen-services-cta",
      type: "aertsen-services-cta",
      order: 2,
      props: {
        title: "Not Sure Where to Start?",
        subtitle: "Our design experts are here to guide you through every step.",
        buttonText: "Get Free Consultation",
        buttonUrl: "/contact",
      },
    },
  ],
  seo: {
    metaTitle: "Interior Design Services | ALIIGNSPACE Hyderabad & Nellore",
    metaDescription: "Explore ALIIGNSPACE's full range of interior design services — home interiors, modular kitchen, living room, bedroom, office, and commercial spaces. Transparent pricing, 60–90 day delivery.",
    ogImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  },
};

export const defaultAertsenPortfolioPage = {
  title: "Portfolio",
  slug: "portfolio",
  status: "PUBLISHED",
  sections: [
    {
      id: "aertsen-portfolio-hero",
      type: "aertsen-portfolio-hero",
      order: 0,
      props: {
        eyebrow: "Our Work",
        title: "Crafting Interiors with",
        accentWord: "Purpose",
        subtitle: "We believe every space has a story. Our mission is to tell yours through design that blends beauty, function, and soul.",
      },
    },
    {
      id: "aertsen-project-list",
      type: "aertsen-project-list",
      order: 1,
      props: {
        projects: [
          {
            title: "The Residence at Jubilee Hills",
            location: "Jubilee Hills, Hyderabad",
            description: "A complete transformation of a 4,500 sq ft penthouse into a serene modern sanctuary. Warm oak paneling, curated art walls, and floor-to-ceiling windows frame the city skyline.",
            images: [
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
            ],
            tags: ["Residential", "Modern"],
            link: "#",
            index: 1,
          },
          {
            title: "Banjara Hills Villa",
            location: "Banjara Hills, Hyderabad",
            description: "An elegant 6,000 sq ft villa blending traditional Indian motifs with contemporary luxury. Featuring a custom marble courtyard, brass inlay details, and lush indoor gardens.",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
            ],
            tags: ["Villa", "Luxury"],
            link: "#",
            index: 2,
          },
        ],
      },
    },
  ],
  seo: {
    metaTitle: "Portfolio | ALIIGNSPACE — Interior Design Work, Hyderabad & Nellore",
    metaDescription: "Browse 500+ completed interior design projects by ALIIGNSPACE — homes, kitchens, bedrooms, offices, and commercial spaces across Hyderabad & Nellore.",
    ogImage: "https://img.youtube.com/vi/QodXhFHptcQ/maxresdefault.jpg",
  },
};

// ─── Aertsen Page Helpers ──────────────────────────────────────────────────────

export async function getOrCreateAertsenHomePage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  const newPage = await prisma.page.create({
    data: {
      title: defaultAertsenHomePage.title,
      slug: defaultAertsenHomePage.slug,
      status: defaultAertsenHomePage.status as any,
      seo: {
        create: defaultAertsenHomePage.seo,
      },
      sections: {
        create: defaultAertsenHomePage.sections.map((section) => ({
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      },
    },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}

export async function getOrCreateAertsenAboutPage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "about" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  const newPage = await prisma.page.create({
    data: {
      title: defaultAertsenAboutPage.title,
      slug: defaultAertsenAboutPage.slug,
      status: defaultAertsenAboutPage.status as any,
      seo: {
        create: defaultAertsenAboutPage.seo,
      },
      sections: {
        create: defaultAertsenAboutPage.sections.map((section) => ({
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      },
    },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}

export async function getOrCreateAertsenServicesPage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "services" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  const newPage = await prisma.page.create({
    data: {
      title: defaultAertsenServicesPage.title,
      slug: defaultAertsenServicesPage.slug,
      status: defaultAertsenServicesPage.status as any,
      seo: {
        create: defaultAertsenServicesPage.seo,
      },
      sections: {
        create: defaultAertsenServicesPage.sections.map((section) => ({
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      },
    },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}

export async function getOrCreateAertsenPortfolioPage(): Promise<PageWithRelations> {
  const page = await prisma.page.findUnique({
    where: { slug: "portfolio" },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  if (page) {
    return page as PageWithRelations;
  }

  const newPage = await prisma.page.create({
    data: {
      title: defaultAertsenPortfolioPage.title,
      slug: defaultAertsenPortfolioPage.slug,
      status: defaultAertsenPortfolioPage.status as any,
      seo: {
        create: defaultAertsenPortfolioPage.seo,
      },
      sections: {
        create: defaultAertsenPortfolioPage.sections.map((section) => ({
          type: section.type,
          order: section.order,
          props: section.props || {},
        })),
      },
    },
    include: {
      sections: { orderBy: { order: "asc" } },
      seo: true,
    },
  });

  return newPage as PageWithRelations;
}
