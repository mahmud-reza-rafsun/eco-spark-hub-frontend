/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";

export default function PendingIdeaRow({ idea }: { idea: any }) {


    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Idea Detail */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 flex-shrink: 0">
                        <Image
                            src={idea.images || "/placeholder.png"}
                            alt={idea.title}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 max-w-250px truncate" title={idea.title}>
                        {idea.title}
                    </span>
                </div>
            </td>

            {/* Price */}
            <td className="px-6 py-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                ${idea.price}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                    ${idea.status === "PENDING"
                        ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${idea.status === "PENDING" ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                    <span className='text-[10px] font-bold uppercase tracking-wider'>{idea.status}</span>
                </div>
            </td>

            {/* Feedback */}
            <td className="px-6 py-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-200px leading-relaxed">
                    {idea.adminFeedback || "Waiting for admin review..."}
                </p>
            </td>
        </tr>
    );
}