/* eslint-disable @typescript-eslint/no-unused-vars */
import DarkMode from "@/components/modules/DarkMode/DarkMode";
import UserSession from "@/utils/UserSession/UserSession";
import Link from "next/link";
import { useEffect, useState } from "react";

export const BHACLogo = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
            fill="#6366F1"
        />
        <path
            d="M11 20.5c0 .828.672 1.5 1.5 1.5h7c.828 0 1.5-.672 1.5-1.5v-1c0-.828-.672-1.5-1.5-1.5h-7c-.828 0-1.5.672-1.5 1.5v1zM9 14.5c0 .828.672 1.5 1.5 1.5h11c.828 0 1.5-.672 1.5-1.5v-1c0-.828-.672-1.5-1.5-1.5h-11c-.828 0-1.5.672-1.5 1.5v1zM13 8.5c0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5v-1c0-.828-.672-1.5-1.5-1.5h-5c-.828 0-1.5.672-1.5 1.5v1z"
            fill="#fff"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export default function HeroNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const getUser = async () => {
            try {
                const res = await fetch("/api/me");
                const result = await res.json();
                if (result.success && result.user) {
                    setUser(result.user);
                }
            } catch (err) {
                console.error("Auth Error:", err);
            } finally {
                setIsFetching(false);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    return (
        <div className="fixed top-0 left-0 w-full z-[999]">
            {/* ── Navbar ── */}
            <header className="border-b border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-xl transition-colors duration-300">
                <div className="container mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                        <BHACLogo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">BHAC</span>
                    </Link>

                    {/* Center: Desktop Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Home
                        </Link>
                        <Link href="/ideas" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Ideas
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            How it works
                        </Link>
                        <Link href="/about-us" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* Right: Desktop Actions & Mobile Menu Triggers */}
                    <div className="flex items-center gap-3">
                        {/* Desktop Only Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                <UserSession user={user} />
                            ) : (
                                <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-indigo-500/10">
                                    Sign In
                                </button>
                            )}
                            <DarkMode />
                        </div>

                        {/* Mobile Only Session/Sign-In + Burger */}
                        <div className="flex md:hidden items-center gap-3">
                            {user ? (
                                <UserSession user={user} />
                            ) : (
                                <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer">
                                    Sign In
                                </button>
                            )}
                            <DarkMode />
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white p-1.5 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                                aria-label="Open menu"
                            >
                                <MenuIcon />
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            {/* ── Mobile drawer ── */}
            <div className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {/* Backdrop overlay */}
                <div
                    className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Drawer Menu content */}
                <div className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white dark:bg-[#0E0E11] border-l border-slate-100 dark:border-white/[0.07] p-6 flex flex-col transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>

                    <div className="flex items-center justify-between mb-8">
                        <span className="font-bold text-slate-900 dark:text-white text-lg">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white p-1 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                            aria-label="Close menu"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Explore Ideas", href: "/ideas" },
                            { name: "How it works", href: "#how-it-works" },
                            { name: "About", href: "/about-us" }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-white/[0.03] rounded-xl px-4 py-3 text-base font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/[0.06]">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-500/10 text-sm">
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
