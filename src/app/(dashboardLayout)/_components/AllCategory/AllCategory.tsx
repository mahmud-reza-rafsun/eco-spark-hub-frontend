/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function AllCategory({ category }: { category: any }) {
    const { name, title, slug } = category;

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors">
            {/* Category Name */}
            <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name || title}
                </p>
            </td>

            {/* Slug */}
            <td className="px-6 py-4">
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">
                    {slug}
                </span>
            </td>
        </tr>
    );
}