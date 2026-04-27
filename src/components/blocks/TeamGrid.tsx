"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

interface TeamGridProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  columns?: 2 | 3 | 4;
}

const defaultMembers: TeamMember[] = [
  {
    name: "Ar. Samhitha Nagasamudra",
    role: "Founder & Principal Architect",
    bio: "With a passion for sustainable design and attention to detail, Samhitha leads our creative vision.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Ar. Murali",
    role: "Co-founder & Design Director",
    bio: "Murali brings strategic thinking and innovative solutions to every project we undertake.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Priya Reddy",
    role: "Senior Interior Designer",
    bio: "Specializing in contemporary residential interiors with 8+ years of experience.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Vikram Sharma",
    role: "Project Manager",
    bio: "Ensuring timely delivery and seamless execution of every project from start to finish.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export function TeamGrid({
  title = "Meet Our Team",
  subtitle = "The creative minds behind every beautiful space",
  members = defaultMembers,
  columns = 4,
}: TeamGridProps) {
  const columnClasses = {
    2: "sm:grid-cols-2 max-w-3xl mx-auto",
    3: "sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] mb-4 block">
              Our People
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="font-sans text-lg text-stone-600">{subtitle}</p>
            )}
          </div>
        </Reveal>

        {/* Team Grid */}
        <div className={`grid ${columnClasses[columns]} gap-8 lg:gap-10`}>
          {members?.map((member, index) => (
            <Reveal key={index} direction="up" delay={index * 100}>
              <div className="text-center group">
                {/* Image Container */}
                {member.image ? (
                  <div className="relative aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[280px] border-4 border-[#F9F5ED] group-hover:border-[#D46546]/20 transition-colors duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[280px] bg-[#F9F5ED] flex items-center justify-center">
                    <span className="font-serif text-5xl text-[#D46546]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Info */}
                <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-1">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-[#D46546] font-medium mb-3 uppercase tracking-wider">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                )}

                {/* Social Links */}
                {member.social && (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#F9F5ED] flex items-center justify-center text-stone-600 hover:bg-[#D46546] hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#F9F5ED] flex items-center justify-center text-stone-600 hover:bg-[#D46546] hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 rounded-full bg-[#F9F5ED] flex items-center justify-center text-stone-600 hover:bg-[#D46546] hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
