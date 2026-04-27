"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticButton<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const pull = (radius - distance) / radius;
        setPosition({
          x: distanceX * strength * pull,
          y: distanceY * strength * pull,
        });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 ? "transform 0.3s ease-out" : "transform 0.1s ease-out",
  };

  return {
    ref,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
