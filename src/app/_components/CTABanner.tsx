import Link from "next/link";

export default function CTABanner() {
    return (
        <>
            <section className="relative z-10 py-20 px-5 sm:px-8">
                <div className="container mx-auto">
                    <div className="relative rounded-2xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/[0.06] overflow-hidden px-8 py-14 md:px-14 text-center shadow-sm dark:shadow-none">

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
                                    <Link href="/ideas">
                                        <button className="border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 text-sm cursor-pointer">
                                            See what others posted
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
