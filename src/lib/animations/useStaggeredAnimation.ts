"use client";

import { useEffect, useState, useRef } from "react";

interface StaggeredOptions {
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
}

export function useStaggeredAnimation(
  itemCount: number,
  options: StaggeredOptions = {}
) {
  const { staggerDelay = 100, initialDelay = 0, threshold = 0.1 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);

          // Trigger items one by one with stagger
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, initialDelay + i * staggerDelay);
          }

          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, staggerDelay, initialDelay, threshold, hasTriggered]);

  const getItemStyle = (index: number) => ({
    opacity: visibleItems[index] ? 1 : 0,
    transform: visibleItems[index] ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`,
  });

  return { containerRef, visibleItems, getItemStyle };
}
