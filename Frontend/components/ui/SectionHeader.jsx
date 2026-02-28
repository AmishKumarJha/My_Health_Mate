/**
 * components/ui/SectionHeader.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable header block used at the top of every landing section.
 * Contains:
 *   - Small uppercase badge (e.g. "What We Offer")
 *   - Large serif headline
 *   - Muted subtext paragraph
 *
 * Props:
 *   badge     {string}  - Small pill label above the title
 *   title     {string}  - Main section headline (can contain <br /> via HTML)
 *   subtitle  {string}  - Supporting paragraph
 *   align     {string}  - "center" (default) or "left"
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

export default function SectionHeader({ badge, title, subtitle, align = "center" }) {
  const isCenter = align === "center";

  return (
    <div className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      {/* ── Small badge pill ── */}
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 mb-5">
          {badge}
        </span>
      )}

      {/* ── Main headline — uses DM Serif Display via CSS variable ── */}
      <h2
        className={`font-serif text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight mb-4 ${
          isCenter ? "mx-auto" : ""
        }`}
        /* dangerouslySetInnerHTML lets us pass simple <br /> tags from data */
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* ── Subtitle / supporting copy ── */}
      {subtitle && (
        <p className={`text-slate-500 text-base leading-relaxed max-w-xl ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
