/**
 * components/sections/Features.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * 4-column features grid with:
 *   - Colored icon square per feature
 *   - Title, description
 *   - Stat highlight at the bottom of each card
 *   - Hover lift animation + gradient top-border reveal
 *   - Scroll-reveal stagger via RevealWrapper
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import Icon from "../ui/Icon";
import { featuresData } from "../../data/content";

/**
 * Individual feature card component
 * Separated for clarity — receives all data via props
 */
function FeatureCard({ icon, title, desc, stat, statLabel, iconBg, iconStroke }) {
  return (
    <div className="
      group relative bg-white rounded-2xl p-8
      border border-slate-200/60
      transition-all duration-400 ease-out cursor-default
      hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]
      overflow-hidden
    ">
      {/* ── Top border gradient — reveals on hover ── */}
      <div className="
        absolute top-0 left-0 right-0 h-0.5
        bg-gradient-to-r from-blue-500 to-teal-400
        scale-x-0 group-hover:scale-x-100 origin-left
        transition-transform duration-400
      " />

      {/* ── Icon square ── */}
      <div className={`w-12 h-12 rounded-[14px] ${iconBg} flex items-center justify-center mb-5`}>
        <Icon name={icon} className={`w-[22px] h-[22px] ${iconStroke}`} />
      </div>

      {/* ── Title ── */}
      <h3 className="text-[0.95rem] font-semibold text-slate-900 mb-2.5">{title}</h3>

      {/* ── Description ── */}
      <p className="text-[0.85rem] text-slate-500 leading-relaxed">{desc}</p>

      {/* ── Stat highlight ── */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <span className="font-serif text-2xl text-blue-600">{stat}</span>
        <p className="text-[0.65rem] text-slate-400 uppercase tracking-wider mt-0.5">{statLabel}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 px-5 md:px-8 bg-slate-50/80">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="What We Offer"
            title="Health intelligence,<br/><em style='font-style:italic'>reimagined</em>"
            subtitle="A complete platform for understanding, tracking, and optimizing your biology — powered by AI and clinical-grade analysis."
          />
        </RevealWrapper>

        {/* ── 4-column features grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, i) => (
            // Each card staggered by 100ms * index
            <RevealWrapper key={feature.id} delay={i * 100}>
              <FeatureCard {...feature} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
