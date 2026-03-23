/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, User, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { NavbarProps } from '@/interface/auth.interface';

export default function UserSession({
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
}: NavbarProps) {
    const [user, setUser] = useState<any>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
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

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const toastId = toast.loading("Logging out...");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to logout");

            toast.success("Logged out successfully", { id: toastId });
            window.location.href = "/login";
        } catch (error: any) {
            toast.error(error.message || "Failed to logout", { id: toastId });
        } finally {
            setIsLoggingOut(false);
        }
    };
    if (!mounted) return null;

    if (isFetching) return <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />;

    return (
        <div className="flex items-center">
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 cursor-pointer rounded-full border-2 border-indigo-500/20 p-0 hover:bg-indigo-500/10 transition-all active:scale-95">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback className="bg-indigo-600 text-white">
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56 mt-2" align="end" sideOffset={8}>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-semibold leading-none">{user.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                                <p className="text-xs leading-none text-muted-foreground/80">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer w-full flex items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/profile" className="cursor-pointer w-full flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile Settings</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center gap-3">
                    <Button asChild className="px-5 py-5 rounded-lg dark:bg-indigo-500/30 border-none hover:bg-indigo-500/30 bg-indigo-500/30 text-indigo-600 dark:text-gray-100 shadow-sm">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild className="px-5 py-5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}