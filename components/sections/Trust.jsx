/**
 * components/sections/Trust.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Trust & Security section displaying 4 compliance/security cards:
 *   - GDPR Compliant
 *   - End-to-End Encryption
 *   - Medical-Grade Analysis
 *   - No Third-Party Sharing
 *
 * Each card has:
 *   - White icon box
 *   - Title + description
 *   - Green badge pill (e.g. "✓ GDPR Certified")
 *   - Hover: background shifts to blue-50, card lifts slightly
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import Icon from "../ui/Icon";
import { trustData } from "../../data/content";

/**
 * Individual trust card
 */
function TrustCard({ icon, title, desc, badge }) {
  return (
    <div className="
      bg-slate-50 rounded-2xl p-7 text-center
      border border-slate-200/40
      transition-all duration-300 cursor-default
      hover:bg-blue-50 hover:border-blue-200 hover:-translate-y-1
    ">
      {/* ── Icon box ── */}
      <div className="
        w-14 h-14 rounded-[18px] bg-white
        border border-slate-200/50
        shadow-[0_1px_3px_rgba(15,23,42,0.06)]
        flex items-center justify-center mx-auto mb-4
      ">
        <Icon name={icon} className="w-6 h-6 stroke-blue-600" />
      </div>

      {/* ── Title ── */}
      <h3 className="text-[0.875rem] font-semibold text-slate-900 mb-2">{title}</h3>

      {/* ── Description ── */}
      <p className="text-[0.78rem] text-slate-500 leading-relaxed mb-4">{desc}</p>

      {/* ── Compliance badge pill ── */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700">
        {badge}
      </span>
    </div>
  );
}

export default function Trust() {
  return (
    <section id="trust" className="py-24 px-5 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="Trust & Security"
            title="Your health data.<br/>Your control."
            subtitle="We built MyHealthMate with privacy as a foundation, not an afterthought. Medical-grade standards, zero compromise."
          />
        </RevealWrapper>

        {/* ── 4-column trust cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustData.map((item, i) => (
            <RevealWrapper key={item.title} delay={i * 100}>
              <TrustCard {...item} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
