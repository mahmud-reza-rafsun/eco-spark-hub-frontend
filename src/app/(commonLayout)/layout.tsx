import Navbar from "@/components/layout/Navbar"
import RightSideBar from "@/components/layout/RightSideBar";
import SideBar from "@/components/layout/SideBar";

export default function RootLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-white dark:bg-[#030303]">
                <aside className="fixed left-0 top-16 w-105 h-[calc(100vh-64px)] overflow-y-auto hidden xl:block">
                    <SideBar />
                </aside>

                <main className=" min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </main>

                <aside className="fixed right-0 top-16 w-105 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block">
                    <div className="p-4">
                        <RightSideBar />
                    </div>
                </aside>

            </div>
        </div>
    )
}