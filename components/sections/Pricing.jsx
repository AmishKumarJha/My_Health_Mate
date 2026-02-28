/**
 * components/sections/Pricing.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two-tier pricing section:
 *   - Discovery (basic)  — white card with outline button
 *   - Care (recommended) — dark gradient card with "Recommended" badge
 *
 * Features:
 *   - Included vs. excluded feature rows with check/x icons
 *   - Highlighted recommended card with blue ring
 *   - Hover lift effect on both cards
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import { pricingData } from "../../data/content";

/**
 * Single pricing card
 * @param {object} plan - From pricingData array
 */
function PriceCard({ plan }) {
  const isRecommended = plan.recommended;

  return (
    <div
      className={[
        "relative rounded-[28px] p-10 overflow-hidden",
        "transition-all duration-400 ease-out",
        "hover:-translate-y-1.5",
        // Recommended card: dark gradient + blue glow
        isRecommended
          ? "bg-gradient-to-br from-slate-900 to-[#1a2744] shadow-[0_20px_60px_rgba(59,130,246,0.25)] hover:shadow-[0_28px_80px_rgba(59,130,246,0.35)] border border-blue-800/30"
          : "bg-white border border-slate-200/60 shadow-[0_4px_16px_rgba(15,23,42,0.07)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]",
      ].join(" ")}
    >
      {/* ── "Recommended" badge (only on Care plan) ── */}
      {isRecommended && (
        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-[0.62rem] font-bold uppercase tracking-widest">
          Recommended
        </div>
      )}

      {/* ── Plan name ── */}
      <p className={`text-[0.75rem] font-semibold uppercase tracking-widest mb-3 ${isRecommended ? "text-white/50" : "text-slate-500"}`}>
        {plan.name}
      </p>

      {/* ── Price ── */}
      <div className="mb-4">
        <span className={`font-serif text-[2.8rem] leading-none ${isRecommended ? "text-white" : "text-slate-900"}`}>
          {plan.price}
        </span>
        <span className={`text-base ml-1 ${isRecommended ? "text-white/50" : "text-slate-400"}`}>
          {plan.period}
        </span>
      </div>

      {/* ── Plan description ── */}
      <p className={`text-[0.85rem] leading-relaxed mb-8 ${isRecommended ? "text-white/60" : "text-slate-500"}`}>
        {plan.desc}
      </p>

      {/* ── Feature list ── */}
      <ul className="space-y-3 mb-10 list-none p-0">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-[0.875rem]">
            {/* Check or X icon */}
            <span className={f.included ? (isRecommended ? "text-teal-400" : "text-emerald-500") : "text-slate-300"}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d={f.included ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </span>
            {/* Feature text */}
            <span className={f.included
              ? (isRecommended ? "text-white/85" : "text-slate-700")
              : "text-slate-400"
            }>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* ── CTA button ── */}
      <button
        className={[
          "w-full py-3.5 rounded-xl text-[0.9rem] font-semibold cursor-pointer transition-all duration-200",
          isRecommended
            ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-[0_8px_24px_rgba(59,130,246,0.4)] hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)]"
            : "bg-transparent border-2 border-blue-200 text-blue-600 hover:bg-blue-50",
        ].join(" ")}
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-5 md:px-8 bg-slate-50/80">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="Pricing"
            title="Invest in your most<br/>important asset"
            subtitle="Transparent pricing. No hidden fees. Cancel anytime."
          />
        </RevealWrapper>

        {/* ── 2-column pricing grid — centered on page ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingData.map((plan, i) => (
            <RevealWrapper key={plan.name} delay={i * 150}>
              <PriceCard plan={plan} />
            </RevealWrapper>
          ))}
        </div>

        {/* ── Below-pricing trust note ── */}
        <RevealWrapper delay={300}>
          <p className="text-center text-[0.8rem] text-slate-400 mt-8">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
