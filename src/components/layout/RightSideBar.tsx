export default function RightSideBar() {
    return (
        <aside
            className="fixed right-0 top-16 h-[calc(100vh-64px)] w-[320px] transition-all duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#09090b] z-40"
        >
            <div className="flex flex-col h-full py-6 px-4 overflow-x-hidden justify-between">
                <div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 mt-5">
                        <h3 className="text-sm font-bold text-indigo-500 uppercase">Trending</h3>
                        <p className="text-xs text-gray-500 mt-2">No trending topics yet...</p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 px-2 text-[12px] text-gray-500 space-y-2">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                            <a href="#" className="hover:underline">User Agreement</a>
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </div>
                        <p>© 2026 EcoSpark Hub, Inc. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </aside>
    )
}