import { ComponentType } from "react";

import { HeroPremium } from "@/components/blocks/hero-premium";
import { StatsFloating } from "@/components/blocks/stats-floating";
import { WhyChooseUsPremium } from "@/components/blocks/why-choose-us-premium";
import { AboutPremium } from "@/components/blocks/about-premium";
import { HomeAboutPremium } from "@/components/blocks/home-about/HomeAboutPremium";
import { ServicesPremium } from "@/components/blocks/services-premium";
import { PortfolioPremium } from "@/components/blocks/portfolio-premium";
import { TestimonialsPremium } from "@/components/blocks/testimonials-premium";
import { VideoTestimonialsBlock } from "@/components/blocks/video-testimonials";
import { ConsultationBlock } from "@/components/blocks/consultation";
import { AboutHero } from "@/components/blocks/AboutHero";
import { StorySection } from "@/components/blocks/StorySection";

// Aliignspace Replication Components
import { AliignspaceHeroSlider } from "@/components/blocks/aliignspace-hero-slider";
import { AliignspaceServicesGrid } from "@/components/blocks/aliignspace-services-grid";
import { AliignspaceMilestones } from "@/components/blocks/aliignspace-milestones";
import { AliignspaceWhyChoose } from "@/components/blocks/aliignspace-why-choose";
import { AliignspacePortfolioSlider } from "@/components/blocks/aliignspace-portfolio-slider";
import { AliignspaceProcessWheel } from "@/components/blocks/aliignspace-process-wheel";
import { AliignspaceFactory } from "@/components/blocks/aliignspace-factory";
import { AliignspaceGoogleReviews } from "@/components/blocks/aliignspace-google-reviews";
import { AliignspaceVideoTestimonials } from "@/components/blocks/aliignspace-video-testimonials";
import { AliignspaceFinalCTA } from "@/components/blocks/aliignspace-final-cta";
import { AliignspaceFAQ } from "@/components/blocks/aliignspace-faq";
import { AliignspaceAboutHero } from "@/components/blocks/aliignspace-about-hero";
import { AliignspaceWhoWeAre } from "@/components/blocks/aliignspace-who-we-are";
import { AliignspaceStory } from "@/components/blocks/aliignspace-story";
import { AliignspaceVisionMission } from "@/components/blocks/aliignspace-vision-mission";
import { AliignspacePromises } from "@/components/blocks/aliignspace-promises";
import { AliignspaceFounders } from "@/components/blocks/aliignspace-founders";
import { AliignspaceTimeline } from "@/components/blocks/aliignspace-timeline";
import { AliignspaceFactoryVideo } from "@/components/blocks/aliignspace-factory-video";
import { AliignspaceAboutCTA } from "@/components/blocks/aliignspace-about-cta";
import { AliignspaceServicesHero } from "@/components/blocks/aliignspace-services-hero";
import { AliignspaceServicesCards } from "@/components/blocks/aliignspace-services-cards";
import { AliignspaceServicesCTA } from "@/components/blocks/aliignspace-services-cta";
import { AliignspacePortfolioHero } from "@/components/blocks/aliignspace-portfolio-hero";
import { AliignspaceProjectList } from "@/components/blocks/aliignspace-project-list";
import { AliignspaceProjectDetail } from "@/components/blocks/aliignspace-project-detail";

// Section types supported by the CMS
export type SectionType =
  | "hero-premium"
  | "stats-floating"
  | "why-choose-us-premium"
  | "why-aliignspace-premium"
  | "about-premium"
  | "home-about-premium"
  | "services-premium"
  | "portfolio-premium"
  | "testimonials-premium"
  | "video-testimonials"
  | "consultation"
  | "about_hero"
  | "about_story"
  // Aliignspace Replication
  | "aliignspace-hero-slider"
  | "aliignspace-services-grid"
  | "aliignspace-milestones"
  | "aliignspace-why-choose"
  | "aliignspace-portfolio-slider"
  | "aliignspace-process-wheel"
  | "aliignspace-factory"
  | "aliignspace-google-reviews"
  | "aliignspace-video-testimonials"
  | "aliignspace-final-cta"
  | "aliignspace-faq"
  | "aliignspace-about-hero"
  | "aliignspace-who-we-are"
  | "aliignspace-story"
  | "aliignspace-vision-mission"
  | "aliignspace-promises"
  | "aliignspace-founders"
  | "aliignspace-timeline"
  | "aliignspace-factory-video"
  | "aliignspace-about-cta"
  | "aliignspace-services-hero"
  | "aliignspace-services-cards"
  | "aliignspace-services-cta"
  | "aliignspace-portfolio-hero"
  | "aliignspace-project-list"
  | "aliignspace-project-detail";

