"use client"
import Navbar from "@/components/layout/Navbar";
import RightSideBar from "@/components/layout/RightSideBar";
import SideBar from "@/components/layout/SideBar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303]">
            <Navbar />
            <div className="flex pt-16">
                {/* Left Sidebar Container */}
                <div className={`hidden xl:block transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
                    <SideBar
                        isSidebarCollapsed={isSidebarCollapsed}
                        setIsSidebarCollapsed={setIsSidebarCollapsed}
                    />
                </div>

                {/* Main Content */}
                <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-0'} ease-in-out`}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar Container */}
                <div className="hidden lg:block w-[320px]">
                    <RightSideBar />
                </div>
            </div>
        </div>
    );
}