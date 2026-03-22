"use server";
import { adminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export async function toggleBlockUserAction(userId: string) {
    const res = await adminService.toggleBlockUser(userId);
    revalidatePath("/admin/users");
    return res;
}

export async function deleteUserAction(userId: string) {
    const res = await adminService.deleteUser(userId);
    revalidatePath("/admin/users");
    return res;
}