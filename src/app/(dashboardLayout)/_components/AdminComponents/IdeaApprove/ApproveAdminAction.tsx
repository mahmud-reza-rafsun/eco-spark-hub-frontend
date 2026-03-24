"use server";
import { approveIdeas } from "@/interface/approveIdea.interface";
import { adminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export async function approveRejectIdeas(payload: approveIdeas) {
    const res = await adminService.approveIdeas(payload);
    revalidatePath("/approve-ideas");
    return res;
}