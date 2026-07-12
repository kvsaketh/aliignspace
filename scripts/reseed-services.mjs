import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const IMG = {
  turnkeyHero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
  renovationHero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
  modularHero: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
  commercialHero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  g1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  g2: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  g3: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
  g4: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
  g5: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  g6: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
};

const commonProcess = [
  { title: "Meet & Understand", duration: "Day 1–3", detail: "A relaxed consultation at your space or our studio. We listen to how you live, map your functional needs, and align on budget." },
  { title: "Design & Visualise", duration: "Day 4–15", detail: "Detailed 3D renders of every area, material mood boards and lighting plans — so you see the finished space before work begins." },
  { title: "Freeze & Quote", duration: "Day 16–20", detail: "A complete itemised BOQ with every cost listed. Nothing proceeds without your explicit sign-off on design and budget." },
  { title: "Execution", duration: "Day 21–80", detail: "A dedicated supervisor on-site daily, skilled craftsmen, and weekly photo progress reports straight to your phone." },
  { title: "Happy Handover", duration: "Day 81–90", detail: "Full walkthrough, punch-list resolved, deep-cleaned and ready. We hand over the keys to a space you'll love every day." },
];

const services = [
  {
    slug: "turnkey",
    title: "Turnkey Solutions",
    icon: "home",
    sortOrder: 0,
    image: IMG.turnkeyHero,
    heroImage: IMG.turnkeyHero,
    shortDesc: "Turn the key — from woodwork to curtains",
    description:
      "A complete, single-point turnkey service for your home — we handle everything from civil and false ceiling to modular woodwork, painting, lighting, furniture, curtains and décor. You get one team, one plan and one accountable point of contact, so you simply turn the key and move in.",
    features: [
      "End-to-end execution — civil, ceiling, electrical, woodwork, paint",
      "Full modular woodwork: kitchen, wardrobes, TV units, storage",
      "Loose furniture, soft furnishings, curtains & blinds",
      "Lighting design and décor styling",
      "Single dedicated project manager throughout",
      "Transparent, itemised BOQ — no hidden costs",
      "Weekly photo progress updates",
      "Post-handover service & warranty support",
    ],
    stats: { priceRange: "₹8L – ₹35L+", deliveryTime: "75–90 days", warranty: "Up to 10-yr warranty" },
    gallery: [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g5, IMG.g6],
    content: {
      tagline: "Everything, handled — you just turn the key",
      heroStats: [
        { value: "75–90", label: "Days to keys" },
        { value: "1", label: "Accountable team" },
        { value: "100%", label: "Itemised pricing" },
        { value: "10yr", label: "Warranty" },
      ],
      intro: {
        heading: "One team, one plan, zero coordination headaches",
        body:
          "A home is not about expensive decoration — it's about fulfilling your functional needs and bringing you joy every day. Our turnkey service removes the stress of juggling carpenters, electricians and vendors. We plan the whole home holistically, execute with our own supervised crews, and hand over a space that's ready to live in.",
      },
      inclusions: [
        { title: "Civil & Ceiling", description: "Minor civil work, POP/gypsum false ceilings and cove lighting done right." },
        { title: "Modular Woodwork", description: "Factory-finished kitchen, wardrobes, TV and crockery units built to last." },
        { title: "Electrical & Lighting", description: "Layered lighting plan, points, and automation-ready wiring." },
        { title: "Paint & Finishes", description: "Premium emulsions, textures and accent walls with clean detailing." },
        { title: "Furniture & Décor", description: "Curated loose furniture, rugs, art and styling to finish the look." },
        { title: "Curtains & Blinds", description: "Soft furnishings measured, stitched and installed to fit." },
      ],
      materials: [
        { name: "BWP / BWR Ply & MDF", description: "Moisture-resistant cores for kitchens and wet zones." },
        { name: "Branded Hardware", description: "Hettich / Ebco hinges, channels and soft-close mechanisms." },
        { name: "Laminates & Acrylics", description: "Merino, Century and Greenlam finishes in matte and gloss." },
        { name: "Premium Paints", description: "Asian Paints / Berger emulsions and textures." },
      ],
      designStyles: [
        { name: "Contemporary", description: "Clean lines, warm neutrals and functional minimalism.", image: IMG.g1 },
        { name: "Modern Luxe", description: "Rich materials, statement lighting and layered textures.", image: IMG.g3 },
        { name: "Indian Contemporary", description: "Modern forms with warm, rooted Indian sensibilities.", image: IMG.g5 },
      ],
      pricingTiers: [
        { name: "Essential", price: "₹8L – ₹14L", description: "Smart, functional turnkey for 2BHK homes.", features: ["Core modular woodwork", "Paint & ceiling", "Essential lighting", "Standard hardware"], highlighted: false },
        { name: "Signature", price: "₹14L – ₹24L", description: "Our most-loved package for 3BHK homes.", features: ["Full-home woodwork", "Designer lighting", "Loose furniture & curtains", "Branded hardware", "Décor styling"], highlighted: true },
        { name: "Luxe", price: "₹24L+", description: "Premium finishes for villas & large homes.", features: ["Bespoke joinery", "Imported finishes", "Home automation", "Full décor & art", "Extended warranty"], highlighted: false },
      ],
      whyChoose: [
        { title: "Single accountability", body: "One manager owns your project end-to-end — no finger-pointing between vendors." },
        { title: "Transparent pricing", body: "Every line item is quoted upfront. What you approve is what you pay." },
        { title: "Built to last", body: "We use materials we'd put in our own homes, backed by real warranties." },
        { title: "On-time handover", body: "Milestone-tracked schedules with weekly updates keep us to 75–90 days." },
      ],
      faqs: [
        { q: "What does 'turnkey' actually include?", a: "Everything from civil, ceiling and electrical to woodwork, paint, furniture, curtains and décor — delivered ready to move in." },
        { q: "How long does a full home take?", a: "Most 2–3BHK homes are completed in 75–90 days from design sign-off, depending on scope." },
        { q: "Will I get a detailed quote?", a: "Yes. You receive a fully itemised BOQ before any work starts — no hidden or surprise costs." },
        { q: "Do you handle everything or do I coordinate vendors?", a: "We handle everything with our own supervised crews. You have one point of contact throughout." },
        { q: "Is there a warranty?", a: "Yes — up to 10 years on modular woodwork and hardware, plus post-handover service support." },
      ],
      testimonial: { quote: "They took our empty 3BHK and handed us a finished home — we literally just turned the key and moved in.", name: "Arun Raj", role: "Homeowner", location: "Hyderabad" },
    },
  },
  {
    slug: "renovation",
    title: "Home Renovation",
    icon: "sofa",
    sortOrder: 1,
    image: IMG.renovationHero,
    heroImage: IMG.renovationHero,
    shortDesc: "Renovation & makeovers for existing homes",
    description:
      "Give your existing home a fresh, modern life. Whether it's a dated flat, a single room or a full makeover, we renovate with minimal disruption — reworking layouts, storage, lighting and finishes to make your space more functional and beautiful without rebuilding from scratch.",
    features: [
      "Full-home or room-by-room renovation",
      "Layout rework for better flow and storage",
      "Kitchen & wardrobe upgrades",
      "False ceiling, lighting & electrical refresh",
      "Painting, flooring and surface finishes",
      "Waterproofing and repair of problem areas",
      "Phased execution to minimise disruption",
      "Honest assessment of what to keep vs. replace",
    ],
    stats: { priceRange: "₹3L – ₹20L+", deliveryTime: "30–75 days", warranty: "Up to 10-yr warranty" },
    gallery: [IMG.g2, IMG.g4, IMG.g6, IMG.g1, IMG.g3, IMG.g5],
    content: {
      tagline: "A new home, without moving out",
      heroStats: [
        { value: "30–75", label: "Days typical" },
        { value: "Room", label: "or whole home" },
        { value: "Minimal", label: "Disruption" },
        { value: "100%", label: "Transparent" },
      ],
      intro: {
        heading: "Reinvent what you already love",
        body:
          "Not every home needs to be rebuilt — sometimes it just needs to be rethought. We assess your existing space honestly, keep what works, and upgrade what doesn't. Relocating to Hyderabad or refreshing a 20-year-old flat? We take on the complete renovation others often refuse.",
      },
      inclusions: [
        { title: "Space Re-planning", description: "Smarter layouts that fix flow, light and storage problems." },
        { title: "Kitchen & Wardrobe Upgrades", description: "Modernise the hardest-working parts of your home." },
        { title: "Ceiling & Lighting", description: "New false ceilings and a fresh, layered lighting scheme." },
        { title: "Flooring & Surfaces", description: "Tile, laminate or wooden flooring and wall finishes." },
        { title: "Waterproofing & Repairs", description: "Fix leaks, dampness and problem areas properly." },
        { title: "Fresh Paint & Décor", description: "A clean, cohesive new look across the home." },
      ],
      materials: [
        { name: "Certified Waterproofing", description: "Dr. Fixit / Fosroc systems for lasting protection." },
        { name: "Durable Flooring", description: "Vitrified tiles, engineered wood and premium laminates." },
        { name: "Branded Hardware", description: "Hettich / Ebco fittings for upgraded woodwork." },
        { name: "Premium Paints", description: "Asian Paints / Berger low-VOC emulsions." },
      ],
      designStyles: [
        { name: "Modern Makeover", description: "Bright, contemporary and clutter-free.", image: IMG.g2 },
        { name: "Warm Minimal", description: "Calm palettes with natural textures.", image: IMG.g4 },
        { name: "Classic Refresh", description: "Timeless finishes with updated function.", image: IMG.g6 },
      ],
      pricingTiers: [
        { name: "Room Refresh", price: "₹3L – ₹6L", description: "Transform a single room or space.", features: ["One-room redesign", "Paint & lighting", "Storage upgrade", "Décor styling"], highlighted: false },
        { name: "Home Makeover", price: "₹6L – ₹14L", description: "Whole-home refresh, most popular.", features: ["Full-home re-planning", "Kitchen & wardrobe upgrade", "Ceiling & lighting", "Flooring & paint"], highlighted: true },
        { name: "Full Renovation", price: "₹14L+", description: "Complete gut renovation.", features: ["Structural rework", "New kitchen & wardrobes", "Waterproofing", "Premium finishes", "Extended warranty"], highlighted: false },
      ],
      whyChoose: [
        { title: "We take the tough jobs", body: "Complete renovations others refuse — old flats, tricky layouts, tight timelines." },
        { title: "Keep what works", body: "Honest advice on what to retain vs. replace, so you spend where it matters." },
        { title: "Minimal disruption", body: "Phased, dust-controlled execution that respects your routine." },
        { title: "Fixed, fair pricing", body: "A clear scope and itemised quote before we lift a hammer." },
      ],
      faqs: [
        { q: "Can you renovate just one room?", a: "Absolutely — from a single kitchen or bedroom to the entire home." },
        { q: "Do I need to move out?", a: "Usually not. We phase the work and control dust to keep the home liveable where possible." },
        { q: "Will you fix leaks and dampness?", a: "Yes — proper waterproofing and repairs are part of our renovation scope." },
        { q: "How long does a renovation take?", a: "Room refreshes take a few weeks; full-home renovations typically 30–75 days." },
        { q: "Is old furniture reusable?", a: "Where it's sound and fits the new design, we happily rework and reuse it." },
      ],
      testimonial: { quote: "We were relocating and wanted our 20-year-old flat fully renovated. ALIIGNSPACE took on the complete makeover most others refused.", name: "Satish Kondeti", role: "Homeowner", location: "Hyderabad" },
    },
  },
  {
    slug: "modular",
    title: "Modular Solutions",
    icon: "utensils",
    sortOrder: 2,
    image: IMG.modularHero,
    heroImage: IMG.modularHero,
    shortDesc: "Modular kitchens, wardrobes & storage",
    description:
      "Factory-finished modular kitchens, wardrobes and storage engineered to fit your space and the way you use it. Ergonomic layouts, premium hardware and durable finishes — designed for real, everyday life and built to stay beautiful for years.",
    features: [
      "Modular kitchens — L, U, parallel & island layouts",
      "Sliding & openable wardrobes with smart interiors",
      "TV units, crockery, study & utility storage",
      "Ergonomic 'work-triangle' kitchen planning",
      "Soft-close hinges, channels & premium accessories",
      "Moisture-resistant BWP ply cores",
      "Wide choice of laminates, acrylics & finishes",
      "Precise factory finishing, quick site install",
    ],
    stats: { priceRange: "₹1.5L – ₹12L+", deliveryTime: "20–45 days", warranty: "Up to 10-yr warranty" },
    gallery: [IMG.g3, IMG.g5, IMG.g1, IMG.g6, IMG.g2, IMG.g4],
    content: {
      tagline: "Storage that fits your life, not the other way around",
      heroStats: [
        { value: "20–45", label: "Days to install" },
        { value: "100%", label: "Custom-fit" },
        { value: "10yr", label: "Warranty" },
        { value: "Branded", label: "Hardware" },
      ],
      intro: {
        heading: "Engineered for the way you actually live",
        body:
          "Great storage disappears into daily life. We plan kitchens around your cooking flow and wardrobes around your routine — then build them with moisture-resistant cores and branded, soft-close hardware so they work smoothly for years.",
      },
      inclusions: [
        { title: "Modular Kitchen", description: "Ergonomic layouts with tall units, carousels and organisers." },
        { title: "Wardrobes", description: "Sliding or openable, with smart interior organisation." },
        { title: "TV & Storage Units", description: "Living, crockery, study and utility storage to match." },
        { title: "Premium Hardware", description: "Soft-close hinges, channels and pull-out accessories." },
        { title: "Countertops", description: "Quartz, granite or acrylic solid-surface tops." },
        { title: "Finishes", description: "Laminate, acrylic, PU and membrane shutter options." },
      ],
      materials: [
        { name: "BWP Plywood", description: "710-grade moisture-resistant cores for kitchens." },
        { name: "Hettich / Ebco Hardware", description: "Soft-close hinges, tandem boxes and organisers." },
        { name: "Quartz & Granite Tops", description: "Durable, stain-resistant countertop options." },
        { name: "Acrylic & Laminate Shutters", description: "Merino, Century, Greenlam finishes." },
      ],
      designStyles: [
        { name: "Handleless Modern", description: "Sleek, seamless shutters with a minimal look.", image: IMG.g3 },
        { name: "Two-Tone", description: "Warm and cool finishes paired for depth.", image: IMG.g5 },
        { name: "Classic Shaker", description: "Timeless framed shutters with character.", image: IMG.g1 },
      ],
      pricingTiers: [
        { name: "Wardrobe / Unit", price: "₹1.5L – ₹3L", description: "A single modular wardrobe or unit.", features: ["Custom layout", "Branded hardware", "Interior organisers", "Choice of finishes"], highlighted: false },
        { name: "Modular Kitchen", price: "₹3L – ₹7L", description: "Full modular kitchen, most popular.", features: ["Ergonomic layout", "Tall & base units", "Soft-close hardware", "Quartz/granite top", "Accessories"], highlighted: true },
        { name: "Kitchen + Wardrobes", price: "₹7L+", description: "Whole-home modular package.", features: ["Kitchen + all wardrobes", "TV & storage units", "Premium acrylic finishes", "Full accessory suite", "Extended warranty"], highlighted: false },
      ],
      whyChoose: [
        { title: "Ergonomic planning", body: "Kitchens designed around your real cooking flow; wardrobes around your routine." },
        { title: "Moisture-proof cores", body: "710-grade BWP ply where it matters, so joints don't swell or sag." },
        { title: "Branded hardware", body: "Hettich / Ebco soft-close mechanisms rated for years of daily use." },
        { title: "Factory precision", body: "Machine-finished modules mean crisp lines and quick, clean installs." },
      ],
      faqs: [
        { q: "How long does a modular kitchen take?", a: "Typically 20–45 days from final design sign-off, including factory finishing and install." },
        { q: "What core material do you use?", a: "710-grade BWP plywood for kitchens and wet zones; BWR/MDF where suitable." },
        { q: "Which hardware brands?", a: "We use Hettich and Ebco soft-close hinges, channels and organisers as standard." },
        { q: "Can I choose my finishes?", a: "Yes — a wide range of laminate, acrylic, PU and membrane shutters and countertop options." },
        { q: "Is there a warranty?", a: "Up to 10 years on modular carcass and hardware, with service support." },
      ],
      testimonial: { quote: "The kitchen is so well planned — everything I need is exactly where my hands reach for it. Storage I didn't know I had.", name: "Kurmarao A", role: "Homeowner", location: "Vizag" },
    },
  },
  {
    slug: "commercial",
    title: "Commercial Space Design",
    icon: "building",
    sortOrder: 3,
    image: IMG.commercialHero,
    heroImage: IMG.commercialHero,
    shortDesc: "Offices, retail & commercial interiors",
    description:
      "High-impact interiors for offices, retail and commercial spaces that work as hard as your business. We balance brand, function and footfall — designing productive workplaces and memorable customer spaces, delivered on schedule and built to commercial-grade standards.",
    features: [
      "Office & workspace design and fit-out",
      "Retail & showroom interiors",
      "Reception, cabins, meeting & collaboration zones",
      "Brand-led space and signage integration",
      "Commercial-grade partitions, ceilings & flooring",
      "Network, electrical & HVAC-ready planning",
      "Compliance-aware, durable materials",
      "Fast-tracked execution to minimise downtime",
    ],
    stats: { priceRange: "₹1,200 – ₹3,500 / sq.ft", deliveryTime: "30–75 days", warranty: "Commercial warranty" },
    gallery: [IMG.g6, IMG.g1, IMG.g4, IMG.g2, IMG.g5, IMG.g3],
    content: {
      tagline: "Spaces that work as hard as your business",
      heroStats: [
        { value: "30–75", label: "Days to open" },
        { value: "Brand", label: "-led design" },
        { value: "Turnkey", label: "Fit-out" },
        { value: "On-time", label: "Delivery" },
      ],
      intro: {
        heading: "Design that drives productivity and footfall",
        body:
          "A commercial space has a job to do — help your team focus or help customers buy. We design around how people move and work, integrate your brand, and build to commercial-grade standards so the space performs from day one.",
      },
      inclusions: [
        { title: "Space Planning", description: "Layouts that optimise workflow, seating density and flow." },
        { title: "Cabins & Meeting Rooms", description: "Acoustic, glass-partitioned cabins and collaboration zones." },
        { title: "Reception & Branding", description: "Front-of-house design with signage and brand integration." },
        { title: "Ceilings & Lighting", description: "Grid/false ceilings with efficient, layered lighting." },
        { title: "Flooring & Partitions", description: "Commercial-grade vinyl, tile, carpet and partitions." },
        { title: "Services-Ready", description: "Electrical, networking and HVAC-coordinated fit-out." },
      ],
      materials: [
        { name: "Commercial Flooring", description: "Vinyl, carpet tiles and vitrified options rated for traffic." },
        { name: "Glass & Aluminium Partitions", description: "Acoustic, framed and frameless systems." },
        { name: "Modular Workstations", description: "Ergonomic desking and storage systems." },
        { name: "Branded Lighting", description: "Energy-efficient panels and accent fixtures." },
      ],
      designStyles: [
        { name: "Modern Office", description: "Open, bright and collaboration-friendly.", image: IMG.g6 },
        { name: "Premium Retail", description: "Display-led interiors that sell.", image: IMG.g1 },
        { name: "Brand-Immersive", description: "Spaces that live and breathe your identity.", image: IMG.g4 },
      ],
      pricingTiers: [
        { name: "Refresh", price: "₹1,200/sq.ft", description: "Smart fit-out for compact spaces.", features: ["Space planning", "Ceiling & lighting", "Flooring & paint", "Basic branding"], highlighted: false },
        { name: "Full Fit-Out", price: "₹1,800 – ₹2,500/sq.ft", description: "Complete office/retail, most popular.", features: ["Cabins & meeting rooms", "Reception & branding", "Workstations", "Services coordination"], highlighted: true },
        { name: "Premium", price: "₹2,500+/sq.ft", description: "Flagship, brand-immersive spaces.", features: ["Bespoke joinery", "Acoustic solutions", "Premium finishes", "Automation & AV", "Full compliance"], highlighted: false },
      ],
      whyChoose: [
        { title: "Business-first design", body: "Layouts tuned for productivity, footfall and how your people actually work." },
        { title: "Commercial-grade build", body: "Materials and systems rated for heavy daily use and compliance." },
        { title: "Minimal downtime", body: "Fast-tracked, phased execution to get you operational quickly." },
        { title: "Brand integrated", body: "Your identity built into the space, from reception to signage." },
      ],
      faqs: [
        { q: "What types of commercial spaces do you do?", a: "Offices, retail showrooms, clinics, cafés and other commercial fit-outs." },
        { q: "How is commercial pricing calculated?", a: "Usually per sq.ft based on scope and finish level, with a detailed itemised quote." },
        { q: "Can you work around our operations?", a: "Yes — we phase work and can schedule around business hours to reduce downtime." },
        { q: "Do you handle electrical, networking and HVAC?", a: "We coordinate all services as part of a turnkey fit-out." },
        { q: "How fast can you deliver?", a: "Most fit-outs are completed in 30–75 days depending on size and scope." },
      ],
      testimonial: { quote: "Our new office finally reflects who we are — and the team is noticeably happier and more productive in it.", name: "Kukatpally Office", role: "Business Owner", location: "Hyderabad" },
    },
  },
];

