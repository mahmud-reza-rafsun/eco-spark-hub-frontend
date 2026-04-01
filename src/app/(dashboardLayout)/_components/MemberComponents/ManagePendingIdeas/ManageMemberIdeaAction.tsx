/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ideaService } from "@/service/idea.service";
import { memberService } from "@/service/member.service";
import { revalidatePath } from "next/cache";

export async function updateIdeaAction(payload: any, id: string) {
    try {
        const res = await ideaService.updateIdea(payload, id);

        if (res.success) {
            revalidatePath("/admin/ideas");
            return { success: true, message: "Idea updated successfully" };
        }

        return { success: false, error: res.error || "Failed to update idea" };
    } catch (error) {
        return { success: false, error: "An error occurred while updating the idea" };
    }
}

export async function deleteIdeaAction(ideaId: string) {
    try {
        const res = await memberService.deleteMyPendingIdea(ideaId);

        if (!res.error) {
            revalidatePath("/pending-ideas");
            return { success: true };
        }
        return { success: false, error: res.error };
    } catch (error) {
        return { success: false, error: "An error occurred" };
    }
}