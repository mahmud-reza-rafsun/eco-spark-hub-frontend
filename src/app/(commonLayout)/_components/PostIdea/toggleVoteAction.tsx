/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { ideaService } from "@/service/idea.service";
import { voteService } from "@/service/vote.service";
import { revalidatePath } from "next/cache";

export async function toggleVoteAction(ideaId: string, voteType: 'UPVOTE' | 'DOWNVOTE') {
    try {
        const res = await voteService.toggleVote(ideaId, voteType);

        revalidatePath("/ideas");

        return res;
    } catch (error) {
        return { success: false, message: "Failed to vote" };
    }
}