/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Send, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "./CommentCard";
import { toast } from "sonner";
import { createCommentAction } from "./commentActions";

export default function CommentSection({ ideaId, initialComments, authorId }: any) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    console.log(initialComments)
    console.log(authorId)

    const handlePost = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        try {
            const res = await createCommentAction(ideaId, text);
            if (res?.success) {
                setText("");
                toast.success("Comment posted");
            } else {
                toast.error(res?.error || "Failed to post");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-4 space-y-12">
            <div className="flex gap-4 group">
                <div className="flex-1 space-y-4">
                    <div className="relative group/textarea">
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write your comment..."
                            className="min-h-[100px] w-full resize-none bg-muted/20 
                       border-indigo-100 dark:border-indigo-900/30 
                       focus-visible:ring-indigo-500/30 focus-visible:border-indigo-400
                       rounded-2xl p-4 pr-14 text-[15px] 
                       transition-all duration-300 shadow-sm"
                        />

                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <Button
                                size="icon"
                                disabled={isLoading || !text.trim()}
                                onClick={handlePost}
                                className="h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600 
                           text-white shadow-lg shadow-indigo-200 dark:shadow-none 
                           transition-all active:scale-90 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4 ml-0.5" />
                                )}
                            </Button>
                        </div>

                        <div className="absolute top-3 right-3 opacity-0 group-focus-within/textarea:opacity-100 transition-opacity">
                            <Sparkles className="h-3 w-3 text-indigo-400/50" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 relative">
                {initialComments && initialComments.length > 0 ? (
                    <div className="grid gap-6">
                        {initialComments.map((comment: any) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                ideaId={ideaId}
                                currentUserId={authorId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-3xl bg-muted/10">
                        <div className="bg-muted p-4 rounded-full mb-3">
                            <MessageSquare className="h-6 w-6 text-muted-foreground/40" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">No comment availabe</p>
                    </div>
                )}
            </div>
        </div>
    );
}