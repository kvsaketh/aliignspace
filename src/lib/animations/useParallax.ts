"use client";

import { useEffect, useState } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "vertical" } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setOffset(scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const style =
    direction === "vertical"
      ? { transform: `translateY(${offset}px)` }
      : { transform: `translateX(${offset}px)` };

  return { offset, style };
}