async function main() {
  await prisma.service.deleteMany({ where: { slug: { notIn: services.map((s) => s.slug) } } });
  for (const s of services) {
    const data = {
      title: s.title, shortDesc: s.shortDesc, description: s.description, icon: s.icon,
      image: s.image, heroImage: s.heroImage, features: s.features, processSteps: commonProcess,
      stats: s.stats, gallery: s.gallery, content: s.content, sortOrder: s.sortOrder, isActive: true,
    };
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: data,
      create: { slug: s.slug, ...data },
    });
    console.log("upserted:", s.slug);
  }
  // Keep service pages simple, sweet & pricing-free: strip pricing + the densest sections.
  await prisma.$executeRawUnsafe(
    `UPDATE services SET content = content - 'pricingTiers' - 'materials' - 'whyChoose', stats = stats - 'priceRange'`
  );
  // Replace the one pricing-referencing hero stat on turnkey.
  await prisma.$executeRawUnsafe(
    `UPDATE services SET content = jsonb_set(content, '{heroStats}', '[{"value":"75–90","label":"Days to keys"},{"value":"1","label":"Point of contact"},{"value":"10yr","label":"Warranty"},{"value":"Free","label":"Design consult"}]'::jsonb) WHERE slug = 'turnkey'`
  );
  console.log("stripped pricing + dense sections");
  console.log("total services now:", await prisma.service.count());
}

main().then(() => prisma.$disconnect()).catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
