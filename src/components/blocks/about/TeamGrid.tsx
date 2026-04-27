"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface TeamGridProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

export function TeamGrid({
  title = "Meet Our Team",
  subtitle = "The creative minds behind every beautiful space",
  members = [
    { name: "Ar. Samhitha Nagasamudra", role: "Founder & Principal Designer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Design Team", role: "Interior Architects", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
    { name: "Project Managers", role: "Execution Specialists", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" },
  ],
}: TeamGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1917] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            {title}
          </motion.h2>
          <motion.p
            className="font-sans text-stone-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="relative h-[350px] overflow-hidden rounded-sm mb-4">
                <Image
                  src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">{member.name}</h3>
              <p className="font-sans text-sm text-terracotta-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
