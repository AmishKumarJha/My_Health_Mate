/**
 * postcss.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * PostCSS configuration required by Tailwind CSS.
 * Tailwind processes class names at build time via PostCSS.
 * Autoprefixer adds vendor prefixes for cross-browser compatibility.
 * ─────────────────────────────────────────────────────────────────────────────
 */

module.exports = {
  plugins: {
    tailwindcss: {},  // Process Tailwind utilities
    autoprefixer: {}, // Add -webkit-, -moz- prefixes automatically
  },
};
