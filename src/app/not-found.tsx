import Link from 'next/link';

// --- Icons ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600/20"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
);

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <div className="w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                        <SearchIcon />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-8xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                    >
                        <HomeIcon /> Return to Homepage
                    </Link>

                    <button
                        className="h-12 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        Go back to previous page
                    </button>
                </div>

                {/* Branding Footer */}
                <div className="pt-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">
                        Eco Spark Hub Platform
                    </p>
                </div>
            </div>
        </div>
    );
}