// Props interfaces for each section type with index signature for Prisma JSON
export interface HeroPremiumProps extends Record<string, unknown> {
  heading?: string;
  accentWord?: string;
  subheading?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  image?: string;
  videoUrl?: string;
}

export interface Stat extends Record<string, unknown> {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface StatsFloatingProps extends Record<string, unknown> {
  stats?: Stat[];
}

export interface Feature extends Record<string, unknown> {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export interface WhyChooseUsPremiumProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  founderImage?: string;
  features?: Feature[];
}

export interface AboutStat extends Record<string, unknown> {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutPremiumProps extends Record<string, unknown> {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  images?: string[];
  quote?: string;
  quoteAuthor?: string;
  stats?: AboutStat[];
}

export interface Service extends Record<string, unknown> {
  title: string;
  description: string;
  image?: string;
  link?: string;
  icon: string;
}

export interface ServicesPremiumProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

export interface PortfolioItem extends Record<string, unknown> {
  title: string;
  category: string;
  image: string;
  link?: string;
  featured?: boolean;
}

export interface PortfolioPremiumProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
}

export interface Review extends Record<string, unknown> {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  location?: string;
}

export interface TestimonialsPremiumProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

export interface VideoTestimonial extends Record<string, unknown> {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  duration?: string;
}

export interface VideoTestimonialsProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  videos?: VideoTestimonial[];
  autoplay?: boolean;
}

export interface ConsultationProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

// About Hero Props
export interface AboutHeroProps extends Record<string, unknown> {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
  label?: string;
  showScrollIndicator?: boolean;
  overlayOpacity?: number;
  alignment?: "center" | "left" | "right";
  minHeight?: string;
}

// About Story Props
export interface AboutStoryProps extends Record<string, unknown> {
  variant?: "story" | "mission";
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  imagePosition?: "left" | "right";
  showExperienceBadge?: boolean;
  experienceYears?: string;
  experienceLabel?: string;
  backgroundColor?: "cream" | "white" | "dark";
  spacing?: "normal" | "compact" | "spacious";
}

// Props for HomeAboutPremium section
export interface HomeAboutPremiumProps extends Record<string, unknown> {
  label?: string;
  heading?: string;
  accentWord?: string;
  content?: string;
  images?: string[];
  quote?: string;
  quoteAuthor?: string;
  stats?: AboutStat[];
  layout?: "collage" | "split" | "timeline" | "fullwidth";
  showVideo?: boolean;
  videoUrl?: string;
}

// Aliignspace Props Interfaces
export interface AliignspaceHeroSliderProps extends Record<string, unknown> {
  slides?: { image?: string; videoUrl?: string; title: string; subtitle: string }[];
  autoPlayInterval?: number;
}

export interface AliignspaceServicesGridProps extends Record<string, unknown> {
  label?: string;
  title?: string;
  subtitle?: string;
  accentWord?: string;
  services?: { number: string; title: string; description: string; icon?: string; link?: string }[];
}

export interface AliignspaceMilestonesProps extends Record<string, unknown> {
  title?: string;
  milestones?: { year: string; title: string; description: string }[];
}

export interface AliignspaceWhyChooseProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  features?: { title: string; description: string; icon?: string }[];
}

export interface AliignspacePortfolioSliderProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  projects?: { title: string; location: string; image: string; link?: string }[];
}

export interface AliignspaceProcessWheelProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  steps?: { number: string; title: string; description: string }[];
}

export interface AliignspaceFactoryProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  stats?: { label: string; value: string }[];
}

export interface AliignspaceGoogleReviewsProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: { name: string; rating: number; text: string; date?: string }[];
}

export interface AliignspaceVideoTestimonialsProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  videos?: { videoUrl: string; thumbnailUrl: string; clientName: string; quote?: string }[];
}

export interface AliignspaceFinalCtaProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface AliignspaceFaqProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  faqs?: { question: string; answer: string }[];
}

export interface AliignspaceAboutHeroProps extends Record<string, unknown> {
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  subtitle?: string;
}

export interface AliignspaceWhoWeAreProps extends Record<string, unknown> {
  label?: string;
  title?: string;
  accentWord?: string;
  body?: string[];
  stats?: { number: string; suffix?: string; label: string }[];
  image?: string;
}

export interface AliignspaceStoryProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
}

export interface AliignspaceVisionMissionProps extends Record<string, unknown> {
  title?: string;
  vision?: string;
  mission?: string;
}

export interface AliignspacePromisesProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  promises?: { title: string; description: string; icon?: string }[];
}

export interface AliignspaceFoundersProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  founders?: { name: string; role: string; bio?: string; image?: string }[];
}

