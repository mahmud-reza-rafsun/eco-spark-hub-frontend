/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState, useId } from 'react';
import { useTheme } from 'next-themes';
import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface NavbarProps {
    auth?: {
        login: { title: string; url: string };
        signup: { title: string; url: string };
    };
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className = '', ...props }, ref) => (
    <input
        className={`flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
    />
));
Input.displayName = 'Input';

const SearchBar = ({ id, isMobile = false, onCancel }: { id: string; isMobile?: boolean; onCancel?: () => void }) => (
    <div className={`relative ${isMobile ? 'flex flex-1 items-center gap-2' : 'hidden lg:block'}`}>
        <div className="relative flex-1">
            <Input
                id={id}
                className="peer h-9 ps-9 pe-2 w-full max-w-[200px] lg:max-w-[300px]"
                placeholder="Search..."
                type="search"
                autoFocus={isMobile}
            />
            <div className="text-gray-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                <SearchIcon size={16} />
            </div>
        </div>
        {isMobile && onCancel && (
            <button onClick={onCancel} className="text-sm font-medium text-gray-500">
                Cancel
            </button>
        )}
    </div>
);

const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

const MountainIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
);

const SunIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);

const Navbar = ({
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const searchId = useId();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, [setTheme]);

    if (!mounted) return null;

    const navLinks = [
        { href: "#", label: "Features" },
        { href: "#", label: "Pricing" },
        { href: "#", label: "About" },
        { href: "#", label: "Contact" },
    ];

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isMobileSearchVisible ? (
                    <div className="flex h-16 items-center px-0">
                        <SearchBar
                            id={searchId + "-mobile"}
                            isMobile={true}
                            onCancel={() => setIsMobileSearchVisible(false)}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2">
                                <MountainIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">EcoSpark Hub</span>
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-white transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <SearchBar id={searchId + "-desktop"} />

                            <button
                                className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                                onClick={() => setIsMobileSearchVisible(true)}
                            >
                                <SearchIcon size={20} />
                            </button>

                            <Button asChild className="hidden sm:inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 hover:bg-indigo-500/20 cursor-pointer bg-indigo-500/20 text-indigo-500 dark:bg-indigo-500/55 dark:text-indigo-100 transition-colors">
                                <Link href={auth.login.url} onClick={() => setIsMenuOpen(false)}>
                                    {auth.login.title}
                                </Link>
                            </Button>

                            <Button asChild className="hidden sm:inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 cursor-pointer bg-indigo-500 text-white hover:bg-indigo-500 transition-colors duration-300">
                                <Link href={auth.signup.url} onClick={() => setIsMenuOpen(false)}>
                                    {auth.signup.title}
                                </Link>
                            </Button>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-md text-gray-600 cursor-pointer dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>

                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors duration-300"
                                    aria-expanded={isMenuOpen}
                                >
                                    {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isMenuOpen && !isMobileSearchVisible && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="#" className="w-full mt-2 text-center items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-indigo-500 text-white block transition-colors duration-300">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;