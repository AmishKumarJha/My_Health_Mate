/**
 * content.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central data store for all static content used across the Lucis landing page.
 * Keeping data separate from UI components makes it easy to update copy,
 * stats, pricing, etc. without touching any JSX.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── NAV LINKS ──────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Features",   href: "#features"   },
  { label: "Dashboard",  href: "#dashboard"  },
  { label: "How It Works", href: "#how"      },
  { label: "Pricing",    href: "#pricing"    },
];

// ── HERO SECTION ───────────────────────────────────────────────────────────
export const heroData = {
  badge: "AI-Powered Prevention",
  headline: ["Understand Your Health", "Before Problems Begin"],
  subtext:
    "MyHealthMate uses advanced biomarker analysis and AI to give you a complete picture of your health — tracking over 100 indicators to surface insights before symptoms appear.",
  cta: { primary: "Get Started", secondary: "Find a Lab" },
  socialProof: {
    count: "4,000+",
    stat: "Avg. biological age reduced by 4.2 years",
  },
  /** Mini metric chips shown in the floating dashboard card */
  metrics: [
    { label: "Glucose",  value: "92",  unit: "mg/dL", trend: "↑ Optimal",  trendType: "up" },
    { label: "Cortisol", value: "18",  unit: "μg/dL", trend: "⚠ Elevated", trendType: "warn" },
    { label: "HRV",      value: "58",  unit: "ms",    trend: "↑ Good",     trendType: "up" },
  ],
  bars: [
    { label: "Inflammation", pct: 25, color: "from-emerald-500 to-teal-400" },
    { label: "Immunity",     pct: 78, color: "from-blue-500 to-blue-400"    },
    { label: "Metabolic",    pct: 63, color: "from-violet-500 to-violet-400"},
  ],
  statusTags: ["Heart Health", "Thyroid", "Sleep Quality"],
};

// ── FEATURES SECTION ───────────────────────────────────────────────────────
export const featuresData = [
  {
    id: "biomarker",
    icon: "grid",
    title: "Biomarker Analysis",
    desc:  "Track 100+ health indicators from a single blood draw. From inflammation markers to hormones, we cover every dimension.",
    stat:  "100+",
    statLabel: "Health Indicators",
    iconBg: "bg-blue-50",
    iconStroke: "stroke-blue-600",
  },
  {
    id: "ai",
    icon: "lightbulb",
    title: "AI Health Insights",
    desc:  "Personalized recommendations powered by machine learning, trained on millions of health outcomes and clinical research.",
    stat:  "98%",
    statLabel: "Personalization Accuracy",
    iconBg: "bg-emerald-50",
    iconStroke: "stroke-emerald-600",
  },
  {
    id: "wearable",
    icon: "device",
    title: "Wearable Integration",
    desc:  "Sync your Apple Watch, Garmin, Oura Ring, and more. Continuous health monitoring meets clinical biomarker data.",
    stat:  "40+",
    statLabel: "Connected Devices",
    iconBg: "bg-teal-50",
    iconStroke: "stroke-teal-600",
  },
  {
    id: "privacy",
    icon: "lock",
    title: "Privacy & Security",
    desc:  "Military-grade AES-256 encryption. Your health data stays yours — no third-party sharing, full GDPR compliance.",
    stat:  "256-bit",
    statLabel: "AES Encryption",
    iconBg: "bg-amber-50",
    iconStroke: "stroke-amber-600",
  },
];

