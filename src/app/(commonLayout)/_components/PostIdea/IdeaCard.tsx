/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition, useState, useEffect } from "react";
import { ArrowBigDownDash, ArrowBigUpDash, Banknote, MessageCircleDashed } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toggleVoteAction } from "./toggleVoteAction";
import Link from "next/link";

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
            {/* Image Section with Category Overlay */}
            <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-blue-100 dark:bg-blue-950 relative group border dark:border-blue-900">
                {/* Image Section */}
                <Image
                    src={idea.images}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                />

                {/* Category Overlay - Glassmorphism Style */}
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase 
        /* Glass effect classes */
        backdrop-blur-md bg-white/60 dark:bg-black/40 
        /* Text colors */
        text-gray-900 dark:text-white 
        /* Border & Shadow */  dark:border-gray-700/50 shadow-lg 
        /* Padding & Radius */
        px-3 py-1.5 rounded-lg z-10">
                    {idea.category?.name || "Uncategorized"}
                </span>
            </div>

            {/* Content Section */}
            <h3 className="text-lg font-bold mb-2 line-clamp-1">{idea.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{idea.description}</p>

            {/* Action Footer */}
            <div className="mt-auto flex items-center justify-between border-t pt-4 gap-2">

                {/* Left Side: Vote & Comment */}
                <div className="flex items-center gap-2">
                    {/* Vote Group */}
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">
                        <button
                            disabled={isPending}
                            onClick={() => handleVote('UPVOTE')}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${currentVote === 'UPVOTE' ? 'bg-green-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'}`}
                        >
                            <ArrowBigUpDash size={20} fill={currentVote === 'UPVOTE' ? "currentColor" : "none"} />
                        </button>

                        <span className="font-bold text-xs px-1 min-w-24px text-center">
                            {score}
                        </span>

                        <button
                            disabled={isPending}
                            onClick={() => handleVote('DOWNVOTE')}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${currentVote === 'DOWNVOTE' ? 'bg-red-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'}`}
                        >
                            <ArrowBigDownDash size={20} fill={currentVote === 'DOWNVOTE' ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* Comment Button */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700 flex items-center justify-center">
                        <Link
                            href={`/ideas/${idea.id}`}
                            className="p-1.5 flex items-center justify-center rounded-lg transition-all text-indigo-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <MessageCircleDashed size={20} />
                        </Link>
                    </div>
                </div>

                {/* Right Side: Buy Now */}
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">
                    <button className="p-1.5 rounded-lg transition-all flex text-sm gap-x-2 justify-center items-center text-white bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-gray-700 cursor-pointer">
                        <Banknote size={20} /> Buy Now
                    </button>
                </div>

            </div>
        </div>
    );
}