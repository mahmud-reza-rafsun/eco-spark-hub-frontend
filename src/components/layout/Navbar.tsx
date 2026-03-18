/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState, useId } from 'react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, SearchIcon, User } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

interface NavbarProps {
    user?: any;
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
    user,
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: NavbarProps) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchId = useId();

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged out successfully");
                        router.push("/");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast.error("Failed to logout");
        } finally {
            setIsLoading(false);
        }
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
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2">
                                <MountainIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">EcoSpark Hub</span>
                            </Link>
                        </div>

                        {/* Desktop Nav Links */}
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
                            {/* Search (Desktop & Mobile trigger) */}
                            <SearchBar id={searchId + "-desktop"} />
                            <button
                                className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                                onClick={() => setIsMobileSearchVisible(true)}
                            >
                                <SearchIcon size={20} />
                            </button>

                            {/* Auth Logic: Dropdown if User, else Login/Register */}
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative cursor-pointer h-10 w-10 rounded-full border-2 border-indigo-500/20 p-0 hover:bg-indigo-500/10 transition-transform active:scale-95 focus-visible:ring-0">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.image} alt={user.name} />
                                                <AvatarFallback className="bg-indigo-500 text-white font-bold">
                                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-60 mt-2" align="end" sideOffset={8}>
                                        <DropdownMenuLabel className="p-3">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate capitalize">{user.role}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-indigo-50 focus:text-indigo-600 dark:focus:bg-indigo-950/20">
                                            <Link href="/dashboard" className="flex items-center w-full px-2 py-1.5">
                                                <LayoutDashboard className="mr-3 h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-indigo-50 focus:text-indigo-600 dark:focus:bg-indigo-950/20">
                                            <Link href="/dashboard/profile" className="flex items-center w-full px-2 py-1.5">
                                                <User className="mr-3 h-4 w-4" />
                                                <span>Profile Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="flex items-center w-full px-2 py-1.5 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer"
                                            disabled={isLoading}
                                            onClick={handleLogout}
                                        >
                                            <span>{isLoading ? "Logging out..." : "Logout"}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="hidden sm:flex items-center gap-3">
                                    <Button asChild className="rounded-lg h-10 px-4 py-2 font-medium text-sm bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-100 hover:bg-indigo-500/20 transition-colors border-none">
                                        <Link href={auth.login.url}>{auth.login.title}</Link>
                                    </Button>
                                    <Button asChild className="rounded-lg h-10 px-4 py-2 font-medium text-sm bg-indigo-500 hover:bg-indigo-600 text-white shadow-md transition-all active:scale-95 border-none">
                                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Theme Toggle - Positioned Last */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-md text-gray-600 cursor-pointer dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>

                            {/* Mobile Menu Trigger */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-300"
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
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {!user && (
                            <div className="flex flex-col gap-2 p-3">
                                <Link href={auth.login.url} className="w-full text-center py-2 rounded-md bg-indigo-500/10 text-indigo-500 font-medium">Login</Link>
                                <Link href={auth.signup.url} className="w-full text-center py-2 rounded-md bg-indigo-500 text-white font-medium">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;