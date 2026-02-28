/**
 * components/sections/Stories.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Case studies / results section showing real health transformation stories.
 * Each card shows a 3-step narrative:
 *   Detected → Recommendation → Result
 *
 * Visual design:
 *   - White header with tag + title
 *   - Body with colored step icons and step text
 *   - Result pill at the bottom
 *   - Hover lift with shadow
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import { storiesData } from "../../data/content";

// ── Step icon SVG paths ────────────────────────────────────────────────────
// These map to the 3 step types: detect / reco / result
const STEP_ICONS = {
  detect: {
    bg: "bg-red-100",
    stroke: "stroke-red-500",
    path: "M21 21l-4.35-4.35m0 0A7 7 0 1016.65 16.65z",
  },
  reco: {
    bg: "bg-blue-100",
    stroke: "stroke-blue-600",
    path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  result: {
    bg: "bg-emerald-100",
    stroke: "stroke-emerald-600",
    path: "M5 13l4 4L19 7",
  },
};

/**
 * Single story card
 * @param {object} story - From storiesData array
 */
function StoryCard({ story }) {
  return (
    <div className="
      bg-slate-50 rounded-2xl overflow-hidden
      border border-slate-200/50
      transition-all duration-400 ease-out
      hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]
    ">
      {/* ── Card header — tag + title ── */}
      <div className="bg-white px-6 py-5 border-b border-slate-200/40">
        <span className={`inline-block px-2.5 py-1 rounded-full text-[0.62rem] font-bold uppercase tracking-widest mb-3 ${story.tagStyle}`}>
          {story.tag}
        </span>
        <h3 className="text-[0.9rem] font-semibold text-slate-900 leading-snug">{story.title}</h3>
      </div>

      {/* ── Card body — 3-step story flow ── */}
      <div className="px-6 py-5 flex flex-col gap-4">
        {story.steps.map((step) => {
          const icon = STEP_ICONS[step.type];
          return (
            <div key={step.type} className="flex items-start gap-3">
              {/* Step icon */}
              <div className={`w-7 h-7 ${icon.bg} rounded-lg shrink-0 flex items-center justify-center mt-0.5`}>
                <svg className={`w-3.5 h-3.5 ${icon.stroke}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d={icon.path} />
                </svg>
              </div>
              {/* Step text */}
              <div>
                <p className="text-[0.65rem] text-slate-400 uppercase tracking-widest font-medium mb-0.5">{step.label}</p>
                <p className="text-[0.83rem] font-semibold text-slate-700 leading-snug">{step.text}</p>
              </div>
            </div>
          );
        })}

        {/* ── Outcome pill ── */}
        <div className="mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[0.72rem] font-semibold text-emerald-700">
            {story.pill}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  return (
    <section id="stories" className="py-24 px-5 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="Real Results"
            title="From insight to transformation"
            subtitle="See how MyHealthMate members identified hidden health risks and made lasting improvements to their wellbeing."
          />
        </RevealWrapper>

        {/* ── 3-column story cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storiesData.map((story, i) => (
            <RevealWrapper key={story.tag} delay={i * 120}>
              <StoryCard story={story} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
