"use client";

import { IdeaCardProps } from "@/interface/IdeaCardProps";
import {
    MoreHorizontal,
    MessageCircle,
    ArrowBigUpDash,
    ArrowBigDownDash
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IdeaCard({ idea }: IdeaCardProps) {
    const router = useRouter();

    const [voteType, setVoteType] = useState<"UPVOTE" | "DOWNVOTE" | null>(null);
    const [voteCount, setVoteCount] = useState(idea._count.votes);

    const handleVote = (type: "UPVOTE" | "DOWNVOTE") => {
        if (voteType === type) {
            setVoteType(null);
            setVoteCount(prev => type === "UPVOTE" ? prev - 1 : prev + 1);
        } else {
            if (voteType === "UPVOTE") setVoteCount(prev => prev - 2);
            else if (voteType === "DOWNVOTE") setVoteCount(prev => prev + 2);
            else setVoteCount(prev => type === "UPVOTE" ? prev + 1 : prev - 1);

            setVoteType(type);
        }
    };

    return (
        <div className="w-full max-w-[600px] mx-auto bg-white dark:bg-[#1A1A1B] text-gray-900 dark:text-[#D7DADC] rounded-md border border-gray-200 dark:border-[#343536] transition-all overflow-hidden mb-4 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                        {idea.author.image ? (
                            <Image src={idea.author.image} alt={idea.author.name} width={32} height={32} className="object-cover" />
                        ) : (
                            <span className="text-white text-xs font-bold">{idea.author.name.charAt(0)}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold hover:underline cursor-pointer">
                            u/{idea.author.name.replace(/\s+/g, '').toLowerCase()}
                        </span>
                        <span className="text-[10px] text-indigo-500 font-medium">r/{idea.category.slug}</span>
                    </div>
                </div>
                <button className="text-[#818384] hover:bg-gray-100 dark:hover:bg-[#272729] p-1.5 rounded-full">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Content Section */}
            <div className="px-3 pb-2 cursor-pointer" onClick={() => router.push(`/ideas/${idea?.id}`)}>
                <h3 className="text-lg font-bold mb-1 leading-snug">{idea.title}</h3>
                <p className="text-sm text-gray-600 dark:text-[#D7DADC]/80 line-clamp-3">{idea.problem}</p>
            </div>

            {/* Image Section */}
            {idea?.author?.image && (
                <div className="relative w-full aspect-video bg-black/5 dark:bg-[#272729] border-y border-gray-100 dark:border-[#343536]">
                    <Image src={idea?.author?.image} alt="Idea attachment" fill className="object-contain" />
                </div>
            )}

            {/* Footer: Interactions */}
            <div className="flex items-center gap-2 p-2 bg-gray-50/50 dark:bg-transparent">

                {/* Vote Container */}
                <div className={`flex items-center rounded-full px-1 py-0.5 transition-colors ${voteType === "UPVOTE" ? "bg-indigo-500/10 text-indigo-500" :
                    voteType === "DOWNVOTE" ? "bg-orange-500/10 text-orange-500" :
                        "bg-gray-100 dark:bg-[#272729]"
                    }`}>
                    <button
                        onClick={() => handleVote("UPVOTE")}
                        className={`p-1.5 rounded-full cursor-pointer transition-all ${voteType === "UPVOTE" ? "text-indigo-500 bg-indigo-500/20" : "text-[#818384] hover:bg-gray-200 dark:hover:bg-[#343536]"}`}
                    >
                        <ArrowBigUpDash size={22} fill={voteType === "UPVOTE" ? "currentColor" : "none"} />
                    </button>

                    <span className={`text-xs font-black px-1 min-w-[24px] text-center ${voteType === "UPVOTE" ? "text-indigo-500" : voteType === "DOWNVOTE" ? "text-orange-500" : ""}`}>
                        {voteCount === 0 ? "Vote" : voteCount}
                    </span>

                    <button
                        onClick={() => handleVote("DOWNVOTE")}
                        className={`p-1.5 rounded-full cursor-pointer transition-all ${voteType === "DOWNVOTE" ? "text-orange-500 bg-orange-500/20" : "text-[#818384] hover:bg-gray-200 dark:hover:bg-[#343536]"}`}
                    >
                        <ArrowBigDownDash size={22} fill={voteType === "DOWNVOTE" ? "currentColor" : "none"} />
                    </button>
                </div>

                {/* Comment Button */}
                <button
                    onClick={() => router.push(`/ideas/${idea.id}`)}
                    className="flex cursor-pointer items-center gap-2 bg-gray-100 dark:bg-[#272729] hover:bg-gray-200 dark:hover:bg-[#343536] px-4 py-2 rounded-full text-xs font-bold text-[#818384] transition-colors"
                >
                    <MessageCircle size={20} />
                    <span>{idea.comments.length}</span>
                </button>

            </div>
        </div>
    );
}