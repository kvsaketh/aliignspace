import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sections = [
  { order: 0, type: 'aertsen-hero-slider', props: { slides: [
    { title: 'Design Services', subtitle: 'Built Around You', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80' },
    { title: 'Natural Perseverance', subtitle: 'Where light meets tranquility', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' },
    { title: 'Euphoric Walls', subtitle: 'Contemporary elegance', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80' },
    { title: 'Modern Living', subtitle: 'Simplicity in every detail', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80' }
  ]}},
  { order: 1, type: 'aertsen-infographics', props: { stats: [
    { value: '1000', suffix: '+', label: 'Projects', description: 'Successfully delivered across Hyderabad', icon: 'home' },
    { value: '1500', suffix: '+', label: 'Happy Families', description: 'Trust us with their dream homes', icon: 'users' },
    { value: '10', suffix: ' yrs', label: 'Warranty', description: 'Comprehensive coverage on all work', icon: 'shield' },
    { value: '200', suffix: '+', label: 'Crew Members', description: 'Dedicated in-house professionals', icon: 'briefcase' }
  ]}},
  { order: 2, type: 'aertsen-services-grid', props: { label: 'Our Expertise', title: 'Design Services', accentWord: 'Built Around You', services: [
    { number: '01', title: 'Full Home Interiors', description: 'End-to-end interior solution', link: '/services/full-home-interiors' },
    { number: '02', title: 'Modular Kitchen', description: 'Custom kitchen solutions', link: '/services/modular-kitchen' },
    { number: '03', title: 'Living Room Interiors', description: 'Statement living spaces', link: '/services/living-room-interiors' },
    { number: '04', title: 'Bedroom Interiors', description: 'Serene bedroom retreats', link: '/services/bedroom-interiors' },
    { number: '05', title: 'Wardrobe Design', description: 'Floor-to-ceiling wardrobes', link: '/services/wardrobe-design' },
    { number: '06', title: 'Luxury Furniture', description: 'Handcrafted luxury pieces', link: '/services/luxury-furniture' }
  ]}},
  { order: 3, type: 'aertsen-about-brief', props: { label: 'Who We Are', title: 'Designing Homes That', accentWord: 'Inspire', body: [
    "At Aertsen, we don't just design interiors — we craft experiences. Every space tells a story, and we're here to help you write yours.",
    "With 200+ designers, our own manufacturing facility, and a 10-year warranty, we've transformed over 1,500 homes across Hyderabad."
  ], stats: [
    { number: '1500', suffix: '+', label: 'Homes' },
    { number: '200', suffix: '+', label: 'Designers' },
    { number: '10', suffix: 'yr', label: 'Warranty' },
    { number: '4.9', suffix: '★', label: 'Rating' }
  ], images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
  ]}},
  { order: 4, type: 'aertsen-services-marquee', props: { items: [
    { title: 'Full Home Interiors', link: '/services/full-home-interiors' },
    { title: 'Modular Kitchen', link: '/services/modular-kitchen' },
    { title: 'Living Room Interiors', link: '/services/living-room-interiors' },
    { title: 'Bedroom Interiors', link: '/services/bedroom-interiors' },
    { title: 'Wardrobe Design', link: '/services/wardrobe-design' },
    { title: 'Luxury Furniture', link: '/services/luxury-furniture' }
  ]}},
  { order: 5, type: 'aertsen-why-choose', props: { label: 'Why Aertsen', title: 'The Aertsen', accentWord: 'Difference', items: [
    { number: '01', title: 'European Standards', description: 'Every product reflects European quality at Indian prices' },
    { number: '02', title: 'In-House Factory', description: 'Own manufacturing in Hyderabad' },
    { number: '03', title: 'Complete Transparency', description: 'Materials, finishes, specs documented' },
    { number: '04', title: 'Trained Designers', description: 'In-house team, no third-party' }
  ]}},
  { order: 6, type: 'aertsen-portfolio-slider', props: { label: 'Our Work', title: 'Finest Projects', accentWord: "We've Crafted", projects: [
    { title: 'Natural Perseverance', category: 'Other', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
    { title: 'Lustrous Home in The Sky', category: 'Penthouse', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
    { title: 'Euphoric Walls', category: 'Villa', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80' },
    { title: 'Modern Home Close To Nature', category: 'Apartment', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
    { title: 'Kitchens Descended From The Heavens', category: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
    { title: 'Breach The Boring!', category: 'Apartment', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80' },
    { title: 'Modern Life, Contemporary Living', category: 'Apartment', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
    { title: 'Luxury Wrapped With Gold', category: 'Villa', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }
  ]}},
  { order: 7, type: 'aertsen-process-wheel', props: { title: 'Steps to give your home an', accentWord: 'Aertsen Makeover', steps: [
    { number: '01', title: 'Design Pitch', description: 'Requirement discussion, tentative quotation, 10% onboarding', checklist: ['Requirement discussion & moodboard', 'Tentative quotation shared', 'Onboarding with 10% confirmation'] },
    { number: '02', title: 'Count on our Designers', description: '3D designs, materials finalized, sign-off', checklist: ['3D designs & layouts presented', 'Materials & finishes finalised', 'Design sign-off & timeline confirmed'] },
    { number: '03', title: 'Dreams Under Construction', description: 'Handover to execution, on-site work, progress updates', checklist: ['Project handover to execution team', 'On-site work begins', 'Milestone-based progress updates'] },
    { number: '04', title: 'Step into your Dream Home', description: 'Quality checks, walkthrough, warranty docs', checklist: ['Quality checks completed', 'Final walkthrough & handover', 'Warranty & documents handed over'] }
  ]}},
  { order: 8, type: 'aertsen-factory', props: { label: 'Our Factory', title: 'Where Craftsmanship', accentWord: 'Meets Technology', description: 'We combine traditional woodworking expertise with modern manufacturing technology.', highlights: [
    { title: 'CNC Precision', description: 'Computer-controlled cutting' },
    { title: 'European Hardware', description: 'Hettich, Hafele, Blum' },
    { title: 'Multi-Level QC', description: 'Multiple quality checks' },
    { title: '100% In-House', description: 'No outsourcing' }
  ], videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }},
  { order: 9, type: 'aertsen-google-reviews', props: { label: 'Client Reviews', title: 'Trusted by Homeowners', accentWord: 'Across Hyderabad', googleScore: '4.9', reviewCount: '150+', reviews: [
    { name: 'Priya Sharma', rating: 5, review: 'Aertsen transformed our 3BHK into an absolute dream. Professional, transparent, and delivered ahead of schedule.', location: 'Jubilee Hills' },
    { name: 'Rajesh Kumar', rating: 5, review: 'Best interior designers in Hyderabad. No hidden costs, stunning 3D renders, and the final result matched every pixel.', location: 'Banjara Hills' },
    { name: 'Anita Reddy', rating: 5, review: 'We were nervous about our first renovation. Aertsen made it stress-free and joyful. From design to handover in 78 days.', location: 'Gachibowli' },
    { name: 'Vikram Naidu', rating: 5, review: 'The modular kitchen is a masterpiece — functional and beautiful. Highly recommend Aertsen to everyone.', location: 'Kondapur' },
    { name: 'Sujatha Rao', rating: 5, review: 'Very professional team. They delivered exactly what was promised, within budget and on schedule.', location: 'HITEC City' }
  ]}},
  { order: 10, type: 'aertsen-video-testimonials', props: { label: 'Video Stories', title: 'Real Homes.', accentWord: 'Real Stories.', videos: [
    { thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', name: 'Mr. Cyril', location: 'EIPL Cornerstone, Manikonda', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quote: 'Aertsen made our dream home a reality. The attention to detail is incredible.' },
    { thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', name: 'Mr. Sai Kumar', location: 'Honer Aquantis, Gopanpally', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quote: 'Professional team, transparent pricing, and stunning results. Could not be happier.' },
    { thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', name: 'Mr. & Mrs. Vaishnavi and Rohit', location: 'GHR Titania, Serilingampalle', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quote: 'From design to handover, the experience was seamless. Our home looks magazine-worthy.' }
  ]}},
  { order: 11, type: 'aertsen-final-cta', props: { label: 'Start Your Journey', title: 'Ready to Transform', accentWord: 'Your Home?', body: 'Book a free consultation with our design experts and take the first step towards your dream home.', buttons: [
    { label: 'Book Free Consultation', url: '/contact', type: 'primary' },
    { label: 'Call 040-4189-5555', url: 'tel:040-4189-5555', type: 'phone' },
    { label: 'WhatsApp Us', url: 'https://wa.me/919030444503', type: 'whatsapp' }
  ]}},
  { order: 12, type: 'aertsen-faq', props: { label: 'Got Questions?', title: 'Frequently Asked Questions', accentWord: 'About Home Interiors', intro: 'Everything you need to know about our interior design services.', faqs: [
    { question: 'What is the cost of full home interiors in Hyderabad?', answer: 'The cost ranges from ₹8 lakhs to ₹25 lakhs depending on home size and material quality.' },
    { question: 'How long does it take to complete home interiors?', answer: 'Full home interiors take 60–90 days from design freeze to handover.' },
    { question: 'Do you provide only modular kitchen or single room interiors?', answer: 'Yes, we offer individual services like modular kitchens, living room, and bedroom design.' },
    { question: 'What makes Aertsen Living different?', answer: 'In-house manufacturing, European materials, transparent pricing, and 10-year warranty.' },
    { question: 'Do you offer customized interior designs?', answer: 'Every design is 100% customised to your lifestyle and preferences.' },
    { question: 'Can I visit your factory?', answer: 'Yes, our manufacturing facility in Hyderabad welcomes visitors.' },
    { question: 'Do you provide warranty on interiors?', answer: 'Yes, we provide a comprehensive 10-year warranty on all interiors.' }
  ]}}
];

async function main() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) { console.log('Home page not found'); process.exit(1); }
  
  await prisma.section.createMany({
    data: sections.map(s => ({
      pageId: page.id,
      type: s.type,
      order: s.order,
      props: s.props,
    }))
  });
  console.log(`Created ${sections.length} home sections`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
