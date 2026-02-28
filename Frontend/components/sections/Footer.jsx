/**
 * components/sections/Footer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Site footer with:
 *   - Brand column (logo + tagline + newsletter signup)
 *   - 3 link columns (Product / Company / Legal)
 *   - Bottom bar: copyright + social media icons
 *
 * The newsletter input is purely UI — wire up to your email service in prod.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import { footerLinks } from "../../data/content";

// ── Social icon paths (filled SVG) ─────────────────────────────────────────
const SOCIAL_ICONS = [
  {
    label: "Twitter / X",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
  },
  {
    label: "Instagram",
    path: "M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm4.5 3.75a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 2a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM16.75 6.5a.75.75 0 110 1.5.75.75 0 010-1.5z",
  },
];

export default function Footer() {
  // Newsletter input state
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In production: call your email service API here
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 pt-16 pb-8 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Top grid — brand + link columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* ─── Brand column ─────────────────────────────────────────── */}
          <div>
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 no-underline mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.35)]">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                  <path d="M8 2L8 8L13 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="font-serif text-xl text-white tracking-tight">MyHealthMate</span>
            </a>

            {/* Tagline */}
            <p className="text-[0.85rem] text-white/40 leading-relaxed max-w-[240px] mb-6">
              AI-powered preventive health platform helping thousands understand and optimize their biology.
            </p>

            {/* Newsletter signup */}
            <div>
              <p className="text-[0.72rem] text-white/40 mb-2.5 font-medium">Get weekly health insights</p>
              {subscribed ? (
                // Success state
                <p className="text-[0.8rem] text-emerald-400 font-medium">✓ You're subscribed!</p>
              ) : (
                // Input + button
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="
                      flex-1 min-w-0 px-3.5 py-2 rounded-xl
                      bg-white/5 border border-white/10
                      text-white text-[0.8rem] placeholder:text-white/25
                      outline-none focus:border-blue-400
                      transition-colors duration-200
                    "
                  />
                  <button
                    type="submit"
                    className="
                      px-4 py-2 rounded-xl
                      bg-blue-600 hover:bg-blue-500
                      text-white text-[0.8rem] font-semibold
                      transition-colors duration-200 whitespace-nowrap cursor-pointer
                    "
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ─── Link columns ────────────────────────────────────────── */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              {/* Column title */}
              <h4 className="text-[0.75rem] font-semibold text-white/70 uppercase tracking-widest mb-4">
                {category}
              </h4>
              {/* Link list */}
              <ul className="space-y-2.5 list-none p-0">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[0.83rem] text-white/40 hover:text-white/80 transition-colors duration-200 no-underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar — copyright + social icons ── */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-white/30">
            © 2025 MyHealthMate Health Technologies. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {SOCIAL_ICONS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="
                  w-8 h-8 rounded-lg
                  bg-white/5 border border-white/8
                  flex items-center justify-center
                  hover:bg-white/12 hover:border-white/20
                  transition-all duration-200 no-underline
                "
              >
                <svg className="w-3.5 h-3.5 fill-white/50" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
