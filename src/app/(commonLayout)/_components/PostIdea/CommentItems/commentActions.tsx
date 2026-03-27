"use server";

import { CommentService } from "@/service/comment.service";
import { revalidatePath } from "next/cache";

// ১. নতুন কমেন্ট বা রিপ্লাই তৈরি করার অ্যাকশন
export async function createCommentAction(ideaId: string, content: string, parentId?: string) {
    const result = await CommentService.createComment(ideaId, { content, parentId });

    if (result.success) {
        // পেজে নতুন কমেন্ট দেখানোর জন্য ক্যাশ রিভ্যালিডেট করবে
        revalidatePath(`/ideas/${ideaId}`);
    }
    return result;
}

// ২. একটি আইডিয়ার সব কমেন্ট পাওয়ার অ্যাকশন (যদি ক্লায়েন্ট সাইড থেকে দরকার হয়)
export async function getCommentsAction(ideaId: string) {
    return await CommentService.getCommentsByIdeaId(ideaId);
}

// ৩. কমেন্ট আপডেট করার অ্যাকশন
export async function updateCommentAction(commentId: string, ideaId: string, content: string) {
    const result = await CommentService.updateComment(commentId, { content });

    if (result.success) {
        revalidatePath(`/ideas/${ideaId}`);
    }
    return result;
}

// ৪. কমেন্ট ডিলিট করার অ্যাকশন
export async function deleteCommentAction(commentId: string, ideaId: string) {
    const result = await CommentService.deleteComment(commentId);

    if (result.success) {
        revalidatePath(`/ideas/${ideaId}`);
    }
    return result;
}