/**
 * components/ui/RevealWrapper.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps any child in a scroll-reveal animation.
 * Applies a fade-up transition when the element enters the viewport.
 *
 * Props:
 *   delay     {number}  - Milliseconds to wait before triggering (stagger use)
 *   className {string}  - Extra classes on the wrapper div
 *   children  {node}    - Content to animate
 *
 * Usage:
 *   <RevealWrapper delay={200}>
 *     <FeatureCard ... />
 *   </RevealWrapper>
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import useScrollReveal from "./useScrollReveal";

export default function RevealWrapper({ children, delay = 0, className = "" }) {
  const { ref, inView } = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      className={[
        // Base transition — always applied
        "transition-all duration-700 ease-out",
        // Start state: invisible, shifted down 28px
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
