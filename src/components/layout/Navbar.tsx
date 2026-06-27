/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, } from 'lucide-react';
import Link from 'next/link';
import DarkMode from '../modules/DarkMode/DarkMode';
import { NavbarProps } from '@/interface/auth.interface';
import UserSession from '@/utils/UserSession/UserSession';
import IdeaPostForm from '@/app/(commonLayout)/_components/PostIdea/createPost/IdeaPostForm';
import EcoSparkAI from '@/app/LLM_Model_AI/EcoSparkAI';
import { Button } from '../ui/button';


const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

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

const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

const Navbar = ({
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
    const [isAiOpen, setIsAiOpen] = useState(false);

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/ideas", label: "Ideas" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/about-us", label: "About Us" },
        { href: "/blog", label: "Blog" }
    ];


    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink: 0">
                        <Link href="/" className="flex items-center gap-2">
                            <BHACLogo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="font-bold text-xl tracking-tight text-white">BHAC</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {
                            user ? (
                                <div>
                                    <style>{customCss}</style>
                                    <button onClick={() => setIsIdeaModalOpen(true)} className="relative cursor-pointer inline-flex items-center justify-center p-[1px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: 'conic-gradient(from var(--angle), transparent 25%, #6366f1, transparent 50%)',
                                                animation: 'shimmer-spin 2.5s linear infinite',
                                            }}
                                        />
                                        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-2 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
                                            <Lightbulb className='text-indigo-500 dark:text-white' />
                                        </span>
                                    </button>
                                </div>
                            ) : ""
                        }

                        {/* <div>
                            <style>{customCss}</style>
                            <button onClick={() => setIsAiOpen(true)} className="relative cursor-pointer inline-flex items-center justify-center p-[1px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'conic-gradient(from var(--angle), transparent 25%, #6366f1, transparent 50%)',
                                        animation: 'shimmer-spin 2.5s linear infinite',
                                    }}
                                />
                                <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-2 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
                                    <Brain className='text-indigo-500 dark:text-white' />
                                </span>
                            </button>
                        </div> */}

                        <div className="hidden md:block">
                            <UserSession auth={auth} />
                        </div>

                        <UserSession />
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
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t absolute to-0 left-0 min-h-screen w-2/3 transition-opacity duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-black">

                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {
                            user ? <div></div> :
                                <div className="flex items-center gap-3">
                                    <Button asChild className="px-5 py-5 rounded-lg dark:bg-indigo-500/30 border-none hover:bg-indigo-500/30 bg-indigo-500/30 text-indigo-600 dark:text-gray-100 shadow-sm">
                                        <Link href={auth.login.url}>{auth.login.title}</Link>
                                    </Button>
                                    <Button asChild className="px-5 py-5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm">
                                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                                    </Button>
                                </div>

                        }
                    </div>
                </div>
            )}




            <IdeaPostForm
                isOpen={isIdeaModalOpen}
                onClose={() => setIsIdeaModalOpen(false)}
            />

            <EcoSparkAI isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
        </header>
    );
};

export default Navbar;
