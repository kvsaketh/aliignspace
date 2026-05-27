import { HeroBlock } from "./hero";
import { AboutBlock } from "./about";
import { FeaturesBlock } from "./features";
import { ServicesBlock } from "./services";
import { PortfolioBlock } from "./portfolio";
import { TestimonialsBlock } from "./testimonials";
import { TeamBlock } from "./team";
import { FAQBlock } from "./faq";
import { ContactBlock } from "./contact";
import { CTABlock } from "./cta";
import { ContentBlock } from "./content";
import { WhyChooseUsBlock } from "./why-choose-us";
import { ProcessBlock } from "./process";
import { ConsultationBlock } from "./consultation";
import { GoogleReviewsBlock } from "./google-reviews";
import { StoryBlock } from "./story";
import { StatsBlock } from "./stats";
import { HomeAboutPremium } from "./home-about";
import { HeroClean } from "./hero-clean";
import { StatsClean } from "./stats-clean";
import { ServicesClean } from "./services-clean";
import { PortfolioMasonry } from "./portfolio-masonry";
import { WhyChooseClean } from "./why-choose-clean";
import { CTAClean } from "./cta-clean";

// New V2 Components (Aliignspace-inspired)
import { StatsV2 } from "./stats-v2";
import { BenefitsV2 } from "./benefits-v2";
import { ProjectsV2 } from "./projects-v2";
import { ProcessV2 } from "./process-v2";
import { CraftsmanshipV2 } from "./craftsmanship-v2";

// Aliignspace Replication Components
import { AliignspaceHeroSlider } from "./aliignspace-hero-slider";
import { AliignspaceServicesGrid } from "./aliignspace-services-grid";
import { AliignspaceMilestones } from "./aliignspace-milestones";
import { AliignspaceWhyChoose } from "./aliignspace-why-choose";
import { AliignspacePortfolioSlider } from "./aliignspace-portfolio-slider";
import { AliignspaceProcessWheel } from "./aliignspace-process-wheel";
import { AliignspaceFactory } from "./aliignspace-factory";
import { AliignspaceGoogleReviews } from "./aliignspace-google-reviews";
import { AliignspaceVideoTestimonials } from "./aliignspace-video-testimonials";
import { AliignspaceFinalCTA } from "./aliignspace-final-cta";
import { AliignspaceFAQ } from "./aliignspace-faq";

// Aliignspace About Page Components
import { AliignspaceAboutHero } from "./aliignspace-about-hero";
import { AliignspaceWhoWeAre } from "./aliignspace-who-we-are";
import { AliignspaceStory } from "./aliignspace-story";
import { AliignspaceVisionMission } from "./aliignspace-vision-mission";
import { AliignspacePromises } from "./aliignspace-promises";
import { AliignspaceFounders } from "./aliignspace-founders";
import { AliignspaceTimeline } from "./aliignspace-timeline";
import { AliignspaceFactoryVideo } from "./aliignspace-factory-video";
import { AliignspaceAboutCTA } from "./aliignspace-about-cta";

// Aliignspace Services Page Components
import { AliignspaceServicesHero } from "./aliignspace-services-hero";
import { AliignspaceServicesCards } from "./aliignspace-services-cards";
import { AliignspaceServicesCTA } from "./aliignspace-services-cta";

// Aliignspace Portfolio Page Components
import { AliignspacePortfolioHero } from "./aliignspace-portfolio-hero";
import { AliignspaceProjectList } from "./aliignspace-project-list";
import { AliignspaceProjectDetail } from "./aliignspace-project-detail";
import { AliignspaceServicesMarquee } from "./aliignspace-services-marquee";

// Aliignspace Home Page Components
import { AliignspaceAboutBrief } from "./aliignspace-about-brief";
import { AliignspaceInfographics } from "./aliignspace-infographics";

