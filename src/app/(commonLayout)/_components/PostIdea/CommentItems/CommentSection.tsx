/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "./CommentCard";
import { toast } from "sonner";
import { createCommentAction } from "./commentActions";

export default function CommentSection({ ideaId, initialComments, authorId }: any) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="max-w-3xl mx-auto py-12 space-y-10">
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-bold uppercase tracking-tight">Discussion</h4>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {initialComments?.length || 0}
                </span>
            </div>

            <div className="space-y-3">
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a thoughtful comment..."
                    className="min-h-[110px] resize-none bg-muted/20 border-muted rounded-xl p-4 text-[14px]"
                />
                <div className="flex justify-end">
                    <Button
                        size="sm"
                        disabled={isLoading || !text.trim()}
                        onClick={handlePost}
                        className="rounded-full px-5"
                    >
                        {isLoading ? "Posting..." : "Post Comment"}
                        {!isLoading && <Send className="ml-2 h-3.5 w-3.5" />}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                {initialComments && initialComments.length > 0 ? (
                    initialComments.map((comment: any) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            ideaId={ideaId}
                            // authorId কে currentUserId হিসেবে পাঠানো হয়েছে ওনারশিপ চেকের জন্য
                            currentUserId={authorId}
                        />
                    ))
                ) : (
                    <p className="text-center py-10 text-xs text-muted-foreground italic">No comments yet.</p>
                )}
            </div>
        </div>
    );
}