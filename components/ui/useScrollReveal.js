/**
 * components/ui/useScrollReveal.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom React hook that uses the IntersectionObserver API to detect when
 * an element enters the viewport, then triggers a CSS class that animates it.
 *
 * Usage:
 *   const { ref, inView } = useScrollReveal({ threshold: 0.15, delay: 200 });
 *   <div ref={ref} className={inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}>
 *     ...
 *   </div>
 *
 * Options:
 *   threshold  {number}  - How much of the element must be visible (0–1)
 *   delay      {number}  - Milliseconds before the reveal triggers
 *   once       {boolean} - If true (default), animation only plays once
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useRef, useState } from "react";

export default function useScrollReveal({
  threshold = 0.12,
  delay = 0,
  once = true,
} = {}) {
  // ref to attach to the DOM element we want to observe
  const ref = useRef(null);

  // inView tracks whether the element is currently in the viewport
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a delay if specified, then set inView = true
            setTimeout(() => setInView(true), delay);
            // If once=true, stop observing after first trigger
            if (once) observer.unobserve(el);
          } else if (!once) {
            // Reset animation when element leaves viewport (if once=false)
            setInView(false);
          }
        });
      },
      {
        threshold,
        // Shrink the root margin so animation fires slightly before element
        // reaches the exact threshold — feels more natural
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    // Cleanup observer when component unmounts
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return { ref, inView };
}
