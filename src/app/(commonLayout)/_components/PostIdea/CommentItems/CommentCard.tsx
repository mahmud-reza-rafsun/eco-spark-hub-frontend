/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { createCommentAction } from "./commentActions";
import { toast } from "sonner";

export default function CommentCard({
    comment,
    ideaId,
    isReply = false,
    currentUserId,
}: any) {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const [showReplies, setShowReplies] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [replyValue, setReplyValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReply = async () => {
        if (!replyValue.trim()) return;
        setIsLoading(true);
        try {
            const res = await createCommentAction(ideaId, replyValue, comment.id);
            if (res?.success) {
                setReplyValue("");
                setIsReplying(false);
                setShowReplies(true);
                toast.success("Reply added");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col w-full">

            {isReply && (
                <div
                    className="absolute -left-13 -top-1 w-14 h-[20px] border-l-[1px] border-b-[1px] border-slate-200 dark:border-slate-800 rounded-bl-[16px] z-0"
                />
            )}

            <div className="flex gap-2.5 relative group">

                <div className="flex flex-col items-center relative shrink-0">
                    <Avatar className={`${isReply ? "h-7 w-7" : "h-9 w-9"} border-2 border-background z-10 bg-muted shadow-sm`}>
                        <AvatarImage src={comment.user?.image} />
                        <AvatarFallback className="text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-800">
                            {comment.user?.name?.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>

                    {hasReplies && showReplies && (
                        <div className="absolute top-5 bottom-0 left-4.5 w-px bg-slate-200 dark:bg-slate-800 z-0" />
                    )}
                </div>

                {/* ৪. RIGHT SIDE: Content Area */}
                <div className="flex-1 pb-3 min-w-0">
                    <div className="inline-block max-w-full bg-slate-100/80 dark:bg-slate-900/80 p-2.5 px-4 rounded-[18px] shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-[13px] font-bold text-foreground/90 truncate">
                                {comment.user?.name}
                            </h4>
                            <span className="text-[10px] text-muted-foreground font-medium opacity-60">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-[14px] leading-snug text-foreground/90 wrap-break-word">
                            {comment.content}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-1 ml-2">
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors"
                        >
                            Reply
                        </button>

                        {hasReplies && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-primary"
                            >
                                {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                {showReplies ? "Hide" : `${comment.replies.length} replies`}
                            </button>
                        )}
                    </div>

                    {isReplying && (
                        <div className="mt-2 flex gap-2 items-center bg-background border border-slate-200 dark:border-slate-800 p-1 pl-4 rounded-full w-full max-w-[300px] shadow-sm">
                            <input
                                value={replyValue}
                                onChange={(e) => setReplyValue(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 bg-transparent text-xs outline-none py-1.5"
                                autoFocus
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleReply}
                                disabled={isLoading || !replyValue.trim()}
                                className="h-7 w-7 rounded-full text-primary hover:bg-primary/10"
                            >
                                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                            </Button>
                        </div>
                    )}

                    {showReplies && hasReplies && (
                        <div className="mt-3 space-y-3 relative">
                            {comment.replies.map((reply: any) => (
                                <div key={reply.id} className="pl-[24px]">
                                    <CommentCard
                                        comment={reply}
                                        ideaId={ideaId}
                                        isReply={true}
                                        currentUserId={currentUserId}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}