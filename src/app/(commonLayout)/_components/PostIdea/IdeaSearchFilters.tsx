'use client';

import { Search, ArrowUpDown, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
        <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl">

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

            {/* Sort Dropdown — shadcn Select */}
            <div className="w-full md:w-auto flex items-center gap-2">
                <label className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Sort by:
                </label>

                <Select
                    onValueChange={handleSortChange}
                    defaultValue={searchParams.get("category")?.toString() || "all"}
                >
                    <SelectTrigger className="h-15 py-5 bg-white dark:bg-zinc-900 border-indigo-500 dark:border-indigo-500 rounded-xl focus:ring-1 focus:ring-indigo-500 shadow-sm data-[state=open]:border-2 data-[state=open]:border-indigo-600 data-[state=open]:dark:border-indigo-400 transition-all">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                            <SelectValue placeholder="Category" />
                        </div>
                    </SelectTrigger>
                    <SelectContent
                        position="popper"
                        side="bottom"
                        sideOffset={8}
                        className="rounded-xl p-2  border-zinc-200 dark:border-indigo-500"
                    >
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Popular (Votes)</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical (A–Z)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default IdeaSearchFilters;