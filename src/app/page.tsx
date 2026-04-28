import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AertsenHeroSlider } from "@/components/blocks/aertsen-hero-slider";
import { AertsenAboutBrief } from "@/components/blocks/aertsen-about-brief";
import { AertsenServicesGrid } from "@/components/blocks/aertsen-services-grid";
import { AertsenProcessWheel } from "@/components/blocks/aertsen-process-wheel";
import { AertsenGoogleReviews } from "@/components/blocks/aertsen-google-reviews";
import { AertsenFinalCTA } from "@/components/blocks/aertsen-final-cta";
import { HomePortfolioSection } from "@/components/home-portfolio-section";
import { VideoTestimonialsBlock } from "@/components/blocks/video-testimonials";

export const metadata: Metadata = {
  title: "ALIIGNSPACE — Best Interior Designers in Hyderabad & Nellore",
  description: "ALIIGNSPACE is a premium interior design studio in Hyderabad & Nellore. 50+ homes transformed. 60–90 day delivery. Transparent pricing. Est. 2021.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <Header />
      <main>
        <AertsenHeroSlider
          slides={[
            { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80", title: "Crafting Timeless Interiors", subtitle: "Where luxury meets functionality in every corner" },
            { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80", title: "Bespoke Design Solutions", subtitle: "Tailored spaces that reflect your unique story" },
            { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80", title: "Elevated Living Spaces", subtitle: "Transforming houses into extraordinary homes" },
          ]}
        />
        <AertsenAboutBrief
          label="Who We Are"
          title="Designing Homes That"
          accentWord="Inspire"
          body={[
            "At ALIIGNSPACE, we don't just design interiors — we craft experiences. Every space tells a story, and we're here to help you write yours.",
            "Founded in 2021 by Ar. Samhitha Nagasamudra and Ar. Murali, we bring transparency, quality, and precision to every project across Hyderabad & Nellore.",
          ]}
          stats={[
            { number: "50", suffix: "+", label: "Homes" },
            { number: "5", suffix: "+", label: "Years" },
            { number: "2", suffix: "", label: "Cities" },
            { number: "4.9", suffix: "★", label: "Rating" },
          ]}
        />
        <HomePortfolioSection />
        <AertsenServicesGrid
          label="What We Do"
          title="Our"
          accentWord="Services"
          subtitle="Comprehensive interior solutions for every space and style"
          services={[
            { number: "01", title: "Full Home Interiors", description: "Complete turnkey transformation of your entire home.", icon: "home", link: "/services/home-interiors" },
            { number: "02", title: "Modular Kitchen", description: "Smart kitchens with premium finishes and hardware.", icon: "utensils", link: "/services/modular-kitchen" },
            { number: "03", title: "Living Room Design", description: "Statement spaces that balance comfort and style.", icon: "sofa", link: "/services/living-room" },
            { number: "04", title: "Bedroom Design", description: "Serene retreats crafted for rest and relaxation.", icon: "bed", link: "/services/bedroom" },
            { number: "05", title: "Wardrobe & Storage", description: "Precision-designed storage solutions for every space.", icon: "briefcase", link: "/services/wardrobe" },
            { number: "06", title: "Commercial Spaces", description: "High-impact retail and commercial interiors.", icon: "building", link: "/services/commercial" },
          ]}
        />
        <AertsenProcessWheel
          title="From Consultation to Keys in 60–90 Days"
          subtitle="The ALIIGNSPACE Process"
          steps={[
            { number: "01", title: "Meet Designer", description: "A relaxed consultation at your home or our studio. We listen, understand your lifestyle, and align on vision and budget." },
            { number: "02", title: "Visualise Your Home", description: "Detailed 3D renders of every room. You see your finished space before a single nail is hammered. Unlimited revisions included." },
            { number: "03", title: "Freeze Design", description: "A complete itemised BOQ with every cost listed. You sign off on design and budget. Nothing proceeds without your explicit approval." },
            { number: "04", title: "Execution", description: "A dedicated supervisor on-site daily. Skilled craftsmen execute your design with precision. Weekly photo progress reports sent to you." },
            { number: "05", title: "Happy Handover", description: "Full walkthrough, punch list resolved, deep cleaning done. Keys to your dream home — delivered on schedule." },
          ]}
        />
        <AertsenGoogleReviews
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
        <VideoTestimonialsBlock />
        <AertsenFinalCTA
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
