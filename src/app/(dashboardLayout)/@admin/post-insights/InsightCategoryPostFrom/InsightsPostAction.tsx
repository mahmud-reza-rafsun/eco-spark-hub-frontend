/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { insightsService } from "@/service/insight.service";
import { revalidatePath } from "next/cache";

export const insightPostAction = async (payload: any) => {
    try {
        const result = await insightsService.createInsight(payload);

        // check if result exists and error is null
        if (result && !result.error) {
            revalidatePath("/dashboard/post-insight");
            return { success: true, data: result.data };
        }

        return { success: false, error: result?.error || "Something went wrong" };
    } catch (err) {
        return { success: false, error: "Internal Server Error" };
    }
};