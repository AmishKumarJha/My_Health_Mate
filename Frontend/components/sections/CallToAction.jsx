/**
 * components/sections/CallToAction.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-width dark CTA section at the bottom of the page.
 *
 * Design:
 *   - Deep slate background with blue radial glow
 *   - Large serif headline with italic teal accent
 *   - Supporting copy + large gradient CTA button
 *   - Three trust dot points below the button
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import RevealWrapper from "../ui/RevealWrapper";

export default function CallToAction() {
  return (
    <section
      id="cta"
      className="relative py-32 px-5 md:px-8 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1a2744 50%, #0F172A 100%)",
      }}
    >
      {/* ── Blue radial glow in center ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <RevealWrapper>
          {/* Pre-headline label */}
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-white/40 mb-6">
            The future of health is preventive
          </p>

          {/* Main CTA headline */}
          <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight tracking-tight mb-5">
            Your body already
            <br />
            {/* Italic teal accent — the memorable line */}
            <em className="italic text-teal-400">has the answers.</em>
          </h2>

          {/* Supporting copy */}
          <p className="text-white/55 text-base leading-relaxed max-w-[380px] mx-auto mb-10">
            Stop waiting for symptoms. Start optimizing your health today with personalized AI-driven insights.
          </p>

          {/* ── Large gradient CTA button ── */}
          <a
            href="#"
            className="
              inline-flex items-center gap-3
              px-9 py-4 rounded-[18px]
              bg-gradient-to-r from-blue-500 to-teal-400
              text-white text-base font-semibold
              shadow-[0_12px_40px_rgba(59,130,246,0.4)]
              transition-all duration-400 ease-out
              hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.5)]
              no-underline
            "
          >
            {/* Play icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Your Health Journey
          </a>

          {/* ── Trust dot points ── */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            {["No commitment required", "Results in 48 hours", "Cancel anytime"].map((point) => (
              <span key={point} className="flex items-center gap-2 text-[0.78rem] text-white/40">
                {/* Teal dot */}
                <span className="w-1 h-1 rounded-full bg-teal-400" />
                {point}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
