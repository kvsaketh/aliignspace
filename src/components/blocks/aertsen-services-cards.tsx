"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  image?: string;
  link?: string;
  features?: string[];
}

interface Props {
  services?: Service[];
}

export function AertsenServicesCards({
  services = [
    {
      title: "Residential Interiors",
      description: "Transform your house into a home with personalized designs that reflect your personality and lifestyle.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      link: "/services/residential",
      features: ["Custom Furniture", "Space Planning", "3D Visualization"],
    },
    {
      title: "Commercial Spaces",
      description: "Create workplaces that inspire productivity and leave lasting impressions on clients and employees.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      link: "/services/commercial",
      features: ["Office Design", "Retail Spaces", "Hospitality"],
    },
    {
      title: "Renovation & Remodeling",
      description: "Breathe new life into existing spaces with strategic renovations that maximize value and appeal.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      link: "/services/renovation",
      features: ["Structural Updates", "Modern Upgrades", "Value Engineering"],
    },
    {
      title: "Modular Kitchens",
      description: "Design the heart of your home with smart, efficient kitchen solutions tailored to how you cook and live.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      link: "/services/kitchen",
      features: ["Ergonomic Layouts", "Premium Finishes", "Smart Storage"],
    },
    {
      title: "Furniture Design",
      description: "Custom furniture pieces crafted to fit your space perfectly, combining artistry with functionality.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      link: "/services/furniture",
      features: ["Bespoke Designs", "Premium Materials", "Craftsmanship"],
    },
    {
      title: "Project Management",
      description: "End-to-end project execution with dedicated managers ensuring quality, timelines, and budgets.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
      link: "/services/project-management",
      features: ["Timeline Control", "Vendor Management", "Quality Assurance"],
    },
  ],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-[16px] overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300"
              style={{ transform: "translateY(0)" }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1612] mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-base text-stone-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.features.map((feature, fi) => (
                      <span
                        key={fi}
                        className="px-3 py-1 text-xs font-sans font-medium rounded-full"
                        style={{ backgroundColor: "rgb(250,202,194)", color: "#1A1612" }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {service.link && (
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#D46546] group/link"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AertsenServicesCards;
