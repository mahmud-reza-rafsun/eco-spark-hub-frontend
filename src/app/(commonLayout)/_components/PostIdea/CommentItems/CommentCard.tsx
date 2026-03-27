/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreHorizontal, Trash2, Edit2, X, Send } from "lucide-react";
import { deleteCommentAction, createCommentAction, updateCommentAction } from "./commentActions";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CommentCard({ comment, ideaId, isReply = false, currentUserId }: any) {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(comment.content);
    const [replyValue, setReplyValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isOwner = currentUserId === comment.user?.id;

    const handleReply = async () => {
        if (!replyValue.trim()) return;
        setIsLoading(true);
        const res = await createCommentAction(ideaId, replyValue, comment.id);
        if (res.success) {
            setReplyValue("");
            setIsReplying(false);
            toast.success("Reply added");
        }
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        if (!editValue.trim()) return;
        setIsLoading(true);
        const res = await updateCommentAction(comment.id, ideaId, editValue);
        if (res.success) {
            setIsEditing(false);
            toast.success("Comment updated");
        }
        setIsLoading(false);
    };

    return (
        <div className={`group flex gap-4 py-5 transition-all ${isReply ? "ml-8 md:ml-12 border-l pl-5 border-border/50 mt-2" : ""}`}>
            <Avatar className="h-8 w-8 border shadow-sm shrink-0">
                <AvatarImage src={comment.user?.image} />
                <AvatarFallback className="text-[10px]">{comment.user?.name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[13px] font-bold truncate">{comment.user?.name}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem onClick={() => setIsEditing(true)} disabled={!isOwner}>
                                <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => deleteCommentAction(comment.id, ideaId)}
                                disabled={!isOwner}
                            >
                                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Content or Edit Box */}
                {isEditing ? (
                    <div className="space-y-2">
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full bg-muted/30 border rounded-lg p-3 text-[13.5px] outline-none focus:ring-1 ring-primary/20"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-7 text-[11px]">Cancel</Button>
                            <Button size="sm" onClick={handleUpdate} disabled={isLoading} className="h-7 text-[11px] px-4">Save</Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-[14px] text-foreground/90 leading-relaxed font-normal break-words">
                        {comment.content}
                    </p>
                )}

                {/* Action Bar */}
                {!isEditing && (
                    <div className="flex items-center gap-4 pt-1">
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                            <MessageSquare className="h-3 w-3" />
                            {isReplying ? "Cancel" : "Reply"}
                        </button>
                    </div>
                )}

                {/* Inline Reply Input */}
                {isReplying && (
                    <div className="mt-4 flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <input
                            autoFocus
                            value={replyValue}
                            onChange={(e) => setReplyValue(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 bg-transparent border-b border-muted py-1 text-[13px] outline-none focus:border-primary transition-all"
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={handleReply} disabled={isLoading || !replyValue.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={() => setIsReplying(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Recursive Replies */}
                {comment.replies?.length > 0 && (
                    <div className="mt-4 space-y-1">
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