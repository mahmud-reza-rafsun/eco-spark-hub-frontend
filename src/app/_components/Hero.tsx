import Link from "next/link";
import { useState } from "react";
import PaymentSelectModal from "../donate/_components/PaymentModal";

const stats = [
    { value: "4,200+", label: "Ideas shared" },
    { value: "1,800+", label: "Problems posted" },
    { value: "12,000+", label: "Community members" },
    { value: "320+", label: "Projects launched" },
];

export default function Hero() {

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    return (
        <div>
            {/* ── Hero ── */}
            <section className="relative z-10 pt-24 pb-28 md:pt-36 md:pb-40 px-5 sm:px-8">
                <div className="container mx-auto flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-medium text-indigo-600 dark:text-indigo-300 tracking-wide mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                        Open to everyone — share, discover, build
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-slate-700 dark:text-white tracking-tight leading-[1.1] max-w-4xl">
                        Where Ideas Meet{" "}
                        <span className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 dark:from-indigo-400 dark:via-indigo-300 dark:to-indigo-100 bg-clip-text text-transparent">
                            Real Problems
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                        BHAC is an open platform where anyone can share an idea, post a real-world problem,
                        and find collaborators to build solutions that actually matter.
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <Link href="/ideas" className="w-full sm:w-auto">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xl shadow-indigo-500/20 text-sm">
                                Explore Ideas
                            </button>
                        </Link>
                        <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="w-full cursor-pointer sm:w-auto border border-slate-200 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 text-sm"
                        >
                            Donate
                        </button>
                    </div>

                    {/* Social proof */}
                    <p className="mt-6 text-sm text-slate-400 dark:text-gray-600">
                        No account needed to browse · Free forever
                    </p>
                </div>
            </section>

            {/* ── Stats strip ── */}
            <section className="relative z-10 border-y border-slate-200 dark:border-white/[0.05] bg-slate-100/40 dark:bg-white/[0.015]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center text-center gap-1">
                            <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-gray-200">{value}</span>
                            <span className="text-sm text-slate-500 dark:text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <PaymentSelectModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
        </div>
    )
}
