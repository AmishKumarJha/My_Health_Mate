/**
 * components/sections/HowItWorks.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * 3-step timeline section showing the user journey:
 *   1. Book Your Test
 *   2. Analyze Biomarkers
 *   3. Get Your Plan
 *
 * Features:
 *   - Horizontal gradient connector line between steps (hidden on mobile)
 *   - Step number badge overlaid on each icon circle
 *   - Hover scale on each step circle
 *   - Staggered scroll-reveal animation
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import Icon from "../ui/Icon";
import { stepsData } from "../../data/content";

/**
 * Single step card
 * @param {object} step  - { num, title, desc, icon }
 * @param {number} total - Total number of steps (for connector line logic)
 */
function Step({ step }) {
  return (
    <div className="flex-1 flex flex-col items-center text-center px-6 relative z-10 group">
      {/* ── Icon circle with step number badge ── */}
      <div className="relative mb-6">
        {/* Outer circle */}
        <div className="
          w-20 h-20 rounded-full bg-white border-2 border-blue-200
          flex items-center justify-center
          shadow-[0_4px_16px_rgba(15,23,42,0.08)]
          transition-all duration-300
          group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)]
          group-hover:border-blue-400
        ">
          <Icon name={step.icon} className="w-8 h-8 stroke-blue-600" />
        </div>

        {/* Step number badge — top-right corner */}
        <div className="
          absolute -top-1.5 -right-1.5
          w-6 h-6 rounded-full
          bg-gradient-to-br from-blue-600 to-blue-500
          flex items-center justify-center
          text-white text-[0.65rem] font-bold
          border-2 border-white
          shadow-[0_2px_8px_rgba(59,130,246,0.4)]
        ">
          {step.num}
        </div>
      </div>

      {/* ── Step title ── */}
      <h3 className="text-[1.05rem] font-semibold text-slate-900 mb-2">{step.title}</h3>

      {/* ── Step description ── */}
      <p className="text-[0.875rem] text-slate-500 leading-relaxed max-w-[220px]">{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-5 md:px-8 bg-slate-50/80">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="The Process"
            title="Three steps to knowing<br/>your body completely"
            subtitle="From your first test to ongoing optimization — a simple journey to better health."
          />
        </RevealWrapper>

        {/* ── Steps container (relative so connector line can position absolutely) ── */}
        <RevealWrapper delay={100}>
          <div className="relative flex flex-col md:flex-row items-start gap-10 md:gap-0">

            {/* ── Horizontal connector line (desktop only) ── */}
            {/* Positioned to run through the middle of each step icon circle */}
            <div className="
              hidden md:block
              absolute top-10
              left-[calc(16.666%)] right-[calc(16.666%)]
              h-0.5
              bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400
              z-0
            " />

            {/* ── Render each step ── */}
            {stepsData.map((step, i) => (
              <Step key={step.num} step={step} index={i} />
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
