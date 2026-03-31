/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Loader2, Trash2, ClipboardPen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteIdeaAction } from "./ManageIdeaAction";
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
import UpdateIdea from "./UpdateIdea";

export default function ManageIdeaRow({ idea }: { idea: any }) {
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
            {/* Author Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 font-bold uppercase text-xs overflow-hidden">
                        {idea.author?.image ? (
                            <Image
                                src={idea.author.image}
                                alt={idea.author.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
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

            {/* Image */}
            <td className="px-6 py-4">
                <div className="w-16 h-10 relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <Image
                        src={idea?.images || "/placeholder.png"}
                        alt={idea?.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </td>

            {/* Title */}
            <td className="px-6 py-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-200px" title={idea.title}>
                    {idea?.title}
                </p>
            </td>

            <td className="px-6 py-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-200px" title={idea.category.name}>
                    {idea?.category.name}
                </p>
            </td>

            {/* Price */}
            <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                ${idea?.price}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                    ${idea?.status === "PENDING"
                        ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : idea.status === "APPROVED"
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                            : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full 
                        ${idea.status === "PENDING" ? 'bg-yellow-500' : idea?.status === "APPROVED" ? 'bg-green-500' : 'bg-red-500'}`}>
                    </span>
                    <h2 className='text-xs font-medium uppercase'>{idea?.status}</h2>
                </div>
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
                <UpdateIdea
                    isOpen={isIdeaModalOpen}
                    onClose={() => setIsIdeaModalOpen(false)}
                    idea={idea}
                />
            </td>
        </tr>
    );
}