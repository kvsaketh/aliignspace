import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AliignspaceHeroSlider } from "@/components/blocks/aliignspace-hero-slider";
import { AliignspaceAboutBrief } from "@/components/blocks/aliignspace-about-brief";
import { AliignspaceServicesGrid } from "@/components/blocks/aliignspace-services-grid";
import { AliignspaceProcessWheel } from "@/components/blocks/aliignspace-process-wheel";
import { AliignspaceGoogleReviews } from "@/components/blocks/aliignspace-google-reviews";
import { AliignspaceFinalCTA } from "@/components/blocks/aliignspace-final-cta";
import { HomePortfolioSection } from "@/components/home-portfolio-section";
import { ClientStoriesSection } from "@/components/client-stories-section";
import { prisma } from "@/lib/prisma";

interface HeroSlide { image?: string; title: string; subtitle: string }

const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  { image: "/hero/kitchen.jpg", title: "Crafting Timeless Interiors", subtitle: "Where luxury meets functionality in every corner" },
  { image: "/hero/dining.jpg", title: "Bespoke Design Solutions", subtitle: "Tailored spaces that reflect your unique story" },
  { image: "/hero/living-room.jpg", title: "Elevated Living Spaces", subtitle: "Transforming houses into extraordinary homes" },
  { image: "/hero/kitchen-2.jpg", title: "Precision in Every Detail", subtitle: "Meticulous craftsmanship from concept to completion" },
];

async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const block = await prisma.globalBlock.findUnique({
      where: { type_name: { type: "HERO", name: "main" } },
    });
    const slides = (block?.content as { slides?: HeroSlide[] } | null)?.slides;
    if (slides && slides.length > 0) return slides;
  } catch {
    // fall through to defaults
  }
  return FALLBACK_HERO_SLIDES;
}

export const metadata: Metadata = {
  title: "ALIIGNSPACE — Best Interior Designers in Hyderabad & Nellore",
  description: "ALIIGNSPACE is a premium interior design studio in Hyderabad & Nellore. 50+ homes transformed. 60–90 day delivery. Transparent pricing. Est. 2021.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroSlides = await getHeroSlides();
  return (
    <>
      <Header />
      <main>
        <AliignspaceHeroSlider slides={heroSlides} />
        <AliignspaceAboutBrief
          label="Who We Are"
          title="Designing Homes That"
          accentWord="Inspire"
          body={[
            "At ALIIGNSPACE, we believe one simple thing — a home is not about expensive decoration; it's about fulfilling each individual's functional requirements, and each day when you see your space, it should inspire you and bring you joy.",
            "Since 2021, we've been designing spaces that are not just beautiful, but practical, thoughtfully planned, and built to last. We believe the design journey should start with trust and inspiration, which is why we're committed to making every step better — with transparent pricing, honest communication, and uncompromising quality.",
            "Founded by Samhitha, Murali and Akhil, we're proud to create homes and spaces across Hyderabad, Nellore and Vizag that our clients truly love living in.",
          ]}
          stats={[
            { number: "50", suffix: "+", label: "Homes" },
            { number: "5", suffix: "+", label: "Years" },
            { number: "3", suffix: "", label: "Cities" },
            { number: "4.9", suffix: "★", label: "Rating" },
          ]}
        />
        <HomePortfolioSection />
        <AliignspaceServicesGrid
          label="What We Do"
          title="Our"
          accentWord="Services"
          subtitle="Comprehensive interior solutions for every space and style"
          services={[
            { number: "01", title: "Turnkey Solutions", description: "From woodwork to curtains, complete turnkey décor solutions for your home.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", link: "/services/full-home-interiors" },
            { number: "02", title: "Home Renovation", description: "Thoughtful renovation of existing homes, done right.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80", link: "/services" },
            { number: "03", title: "Modular Solutions", description: "Kitchens, wardrobes and storage engineered to fit your life.", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80", link: "/services/modular-kitchen" },
            { number: "04", title: "Commercial Space Design", description: "High-impact retail, office and commercial interiors.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", link: "/services/office-commercial-interiors" },
          ]}
        />
        <AliignspaceProcessWheel
          title="From Design Start to Final Keys in 75–90 Days"
          subtitle="The ALIIGNSPACE Process"
          steps={[
            { number: "01", title: "Meet Designer", description: "A relaxed consultation at your home or our studio. We listen, understand your lifestyle, and align on vision and budget." },
            { number: "02", title: "Visualise Your Home", description: "Detailed 3D renders of every room. You see your finished space before a single nail is hammered. Unlimited revisions included." },
            { number: "03", title: "Freeze Design", description: "A complete itemised BOQ with every cost listed. You sign off on design and budget. Nothing proceeds without your explicit approval." },
            { number: "04", title: "Execution", description: "A dedicated supervisor on-site daily. Skilled craftsmen execute your design with precision. Weekly photo progress reports sent to you." },
            { number: "05", title: "Happy Handover", description: "Full walkthrough, punch list resolved, deep cleaning done. Keys to your dream home — delivered on schedule." },
          ]}
        />
        <ClientStoriesSection />
        <AliignspaceGoogleReviews
          title="Loved by Homeowners"
          accentWord="Across Hyderabad"
          subtitle="Real reviews from our happy clients"
          googleScore="4.9"
          reviewCount="7+"
          reviews={[
            { name: "Adharvam Sree Raagav Thutupalli", rating: 5, review: "We had an amazing experience with this interior design company. From the initial consultation to the final execution, everything was handled with professionalism and creativity. They truly understood our vision and transformed our space into something beyond our expectations.", location: "Hyderabad", time: "2 months ago" },
            { name: "Arun Rej", rating: 5, review: "We had an absolutely wonderful experience working with Samhitha and team. From the initial consultation to project completion, everything was handled exceptionally well. They truly understood our vision and transformed our space into a beautiful home.", location: "Hyderabad", time: "2 months ago" },
            { name: "Dishirasa Konduru", rating: 5, review: "Working with Alignspace was a great experience. From the first meeting to the final installation, everything went smoothly. The team was very patient with our ideas and gave us the best possible output. Our home looks elegant and perfectly matches our style. Great experience!", location: "Hyderabad", time: "6 months ago" },
            { name: "Satish Kondeti", rating: 5, review: "We were relocating to Hyderabad, so wanted to get our 20 year old flat fully renovated and give it a modern makeover. Alignspace was more than ready to take up the complete renovation which most other designers refused. Highly recommend!", location: "Hyderabad", time: "6 months ago" },
            { name: "Kurmarao A", rating: 4, review: "We engaged M/s Align Space, Hyderabad, for the interior design of our residence at Vizag, and the outcome has been truly spectacular. The design approach seamlessly blended creativity with practicality, aligning perfectly with our requirements.", location: "Vizag", time: "6 months ago" },
            { name: "Thupupalli Ravindra", rating: 4, review: "I was extremely delighted with the team work of Alignspace. Three best qualities they have: 1. Design to actual — 100%. 2. Time schedule — delivered within agreed time. 3. Reasonable pricing and documentation.", location: "Hyderabad", time: "11 months ago" },
          ]}
        />
        <AliignspaceFinalCTA
          title="Ready to Transform Your Space?"
          body="Book a free consultation with our design experts today."
          buttons={[
            { label: "Get Free Consultation", url: "/contact", type: "primary" },
            { label: "Call Us", url: "tel:+919030444503", type: "phone" },
            { label: "WhatsApp", url: "https://wa.me/919030444503", type: "whatsapp" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
