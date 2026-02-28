/**
 * components/sections/Navbar.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed top navigation bar with:
 *   - Glassmorphism blur background
 *   - Scrolled state shadow (detected via scroll event)
 *   - Desktop nav links
 *   - Login + Get Started CTA buttons
 *   - Mobile hamburger menu with animated toggle
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect } from "react";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { navLinks } from "../../data/content";

export default function Navbar() {
  // Track whether the page has been scrolled (adds shadow to nav)
  const [scrolled, setScrolled] = useState(false);

  // Track whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Add scroll listener on mount, clean up on unmount
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className={[
          // Positioning & sizing
          "fixed top-0 left-0 right-0 z-50 h-[68px]",
          "flex items-center justify-between px-5 md:px-8",
          // Glassmorphism background
          "backdrop-blur-[20px] bg-white/88",
          "border-b border-slate-200/40",
          // Conditional shadow on scroll
          "transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(15,23,42,0.08)]" : "",
        ].join(" ")}
      >
        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-2.5 no-underline group">
          {/* Gradient icon square */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.35)]">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
              <path d="M8 2L8 8L13 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Brand name — uses serif font from globals */}
          <span className="font-serif text-xl text-slate-900 tracking-tight">MyHealthMate</span>
        </a>

        {/* ── Desktop navigation links ── */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA buttons ── */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" href="#">Log in</Button>
          <Button variant="primary" href="#">Get Started</Button>
        </div>

        {/* ── Mobile hamburger button ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {/* Three bars animate into X when menu is open */}
          <span className={`block w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <div
        className={[
          "fixed top-[68px] left-0 right-0 z-40 md:hidden",
          "bg-white/95 backdrop-blur-[20px]",
          "border-b border-slate-200/40",
          "transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-96 py-6 px-5" : "max-h-0 py-0",
        ].join(" ")}
      >
        {/* Mobile nav links */}
        <ul className="list-none flex flex-col gap-1 mb-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile CTA buttons */}
        <div className="flex flex-col gap-2">
          <Button variant="ghost" href="#" className="w-full justify-center py-3">Log in</Button>
          <Button variant="primary" href="#" className="w-full justify-center py-3">Get Started</Button>
        </div>
      </div>
    </>
  );
}
