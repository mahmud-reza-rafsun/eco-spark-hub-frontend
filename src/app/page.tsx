"use client";
import Footer from "./_components/Footer";
import HeroNavbar from "./_components/HeroNavbar";
import Hero from "./_components/Hero";
import Link from "next/link";
import GlobalImpact from "./_components/GlobalImpact";



const features = [
    {
        icon: "💡",
        title: "Share Ideas",
        description:
            "Post your concept — no matter how rough or polished — and get real feedback from a global community of thinkers and builders.",
    },
    {
        icon: "🔍",
        title: "Discover Problems",
        description:
            "Browse real-world problems posted by people across every field. Find the challenge that matches your skills and interests.",
    },
    {
        icon: "🤝",
        title: "Build Solutions",
        description:
            "Connect with collaborators, form teams, and turn the best ideas into working projects — together.",
    },
];

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

            {/* ── Features ── */}
            <section id="explore" className="relative z-10 py-24 px-5 sm:px-8">
                <div className="container mx-auto">
                    {/* Section header */}
                    <div className="max-w-2xl mb-14">
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
                            How BHAC works
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                            From a rough idea to a real project
                        </h2>
                        <p className="mt-4 text-slate-600 dark:text-gray-400 text-base leading-relaxed">
                            Ideas don&apos;t need to be fully formed. Problems don&apos;t need solutions yet.
                            BHAC is the space between spark and ship.
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {features.map(({ icon, title, description }, i) => (
                            <div
                                key={title}
                                className="group relative border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] hover:bg-slate-100/50 dark:hover:bg-white/[0.04] hover:border-indigo-500/30 dark:hover:border-indigo-500/30 p-7 rounded-2xl transition-all duration-300 shadow-sm dark:shadow-none"
                            >
                                {/* Step number */}
                                <span className="absolute top-6 right-6 text-xs font-medium text-slate-400 dark:text-gray-700 tabular-nums">
                                    0{i + 1}
                                </span>
                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/[0.02] to-transparent dark:from-indigo-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="text-2xl mb-5 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    {icon}
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <GlobalImpact />

            {/* ── How it works — steps ── */}
            <section id="how-it-works" className="relative z-10 py-20 px-5 sm:px-8 border-t border-slate-200 dark:border-white/[0.05]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: text */}
                        <div>
                            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
                                The process
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-6">
                                Simple by design
                            </h2>
                            <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-10">
                                We removed everything that slows down creativity. No lengthy onboarding,
                                no paywalls, no gatekeeping. Just post, connect, and build.
                            </p>
                            <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 text-sm cursor-pointer">
                                Start posting for free
                            </button>
                        </div>

                        {/* Right: steps */}
                        <div className="flex flex-col gap-0">
                            {[
                                {
                                    step: "01",
                                    title: "Post your idea or problem",
                                    desc: "Write what's on your mind — a concept you're excited about, or a real problem you've faced.",
                                },
                                {
                                    step: "02",
                                    title: "Get community feedback",
                                    desc: "Others vote, comment, and suggest improvements. The best ideas rise naturally.",
                                },
                                {
                                    step: "03",
                                    title: "Find collaborators",
                                    desc: "Connect with people who have the skills and drive to work on what you're building.",
                                },
                                {
                                    step: "04",
                                    title: "Ship something real",
                                    desc: "Use BHAC to track progress and share milestones as your project comes to life.",
                                },
                            ].map(({ step, title, desc }, i, arr) => (
                                <div key={step} className="flex gap-5">
                                    {/* Line */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full border border-indigo-500/30 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                                            {step}
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="w-px flex-1 bg-slate-200 dark:bg-white/[0.06] mt-2 mb-2" />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="pb-8">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
                                        <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="relative z-10 py-20 px-5 sm:px-8">
                <div className="container mx-auto">
                    <div className="relative rounded-2xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/[0.06] overflow-hidden px-8 py-14 md:px-14 text-center">
                        {/* Soft glow center */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[400px] h-[200px] rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-[80px]" />
                        </div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                                Your idea belongs here.
                            </h2>
                            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                                Whether it&apos;s a product concept, a social problem, or something you can&apos;t stop thinking about —
                                BHAC is the place to put it out there.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-xl shadow-indigo-500/25 text-sm cursor-pointer">
                                    Share your idea now
                                </button>
                                <Link href="/ideas">
                                    <button className="border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 text-sm cursor-pointer">
                                        See what others posted
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
};

export default LandingPage;