export interface AliignspaceTimelineProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  events?: { year: string; title: string; description: string }[];
}

export interface AliignspaceFactoryVideoProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnail?: string;
}

export interface AliignspaceAboutCtaProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface AliignspaceServicesHeroProps extends Record<string, unknown> {
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  subtitle?: string;
}

export interface AliignspaceServicesCardsProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  services?: { title: string; description: string; image?: string; icon?: string }[];
}

export interface AliignspaceServicesCtaProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface AliignspacePortfolioHeroProps extends Record<string, unknown> {
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  subtitle?: string;
}

export interface AliignspaceProjectListProps extends Record<string, unknown> {
  projects?: {
    title: string;
    location: string;
    description: string;
    images: string[];
    tags?: string[];
    link?: string;
    index?: number;
  }[];
}

export interface AliignspaceProjectDetailProps extends Record<string, unknown> {
  title: string;
  location: string;
  description: string;
  gallery: string[];
  mainVideoUrl?: string;
  mainVideoType?: string;
  clientName?: string;
  projectType?: string;
  budget?: string;
  area?: string;
  tags?: string[];
}

// Union type for all section props
export type SectionProps =
  | HeroPremiumProps
  | StatsFloatingProps
  | WhyChooseUsPremiumProps
  | AboutPremiumProps
  | HomeAboutPremiumProps
  | ServicesPremiumProps
  | PortfolioPremiumProps
  | TestimonialsPremiumProps
  | VideoTestimonialsProps
  | ConsultationProps
  | AboutHeroProps
  | AboutStoryProps
  | AliignspaceHeroSliderProps
  | AliignspaceServicesGridProps
  | AliignspaceMilestonesProps
  | AliignspaceWhyChooseProps
  | AliignspacePortfolioSliderProps
  | AliignspaceProcessWheelProps
  | AliignspaceFactoryProps
  | AliignspaceGoogleReviewsProps
  | AliignspaceVideoTestimonialsProps
  | AliignspaceFinalCtaProps
  | AliignspaceFaqProps
  | AliignspaceAboutHeroProps
  | AliignspaceWhoWeAreProps
  | AliignspaceStoryProps
  | AliignspaceVisionMissionProps
  | AliignspacePromisesProps
  | AliignspaceFoundersProps
  | AliignspaceTimelineProps
  | AliignspaceFactoryVideoProps
  | AliignspaceAboutCtaProps
  | AliignspaceServicesHeroProps
  | AliignspaceServicesCardsProps
  | AliignspaceServicesCtaProps
  | AliignspacePortfolioHeroProps
  | AliignspaceProjectListProps
  | AliignspaceProjectDetailProps;

// Section configuration interface
export interface SectionConfig {
  type: SectionType;
  component: ComponentType<any>;
  defaultProps: SectionProps;
}

