"use client";

import Sidebar from "@/components/modules/Sidebar/sidebar";
import { useState } from "react";

interface DashboardShellProps {
    userRole?: string | null;
    children: React.ReactNode;
}

export default function DashboardShell({
    userRole,
    children,
}: DashboardShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex">
            <Sidebar
                userRole={userRole || undefined}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <main
                style={{
                    marginLeft: isCollapsed ? "80px" : "256px",
                    transition: "margin-left",
                }}
                className="flex-1 min-h-[calc(100vh-64px)]"
            >
                <div className="p-0 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
