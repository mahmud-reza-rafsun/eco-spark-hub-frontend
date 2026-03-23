/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useId } from 'react';
import { Lightbulb, SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import DarkMode from '../modules/DarkMode/DarkMode';
import { NavbarProps } from '@/interface/auth.interface';
import UserSession from '@/utils/UserSession/UserSession';

// const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className = '', ...props }, ref) => (
//     <input className={`flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//         ref={ref}
//         {...props}
//     />
// ));
// Input.displayName = 'Input';

// const SearchBar = ({ id, isMobile = false, onCancel }: { id: string; isMobile?: boolean; onCancel?: () => void }) => (
//     <div className={`relative ${isMobile ? 'flex flex-1 items-center gap-2' : 'hidden lg:block'}`}>
//         <div className="relative flex-1">
//             <Input
//                 id={id}
//                 className="peer h-9 ps-9 pe-2 w-full max-w-200px lg:max-w-500px"
//                 placeholder="Search..."
//                 type="search"
//                 autoFocus={isMobile}
//             />
//             <div className="text-gray-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
//                 <SearchIcon size={16} />
//             </div>
//         </div>
//         {isMobile && onCancel && (
//             <button onClick={onCancel} className="text-sm font-medium text-gray-500">
//                 Cancel
//             </button>
//         )}
//     </div>
// );

const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

const MountainIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
);

const Navbar = ({
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const searchId = useId();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/ideas", label: "Ideas" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/about-us", label: "About Us" },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isMobileSearchVisible ? (
                    <div className="flex h-16 items-center px-0">
                        {/* <SearchBar
                            id={searchId + "-mobile"}
                            isMobile={true}
                            onCancel={() => setIsMobileSearchVisible(false)}
                        /> */}
                    </div>
                ) : (
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink: 0">
                            <Link href="/" className="flex items-center gap-2">
                                <MountainIcon className="h-6 w-6 text-indigo-500" />
                                <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">EcoSpark Hub</span>
                            </Link>
                        </div>

                        {/* Search (Desktop) */}
                        {/* <SearchBar id={searchId + "-desktop"} /> */}

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Mobile Search Icon */}
                            <button
                                className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                                onClick={() => setIsMobileSearchVisible(true)}
                            >
                                <SearchIcon size={20} />
                            </button>

                            <Button className="group px-3 md:px-6 py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                                <Lightbulb size={18} className="group-hover:rotate-12 transition-transform" />
                                <span className="hidden md:block">Post Idea</span>
                            </Button>

                            <div className="hidden md:block">
                                <UserSession auth={auth} />
                            </div>

                            <DarkMode />

                            {/* Mobile Menu Trigger */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && !isMobileSearchVisible && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <UserSession />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;