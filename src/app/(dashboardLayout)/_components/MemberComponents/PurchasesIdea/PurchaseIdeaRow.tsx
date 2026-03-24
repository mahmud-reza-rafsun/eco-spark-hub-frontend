/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";

export default function PurchaseIdeaRow({ purchase }: { purchase: any }) {
    // Handling Date Formatting
    const formattedDate = purchase.createdAt
        ? format(new Date(purchase.createdAt), "MMM dd, yyyy")
        : "N/A";

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Idea Title */}
            <td className="px-6 py-4">
                <div className="max-w-300px">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block truncate" title={purchase.idea?.title}>
                        {purchase.idea?.title || "Unknown Project"}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Project Idea</span>
                </div>
            </td>

            {/* Transaction ID */}
            <td className="px-6 py-4">
                <code className="text-[11px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400 font-mono">
                    {purchase.transactionId}
                </code>
            </td>

            {/* Price/Amount */}
            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                ${purchase.amount}
            </td>

            {/* Created At */}
            <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                {formattedDate}
            </td>

            {/* Payment Status Badge */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full gap-1.5 
                    ${purchase.status === "PAID"
                        ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                        : 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${purchase.status === "PAID" ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                    <span className='text-[10px] font-bold uppercase tracking-wider'>{purchase.status}</span>
                </div>
            </td>
        </tr>
    );
}