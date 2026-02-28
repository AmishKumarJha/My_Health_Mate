/**
 * components/ui/Button.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable button component with three style variants:
 *   - "primary"   : Solid blue gradient with shadow (main CTAs)
 *   - "secondary" : Glass-style outline with blur (secondary actions)
 *   - "ghost"     : Thin outline border (nav login button)
 *
 * Usage:
 *   <Button variant="primary" onClick={...}>Get Started</Button>
 *   <Button variant="secondary" href="#lab">Find a Lab</Button>
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

// Variant styles map — each variant maps to a set of Tailwind classes
const VARIANTS = {
  primary: [
    "bg-gradient-to-br from-blue-600 to-blue-500",
    "text-white border-transparent",
    "shadow-[0_8px_24px_rgba(59,130,246,0.35)]",
    "hover:shadow-[0_12px_36px_rgba(59,130,246,0.45)]",
    "hover:-translate-y-0.5",
  ].join(" "),

  secondary: [
    "bg-white/80 backdrop-blur-sm",
    "border border-slate-200/80 text-slate-700",
    "hover:border-blue-300 hover:bg-white",
    "hover:-translate-y-px",
  ].join(" "),

  ghost: [
    "bg-transparent border border-blue-200",
    "text-blue-600",
    "hover:bg-blue-50 hover:border-blue-400",
  ].join(" "),

  // Outlined version for pricing cards (non-recommended plan)
  outline: [
    "bg-transparent border-2 border-blue-200",
    "text-blue-600",
    "hover:bg-blue-50",
  ].join(" "),

  // Solid version for pricing cards (recommended plan)
  solid: [
    "bg-gradient-to-r from-blue-500 to-teal-400",
    "text-white border-transparent",
    "shadow-[0_8px_24px_rgba(59,130,246,0.4)]",
    "hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)]",
  ].join(" "),

  // Large hero CTA used in the final CTA section
  hero: [
    "bg-gradient-to-r from-blue-500 to-teal-400",
    "text-white border-transparent",
    "shadow-[0_12px_40px_rgba(59,130,246,0.4)]",
    "hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]",
    "px-9 py-4 text-base",
  ].join(" "),
};

/**
 * Button
 * @param {string}   variant    - One of: primary | secondary | ghost | outline | solid | hero
 * @param {string}   className  - Extra Tailwind overrides
 * @param {string}   href       - If provided, renders as <a> instead of <button>
 * @param {React.ReactNode} children
 */
export default function Button({
  variant = "primary",
  className = "",
  href,
  onClick,
  children,
  type = "button",
}) {
  // Shared base classes for all variants
  const base = [
    "inline-flex items-center justify-center gap-2",
    "px-5 py-2.5 rounded-xl border",
    "text-sm font-medium font-sans",
    "transition-all duration-300 ease-out cursor-pointer",
    "select-none",
  ].join(" ");

  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const combined = `${base} ${variantClass} ${className}`;

  // Render as anchor tag when href is provided (for scroll links)
  if (href) {
    return (
      <a href={href} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined}>
      {children}
    </button>
  );
}
