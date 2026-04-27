"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Service {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Residential Interiors",
    description: "Complete home transformation — from concept to keys. Apartments, villas & independent homes.",
    link: "/services/residential",
  },
  {
    title: "Modular Kitchen",
    description: "Precision-engineered kitchens that blend beauty with function. Every inch optimised.",
    link: "/services/kitchen",
  },
  {
    title: "Living & Dining",
    description: "Curated living spaces that reflect your personality and invite warmth.",
    link: "/services/living",
  },
  {
    title: "Bedroom Design",
    description: "Serene, personal sanctuaries designed for rest, comfort and self-expression.",
    link: "/services/bedroom",
  },
  {
    title: "Commercial Spaces",
    description: "Offices, showrooms & studios that make a lasting first impression.",
    link: "/services/commercial",
  },
  {
    title: "Turnkey Projects",
    description: "End-to-end interior execution — one team, zero hassle, total accountability.",
    link: "/services/turnkey",
  },
];

export function ServicesBlock({
  title = "What We Design",
  subtitle = "Our Services",
  services = defaultServices,
}: ServicesProps) {
  return (
    <section className="py-20 lg:py-32 bg-[#1C1917]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="fade">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              {subtitle}
            </span>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service, index) => (
            <Reveal key={index} direction="up" delay={index * 60}>
              <div className="group relative overflow-hidden bg-[#1C1917] aspect-[4/3]">
                {/* Background image or gradient placeholder */}
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
                )}

                {/* Base dark overlay */}
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />

                {/* Content — slides up on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-white/70 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 mb-4">
                      {service.description}
                    </p>
                    {service.link && (
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#D46546] hover:text-[#e3876a] transition-colors"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D46546] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
