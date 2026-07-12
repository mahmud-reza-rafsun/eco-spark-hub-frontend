import React from 'react'

export default function Features() {
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
    return (
        <>
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
        </>
    )
}
