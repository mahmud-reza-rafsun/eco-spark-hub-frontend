import Link from "next/link";
import { useEffect, useState } from "react";

const BHACLogo = ({ className }: { className?: string }) => (
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

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    return (
        <div className="fixed w-full z-999">
            {/* ── Navbar ── */}
            <header className=" top-0 z-50 border-b border-white/[0.06] bg-[#09090B]/85 backdrop-blur-xl">
                <div className="container mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <BHACLogo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="font-bold text-xl tracking-tight text-white">BHAC</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="ideas" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Ideas
                        </a>
                        <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            How it works
                        </a>
                        <a href="/about-us" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            About
                        </a>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden text-gray-400 hover:text-white p-1 transition-colors"
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </button>
                </div>
            </header>

            {/* ── Mobile drawer ── */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />
                <div className={`absolute right-0 top-0 h-full w-4/5 max-w-xs bg-[#0E0E11] border-l border-white/[0.07] p-6 flex flex-col transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between mb-10">
                        <span className="font-semibold text-white text-lg">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close menu">
                            <CloseIcon />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {["Explore", "How it works", "About"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg px-3 py-3 text-base transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-auto flex flex-col gap-3 pt-8 border-t border-white/[0.06]">
                        <button className="w-full text-center text-gray-300 hover:text-white py-2.5 text-sm font-medium transition-colors">
                            Sign in
                        </button>
                        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md">
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
