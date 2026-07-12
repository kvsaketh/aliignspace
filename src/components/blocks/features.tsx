"use client";

import { cn } from "@/lib/utils";
import { Home, Paintbrush, Ruler, Shield, Clock, Heart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  paintbrush: Paintbrush,
  ruler: Ruler,
  shield: Shield,
  clock: Clock,
  heart: Heart,
};

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export function FeaturesBlock({ title = "", subtitle, features = [] }: FeaturesProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
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

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => {
            const IconComponent = feature.icon
              ? iconMap[feature.icon] || Home
              : Home;

            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-cream-50 hover:bg-terracotta-50 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center mb-6 group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-medium text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
