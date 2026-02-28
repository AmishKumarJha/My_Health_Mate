/**
 * app/page.jsx  (Next.js 14 App Router)
 * ─────────────────────────────────────────────────────────────────────────────
 * Root page component — composes all landing sections in order.
 *
 * Section order:
 *   1. Navbar          — fixed top navigation
 *   2. Hero            — full-height intro with dashboard mockup
 *   3. Features        — 4-card feature grid
 *   4. DashboardPreview — side-by-side analytics preview
 *   5. HowItWorks      — 3-step timeline
 *   6. Stories         — case study cards
 *   7. Pricing         — 2-tier pricing cards
 *   8. Trust           — security & compliance badges
 *   9. CallToAction    — dark final CTA section
 *  10. Footer          — links, newsletter, social
 *
 * This is a Server Component by default in Next.js App Router.
 * Child components that use hooks/events are marked with "use client" themselves.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Import all section components
import Navbar          from "@/components/sections/Navbar";
import Hero            from "@/components/sections/Hero";
import Features        from "@/components/sections/Features";
import DashboardPreview from "@/components/sections/DashboardPreview";
import HowItWorks      from "@/components/sections/HowItWorks";
import Stories         from "@/components/sections/Stories";
import Pricing         from "@/components/sections/Pricing";
import Trust           from "@/components/sections/Trust";
import CallToAction    from "@/components/sections/CallToAction";
import Footer          from "@/components/sections/Footer";
import Form from "@/components/sections/Form";

export default function LandingPage() {
  return (
    // Wrapper div with scroll-smooth behavior applied globally via CSS
    <div className="antialiased">
      {/* ── Fixed navigation bar ── */}
      <Navbar />

      {/* ── Main content — each section stacks vertically ── */}
      <main>
        <Hero />
        <Form/>
        <Features />
        <DashboardPreview />
        <HowItWorks />
        <Stories />
        <Pricing />
        <Trust />
        <CallToAction />
      </main>

      {/* ── Site footer ── */}
      <Footer />
    </div>
  );
}
