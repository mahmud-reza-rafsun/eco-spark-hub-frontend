/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { userService } from "@/service/user.service";
import { revalidatePath } from "next/cache";

export const UpdateProfileAction = async (userId: string, payload: any) => {
    try {
        const result = await userService.updateProfile(userId, payload);
        if (result) {
            revalidatePath("/dashboard/profile");
            return { success: true, message: "Profile updated successfully!", data: result };
        }

        return { success: false, message: "Something went wrong" };
    } catch (err: any) {
        console.error("Server Action Error:", err);
        return { success: false, message: err?.message || "Internal Server Error" };
    }
};