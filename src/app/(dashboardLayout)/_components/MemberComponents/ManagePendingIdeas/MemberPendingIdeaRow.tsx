/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useState } from "react";
import { ClipboardPen, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteIdeaAction } from "./ManageMemberIdeaAction";
import UpdateMemberIdea from "./UpdateMemeberIdea";

export default function MemberPendingIdeaRow({ idea }: { idea: any }) {

    const [isLoading, setIsLoading] = useState(false);
    const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const res = await deleteIdeaAction(idea.id);
            if (res.success) {
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete the idea");
            }
        } catch (error) {
            console.error("Error deleting idea:", error);
        } finally {
            setIsLoading(false);
        }
    };

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
            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">
                    {isLoading ? (
                        <Loader2 className="animate-spin text-indigo-500" size={20} />
                    ) : (
                        <>
                            <button
                                onClick={() => setIsIdeaModalOpen(true)}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors cursor-pointer" title="Update">
                                <ClipboardPen size={18} />
                            </button>

                            {/* Shadcn Alert Dialog for Delete */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        className="p-2 text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Do you really want to delete the idea titled, <span className="text-red-500 font-semibold">{idea.title}</span>? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No, Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Yes Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                </div>
                <UpdateMemberIdea
                    isOpen={isIdeaModalOpen}
                    onClose={() => setIsIdeaModalOpen(false)}
                    idea={idea}
                />
            </td>
        </tr>
    );
}