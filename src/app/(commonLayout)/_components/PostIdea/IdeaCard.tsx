/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { toggleVoteAction } from "./toggleVoteAction";

export default function IdeaCard({ idea }: { idea: any }) {
    const [isPending, startTransition] = useTransition();

    const handleVote = (type: 'UPVOTE' | 'DOWNVOTE') => {
        startTransition(async () => {
            const res = await toggleVoteAction(idea.id, type);
            if (!res.success) {
                toast.error("Something Went Wrong!!!");
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Image Fix */}
            <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-gray-50">
                <Image
                    src={idea.images}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                />
            </div>

            <h3 className="text-lg font-bold mb-2 line-clamp-1">{idea.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{idea.description}</p>

            <div className="mt-auto flex items-center justify-between border-t pt-4">
                {/* Voting UI */}
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">
                    <button
                        disabled={isPending}
                        onClick={() => handleVote('UPVOTE')}
                        className={`p-1.5 rounded-lg transition-all ${idea.userVote === 'UPVOTE' ? 'bg-orange-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                        <ArrowBigUp size={22} fill={idea.userVote === 'UPVOTE' ? "currentColor" : "none"} />
                    </button>

                    <span className="font-bold text-sm px-2 min-w-24px text-center">
                        {(idea.upvotes || 0) - (idea.downvotes || 0)}
                    </span>

                    <button
                        disabled={isPending}
                        onClick={() => handleVote('DOWNVOTE')}
                        className={`p-1.5 rounded-lg transition-all ${idea.userVote === 'DOWNVOTE' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                        <ArrowBigDown size={22} fill={idea.userVote === 'DOWNVOTE' ? "currentColor" : "none"} />
                    </button>
                </div>

                <span className="text-xs font-medium text-gray-500 capitalize bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {typeof idea.category === 'object' ? idea.category.name : idea.category}
                </span>
            </div>
        </div>
    );
}