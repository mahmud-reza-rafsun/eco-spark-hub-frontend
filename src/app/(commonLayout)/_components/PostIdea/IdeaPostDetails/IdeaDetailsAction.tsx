"use server"

import { ideaService } from "@/service/idea.service";

export async function IdeaDetailsAction(id: string) {
    try {
        const res = await ideaService.getSingleIdea(id);

        if (!res || res.error) {
            return { success: false, data: [], error: res.error || "No Idea found." };
        }

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, data: [], error: "Failed to fetch single idea." };
    }
}