export const blockComponents = {
  hero: HeroBlock,
  about: AboutBlock,
  features: FeaturesBlock,
  services: ServicesBlock,
  portfolio: PortfolioBlock,
  testimonials: TestimonialsBlock,
  team: TeamBlock,
  faq: FAQBlock,
  contact: ContactBlock,
  cta: CTABlock,
  content: ContentBlock,
  whyChooseUs: WhyChooseUsBlock,
  process: ProcessBlock,
  consultation: ConsultationBlock,
  googleReviews: GoogleReviewsBlock,
  story: StoryBlock,
  stats: StatsBlock,
  homeAboutPremium: HomeAboutPremium,
  "hero-clean": HeroClean,
  "stats-clean": StatsClean,
  "services-clean": ServicesClean,
  "portfolio-masonry": PortfolioMasonry,
  "why-choose-clean": WhyChooseClean,
  "cta-clean": CTAClean,

  // New V2 Components
  "stats-v2": StatsV2,
  "benefits-v2": BenefitsV2,
  "projects-v2": ProjectsV2,
  "process-v2": ProcessV2,
  "craftsmanship-v2": CraftsmanshipV2,

  // Aliignspace Replication Components
  aliignspaceHeroSlider: AliignspaceHeroSlider,
  aliignspaceServicesGrid: AliignspaceServicesGrid,
  aliignspaceMilestones: AliignspaceMilestones,
  aliignspaceWhyChoose: AliignspaceWhyChoose,
  aliignspacePortfolioSlider: AliignspacePortfolioSlider,
  aliignspaceProcessWheel: AliignspaceProcessWheel,
  aliignspaceFactory: AliignspaceFactory,
  aliignspaceGoogleReviews: AliignspaceGoogleReviews,
  aliignspaceVideoTestimonials: AliignspaceVideoTestimonials,
  "aliignspace-final-cta": AliignspaceFinalCTA,
  "aliignspace-faq": AliignspaceFAQ,

  // Aliignspace About Page Components
  aliignspaceAboutHero: AliignspaceAboutHero,
  aliignspaceWhoWeAre: AliignspaceWhoWeAre,
  aliignspaceStory: AliignspaceStory,
  aliignspaceVisionMission: AliignspaceVisionMission,
  aliignspacePromises: AliignspacePromises,
  aliignspaceFounders: AliignspaceFounders,
  aliignspaceTimeline: AliignspaceTimeline,
  aliignspaceFactoryVideo: AliignspaceFactoryVideo,
  aliignspaceAboutCta: AliignspaceAboutCTA,

  // Aliignspace Services Page Components
  aliignspaceServicesHero: AliignspaceServicesHero,
  aliignspaceServicesCards: AliignspaceServicesCards,
  aliignspaceServicesCta: AliignspaceServicesCTA,

  // Aliignspace Portfolio Page Components
  aliignspacePortfolioHero: AliignspacePortfolioHero,
  aliignspaceProjectList: AliignspaceProjectList,
  aliignspaceProjectDetail: AliignspaceProjectDetail,
  aliignspaceServicesMarquee: AliignspaceServicesMarquee,

  // Kebab-case aliases (CMS-driven pages use these block types)
  "aliignspace-hero-slider": AliignspaceHeroSlider,
  "aliignspace-services-grid": AliignspaceServicesGrid,
  "aliignspace-milestones": AliignspaceMilestones,
  "aliignspace-why-choose": AliignspaceWhyChoose,
  "aliignspace-portfolio-slider": AliignspacePortfolioSlider,
  "aliignspace-process-wheel": AliignspaceProcessWheel,
  "aliignspace-factory": AliignspaceFactory,
  "aliignspace-google-reviews": AliignspaceGoogleReviews,
  "aliignspace-video-testimonials": AliignspaceVideoTestimonials,
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

  // Kebab-case: home page
  "aliignspace-about-brief": AliignspaceAboutBrief,
  "aliignspace-infographics": AliignspaceInfographics,
};

export type BlockType = keyof typeof blockComponents;

export function getBlockComponent(type: string) {
  return blockComponents[type as BlockType] || null;
}

export {
  HeroBlock,
  AboutBlock,
  FeaturesBlock,
  ServicesBlock,
  PortfolioBlock,
  TestimonialsBlock,
  TeamBlock,
  FAQBlock,
  ContactBlock,
  CTABlock,
  ContentBlock,
  WhyChooseUsBlock,
  ProcessBlock,
  ConsultationBlock,
  GoogleReviewsBlock,
  StoryBlock,
  StatsBlock,
  HomeAboutPremium,
  HeroClean,
  StatsClean,
  ServicesClean,
  PortfolioMasonry,
  WhyChooseClean,
  CTAClean,

  // New V2 Components
  StatsV2,
  BenefitsV2,
  ProjectsV2,
  ProcessV2,
  CraftsmanshipV2,

  // Aliignspace Replication Components
  AliignspaceHeroSlider,
  AliignspaceServicesGrid,
  AliignspaceMilestones,
  AliignspaceWhyChoose,
  AliignspacePortfolioSlider,
  AliignspaceProcessWheel,
  AliignspaceFactory,
  AliignspaceGoogleReviews,
  AliignspaceVideoTestimonials,
  AliignspaceFinalCTA,
  AliignspaceFAQ,

  // Aliignspace About Page Components
  AliignspaceAboutHero,
  AliignspaceWhoWeAre,
  AliignspaceStory,
  AliignspaceVisionMission,
  AliignspacePromises,
  AliignspaceFounders,
  AliignspaceTimeline,
  AliignspaceFactoryVideo,
  AliignspaceAboutCTA,

  // Aliignspace Services Page Components
  AliignspaceServicesHero,
  AliignspaceServicesCards,
  AliignspaceServicesCTA,

  // Aliignspace Portfolio Page Components
  AliignspacePortfolioHero,
  AliignspaceProjectList,
  AliignspaceProjectDetail,

  // Aliignspace Home Page Components
  AliignspaceAboutBrief,
  AliignspaceInfographics,
};
