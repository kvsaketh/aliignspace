"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonUrl?: string;
  style?: "primary" | "secondary" | "dark";
}

export function CTABlock({
  heading = "",
  subheading,
  buttonText,
  buttonUrl,
  style = "primary",
}: CTAProps) {
  const styleClasses = {
    primary: "bg-terracotta-500 text-white",
    secondary: "bg-cream-100 text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  const buttonClasses = {
    primary: "bg-white text-terracotta-600 hover:bg-gray-100",
    secondary: "bg-terracotta-500 text-white hover:bg-terracotta-600",
    dark: "bg-terracotta-500 text-white hover:bg-terracotta-600",
  };

  return (
    <section className={cn("py-20 lg:py-32", styleClasses[style])}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6">
            {heading}
          </h2>
          {subheading && (
            <p
              className={cn(
                "text-lg mb-8",
                style === "primary"
                  ? "text-white/80"
                  : style === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              )}
            >
              {subheading}
            </p>
          )}
          {buttonUrl && (
            <Link href={buttonUrl}>
              <Button
                size="lg"
                className={cn(
                  "px-8 py-6 text-lg rounded-md transition-all hover:shadow-lg",
                  buttonClasses[style]
                )}
              >
                {buttonText || "Learn More"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
