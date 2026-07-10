import { Roles } from "@/constants/Roles";
import Link from "next/link";
import DarkMode from "../../components/modules/DarkMode/DarkMode";
import { ThemeProvider } from "next-themes";
import { userService } from "@/service/user.service";
import UserSession from "@/utils/UserSession/UserSession";
import NotificationDropdown from "@/components/modules/Notification/Notification";
import DashboardShell from "./_components/DashboardShell/DashboardShell";
<<<<<<< HEAD
import { BHACLogo } from "@/components/layout/Navbar";
=======
import { BHACLogo } from "../_components/HeroNavbar";
>>>>>>> development

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    admin,
    member,
}: {
    admin: React.ReactNode;
    member: React.ReactNode;
}) {
    const session = await userService.getSession();

    const user = session?.data?.data || null;
    const userRole = user?.role || null;

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-6">
                        <nav>
<<<<<<< HEAD
                            <Link href="/" className="flex items-center gap-2">
                                <BHACLogo className="h-6 w-6 text-gray-900 dark:text-white" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    BHAC
                                </span>
=======
                            <Link href="/ideas" className="flex items-center gap-2.5 group flex-shrink-0">
                                <BHACLogo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">BHAC</span>
>>>>>>> development
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <NotificationDropdown />
                            <UserSession />
                            <DarkMode />
                        </div>
                    </div>
                </header>

                <DashboardShell userRole={userRole}>
                    {userRole === Roles.admin ? admin : member}
                </DashboardShell>
            </div>
        </ThemeProvider>
    );
}
