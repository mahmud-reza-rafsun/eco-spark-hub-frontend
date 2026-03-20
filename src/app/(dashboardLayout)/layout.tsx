// (dashboardLayout)/layout.tsx

import Sidebar from "@/components/modules/Sidebar/sidebar";
import { Roles } from "../constants/Roles";
import { userSerive } from "@/service/user.service";
import Link from "next/link";

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
    const session = await userSerive.getSession();
    const userRole = session?.data?.user ? session.data.user.role : null;

    return (
        <div className="min-h-screen bg-background">
            {/* Top Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background flex h-16 items-center gap-2 px-6 border-b">
                <nav>
                    <Link href="/" className="flex items-center gap-2">
                        <MountainIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">EcoSpark Hub</span>
                    </Link>
                </nav>
            </header>

            <div className="flex pt-16">
                {/* Left Sidebar - Fixed inside this div via component */}
                <Sidebar userRole={userRole} />

                {/* Main Content Area */}
                {/* ml-64 matches the sidebar width to prevent overlapping */}
                <main className="flex-1 transition-all duration-300 ml-64 min-h-[calc(100vh-64px)]">
                    <div className="max-w-[1200px] mx-auto p-6 lg:p-10">
                        {userRole === Roles.admin ? admin : member}
                    </div>
                </main>

            </div>
        </div>
    );
}