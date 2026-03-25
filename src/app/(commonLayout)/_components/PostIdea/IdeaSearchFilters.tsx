import React from 'react';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';

const IdeaSearchFilters = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between p-4 bg-white shadow-sm border border-gray-100 rounded-xl">

            {/* Left Side: Search Input */}
            <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    {/* Focus এ থাকাকালীন আইকন কালার indigo-500 হবে */}
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search ideas..."
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                />
            </div>

            {/* Right Side: Sort Filter */}
            <div className="relative w-full md:w-auto flex items-center gap-2">
                <label className="hidden sm:block text-sm font-medium text-gray-600 whitespace-nowrap">
                    Sort by:
                </label>
                <div className="relative w-full md:w-48">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        className="appearance-none block w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all cursor-pointer hover:border-indigo-500"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
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