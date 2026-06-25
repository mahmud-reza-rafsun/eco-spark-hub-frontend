/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Lightbulb, DollarSign, Tag, ShieldAlert, CheckCircle2, User, Calendar, Heart, ArrowBigDownDash, ArrowBigUpDash, Banknote } from "lucide-react";
import Image from 'next/image';
import Modal from '@/components/ui/modal';
import { IdeaDetailsAction } from './IdeaDetailsAction';
import { VoteStatus } from '../IdeaCard';
import { toggleVoteAction } from '../toggleVoteAction';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { IdeaData } from '@/interface/ideaDetails.interface';

export default function IdeaDetailsModal({
    isOpen,
    onClose,
    params,
    ideas
}: {
    isOpen: boolean;
    onClose: () => void;
    params: string;
    ideas: IdeaData
}) {
    const [idea, setIdea] = useState<IdeaData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [localVote, setLocalVote] = useState<VoteStatus>(ideas.userVote || null);
    const [localScore, setLocalScore] = useState<number>((ideas.upvotes || 0) - (ideas.downvotes || 0));

    useEffect(() => {
        const fetchIdeaDetails = async () => {
            if (!params || !isOpen) return;

            try {
                setIdea(null);
                setLoading(true);
                const res = await IdeaDetailsAction(params);

                if (res?.success && res?.data) {
                    setIdea(res.data);
                } else {
                    setIdea(null);
                }
            } catch (error) {
                console.error("Error fetching single idea details:", error);
                setIdea(null);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeaDetails();
    }, [params, isOpen]);



    const handleVote = (type: 'UPVOTE' | 'DOWNVOTE') => {
        if (isPending) return;

        const prevVote = localVote;
        const prevScore = localScore;

        let nextScore = localScore;
        let nextVote: VoteStatus = type;

        if (localVote === type) {
            nextVote = null;
            nextScore = type === 'UPVOTE' ? localScore - 1 : localScore + 1;
        } else if (localVote === null) {
            nextScore = type === 'UPVOTE' ? localScore + 1 : localScore - 1;
        } else {
            nextScore = type === 'UPVOTE' ? localScore + 2 : localScore - 2;
        }

        setLocalVote(nextVote);
        setLocalScore(nextScore);

        startTransition(async () => {
            try {
                const res = await toggleVoteAction(ideas.id, type);
                if (res?.success) {
                    router.refresh();
                } else {
                    throw new Error();
                }
            } catch (err) {
                setLocalVote(prevVote);
                setLocalScore(prevScore);
                toast.error("Failed to update vote");
            }
        });
    };



    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Idea Specifications"
            size="xl"
        >
            {/* Unified Scroll Container to Absolute Prevent Dual Scrollbars & Layout Shifts */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 [&::-webkit-scrollbar-track]:rounded-full">

                {loading ? (
                    /* Unified Skeleton Loader State matching the Parent View Layer */
                    <div className="space-y-6 animate-pulse">
                        {/* Contributor Profile Skeleton */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-zinc-900">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-zinc-800" />
                                <div className="space-y-2">
                                    <div className="h-3 w-28 bg-slate-200 dark:bg-zinc-800 rounded" />
                                    <div className="h-2.5 w-20 bg-slate-200 dark:bg-zinc-800 rounded" />
                                </div>
                            </div>
                            <div className="h-7 w-24 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
                        </div>

                        {/* Image Banner Skeleton */}
                        <div className="w-full h-56 sm:h-72 bg-slate-200 dark:bg-zinc-800 rounded-2xl" />

                        {/* Meta Tags Skeleton */}
                        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl">
                            <div className="flex gap-2">
                                <div className="h-7 w-24 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="h-7 w-20 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
                            </div>
                            <div className="h-8 w-28 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
                        </div>

                        {/* Title Skeleton */}
                        <div className="h-7 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded-lg" />

                        {/* Problem & Solution Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="h-32 bg-slate-100 dark:bg-zinc-900 rounded-xl p-5 space-y-3">
                                <div className="h-4 w-1/3 bg-slate-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-full bg-slate-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-5/6 bg-slate-200 dark:bg-zinc-800 rounded" />
                            </div>
                            <div className="h-32 bg-slate-100 dark:bg-zinc-900 rounded-xl p-5 space-y-3">
                                <div className="h-4 w-1/3 bg-slate-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-full bg-slate-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-5/6 bg-slate-200 dark:bg-zinc-800 rounded" />
                            </div>
                        </div>
                    </div>
                ) : !idea ? (
                    /* Error State Component Layer */
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-full text-red-500 mb-3">
                            <ShieldAlert size={32} />
                        </div>
                        <p className="text-base font-semibold text-foreground">Idea Not Found</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                            The requested content could not be retrieved or verified.
                        </p>
                    </div>
                ) : (
                    /* Standard Native Content Elements Mapping */
                    <>
                        {/* Contributor Profile Segment */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 shadow-xs">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center border border-slate-300/50 dark:border-zinc-700 overflow-hidden">
                                    {idea.author?.avatar ? (
                                        <Image fill src={idea.author.avatar} alt="Author profile" className="object-cover" />
                                    ) : (
                                        <User size={18} className="text-muted-foreground" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">{idea.author?.name || "Anonymous Originator"}</h4>
                                    <p className="text-[11px] text-muted-foreground font-medium">{idea.author?.role || "Project Stakeholder"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border dark:border-zinc-800 shadow-3xs">
                                <Calendar size={13} className="text-indigo-500" />
                                <span>{idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : "Pending Timeline"}</span>
                            </div>
                        </div>

                        {/* Media Representation Banner */}
                        <div className="relative w-full h-56 sm:h-72 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-xs border border-slate-100 dark:border-zinc-800">
                            {idea.images ? (
                                <Image
                                    fill
                                    src={idea.images}
                                    alt={idea.title || "Idea Blueprint"}
                                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-radial-gradient">
                                    <div className="p-4 bg-indigo-500/10 backdrop-blur-md rounded-full mb-3 text-indigo-400 border border-indigo-500/20">
                                        <Lightbulb size={40} className="animate-pulse" />
                                    </div>
                                    <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                        Conceptual Blueprint
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Meta Controls & Donate Integration Box */}
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50/60 dark:bg-zinc-900/40 p-4 rounded-xl border border-slate-200/40 dark:border-zinc-800/50">
                            {/* Left Side: Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                                    <Tag size={13} />
                                    {typeof idea.category === 'object' ? idea.category.name : idea.category || "General Strategy"}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                                    <DollarSign size={13} />
                                    {idea.price && idea.price > 0 ? idea.price.toFixed(2) : "Open Acquisition"}
                                </span>
                            </div>

                            {/* Right Side: Pixel-Perfect Premium Voting Widget */}
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
                        </div>

                        {/* Primary Core Title */}
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-snug">
                            {idea.title}
                        </h1>

                        {/* Balanced Core Problem & Solution Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Problem Statement Card */}
                            <div className="p-5 rounded-xl bg-rose-50/30 dark:bg-rose-950/5 border border-rose-100 dark:border-rose-950/40 space-y-2">
                                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm tracking-wide">
                                    <ShieldAlert size={16} />
                                    <span>Core Problem Statement</span>
                                </div>
                                <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                                    {idea.problem}
                                </p>
                            </div>

                            {/* Solution Architecture Card */}
                            <div className="p-5 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/5 border border-emerald-100 dark:border-emerald-950/40 space-y-2">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm tracking-wide">
                                    <CheckCircle2 size={16} />
                                    <span>Proposed Architecture</span>
                                </div>
                                <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                                    {idea.solution}
                                </p>
                            </div>
                        </div>

                        {/* Detailed Description Panel */}
                        <div className="p-5 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/5 border border-indigo-100 dark:border-indigo-950/40 space-y-2">
                            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm tracking-wide">
                                <CheckCircle2 size={16} />
                                <span>Comprehensive Analysis & Vision</span>
                            </div>
                            <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                                {idea.description}
                            </p>
                        </div>

                        {/* Action CTA Layer */}
                        <div className="pt-2">
                            <Button className="w-full h-12 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-md shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 text-sm tracking-wide">
                                <DollarSign size={20} />
                                Donate Now
                            </Button>
                        </div>
                    </>
                )}

            </div>
        </Modal >
    );
}