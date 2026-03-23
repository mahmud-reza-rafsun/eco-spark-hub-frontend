/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { adminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export const categoryPostAction = async (payload: FormData) => {
    const name = payload.get("name")?.toString() || "";
    const slug = payload.get("slug")?.toString() || "";

    if (!name || !slug) {
        return { success: false, error: "Name and Slug are required!" };
    }

    try {
        const result = await adminService.createCategory({ name, slug });

        if (result?.success) {
            revalidatePath("/dashboard/category");
            return { success: true };
        }

        return { success: false, error: result?.error || "Something went wrong" };
    } catch (err) {
        return { success: false, error: "Internal Server Error" };
    }
};