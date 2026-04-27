"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "./useInView";

interface CountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp(options: CountUpOptions) {
  const {
    start = 0,
    end,
    duration = 2000,
    delay = 0,
    decimals = 0,
    suffix = "",
    prefix = "",
  } = options;

  const [count, setCount] = useState(start);
  const { ref, isInView } = useInView<HTMLSpanElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now() + delay;
    const diff = end - start;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = start + diff * easeOutExpo;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, start, end, duration, delay, decimals]);

  const formattedCount = `${prefix}${count.toLocaleString()}${suffix}`;

  return { ref, count, formattedCount };
}
