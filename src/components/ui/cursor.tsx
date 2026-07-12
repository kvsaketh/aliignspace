"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor
 *
 * Renders two DOM nodes (.cursor-dot and .cursor-ring) that follow the
 * pointer. Styled via globals.css. Only active on `pointer: fine` devices
 * (i.e. real mouse / trackpad — not touch screens).
 *
 * Mount this once inside RootLayout (client boundary) so the cursor is
 * available site-wide without affecting RSC streaming.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf: number;
    // Ring lags slightly behind for a fluid feel
    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      // Lerp ring towards mouse position
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animateRing);
    };

    const onMouseEnterInteractive = () => {
      dot.classList.add("cursor-hover");
      ring.classList.add("cursor-hover");
    };

    const onMouseLeaveInteractive = () => {
      dot.classList.remove("cursor-hover");
      ring.classList.remove("cursor-hover");
    };

    // Attach hover class when over any interactive element
    const attachHoverListeners = () => {
      const interactiveEls = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], label, select, input, textarea"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animateRing);
    attachHoverListeners();

    // Re-attach when DOM changes (e.g. drawers mounting)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