// Default props for each section type
export const defaultSectionProps: Record<SectionType, SectionProps> = {
  "hero-premium": {
    heading: "Design That Feels Like You",
    accentWord: "Feels",
    subheading:
      "Every home is personal. We design spaces that reflect your lifestyle, your taste, and your comfort — with thoughtful design, functional spaces, and timeless aesthetics.",
    buttonText: "Get Free Consultation",
    buttonUrl: "/contact",
    secondaryButtonText: "View Our Work",
    secondaryButtonUrl: "/portfolio",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    videoUrl: "",
  },
  "stats-floating": {
    stats: [
      { value: 10, suffix: "+", label: "Years Experience" },
      { value: 500, suffix: "+", label: "Projects Completed" },
      { value: 98, suffix: "%", label: "Client Satisfaction" },
      { value: 60, suffix: "-90 Days", label: "Delivery Time" },
    ],
  },
  "why-choose-us-premium": {
    title: "The ALIIGNSPACE Difference",
    subtitle: "Why discerning homeowners choose us",
    eyebrow: "Why Choose Us",
    description: "We don't just design spaces; we craft experiences that transform houses into homes you'll love for years to come.",
    quote: "Our Core team is specialised in interiors with 10 years of experience. Creativity & strategy — it's what drives us.",
    quoteAuthor: "Ar. Samhitha Nagasamudra",
    quoteRole: "Founder & Principal Designer",
    features: [
      {
        icon: "users",
        title: "Expert Design Team",
        description: "Award-winning architects and interior designers with over a decade of experience crafting luxury spaces.",
        highlight: "10+ Years",
        stat: "50+",
        statLabel: "Design Experts",
      },
      {
        icon: "gem",
        title: "Premium Materials",
        description: "Hand-picked, certified materials sourced directly from trusted global suppliers for lasting elegance.",
        highlight: "Certified",
        stat: "100%",
        statLabel: "Quality Assured",
      },
      {
        icon: "clock",
        title: "On-Time Delivery",
        description: "Our streamlined process ensures your dream space is ready within the promised timeline, every time.",
        highlight: "Guaranteed",
        stat: "98%",
        statLabel: "On-Time Rate",
      },
      {
        icon: "palette",
        title: "Bespoke Designs",
        description: "Every design is uniquely tailored to reflect your personality, lifestyle, and aspirations.",
        highlight: "100% Unique",
        stat: "500+",
        statLabel: "Custom Projects",
      },
      {
        icon: "shield-check",
        title: "Total Transparency",
        description: "Complete cost breakdown with no hidden charges. What you see is exactly what you pay.",
        highlight: "No Hidden Costs",
        stat: "0",
        statLabel: "Hidden Fees",
      },
      {
        icon: "heart-handshake",
        title: "Lifetime Support",
        description: "Our relationship doesn't end at handover. Dedicated support for all your maintenance needs.",
        highlight: "Always",
        stat: "24/7",
        statLabel: "Support",
      },
    ],
  },
  "why-aliignspace-premium": {
    title: "Why ALIIGNSPACE",
    subtitle: "Spaces Crafted with Trust",
    quote: "Our Core team is specialised in interiors with 10 years of experience. Creativity & strategy — it's what drives us.",
    quoteAuthor: "Ar. Samhitha Nagasamudra, Founder",
    features: [
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
    ],
  },
  "about-premium": {
    label: "About Us",
    heading: "Where Creativity Meets Strategy",
    accentWord: "Creativity",
    content:
      "<p>We are a young and experienced Interior Design team. <em>Creativity & strategy</em> — it's what drives us, and we are forever curious to produce cleaner designs and sharper strategies that make spaces a better home.</p><p>We are currently operational in both Telugu states — AP & Telangana — and looking forward to serving PAN India. Founded in 2021 with one belief: every estimate explained, every timeline in writing, and what you approve is exactly what you get.</p>",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    quote:
      "Not lack of options, but lack of trust is the problem. We all need to experience trust to make a decision.",
    quoteAuthor: "Ar. Samhitha Nagasamudra, Founder",
    stats: [
      { value: 10, suffix: "+", label: "Years Combined Experience" },
      { value: 500, suffix: "+", label: "Happy Families" },
      { value: 2, suffix: "", label: "Cities Served" },
    ],
  },
  "home-about-premium": {
    label: "About Us",
    heading: "Where Trust Becomes the Foundation",
    accentWord: "Trust",
    content: "<p>We are a young and experienced Interior Design team. <em>Creativity & strategy</em> — it's what drives us.</p><p>We are currently operational in both Telugu states — AP & Telangana — and looking forward to serving PAN India.</p>",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    quote: "Not lack of options, but lack of trust is the problem.",
    quoteAuthor: "Ar. Samhitha Nagasamudra",
    stats: [
      { value: 10, suffix: "+", label: "Years Combined Experience" },
      { value: 500, suffix: "+", label: "Happy Families" },
      { value: 2, suffix: "", label: "Cities Served" },
    ],
    layout: "collage",
  },
  "services-premium": {
    title: "Our Interior Services",
    subtitle: "Complete interior solutions for homes, offices, and commercial spaces",
    services: [
      {
        title: "Full Home Interiors",
        description:
          "Complete turnkey home transformation — living room, bedrooms, kitchen, bathrooms, and more. One team, one price, zero stress.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
        link: "/services/home-interiors",
        icon: "home",
      },
      {
        title: "Modular Kitchen",
        description:
          "Custom modular kitchens with premium hardware, smart storage, and finishes that marry beauty with function.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
        link: "/services/modular-kitchen",
        icon: "utensils",
      },
      {
        title: "Living Room Design",
        description:
          "Statement living spaces with bespoke false ceilings, ambient lighting, custom furniture, and curated decor.",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
        link: "/services/living-room",
        icon: "sofa",
      },
      {
        title: "Bedroom Design",
        description:
          "Serene, personalised bedrooms with wardrobe solutions, upholstered headboards, and calming palettes.",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
        link: "/services/bedroom",
        icon: "bed",
      },
      {
        title: "Office Interiors",
        description:
          "Modern, productive workspaces that reflect your brand identity and inspire your team every single day.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
        link: "/services/office-interiors",
        icon: "briefcase",
      },
      {
        title: "Commercial Spaces",
        description:
          "High-impact retail stores, restaurants, clinics, and commercial interiors designed to impress and convert.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
        link: "/services/commercial",
        icon: "building",
      },
    ],
  },
  "portfolio-premium": {
    title: "Our Work",
    subtitle: "Browse our portfolio of transformed spaces across Hyderabad & Nellore",
    items: [
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
    ],
  },
  "testimonials-premium": {
    title: "What Our Clients Say",
    subtitle: "Rated 4.9★ on Google by 127+ happy families",
    rating: 4.9,
    reviewCount: 127,
    reviews: [
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
    ],
  },
  "video-testimonials": {
    title: "Hear It from Those Who Experienced It",
    subtitle: "Real stories from real homeowners",
    eyebrow: "Client Stories",
    description: "Watch authentic testimonials from our satisfied clients across Hyderabad and Nellore. Their experiences speak louder than our words.",
    autoplay: true,
    videos: [
      {
        id: "1",
        videoUrl: "",
        thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
        clientName: "Priya & Rahul Sharma",
        projectType: "3BHK Apartment",
        location: "Jubilee Hills",
        quote: "ALIIGNSPACE transformed our house into a dream home beyond our imagination!",
        duration: "2:34",
      },
      {
        id: "2",
        videoUrl: "",
        thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        clientName: "Anita Reddy",
        projectType: "4BHK Villa",
        location: "Gachibowli",
        quote: "Professional, transparent, and delivered exactly on time. Highly recommend!",
        duration: "1:45",
      },
      {
        id: "3",
        videoUrl: "",
        thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        clientName: "Vikram & Sneha",
        projectType: "Modular Kitchen",
        location: "Banjara Hills",
        quote: "Our kitchen is now the heart of our home. The design is absolutely stunning!",
        duration: "3:12",
      },
    ],
  },
  consultation: {
    title: "Start Your Dream Home Journey",
    subtitle:
      "Book a free consultation today. Our architects will visit your site, understand your vision, and share a detailed design plan — at no cost to you.",
    backgroundImage: "",
  },
  "about_hero": {
    heading: "About Aliignspace",
    subheading: "Our Core team is specialised in interiors with 10 years of experience",
    backgroundImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    label: "Who We Are",
    showScrollIndicator: true,
    overlayOpacity: 70,
    alignment: "center",
    minHeight: "70vh",
  },
  "about_story": {
    variant: "story",
    label: "Our Story",
    heading: "Where trust becomes the foundation",
    accentWord: "trust",
    content: "<p>At ALIIGNSPACE, we believe that every home tells a story.</p>",
    image: "",
    imageAlt: "",
    quote: "",
    quoteAuthor: "",
    imagePosition: "left",
    showExperienceBadge: true,
    experienceYears: "10+",
    experienceLabel: "Years Experience",
    backgroundColor: "cream",
    spacing: "normal",
  },
  // Aliignspace Replication Defaults
  "aliignspace-hero-slider": {
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
  "aliignspace-services-grid": {
    label: "What We Do",
    title: "Our",
    accentWord: "Services",
    subtitle: "Comprehensive interior solutions for every space and style",
    services: [
      { number: "01", title: "Residential Interiors", description: "Complete home transformations from 2BHK apartments to luxury villas.", icon: "home", link: "#" },
      { number: "02", title: "Modular Kitchens", description: "Smart, stylish kitchens designed for efficiency with premium materials.", icon: "utensils", link: "#" },
      { number: "03", title: "Living Spaces", description: "Elegant living rooms that balance comfort with sophisticated aesthetics.", icon: "sofa", link: "#" },
    ],
  },
  "aliignspace-milestones": {
    title: "Our Journey",
    milestones: [
      { year: "2021", title: "Founded", description: "ALIIGNSPACE was established with a vision to transform homes." },
      { year: "2022", title: "100 Projects", description: "Completed our first 100 interior design projects." },
      { year: "2023", title: "Expanded", description: "Expanded operations to Nellore and surrounding areas." },
      { year: "2024", title: "500+ Homes", description: "Transformed over 500 homes across Telangana and AP." },
    ],
  },
  "aliignspace-why-choose": {
    title: "Why Choose Us",
    subtitle: "The ALIIGNSPACE Difference",
    features: [
      { title: "Expert Team", description: "10+ years of combined experience in interior design.", icon: "users" },
      { title: "Quality Materials", description: "Premium, certified materials sourced from trusted suppliers.", icon: "gem" },
      { title: "On-Time Delivery", description: "Guaranteed project completion within committed timelines.", icon: "clock" },
    ],
  },
  "aliignspace-portfolio-slider": {
    title: "Our Work",
    subtitle: "Finest Projects We've Crafted",
    projects: [
      { title: "Jubilee Hills Residence", location: "Hyderabad", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", link: "#" },
      { title: "Banjara Hills Villa", location: "Hyderabad", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80", link: "#" },
    ],
  },
  "aliignspace-process-wheel": {
    title: "Steps to give your home an ALIIGNSPACE Makeover",
    subtitle: "Our Process",
    steps: [
      { number: "01", title: "Consultation", description: "Free consultation to understand your vision and requirements." },
      { number: "02", title: "Design", description: "Custom 3D designs tailored to your space and budget." },
      { number: "03", title: "Execution", description: "Precision execution with premium materials and skilled craftsmen." },
      { number: "04", title: "Handover", description: "On-time delivery with quality checks and final walkthrough." },
    ],
  },
  "aliignspace-factory": {
    title: "Our Factory",
    subtitle: "Where craftsmanship comes to life",
    description: "State-of-the-art manufacturing facility with precision machinery and skilled artisans.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    stats: [
      { label: "Production Capacity", value: "10,000 sq ft/month" },
      { label: "Quality Checks", value: "15+ stages" },
    ],
  },
  "aliignspace-google-reviews": {
    title: "Loved by Homeowners Across Hyderabad",
    subtitle: "Real reviews from real clients",
    rating: 4.9,
    reviewCount: 127,
    reviews: [
      { name: "Priya Sharma", rating: 5, text: "Amazing work! Transformed our home beautifully.", date: "2 weeks ago" },
      { name: "Rajesh Kumar", rating: 5, text: "Professional team with excellent attention to detail.", date: "1 month ago" },
    ],
  },
  "aliignspace-video-testimonials": {
    title: "Video Testimonials",
    subtitle: "Hear from our happy clients",
    videos: [
      { videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", clientName: "Priya Sharma", quote: "Transformed our home beautifully!" },
    ],
  },
  "aliignspace-final-cta": {
    title: "Ready to Transform Your Space?",
    subtitle: "Book a free consultation with our design experts today.",
    buttonText: "Get Free Consultation",
    buttonUrl: "/contact",
  },
  "aliignspace-faq": {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our services",
    faqs: [
      { question: "How long does a typical project take?", answer: "Most residential projects are completed within 60-90 days depending on the scope." },
      { question: "Do you offer free consultations?", answer: "Yes, we offer free initial consultations to understand your requirements." },
    ],
  },
  "aliignspace-about-hero": {
    eyebrow: "About Us",
    title: "Crafting Interiors with",
    accentWord: "Purpose",
    subtitle: "We believe every space has a story. Our mission is to tell yours through design that blends beauty, function, and soul.",
  },
  "aliignspace-who-we-are": {
    label: "Who We Are",
    title: "Designing spaces that reflect",
    accentWord: "you",
    body: [
      "At Aliignspace, we don't just design interiors—we curate experiences. Every project begins with listening, understanding, and imagining what a space could become.",
      "From Hyderabad to homes across India, our team of architects, interior designers, and craftsmen work in unison to deliver spaces that are as functional as they are beautiful.",
    ],
    stats: [
      { number: "12", suffix: "+", label: "Years of Excellence" },
      { number: "850", suffix: "+", label: "Homes Transformed" },
      { number: "35", suffix: "+", label: "Design Awards" },
      { number: "4", suffix: "", label: "Cities Served" },
    ],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  },
  "aliignspace-story": {
    title: "Our Story",
    subtitle: "From a small studio to a trusted name in interiors",
    content: "Founded in 2021, ALIIGNSPACE began with a simple belief: every estimate explained, every timeline in writing, and what you approve is exactly what you get.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  "aliignspace-vision-mission": {
    title: "Vision & Mission",
    vision: "To be India's most trusted interior design partner, creating spaces that inspire and endure.",
    mission: "To deliver transparent, high-quality interior solutions that transform houses into homes through creativity, craftsmanship, and care.",
  },
  "aliignspace-promises": {
    title: "Our Promises",
    subtitle: "What you can expect from every ALIIGNSPACE project",
    promises: [
      { title: "Transparent Pricing", description: "No hidden costs. Every estimate explained in detail.", icon: "shield-check" },
      { title: "On-Time Delivery", description: "We respect your time and commit to deadlines.", icon: "clock" },
      { title: "Premium Quality", description: "Certified materials and skilled craftsmanship guaranteed.", icon: "gem" },
      { title: "Lifetime Support", description: "Our relationship doesn't end at handover.", icon: "heart-handshake" },
    ],
  },
  "aliignspace-founders": {
    title: "Meet Our Founders",
    subtitle: "The visionaries behind ALIIGNSPACE",
    founders: [
      { name: "Ar. Samhitha Nagasamudra", role: "Founder & Principal Designer", bio: "An architect with a passion for creating spaces that tell stories.", image: "" },
    ],
  },
  "aliignspace-timeline": {
    title: "Our Journey",
    subtitle: "Milestones that shaped who we are today",
    events: [
      { year: "2021", title: "The Beginning", description: "ALIIGNSPACE was founded with a vision to transform interior design in India." },
      { year: "2022", title: "First 100 Projects", description: "Completed our first 100 successful interior transformations." },
      { year: "2023", title: "Expansion", description: "Expanded to Nellore and grew the team to 25+ designers." },
      { year: "2024", title: "500+ Homes", description: "Crossed the milestone of 500 transformed homes." },
    ],
  },
  "aliignspace-factory-video": {
    title: "Inside Our Factory",
    subtitle: "See where the magic happens",
    videoUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  },
  "aliignspace-about-cta": {
    title: "Ready to Begin Your Journey?",
    subtitle: "Let's create a space that truly reflects you.",
    buttonText: "Book a Consultation",
    buttonUrl: "/contact",
  },
  "aliignspace-services-hero": {
    eyebrow: "Our Services",
    title: "Interior Solutions Crafted with",
    accentWord: "Care",
    subtitle: "From concept to completion, we handle every detail so you can enjoy the transformation.",
  },
  "aliignspace-services-cards": {
    title: "What We Offer",
    subtitle: "Comprehensive interior solutions for every need",
    services: [
      { title: "Full Home Interiors", description: "Complete turnkey solutions for your entire home.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", icon: "home" },
      { title: "Modular Kitchen", description: "Smart kitchens with premium finishes and hardware.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", icon: "utensils" },
      { title: "Living Room Design", description: "Statement spaces that balance comfort and style.", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", icon: "sofa" },
    ],
  },
  "aliignspace-services-cta": {
    title: "Not Sure Where to Start?",
    subtitle: "Our design experts are here to guide you through every step.",
    buttonText: "Get Free Consultation",
    buttonUrl: "/contact",
  },
  "aliignspace-portfolio-hero": {
    eyebrow: "Our Work",
    title: "Crafting Interiors with",
    accentWord: "Purpose",
    subtitle: "We believe every space has a story. Our mission is to tell yours through design that blends beauty, function, and soul.",
  },
  "aliignspace-project-list": {
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
  "aliignspace-project-detail": {
    title: "The Residence at Jubilee Hills",
    location: "Jubilee Hills, Hyderabad",
    description: "A complete transformation of a 4,500 sq ft penthouse into a serene modern sanctuary. Warm oak paneling, curated art walls, and floor-to-ceiling windows frame the city skyline. Every detail was considered—from the custom joinery to the hand-selected stone surfaces—to create a home that feels both luxurious and deeply personal.",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    mainVideoUrl: "",
    mainVideoType: "youtube",
    clientName: "Mr. & Mrs. Sharma",
    projectType: "Residential Interior",
    budget: "Premium",
    area: "4,500 sq ft",
    tags: ["Modern", "Luxury", "Penthouse"],
  },
};

// Component mapping
export const sectionComponentMap: Record<SectionType, ComponentType<any>> = {
  "hero-premium": HeroPremium,
  "stats-floating": StatsFloating,
  "why-choose-us-premium": WhyChooseUsPremium,
  "why-aliignspace-premium": WhyChooseUsPremium,
  "about-premium": AboutPremium,
  "home-about-premium": HomeAboutPremium,
  "services-premium": ServicesPremium,
  "portfolio-premium": PortfolioPremium,
  "testimonials-premium": TestimonialsPremium,
  "video-testimonials": VideoTestimonialsBlock,
  consultation: ConsultationBlock,
  "about_hero": AboutHero,
  "about_story": StorySection,
  // Aliignspace Replication
  "aliignspace-hero-slider": AliignspaceHeroSlider,
  "aliignspace-services-grid": AliignspaceServicesGrid,
  "aliignspace-milestones": AliignspaceMilestones,
  "aliignspace-why-choose": AliignspaceWhyChoose,
  "aliignspace-portfolio-slider": AliignspacePortfolioSlider,
  "aliignspace-process-wheel": AliignspaceProcessWheel,
  "aliignspace-factory": AliignspaceFactory,
  "aliignspace-google-reviews": AliignspaceGoogleReviews,
  "aliignspace-video-testimonials": AliignspaceVideoTestimonials,
  "aliignspace-final-cta": AliignspaceFinalCTA,
  "aliignspace-faq": AliignspaceFAQ,
  "aliignspace-about-hero": AliignspaceAboutHero,
  "aliignspace-who-we-are": AliignspaceWhoWeAre,
  "aliignspace-story": AliignspaceStory,
  "aliignspace-vision-mission": AliignspaceVisionMission,
  "aliignspace-promises": AliignspacePromises,
  "aliignspace-founders": AliignspaceFounders,
  "aliignspace-timeline": AliignspaceTimeline,
  "aliignspace-factory-video": AliignspaceFactoryVideo,
  "aliignspace-about-cta": AliignspaceAboutCTA,
  "aliignspace-services-hero": AliignspaceServicesHero,
  "aliignspace-services-cards": AliignspaceServicesCards,
  "aliignspace-services-cta": AliignspaceServicesCTA,
  "aliignspace-portfolio-hero": AliignspacePortfolioHero,
  "aliignspace-project-list": AliignspaceProjectList,
  "aliignspace-project-detail": AliignspaceProjectDetail,
};

// Helper function to get component by section type
export function getSectionComponent(type: string): ComponentType<any> | null {
  return sectionComponentMap[type as SectionType] || null;
}

// Helper function to get default props by section type
export function getDefaultSectionProps(type: string): SectionProps | null {
  return defaultSectionProps[type as SectionType] || null;
}

// Helper function to check if a section type is valid
export function isValidSectionType(type: string): type is SectionType {
  return type in sectionComponentMap;
}

// Get all available section types
export function getAvailableSectionTypes(): SectionType[] {
  return Object.keys(sectionComponentMap) as SectionType[];
}

// Human-readable labels for section types
export const sectionTypeLabels: Record<SectionType, string> = {
  "hero-premium": "Hero Section",
  "stats-floating": "Stats Bar",
  "why-choose-us-premium": "Why Choose Us",
  "why-aliignspace-premium": "Why Choose Us (Legacy)",
  "about-premium": "About Section",
  "home-about-premium": "Home About",
  "services-premium": "Services",
  "portfolio-premium": "Portfolio",
  "testimonials-premium": "Testimonials",
  "video-testimonials": "Video Testimonials",
  consultation: "Consultation",
  "about_hero": "About Hero",
  "about_story": "About Story",
  // Aliignspace Replication
  "aliignspace-hero-slider": "Aliignspace Hero Slider",
  "aliignspace-services-grid": "Aliignspace Services Grid",
  "aliignspace-milestones": "Aliignspace Milestones",
  "aliignspace-why-choose": "Aliignspace Why Choose",
  "aliignspace-portfolio-slider": "Aliignspace Portfolio Slider",
  "aliignspace-process-wheel": "Aliignspace Process Wheel",
  "aliignspace-factory": "Aliignspace Factory",
  "aliignspace-google-reviews": "Aliignspace Google Reviews",
  "aliignspace-video-testimonials": "Aliignspace Video Testimonials",
  "aliignspace-final-cta": "Aliignspace Final CTA",
  "aliignspace-faq": "Aliignspace FAQ",
  "aliignspace-about-hero": "Aliignspace About Hero",
  "aliignspace-who-we-are": "Aliignspace Who We Are",
  "aliignspace-story": "Aliignspace Story",
  "aliignspace-vision-mission": "Aliignspace Vision & Mission",
  "aliignspace-promises": "Aliignspace Promises",
  "aliignspace-founders": "Aliignspace Founders",
  "aliignspace-timeline": "Aliignspace Timeline",
  "aliignspace-factory-video": "Aliignspace Factory Video",
  "aliignspace-about-cta": "Aliignspace About CTA",
  "aliignspace-services-hero": "Aliignspace Services Hero",
  "aliignspace-services-cards": "Aliignspace Services Cards",
  "aliignspace-services-cta": "Aliignspace Services CTA",
  "aliignspace-portfolio-hero": "Aliignspace Portfolio Hero",
  "aliignspace-project-list": "Aliignspace Project List",
  "aliignspace-project-detail": "Aliignspace Project Detail",
};

// Backward-compatible alias for getDefaultSectionProps
export const getDefaultProps = getDefaultSectionProps;

// Default home page sections configuration
export const defaultHomePageSections: { type: SectionType; props?: Partial<SectionProps> }[] =
  [
    { type: "hero-premium" },
    { type: "stats-floating" },
    { type: "why-choose-us-premium" },
    { type: "home-about-premium" },
    { type: "services-premium" },
    { type: "portfolio-premium" },
    { type: "video-testimonials" },
    { type: "testimonials-premium" },
    { type: "consultation" },
  ];

// Merge CMS props with defaults (deep merge for nested objects)
export function mergeSectionProps(
  type: SectionType,
  cmsProps: Partial<SectionProps> = {}
): SectionProps {
  const defaults = defaultSectionProps[type];

  // Deep merge function
  const deepMerge = (target: any, source: any): any => {
    if (source === null || source === undefined) return target;
    if (typeof source !== "object") return source;

    const result = Array.isArray(target) ? [...target] : { ...target };

    for (const key in source) {
      if (source[key] !== null && typeof source[key] === "object") {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else if (source[key] !== undefined) {
        result[key] = source[key];
      }
    }

    return result;
  };

  return deepMerge(defaults, cmsProps);
}
