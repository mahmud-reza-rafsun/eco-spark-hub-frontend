import { Roles } from "@/constants/Roles";
import Link from "next/link";
import DarkMode from "../../components/modules/DarkMode/DarkMode";
import { ThemeProvider } from "next-themes";
import { userService } from "@/service/user.service";
import UserSession from "@/utils/UserSession/UserSession";
import NotificationDropdown from "@/components/modules/Notification/Notification";
import DashboardShell from "./_components/DashboardShell/DashboardShell";
import { BHACLogo } from "../_components/HeroNavbar";

export const dynamic = "force-dynamic";

const MountainIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
);

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
                            <Link href="/ideas" className="flex items-center gap-2.5 group flex-shrink-0">
                                <BHACLogo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">BHAC</span>
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
