"use client";

import { useTransition, useState, useEffect } from "react";
import { ArrowBigUp as UpIcon, ArrowBigDown as DownIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toggleVoteAction } from "./toggleVoteAction";

type VoteStatus = 'UPVOTE' | 'DOWNVOTE' | null;

export default function IdeaCard({ idea }: { idea: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [currentVote, setCurrentVote] = useState<VoteStatus>(idea.userVote || null);
    const [score, setScore] = useState<number>(idea._count?.votes || 0);

    useEffect(() => {
        setCurrentVote(idea.userVote || null);
        setScore(idea._count?.votes || 0);
    }, [idea.userVote, idea._count?.votes]);

    const handleVote = (type: 'UPVOTE' | 'DOWNVOTE') => {
        if (isPending) return;

        const prevVote = currentVote;
        const prevScore = score;

        let newScore = score;
        let newVote: VoteStatus = type;

        // TOGGLE LOGIC
        if (currentVote === type) {
            newVote = null;
            newScore = type === 'UPVOTE' ? score - 1 : score + 1;
        } else {
            if (currentVote === 'UPVOTE') newScore -= 1;
            if (currentVote === 'DOWNVOTE') newScore += 1;

            newScore = type === 'UPVOTE' ? newScore + 1 : newScore - 1;
            newVote = type;
        }
        setScore(newScore);
        setCurrentVote(newVote);

        startTransition(async () => {
            try {
                const res = await toggleVoteAction(idea.id, type);
                if (res.success) {
                    router.refresh();
                } else {
                    throw new Error();
                }
            } catch (err) {
                setScore(prevScore);
                setCurrentVote(prevVote);
                toast.error("Failed to update vote");
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col h-full">
            <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-gray-50">
                <Image
                    src={idea.images}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                />
            </div>

            <h3 className="text-lg font-bold mb-2 line-clamp-1">{idea.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{idea.description}</p>

            <div className="mt-auto flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">

                    {/* Upvote Button */}
                    <button
                        disabled={isPending}
                        onClick={() => handleVote('UPVOTE')}
                        className={`p-1.5 rounded-lg transition-all ${currentVote === 'UPVOTE' ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'}`}
                    >
                        <UpIcon size={22} fill={currentVote === 'UPVOTE' ? "currentColor" : "none"} />
                    </button>

                    <span className="font-bold text-sm px-2 min-w-[30px] text-center">
                        {score}
                    </span>

                    {/* Downvote Button */}
                    <button
                        disabled={isPending}
                        onClick={() => handleVote('DOWNVOTE')}
                        className={`p-1.5 rounded-lg transition-all ${currentVote === 'DOWNVOTE' ? 'bg-indigo-500 text-white shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'}`}
                    >
                        <DownIcon size={22} fill={currentVote === 'DOWNVOTE' ? "currentColor" : "none"} />
                    </button>
                </div>

                <span className="text-xs font-medium text-gray-500 capitalize bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {idea.category?.name || "Uncategorized"}
                </span>
            </div>
        </div>
    );
}