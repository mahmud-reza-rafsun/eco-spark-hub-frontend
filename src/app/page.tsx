"use client";
import HeroNavbar from "./_components/HeroNavbar";
import Hero from "./_components/Hero";
import GlobalImpact from "./_components/GlobalImpact";
import Footer from "./_components/Footer";
import { HeroRelayAnimation } from "./_components/HeroRelayAnimation";
import Features from "./_components/Features";
import CTABanner from "./_components/CTABanner";
import HowItWorks from "./_components/HowIiWork";


const LandingPage: React.FC = () => {
    return (
        <div className="bg-slate-50 text-slate-900 dark:bg-[#09090B] dark:text-gray-200 font-sans min-h-screen overflow-x-hidden selection:bg-indigo-500/30 selection:text-slate-900 dark:selection:text-white transition-colors duration-200">

            {/* Background glow blobs — contained, no overflow */}
            <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/8 blur-[140px]" />
                <div className="absolute top-[35%] right-[-12%] w-[500px] h-[500px] rounded-full bg-indigo-500/4 dark:bg-indigo-500/6 blur-[160px]" />
                <div className="absolute bottom-[-10%] left-[15%] w-[450px] h-[450px] rounded-full bg-indigo-500/3 dark:bg-indigo-500/5 blur-[120px]" />
            </div>

            <HeroNavbar />

            <Hero />

            <Features />

            <GlobalImpact />

            {/* ── How it works — steps ── */}
            <HowItWorks />

            <HeroRelayAnimation />


            {/* ── CTA Banner ── */}
            <CTABanner />

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
};

export default LandingPage;
