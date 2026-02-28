/**
 * tailwind.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tailwind CSS configuration for the MyHealthMate project.
 *
 * Extends the default theme with:
 *   - Custom font families (DM Sans + DM Serif Display via CSS variables)
 *   - Extended animation/keyframes
 *   - Additional transition durations
 *   - Custom background patterns
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ── Content paths — Tailwind scans these files for class names ──
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.{js,ts}",
  ],

  // Disable Tailwind's built-in dark mode class system
  // (we use prefers-color-scheme media query directly in CSS)
  darkMode: "media",

  theme: {
    extend: {
      // ── Font families ──────────────────────────────────────────────────
      // Maps CSS variables (set in layout.jsx) to Tailwind font-{name} utilities
      fontFamily: {
        sans:  ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "DM Serif Display", "Georgia", "serif"],
      },

      // ── Colors ────────────────────────────────────────────────────────
      // These match the design system but most are already in Tailwind defaults.
      // Only add what Tailwind doesn't have.
      colors: {
        // Teal is in Tailwind, but we add exact brand values for reference
        brand: {
          blue:  "#3B82F6",
          teal:  "#2DD4BF",
          green: "#10B981",
        },
      },

      // ── Custom animations ──────────────────────────────────────────────
      keyframes: {
        // Floating dashboard card — gentle bob with slight rotation
        floatCard: {
          "0%, 100%": { transform: "translateY(0px) rotate(-0.5deg)" },
          "50%":       { transform: "translateY(-12px) rotate(0.5deg)" },
        },
        // Floating notification card — bob + horizontal drift
        floatEl1: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%":       { transform: "translateY(-8px) translateX(4px)" },
        },
        // Floating age card — pure vertical bob
        floatEl2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        // Slow pulsing opacity for background blobs
        pulseSlow: {
          "0%, 100%": { opacity: "0.7" },
          "50%":       { opacity: "1" },
        },
      },

      // ── Animation utilities ────────────────────────────────────────────
      animation: {
        "float-card":   "floatCard 6s ease-in-out infinite",
        "float-1":      "floatEl1 5s ease-in-out infinite",
        "float-2":      "floatEl2 7s ease-in-out infinite",
        "pulse-slow":   "pulseSlow 8s ease-in-out infinite alternate",
      },

      // ── Transition durations ──────────────────────────────────────────
      // Tailwind includes 300, 500, 700 by default — add 400 for smooth hovers
      transitionDuration: {
        400: "400ms",
      },

      // ── Box shadows ────────────────────────────────────────────────────
      // Custom shadow values used across cards
      boxShadow: {
        "card":    "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.05)",
        "card-lg": "0 16px 48px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.07)",
        "card-xl": "0 32px 80px rgba(15,23,42,0.16), 0 8px 24px rgba(15,23,42,0.1)",
        "blue":    "0 8px 24px rgba(59,130,246,0.35)",
        "blue-lg": "0 12px 36px rgba(59,130,246,0.45)",
      },

      // ── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",     // 16px — cards
        "3xl": "1.5rem",   // 24px — larger cards
        "4xl": "2rem",     // 32px — feature cards / price cards
      },

      // ── Max width ─────────────────────────────────────────────────────
      maxWidth: {
        "8xl": "1280px",  // Main container max width
      },
    },
  },

  // ── Plugins ──────────────────────────────────────────────────────────────
  // No additional Tailwind plugins required for this project.
  plugins: [],
};