// ── DASHBOARD SECTION ──────────────────────────────────────────────────────
export const dashboardData = {
  progressBars: [
    { label: "Cardiovascular", pct: 92, colorClass: "from-emerald-500 to-teal-400", valueColor: "text-emerald-600" },
    { label: "Metabolic Health", pct: 78, colorClass: "from-blue-500 to-blue-400",  valueColor: "text-blue-600"    },
    { label: "Hormonal Balance", pct: 61, colorClass: "from-amber-500 to-amber-400", valueColor: "text-amber-600"  },
    { label: "Inflammation",     pct: 88, colorClass: "from-emerald-500 to-teal-400", valueColor: "text-emerald-600"},
  ],
  statusCounts: [
    { count: 7, label: "Optimal",   bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    { count: 3, label: "Standard",  bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-100"   },
    { count: 2, label: "Attention", bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-100"  },
  ],
  /** Individual biomarker rows in the table */
  markers: [
    {
      name: "hsCRP (Inflammation)", range: "Optimal: <1.0 mg/L",
      value: "0.6", valueColor: "text-emerald-600",
      status: "Optimal", statusClass: "bg-emerald-50 text-emerald-700",
      iconBg: "bg-red-100", iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      name: "TSH (Thyroid)", range: "Optimal: 1.0–2.5 mIU/L",
      value: "2.1", valueColor: "text-blue-600",
      status: "Standard", statusClass: "bg-blue-50 text-blue-700",
      iconBg: "bg-blue-100", iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Cortisol (Stress)", range: "Optimal: 6–18 μg/dL",
      value: "22.4", valueColor: "text-amber-600",
      status: "Attention", statusClass: "bg-amber-50 text-amber-700",
      iconBg: "bg-amber-100", iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      name: "Vitamin D", range: "Optimal: 40–60 ng/mL",
      value: "52", valueColor: "text-emerald-600",
      status: "Optimal", statusClass: "bg-emerald-50 text-emerald-700",
      iconBg: "bg-emerald-100", iconPath: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ],
};

// ── HOW IT WORKS SECTION ───────────────────────────────────────────────────
export const stepsData = [
  {
    num: 1,
    title: "Book Your Test",
    desc:  "Choose from 200+ partner labs near you. Book online in under 2 minutes. No fasting required for most panels.",
    icon:  "calendar",
  },
  {
    num: 2,
    title: "Analyze Biomarkers",
    desc:  "Our AI processes your 100+ biomarkers against clinical benchmarks, your personal history, and peer data.",
    icon:  "chip",
  },
  {
    num: 3,
    title: "Get Your Plan",
    desc:  "Receive a personalized action plan with nutrition, lifestyle, and supplement recommendations tailored to your biology.",
    icon:  "document",
  },
];

// ── CASE STUDIES SECTION ───────────────────────────────────────────────────
export const storiesData = [
  {
    tag:   "Chronic Fatigue",
    tagStyle: "bg-red-100 text-red-700",
    title: "Maria, 38 — Elevated cortisol & low ferritin despite 'normal' routine",
    steps: [
      { type: "detect", label: "Detected",     text: "Cortisol 28μg/dL — chronic stress response" },
      { type: "reco",   label: "Recommendation", text: "Sleep hygiene protocol + adaptogens + iron-rich diet" },
      { type: "result", label: "After 90 days", text: "Cortisol normalized, energy levels up 40%" },
    ],
    pill: "🏃‍♀️ Now runs 5K three times a week",
  },
  {
    tag:   "Metabolic Risk",
    tagStyle: "bg-amber-100 text-amber-700",
    title: "David, 44 — Pre-diabetic markers missed for years at annual checkup",
    steps: [
      { type: "detect", label: "Detected",     text: "HbA1c 5.9% + insulin resistance pattern" },

      { type: "reco",   label: "Recommendation", text: "Low-glycaemic diet + 10min post-meal walks" },
      { type: "result", label: "After 6 months", text: "HbA1c back to 5.2% — risk reversed" },
    ],
    pill: "⚡ Lost 8kg without calorie counting",
  },
  {
    tag:   "Sleep Optimization",
    tagStyle: "bg-emerald-100 text-emerald-700",
    title: "Sophie, 31 — Poor sleep despite 8 hours in bed every night",
    steps: [
      { type: "detect", label: "Detected",     text: "Low melatonin + magnesium deficiency" },
      { type: "reco",   label: "Recommendation", text: "Magnesium glycinate + no screens after 9pm" },
      { type: "result", label: "After 30 days", text: "HRV improved 34%, deep sleep +1.5hrs" },
    ],
    pill: "😴 Feels rested for the first time in years",
  },
];

// ── PRICING SECTION ────────────────────────────────────────────────────────
export const pricingData = [
  {
    name:  "Discovery",
    price: "€49",
    period: "/year",
    desc:  "Start understanding your health with essential biomarker tracking and an annual report.",
    recommended: false,
    features: [
      { included: true,  text: "Basic biomarker panel (30+)" },
      { included: true,  text: "Annual health report" },
      { included: true,  text: "Basic AI insights" },
      { included: true,  text: "Lab partner access" },
      { included: false, text: "Full biomarker panel" },
      { included: false, text: "Wearable integration" },
      { included: false, text: "AI action plan" },
    ],
    ctaLabel: "Get Discovery",
  },
  {
    name:  "Care",
    price: "€149",
    period: "/year",
    desc:  "The complete preventive health platform with AI-powered insights and continuous tracking.",
    recommended: true,
    features: [
      { included: true, text: "Full biomarker panel (100+)" },
      { included: true, text: "Quarterly health reports" },
      { included: true, text: "Personalised AI action plan" },
      { included: true, text: "Full dashboard tracking" },
      { included: true, text: "Wearable device sync" },
      { included: true, text: "Biological age tracking" },
      { included: true, text: "Priority lab access" },
    ],
    ctaLabel: "Start with Care",
  },
];

// ── TRUST SECTION ──────────────────────────────────────────────────────────
export const trustData = [
  {
    icon:   "shield",
    title:  "GDPR Compliant",
    desc:   "Full European data protection compliance. Your rights to access, modify, and delete your data are guaranteed.",
    badge:  "✓ GDPR Certified",
  },
  {
    icon:   "lock",
    title:  "End-to-End Encryption",
    desc:   "AES-256 encryption at rest and TLS 1.3 in transit. Your biomarker data is protected by military-grade security.",
    badge:  "✓ AES-256 Encrypted",
  },
  {
    icon:   "beaker",
    title:  "Medical-Grade Analysis",
    desc:   "All biomarker analysis follows ISO 15189 standards. Results reviewed by certified laboratory professionals.",
    badge:  "✓ ISO 15189 Standard",
  },
  {
    icon:   "globe",
    title:  "No Third-Party Sharing",
    desc:   "We never sell, share, or monetize your health data. No advertising profiling, no data brokers. Ever.",
    badge:  "✓ Zero Data Selling",
  },
];

// ── FOOTER LINKS ───────────────────────────────────────────────────────────
export const footerLinks = {
  Product: ["Dashboard", "Biomarkers", "AI Insights", "Wearables", "Lab Partners"],
  Company: ["About Us", "Science", "Blog", "Careers", "Press"],
  Legal:   ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
};
