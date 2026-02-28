/**
 * components/sections/Hero.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-height hero section with:
 *   - Animated gradient background blobs
 *   - Left: headline, subtext, CTA buttons, social proof avatars
 *   - Right: floating dashboard card mockup with Chart.js line chart
 *   - Floating notification + biological age widget cards
 *
 * Chart.js is initialized via useEffect after mount (client-only).
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { heroData } from "../../data/content";

// ── Avatar placeholder helper ───────────────────────────────────────────────
function Avatar({ initials, gradient }) {
  return (
    <div
      className={`w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[0.55rem] font-bold text-white ${gradient}`}
    >
      {initials}
    </div>
  );
}

// ── Trend color helper ───────────────────────────────────────────────────────
function trendColor(type) {
  if (type === "up")   return "text-emerald-500";
  if (type === "warn") return "text-amber-500";
  return "text-rose-400";
}

// ── Status tag helper ────────────────────────────────────────────────────────
const TAG_STYLES = {
  "Heart Health":  "bg-emerald-50 text-emerald-700",
  Thyroid:         "bg-blue-50 text-blue-700",
  "Sleep Quality": "bg-amber-50 text-amber-700",
};

export default function Hero() {
  const chartRef = useRef(null);    // canvas element ref
  const chartInstance = useRef(null); // store chart instance for cleanup

  // Hero content fade-in on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ── Initialize Chart.js spark line chart ──────────────────────────────────
  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    import("chart.js/auto").then(({ default: Chart }) => {
      if (!chartRef.current) return;

      // Destroy previous chart instance if re-mounting
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");

      // Create gradient fill under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, 80);
      gradient.addColorStop(0, "rgba(59,130,246,0.18)");
      gradient.addColorStop(1, "rgba(59,130,246,0)");

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Health Score",
              data: [72, 75, 73, 79, 83, 87],
              borderColor: "#3B82F6",
              backgroundColor: gradient,
              fill: true,
              tension: 0.5,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
            },
            {
              // Dashed baseline reference line
              label: "Baseline",
              data: [70, 70, 70, 70, 70, 70],
              borderColor: "rgba(148,163,184,0.35)",
              borderDash: [4, 4],
              fill: false,
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: { display: false },
            y: { display: false, min: 60, max: 95 },
          },
        },
      });
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-[68px]"
    >
      {/* ── Animated gradient background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-blue-100/40 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute bottom-0 right-10 w-[40%] h-[50%] bg-gradient-radial from-emerald-100/30 via-transparent to-transparent" />
        <div className="absolute top-20 left-0 w-[30%] h-[40%] bg-gradient-radial from-teal-100/25 via-transparent to-transparent" />
      </div>

      {/* ── Page grid layout ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ═══════════════════════════════════════════════════════════════════
            LEFT COLUMN — Headline, subtext, CTAs, social proof
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Live badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100/80 text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {heroData.badge}
          </div>

          {/* Main headline — large serif font */}
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-slate-900 mb-5">
            {heroData.headline[0]}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
              {heroData.headline[1]}
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[460px] mb-10">
            {heroData.subtext}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="primary" href="#" className="px-7 py-3.5 text-[0.95rem]">
              {/* Download arrow icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v10M12 12l-4-4M12 12l4-4M5 17h14a2 2 0 010 4H5a2 2 0 010-4z" />
              </svg>
              {heroData.cta.primary}
            </Button>
            <Button variant="secondary" href="#" className="px-7 py-3.5 text-[0.95rem]">
              {/* Clock icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l3 3" />
              </svg>
              {heroData.cta.secondary}
            </Button>
          </div>

          {/* Social proof — avatars + text */}
          <div className="flex items-center gap-4">
            {/* Stacked avatars */}
            <div className="flex items-center">
              <Avatar initials="JK" gradient="bg-gradient-to-br from-blue-400 to-blue-500" />
              <Avatar initials="ML" gradient="bg-gradient-to-br from-emerald-500 to-teal-400" />
              <Avatar initials="SO" gradient="bg-gradient-to-br from-violet-500 to-indigo-400" />
              <Avatar initials="+4k" gradient="bg-gradient-to-br from-amber-400 to-orange-400" />
            </div>
            <div c
            
            lassName="text-xs text-slate-500 leading-relaxed">
              Trusted by <span className="font-semibold text-slate-700">{heroData.socialProof.count}</span> health-conscious individuals
              <br />
              <span className="font-semibold text-slate-700">{heroData.socialProof.stat}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            RIGHT COLUMN — Floating dashboard card mockup
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative flex items-center justify-center lg:justify-end">

          {/* ── Floating notification card (top-right of dashboard) ── */}
          <div className="absolute -top-4 -right-2 md:right-0 z-20 bg-white rounded-2xl px-3.5 py-2.5 shadow-[0_16px_48px_rgba(15,23,42,0.12)] border border-slate-200/50 flex items-center gap-2.5 animate-float-1 whitespace-nowrap">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-content-center shrink-0">
              <svg className="w-3.5 h-3.5 m-auto" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold text-slate-800">Vitamin D Optimized</p>
              <p className="text-[0.62rem] text-slate-400">Levels improved 23% this month</p>
            </div>
          </div>

          {/* ── Main dashboard card ── */}
          <div className="w-full max-w-[480px] bg-white/85 backdrop-blur-[20px] border border-slate-200/50 rounded-[28px] shadow-[0_32px_80px_rgba(15,23,42,0.16)] p-6 animate-float-card">

            {/* Card header — user info + health score */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-400 to-teal-400" />
                <div>
                  <p className="text-[0.82rem] font-semibold text-slate-800 leading-none mb-0.5">Alexandra M.</p>
                  <p className="text-[0.68rem] text-slate-400">Last sync: 2h ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif text-[1.7rem] leading-none text-emerald-500 font-bold">87</p>
                <p className="text-[0.65rem] text-slate-400">Health Score</p>
              </div>
            </div>

            {/* Metric chips grid */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {heroData.metrics.map((m) => (
                <div key={m.label} className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/40">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-slate-400 mb-1">{m.label}</p>
                  <p className="text-[0.95rem] font-bold text-slate-800">
                    {m.value} <span className="text-[0.55rem] font-normal text-slate-400">{m.unit}</span>
                  </p>
                  <p className={`text-[0.58rem] mt-0.5 font-medium ${trendColor(m.trendType)}`}>{m.trend}</p>
                </div>
              ))}
            </div>

            {/* Chart.js sparkline */}
            <div className="relative h-20 mb-5">
              <canvas ref={chartRef} />
            </div>

            {/* Progress bar set */}
            <div className="flex gap-2 mb-5">
              {heroData.bars.map((b) => (
                <div key={b.label} className="flex-1">
                  <p className="text-[0.58rem] text-slate-500 text-center mb-1">{b.label}</p>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Status tags */}
            <div className="flex flex-wrap gap-1.5">
              {heroData.statusTags.map((tag) => (
                <span key={tag} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.62rem] font-semibold ${TAG_STYLES[tag]}`}>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Floating biological age card (bottom-left) ── */}
          <div className="absolute -bottom-2 -left-4 md:-left-8 z-20 bg-white rounded-2xl px-4 py-3 shadow-[0_16px_48px_rgba(15,23,42,0.12)] border border-slate-200/50 animate-float-2">
            <p className="text-[0.6rem] text-slate-400 uppercase tracking-wide mb-0.5">Biological Age</p>
            <p className="font-serif text-[2rem] leading-none text-emerald-500 font-bold">31</p>
            <p className="text-[0.6rem] text-slate-400">
              Real age: <span className="line-through text-rose-400">35</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
