"use client";

import { useRef, useState, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
) {
  const { maxTilt = 10, perspective = 1000, scale = 1.02, glare = false } = options;
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      setTilt({ rotateX, rotateY });

      if (glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
      }
    },
    [maxTilt, glare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const style = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? scale : 1})`,
    transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  const glareStyle = glare
    ? {
        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }
    : {};

  return {
    ref,
    style,
    glareStyle,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
