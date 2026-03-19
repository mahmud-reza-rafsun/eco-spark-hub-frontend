/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Home, Lightbulb, LayoutDashboard, Info, Newspaper, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
    user?: any;
    auth?: {
        login: { title: string; url: string };
        signup: { title: string; url: string };
    };
}

const SideBar = ({ }: NavbarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navLinks = [
        { href: "/", label: "Home", icon: <Home size={22} /> },
        { href: "/ideas", label: "Ideas", icon: <Lightbulb size={22} /> },
        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={22} /> },
        { href: "/about-us", label: "About Us", icon: <Info size={22} /> },
        { href: "/blog", label: "Blog", icon: <Newspaper size={22} /> },
    ];

    return (
        <aside
            className={`fixed left-0 top-16 h-[calc(100vh-64px)] transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#09090b] z-40 
            ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3.5 top-2.5 z-50 p-1 rounded-full bg-white dark:bg-[#161313] border border-gray-200 dark:border-gray-500 text-gray-500 hover:text-indigo-500 shadow-sm transition-all"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className="flex flex-col h-full mt-5 py-6 overflow-x-hidden">

                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            title={isCollapsed ? link.label : ""}
                            className={`flex items-center rounded-xl transition-all duration-200 group relative
                                ${isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3 gap-4'}
                                ${link.label === "Home"
                                    ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400"}
                            `}
                        >
                            <div className="flex-shrink: 0">
                                {link.icon}
                            </div>
                            {!isCollapsed && (
                                <span className="text-sm font-medium whitespace-nowrap transition-opacity duration-300">
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;