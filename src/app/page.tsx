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
import { AliignspaceCraftsmanship } from "@/components/blocks/aliignspace-craftsmanship";
import { ClientStoriesSection } from "@/components/client-stories-section";
import { prisma } from "@/lib/prisma";
import { GOOGLE_REVIEWS, GOOGLE_SCORE } from "@/lib/google-reviews";
import { PROCESS_STEPS } from "@/lib/brand-facts";

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
        <HomePortfolioSection />
        <AliignspaceCraftsmanship />
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
        <AliignspaceServicesGrid
          label="What We Do"
          title="Our"
          accentWord="Services"
          subtitle="Comprehensive interior solutions for every space and style"
          services={[
            { number: "01", title: "Turnkey Solutions", description: "From woodwork to curtains — complete turnkey décor solutions for your home.", icon: "home", link: "/services/turnkey" },
            { number: "02", title: "Home Renovation", description: "Thoughtful renovation of existing homes, done right.", icon: "sofa", link: "/services/renovation" },
            { number: "03", title: "Modular Solutions", description: "Kitchens, wardrobes and storage — engineered to fit your life.", icon: "utensils", link: "/services/modular" },
            { number: "04", title: "Commercial Space Design", description: "High-impact retail, office and commercial interiors.", icon: "building", link: "/services/commercial" },
          ]}
        />
        <AliignspaceProcessWheel
          title="From Design Start to Final Keys in 75–90 Days"
          subtitle="The ALIIGNSPACE Process"
          steps={PROCESS_STEPS}
        />
        <ClientStoriesSection />
        <AliignspaceGoogleReviews
          title="Loved by Homeowners"
          accentWord="Across Hyderabad"
          subtitle="Real reviews from our happy clients"
          googleScore={GOOGLE_SCORE}
          reviewCount="7+"
          reviews={GOOGLE_REVIEWS}
        />
        <AliignspaceFinalCTA
          title="Ready to transform"
          accentWord="your home?"
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
