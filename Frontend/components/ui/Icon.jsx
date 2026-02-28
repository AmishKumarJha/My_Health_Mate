/**
 * components/ui/Icon.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A centralized icon library using inline SVG paths.
 * Pass `name` prop to select which icon to render.
 * All icons share a consistent 24x24 viewBox and stroke-based style.
 *
 * Usage:
 *   <Icon name="shield" className="w-6 h-6 stroke-blue-600" />
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

// Map of icon names → SVG path data
const ICONS = {
  // Navigation / UI
  chevronRight: "M9 5l7 7-7 7",
  arrowRight:   "M5 12h14M12 5l7 7-7 7",
  play:         "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.131a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  menu:         "M4 6h16M4 12h16M4 18h16",
  x:            "M6 18L18 6M6 6l12 12",
  check:        "M5 13l4 4L19 7",
  // Health / Feature icons
  grid:         "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  lightbulb:    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  device:       "M12 18h.01M8 21h8a2 2 0 002-2v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 002 2zm0-18h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z",
  lock:         "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  shield:       "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  beaker:       "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  globe:        "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  // How it works step icons
  calendar:     "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  chip:         "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2",
  document:     "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  // Story step icons
  search:       "M21 21l-4.35-4.35m0 0A7 7 0 1016.65 16.65z",
  star:         "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  lightning:    "M13 10V3L4 14h7v7l9-11h-7z",
  // Notification / status
  checkCircle:  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  heart:        "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  clock:        "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  sun:          "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon:         "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  // Social icons (filled paths — use `fill` instead of `stroke`)
  twitter: { filled: true, path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  linkedin: { filled: true, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6m-2 0a2 2 0 104 0 2 2 0 00-4 0" },
  instagram: { filled: true, path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5 M2 6.5A4.5 4.5 0 016.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5z" },
};

/**
 * Icon component
 * @param {string}  name       - Key from the ICONS map above
 * @param {string}  className  - Tailwind classes for sizing + color
 */
export default function Icon({ name, className = "w-5 h-5" }) {
  const icon = ICONS[name];
  if (!icon) return null;

  // Handle filled (social) vs stroked icons
  const isFilled = typeof icon === "object" && icon.filled;
  const pathData  = isFilled ? icon.path : icon;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? "0" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Render all path segments (some icons have compound paths) */}
      {pathData.split(" M").map((segment, i) => (
        <path
          key={i}
          d={i === 0 ? segment : `M${segment}`}
        />
      ))}
    </svg>
  );
}
