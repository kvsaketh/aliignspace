// Static fallback page when CMS is unavailable
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroPremium } from "@/components/blocks/hero-premium";
import { WhyChooseUsPremium } from "@/components/blocks/why-choose-us-premium";
import { AboutPremium } from "@/components/blocks/about-premium";
import { ServicesPremium } from "@/components/blocks/services-premium";
import { PortfolioPremium } from "@/components/blocks/portfolio-premium";
import { TestimonialsPremium } from "@/components/blocks/testimonials-premium";
import { StatsFloating } from "@/components/blocks/stats-floating";
import { ConsultationBlock } from "@/components/blocks/consultation";

export default function StaticHomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero — Premium with parallax & animated text */}
        <HeroPremium
          heading="Design That Feels Like You"
          accentWord="Feels"
          subheading="Every home is personal. We design spaces that reflect your lifestyle, your taste, and your comfort — with thoughtful design, functional spaces, and timeless aesthetics."
          buttonText="Get Free Consultation"
          buttonUrl="/contact"
          secondaryButtonText="View Our Work"
          secondaryButtonUrl="/portfolio"
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          videoUrl=""
        />

        {/* Floating Stats Bar */}
        <StatsFloating
          stats={[
            { value: 10, suffix: "+", label: "Years Experience" },
            { value: 500, suffix: "+", label: "Projects Completed" },
            { value: 98, suffix: "%", label: "Client Satisfaction" },
            { value: 60, suffix: "-90 Days", label: "Delivery Time" },
          ]}
        />

        {/* Why Choose Us — Premium Cards with Counter Animations */}
        <WhyChooseUsPremium
          title="Why ALIIGNSPACE"
          subtitle="Spaces Crafted with Trust"
          quote="Our Core team is specialised in interiors with 10 years of experience. Creativity & strategy — it's what drives us."
          quoteAuthor="Ar. Samhitha Nagasamudra, Founder"
          features={[
            {
              icon: "users",
              title: "Expert Team",
              description: "Skilled architects and designers with decade-long expertise in crafting luxury interiors.",
              highlight: "10+ Years",
            },
            {
              icon: "gem",
              title: "Quality Materials",
              description: "Premium, hand-picked materials sourced from trusted suppliers for lasting elegance.",
              highlight: "Premium Grade",
            },
            {
              icon: "clock",
              title: "On-Time Delivery",
              description: "We respect your time — guaranteed project completion within committed timelines.",
              highlight: "60-90 Days",
            },
            {
              icon: "palette",
              title: "Custom Designs",
              description: "Bespoke interiors tailored to your unique taste, lifestyle, and aspirations.",
              highlight: "100% Unique",
            },
            {
              icon: "shield-check",
              title: "Transparency",
              description: "Clear pricing with no hidden costs. Every estimate explained in detail.",
              highlight: "No Hidden Costs",
            },
            {
              icon: "heart-handshake",
              title: "After-Sales Support",
              description: "We don't disappear after handover. Dedicated support for your peace of mind.",
              highlight: "Lifetime Care",
            },
          ]}
        />

        {/* About — Interactive Split Layout */}
        <AboutPremium
          label="About Us"
          heading="Where Creativity Meets Strategy"
          accentWord="Creativity"
          content="<p>We are a young and experienced Interior Design team. <em>Creativity & strategy</em> — it's what drives us, and we are forever curious to produce cleaner designs and sharper strategies that make spaces a better home.</p><p>We are currently operational in both Telugu states — AP & Telangana — and looking forward to serving PAN India. Founded in 2021 with one belief: every estimate explained, every timeline in writing, and what you approve is exactly what you get.</p>"
          images={[
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          ]}
          quote="Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision."
          quoteAuthor="Ar. Samhitha Nagasamudra, Founder"
          stats={[
            { value: 10, suffix: "+", label: "Years Combined Experience" },
            { value: 500, suffix: "+", label: "Happy Families" },
            { value: 2, suffix: "", label: "Cities Served" },
          ]}
        />

        {/* Services — Horizontal Scroll with Hover Reveal */}
        <ServicesPremium
          title="Our Interior Services"
          subtitle="Complete interior solutions for homes, offices, and commercial spaces"
          services={[
            {
              title: "Full Home Interiors",
              description: "Complete turnkey home transformation — living room, bedrooms, kitchen, bathrooms, and more. One team, one price, zero stress.",
              image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
              link: "/services/home-interiors",
              icon: "home",
            },
            {
              title: "Modular Kitchen",
              description: "Custom modular kitchens with premium hardware, smart storage, and finishes that marry beauty with function.",
              image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
              link: "/services/modular-kitchen",
              icon: "utensils",
            },
            {
              title: "Living Room Design",
              description: "Statement living spaces with bespoke false ceilings, ambient lighting, custom furniture, and curated decor.",
              image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
              link: "/services/living-room",
              icon: "sofa",
            },
            {
              title: "Bedroom Design",
              description: "Serene, personalised bedrooms with wardrobe solutions, upholstered headboards, and calming palettes.",
              image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
              link: "/services/bedroom",
              icon: "bed",
            },
            {
              title: "Office Interiors",
              description: "Modern, productive workspaces that reflect your brand identity and inspire your team every single day.",
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
              link: "/services/office-interiors",
              icon: "briefcase",
            },
            {
              title: "Commercial Spaces",
              description: "High-impact retail stores, restaurants, clinics, and commercial interiors designed to impress and convert.",
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
              link: "/services/commercial",
              icon: "building",
            },
          ]}
        />

        {/* Portfolio — Masonry with Hover Zoom & Filter */}
        <PortfolioPremium
          title="Our Work"
          subtitle="Browse our portfolio of transformed spaces across Hyderabad & Nellore"
          items={[
            {
              title: "Modern 3BHK — Jubilee Hills",
              category: "3BHK Apartment",
              image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
              link: "/portfolio",
              featured: true,
            },
            {
              title: "Contemporary Kitchen — Banjara Hills",
              category: "2BHK Apartment",
              image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
              link: "/portfolio",
            },
            {
              title: "Luxury 4BHK Villa — Gachibowli",
              category: "4BHK Villa",
              image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
              link: "/portfolio",
              featured: true,
            },
            {
              title: "Elegant 3BHK Villa — Nellore",
              category: "3BHK Villa",
              image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
              link: "/portfolio",
            },
            {
              title: "Executive Office — HITEC City",
              category: "Office & Commercial",
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
              link: "/portfolio",
            },
            {
              title: "Spacious 4BHK — Kondapur",
              category: "4BHK Apartment",
              image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
              link: "/portfolio",
            },
            {
              title: "Minimalist 2BHK — Madhapur",
              category: "2BHK Apartment",
              image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
              link: "/portfolio",
            },
            {
              title: "Premium Penthouse — Begumpet",
              category: "4BHK Apartment",
              image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
              link: "/portfolio",
              featured: true,
            },
          ]}
        />

        {/* Testimonials — Carousel with Client Photos */}
        <TestimonialsPremium
          title="What Our Clients Say"
          subtitle="Rated 4.9★ on Google by 127+ happy families"
          rating={4.9}
          reviewCount={127}
          reviews={[
            {
              name: "Priya Sharma",
              rating: 5,
              text: "ALIIGNSPACE transformed our 3BHK in Jubilee Hills into an absolute dream. The team was professional, transparent with costs, and delivered 5 days ahead of schedule. Ar. Samhitha's attention to detail is extraordinary.",
              date: "2 weeks ago",
              avatar: "PS",
              location: "Jubilee Hills, Hyderabad",
            },
            {
              name: "Rajesh Kumar",
              rating: 5,
              text: "Best interior designers in Hyderabad — hands down. No hidden costs, stunning 3D renders before work began, and the final result matched every pixel. Our kitchen is something out of a magazine.",
              date: "1 month ago",
              avatar: "RK",
              location: "Banjara Hills, Hyderabad",
            },
            {
              name: "Anita Reddy",
              rating: 5,
              text: "We were nervous about our first home renovation. ALIIGNSPACE made the entire experience stress-free and joyful. From design to handover in 78 days. Our villa looks absolutely stunning.",
              date: "2 months ago",
              avatar: "AR",
              location: "Gachibowli, Hyderabad",
            },
            {
              name: "Venkat Narayana",
              rating: 5,
              text: "Got our Nellore office interiors done — the team worked around our business hours and delivered a world-class workspace. Client impressions have improved dramatically.",
              date: "3 months ago",
              avatar: "VN",
              location: "Nellore, AP",
            },
            {
              name: "Lakshmi Devi",
              rating: 5,
              text: "The modular kitchen ALIIGNSPACE designed is functional perfection. Every inch is optimised, the finish quality is exceptional, and they stayed exactly on budget.",
              date: "3 months ago",
              avatar: "LD",
              location: "Kondapur, Hyderabad",
            },
            {
              name: "Suresh Babu",
              rating: 5,
              text: "From the first meeting to the day we moved in, the experience was seamless. Transparent, trustworthy, and genuinely talented. ALIIGNSPACE is in a different league.",
              date: "4 months ago",
              avatar: "SB",
              location: "HITEC City, Hyderabad",
            },
          ]}
        />

        {/* Lead capture */}
        <ConsultationBlock
          title="Start Your Dream Home Journey"
          subtitle="Book a free consultation today. Our architects will visit your site, understand your vision, and share a detailed design plan — at no cost to you."
        />
      </main>
      <Footer />
    </>
  );
}
