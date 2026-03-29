"use server";

import { CommentService } from "@/service/comment.service";
import { revalidatePath } from "next/cache";

export async function createCommentAction(ideaId: string, content: string, parentId?: string) {
    const result = await CommentService.createComment(ideaId, { content, parentId });
    revalidatePath(`/ideas/${ideaId}`);
    return result;
}

export async function getCommentsAction(ideaId: string) {
    return await CommentService.getCommentsByIdeaId(ideaId);
}

export async function updateCommentAction(commentId: string, ideaId: string, content: string) {
    const result = await CommentService.updateComment(commentId, { content });
    if (result.success) revalidatePath(`/ideas/${ideaId}`);
    return result;
}

export async function deleteCommentAction(commentId: string, ideaId: string) {
    const result = await CommentService.deleteComment(commentId);
    if (result.success) revalidatePath(`/ideas/${ideaId}`);
    return result;
}