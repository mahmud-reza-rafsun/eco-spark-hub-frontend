/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { categoryService } from "@/service/category.service";
import { ideaService } from "@/service/idea.service";
import { userService } from "@/service/user.service";
import { revalidatePath } from "next/cache";

export async function IdeaFormAction(payloadData: any) {
    try {
        const result = await userService.getSession();
        const userData = result?.data?.data || null;
        if (!userData || !userData.id) {
            return { success: false, error: "Unauthorized: Please login first." };
        }

        const payload = {
            title: payloadData.title || (payloadData.problem as string)?.slice(0, 50),
            problem: payloadData.problem,
            solution: payloadData.solution,
            description: payloadData.description,
            price: Number(payloadData.price) || 0,
            categoryId: payloadData.categoryId,
            images: payloadData.images || "",
        };

        const res = await ideaService.createIdeaPost(payload);

        if (res && !res.error) {
            revalidatePath("/ideas");
            return { success: true, data: res.data };
        }

        return { success: false, error: res.error || "Failed to post idea" };
    } catch (error: any) {
        return { success: false, error: error.message || "An error occurred" };
    }
}

export async function getAllCategoriesAction() {
    try {
        const res = await categoryService.getAllCategories();

        if (!res || res.error) {
            return { success: false, data: [], error: res.error || "No categories found." };
        }

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, data: [], error: "Failed to fetch categories." };
    }
}