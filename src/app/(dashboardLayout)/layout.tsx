import Sidebar from "@/components/modules/Sidebar/sidebar";
import { Roles } from "@/constants/Roles";
import Link from "next/link";
import DarkMode from "../../components/modules/DarkMode/DarkMode";
import { ThemeProvider } from "next-themes";
import { userService } from "@/service/user.service";
import UserSession from "@/utils/UserSession/UserSession";
export const dynamic = "force-dynamic";

const MountainIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
);

export default async function DashboardLayout({
    admin,
    member
}: {
    admin: React.ReactNode;
    member: React.ReactNode;
}) {
    const session = await userService.getSession();
    const user = session?.data?.data || null;
    const userRole = user ? user.role : null;

    return (
        <ThemeProvider attribute="class" defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-6">
                        <nav>
                            <Link href="/" className="flex items-center gap-2">
                                <MountainIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    EcoSpark Hub
                                </span>
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <UserSession />
                            <DarkMode />
                        </div>
                    </div>
                </header>

                <div className="flex">
                    <Sidebar userRole={userRole} />
                    <main className="flex-1 transition-all duration-300 ml-64 min-h-[calc(100vh-64px)]">
                        <div className="max-w-980px mx-auto p-6 lg:p-10">
                            {userRole === Roles.admin ? admin : member}
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}