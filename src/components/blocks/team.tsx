"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

interface TeamProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

export function TeamBlock({ title = "", subtitle, members = [] }: TeamProps) {
  return (
    <section className="py-20 lg:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members?.map((member, index) => (
            <div key={index} className="text-center group">
              {member.image && (
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 mx-auto max-w-[280px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="text-xl font-serif font-medium text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-terracotta-500 font-medium mb-3">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
