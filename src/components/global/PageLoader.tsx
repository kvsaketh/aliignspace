"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#F6F5FB" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo text */}
          <motion.h1
            className="font-serif text-4xl md:text-5xl tracking-[0.25em] text-[#16141f]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Aliignspace
          </motion.h1>

          {/* Animated horizontal line */}
          <motion.div
            className="mt-6 h-[2px] rounded-full"
            style={{ backgroundColor: "#6D28D9" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Subtle tagline */}
          <motion.p
            className="mt-5 font-sans text-xs tracking-[0.3em] uppercase text-[#16141f]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Interior Design Studio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
