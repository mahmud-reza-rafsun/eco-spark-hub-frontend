"use server";

import { voteService } from "@/service/vote.service";
import { revalidatePath } from "next/cache";

export async function toggleVoteAction(ideaId: string, voteType: 'UPVOTE' | 'DOWNVOTE') {
    try {
        const res = await voteService.toggleVote(ideaId, voteType);

        if (res.success) {
            revalidatePath("/ideas");
        }
        return res;
    } catch (error) {
        return { success: false, error: "Failed to vote" };
    }
}