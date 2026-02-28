/**
 * next.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js 14 configuration.
 * Minimal config needed for this landing page project.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── React strict mode ──
  // Helps surface potential issues during development
  reactStrictMode: true,

  // ── Image optimization ──
  // Allow external image domains if you add real photos later
  images: {
    domains: [],
  },

  // ── Experimental: App Router is stable in Next 14 ──
  // No experimental flags needed
};

module.exports = nextConfig;
