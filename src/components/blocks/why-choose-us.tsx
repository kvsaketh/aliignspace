"use client";

import Image from "next/image";
import {
  Hammer,
  Eye,
  Award,
  ShieldCheck,
  Wallet,
  Clock,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  quote?: string;
  quoteAuthor?: string;
  founderImage?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hammer: Hammer,
  eye: Eye,
  award: Award,
  shield: ShieldCheck,
  check: CheckCircle2,
  wallet: Wallet,
  clock: Clock,
  lightbulb: Lightbulb,
};

const defaultFeatures: Feature[] = [
  {
    icon: "hammer",
    title: "Interior Fit Out",
    description: "Complete interior solutions from concept to completion with expert craftsmanship.",
  },
  {
    icon: "eye",
    title: "Site Supervision",
    description: "Dedicated project managers ensuring quality at every step of execution.",
  },
  {
    icon: "award",
    title: "Quality of Finish",
    description: "Premium materials and meticulous attention to detail in every corner.",
  },
  {
    icon: "check",
    title: "Design Supervision",
    description: "Expert architects overseeing every aspect of your project.",
  },
  {
    icon: "shield",
    title: "Reliability",
    description: "Trusted by 500+ families for delivering what we promise, every time.",
  },
  {
    icon: "wallet",
    title: "Control of Cost",
    description: "Transparent pricing with no hidden costs. Stay within your budget.",
  },
  {
    icon: "clock",
    title: "Timely Delivery",
    description: "We respect deadlines — 60 to 90 day guaranteed project delivery.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description: "Creative solutions tailored to your unique needs and lifestyle.",
  },
];

export function WhyChooseUsBlock({
  title = "Why ALIIGNSPACE?",
  subtitle = "Spaces Crafted with Trust",
  features = defaultFeatures,
  quote = "Every home we design is a promise — of quality, honesty and care. We don't take shortcuts and we don't disappear after handover.",
  quoteAuthor = "Ar. Murali, Co-founder",
  founderImage,
}: WhyChooseUsProps) {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2">

        {/* Left — Dark panel */}
        <div className="bg-[#1C1917] px-8 sm:px-12 lg:px-16 py-20 lg:py-32 flex flex-col justify-between">
          <div>
            <Reveal direction="left">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-6">
                {subtitle}
              </span>
            </Reveal>

            <Reveal direction="left" delay={80}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight mb-10">
                {title}
              </h2>
            </Reveal>

            {/* Quote block */}
            <Reveal direction="left" delay={160}>
              <blockquote className="border-l-4 border-[#D46546] pl-6">
                <p className="font-serif text-lg italic text-white/70 leading-relaxed mb-4">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="font-sans text-sm text-stone-400">
                  — {quoteAuthor}
                </footer>
              </blockquote>
            </Reveal>
          </div>

          {/* Founder image */}
          {founderImage && (
            <Reveal direction="left" delay={240}>
              <div className="mt-12 relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#D46546]/50">
                <Image
                  src={founderImage}
                  alt={quoteAuthor}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Right — Cream grid */}
        <div className="bg-[#F9F5ED] px-8 sm:px-10 lg:px-12 py-20 lg:py-32">
          <div className="grid grid-cols-2 gap-px bg-stone-200">
            {features.slice(0, 8).map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? CheckCircle2;
              return (
                <Reveal key={index} direction="up" delay={index * 60}>
                  <div className="bg-[#F9F5ED] p-6 sm:p-7 group hover:bg-white transition-colors duration-300">
                    {/* Icon square */}
                    <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center mb-4 group-hover:bg-[#D46546] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#D46546] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-serif text-base font-medium text-[#1C1917] mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
