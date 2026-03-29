"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit2, Send } from "lucide-react";
import { deleteCommentAction, createCommentAction, updateCommentAction } from "./commentActions";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CommentCard({ comment, ideaId, isReply = false, currentUserId }: any) {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(comment.content);
    const [replyValue, setReplyValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // ওনারশিপ চেক: আপনার ব্যাকএন্ড ডাটা অনুযায়ী userId বা authorId চেক করুন
    const isOwner = currentUserId === comment.userId;

    const handleReply = async () => {
        if (!replyValue.trim()) return;
        setIsLoading(true);
        const res = await createCommentAction(ideaId, replyValue, comment.id);
        if (res?.success) {
            setReplyValue("");
            setIsReplying(false);
            toast.success("Reply added");
        }
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        const res = await updateCommentAction(comment.id, ideaId, editValue);
        if (res.success) {
            setIsEditing(false);
            toast.success("Updated");
        }
        setIsLoading(false);
    };

    return (
        <div className={`flex gap-3 py-4 ${isReply ? "ml-8 border-l pl-4 border-primary/10" : "border-b last:border-0"}`}>
            <Avatar className="h-8 w-8 shrink-0 border">
                <AvatarImage src={comment.user?.image} />
                <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold">{comment.user?.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {isOwner && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                    <Edit2 className="mr-2 h-3 w-3" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => deleteCommentAction(comment.id, ideaId)}
                                    className="text-destructive"
                                >
                                    <Trash2 className="mr-2 h-3 w-3" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-2 mt-2">
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full bg-muted/50 border rounded-md p-2 text-sm outline-none"
                        />
                        <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button size="sm" onClick={handleUpdate} disabled={isLoading}>Save</Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-foreground/90 leading-snug">{comment.content}</p>
                )}

                <div className="mt-1">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-[11px] font-bold text-primary/80 hover:text-primary"
                    >
                        {isReplying ? "Cancel" : "Reply"}
                    </button>
                </div>

                {isReplying && (
                    <div className="mt-3 flex gap-2">
                        <input
                            value={replyValue}
                            onChange={(e) => setReplyValue(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 bg-transparent border-b text-sm outline-none focus:border-primary py-1"
                        />
                        <Button size="icon" variant="ghost" onClick={handleReply} disabled={isLoading} className="h-8 w-8 text-primary">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* রিপ্লাই ম্যাপিং ফিক্স: নিজেকেই কল করা হয়েছে */}
                {comment.replies?.length > 0 && (
                    <div className="mt-2 space-y-2">
                        {comment.replies.map((reply: any) => (
                            <CommentCard
                                key={reply.id}
                                comment={reply}
                                ideaId={ideaId}
                                isReply={true}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}