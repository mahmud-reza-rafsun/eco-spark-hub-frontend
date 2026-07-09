"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PaymentSelectModal from "../donate/_components/PaymentModal";

const stats = [
    { value: 4200, suffix: "+", label: "Ideas shared" },
    { value: 1800, suffix: "+", label: "Problems posted" },
    { value: 12000, suffix: "+", label: "Community members" },
    { value: 320, suffix: "+", label: "Projects launched" },
];

function useCountUp(target: number, shouldStart: boolean, duration = 1600) {
    const [value, setValue] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!shouldStart || started.current) return;
        started.current = true;

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            // avoid synchronous setState within effect — defer to next tick
            const t = setTimeout(() => setValue(target), 0);
            return () => clearTimeout(t);
        }

        let raf: number;
        const start = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setValue(Math.floor(eased * target));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [shouldStart, target, duration]);

    return value;
}

function StatItem({
    value,
    suffix,
    label,
    shouldStart,
    delay,
}: {
    value: number;
    suffix: string;
    label: string;
    shouldStart: boolean;
    delay: number;
}) {
    const count = useCountUp(value, shouldStart);

    return (
        <div
            className="flex flex-col items-center text-center gap-1 opacity-0 animate-fade-up"
            style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
        >
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-gray-200 tabular-nums">
                {count.toLocaleString()}
                {suffix}
            </span>
            <span className="text-sm text-slate-500 dark:text-gray-400">{label}</span>
        </div>
    );
}

export default function Hero() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [statsInView, setStatsInView] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* ── Hero ── */}
            <section className="relative z-10 pt-24 pb-28 md:pt-36 md:pb-40 px-5 sm:px-8 overflow-hidden">
                {/* Ambient gradient orbs */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-indigo-400/20 dark:bg-indigo-500/10 blur-3xl animate-float-slow"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-10 -right-20 w-[360px] h-[360px] rounded-full bg-indigo-300/20 dark:bg-indigo-400/10 blur-3xl animate-float-slower"
                />

                {/* Signature: connecting-idea node network */}
                <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.25] dark:opacity-[0.18]"
                    viewBox="0 0 1000 500"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <g className="stroke-indigo-400 dark:stroke-indigo-300" fill="none" strokeWidth="1">
                        <path className="animate-dash" strokeDasharray="6 8" d="M120,90 L340,180 L560,70" />
                        <path className="animate-dash" strokeDasharray="6 8" d="M340,180 L520,340 L780,260" style={{ animationDelay: "0.6s" }} />
                        <path className="animate-dash" strokeDasharray="6 8" d="M180,380 L400,300 L560,70" style={{ animationDelay: "1.2s" }} />
                        <path className="animate-dash" strokeDasharray="6 8" d="M780,260 L900,120" style={{ animationDelay: "0.3s" }} />
                    </g>
                    <g className="fill-indigo-500 dark:fill-indigo-300">
                        {[
                            [120, 90], [340, 180], [560, 70], [520, 340],
                            [780, 260], [180, 380], [400, 300], [900, 120],
                        ].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="4" className="animate-node-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
                        ))}
                    </g>
                </svg>

                <div className="container relative mx-auto flex flex-col items-center text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-medium text-indigo-600 dark:text-indigo-300 tracking-wide mb-7 opacity-0 animate-fade-up"
                        style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                        Open to everyone — share, discover, build
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-gray-800 dark:text-white tracking-tight leading-[1.1] max-w-4xl opacity-0 animate-text-reveal"
                        style={{ animationDelay: "120ms", animationFillMode: "forwards" }}
                    >
                        Where Ideas Meet{" "}
                        <span className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 dark:from-indigo-400 dark:via-indigo-300 dark:to-indigo-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                            Real Problems
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed opacity-0 animate-fade-up"
                        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
                    >
                        BHAC — the Bangladesh Human Advancement Collective — is an open platform where anyone
                        can share an idea, post a real-world problem, and find collaborators to build
                        solutions that actually matter.
                    </p>

                    {/* CTAs */}
                    <div
                        className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto opacity-0 animate-fade-up"
                        style={{ animationDelay: "420ms", animationFillMode: "forwards" }}
                    >
                        <Link href="/ideas" className="w-full sm:w-auto">
                            <button className="group w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 text-sm inline-flex items-center justify-center gap-2">
                                Explore Ideas
                                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </button>
                        </Link>
                        <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="w-full cursor-pointer sm:w-auto border border-slate-200 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
                        >
                            Donate
                        </button>
                    </div>

                    {/* Social proof */}
                    <p
                        className="mt-6 text-sm text-slate-400 dark:text-gray-600 opacity-0 animate-fade-up"
                        style={{ animationDelay: "540ms", animationFillMode: "forwards" }}
                    >
                        No account needed to browse · Free forever
                    </p>
                </div>
            </section>

            {/* ── Stats strip ── */}
            <section
                ref={statsRef}
                className="relative z-10 border-y border-slate-200 dark:border-white/[0.05] bg-slate-100/40 dark:bg-white/[0.015]"
            >
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <StatItem
                            key={stat.label}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            shouldStart={statsInView}
                            delay={i * 90}
                        />
                    ))}
                </div>
            </section>

            <PaymentSelectModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes text-reveal {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                        filter: blur(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                        filter: blur(0);
                    }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -24px); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-24px, 20px); }
                }
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% center; }
                    50% { background-position: 100% center; }
                }
                @keyframes dash {
                    to { stroke-dashoffset: -100; }
                }
                @keyframes node-pulse {
                    0%, 100% { opacity: 0.5; r: 3.5; }
                    50% { opacity: 1; r: 5; }
                }

                .animate-fade-up {
                    animation: fade-up 0.7s cubic-bezier(0.21, 1.02, 0.73, 1) both;
                }
                .animate-text-reveal {
                    animation: text-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-float-slow {
                    animation: float-slow 9s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-slower 11s ease-in-out infinite;
                }
                .animate-gradient-shift {
                    animation: gradient-shift 6s ease-in-out infinite;
                }
                .animate-dash {
                    animation: dash 4s linear infinite;
                }
                .animate-node-pulse {
                    animation: node-pulse 2.4s ease-in-out infinite;
                    transform-origin: center;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-fade-up,
                    .animate-text-reveal,
                    .animate-float-slow,
                    .animate-float-slower,
                    .animate-gradient-shift,
                    .animate-dash,
                    .animate-node-pulse {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                    }
                }
            `}} />
        </div>
    );
}
