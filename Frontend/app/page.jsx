/**
 * app/page.jsx (Next.js 14 App Router)
 * ─────────────────────────────────────────────────────────────────────────────
 * Root page component — composes all landing sections in order.
 * Now includes the AI-Powered Clinical Diet Form.
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

// Your AI Form Component
import Form            from "@/components/sections/Form";

export default function LandingPage() {
  return (
    <div className="antialiased selection:bg-blue-100">
      {/* ── Fixed navigation bar ── */}
      <Navbar />

      <main>
        {/* 1. Hero: The Hook */}
        <Hero />

        {/* 2. AI Analyzer: The Core Utility */}
        <section id="analyze" className="relative py-24 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                Instant Report Analysis
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Upload your blood test results below. Our Gemini-powered AI identifies 
                deficiencies and generates a 7-day personalized clinical diet in seconds.
              </p>
            </div>
            
            {/* The actual Form component logic */}
            <Form />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                HIPAA Compliant & Secure Encryption
              </p>
            </div>
          </div>
        </section>

        {/* 3. Social Proof & Features */}
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