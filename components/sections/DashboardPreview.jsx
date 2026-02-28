/**
 * components/sections/DashboardPreview.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Side-by-side dashboard analytics mockup section with:
 *   LEFT COLUMN:
 *     - Biological Age card (dark)
 *     - Health Score progress bars (animated on scroll)
 *     - Status count summary (Optimal / Standard / Attention)
 *   RIGHT COLUMN:
 *     - Trend chart (Chart.js) with period selector buttons
 *     - Biomarker table with status badges
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import RevealWrapper from "../ui/RevealWrapper";
import useScrollReveal from "../ui/useScrollReveal";
import { dashboardData } from "../../data/content";

// ── Animated progress bar component ─────────────────────────────────────────
/**
 * Renders a labeled progress bar that animates its fill width
 * when it enters the viewport using IntersectionObserver.
 */
function ProgressBar({ label, pct, colorClass, valueColor }) {
  const { ref, inView } = useScrollReveal({ threshold: 0.5 });

  return (
    <div ref={ref} className="mb-3 last:mb-0">
      {/* Label row */}
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="text-slate-600">{label}</span>
        <span className={`font-bold ${valueColor}`}>{pct}%</span>
      </div>
      {/* Track + animated fill */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out delay-300`}
          style={{ width: inView ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// ── Trend chart with period selector ─────────────────────────────────────────
function TrendChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [activePeriod, setActivePeriod] = useState("3M");

  const periods = ["1M", "3M", "6M", "1Y"];

  // Mock data sets for each period
  const periodData = {
    "1M": { labels: ["W1","W2","W3","W4"],          data: [82, 84, 85, 87] },
    "3M": { labels: ["Oct","Nov","Dec","Jan","Feb"], data: [74, 76, 80, 83, 87] },
    "6M": { labels: ["Aug","Sep","Oct","Nov","Dec","Jan","Feb"], data: [68,71,74,76,80,83,87] },
    "1Y": { labels: ["Mar","May","Jul","Sep","Nov","Jan","Feb"], data: [60,65,68,73,79,83,87] },
  };

  useEffect(() => {
    import("chart.js/auto").then(({ default: Chart }) => {
      if (!chartRef.current) return;
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");

      // Blue gradient under the main line
      const gradient = ctx.createLinearGradient(0, 0, 0, 160);
      gradient.addColorStop(0, "rgba(59,130,246,0.15)");
      gradient.addColorStop(1, "rgba(59,130,246,0)");

      const { labels, data } = periodData[activePeriod];
      // Mock peer average — always slightly below
      const peerData = data.map((v) => Math.round(v * 0.93));

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Health Score",
              data,
              borderColor: "#3B82F6",
              backgroundColor: gradient,
              fill: true,
              tension: 0.5,
              borderWidth: 2.5,
              pointRadius: 4,
              pointBackgroundColor: "#3B82F6",
              pointBorderColor: "white",
              pointBorderWidth: 2,
            },
            {
              label: "Peer Avg",
              data: peerData,
              borderColor: "rgba(148,163,184,0.5)",
              borderDash: [5, 4],
              fill: false,
              tension: 0.4,
              borderWidth: 1.5,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: { size: 10, family: "DM Sans, sans-serif" },
                color: "#94A3B8",
                usePointStyle: true,
                pointStyleWidth: 8,
                padding: 16,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}` },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 }, color: "#94A3B8" },
              border: { display: false },
            },
            y: {
              min: 55, max: 95,
              grid: { color: "rgba(203,213,225,0.3)", drawBorder: false },
              ticks: { font: { size: 10 }, color: "#94A3B8", stepSize: 10 },
              border: { display: false },
            },
          },
        },
      });
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [activePeriod]); // Re-render chart when period changes

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[0.875rem] font-semibold text-slate-800">Health Score Trend</p>
        {/* Period selector buttons */}
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-2.5 py-1 rounded-md text-[0.7rem] font-medium transition-all duration-200 ${
                activePeriod === p
                  ? "bg-blue-50 border border-blue-200 text-blue-600"
                  : "text-slate-400 hover:text-slate-600 border border-transparent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {/* Chart canvas */}
      <div className="relative h-40">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 px-5 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section header ── */}
        <RevealWrapper>
          <SectionHeader
            badge="Your Health Dashboard"
            title="Everything you need to<br/>know about your body"
            subtitle="A beautiful, intuitive dashboard that transforms complex biomarker data into clear, actionable health intelligence."
          />
        </RevealWrapper>

        {/* ── Dashboard layout: left cards + right chart/markers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 items-start">

          {/* ─── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* ── Biological age card — dark bg ── */}
            <RevealWrapper>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-[0_16px_48px_rgba(15,23,42,0.15)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[0.7rem] text-white/50 uppercase tracking-widest mb-2">Biological Age</p>
                    {/* Large number */}
                    <div className="flex items-end gap-2">
                      <span className="font-serif text-[3.2rem] leading-none text-white">31</span>
                      <span className="text-white/50 mb-1.5 text-sm">yrs</span>
                    </div>
                    {/* Delta badge */}
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-400 text-[0.7rem] font-semibold">
                      ↓ 4 years younger than real age
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.62rem] text-white/40 uppercase tracking-wide mb-1">Real Age</p>
                    <p className="font-serif text-2xl text-white/80">35</p>
                  </div>
                </div>
              </div>
            </RevealWrapper>

            {/* ── Progress bars card ── */}
            <RevealWrapper delay={100}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                <p className="text-[0.875rem] font-semibold text-slate-800 mb-5">Health Score Breakdown</p>
                {dashboardData.progressBars.map((bar) => (
                  <ProgressBar key={bar.label} {...bar} />
                ))}
              </div>
            </RevealWrapper>

            {/* ── Status count card ── */}
            <RevealWrapper delay={200}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[0.875rem] font-semibold text-slate-800">Status Overview</p>
                  <span className="text-[0.7rem] text-slate-400">12 markers</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {dashboardData.statusCounts.map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center border ${s.border}`}>
                      <p className={`font-serif text-2xl font-bold ${s.text}`}>{s.count}</p>
                      <p className={`text-[0.62rem] font-semibold uppercase tracking-wider ${s.text}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>

          {/* ─── RIGHT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* ── Trend chart ── */}
            <RevealWrapper>
              <TrendChart />
            </RevealWrapper>

            {/* ── Biomarker rows ── */}
            <RevealWrapper delay={100}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[0.875rem] font-semibold text-slate-800">Key Biomarkers</p>
                  <a href="#" className="text-[0.75rem] text-blue-500 hover:text-blue-700 no-underline font-medium">View all →</a>
                </div>

                {/* Marker rows */}
                <div className="flex flex-col gap-2.5">
                  {dashboardData.markers.map((marker) => (
                    <div
                      key={marker.name}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 ${marker.iconBg} rounded-lg shrink-0 flex items-center justify-center`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d={marker.iconPath} />
                        </svg>
                      </div>
                      {/* Name + range */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.8rem] font-semibold text-slate-800 truncate">{marker.name}</p>
                        <p className="text-[0.65rem] text-slate-400">{marker.range}</p>
                      </div>
                      {/* Value */}
                      <p className={`text-[0.9rem] font-bold ${marker.valueColor}`}>{marker.value}</p>
                      {/* Status badge */}
                      <span className={`px-2 py-0.5 rounded-full text-[0.62rem] font-semibold whitespace-nowrap ${marker.statusClass}`}>
                        {marker.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
