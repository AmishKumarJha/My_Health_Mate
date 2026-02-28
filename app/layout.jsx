/**
 * app/layout.jsx  (Next.js 14 App Router — Root Layout)
 * ─────────────────────────────────────────────────────────────────────────────
 * Root layout wraps every page in the application.
 * Responsibilities:
 *   - Load Google Fonts (DM Sans + DM Serif Display)
 *   - Set page metadata (title, description, OG tags)
 *   - Apply global Tailwind CSS
 *   - Set CSS variables for fonts (used in tailwind.config.js)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

// ── Font configuration ─────────────────────────────────────────────────────
/**
 * DM Sans — clean, modern sans-serif for body text and UI
 * Loaded with multiple weights for design flexibility
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",   // CSS variable for Tailwind
  display: "swap",              // Swap to font once loaded (avoids FOIT)
});

/**
 * DM Serif Display — elegant serif for headlines
 * The italic variant is used for the hero accent and CTA headline
 */
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

// ── SEO Metadata ───────────────────────────────────────────────────────────
export const metadata = {
  title: "MyHealthMate — AI-Powered Preventive Health",
  description:
    "Understand your health before problems begin. Track 100+ biomarkers, get AI insights, and receive a personalized health plan.",
  keywords: ["preventive health", "biomarkers", "AI health", "health tracking", "longevity"],
  openGraph: {
    title: "MyHealthMate — AI-Powered Preventive Health",
    description: "Understand your health before problems begin.",
    type: "website",
    locale: "en_EU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // Apply font CSS variables to <html> so Tailwind can access them
      className={`${dmSans.variable} ${dmSerif.variable} scroll-smooth`}
    >
      <body
        className="
          font-sans           /* DM Sans via Tailwind config */
          bg-white
          text-slate-800
          antialiased
          overflow-x-hidden
        "
      >
        {children}
      </body>
    </html>
  );
}
