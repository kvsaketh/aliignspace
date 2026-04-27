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

// New V2 Components (Aertsen-inspired)
import { StatsV2 } from "./stats-v2";
import { BenefitsV2 } from "./benefits-v2";
import { ProjectsV2 } from "./projects-v2";
import { ProcessV2 } from "./process-v2";
import { CraftsmanshipV2 } from "./craftsmanship-v2";

// Aertsen Replication Components
import { AertsenHeroSlider } from "./aertsen-hero-slider";
import { AertsenServicesGrid } from "./aertsen-services-grid";
import { AertsenMilestones } from "./aertsen-milestones";
import { AertsenWhyChoose } from "./aertsen-why-choose";
import { AertsenPortfolioSlider } from "./aertsen-portfolio-slider";
import { AertsenProcessWheel } from "./aertsen-process-wheel";
import { AertsenFactory } from "./aertsen-factory";
import { AertsenGoogleReviews } from "./aertsen-google-reviews";
import { AertsenVideoTestimonials } from "./aertsen-video-testimonials";
import { AertsenFinalCTA } from "./aertsen-final-cta";
import { AertsenFAQ } from "./aertsen-faq";

// Aertsen About Page Components
import { AertsenAboutHero } from "./aertsen-about-hero";
import { AertsenWhoWeAre } from "./aertsen-who-we-are";
import { AertsenStory } from "./aertsen-story";
import { AertsenVisionMission } from "./aertsen-vision-mission";
import { AertsenPromises } from "./aertsen-promises";
import { AertsenFounders } from "./aertsen-founders";
import { AertsenTimeline } from "./aertsen-timeline";
import { AertsenFactoryVideo } from "./aertsen-factory-video";
import { AertsenAboutCTA } from "./aertsen-about-cta";

// Aertsen Services Page Components
import { AertsenServicesHero } from "./aertsen-services-hero";
import { AertsenServicesCards } from "./aertsen-services-cards";
import { AertsenServicesCTA } from "./aertsen-services-cta";

// Aertsen Portfolio Page Components
import { AertsenPortfolioHero } from "./aertsen-portfolio-hero";
import { AertsenProjectList } from "./aertsen-project-list";
import { AertsenProjectDetail } from "./aertsen-project-detail";
import { AertsenServicesMarquee } from "./aertsen-services-marquee";

// Aertsen Home Page Components
import { AertsenAboutBrief } from "./aertsen-about-brief";
import { AertsenInfographics } from "./aertsen-infographics";

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

  // Aertsen Replication Components
  aertsenHeroSlider: AertsenHeroSlider,
  aertsenServicesGrid: AertsenServicesGrid,
  aertsenMilestones: AertsenMilestones,
  aertsenWhyChoose: AertsenWhyChoose,
  aertsenPortfolioSlider: AertsenPortfolioSlider,
  aertsenProcessWheel: AertsenProcessWheel,
  aertsenFactory: AertsenFactory,
  aertsenGoogleReviews: AertsenGoogleReviews,
  aertsenVideoTestimonials: AertsenVideoTestimonials,
  "aertsen-final-cta": AertsenFinalCTA,
  "aertsen-faq": AertsenFAQ,

  // Aertsen About Page Components
  aertsenAboutHero: AertsenAboutHero,
  aertsenWhoWeAre: AertsenWhoWeAre,
  aertsenStory: AertsenStory,
  aertsenVisionMission: AertsenVisionMission,
  aertsenPromises: AertsenPromises,
  aertsenFounders: AertsenFounders,
  aertsenTimeline: AertsenTimeline,
  aertsenFactoryVideo: AertsenFactoryVideo,
  aertsenAboutCta: AertsenAboutCTA,

  // Aertsen Services Page Components
  aertsenServicesHero: AertsenServicesHero,
  aertsenServicesCards: AertsenServicesCards,
  aertsenServicesCta: AertsenServicesCTA,

  // Aertsen Portfolio Page Components
  aertsenPortfolioHero: AertsenPortfolioHero,
  aertsenProjectList: AertsenProjectList,
  aertsenProjectDetail: AertsenProjectDetail,
  aertsenServicesMarquee: AertsenServicesMarquee,

  // Kebab-case aliases (CMS-driven pages use these block types)
  "aertsen-hero-slider": AertsenHeroSlider,
  "aertsen-services-grid": AertsenServicesGrid,
  "aertsen-milestones": AertsenMilestones,
  "aertsen-why-choose": AertsenWhyChoose,
  "aertsen-portfolio-slider": AertsenPortfolioSlider,
  "aertsen-process-wheel": AertsenProcessWheel,
  "aertsen-factory": AertsenFactory,
  "aertsen-google-reviews": AertsenGoogleReviews,
  "aertsen-video-testimonials": AertsenVideoTestimonials,
  "aertsen-about-hero": AertsenAboutHero,
  "aertsen-who-we-are": AertsenWhoWeAre,
  "aertsen-story": AertsenStory,
  "aertsen-vision-mission": AertsenVisionMission,
  "aertsen-promises": AertsenPromises,
  "aertsen-founders": AertsenFounders,
  "aertsen-timeline": AertsenTimeline,
  "aertsen-factory-video": AertsenFactoryVideo,
  "aertsen-about-cta": AertsenAboutCTA,
  "aertsen-services-hero": AertsenServicesHero,
  "aertsen-services-cards": AertsenServicesCards,
  "aertsen-services-cta": AertsenServicesCTA,
  "aertsen-portfolio-hero": AertsenPortfolioHero,
  "aertsen-project-list": AertsenProjectList,
  "aertsen-project-detail": AertsenProjectDetail,

  // Kebab-case: home page
  "aertsen-about-brief": AertsenAboutBrief,
  "aertsen-infographics": AertsenInfographics,
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

  // Aertsen Replication Components
  AertsenHeroSlider,
  AertsenServicesGrid,
  AertsenMilestones,
  AertsenWhyChoose,
  AertsenPortfolioSlider,
  AertsenProcessWheel,
  AertsenFactory,
  AertsenGoogleReviews,
  AertsenVideoTestimonials,
  AertsenFinalCTA,
  AertsenFAQ,

  // Aertsen About Page Components
  AertsenAboutHero,
  AertsenWhoWeAre,
  AertsenStory,
  AertsenVisionMission,
  AertsenPromises,
  AertsenFounders,
  AertsenTimeline,
  AertsenFactoryVideo,
  AertsenAboutCTA,

  // Aertsen Services Page Components
  AertsenServicesHero,
  AertsenServicesCards,
  AertsenServicesCTA,

  // Aertsen Portfolio Page Components
  AertsenPortfolioHero,
  AertsenProjectList,
  AertsenProjectDetail,

  // Aertsen Home Page Components
  AertsenAboutBrief,
  AertsenInfographics,
};
