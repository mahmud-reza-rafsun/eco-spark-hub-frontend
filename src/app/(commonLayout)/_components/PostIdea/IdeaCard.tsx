/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition, useState, useEffect } from "react";
import { ArrowBigDownDash, ArrowBigUpDash, Banknote, MessageCircleDashed } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toggleVoteAction } from "./toggleVoteAction";
import Link from "next/link";

export type VoteStatus = 'UPVOTE' | 'DOWNVOTE' | null;

export default function IdeaCard({ idea }: { idea: any }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // ১. লোকাল স্টেট সরাসরি প্রপস থেকে নিচ্ছে
    const [localVote, setLocalVote] = useState<VoteStatus>(idea.userVote || null);
    const [localScore, setLocalScore] = useState<number>((idea.upvotes || 0) - (idea.downvotes || 0));

    // ২. রিফ্রেশ বা ডাটা আপডেট হলে স্টেট সিঙ্ক হবে
    useEffect(() => {
        // শুধুমাত্র যখন ট্রানজিশন শেষ হবে তখনই সার্ভার ডাটা দিয়ে আপডেট করবে
        if (!isPending) {
            setLocalVote(idea.userVote || null);
            setLocalScore((idea.upvotes || 0) - (idea.downvotes || 0));
        }
    }, [idea.userVote, idea.upvotes, idea.downvotes, isPending]);

    const handleVote = (type: 'UPVOTE' | 'DOWNVOTE') => {
        if (isPending) return;

        const prevVote = localVote;
        const prevScore = localScore;

        let nextScore = localScore;
        let nextVote: VoteStatus = type;

        // ম্যাথমেটিক্যাল লজিক
        if (localVote === type) {
            nextVote = null;
            nextScore = type === 'UPVOTE' ? localScore - 1 : localScore + 1;
        } else if (localVote === null) {
            nextScore = type === 'UPVOTE' ? localScore + 1 : localScore - 1;
        } else {
            nextScore = type === 'UPVOTE' ? localScore + 2 : localScore - 2;
        }

        // ৩. সাথে সাথে UI আপডেট (Optimistic Update)
        setLocalVote(nextVote);
        setLocalScore(nextScore);

        startTransition(async () => {
            try {
                const res = await toggleVoteAction(idea.id, type);
                if (res?.success) {
                    router.refresh();
                } else {
                    throw new Error();
                }
            } catch (err) {
                // ফেল করলে আগের অবস্থায় ফেরত যাবে
                setLocalVote(prevVote);
                setLocalScore(prevScore);
                toast.error("Failed to update vote");
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col h-full">
            <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-blue-100 dark:bg-blue-950 relative group border dark:border-blue-900">
                <Image
                    src={idea.images}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-white/60 dark:bg-black/40 text-gray-900 dark:text-white px-3 py-1.5 rounded-lg z-10">
                    {idea.category?.name || "Uncategorized"}
                </span>
            </div>

            <h3 className="text-lg font-bold mb-2 line-clamp-1">{idea.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{idea.description}</p>

            <div className="mt-auto flex items-center justify-between border-t pt-4 gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">
                        {/* UPVOTE BUTTON */}
                        <button
                            disabled={isPending}
                            onClick={() => handleVote('UPVOTE')}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${localVote === 'UPVOTE'
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'
                                }`}
                        >
                            <ArrowBigUpDash size={22} fill={localVote === 'UPVOTE' ? "currentColor" : "none"} />
                        </button>

                        <span className={`font-bold text-sm px-2 min-w-[30px] text-center ${localScore > 0 ? 'text-green-600' : localScore < 0 ? 'text-red-600' : ''
                            }`}>
                            {localScore}
                        </span>

                        {/* DOWNVOTE BUTTON */}
                        <button
                            disabled={isPending}
                            onClick={() => handleVote('DOWNVOTE')}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${localVote === 'DOWNVOTE'
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'
                                }`}
                        >
                            <ArrowBigDownDash size={22} fill={localVote === 'DOWNVOTE' ? "currentColor" : "none"} />
                        </button>
                    </div>
                    {/* Message Icon */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700 flex items-center justify-center">
                        <Link
                            href={`/ideas/${idea.id}`}
                            className="p-1.5 flex items-center justify-center rounded-lg transition-all text-indigo-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <MessageCircleDashed size={20} />
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border dark:border-gray-700">
                    <button className="p-1.5 rounded-lg transition-all flex text-sm gap-x-2 justify-center items-center text-white bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-gray-700 cursor-pointer">
                        <Banknote size={20} /> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}