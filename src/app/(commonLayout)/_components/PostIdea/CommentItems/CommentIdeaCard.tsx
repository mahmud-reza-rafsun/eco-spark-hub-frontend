/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, ArrowBigDown, ArrowBigUp, Banknote, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CommentIdeaCardProps {
    idea: any;
}

export default function CommentIdeaCard({ idea }: CommentIdeaCardProps) {
    const score = (idea.upvotes || 0) - (idea.downvotes || 0);
    const commentCount = idea.comments?.length || 0;

    return (
        <div className="bg-white dark:bg-[#09090b] border border-gray-100 dark:border-gray-800/60 rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">

            {/* ১. Header: Back Button & Author on Right */}
            <div className="flex items-center justify-between px-5 py-4">
                <Link href="/ideas" className="p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all group">
                    <ArrowLeft size={18} strokeWidth={1.2} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                            {idea.author?.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">Original Creator</p>
                    </div>
                    <div className="relative h-8 w-8 rounded-full overflow-hidden ring-1 ring-gray-100 dark:ring-gray-800">
                        <Image
                            src={idea.author?.image || "/avatar.png"}
                            alt="author"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* ২. Content: Clean Typography & Responsive Image */}
            <div className="px-6 pb-6 space-y-5">
                <div className="space-y-2">
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight leading-snug">
                        {idea.title}
                    </h1>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[65ch]">
                        {idea.description}
                    </p>
                </div>

                {/* Image Section */}
                {idea.images && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-sm">
                        <Image
                            src={idea.images}
                            alt={idea.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-[1.01]"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* ৩. Bottom Bar: Minimalist Interaction */}
            <div className="px-5 py-3 border-t mt-5 border-gray-50 dark:border-gray-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Voting */}
                    <div className="flex items-center bg-gray-50/50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800 p-0.5">
                        <button className="p-1.5 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-all text-gray-400 hover:text-orange-500">
                            <ArrowBigUp size={20} strokeWidth={1.2} />
                        </button>
                        <span className="px-2 font-bold text-[12px] tabular-nums text-gray-700 dark:text-gray-300">
                            {score}
                        </span>
                        <button className="p-1.5 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-all text-gray-400 hover:text-indigo-500">
                            <ArrowBigDown size={20} strokeWidth={1.2} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-2 text-gray-400 font-medium text-[12px]">
                        <MessageCircle size={16} strokeWidth={1.2} />
                        <span>{commentCount}</span>
                    </div>
                </div>

                {/* Buy Button - Fixed & Dark Mode Support */}
                <button className="flex items-center gap-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 dark:bg-gray-50 dark:hover:bg-white text-white dark:text-gray-950 text-[12px] font-bold px-5 py-2.5 rounded-lg transition-all active:scale-[0.98] shadow-sm">
                    <Banknote size={20} />
                    Buy Idea
                </button>
            </div>
        </div>
    );
}