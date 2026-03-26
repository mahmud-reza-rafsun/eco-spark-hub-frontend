/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { approveRejectIdeas } from "./ApproveAdminAction";
import Image from "next/image";
import { ApproveStatus } from "@/constants/ApproveStatus";

export default function ApproveIdeaRow({ idea }: { idea: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [localFeedback, setLocalFeedback] = useState("");

    const handleUpdateStatus = async (status: "APPROVED" | "REJECTED") => {
        if (status === "REJECTED" && !localFeedback.trim()) {
            alert("Please provide a reason.");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Sending ID:", idea.id);
            const res = await approveRejectIdeas({
                ideaId: idea.id,
                status: status,
                adminFeedback: status === ApproveStatus.REJECTED ? localFeedback : null
            });

            if (res.success && status === ApproveStatus.REJECTED) setLocalFeedback("");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* Author Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 font-bold uppercase text-xs">
                        {idea.author?.image ? (
                            <Image src={idea.author.image} alt={idea.author.name} className="w-full h-full rounded-full object-cover" width={100} height={100} />
                        ) : (
                            idea.author?.name?.charAt(0) || "U"
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{idea.author?.name}</p>
                        <p className="text-xs text-gray-500">{idea.author?.email}</p>
                    </div>
                </div>
            </td>

            {/* Title */}
            <td className="px-6 py-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-200px" title={idea.title}>
                    {idea.title}
                </p>
            </td>

            {/* Price */}
            <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                ${idea.price}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
        ${idea.status === "PENDING"
                        ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full 
            ${idea.status === "PENDING" ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    </span>

                    <h2 className='text-xs font-bold uppercase'>
                        {idea.status}
                    </h2>
                </div>
            </td>

            {/* Admin Feedback Input */}
            <td className="px-6 py-4">
                <input
                    type="text"
                    value={localFeedback}
                    onChange={(e) => setLocalFeedback(e.target.value)}
                    placeholder="Feedback for rejection..."
                    className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white"
                />
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3">
                    {isLoading ? (
                        <Loader2 className="animate-spin text-indigo-500" size={20} />
                    ) : (
                        <>
                            <button
                                onClick={() => handleUpdateStatus("APPROVED")}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                title="Approve"
                            >
                                <CheckCircle size={20} />
                            </button>
                            <button
                                onClick={() => handleUpdateStatus("REJECTED")}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Reject"
                            >
                                <XCircle size={20} />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}