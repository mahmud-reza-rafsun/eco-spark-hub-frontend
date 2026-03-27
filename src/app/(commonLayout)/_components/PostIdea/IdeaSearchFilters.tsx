'use client';

import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const IdeaSearchFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) params.set('searchTerm', term);
        else params.delete('searchTerm');
        router.push(`?${params.toString()}`);
    }, 500);
    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set('sortBy', value);
        else params.delete('sortBy');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between p-4 bg-white dark:bg-black shadow-sm border border-gray-100 dark:border-gray-800 rounded-xl">

            {/* Search Input */}
            <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    defaultValue={searchParams.get('searchTerm') || ''}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search ideas or categories..."
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-700 outline-none transition-all"
                />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-auto flex items-center gap-2">
                <label className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Sort by:
                </label>
                <div className="relative w-full md:w-48">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        value={searchParams.get('sortBy') || 'newest'}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-indigo-400 transition-all"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="popular">Most Popular (Votes)</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaSearchFilters;